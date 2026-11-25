import mongoose from "mongoose";
import { _Config } from "./config.js";

const connectDB = async () => {
  try {
    const response = await mongoose.connect(_Config.MONGO);
    console.log(`DB Connected Successfully ${response.connection.host}`);
  } catch (error) {
    console.log(`Error while Connecting DB ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
