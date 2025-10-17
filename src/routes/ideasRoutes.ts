import { IdeasController } from "../controllers/ideasController";
import type { AIService } from "../services/aiService";

/**
 * Registra las rutas relacionadas con la generación de ideas
 */
export function registerIdeasRoutes(app: any, aiService: AIService | null): void {
  const controller = new IdeasController(aiService);

  // POST /api/generate-ideas - Genera ideas de negocio
  app.post("/api/generate-ideas", ({ body, set }: any) => controller.generateIdeas({ body, set }));
}
