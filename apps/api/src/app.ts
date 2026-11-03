import express from 'express';

type Db = { raw(sql: string): PromiseLike<unknown> };

export function createApp(db: Db) {
  const app = express();
  app.use(express.json());

  app.get('/health', async (_req, res) => {
    try {
      await db.raw('select 1');
      res.json({ ok: true, db: 'connected' });
    } catch (err) {
      const { message, code } = err as Error & { code?: string };
      res.status(503).json({ ok: false, db: 'unreachable', error: message || code || 'unknown' });
    }
  });

  return app;
}
