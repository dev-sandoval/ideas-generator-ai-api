import { config } from "./env";

export const corsConfig = {
  origin: config.allowedOrigins,
  methods: ["GET", "POST"],
  credentials: true,
};
