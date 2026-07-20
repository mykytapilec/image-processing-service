export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
}

export interface ResizeImageInput {
  buffer: Buffer;
  width: number;
  height?: number;
}

export interface ResizeImageResult {
  buffer: Buffer;
}