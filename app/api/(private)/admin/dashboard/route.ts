import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "@/lib/models/user";

export async function GET(request: NextRequest) {
  const isLoggedIn = request.cookies.get("token");

  if (!isLoggedIn) {
    return NextResponse.json(
      { error: "Faça login para acessar esta página." },
      { status: 401 }
    );
  }

  const { SECRET_KEY } = process.env;
  const decodedToken = jwt.verify(
    isLoggedIn.value,
    SECRET_KEY as string
  ) as JwtPayload;

  if (
    !decodedToken ||
    typeof decodedToken === "string" ||
    !decodedToken.userId
  ) {
    return NextResponse.json(
      { error: "A autenticação não foi concluída." },
      { status: 401 }
    );
  }

  const { userId } = decodedToken;

  const existingUser = await UserModel.findOne({ _id: userId }).select(
    "username email role"
  );

  if (!existingUser) {
    return NextResponse.json(
      { message: "Usuário não encontrado." },
      { status: 401 }
    );
  }

  return NextResponse.json({ user: existingUser }, { status: 200 });
}
