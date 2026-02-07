export type FlightStatus = 'ON_TIME' | 'DELAYED' | 'BOARDING' | 'IN_FLIGHT' | 'LANDED' | 'MAINTENANCE_REQUIRED';
export interface Flight {
  flightId: string;
  flightNumber: string;
  origin: string;
  destination: string;
  scheduledDeparture: string;
  estimatedDeparture: string;
  status: FlightStatus;
  aircraftId: string;
  lastUpdated: string;
}

export type OperationalStatus = 'OPERATIONAL' | 'MAINTENANCE' | 'GROUNDED';
export interface Aircraft {
  aircraftId: string;
  model: string;
  operationalStatus: OperationalStatus;
  lastMaintenanceCheck: string;
}

export type Severity = 'INFO' | 'WARNING' | 'CRITICAL';
export interface Alert {
  alertId: string;
  severity: Severity;
  message: string;
  relatedFlightId?: string;
  timestamp: string;
  acknowledged: boolean;
}