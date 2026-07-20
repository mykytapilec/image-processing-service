import { prisma } from '../database/prisma.js';
import { ImageProcessingService } from '../processing/image-processing.service.js';
import { FileStorageService } from '../storage/storage.service.js';
import type {
  ImageFile,
  UploadedImage,
} from './image.types.js';

interface SaveImageInput {
  filename: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

export class ImageService {
  constructor(
    private readonly storage: FileStorageService,
    private readonly processing: ImageProcessingService,
  ) {}

  async create(input: SaveImageInput): Promise<UploadedImage> {
    const metadata = await this.processing.getMetadata(
      input.buffer,
    );

    await this.storage.save({
      filename: input.filename,
      buffer: input.buffer,
    });

    const thumbnail = await this.processing.resize({
      buffer: input.buffer,
      width: 300,
    });

    const thumbnailFilename = `thumb-${input.filename}`;

    await this.storage.save({
      filename: thumbnailFilename,
      buffer: thumbnail.buffer,
    });

    const image = await prisma.image.create({
      data: {
        filename: input.filename,
        mimetype: input.mimetype,
        size: input.size,
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
      },
    });

    return {
      id: image.id,
      filename: image.filename,
      mimetype: image.mimetype,
      size: image.size,
    };
  }

  async getById(id: string): Promise<ImageFile | null> {
    const image = await prisma.image.findUnique({
      where: {
        id,
      },
    });

    if (!image) {
      return null;
    }

    const exists = await this.storage.exists(
      image.filename,
    );

    if (!exists) {
      return null;
    }

    const buffer = await this.storage.read(
      image.filename,
    );

    return {
      filename: image.filename,
      mimetype: image.mimetype,
      buffer,
    };
  }
}