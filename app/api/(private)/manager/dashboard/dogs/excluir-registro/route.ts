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

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    await connectToDatabase();
    await DogModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Registro excluído" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Não foi possível excluir o registro: ${error}` },
      { status: 400 }
    );
  }
}
