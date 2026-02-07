import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { Flight, Aircraft, Alert, Severity, FlightStatus, OperationalStatus } from './models';

@Injectable({ providedIn: 'root' })
export class OpsApiService {
  private demo = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('demo') === 'true';

  constructor(private http: HttpClient) {}

  getFlights(): Observable<Flight[]> {
    if (this.demo) {
      const now = Date.now();
      return of<Flight[]>([
        { flightId: '1', flightNumber: 'TP102', origin: 'Lisbon', destination: 'Luanda', scheduledDeparture: new Date(now + 30*60_000).toISOString(), estimatedDeparture: new Date(now + 35*60_000).toISOString(), status: 'BOARDING' as FlightStatus, aircraftId: 'CS-TPT', lastUpdated: new Date().toISOString() },
        { flightId: '2', flightNumber: 'DT200', origin: 'Luanda', destination: 'Porto', scheduledDeparture: new Date(now + 50*60_000).toISOString(), estimatedDeparture: new Date(now + 55*60_000).toISOString(), status: 'ON_TIME' as FlightStatus, aircraftId: 'D2-TAF', lastUpdated: new Date().toISOString() },
        { flightId: '3', flightNumber: 'TP309', origin: 'Lisbon', destination: 'Madrid', scheduledDeparture: new Date(now + 70*60_000).toISOString(), estimatedDeparture: new Date(now + 80*60_000).toISOString(), status: 'DELAYED' as FlightStatus, aircraftId: 'CS-TTT', lastUpdated: new Date().toISOString() },
        { flightId: '4', flightNumber: 'BA890', origin: 'London', destination: 'Lisbon', scheduledDeparture: new Date(now + 90*60_000).toISOString(), estimatedDeparture: new Date(now + 92*60_000).toISOString(), status: 'IN_FLIGHT' as FlightStatus, aircraftId: 'G-LHR', lastUpdated: new Date().toISOString() }
      ]).pipe(delay(300));
    }
    return this.http.get<Flight[]>('/api/flights');
  }

  getAircraft(): Observable<Aircraft[]> {
    if (this.demo) {
      return of<Aircraft[]>([
        { aircraftId: 'CS-TPT', model: 'A320neo', operationalStatus: 'OPERATIONAL' as OperationalStatus, lastMaintenanceCheck: new Date(Date.now() - 2*24*60*60_000).toISOString() },
        { aircraftId: 'D2-TAF', model: 'B737-800', operationalStatus: 'MAINTENANCE' as OperationalStatus, lastMaintenanceCheck: new Date(Date.now() - 1*24*60*60_000).toISOString() },
        { aircraftId: 'CS-TTT', model: 'A330-900', operationalStatus: 'GROUNDED' as OperationalStatus, lastMaintenanceCheck: new Date(Date.now() - 5*24*60*60_000).toISOString() }
      ]).pipe(delay(300));
    }
    return this.http.get<Aircraft[]>('/api/aircraft');
  }

  getAlerts(): Observable<Alert[]> {
    if (this.demo) {
      return of<Alert[]>([
        { alertId: 'A1', severity: 'INFO' as Severity, message: 'Gate changes updated', timestamp: new Date().toISOString(), acknowledged: false },
        { alertId: 'A2', severity: 'WARNING' as Severity, message: 'Weather monitoring active', relatedFlightId: 'TP309', timestamp: new Date().toISOString(), acknowledged: false },
        { alertId: 'A3', severity: 'CRITICAL' as Severity, message: 'Runway inspection ongoing', timestamp: new Date().toISOString(), acknowledged: false }
      ]).pipe(delay(300));
    }
    return this.http.get<Alert[]>('/api/alerts');
  }
}

export { Flight, FlightStatus };
