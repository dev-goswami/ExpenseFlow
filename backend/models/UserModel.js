import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            minLength: 2,
            maxLength: 50,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
    },
    { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
