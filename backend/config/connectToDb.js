import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database Connected Successfully.")
    }
    catch (err){
        console.log(err);
    }
}

export default connectToDb;