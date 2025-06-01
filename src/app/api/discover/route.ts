import { NextResponse } from "next/server";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sortBy = searchParams.get("sortBy");
  const page = searchParams.get("page");

  const url = `${TMDB_BASE_URL}?api_key=${TMDB_API_KEY}&primary_release_date.lte=2024-12-31&sort_by=${sortBy}&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
