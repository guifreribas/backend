import app from "../src/server.js";
import User from "../models/user.js";

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
        const savedNewUser = await newUser.save();
        res.json({
            user: savedNewUser,
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
