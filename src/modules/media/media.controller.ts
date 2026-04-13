import { Request, Response } from "express";
import { MediaService } from "./media.service.js";

const mediaService = new MediaService();

export const uploadMedia = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    console.log("REQ.USER:", req.user);
    const userId = req.user.id;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const media = await mediaService.uploadMedia(files, userId);

    res.json(media);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};