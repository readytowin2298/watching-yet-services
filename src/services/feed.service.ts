import { prisma } from '../lib/prisma';

export const getFeed = async (userId: string, cursor?: string) => {
    const PAGE_SIZE = 10;

    const posts = await prisma.post.findMany({
        where: {
            OR: [
            { authorId: userId },
            {
                author: {
                watchers: {
                    some: {
                    watcherId: userId,
                    },
                },
                },
            },
            ],
        },
        take: PAGE_SIZE,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: [
            { createdAt: 'desc' },
            { id: 'desc' },
        ],
        select: {
            id: true,
            content: true,
            mediaUrl: true,
            mediaType: true,
            createdAt: true,

            author: {
                select: {
                id: true,
                username: true,
                avatarUrl: true,

                watchers: {
                    where: {
                    watcherId: userId,
                    },
                    select: { id: true },
                },
                },
            },

            reactions: {
                where: {
                userId,
                type: 'LIKE',
                },
                select: { id: true },
            },

            _count: {
                select: {
                reactions: true,
                comments: true,
                },
            },
        },
    });

    const nextCursor = posts.length === PAGE_SIZE ? posts[posts.length - 1].id : null;

    const transformedPosts = posts.map((post) => ({
        ...post,
        viewerHasLiked: post.reactions.length > 0,
        author: {
            ...post.author,
            viewerIsWatching: post.author.watchers.length > 0,
        },
        // clean up raw arrays
        reactions: undefined,
        authorWatchers: undefined,
    }));

    return {
        posts: transformedPosts,
        nextCursor,
    };
};