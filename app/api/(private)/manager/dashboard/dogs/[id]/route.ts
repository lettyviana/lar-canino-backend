import connectToDatabase from "@/lib/dbConfig/connectToDataBase";
import DogModel from "@/lib/models/dog";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connectToDatabase();
    const dog = await DogModel.findOne({ _id: id });
    return NextResponse.json({ dog }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Erro ao buscar os dados: ${error}` },
      { status: 500 }
    );
  }
}
