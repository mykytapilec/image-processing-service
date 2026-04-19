import { prisma } from '../database/prisma.js';
import { FileStorageService } from '../storage/storage.service.js';
import type { UploadedImage } from './image.types.js';

interface SaveImageInput {
  filename: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

export class ImageService {
  constructor(
    private readonly storage: FileStorageService,
  ) {}

  async create(input: SaveImageInput): Promise<UploadedImage> {
    await this.storage.save({
      filename: input.filename,
      buffer: input.buffer,
    });

    const image = await prisma.image.create({
      data: {
        filename: input.filename,
        mimetype: input.mimetype,
        size: input.size,
      },
    });

    return {
      id: image.id,
      filename: image.filename,
      mimetype: image.mimetype,
      size: image.size,
    };
  }
}