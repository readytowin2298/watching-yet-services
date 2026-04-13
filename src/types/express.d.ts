import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        // you can expand this later if needed
      };
    }
  }
}