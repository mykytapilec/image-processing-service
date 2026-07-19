import sharp from 'sharp';

import type { ImageMetadata } from './image-processing.types.js';

export class ImageProcessingService {
  async getMetadata(
    buffer: Buffer,
  ): Promise<ImageMetadata> {
    const metadata = await sharp(buffer).metadata();

    return {
      width: metadata.width ?? 0,
      height: metadata.height ?? 0,
      format: metadata.format ?? 'unknown',
    };
  }
}