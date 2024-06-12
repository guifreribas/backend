import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/user.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// start();
async function start() {
    const user = new User({
        name: "Guillermo",
        lastname: "Freire",
        age: 25,
        email: "guillermo@gmail.com",
        password: "12345678",
        phone: "+34 999 999 999",
        gender: "MALE",
    });
    await user.save();
    console.log("User created", user);
}

const app = express();

export default app;

//Settings
app.set("port", process.env.PORT || 4000);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: "http://localhost:4200",
    })
);

//Globals variables

//Routes
app.get("/users", async (req, res) => {
    const allUsers = await User.find();
    try {
        res.json({
            count: allUsers.length,
            page: "page",
            users: allUsers,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error getting users", error, ok: false });
    }
});

app.post("/users", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json({
            user: newUser,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error creating user", error, ok: false });
    }
});

app.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found", ok: false });
            return;
        }
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json({
            user: updatedUser,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error updating user", error, ok: false });
    }
});

app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found", ok: false });
            return;
        }
        await User.findByIdAndDelete(id);
        res.json({
            message: "Hello World! from delete",
            user: user,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error deleting user", error, ok: false });
    }
});

app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found", ok: false });
            return;
        }
        res.json({
            count: (await User.find()).length,
            page: 1,
            user: user,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error getting user", error, ok: false });
    }
});

//Static files
app.use(express.static(path.join(__dirname, "public")));
