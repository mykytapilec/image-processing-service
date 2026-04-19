import { createApp } from './app.js';
import { env } from './config/env.js';
import {
  connectDatabase,
  disconnectDatabase,
} from './database/database.js';
import { FileStorageService } from './storage/storage.service.js';

const storage = new FileStorageService();
const app = createApp();

async function start() {
  try {
    await connectDatabase();
    await storage.initialize();

    app.addHook('onClose', async () => {
      await disconnectDatabase();
    });

    await app.listen({
      port: env.PORT,
      host: '0.0.0.0',
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();