import path from 'node:path';
import dotenv from 'dotenv';

// .env lives at the repo root so both apps can share it.
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const config = {
  port: Number(process.env.PORT ?? 4000),
  databaseUrl:
    process.env.DATABASE_URL ?? 'postgres://postgres:postgres@localhost:5433/takehome',
};
