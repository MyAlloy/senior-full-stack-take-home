import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from './app';

describe('GET /health', () => {
  it('reports ok when the database answers', async () => {
    const app = createApp({ raw: async () => undefined });

    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true, db: 'connected' });
  });

  it('reports 503 when the database is unreachable', async () => {
    const app = createApp({
      raw: async () => {
        throw new Error('connection refused');
      },
    });

    const res = await request(app).get('/health');

    expect(res.status).toBe(503);
    expect(res.body).toEqual({ ok: false, db: 'unreachable', error: 'connection refused' });
  });

  it('falls back to the error code when the message is empty', async () => {
    // Node reports a refused TCP connection as an AggregateError with no message.
    const refused = Object.assign(new AggregateError([], ''), { code: 'ECONNREFUSED' });
    const app = createApp({
      raw: async () => {
        throw refused;
      },
    });

    const res = await request(app).get('/health');

    expect(res.status).toBe(503);
    expect(res.body.error).toBe('ECONNREFUSED');
  });
});
