import { createApp } from './app.js';
import { env } from './config/env.js';
import {
  connectDatabase,
  disconnectDatabase,
} from './database/database.js';

const app = createApp();

async function start() {
  try {
    await connectDatabase();

    await app.listen({
      port: env.PORT,
      host: '0.0.0.0',
    });

    app.addHook('onClose', async () => {
      await disconnectDatabase();
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();