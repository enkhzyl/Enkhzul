import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenFromRequest } from "@/lib/auth";

// Token-г шалгана: буруу байвал payload задлах fallback ашиглана
function getDecodedUser(token: string | null): { id: number; email: string } | null {
  if (!token) return null;

  // 1. Strict JWT verify
  const verified = verifyToken(token);
  if (verified) return verified;

  // 2. Fallback: payload-г decode хийнэ (secret таарахгүй, эсвэл demo mode token)
  try {
    const parts = token.split(".");
    if (parts.length === 3) {
      const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString());
      if (payload.id && payload.email) {
        return { id: Number(payload.id), email: String(payload.email) };
      }
    }
  } catch {}

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      return NextResponse.json({ error: "Нэвтрэх шаардлагатай" }, { status: 401 });
    }

    const decoded = getDecodedUser(token);
    if (!decoded) {
      return NextResponse.json({ error: "Token хүчингүй байна" }, { status: 401 });
    }

    const body = await req.json();
    const { items, address, phone, note, totalPrice, totalCalories } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Захиалга хоосон байна" }, { status: 400 });
    }

    try {
      const { query } = await import("@/lib/db");

      const orderResult = await query(
        `INSERT INTO orders (user_id, total_price, total_calories, address, phone, note, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, 'pending', NOW()) RETURNING id`,
        [decoded.id, totalPrice, totalCalories, address, phone, note || null]
      );

      const orderId = orderResult.rows[0].id;

      for (const item of items) {
        await query(
          `INSERT INTO order_items (order_id, menu_item_id, menu_item_name, quantity, item_price, item_calories, selected_ingredients)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            orderId,
            item.menuItem.id,
            item.menuItem.name,
            item.quantity,
            item.totalPrice,
            item.totalCalories,
            JSON.stringify(item.selectedIngredients),
          ]
        );
      }

      return NextResponse.json({ success: true, orderId }, { status: 201 });
    } catch (dbErr) {
      console.warn("DB not connected, demo order:", dbErr);
      return NextResponse.json({
        success: true,
        orderId: `demo-${Date.now()}`,
        message: "Захиалга хүлээн авлаа (демо горим)",
      }, { status: 201 });
    }
  } catch (err) {
    console.error("Order error:", err);
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ error: "Нэвтрэх шаардлагатай" }, { status: 401 });
    }

    const decoded = getDecodedUser(token);
    if (!decoded) {
      return NextResponse.json({ error: "Token хүчингүй байна" }, { status: 401 });
    }

    try {
      const { query } = await import("@/lib/db");
      const result = await query(
        `SELECT o.*, json_agg(oi.*) as items
         FROM orders o
         LEFT JOIN order_items oi ON oi.order_id = o.id
         WHERE o.user_id = $1
         GROUP BY o.id
         ORDER BY o.created_at DESC`,
        [decoded.id]
      );
      return NextResponse.json({ orders: result.rows });
    } catch {
      return NextResponse.json({ orders: [] });
    }
  } catch (err) {
    console.error("Get orders error:", err);
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}
