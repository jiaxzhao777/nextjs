export const dynamic = "force-dynamic";
export const revalidate = 10;

export async function GET() {
  console.log("GET /api/time");
  return Response.json({
    data: new Date().toLocaleTimeString(),
    params: searchParams.toString(),
  });
}

export async function POST() {
  console.log("POST /api/time");
  return Response.json({ data: new Date().toLocaleTimeString() });
}

export async function GET(request) {
  const token = request.cookies.get("token");
  return Response.json({ data: new Date().toLocaleTimeString() });
}
