import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenFromRequest } from "@/lib/auth";

const VALID_STATUSES = ["pending", "confirmed", "preparing", "ready", "delivering", "delivered", "cancelled"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) return NextResponse.json({ error: "Нэвтрэх шаардлагатай" }, { status: 401 });

    const decoded = verifyToken(token) as { id: number; email: string; role?: string } | null;
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Зөвхөн админ нэвтрэх боломжтой" }, { status: 403 });
    }

    const { status } = await req.json();
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Буруу статус" }, { status: 400 });
    }

    const { query } = await import("@/lib/db");
    await query(
      "UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2",
      [status, params.id]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin update order error:", err);
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}
