import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { createExpense } from "../controllers/expenseController.js";

const router = express.Router();

router.post("/", protect, createExpense);

export default router;
