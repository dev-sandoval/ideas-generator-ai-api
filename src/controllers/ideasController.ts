import type { GenerateIdeasRequest, GenerateIdeasResponse, ErrorResponse } from "../types";
import type { AIService } from "../services/aiService";
import { validateGenerateIdeasRequest } from "../middleware/validation";
import { logger } from "../utils/logger";

/**
 * Controller para endpoints relacionados con generación de ideas
 */
export class IdeasController {
  private aiService: AIService | null;

  constructor(aiService: AIService | null) {
    this.aiService = aiService;
  }

  /**
   * POST /api/generate-ideas - Genera ideas de negocio
   */
  async generateIdeas({
    body,
    set,
  }: {
    body: unknown;
    set: any;
  }): Promise<GenerateIdeasResponse | ErrorResponse> {
    try {
      // Validar que el servicio de IA esté disponible
      if (!this.aiService) {
        set.status = 503;
        return {
          success: false,
          error: "Service Unavailable",
          message: "El servicio de IA no está configurado correctamente",
        };
      }

      // Validar el request
      const validation = validateGenerateIdeasRequest(body);
      if (!validation.valid) {
        set.status = 400;
        return {
          success: false,
          error: "Bad Request",
          message: validation.error || "Datos inválidos",
        };
      }

      const request = body as GenerateIdeasRequest;
      const businessType = request.businessType.trim();

      // Generar ideas usando el servicio de IA
      const ideas = await this.aiService.generateIdeas(businessType);

      // Retornar respuesta exitosa
      return {
        success: true,
        ideas,
        businessType,
      };
    } catch (error) {
      logger.error("Error al generar ideas", error);
      set.status = 500;

      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido al generar ideas";

      return {
        success: false,
        error: "Internal Server Error",
        message: errorMessage,
      };
    }
  }
}
