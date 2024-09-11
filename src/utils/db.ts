import mongoose from "mongoose";

const dbConnection = async () => {
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
  }
  try {
    await mongoose.connect(mongoURI);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;
