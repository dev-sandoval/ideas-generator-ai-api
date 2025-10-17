import type { GenerateIdeasRequest } from "../types";

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Valida el request para generar ideas
 */
export function validateGenerateIdeasRequest(body: any): ValidationResult {
  const request = body as GenerateIdeasRequest;

  // Verificar que businessType existe
  if (!request.businessType) {
    return {
      valid: false,
      error: 'El campo "businessType" es requerido',
    };
  }

  // Verificar que sea un string
  if (typeof request.businessType !== "string") {
    return {
      valid: false,
      error: 'El campo "businessType" debe ser un string',
    };
  }

  // Verificar que no esté vacío
  const businessType = request.businessType.trim();
  if (businessType.length === 0) {
    return {
      valid: false,
      error: 'El campo "businessType" no puede estar vacío',
    };
  }

  // Verificar longitud razonable
  if (businessType.length > 100) {
    return {
      valid: false,
      error: 'El campo "businessType" es demasiado largo (máximo 100 caracteres)',
    };
  }

  return { valid: true };
}
