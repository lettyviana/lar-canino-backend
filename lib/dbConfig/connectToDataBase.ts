import mongoose from "mongoose";

const { MONGODB_CONNECTION_STRING } = process.env;

const connectToDatabase = async () => {
  if (!MONGODB_CONNECTION_STRING) {
    return new Response(
      JSON.stringify({
        error:
          "A variável de ambiente de configuração do banco não foi informada.",
      }),
      { status: 500 }
    );
  }

  try {
    if (mongoose.connection.readyState === 0) {
      mongoose.connection.on("connected", () =>
      console.log("Banco de dados conectado.")
      );
      await mongoose.connect(MONGODB_CONNECTION_STRING);
    }
  } catch (error: any) {
    mongoose.connection.on("error", (error) =>
        console.log(`Erro ao conectar ao banco de dados: ${error}`)
      );
  }
};

export default connectToDatabase;
