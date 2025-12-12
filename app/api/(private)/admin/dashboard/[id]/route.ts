import connectToDatabase from "@/lib/dbConfig/connectToDataBase";
import UserModel from "@/lib/models/user";
import { NextResponse } from "next/server";

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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { username } = await request.json();

  try {
    await connectToDatabase();
    const admin = await UserModel.findById(id);

    if (!admin) {
      return NextResponse.json(
        { error: "Usuário não encontrado!" },
        { status: 404 }
      );
    }

    if (username === admin.username) {
      return NextResponse.json(
        { message: "O nome de usuário é igual ao atual." },
        { status: 400 }
      );
    }

    const existingUsername = await UserModel.findOne({ username });

    if (existingUsername) {
      return NextResponse.json(
        { message: "O nome de usuário já está em uso." },
        { status: 400 }
      );
    }

    await UserModel.findByIdAndUpdate(id, { username });
    return NextResponse.json(
      { message: "Dados atualizados!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Erro ao atualizar os dados: ${error}` },
      { status: 400 }
    );
  }
}
