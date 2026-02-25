export interface PublishMessageRequest {
  exchange?: string;
  routingKey?: string;
  queue?: string;
  message: string;
  contentType?: string;
}

export interface PublishMessageResponse {
  messageId: string;
  status: string;
  message: string;
  exchange?: string;
  routingKey?: string;
  timestamp: string;
}

export interface HealthCheckResponse {
  status: string;
  message: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
}