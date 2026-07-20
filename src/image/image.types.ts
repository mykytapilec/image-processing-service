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

export interface ImageListItem {
  id: string;
  filename: string;
  mimetype: string;
  size: number;
  width: number | null;
  height: number | null;
  format: string | null;
  createdAt: Date;
}

export interface ImageListResponse {
  items: ImageListItem[];
  page: number;
  limit: number;
  total: number;
}