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

//Static files
app.use(express.static(path.join(__dirname, "public")));
