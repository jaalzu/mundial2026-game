import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

config({ path: ".env.local" });

const prisma = new PrismaClient();

try {
  const user = await prisma.user.findUnique({
    where: {
      id: "11111111-1111-4111-8111-111111111111"
    },
    select: {
      id: true,
      name: true,
      recoveryKey: true
    }
  });

  console.log(JSON.stringify(user, null, 2));
} finally {
  await prisma.$disconnect();
}
