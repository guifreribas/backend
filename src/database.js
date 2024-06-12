import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.ATLAS_URI || "mongodb://localhost/sprint8";

const db = mongoose.connect(MONGODB_URI);
