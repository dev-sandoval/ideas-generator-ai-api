import { logger } from "../utils/logger";

/**
 * Middleware para logging de requests HTTP
 */
export function logRequest({ request }: { request: Request }) {
  const url = new URL(request.url);
  logger.request(request.method, url.pathname);
}
