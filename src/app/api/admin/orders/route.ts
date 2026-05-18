import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) return NextResponse.json({ error: "Нэвтрэх шаардлагатай" }, { status: 401 });

    const decoded = verifyToken(token) as { id: number; email: string; role?: string } | null;
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Зөвхөн админ нэвтрэх боломжтой" }, { status: 403 });
    }

    const { query } = await import("@/lib/db");

    const result = await query(`
      SELECT
        o.id, o.status, o.total_price, o.total_calories,
        o.address, o.phone, o.note, o.created_at, o.updated_at,
        u.name  AS user_name,
        u.email AS user_email,
        json_agg(
          json_build_object(
            'id',             oi.id,
            'menu_item_id',   oi.menu_item_id,
            'menu_item_name', oi.menu_item_name,
            'quantity',       oi.quantity,
            'item_price',     oi.item_price,
            'item_calories',  oi.item_calories
          ) ORDER BY oi.id
        ) AS items
      FROM orders o
      JOIN users u ON u.id = o.user_id
      LEFT JOIN order_items oi ON oi.order_id = o.id
      GROUP BY o.id, u.name, u.email
      ORDER BY o.created_at DESC
    `);

    return NextResponse.json({ orders: result.rows });
  } catch (err) {
    console.error("Admin orders error:", err);
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}
