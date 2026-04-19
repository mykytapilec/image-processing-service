import Fastify from 'fastify';

export function createApp() {
  const app = Fastify({
    logger: true,
  });

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