import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  try {
    const user = await sql`SELECT * FROM users WHERE username = ${username}`;

    if (user.rows.length > 0) {
      const passwordMatches = await bcrypt.compare(
        password,
        user.rows[0].password
      );

      if (passwordMatches) {
        return NextResponse.json({ user }, { status: 200 });
      } else {
        return NextResponse.json(
          { status: "Error", message: "Invalid password" },
          { status: 403 }
        );
      }
    } else {
      return NextResponse.json(
        { status: "Error", message: "User not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");
  const password = request.nextUrl.searchParams.get("password");

  try {
    const user = await sql`SELECT * FROM users WHERE username = ${username}`;

    if (user.rows.length > 0) {
      const passwordMatches = await bcrypt.compare(
        password!,
        user.rows[0].password
      );

      if (passwordMatches) {
        return NextResponse.json({ user: user.rows[0] }, { status: 200 });
      } else {
        return NextResponse.json(
          { status: "Error", message: "Invalid password" },
          { status: 403 }
        );
      }
    } else {
      return NextResponse.json(
        { status: "Error", message: "User not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
