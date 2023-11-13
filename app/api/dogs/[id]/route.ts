import connectToDatabase from "@/libs/connectToDataBase";
import Dog from "@/models/dog";
import { NextResponse } from "next/server";

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
  await connectToDatabase();
  await Dog.findByIdAndUpdate(id, dogData);
  return NextResponse.json({ message: "Registro atualizado" }, { status: 200 });
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectToDatabase();
  const dog = await Dog.findOne({ _id: id });
  return NextResponse.json({ dog }, { status: 200 });
}
