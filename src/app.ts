import express, { Application } from "express";
import router from "./routes";
import auth from "./routes/auth";

// Initialize the express app.
const app: Application = express();

// Middleware setup.
app.use(express.json());
app.use("/", router);
app.use("/api/auth", auth);

// Export the app to be used elsewhere.
export default app;
