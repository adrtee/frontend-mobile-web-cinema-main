import { NextResponse } from "next/server";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const url = `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`;
  console.log(`[/api/discover] Retrieving movie data of id ${id}`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status_code === 34) {
      console.log(`[/api/discover] The movie data of id ${id} is unavailable`);
      return NextResponse.json({ data: null, message: data.status_message });
    } else if (data.status_code === undefined) {
      console.log(
        `[/api/discover] Successfully retrieved movie data of id ${id}`
      );
      return NextResponse.json({ data: data, message: "Success" });
    } else {
      console.error(`[/api/discover] Error: ${data.status_message}`);
      return NextResponse.json({ data: null, message: data.status_message });
    }
  } catch (error) {
    console.error(`[/api/discover] Error: ${error}`);
    return NextResponse.json({ message: error, status: 500 });
  }
}
