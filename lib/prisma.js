const { PrismaClient } = require("@prisma/client");

global.prisma = undefined;

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
