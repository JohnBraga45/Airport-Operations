import { Request } from 'express';

export type LogSeverity = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

export interface LogEvent {
  timestamp: string;
  requestId?: string;
  severity: LogSeverity;
  message: string;
  context?: Record<string, unknown>;
}

export function structuredLog(event: LogEvent) {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(event));
}

export function requestIdFrom(req: Request): string | undefined {
  return (req.headers['x-request-id'] as string) || undefined;
}