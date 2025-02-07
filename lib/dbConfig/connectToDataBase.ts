import mongoose from "mongoose";

const { MONGODB_CONNECTION_STRING } = process.env;

if (!MONGODB_CONNECTION_STRING) {
  throw new Error(
    "A variável de ambiente MONGODB_CONNECTION_STRING não foi definida no arquivo .env."
  );
}

interface IMongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalAny: any = global;

let cached: IMongooseCache = globalAny.mongoose;

if (!cached) {
  cached = globalAny.mongoose = { conn: null, promise: null };
}

const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
    .connect(MONGODB_CONNECTION_STRING)
    .then((mongoose) => {
      console.log("Banco de dados conectado.");
      return mongoose;
    })
    .catch((error) => {
      console.error("Erro ao conectar ao banco de dados:", error);
      throw error;
    });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};

export default connectToDatabase;
