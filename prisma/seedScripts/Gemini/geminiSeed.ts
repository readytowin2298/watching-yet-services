import { prisma } from '../../../src/lib/prisma.js';
import { ReactionType, MediaType } from "../../../src/generated/client/client.js";
import * as fs from 'fs';
import * as path from 'path';
import bcrypt from  "bcrypt"
import seedData from "./seedData.json";

export const geminiSeed = async () => {
  // const dataPath = path.join(__dirname, 'seedData.json');
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
  } = seedData;

  console.log('--- Starting Seeding ---');

  // 1. Users
  for (const u of users) {
    await prisma.user.create({
      data: {...u, passwordHash: await bcrypt.hash(u.passwordHash, 1) },
    });
  }

  // 2. Watches (Followers)
  for (const w of watches) {
    await prisma.watch.create({
      data: w,
    });
  }

  // 3. Posts
  for (const p of posts) {
    await prisma.post.create({
      data: p,
    });
  }

  // 4. Media
  for (const m of media) {
    await prisma.media.create({
      data: {...m, type: m.type as MediaType},
    });
  }

  // 5. Comments
  for (const c of comments) {
    await prisma.comment.create({
      data: c,
    });
  }

  // 6. Reactions
  for (const r of reactions) {
    await prisma.reaction.create({
      data: {...r, type: r.type as ReactionType},
    });
  }

  // 7. Conversations
  for (const conv of conversations) {
    await prisma.conversation.create({
      data: conv,
    });
  }

  // 8. Conversation Participants
  for (const part of participants) {
    await prisma.conversationParticipant.create({
      data: part,
    });
  }

  // 9. Messages
  for (const msg of messages) {
    await prisma.message.create({
      data: msg,
    });
  }

  console.log('--- Seed Finished Successfully ---');
}