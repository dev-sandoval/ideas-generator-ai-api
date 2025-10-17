import type { AIService } from "../services/aiService";
import { registerHealthRoutes } from "./healthRoutes";
import { registerIdeasRoutes } from "./ideasRoutes";

/**
 * Registra todas las rutas de la aplicación
 */
export function registerRoutes(app: any, aiService: AIService | null): void {
  // Rutas de salud y status
  registerHealthRoutes(app);

  // Rutas de ideas
  registerIdeasRoutes(app, aiService);
}
