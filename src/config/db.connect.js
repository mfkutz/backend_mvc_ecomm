import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = async () => {
  mongoose
    .connect(config.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};
