import { getListOfCountries } from "@/app/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const data = await getListOfCountries();

  return NextResponse.json({ data }, { status: 200 });
}
