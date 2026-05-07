import { prisma } from '../../lib/prisma.js';
import { ReactionType } from '../../generated/client/enums.js';

export class FeedService {
  async getFeed(userId?: string, cursor?: string) {
    const PAGE_SIZE = 10;

    const posts = await prisma.post.findMany({
      where: userId
        ? {
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
          }
        : undefined,

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

            watchers: userId
              ? {
                  where: { watcherId: userId },
                  select: { id: true },
                }
              : false,
          },
        },

        reactions: userId
          ? {
              where: {
                userId,
                type: ReactionType.LIKE,
              },
              select: { id: true },
            }
          : false,

        _count: {
          select: {
            reactions: true,
            comments: true,
          },
        },
      },
    });

    const nextCursor =
      posts.length === PAGE_SIZE
        ? posts[posts.length - 1].id
        : null;

    const transformedPosts = posts.map((post: any) => ({
      ...post,

      viewerHasLiked: userId
        ? post.reactions?.length > 0
        : false,

      author: {
        ...post.author,

        viewerIsWatching: userId
          ? post.author.watchers?.length > 0
          : false,
      },

      reactions: undefined,
    }));

    return {
      posts: transformedPosts,
      nextCursor,
    };
  }
}