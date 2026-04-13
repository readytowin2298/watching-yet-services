import { prisma } from "../src/lib/prisma";
import data from "./seedData.json";
import bcrypt from "bcrypt";

async function main() {
  console.log("🌱 Seeding database...");

  // USERS
  await prisma.user.createMany({
    data: data.users.map((user: any) => ({ ...user, passwordHash: bcrypt.hashSync(user.passwordHash, 1) })),
    skipDuplicates: true
  });

  // WATCH (FOLLOW SYSTEM)
  await prisma.watch.createMany({
    data: data.watch,
    skipDuplicates: true
  });

  // POSTS
  await prisma.post.createMany({
    data: data.posts,
    skipDuplicates: true
  });

  // COMMENTS
  await prisma.comment.createMany({
    data: data.comments,
    skipDuplicates: true
  });

  // REACTIONS
  await prisma.reaction.createMany({
    data: data.reactions,
    skipDuplicates: true
  });

  // MEDIA
  await prisma.media.createMany({
    data: data.media,
    skipDuplicates: true
  });

  // CONVERSATIONS
  await prisma.conversation.createMany({
    data: data.conversations,
    skipDuplicates: true
  });

  // PARTICIPANTS
  await prisma.conversationParticipant.createMany({
    data: data.participants,
    skipDuplicates: true
  });

  // MESSAGES
  await prisma.message.createMany({
    data: data.messages,
    skipDuplicates: true
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });