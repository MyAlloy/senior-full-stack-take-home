import { createApp } from './app';
import { config } from './config';
import { db } from './db';

createApp(db).listen(config.port, () => {
  console.log(`api listening on http://localhost:${config.port}`);
});
