// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create new users

  const user1 = await prisma.user.upsert({
    where: { email: 'junha@gmail.com' },
    update: {},
    create: {
      uid: '79c023fd-156d-4df4-b2c5-9b41b3c4c3af',
      email: 'junha@gmail.com',
      name: 'Junha',
      provider: 'google',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'david@gmail.com' },
    update: {},
    create: {
      uid: 'd58ad12f-241f-4dd4-bbfd-cee57f8cbf06',
      email: 'david@gmail.com',
      name: 'David',
      provider: 'kakao',
    },
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
