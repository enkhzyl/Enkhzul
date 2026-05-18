import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenFromRequest } from "@/lib/auth";
import { query } from "@/lib/db";
import { initMenuTable } from "@/lib/menuDb";

function checkAdmin(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return false;
  const decoded = verifyToken(token);
  return decoded?.role === "admin";
}

export async function GET(req: NextRequest) {
  try {
    if (!checkAdmin(req)) return NextResponse.json({ error: "Зөвхөн админ" }, { status: 403 });
    await initMenuTable();
    const result = await query("SELECT * FROM menu_items ORDER BY category, created_at ASC");
    return NextResponse.json({ items: result.rows });
  } catch (err) {
    console.error("Admin menu GET error:", err);
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!checkAdmin(req)) return NextResponse.json({ error: "Зөвхөн админ" }, { status: 403 });
    const body = await req.json();
    const { name, category, description, base_price, base_calories, image_url, is_popular, is_new, is_today, discount } = body;
    if (!name || !category || !base_price || !base_calories) {
      return NextResponse.json({ error: "Нэр, ангилал, үнэ, калори заавал шаардлагатай" }, { status: 400 });
    }
    const id = `${category}-${Date.now()}`;
    await initMenuTable();
    const result = await query(
      `INSERT INTO menu_items (id, name, category, description, base_price, base_calories, image_url, is_popular, is_new, is_today, discount, is_available)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, TRUE)
       RETURNING *`,
      [id, name, category, description || "", base_price, base_calories, image_url || "",
       is_popular || false, is_new || false, is_today || false, discount || null]
    );
    return NextResponse.json({ item: result.rows[0] }, { status: 201 });
  } catch (err) {
    console.error("Admin menu POST error:", err);
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}
