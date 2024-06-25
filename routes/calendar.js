import app from "../src/server.js";
import Calendar from "../models/calendar.js";

app.get("/calendars", async (req, res) => {
    const allCalendars = await Calendar.find();
    try {
        res.json({
            count: allCalendars.length,
            page: "page",
            calendars: allCalendars,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error getting calendars", error, ok: false });
    }
});

app.post("/calendars", async (req, res) => {
    try {
        const newCalendar = new Calendar(req.body);
        const savedNewCalendar = await newCalendar.save();
        res.json({
            calendar: savedNewCalendar,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error creating calendar", error, ok: false });
    }
});

app.put("/calendars/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAt = new Date();
        const updatedCalendar = await Calendar.findByIdAndUpdate(
            id,
            { ...req.body, updatedAt },
            {
                new: true,
                runValidators: true,
            }
        );
        if (!updatedCalendar) {
            res.status(404).json({ message: "Calendar not found", ok: false });
            return;
        }
        res.json({
            message: "Calendar updated",
            calendar: updatedCalendar,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error updating calendar", error, ok: false });
    }
});

app.delete("/calendars/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const calendar = await Calendar.findById(id);
        if (!calendar) {
            res.status(404).json({ message: "Calendar not found", ok: false });
            return;
        }
        await Calendar.findByIdAndDelete(id);
        res.json({
            message: "Calendar deleted",
            calendar: calendar,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error deleting calendar", error, ok: false });
    }
});

app.get("/calendars/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const calendar = await Calendar.findById(id);
        if (!calendar) {
            res.status(404).json({ message: "Calendar not found", ok: false });
            return;
        }
        res.json({
            count: (await Calendar.find()).length,
            page: 1,
            calendar: calendar,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error getting calendar", error, ok: false });
    }
});
