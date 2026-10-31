
import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is missing from server/.env");
  }

  await mongoose.connect(uri);
  console.log("MongoDB connected successfully");
};

export default connectDB;
