import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";

// Load environment variables from .env file before internal imports
dotenv.config();
const NODE_ENV = process.env.NODE_ENV || "development";
const LOG_LEVEL = process.env.LOG_LEVEL || (NODE_ENV === "production" ? "combined" : "dev");

import moderationRoutes from "./api/v1/routes/moderationRoutes";

const app: Express = express();
app.use(express.json());
app.use(morgan(LOG_LEVEL));

/**
 * Mount moderation routes on /api/v1/moderation
 */
app.use("/api/v1/moderation", moderationRoutes);

/**
 * Default error handler for unmatched routes
 */
app.use((req: Request, res: Response): void => {
  res.status(404).json({ message: "Endpoint not found" });
});

export default app;
