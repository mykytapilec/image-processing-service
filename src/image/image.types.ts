export interface UploadedImage {
  id: string;
  filename: string;
  mimetype: string;
  size: number;
}

export interface ImageFile {
  filename: string;
  mimetype: string;
  buffer: Buffer;
}