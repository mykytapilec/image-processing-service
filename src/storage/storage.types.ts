export interface SaveFileInput {
  filename: string;
  buffer: Buffer;
}

export interface StorageService {
  initialize(): Promise<void>;
  save(input: SaveFileInput): Promise<string>;
  delete(filename: string): Promise<void>;
  exists(filename: string): Promise<boolean>;
  getPath(filename: string): string;
}