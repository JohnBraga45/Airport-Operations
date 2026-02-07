import { Injectable, inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

function generateRequestId(): string {
  const now = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 8);
  return `req_${now}_${rand}`;
}

export const httpErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const requestId = generateRequestId();
  const tagged = req.clone({ setHeaders: { 'x-request-id': requestId } });
  return next(tagged).pipe(
    tap({
      error: (err) => {
        // Structured console log; can be routed to monitoring later
        const payload = {
          timestamp: new Date().toISOString(),
          requestId,
          severity: 'ERROR',
          message: 'HTTP request failed',
          url: req.url,
          status: err?.status,
        };
        // eslint-disable-next-line no-console
        console.error('[HTTP]', JSON.stringify(payload));
      },
    })
  );
};