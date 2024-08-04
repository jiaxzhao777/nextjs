import { NextResponse } from "next/server";

// export async function GET(request, context) {
//   //  访问 /home, pathname 的值为 /home
// 	const pathname = request.nextUrl.pathname
// 	// 访问 /home?name=lee, searchParams 的值为 { 'name': 'lee' }
// 	const searchParams = request.nextUrl.searchParams
// }

export async function GET() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await res.json();

  return NextResponse.json({ data });
}

export async function POST(request) {
  const article = await request.json();

  return NextResponse.json(
    {
      id: Math.random().toString(36).slice(-8),
      data: article,
    },
    { status: 201 }
  );
}
