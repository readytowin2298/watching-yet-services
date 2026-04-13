import { prisma } from "../../lib/prisma.js";

export const createPost = async ({
    content,
    mediaIds,
    userId,
} : {
    content: string;
    mediaIds?: string[];
    userId: string;
}) => {
    // Validate media Ids
    if (mediaIds && mediaIds.length > 0) {
        const media = await prisma.media.findMany({
            where: {
                id: { in: mediaIds}
            },
        });

        // Check if all media exist
        if(media.length !== mediaIds.length){
            throw new Error("One or more media items not found");
        };

        // Check ownership  
        const invalid = media.find((m: any) => m.uploaderId !== userId);
        if(invalid){
            throw new Error("You can only attach your own media");
        };

        // Check not already attached to a post
        const alreadyAttached = media.find((m: any) => m.postId !== null);
        if(alreadyAttached){
            throw new Error("One or more media items are already attached to a post");
        };
    }
    // 🧠 Create post + attach media
    const post = await prisma.post.create({
        data: {
        content,
        authorId: userId,
        media: mediaIds
            ? {
                connect: mediaIds.map(id => ({ id })),
            }
            : undefined,
        },
        include: {
        media: true,
        author: true,
        _count: {
            select: {
            reactions: true,
            comments: true,
            },
        },
        },
    });

    return post;
}