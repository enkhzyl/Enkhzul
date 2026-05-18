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
        u.id, u.name, u.email, u.phone, u.role, u.created_at,
        COUNT(o.id)                             AS order_count,
        COALESCE(SUM(o.total_price), 0)         AS total_spent
      FROM users u
      LEFT JOIN orders o ON o.user_id = u.id AND o.status != 'cancelled'
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `);

    return NextResponse.json({ users: result.rows });
  } catch (err) {
    console.error("Admin users error:", err);
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}
