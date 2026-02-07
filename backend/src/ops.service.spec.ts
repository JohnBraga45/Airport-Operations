import { OpsService } from './ops.service';

describe('OpsService', () => {
  let service: OpsService;

  beforeEach(() => {
    service = new OpsService();
  });

  it('generates flights with valid fields', async () => {
    const flights = await service.getFlights(3);
    expect(flights).toHaveLength(3);
    for (const f of flights) {
      expect(typeof f.flightId).toBe('string');
      expect(f.origin).not.toBe(f.destination);
      expect(['ON_TIME','DELAYED','BOARDING','IN_FLIGHT','LANDED','MAINTENANCE_REQUIRED']).toContain(f.status);
    }
  });

  it('generates aircraft with operational status', async () => {
    const ac = await service.getAircraft(2);
    expect(ac).toHaveLength(2);
    for (const a of ac) {
      expect(['OPERATIONAL','MAINTENANCE','GROUNDED']).toContain(a.operationalStatus);
    }
  });

  it('generates alerts with severities', async () => {
    const alerts = await service.getAlerts(2);
    expect(alerts).toHaveLength(2);
    for (const a of alerts) {
      expect(['INFO','WARNING','CRITICAL']).toContain(a.severity);
    }
  });
});