import { query } from "./db";
import { MenuItem } from "@/types";

export async function initMenuTable(): Promise<void> {
  await query(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id TEXT PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      category VARCHAR(50) NOT NULL,
      description TEXT DEFAULT '',
      base_price INTEGER NOT NULL DEFAULT 0,
      base_calories INTEGER NOT NULL DEFAULT 0,
      image_url TEXT DEFAULT '',
      is_popular BOOLEAN DEFAULT FALSE,
      is_new BOOLEAN DEFAULT FALSE,
      is_today BOOLEAN DEFAULT FALSE,
      discount INTEGER,
      ingredient_groups JSONB,
      is_available BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `);
  const countRes = await query("SELECT COUNT(*) as count FROM menu_items");
  if (parseInt(countRes.rows[0].count) === 0) {
    await seedMenuItems();
  }
}

export function rowToMenuItem(row: Record<string, unknown>): MenuItem {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as MenuItem["category"],
    description: (row.description as string) || "",
    basePrice: Number(row.base_price),
    baseCalories: Number(row.base_calories),
    imageUrl: (row.image_url as string) || "",
    ...(row.is_popular ? { isPopular: true } : {}),
    ...(row.is_new ? { isNew: true } : {}),
    ...(row.is_today ? { isToday: true } : {}),
    ...(row.discount ? { discount: Number(row.discount) } : {}),
    ...(row.ingredient_groups ? { ingredientGroups: row.ingredient_groups as MenuItem["ingredientGroups"] } : {}),
  };
}

export async function getAllMenuItems(): Promise<MenuItem[]> {
  await initMenuTable();
  const result = await query(
    "SELECT * FROM menu_items WHERE is_available = TRUE ORDER BY created_at ASC"
  );
  return result.rows.map(rowToMenuItem);
}

export async function getAllMenuItemsSafe(): Promise<{
  popularItems: MenuItem[];
  mainItems: MenuItem[];
  comboItems: MenuItem[];
  addonItems: MenuItem[];
  drinkItems: MenuItem[];
  dessertItems: MenuItem[];
}> {
  try {
    const items = await getAllMenuItems();
    const MAIN_CATS = ["burger", "pizza", "wrap", "burrito"];
    return {
      popularItems: items.filter(i => i.isPopular && MAIN_CATS.includes(i.category)),
      mainItems: items.filter(i => MAIN_CATS.includes(i.category) && i.ingredientGroups && i.ingredientGroups.length > 0),
      comboItems: items.filter(i => i.category === "combo"),
      addonItems: items.filter(i => i.category === "addon"),
      drinkItems: items.filter(i => i.category === "drink"),
      dessertItems: items.filter(i => i.category === "dessert"),
    };
  } catch {
    const { menuItems, comboItems, addonItems, drinkItems, dessertItems, popularReadyItems } = await import("@/data/menuData");
    return {
      popularItems: popularReadyItems,
      mainItems: menuItems,
      comboItems,
      addonItems,
      drinkItems,
      dessertItems,
    };
  }
}

async function seedMenuItems(): Promise<void> {
  const { menuItems, comboItems, addonItems, drinkItems, dessertItems, popularReadyItems } = await import("@/data/menuData");
  const allItems = [...popularReadyItems, ...menuItems, ...comboItems, ...addonItems, ...drinkItems, ...dessertItems];
  const seen = new Set<string>();
  const unique = allItems.filter(item => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
  for (const item of unique) {
    await query(
      `INSERT INTO menu_items (id, name, category, description, base_price, base_calories, image_url, is_popular, is_new, is_today, discount, ingredient_groups, is_available)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, TRUE)
       ON CONFLICT (id) DO NOTHING`,
      [
        item.id, item.name, item.category, item.description || "",
        item.basePrice, item.baseCalories, item.imageUrl || "",
        item.isPopular || false, item.isNew || false, item.isToday || false,
        item.discount || null,
        item.ingredientGroups ? JSON.stringify(item.ingredientGroups) : null,
      ]
    );
  }
}
