import connectToDatabase from "@/lib/dbConfig/connectToDataBase";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/lib/models/user";
import bcrypt from "bcryptjs";

export async function OPTIONS(request: Request) {
  const allowedOrigin = request.headers.get("origin");
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin || "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export async function POST(request: NextRequest) {
  await connectToDatabase();

  try {
    const isLoggedIn = request.cookies.get("token") || "";

    if (!isLoggedIn) {
      return NextResponse.json(
        { error: "Faça login para acessar esta página." },
        { status: 401 }
      );
    }

    const {
      username,
      email,
      password,
      role = "manager",
    } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        {
          message: "Preencha os campos obrigatórios.",
        },
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "E-mail já cadastrado." },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const userData = {
        username,
        email,
        password: hashedPassword,
        role,
      };

      await UserModel.create(userData);

      return NextResponse.json(
        { message: "Usuário cadastrado com sucesso." },
        { status: 201 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: `Não foi possível cadastrar o usuário: ${error}`,
        }),
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
