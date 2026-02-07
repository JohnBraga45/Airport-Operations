import { Injectable } from '@nestjs/common';
import { Flight, Aircraft, Alert, FlightStatus, OperationalStatus, Severity } from './domain';

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function nowIso() { return new Date().toISOString(); }

@Injectable()
export class OpsService {
  private aircraftModels = ['A320', 'A321', 'B737-800', 'B787-9', 'A350-900'];
  private airports = ['SFO', 'LAX', 'SEA', 'DFW', 'ORD', 'JFK'];
  private flightStatuses: FlightStatus[] = ['ON_TIME','DELAYED','BOARDING','IN_FLIGHT','LANDED','MAINTENANCE_REQUIRED'];
  private operationalStatuses: OperationalStatus[] = ['OPERATIONAL','MAINTENANCE','GROUNDED'];
  private severities: Severity[] = ['INFO', 'WARNING', 'CRITICAL'];

  async getFlights(count = 8): Promise<Flight[]> {
    const flights: Flight[] = Array.from({ length: count }).map((_, i) => {
      const origin = pick(this.airports);
      let dest = pick(this.airports);
      while (dest === origin) dest = pick(this.airports);
      const flightId = `FLT-${i+1}`;
      const aircraftId = `AC-${(i%6)+1}`;
      const sched = new Date(Date.now() + i * 30 * 60_000);
      const est = new Date(sched.getTime() + (Math.random() < 0.3 ? 15 * 60_000 : 0));
      return {
        flightId,
        flightNumber: `FM${100 + i}`,
        origin,
        destination: dest,
        scheduledDeparture: sched.toISOString(),
        estimatedDeparture: est.toISOString(),
        status: pick(this.flightStatuses),
        aircraftId,
        lastUpdated: nowIso(),
      };
    });
    return flights;
  }

  async getAircraft(count = 6): Promise<Aircraft[]> {
    return Array.from({ length: count }).map((_, i) => ({
      aircraftId: `AC-${i+1}`,
      model: pick(this.aircraftModels),
      operationalStatus: pick(this.operationalStatuses),
      lastMaintenanceCheck: new Date(Date.now() - (i+1) * 24 * 60 * 60_000).toISOString(),
    }));
  }

  async getAlerts(count = 4): Promise<Alert[]> {
    return Array.from({ length: count }).map((_, i) => ({
      alertId: `ALT-${i+1}`,
      severity: pick(this.severities),
      message: pick([
        'Gate change due to maintenance',
        'Weather delay expected',
        'Fueling incomplete',
        'Crew reassignment pending',
        'Runway inspection required'
      ]),
      relatedFlightId: Math.random() < 0.6 ? `FLT-${(i%8)+1}` : undefined,
      timestamp: nowIso(),
      acknowledged: Math.random() < 0.5,
    }));
  }
}