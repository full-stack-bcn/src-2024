import { serverSearchMovies } from "@/lib/movies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");
  if (query === null) {
    return new NextResponse(JSON.stringify({ error: `Missing "query" parameter.`}), {
      status: 404,
      statusText: "Missing 'query' parameter."
    });
  }
  const movies = await serverSearchMovies(query)
  return NextResponse.json(movies);
}
