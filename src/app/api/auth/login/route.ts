import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Имэйл болон нууц үг шаардлагатай" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase();

    // 1. DB-ээс хайх
    try {
      const { query } = await import("@/lib/db");
      const result = await query("SELECT * FROM users WHERE email = $1", [normalizedEmail]);
      const user = result.rows[0];

      if (user) {
        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
          return NextResponse.json({ error: "Имэйл эсвэл нууц үг буруу байна" }, { status: 401 });
        }
        const token = signToken({ id: user.id, email: user.email, role: user.role });
        return NextResponse.json({
          token,
          user: { id: user.id, name: user.name, email: user.email, role: user.role },
        });
      }
    } catch {
      // DB холбогдоогүй — demo store-оос хайна
    }

    // 2. Demo store-оос хайх
    const { findDemoUser } = await import("@/lib/demoStore");
    const demoUser = findDemoUser(normalizedEmail);
    if (demoUser) {
      const valid = await bcrypt.compare(password, demoUser.password_hash);
      if (!valid) {
        return NextResponse.json({ error: "Имэйл эсвэл нууц үг буруу байна" }, { status: 401 });
      }
      const token = signToken({ id: demoUser.id, email: demoUser.email, role: "user" });
      return NextResponse.json({
        token,
        user: { id: demoUser.id, name: demoUser.name, email: demoUser.email, role: "user" },
      });
    }

    // 3. Дефолт demo хэрэглэгч
    if (normalizedEmail === "demo@test.mn" && password === "demo123") {
      const token = signToken({ id: 1, email: normalizedEmail, role: "user" });
      return NextResponse.json({
        token,
        user: { id: 1, name: "Демо Хэрэглэгч", email: normalizedEmail, role: "user" },
      });
    }

    return NextResponse.json({ error: "Имэйл эсвэл нууц үг буруу байна" }, { status: 401 });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}
