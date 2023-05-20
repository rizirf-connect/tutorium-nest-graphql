import { PrismaClient } from '@prisma/client';

export const databaseProviders = [
  {
    provide: 'PRISMA_SOURCE',
    useFactory: async () => {
      const prismaClient = new PrismaClient();
      await prismaClient.$connect();

      return prismaClient;
    },
  },
];
