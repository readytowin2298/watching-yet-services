import { prisma } from "../../../src/lib/prisma.js";
import seedData from "./seedData.json";
import bcrypt from "bcrypt";

export const claudeSeed = async() => {
  console.log("🌱 Starting seed...");

  // ─── Users ───────────────────────────────────────────────────────────────
  for (const user of seedData.users) {
    await prisma.user.create({ data: {...user, passwordHash: await bcrypt.hash(user.passwordHash, 1) } });
  }
  console.log(`✅ Seeded ${seedData.users.length} users`);

  // ─── Watches (follow system) ──────────────────────────────────────────────
  for (const watch of seedData.watches) {
    await prisma.watch.create({ data: watch });
  }
  console.log(`✅ Seeded ${seedData.watches.length} watches`);

  // ─── Posts ────────────────────────────────────────────────────────────────
  for (const post of seedData.posts) {
    await prisma.post.create({ data: post });
  }
  console.log(`✅ Seeded ${seedData.posts.length} posts`);

  // ─── Conversations ────────────────────────────────────────────────────────
  for (const convo of seedData.conversations) {
    await prisma.conversation.create({ data: convo });
  }
  console.log(`✅ Seeded ${seedData.conversations.length} conversations`);

  // ─── Conversation Participants ────────────────────────────────────────────
  for (const cp of seedData.conversationParticipants) {
    await prisma.conversationParticipant.create({
      data: {
        ...cp,
        lastReadAt: cp.lastReadAt ? new Date(cp.lastReadAt) : null,
      },
    });
  }
  console.log(
    `✅ Seeded ${seedData.conversationParticipants.length} conversation participants`
  );

  // ─── Messages ─────────────────────────────────────────────────────────────
  for (const msg of seedData.messages) {
    await prisma.message.create({ data: msg });
  }
  console.log(`✅ Seeded ${seedData.messages.length} messages`);

  // ─── Media ────────────────────────────────────────────────────────────────
  for (const item of seedData.media) {
    await prisma.media.create({
      data: {
        id: item.id,
        url: item.url,
        thumbnailUrl: item.thumbnailUrl ?? null,
        type: item.type as "IMAGE" | "VIDEO",
        mimeType: item.mimeType,
        size: item.size,
        width: item.width ?? null,
        height: item.height ?? null,
        duration: item.duration ?? null,
        postId: item.postId ?? null,
        messageId: item.messageId ?? null,
        uploaderId: item.uploaderId,
      },
    });
  }
  console.log(`✅ Seeded ${seedData.media.length} media items`);

  // ─── Comments ─────────────────────────────────────────────────────────────
  for (const comment of seedData.comments) {
    await prisma.comment.create({ data: comment });
  }
  console.log(`✅ Seeded ${seedData.comments.length} comments`);

  // ─── Reactions ────────────────────────────────────────────────────────────
  for (const reaction of seedData.reactions) {
    await prisma.reaction.create({
      data: {
        id: reaction.id,
        userId: reaction.userId,
        postId: reaction.postId ?? null,
        commentId: reaction.commentId ?? null,
        type: reaction.type as "LIKE" | "LOVE" | "LAUGH" | "ANGRY",
      },
    });
  }

  console.log("\n🎉 Claude Seed complete!");

  return true
}


// main()
//   .catch((e) => {
//     console.error("❌ Seed failed:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
