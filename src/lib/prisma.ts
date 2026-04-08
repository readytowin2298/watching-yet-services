import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/client/client.js';

// 1. Create a standard 'pg' connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 2. Wrap it in the Prisma Adapter
const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 3. Pass the adapter into the constructor
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;