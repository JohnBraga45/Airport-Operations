import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'
// import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Ops Endpoints (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // Garantir backend estável sem falhas/timeout aleatórios
    process.env.SIMULATE_FAILURES = 'false';
    process.env.SIMULATE_TIMEOUTS = 'false';
    process.env.SIMULATE_DELAYS = 'false';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/flights (GET) should return a non-empty list', async () => {
    const res = await request(app.getHttpServer()).get('/api/flights').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    const f = res.body[0];
    expect(typeof f.flightId).toBe('string');
    expect(f.origin).not.toBe(f.destination);
  });

  it('/api/aircraft (GET) should return aircraft with status', async () => {
    const res = await request(app.getHttpServer()).get('/api/aircraft').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    const a = res.body[0];
    expect(['OPERATIONAL','MAINTENANCE','GROUNDED']).toContain(a.operationalStatus);
  });

  it('/api/alerts (GET) should return alerts with severities', async () => {
    const res = await request(app.getHttpServer()).get('/api/alerts').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    const al = res.body[0];
    expect(['INFO','WARNING','CRITICAL']).toContain(al.severity);
    expect(typeof al.message).toBe('string');
  });
});