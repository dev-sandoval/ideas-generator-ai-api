import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { createAIService } from "./services/aiService";
import { registerRoutes } from "./routes";
import { config } from "./config/env";
import { corsConfig } from "./config/cors";
import { logRequest } from "./middleware/logger";
import { handleError } from "./middleware/errorHandler";
import { logger } from "./utils/logger";

// Crear instancia del servicio de IA
let aiService: ReturnType<typeof createAIService> | null = null;

try {
  aiService = createAIService();
  logger.info("Servicio de IA inicializado correctamente");
} catch (error) {
  logger.error("Error al inicializar el servicio de IA", error);
  logger.warn("Asegúrate de configurar AI_API_KEY en el archivo .env");
}

// Crear aplicación Elysia
const app = new Elysia()
  // Configurar CORS
  .use(cors(corsConfig))
  // Middleware de logging
  .onRequest(logRequest)
  // Middleware de manejo de errores
  .onError(handleError);

// Registrar todas las rutas
registerRoutes(app, aiService);

// Iniciar servidor
app.listen(config.port);

logger.info("=".repeat(70));
logger.info(`🚀 Servidor corriendo en http://${app.server?.hostname}:${app.server?.port}`);
logger.info("=".repeat(70));
logger.info("📍 Endpoints disponibles:");
logger.info("   GET  /                        - Información de la API");
logger.info("   GET  /api/status              - Estado del servidor");
logger.info("   POST /api/generate-ideas      - Generar ideas de negocio");
logger.info("-".repeat(70));
logger.info("🔧 Configuración:");
logger.info(`   - Puerto: ${config.port}`);
logger.info(`   - Entorno: ${config.nodeEnv}`);
logger.info(`   - Proveedor IA: ${config.aiProvider}`);
logger.info(`   - CORS: ${config.allowedOrigins.join(", ")}`);
logger.info("=".repeat(70));
