import { NextResponse } from "next/server";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sortBy = searchParams.get("sortBy");
  const page = searchParams.get("page");
  console.log(
    `[/api/discover] Retrieving a movie list sorted by ${sortBy} and page ${page}`
  );

  const url = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_release_type=3|2&include_video=true&vote_count.gte=5&with_runtime.gte=50&primary_release_date.lte=2024-12-31&sort_by=${sortBy}&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("[/api/discover] Successfully retrieved movie list");
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
