import type { FastifyPluginAsync } from 'fastify';

import { ImageService } from './image.service.js';
import { FileStorageService } from '../storage/storage.service.js';
import { ImageProcessingService } from '../processing/image-processing.service.js';

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
};

export default imageRoutes;