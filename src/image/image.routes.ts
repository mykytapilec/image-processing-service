import type { FastifyPluginAsync } from 'fastify';

import { ImageProcessingService } from '../processing/image-processing.service.js';
import { FileStorageService } from '../storage/storage.service.js';
import { ImageService } from './image.service.js';

const imageRoutes: FastifyPluginAsync = async (app) => {
  const imageService = new ImageService(
    new FileStorageService(),
    new ImageProcessingService(),
  );

  app.post('/images', async (request) => {
    const file = await request.file();

    if (!file) {
      return {
        error: 'File is required',
      };
    }

    const buffer = await file.toBuffer();

    return imageService.create({
      filename: file.filename,
      mimetype: file.mimetype,
      size: buffer.length,
      buffer,
    });
  });

  app.get('/images/:id', async (request, reply) => {
    const { id } = request.params as {
      id: string;
    };

    const image = await imageService.getById(id);

    if (!image) {
      return reply.status(404).send({
        error: 'Image not found',
      });
    }

    return reply
      .type(image.mimetype)
      .send(image.buffer);
  });
};

export default imageRoutes;