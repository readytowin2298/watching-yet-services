import path from "path";
import fs from "fs/promises";
import { v4 as uuid } from "uuid";
import sharp from "sharp";
import { StorageService } from "./storage.interface.js";

export class LocalStorageService implements StorageService {
  async upload(file: Express.Multer.File) {
    const ext = file.originalname.split(".").pop();
    const filename = `${uuid()}.${ext}`;

    const uploadDir = path.join(process.cwd(), "uploads");
    const filepath = path.join(uploadDir, filename);

    await fs.mkdir(uploadDir, { recursive: true });

    let buffer = file.buffer;
    let width: number | undefined;
    let height: number | undefined;

    // 🖼 Compress images
    if (file.mimetype.startsWith("image")) {
      const image = sharp(file.buffer);
      const metadata = await image.metadata();

      width = metadata.width;
      height = metadata.height;

      buffer = await image
        .resize({ width: 1080, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();
    }

    await fs.writeFile(filepath, buffer);

    return {
      url: `/uploads/${filename}`,
      mimeType: file.mimetype,
      size: buffer.length,
      width,
      height,
    };
  }

  async delete(url: string) {
    const filePath = path.join(process.cwd(), url);
    await fs.unlink(filePath);
  }
}