import { Controller, Get, Req, Res } from '@nestjs/common';
import type { Response, Request } from 'express';
import { OpsService } from './ops.service';
import { structuredLog, requestIdFrom } from './logging';

const SIMULATE_FAILURES = process.env.SIMULATE_FAILURES === 'true';
const SIMULATE_TIMEOUTS = process.env.SIMULATE_TIMEOUTS === 'true';
const SIMULATE_DELAYS = process.env.SIMULATE_DELAYS === 'true';

function randomDelayMs() {
  return SIMULATE_DELAYS ? Math.floor(Math.random() * 1200) : 50; // pequeno atraso por padrão
}

function shouldFail() {
  return SIMULATE_FAILURES ? Math.random() < 0.15 : false; // sem falhas por padrão
}

function shouldTimeout() {
  return SIMULATE_TIMEOUTS ? Math.random() < 0.05 : false; // sem timeouts por padrão
}

@Controller('api')
export class OpsController {
  constructor(private readonly ops: OpsService) {}

  @Get('flights')
  async flights(@Req() req: Request, @Res() res: Response) {
    const requestId = requestIdFrom(req);
    const delay = shouldTimeout() ? 10_000 : randomDelayMs();
    structuredLog({ timestamp: new Date().toISOString(), requestId, severity: 'INFO', message: `GET /flights delay=${delay}` });
    await new Promise(r => setTimeout(r, delay));
    if (shouldFail()) {
      structuredLog({ timestamp: new Date().toISOString(), requestId, severity: 'ERROR', message: 'Internal error on /flights' });
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const data = await this.ops.getFlights();
    return res.json(data);
  }

  @Get('aircraft')
  async aircraft(@Req() req: Request, @Res() res: Response) {
    const requestId = requestIdFrom(req);
    const delay = shouldTimeout() ? 10_000 : randomDelayMs();
    structuredLog({ timestamp: new Date().toISOString(), requestId, severity: 'INFO', message: `GET /aircraft delay=${delay}` });
    await new Promise(r => setTimeout(r, delay));
    if (shouldFail()) {
      structuredLog({ timestamp: new Date().toISOString(), requestId, severity: 'ERROR', message: 'Internal error on /aircraft' });
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const data = await this.ops.getAircraft();
    return res.json(data);
  }

  @Get('alerts')
  async alerts(@Req() req: Request, @Res() res: Response) {
    const requestId = requestIdFrom(req);
    const delay = shouldTimeout() ? 10_000 : randomDelayMs();
    structuredLog({ timestamp: new Date().toISOString(), requestId, severity: 'INFO', message: `GET /alerts delay=${delay}` });
    await new Promise(r => setTimeout(r, delay));
    if (shouldFail()) {
      structuredLog({ timestamp: new Date().toISOString(), requestId, severity: 'ERROR', message: 'Internal error on /alerts' });
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const data = await this.ops.getAlerts();
    return res.json(data);
  }
}