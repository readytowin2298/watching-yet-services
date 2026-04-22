import { Route, Post, Request, FormField } from "tsoa";
import { MediaService } from "./media.service.js";

@Route('/media')
export class MediaController {
  private mediaService = new MediaService();

  @Post('/upload')
  async uploadMedia(@FormField() files: Express.Multer.File[], @Request() req: any) {
    if (!files || files.length === 0) {
      throw new Error("No files uploaded");
    }

    return await this.mediaService.uploadMedia(files, req.user.id);
  }
}