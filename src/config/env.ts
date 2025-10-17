export const config = {
  // Server
  port: parseInt(process.env.PORT || "3000", 10),
  nodeEnv: process.env.NODE_ENV || "development",

  // CORS
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:5173"],

  // AI Service
  aiProvider: (process.env.AI_PROVIDER || "gemini") as "gemini" | "openai",
  aiApiKey: process.env.AI_API_KEY || "",

  // API
  apiVersion: "1.0.0",
} as const;

export const isDevelopment = config.nodeEnv === "development";
export const isProduction = config.nodeEnv === "production";
