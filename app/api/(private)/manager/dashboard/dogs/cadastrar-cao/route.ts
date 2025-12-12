import connectToDatabase from "@/lib/dbConfig/connectToDataBase";
import { NextResponse } from "next/server";
import DogModel from "@/lib/models/dog";

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

export async function POST(request: Request) {
  const {
    name,
    breed,
    image,
    imageDescription,
    gender,
    age,
    behavior,
    innoculations,
    diseases,
    parasites,
    description,
  } = await request.json();

  if (
    !name ||
    !breed ||
    !image ||
    !imageDescription ||
    !gender ||
    !age ||
    !behavior ||
    !innoculations ||
    !diseases ||
    !parasites ||
    !description
  ) {
    return NextResponse.json(
      { message: "Preencha todos os campos." },
      { status: 400 }
    );
  }

  const dogData = {
    name,
    breed,
    image,
    imageDescription,
    gender,
    age,
    behavior,
    innoculations,
    diseases,
    parasites,
    description,
  };

  try {
    await connectToDatabase();
    await DogModel.create(dogData);

    return NextResponse.json(
      { message: "Registro do cão criado." },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Não foi possível cadastrar: ${error}` },
      { status: 400 }
    );
  }
}
