import { prisma } from '../lib/prisma';

export const getFeed = async (userId: string, cursor?: string) => {
    const PAGE_SIZE=10;

    // Get IDs of users you're watching
    const watching = await prisma.watch.findMany({
        where: { watcherId: userId},
        select: { watchingId: true}
    });

    const watchingIds = watching.map(w => w.watchingId);

    // Include your own posts too
    watchingIds.push(userId);

    // Fetch posts
    const posts = await prisma.post.findMany({
        where: {
            authorId: {
                in: watchingIds
            },
        },
        take: PAGE_SIZE,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor} : undefined,
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                    avatarUrl: true,
                },
            },
             _count: {
                select: {
                reactions: true,
                comments: true,
                },
            },
        },
    });

    // Increment cursor
    const nextCursor = posts.length == PAGE_SIZE
        ? posts[posts.length - 1].id
        : null;
    
    return {
        posts,
        nextCursor
    }
}