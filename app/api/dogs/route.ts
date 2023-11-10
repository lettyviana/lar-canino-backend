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
