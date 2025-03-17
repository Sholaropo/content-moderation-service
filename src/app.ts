import express, { Express, Request, Response } from "express";
import cors from "cors";
import moderationRoutes from "./api/v1/routes/moderationRoutes";

const allowedOrigins = [
  "http://localhost:3000",
  "https://content-manager.example.com",
  "https://moderator.example.com",
];

// CORS configuration
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Allowed headers
  credentials: true, // Allow credentials
  preflightContinue: false,
  optionsSuccessStatus: 204, // Properly handle preflight OPTIONS requests
  maxAge: 86400, // Cache preflight response for 24 hours
};

const app: Express = express();
app.use(express.json());
app.use(cors(corsOptions));

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
