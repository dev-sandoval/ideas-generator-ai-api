import { isDevelopment } from "../config/env";

/**
 * Niveles de log
 */
export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

/**
 * Clase Logger centralizada para toda la aplicación
 */
class Logger {
  /**
   * Log de información general
   */
  info(message: string, ...args: any[]): void {
    console.log(`[${new Date().toISOString()}] [INFO] ${message}`, ...args);
  }

  /**
   * Log de errores
   */
  error(message: string, error?: any): void {
    console.error(`[${new Date().toISOString()}] [ERROR] ${message}`);
    if (error) {
      if (isDevelopment) {
        console.error(error);
      } else {
        // En producción solo logueamos el mensaje, no el stack trace completo
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Error details: ${errorMessage}`);
      }
    }
  }

  /**
   * Log de advertencias
   */
  warn(message: string, ...args: any[]): void {
    console.warn(`[${new Date().toISOString()}] [WARN] ${message}`, ...args);
  }

  /**
   * Log de debugging (solo en desarrollo)
   */
  debug(message: string, ...args: any[]): void {
    if (isDevelopment) {
      console.debug(`[${new Date().toISOString()}] [DEBUG] ${message}`, ...args);
    }
  }

  /**
   * Log de request HTTP
   */
  request(method: string, path: string, statusCode?: number): void {
    const status = statusCode ? ` - ${statusCode}` : "";
    console.log(`[${new Date().toISOString()}] [REQUEST] ${method} ${path}${status}`);
  }
}

// Exportar instancia singleton
export const logger = new Logger();
