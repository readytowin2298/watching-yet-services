import { Request, Response } from 'express';
import {createPost as createPostService} from './post.service.js';

export const createPost = async (req: Request, res: Response) => {
    try{
        const { content, mediaIds } = req.body;
        const userId = req.user.id;

        if(!content){
            return res.status(400).json({ message: "Content is required" });
        }

        const post = await createPostService({
            content,
            mediaIds,
            userId
        });

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
}