export interface GenerateIdeasRequest {
  businessType: string;
}

export interface Idea {
  categoria: string;
  formato_sugerido: string;
  titulo_gancho: string;
  descripcion_ejecucion: string;
}

export interface GenerateIdeasResponse {
  success: boolean;
  ideas: Idea[];
  businessType: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
}

export interface StatusResponse {
  status: "online";
  timestamp: string;
  version: string;
}

export type AIProvider = "gemini" | "openai";

export interface AIServiceConfig {
  apiKey: string;
  provider: AIProvider;
}
