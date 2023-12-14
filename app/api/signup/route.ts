import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");
  const password = request.nextUrl.searchParams.get("password");

  try {
    const hashedPassword = await bcrypt.hash(password!, 10);

    const result =
      await sql`INSERT INTO users(username, password) VALUES(${username}, ${hashedPassword})`;

    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
