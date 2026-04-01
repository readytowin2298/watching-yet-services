import { prisma } from "../lib/prisma";

export const toggleWatch = async ( watcherId: string, watchingId: string) => {
    if(watcherId === watchingId) {
        throw new Error("You cannot watch yourself");
    };
    const targetUser = await prisma.user.findUnique({
        where: { id: watchingId },
    });
    if (!targetUser) {
        throw new Error('User not found');
    }

    const existing = await prisma.watch.findUnique({
        where: {
            watcherId_watchingId: {
                watcherId,
                watchingId
            }
        }
    });

    // If the watch already exists -> UNWATCH
    if(existing){
        await prisma.watch.delete({
            where: { id: existing.id }
        });
        return { watching: false}
    };

    // Otherwise -> watch
    await prisma.watch.create({
        data: {
        watcherId,
        watchingId,
        },
    });
    return { watching: true}
};

export const getWatchStats = async (userId: string) => {
    const [watchers, watching] = await Promise.all([
        prisma.watch.count({ where: { watchingId: userId }}),
        prisma.watch.count({ where: { watcherId: userId }})
    ]);
    return { watchers, watching };
}