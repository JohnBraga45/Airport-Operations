export type FlightStatus = 'ON_TIME' | 'DELAYED' | 'BOARDING' | 'IN_FLIGHT' | 'LANDED' | 'MAINTENANCE_REQUIRED';

export interface Flight {
  flightId: string;
  flightNumber: string;
  origin: string;
  destination: string;
  scheduledDeparture: string; // ISO
  estimatedDeparture: string; // ISO
  status: FlightStatus;
  aircraftId: string;
  lastUpdated: string; // ISO
}

export type OperationalStatus = 'OPERATIONAL' | 'MAINTENANCE' | 'GROUNDED';

export interface Aircraft {
  aircraftId: string;
  model: string;
  operationalStatus: OperationalStatus;
  lastMaintenanceCheck: string; // ISO
}

export type Severity = 'INFO' | 'WARNING' | 'CRITICAL';

export interface Alert {
  alertId: string;
  severity: Severity;
  message: string;
  relatedFlightId?: string;
  timestamp: string; // ISO
  acknowledged: boolean;
}

export type AsyncStateStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';

export interface AsyncState<T> {
  status: AsyncStateStatus;
  data?: T;
  error?: string;
}