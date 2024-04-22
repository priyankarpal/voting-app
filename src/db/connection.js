import mongoose from "mongoose";
import dotenv from "dotenv/config";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDb connected ");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
