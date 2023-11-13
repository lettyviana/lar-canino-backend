import connectToDatabase from "@/libs/connectToDataBase";
import Dog from "@/models/dog";
import { NextResponse } from "next/server";

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

  await connectToDatabase();
  await Dog.create(dogData);

  return NextResponse.json(
    { message: "Registro do cão criado." },
    { status: 201 }
  );
}

export async function GET(request: Request) {
  await connectToDatabase();
  const dogs = await Dog.find();
  return NextResponse.json(
    { dogs },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await connectToDatabase();
  await Dog.findByIdAndDelete(id);
  return NextResponse.json({ message: "Registro excluído" }, { status: 200 });
}
