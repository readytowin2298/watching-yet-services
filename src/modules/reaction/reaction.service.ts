import { prisma } from "../../lib/prisma.js";

export const toggleReaction = async ({
        userId,
        postId,
        commentId,
        type,
    }: {
        userId: string;
        postId: string;
        commentId?: string;
        type: "LIKE" | "LOVE" | "LAUGH" | "ANGRY";
    }) => {
        // Validate input
        if(!postId && !commentId){
            throw new Error("Either postId or commentId must be provided");
        }

        if(postId && commentId){
            throw new Error("Only one of postId or commentId can be provided");
        }

        // Check if the reaction already exists
        const existing = await prisma.reaction.findFirst({
            where: {
                userId,
                postId: postId ?? null,
                commentId: commentId ?? null,
            },
        });

        // Toggle off if exists
        if(existing && existing.type === type){
            await prisma.reaction.delete({
                where: { id: existing.id }
            });
            return { status: "removed" };
        }

        // Change reaction type if exists but different type
        if(existing && existing.type !== type){
            const updated = await prisma.reaction.update({
                where: { id: existing.id },
                data: { type },
            });
            return { status: "updated", reaction: updated}
        };

        // Create new reaction
        const created = await prisma.reaction.create({
            data: {
                userId,
                postId,
                commentId,
                type,
            }
        })

        return { status: "created", reaction: created };
    }