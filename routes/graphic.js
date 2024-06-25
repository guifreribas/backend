import app from "../src/server.js";
import Graphic from "../models/graphic.js";

app.get("/graphics", async (req, res) => {
    const { type } = req.query;
    let query = {};
    if (type) query = { type };
    const allGraphics = await Graphic.find(query);
    try {
        res.json({
            count: allGraphics.length,
            page: "page",
            graphics: allGraphics,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error getting graphics", error, ok: false });
    }
});

app.post("/graphics", async (req, res) => {
    try {
        const newGraphic = new Graphic(req.body);
        const savedNewGraphic = await newGraphic.save();
        res.json({
            graphic: savedNewGraphic,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error creating graphic", error, ok: false });
    }
});

app.put("/graphics/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAt = new Date();
        const updatedGraphic = await Graphic.findByIdAndUpdate(
            id,
            { ...req.body, updatedAt },
            {
                new: true,
                runValidators: true,
            }
        );
        if (!updatedGraphic) {
            res.status(404).json({ message: "Graphic not found", ok: false });
            return;
        }
        res.json({
            message: "Graphic updated",
            graphic: updatedGraphic,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error updating graphic", error, ok: false });
    }
});

app.delete("/graphics/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const graphic = await Graphic.findById(id);
        if (!graphic) {
            res.status(404).json({ message: "Graphic not found", ok: false });
            return;
        }
        await Graphic.findByIdAndDelete(id);
        res.json({
            message: "Graphic deleted",
            graphic: graphic,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error deleting graphic", error, ok: false });
    }
});

app.get("/graphics/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const graphic = await Graphic.findById(id);
        if (!graphic) {
            res.status(404).json({ message: "Graphic not found", ok: false });
            return;
        }
        res.json({
            count: (await Graphic.find()).length,
            page: 1,
            graphic: graphic,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error getting graphic", error, ok: false });
    }
});
