import connectToDatabase from "@/lib/dbConfig/connectToDataBase";
import UserModel from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const users = await UserModel.find().select("-password");
    return NextResponse.json(
      { users },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Não foi possível buscar os dados: ${error}` },
      { status: 400 }
    );
  }
}
