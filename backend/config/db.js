import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected");
    } catch (error) {
        console.error(error);
        console.log("❌ Failed");
    }
};

export default connectDB;
