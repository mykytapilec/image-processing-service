import sharp from 'sharp';

import type {
  ImageMetadata,
  ResizeImageInput,
  ResizeImageResult,
} from './image-processing.types.js';

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

  async resize(
    input: ResizeImageInput,
  ): Promise<ResizeImageResult> {
    const resizedBuffer = await sharp(input.buffer)
      .resize({
        width: input.width,
        height: input.height,
      })
      .toBuffer();

    return {
      buffer: resizedBuffer,
    };
  }
}