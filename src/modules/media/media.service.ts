import { prisma } from "../../lib/prisma.js";
import { LocalStorageService } from "../../services/storage/local.storage.js";

const storage = new LocalStorageService();

export class MediaService {
  async uploadMedia(files: Express.Multer.File[], userId: string) {
    const results = await Promise.all(
      files.map(file => storage.upload(file))
    );

    const media = await Promise.all(
      results.map((file, i) =>
        prisma.media.create({
          data: {
            url: file.url,
            type: file.mimeType.startsWith("video") ? "VIDEO" : "IMAGE",
            mimeType: file.mimeType,
            size: file.size,
            width: file.width,
            height: file.height,
            uploaderId: userId,
          },
        })
      )
    );

    return media;
  }
}