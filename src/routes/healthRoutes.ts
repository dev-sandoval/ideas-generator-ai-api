import { HealthController } from "../controllers/healthController";

/**
 * Registra las rutas de salud y estado del servidor
 */
export function registerHealthRoutes(app: any): void {
  // GET / - Información general de la API
  app.get("/", () => HealthController.getRoot());

  // GET /api/status - Estado del servidor
  app.get("/api/status", () => HealthController.getStatus());
}
