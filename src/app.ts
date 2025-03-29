import express, { Application } from 'express';
import corsOptions from './config/corsOptions';
import router from './routes';

// Initialize the express app.
const app: Application = express();

// Enable CORS.
app.use(corsOptions)

// Middleware setup.
app.use(express.json());
app.use("/", router);

// Export the app to be used elsewhere.
export default app;
