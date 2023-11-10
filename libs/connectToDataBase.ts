import mongoose from "mongoose";

const { MONGODB_CONNECTION_STRING } = process.env;

if (!MONGODB_CONNECTION_STRING) {
  throw new Error(
    "A variável de ambiente MONGODB_CONNECTION_STRING não está definida."
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_STRING);
    console.log("Conectado ao banco de dados.");
  } catch (error) {
    console.error("Erro ao conectar o MongoDB:", error);
  }
};

export default connectToDatabase;
