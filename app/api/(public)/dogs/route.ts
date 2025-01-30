import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConfig/connectToDataBase";
import DogModel from "@/lib/models/dog";

export async function GET() {
  await connectToDatabase();
  try {
    const dogs = await DogModel.find();
    return NextResponse.json(
      { dogs },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Não foi possível buscar os dados: ${error}` },
      { status: 400 }
    );
  }
}
