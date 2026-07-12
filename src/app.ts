import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import router from './routes/routes';
import corsOptions from './config/corsOptions';

// Initialize the express app.
const app: Application = express();

// Enable CORS.
app.use(corsOptions)

// Middleware setup.
app.use(express.json());
app.use(cookieParser());
app.use('/', router);

// Export the app to be used elsewhere.
export default app;
