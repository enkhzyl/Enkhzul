import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Бүх талбарыг бөглөнө үү" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой" }, { status: 400 });
    }

    try {
      const { query } = await import("@/lib/db");

      const existing = await query("SELECT id FROM users WHERE email = $1", [email.toLowerCase()]);
      if (existing.rows.length > 0) {
        return NextResponse.json({ error: "Энэ имэйл хаяг бүртгэлтэй байна" }, { status: 409 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await query(
        "INSERT INTO users (name, email, password_hash, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, name, email",
        [name.trim(), email.toLowerCase(), hashedPassword]
      );

      const user = result.rows[0];
      const token = signToken({ id: user.id, email: user.email });

      return NextResponse.json({ token, user }, { status: 201 });
    } catch (dbErr) {
      // DB холбогдоогүй — demo горим: локал файлд хадгална
      console.warn("DB not connected, demo register:", dbErr);

      const { findDemoUser, saveDemoUser } = await import("@/lib/demoStore");
      const existing = findDemoUser(email.toLowerCase());
      if (existing) {
        return NextResponse.json({ error: "Энэ имэйл хаяг бүртгэлтэй байна" }, { status: 409 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const id = Date.now();
      saveDemoUser({ id, name: name.trim(), email: email.toLowerCase(), password_hash: hashedPassword });

      const token = signToken({ id, email: email.toLowerCase() });
      return NextResponse.json({
        token,
        user: { id, name: name.trim(), email: email.toLowerCase() },
      }, { status: 201 });
    }
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}
