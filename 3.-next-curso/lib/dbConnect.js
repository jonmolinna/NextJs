import mongoose from "mongoose";

const URI_MONGO = process.env.MONGO_URI;

if (!URI_MONGO) {
  throw new Error("Defina la variable de entorno URI_MONGO, dentro env.local");
}

// Global se usa aqui para mantener una conexion en cache a traves de recargas en caliente
// En desarrollo, esto evita que las conexiones crezcan exponencialmente
// Durante el uso de la ruta API.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
    };

    // mongoose.connect(URI_MONGO, opts)

    cached.promise = mongoose.connect(URI_MONGO).then((mongoose) => {
      return mongoose;
    });
  }

  console.log("mongoDB Conectado");

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
