import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenFromRequest } from "@/lib/auth";
import { query } from "@/lib/db";

function checkAdmin(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return false;
  const decoded = verifyToken(token);
  return decoded?.role === "admin";
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!checkAdmin(req)) return NextResponse.json({ error: "Зөвхөн админ" }, { status: 403 });
    const body = await req.json();
    const { name, category, description, base_price, base_calories, image_url, is_popular, is_new, is_today, discount, is_available } = body;
    const { ingredient_groups } = body;
    const result = await query(
      `UPDATE menu_items SET
        name = COALESCE($1, name),
        category = COALESCE($2, category),
        description = COALESCE($3, description),
        base_price = COALESCE($4, base_price),
        base_calories = COALESCE($5, base_calories),
        image_url = COALESCE($6, image_url),
        is_popular = COALESCE($7, is_popular),
        is_new = COALESCE($8, is_new),
        is_today = COALESCE($9, is_today),
        discount = $10,
        is_available = COALESCE($11, is_available),
        ingredient_groups = $13,
        updated_at = NOW()
       WHERE id = $12
       RETURNING *`,
      [name, category, description, base_price, base_calories, image_url,
       is_popular, is_new, is_today, discount ?? null, is_available, params.id,
       ingredient_groups !== undefined ? JSON.stringify(ingredient_groups) : null]
    );
    if (result.rows.length === 0) return NextResponse.json({ error: "Хоол олдсонгүй" }, { status: 404 });
    return NextResponse.json({ item: result.rows[0] });
  } catch (err) {
    console.error("Admin menu PATCH error:", err);
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!checkAdmin(req)) return NextResponse.json({ error: "Зөвхөн админ" }, { status: 403 });
    const result = await query("DELETE FROM menu_items WHERE id = $1 RETURNING id", [params.id]);
    if (result.rows.length === 0) return NextResponse.json({ error: "Хоол олдсонгүй" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin menu DELETE error:", err);
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}
