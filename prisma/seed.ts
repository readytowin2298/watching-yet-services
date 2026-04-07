import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 1

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(process.cwd(), 'prisma', 'seedData', 'social_seed_data.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(rawData);

  console.log('🌱 Seeding database...');

  // Optional: clear DB first (safe for dev only)
  await prisma.reaction.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.watch.deleteMany();
  await prisma.user.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversationParticipant.deleteMany();
  await prisma.conversation.deleteMany();

  // 1. Users
  if (data.User?.length) {
    await prisma.user.createMany({
      data: {...data.User, passwordHash: bcrypt.hashSync(data.User.passwordHash, SALT_ROUNDS)},
      skipDuplicates: true,
    });
    console.log(`✅ Seeded ${data.User.length} users`);
  }

  // 2. Watches
  if (data.Watch?.length) {
    await prisma.watch.createMany({
      data: data.Watch,
      skipDuplicates: true,
    });
    console.log(`✅ Seeded ${data.Watch.length} watches`);
  }

  // 3. Posts
  if (data.Post?.length) {
    await prisma.post.createMany({
      data: data.Post,
    });
    console.log(`✅ Seeded ${data.Post.length} posts`);
  }

  // 4. Comments
  if (data.Comment?.length) {
    await prisma.comment.createMany({
      data: data.Comment,
    });
    console.log(`✅ Seeded ${data.Comment.length} comments`);
  }

  // 5. Reactions
  if (data.Reaction?.length) {
    await prisma.reaction.createMany({
      data: data.Reaction,
    });
    console.log(`✅ Seeded ${data.Reaction.length} reactions`);
  }

  // 6. Conversations
  if (data.Conversation?.length) {
    await prisma.conversation.createMany({
      data: data.Conversation,
    });
    console.log(`✅ Seeded ${data.Conversation.length} conversations`);
  }

  // 7. Conversation Participants
  if (data.ConversationParticipant?.length) {
    await prisma.conversationParticipant.createMany({
      data: data.ConversationParticipant,
    });
    console.log(`✅ Seeded participants`);
  }

  // 8. Messages
  if (data.Message?.length) {
    await prisma.message.createMany({
      data: data.Message,
    });
    console.log(`✅ Seeded ${data.Message.length} messages`);
  }

  console.log('🌱 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });