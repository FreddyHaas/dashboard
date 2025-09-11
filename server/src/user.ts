import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export default async function main() {
  const post = await prisma.post.findMany({});
  console.log(post);
}
