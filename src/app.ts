import Fastify from 'fastify';
import multipart from '@fastify/multipart';

import imageRoutes from './image/image.routes.js';

export async function createApp() {
  const app = Fastify({
    logger: true,
  });

  await app.register(multipart);
  await app.register(imageRoutes);

  app.get('/', async () => {
    return {
      service: 'image-processing-service',
      status: 'running',
    };
  });

  app.get('/health', async () => {
    return {
      status: 'ok',
    };
  });

  return app;
}