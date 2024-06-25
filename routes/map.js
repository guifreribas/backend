import app from "../src/server.js";
import Map from "../models/map.js";

app.get("/maps", async (req, res) => {
    const { category } = req.query;
    let query = {};
    if (category) {
        query = { category };
    }
    const allMaps = await Map.find(query);
    try {
        res.json({
            count: allMaps.length,
            page: "page",
            markers: allMaps,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error getting maps", error, ok: false });
    }
});

app.post("/maps", async (req, res) => {
    try {
        const newMap = new Map(req.body);
        const savedNewMap = await newMap.save();
        res.json({
            ok: true,
            marker: savedNewMap,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error creating map", error, ok: false });
    }
});

app.put("/maps/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMap = await Map.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedMap) {
            res.status(404).json({ message: "Map not found", ok: false });
            return;
        }
        res.json({
            message: "Marker updated",
            map: updatedMap,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error updating map", error, ok: false });
    }
});

app.delete("/maps/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const map = await Map.findById(id);
        if (!map) {
            res.status(404).json({ message: "Map not found", ok: false });
            return;
        }
        await Map.findByIdAndDelete(id);
        res.json({
            message: "Marker deleted",
            map: map,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error deleting map", error, ok: false });
    }
});

app.get("/maps/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const map = await Map.findById(id);
        if (!map) {
            res.status(404).json({ message: "Map not found", ok: false });
            return;
        }
        res.json({
            count: (await Map.find()).length,
            page: 1,
            map: map,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error getting map", error, ok: false });
    }
});
