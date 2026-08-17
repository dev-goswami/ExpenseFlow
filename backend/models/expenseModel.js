import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
        category: {
            type: String,
            trim: true,
            required: true,
        },
        date: {
            type: Date,
            required: true,
            validate: {
                validator: function (value) {
                    return value <= new Date();
                },
                message: "Expense date cannot be in future",
            },
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
