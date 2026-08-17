import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email, and password are required",
        });
    }

    if (name.trim().length < 2 || name.trim().length > 50) {
        return res.status(400).json({
            message: "Name must be between 2 and 50 characters",
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters",
        });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists) {
        return res.status(409).json({
            message: "User already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const dbUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
    });

    const token = generateToken(dbUser._id);

    res.status(201).json({
        id: dbUser._id,
        name: dbUser.name,
        email: dbUser.email,
        token: token,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required",
        });
    }

    const dbUser = await User.findOne({ email: email.toLowerCase() });

    if (!dbUser) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }

    const match = await bcrypt.compare(password, dbUser.password);

    if (!match) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }

    const token = generateToken(dbUser._id);

    res.json({
        id: dbUser._id,
        name: dbUser.name,
        email: dbUser.email,
        token: token,
    });
};

export { register, login };
