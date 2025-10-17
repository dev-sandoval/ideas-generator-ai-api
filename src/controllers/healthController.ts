import type { StatusResponse } from "../types";
import { config } from "../config/env";

/**
 * Controller para endpoints de salud y estado del servidor
 */
export class HealthController {
  /**
   * GET / - Información general de la API
   */
  static getRoot() {
    return {
      message: "Ideas Business AI - API Backend",
      version: config.apiVersion,
      docs: "/api/status",
    };
  }

  /**
   * GET /api/status - Estado del servidor
   */
  static getStatus(): StatusResponse {
    return {
      status: "online",
      timestamp: new Date().toISOString(),
      version: config.apiVersion,
    };
  }
}
