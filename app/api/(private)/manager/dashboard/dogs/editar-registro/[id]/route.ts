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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
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
    await DogModel.findByIdAndUpdate(id, dogData);
    return NextResponse.json(
      { message: "Registro atualizado" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Erro ao atualizar os dados: ${error}` },
      { status: 500 }
    );
  }
}
