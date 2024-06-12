import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

export default app;

//Settings
app.set("port", process.env.PORT || 4000);

//Middleware
app.use(express.urlencoded({ extended: false }));

//Globals variables

//Routes
app.get("/users", (req, res) => {
  res.json({
    message: "Hello World! from get",
    views: app.get("views"),
  });
});

app.post("/users", (req, res) => {
  res.json({ message: "Hello World! from post" });
});

app.put("/users", (req, res) => {
  res.json({ message: "Hello World! from put" });
});

app.delete("/users", (req, res) => {
  res.json({ message: "Hello World! from delete" });
});

//Static files
app.use(express.static(path.join(__dirname, "public")));
