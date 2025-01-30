import connectToDatabase from "@/lib/dbConfig/connectToDataBase";
import { NextResponse } from "next/server";
import UserModel from "@/lib/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  await connectToDatabase();

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Preencha os campos obrigatórios.",
        },
        { status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Usuário não existe." },
        { status: 401 }
      );
    }

    const passwordsMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordsMatch) {
      return NextResponse.json(
        { message: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    const { SECRET_KEY } = process.env;

    const token = jwt.sign({ userId: existingUser._id }, SECRET_KEY as string);

    try {
      const response = NextResponse.json(
        { message: "Login efetuado com sucesso.", token },
        { status: 200 }
      );
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 24 * 60 * 60,
      });

      return response;
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: `Não foi possível fazer login: ${error}`,
        }),
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
