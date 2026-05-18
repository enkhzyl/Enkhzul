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

    const [totalOrders, totalUsers, totalRevenue, pendingOrders, recentOrders] = await Promise.all([
      query("SELECT COUNT(*) as count FROM orders"),
      query("SELECT COUNT(*) as count FROM users WHERE role = 'user'"),
      query("SELECT COALESCE(SUM(total_price), 0) as total FROM orders WHERE status != 'cancelled'"),
      query("SELECT COUNT(*) as count FROM orders WHERE status IN ('pending', 'confirmed', 'preparing')"),
      query(`
        SELECT o.id, o.status, o.total_price, o.created_at, u.name as user_name
        FROM orders o
        JOIN users u ON u.id = o.user_id
        ORDER BY o.created_at DESC
        LIMIT 5
      `),
    ]);

    return NextResponse.json({
      totalOrders: parseInt(totalOrders.rows[0].count),
      totalUsers: parseInt(totalUsers.rows[0].count),
      totalRevenue: parseInt(totalRevenue.rows[0].total),
      pendingOrders: parseInt(pendingOrders.rows[0].count),
      recentOrders: recentOrders.rows,
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}
