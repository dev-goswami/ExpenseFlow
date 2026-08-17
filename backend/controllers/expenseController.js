import Expense from "../models/expenseModel.js";

const createExpense = async (req, res) => {
    const user = req.user._id;
    const { amount, description, category, date } = req.body;

    if (
        amount === undefined ||
        amount === null ||
        !description ||
        !category ||
        !date
    ) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    if (amount <= 0) {
        return res.status(400).json({
            message: "Amount must be greater than 0",
        });
    }

    const expense = await Expense.create({
        amount,
        description,
        category,
        date,
        user,
    });

    res.status(201).json(expense);
};

export { createExpense };
