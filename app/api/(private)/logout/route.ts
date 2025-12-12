import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.json(
      { message: "Usuário não está logado." },
      { status: 401 }
    );
  }

  const response = NextResponse.json(
    { message: "Logout efetuado com sucesso. Redirecionando ao login." },
    { status: 200 }
  );

  response.cookies.delete("token");

  return response;
}
