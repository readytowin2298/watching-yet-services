import { prisma } from '../src/lib/prisma';
import * as fs from 'fs';
import * as path from 'path';
import bcrypt from  "bcrypt"

async function main() {
  const dataPath = path.join(__dirname, 'seedData.json');
  const { 
    users, 
    posts, 
    media, 
    comments, 
    reactions, 
    watches, 
    conversations, 
    participants, 
    messages 
  } = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  console.log('--- Starting Seeding ---');

  // 1. Users
  for (const u of users) {
    await prisma.user.upsert({
      where: { id: u.id },
      update: {},
      create: {...u, passwordHash: await bcrypt.hash(u.passwordHash, 1) },
    });
  }

  // 2. Watches (Followers)
  for (const w of watches) {
    await prisma.watch.upsert({
      where: { id: w.id },
      update: {},
      create: w,
    });
  }

  // 3. Posts
  for (const p of posts) {
    await prisma.post.upsert({
      where: { id: p.id },
      update: {},
      create: p,
    });
  }

  // 4. Media
  for (const m of media) {
    await prisma.media.upsert({
      where: { id: m.id },
      update: {},
      create: m,
    });
  }

  // 5. Comments
  for (const c of comments) {
    await prisma.comment.upsert({
      where: { id: c.id },
      update: {},
      create: c,
    });
  }

  // 6. Reactions
  for (const r of reactions) {
    await prisma.reaction.upsert({
      where: { id: r.id },
      update: {},
      create: r,
    });
  }

  // 7. Conversations
  for (const conv of conversations) {
    await prisma.conversation.upsert({
      where: { id: conv.id },
      update: {},
      create: conv,
    });
  }

  // 8. Conversation Participants
  for (const part of participants) {
    await prisma.conversationParticipant.upsert({
      where: { id: part.id },
      update: {},
      create: part,
    });
  }

  // 9. Messages
  for (const msg of messages) {
    await prisma.message.upsert({
      where: { id: msg.id },
      update: {},
      create: msg,
    });
  }

  console.log('--- Seed Finished Successfully ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });