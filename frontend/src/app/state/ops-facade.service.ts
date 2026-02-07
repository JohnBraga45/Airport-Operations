import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AsyncState, Flight, Aircraft, Alert } from '../domain/models';
import { BehaviorSubject, Observable, timer, startWith, of, MonoTypeOperatorFunction } from 'rxjs';
import { catchError, map, retryWhen, scan, switchMap } from 'rxjs/operators';

function exponentialBackoff<T>(maxRetries: number, baseDelayMs: number): MonoTypeOperatorFunction<T> {
  return retryWhen<T>(errors => errors.pipe(
    scan((acc, error) => {
      return { count: acc.count + 1, lastError: error };
    }, { count: 0, lastError: null as any }),
    switchMap(({ count, lastError }) => {
      if (count >= maxRetries) {
        return of(lastError).pipe(
          switchMap(err => { throw err; })
        );
      }
      const delayMs = Math.min(baseDelayMs * Math.pow(2, count), 30000);
      return timer(delayMs);
    })
  ));
}

@Injectable({ providedIn: 'root' })
export class OpsFacade {
  private api = inject(ApiService);

  // Signals for global user-visible error reporting
  readonly lastError = signal<string | null>(null);
  readonly lastUpdated = signal<string | null>(null);

  // Flights stream
  readonly flights$: Observable<AsyncState<Flight[]>> = timer(0, 5000).pipe(
    switchMap(() => this.api.getFlights().pipe(
      exponentialBackoff(3, 500),
      map((data: Flight[]) => {
        const hasData = Array.isArray(data) && data.length > 0;
        if (hasData) {
          this.lastError.set(null);
          this.lastUpdated.set(new Date().toISOString());
        }
        return { status: hasData ? 'success' : 'empty', data } as AsyncState<Flight[]>;
      }),
      catchError((err) => {
        const msg = `Flights fetch failed: ${err?.status ?? ''}`;
        this.lastError.set(msg);
        return of({ status: 'error', error: msg } as AsyncState<Flight[]>);
      })
    )),
    startWith({ status: 'loading' } as AsyncState<Flight[]>)
  );

  // Aircraft stream
  readonly aircraft$: Observable<AsyncState<Aircraft[]>> = timer(0, 7000).pipe(
    switchMap(() => this.api.getAircraft().pipe(
      exponentialBackoff(3, 500),
      map((data: Aircraft[]) => ({ status: data.length ? 'success' : 'empty', data } as AsyncState<Aircraft[]>)),
      catchError((err) => {
        const msg = `Aircraft fetch failed: ${err?.status ?? ''}`;
        this.lastError.set(msg);
        return of({ status: 'error', error: msg } as AsyncState<Aircraft[]>);
      })
    )),
  );

  // Alerts stream (higher frequency)
  readonly alerts$: Observable<AsyncState<Alert[]>> = timer(0, 3000).pipe(
    switchMap(() => this.api.getAlerts().pipe(
      exponentialBackoff(3, 500),
      map((data: Alert[]) => ({ status: data.length ? 'success' : 'empty', data } as AsyncState<Alert[]>)),
      catchError((err) => {
        const msg = `Alerts fetch failed: ${err?.status ?? ''}`;
        this.lastError.set(msg);
        return of({ status: 'error', error: msg } as AsyncState<Alert[]>);
      })
    )),
  );
}