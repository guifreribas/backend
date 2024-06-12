import config from "dotenv/config";
import app from "./server.js";
import "./database.js";

app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
});
