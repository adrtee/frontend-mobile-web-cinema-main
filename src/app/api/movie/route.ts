import { NextResponse } from "next/server";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const url = `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status_code === 34) {
      return NextResponse.json({ data: null, message: data.status_message });
    } else if (data.status_code === undefined) {
      return NextResponse.json({ data: data, message: "Success" });
    } else {
      return NextResponse.json({ data: null, message: data.status_message });
    }
  } catch (error) {
    return NextResponse.json({ message: error, status: 500 });
  }
}
