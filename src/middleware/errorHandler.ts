import type { ErrorResponse } from "../types";
import { isDevelopment } from "../config/env";
import { logger } from "../utils/logger";

export function handleError(context: any): ErrorResponse {
  const { error, code, set } = context;

  logger.error(`Error [${code}]`, error);

  // Rate limit errors
  if (error instanceof Error && error.message.includes("Rate limited")) {
    set.status = 429;
    return {
      success: false,
      error: "Too Many Requests",
      message: error.message,
    };
  }

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
