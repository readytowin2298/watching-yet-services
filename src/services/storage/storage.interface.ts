import { Express } from "express";

export interface StorageService {
  upload(file: Express.Multer.File): Promise<{
    url: string;
    mimeType: string;
    size: number;
    width?: number;
    height?: number;
  }>;

  delete(url: string): Promise<void>;
}