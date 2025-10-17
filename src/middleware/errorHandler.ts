import type { ErrorResponse } from "../types";
import { isDevelopment } from "../config/env";
import { logger } from "../utils/logger";

export function handleError(context: any): ErrorResponse {
  const { error, code } = context;

  logger.error(`Error [${code}]`, error);

  // Validation errors
  if (code === "VALIDATION") {
    return {
      success: false,
      error: "Validation Error",
      message: error.message || "Los datos enviados no son válidos",
    };
  }

  // Not found errors
  if (code === "NOT_FOUND") {
    return {
      success: false,
      error: "Not Found",
      message: "El endpoint solicitado no existe",
    };
  }

  // Internal server errors
  return {
    success: false,
    error: "Internal Server Error",
    message: isDevelopment
      ? error instanceof Error
        ? error.message
        : String(error)
      : "Ha ocurrido un error interno",
  };
}
