import {prisma} from "../src/lib/prisma.js";
import {chatSeed} from "./seedScripts/ChatGpt/chatSeed.js";
import {claudeSeed} from "./seedScripts/Claude/claudeSeed.js";
import {geminiSeed} from "./seedScripts/Gemini/geminiSeed.js";


async function main(){
  // ─── Wipe existing data (order matters for FK constraints) ───────────────
  await prisma.reaction.deleteMany();
  await prisma.media.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversationParticipant.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.watch.deleteMany();
  await prisma.user.deleteMany();

  console.log("🗑️  Cleared existing records.");
  console.log("Starting seeding process...");
  
  await chatSeed();
  await claudeSeed();
  await geminiSeed();

  console.log("All seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
