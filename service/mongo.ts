import mongoose from "mongoose";
export async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URL_STRING as string);
    console.log("database connected successfully!");
  } catch (error) {
    console.log(error);
  }
}

dbConnect();
