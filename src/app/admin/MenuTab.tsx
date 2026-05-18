"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type IngredientOption = {
  id: string;
  name: string;
  price: number;
  calories: number;
  isDefault?: boolean;
};

type IngredientGroup = {
  id: string;
  name: string;
  type: "single" | "multiple";
  required: boolean;
  options: IngredientOption[];
};

type DBMenuItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  base_price: number;
  base_calories: number;
  image_url: string;
  is_popular: boolean;
  is_new: boolean;
  is_today: boolean;
  discount: number | null;
  is_available: boolean;
  ingredient_groups: IngredientGroup[] | null;
};

type FormData = {
  name: string;
  category: string;
  description: string;
  base_price: string;
  base_calories: string;
  image_url: string;
  is_popular: boolean;
  is_new: boolean;
  is_today: boolean;
  discount: string;
  is_available: boolean;
};

const EMPTY_FORM: FormData = {
  name: "", category: "burger", description: "",
  base_price: "", base_calories: "", image_url: "",
  is_popular: false, is_new: false, is_today: false,
  discount: "", is_available: true,
};

const CATS = [
  { id: "all",     label: "Бүгд",     emoji: "🍽️" },
  { id: "burger",  label: "Бургер",   emoji: "🍔" },
  { id: "pizza",   label: "Пицца",    emoji: "🍕" },
  { id: "wrap",    label: "Рап",      emoji: "🌯" },
  { id: "burrito", label: "Бурритто", emoji: "🌮" },
  { id: "combo",   label: "Сэт",      emoji: "🎁" },
  { id: "addon",   label: "Нэмэлт",   emoji: "🍟" },
  { id: "drink",   label: "Ундаа",    emoji: "🥤" },
  { id: "dessert", label: "Амттан",   emoji: "🍰" },
];

const CAT_COLORS: Record<string, string> = {
  burger:  "bg-orange-100 text-orange-700",
  pizza:   "bg-red-100 text-red-700",
  wrap:    "bg-emerald-100 text-emerald-700",
  burrito: "bg-amber-100 text-amber-700",
  combo:   "bg-purple-100 text-purple-700",
  addon:   "bg-zinc-100 text-zinc-700",
  drink:   "bg-blue-100 text-blue-700",
  dessert: "bg-pink-100 text-pink-700",
};

