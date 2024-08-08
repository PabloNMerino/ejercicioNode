import mongoose from "mongoose";
import { config } from "dotenv";

config();

export default async function dbConnect() {
    if(mongoose.connection.readyState >= 1) return;
    try{
        const dbURI = process.env.DB_URI!;
        await mongoose.connect(dbURI);
        console.log("Database Connected");
    } catch {
        console.error("Error connecting to the database");
    }
}