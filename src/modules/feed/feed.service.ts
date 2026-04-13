import { prisma } from '../../lib/prisma.js';
import { ReactionType } from '../../generated/client/enums.js';


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
            createdAt: true,

            media: {
                select: {
                    id: true,
                    url: true,
                    thumbnailUrl: true,
                    type: true,
                    mimeType: true,
                    width: true,
                    height: true,
                    duration: true,
                },
            },

            author: {
                select: {
                    id: true,
                    username: true,
                    avatarUrl: true,
                    watchers: {
                        where: { watcherId: userId },
                        select: { id: true },
                    },
                },
            },

            reactions: {
                where: {
                    userId,
                    type: ReactionType.LIKE,
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

    const transformedPosts = posts.map((post: any) => ({
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