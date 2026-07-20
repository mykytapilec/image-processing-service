import {
  mkdir,
  writeFile,
  unlink,
  access,
  readFile,
} from 'node:fs/promises';
import path from 'node:path';

import { env } from '../config/env.js';
import type {
  SaveFileInput,
  StorageService,
} from './storage.types.js';

export class FileStorageService implements StorageService {
  private readonly storagePath: string;

  constructor() {
    this.storagePath = path.resolve(env.STORAGE_PATH);
  }

  async initialize(): Promise<void> {
    await mkdir(this.storagePath, {
      recursive: true,
    });
  }

  async save(input: SaveFileInput): Promise<string> {
    await this.initialize();

    const filePath = this.getPath(input.filename);

    await writeFile(filePath, input.buffer);

    return filePath;
  }

  async read(filename: string): Promise<Buffer> {
    return readFile(this.getPath(filename));
  }

  async delete(filename: string): Promise<void> {
    const filePath = this.getPath(filename);

    await unlink(filePath);
  }

  async exists(filename: string): Promise<boolean> {
    try {
      await access(this.getPath(filename));

      return true;
    } catch {
      return false;
    }
  }

  getPath(filename: string): string {
    return path.join(this.storagePath, filename);
  }
}