function formatPrice(p: number) {
  return Number(p).toLocaleString("mn-MN") + "₮";
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)}
      className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${checked ? "bg-[#F97316]" : "bg-zinc-300"}`}>
      <div className={`absolute w-3.5 h-3.5 bg-white rounded-full shadow top-[3px] transition-transform ${checked ? "translate-x-[18px]" : "translate-x-[3px]"}`} />
    </button>
  );
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// ── Ingredient Groups Editor ────────────────────────────────────────────
function GroupsEditor({ groups, onChange }: {
  groups: IngredientGroup[];
  onChange: (g: IngredientGroup[]) => void;
}) {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [editingOption, setEditingOption] = useState<{ groupId: string; optId: string | null } | null>(null);
  const [optForm, setOptForm] = useState({ name: "", price: "", calories: "", isDefault: false });
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [groupNameEdit, setGroupNameEdit] = useState("");

  function addGroup() {
    const newGroup: IngredientGroup = {
      id: uid(), name: "Шинэ бүлэг", type: "single", required: false, options: [],
    };
    const updated = [...groups, newGroup];
    onChange(updated);
    setExpandedGroup(newGroup.id);
    setEditingGroupId(newGroup.id);
    setGroupNameEdit(newGroup.name);
  }

  function removeGroup(gid: string) {
    onChange(groups.filter(g => g.id !== gid));
    if (expandedGroup === gid) setExpandedGroup(null);
  }

  function updateGroup(gid: string, patch: Partial<IngredientGroup>) {
    onChange(groups.map(g => g.id === gid ? { ...g, ...patch } : g));
  }

  function saveGroupName(gid: string) {
    if (groupNameEdit.trim()) updateGroup(gid, { name: groupNameEdit.trim() });
    setEditingGroupId(null);
  }

  function startAddOption(gid: string) {
    setEditingOption({ groupId: gid, optId: null });
    setOptForm({ name: "", price: "0", calories: "0", isDefault: false });
  }

  function startEditOption(gid: string, opt: IngredientOption) {
    setEditingOption({ groupId: gid, optId: opt.id });
    setOptForm({ name: opt.name, price: String(opt.price), calories: String(opt.calories), isDefault: !!opt.isDefault });
  }

  function saveOption() {
    if (!editingOption || !optForm.name.trim()) return;
    const { groupId, optId } = editingOption;
    const group = groups.find(g => g.id === groupId);
    if (!group) return;
    let newOptions: IngredientOption[];
    if (optId === null) {
      newOptions = [...group.options, {
        id: uid(), name: optForm.name.trim(),
        price: parseInt(optForm.price) || 0,
        calories: parseInt(optForm.calories) || 0,
        isDefault: optForm.isDefault,
      }];
    } else {
      newOptions = group.options.map(o => o.id === optId ? {
        ...o, name: optForm.name.trim(),
        price: parseInt(optForm.price) || 0,
        calories: parseInt(optForm.calories) || 0,
        isDefault: optForm.isDefault,
      } : o);
    }
    updateGroup(groupId, { options: newOptions });
    setEditingOption(null);
  }

  function removeOption(gid: string, optId: string) {
    const group = groups.find(g => g.id === gid);
    if (!group) return;
    updateGroup(gid, { options: group.options.filter(o => o.id !== optId) });
  }

  return (
    <div className="space-y-3">
      {groups.length === 0 && (
        <div className="text-center py-6 bg-zinc-50 rounded-xl border border-dashed border-zinc-300">
          <p className="text-zinc-400 text-sm font-semibold">Орцны бүлэг байхгүй байна</p>
          <p className="text-zinc-300 text-xs mt-1">Доорх товчоор нэмнэ үү</p>
        </div>
      )}

      {groups.map(group => (
        <div key={group.id} className="border border-zinc-200 rounded-xl overflow-hidden">
          {/* Group header */}
          <div className="flex items-center gap-2 px-3 py-2.5 bg-zinc-50 border-b border-zinc-100">
            <button type="button" onClick={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}
              className="text-zinc-400 hover:text-zinc-600 transition-colors text-sm">
              {expandedGroup === group.id ? "▼" : "▶"}
            </button>

            {editingGroupId === group.id ? (
              <input autoFocus value={groupNameEdit} onChange={e => setGroupNameEdit(e.target.value)}
                onBlur={() => saveGroupName(group.id)}
                onKeyDown={e => e.key === "Enter" && saveGroupName(group.id)}
                className="flex-1 text-sm font-black bg-white border border-orange-300 rounded-lg px-2 py-0.5 focus:outline-none" />
            ) : (
              <button type="button" onClick={() => { setEditingGroupId(group.id); setGroupNameEdit(group.name); }}
                className="flex-1 text-left text-sm font-black text-zinc-900 hover:text-orange-600 transition-colors">
                {group.name}
              </button>
            )}

            <span className="text-[10px] text-zinc-400 font-semibold">{group.options.length} орц</span>

            {/* Type toggle */}
            <select value={group.type} onChange={e => updateGroup(group.id, { type: e.target.value as "single" | "multiple" })}
              onClick={e => e.stopPropagation()}
              className="text-[10px] font-bold bg-white border border-zinc-200 rounded-lg px-1.5 py-0.5 focus:outline-none cursor-pointer">
              <option value="single">1 сонголт</option>
              <option value="multiple">Олон</option>
            </select>

            {/* Required toggle */}
            <label className="flex items-center gap-1 cursor-pointer">
              <span className="text-[10px] font-semibold text-zinc-500">Заавал</span>
              <Toggle checked={group.required} onChange={v => updateGroup(group.id, { required: v })} />
            </label>

            <button type="button" onClick={() => removeGroup(group.id)}
              className="text-red-400 hover:text-red-600 transition-colors text-xs px-1.5 py-0.5 rounded-lg hover:bg-red-50">
              🗑️
            </button>
          </div>

          {/* Options list */}
          {expandedGroup === group.id && (
            <div className="p-3 space-y-2">
              {group.options.map(opt => (
                <div key={opt.id}>
                  {editingOption?.groupId === group.id && editingOption.optId === opt.id ? (
                    // Inline edit form
                    <OptionForm form={optForm} setForm={setOptForm} onSave={saveOption}
                      onCancel={() => setEditingOption(null)} />
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-100 rounded-xl hover:border-zinc-200 transition-colors">
                      {opt.isDefault && (
                        <span className="text-[10px] bg-orange-100 text-orange-600 font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">Үндсэн</span>
                      )}
                      <span className="flex-1 text-sm font-semibold text-zinc-800">{opt.name}</span>
                      {opt.price > 0 && <span className="text-xs font-bold text-green-600">+{opt.price.toLocaleString()}₮</span>}
                      <span className="text-xs text-zinc-400">{opt.calories} ккал</span>
                      <button type="button" onClick={() => startEditOption(group.id, opt)}
                        className="text-blue-500 hover:text-blue-700 text-xs px-1.5 py-0.5 rounded-lg hover:bg-blue-50 transition-colors">✏️</button>
                      <button type="button" onClick={() => removeOption(group.id, opt.id)}
                        className="text-red-400 hover:text-red-600 text-xs px-1.5 py-0.5 rounded-lg hover:bg-red-50 transition-colors">🗑️</button>
                    </div>
                  )}
                </div>
              ))}

              {/* Add option inline form or button */}
              {editingOption?.groupId === group.id && editingOption.optId === null ? (
                <OptionForm form={optForm} setForm={setOptForm} onSave={saveOption}
                  onCancel={() => setEditingOption(null)} isNew />
              ) : (
                <button type="button" onClick={() => startAddOption(group.id)}
                  className="w-full py-2 text-xs font-bold text-orange-500 border border-dashed border-orange-200 rounded-xl hover:bg-orange-50 transition-colors">
                  + Орц нэмэх
                </button>
              )}
            </div>
          )}
        </div>
      ))}

      <button type="button" onClick={addGroup}
        className="w-full py-2.5 text-sm font-bold text-zinc-600 border border-dashed border-zinc-300 rounded-xl hover:bg-zinc-50 hover:border-zinc-400 transition-colors">
        + Орцны бүлэг нэмэх
      </button>
    </div>
  );
}

function OptionForm({ form, setForm, onSave, onCancel, isNew }: {
  form: { name: string; price: string; calories: string; isDefault: boolean };
  setForm: (f: { name: string; price: string; calories: string; isDefault: boolean }) => void;
  onSave: () => void;
  onCancel: () => void;
  isNew?: boolean;
}) {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 space-y-2">
      <p className="text-xs font-black text-orange-700">{isNew ? "Шинэ орц нэмэх" : "Орц засах"}</p>
      <input autoFocus value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
        placeholder="Орцны нэр (жишээ: Бриош талх)"
        className="w-full border border-zinc-200 rounded-lg px-3 py-1.5 text-sm font-semibold focus:outline-none focus:border-orange-400 bg-white" />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] font-bold text-zinc-500 block mb-1">Нэмэлт үнэ (₮)</label>
          <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
            placeholder="0"
            className="w-full border border-zinc-200 rounded-lg px-3 py-1.5 text-sm font-semibold focus:outline-none focus:border-orange-400 bg-white" />
        </div>
        <div>
          <label className="text-[10px] font-bold text-zinc-500 block mb-1">Калори</label>
          <input type="number" value={form.calories} onChange={e => setForm({ ...form, calories: e.target.value })}
            placeholder="0"
            className="w-full border border-zinc-200 rounded-lg px-3 py-1.5 text-sm font-semibold focus:outline-none focus:border-orange-400 bg-white" />
        </div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.isDefault} onChange={e => setForm({ ...form, isDefault: e.target.checked })}
          className="w-4 h-4 accent-orange-500" />
        <span className="text-xs font-semibold text-zinc-700">Үндсэн сонголт (default)</span>
      </label>
      <div className="flex gap-2">
        <button type="button" onClick={onCancel}
          className="flex-1 py-1.5 text-xs font-bold border border-zinc-200 rounded-lg text-zinc-500 hover:bg-white transition-colors">
          Болих
        </button>
        <button type="button" onClick={onSave}
          className="flex-1 py-1.5 text-xs font-black bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
          {isNew ? "Нэмэх" : "Хадгалах"}
        </button>
      </div>
    </div>
  );
}

// ── Main MenuTab Component ──────────────────────────────────────────────
export default function MenuTab({ token }: { token: string }) {
  const [items, setItems] = useState<DBMenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [catFilter, setCatFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<DBMenuItem | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [groups, setGroups] = useState<IngredientGroup[]>([]);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<DBMenuItem | null>(null);
  const [modalTab, setModalTab] = useState<"basic" | "ingredients">("basic");

  const authHeader = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/menu", { headers: authHeader });
      if (res.ok) {
        const data = await res.json();
        setItems(data.items);
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  function openAdd() {
    setEditItem(null);
    setForm(EMPTY_FORM);
    setGroups([]);
    setError("");
    setModalTab("basic");
    setModalOpen(true);
  }

  function openEdit(item: DBMenuItem) {
    setEditItem(item);
    setForm({
      name: item.name,
      category: item.category,
      description: item.description || "",
      base_price: String(item.base_price),
      base_calories: String(item.base_calories),
      image_url: item.image_url || "",
      is_popular: item.is_popular,
      is_new: item.is_new,
      is_today: item.is_today,
      discount: item.discount ? String(item.discount) : "",
      is_available: item.is_available,
    });
    setGroups(item.ingredient_groups ? JSON.parse(JSON.stringify(item.ingredient_groups)) : []);
    setError("");
    setModalTab("basic");
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.name.trim() || !form.category || !form.base_price || !form.base_calories) {
      setError("Нэр, ангилал, үнэ, калори заавал бөглөнө үү");
      setModalTab("basic");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const body = {
        name: form.name.trim(),
        category: form.category,
        description: form.description.trim(),
        base_price: parseInt(form.base_price),
        base_calories: parseInt(form.base_calories),
        image_url: form.image_url.trim(),
        is_popular: form.is_popular,
        is_new: form.is_new,
        is_today: form.is_today,
        discount: form.discount ? parseInt(form.discount) : null,
        is_available: form.is_available,
        ingredient_groups: groups.length > 0 ? groups : null,
      };
      const url = editItem ? `/api/admin/menu/${editItem.id}` : "/api/admin/menu";
      const method = editItem ? "PATCH" : "POST";
      const res = await fetch(url, { method, headers: authHeader, body: JSON.stringify(body) });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || "Алдаа гарлаа");
        return;
      }
      setModalOpen(false);
      await fetchItems();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: DBMenuItem) {
    setDeletingId(item.id);
    try {
      await fetch(`/api/admin/menu/${item.id}`, { method: "DELETE", headers: authHeader });
      setConfirmDelete(null);
      await fetchItems();
    } finally {
      setDeletingId(null);
    }
  }

  const filtered = catFilter === "all" ? items : items.filter(i => i.category === catFilter);
  const catLabel = CATS.find(c => c.id === catFilter);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-black text-zinc-900 text-lg">Цэс удирдах</h2>
          <p className="text-xs text-zinc-400">{items.length} хоолны зүйл · database-д шууд хадгалагдана</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-black text-sm px-4 py-2 rounded-xl transition-all active:scale-95 shadow-sm">
          + Шинэ хоол нэмэх
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CATS.map(c => (
          <button key={c.id} onClick={() => setCatFilter(c.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border whitespace-nowrap transition-all ${
              catFilter === c.id
                ? "bg-zinc-900 text-white border-zinc-900"
                : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
            }`}>
            {c.emoji} {c.label}
            <span className="opacity-60 text-[10px]">
              ({items.filter(i => c.id === "all" ? true : i.category === c.id).length})
            </span>
          </button>
        ))}
      </div>

      {/* Items list */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-zinc-400">
          <p className="text-4xl mb-3">🍽️</p>
          <p className="font-bold">Хоол олдсонгүй</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-zinc-100 bg-zinc-50">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
              {catLabel?.emoji} {catLabel?.label} — {filtered.length} зүйл
            </p>
          </div>
          <div className="divide-y divide-zinc-50">
            {filtered.map(item => (
              <div key={item.id} className={`flex items-center gap-4 px-5 py-3 hover:bg-zinc-50 transition-colors ${!item.is_available ? "opacity-50" : ""}`}>
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0 relative">
                  {item.image_url ? (
                    <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="56px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      {CATS.find(c => c.id === item.category)?.emoji || "🍽️"}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-black text-zinc-900 text-sm">{item.name}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CAT_COLORS[item.category] || "bg-zinc-100 text-zinc-600"}`}>
                      {CATS.find(c => c.id === item.category)?.label || item.category}
                    </span>
                    {item.ingredient_groups && item.ingredient_groups.length > 0 && (
                      <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-bold">
                        🧅 {item.ingredient_groups.length} бүлэг
                      </span>
                    )}
                    {item.is_popular && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold">⭐ Хит</span>}
                    {item.is_new && <span className="text-[10px] bg-zinc-900 text-white px-2 py-0.5 rounded-full font-bold">✦ Шинэ</span>}
                    {item.is_today && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">🔥 Өнөөдөр</span>}
                    {!item.is_available && <span className="text-[10px] bg-zinc-200 text-zinc-500 px-2 py-0.5 rounded-full font-bold">Нуусан</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <p className="text-[#F97316] font-black text-sm">{formatPrice(item.base_price)}</p>
                    <p className="text-zinc-400 text-xs">{item.base_calories} ккал</p>
                    {item.discount && <p className="text-red-500 text-xs font-bold">−{item.discount}%</p>}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(item)}
                    className="px-3 py-1.5 text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors">
                    ✏️ Засах
                  </button>
                  <button onClick={() => setConfirmDelete(item)}
                    className="px-3 py-1.5 text-xs font-bold bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition-colors">
                    🗑️ Устгах
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl flex flex-col" style={{ maxHeight: "92vh" }}>
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 flex-shrink-0">
              <h3 className="font-black text-zinc-900 text-lg">
                {editItem ? `"${editItem.name}" засах` : "Шинэ хоол нэмэх"}
              </h3>
              <button onClick={() => setModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-zinc-100 text-zinc-500 font-bold text-lg transition-colors">
                ✕
              </button>
            </div>

            {/* Tab bar */}
            <div className="flex border-b border-zinc-100 flex-shrink-0">
              <button onClick={() => setModalTab("basic")}
                className={`flex-1 py-2.5 text-sm font-bold transition-colors ${
                  modalTab === "basic"
                    ? "text-orange-600 border-b-2 border-orange-500 bg-orange-50"
                    : "text-zinc-500 hover:text-zinc-700"
                }`}>
                📋 Үндсэн мэдээлэл
              </button>
              <button onClick={() => setModalTab("ingredients")}
                className={`flex-1 py-2.5 text-sm font-bold transition-colors ${
                  modalTab === "ingredients"
                    ? "text-orange-600 border-b-2 border-orange-500 bg-orange-50"
                    : "text-zinc-500 hover:text-zinc-700"
                }`}>
                🧅 Орцны сонголт
                {groups.length > 0 && (
                  <span className="ml-1.5 bg-orange-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                    {groups.length}
                  </span>
                )}
              </button>
            </div>

            {/* Modal body */}
            <div className="overflow-y-auto flex-1">
              {/* ── Basic info tab ── */}
              {modalTab === "basic" && (
                <div className="p-6 space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-semibold px-4 py-3 rounded-xl">
                      ⚠️ {error}
                    </div>
                  )}

                  {form.image_url && (
                    <div className="relative h-32 rounded-xl overflow-hidden bg-zinc-100">
                      <Image src={form.image_url} alt="preview" fill className="object-cover" sizes="500px" />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-zinc-600 mb-1.5">Нэр *</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Жишээ: Классик Бургер"
                      className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-600 mb-1.5">Ангилал *</label>
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-orange-400 bg-white">
                      {CATS.filter(c => c.id !== "all").map(c => (
                        <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-600 mb-1.5">Тайлбар</label>
                    <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                      placeholder="Хоолны дэлгэрэнгүй тайлбар..."
                      rows={2}
                      className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 resize-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 mb-1.5">Үнэ (₮) *</label>
                      <input type="number" value={form.base_price} onChange={e => setForm(f => ({ ...f, base_price: e.target.value }))}
                        placeholder="12500"
                        className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 mb-1.5">Калори (ккал) *</label>
                      <input type="number" value={form.base_calories} onChange={e => setForm(f => ({ ...f, base_calories: e.target.value }))}
                        placeholder="620"
                        className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-600 mb-1.5">Зургийн URL</label>
                    <input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-600 mb-1.5">Хямдрал (%)</label>
                    <input type="number" min="0" max="99" value={form.discount} onChange={e => setForm(f => ({ ...f, discount: e.target.value }))}
                      placeholder="Хоосон орхивол хямдралгүй"
                      className="w-full border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
                  </div>

                  <div className="bg-zinc-50 rounded-xl p-4 space-y-3">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Тэмдэглэгээ</p>
                    {[
                      { key: "is_popular",   label: "⭐ Хит (Хамгийн их захиалагддаг)" },
                      { key: "is_new",       label: "✦ Шинэ бүтээгдэхүүн" },
                      { key: "is_today",     label: "🔥 Өнөөдрийн онцгой санал" },
                      { key: "is_available", label: "👁️ Хэрэглэгчид харагдана" },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-3 cursor-pointer">
                        <Toggle
                          checked={form[key as keyof FormData] as boolean}
                          onChange={v => setForm(f => ({ ...f, [key]: v }))}
                        />
                        <span className="text-sm font-semibold text-zinc-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Ingredients tab ── */}
              {modalTab === "ingredients" && (
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-sm font-black text-zinc-900">Орцны бүлэг удирдах</p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Бүлэг нэмэх → Бүлэг дотор орц нэмэх → Хадгалах дарахад шууд database-д орно
                    </p>
                  </div>
                  <GroupsEditor groups={groups} onChange={setGroups} />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-zinc-100 flex gap-3 flex-shrink-0">
              <button onClick={() => setModalOpen(false)}
                className="flex-1 py-2.5 text-sm font-bold border border-zinc-200 rounded-xl text-zinc-600 hover:bg-zinc-50 transition-colors">
                Болих
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 py-2.5 text-sm font-black bg-[#F97316] hover:bg-orange-600 text-white rounded-xl transition-all disabled:opacity-60 active:scale-95">
                {saving ? "Хадгалж байна..." : editItem ? "Өөрчлөлт хадгалах" : "Нэмэх"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="text-5xl mb-4">🗑️</div>
            <h3 className="font-black text-zinc-900 text-lg mb-2">Устгах уу?</h3>
            <p className="text-zinc-500 text-sm mb-1">
              <span className="font-bold text-zinc-800">&quot;{confirmDelete.name}&quot;</span> хоолыг устгах гэж байна.
            </p>
            <p className="text-zinc-400 text-xs mb-6">Устгасан хоол pgAdmin дээр ч харагдахгүй болно.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 text-sm font-bold border border-zinc-200 rounded-xl text-zinc-600 hover:bg-zinc-50 transition-colors">
                Болих
              </button>
              <button onClick={() => handleDelete(confirmDelete)} disabled={deletingId === confirmDelete.id}
                className="flex-1 py-2.5 text-sm font-black bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all disabled:opacity-60">
                {deletingId === confirmDelete.id ? "Устгаж байна..." : "Тийм, устгах"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
