import mongoose from "mongoose";
import "dotenv/config"; // Ensure .env is loaded

const mongo_url = process.env.MONGO_URL;

if (!mongo_url) {
    console.error(" MongoDB connection URL is missing! Check your .env file.");
    process.exit(1);
}

mongoose.connect(mongo_url)
    .then(() => console.log(" Database connected successfully"))
    .catch(err => console.error(" Database connection error:", err));

export default mongoose;
