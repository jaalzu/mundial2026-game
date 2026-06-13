import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const FINISHED_MATCHES = [
  "635e9dd4-02ac-49b4-a9a5-41170205fa72", // Mexico vs South Africa
  "7ef60b2a-947a-4f21-b89f-d02e7a6c3c2a", // Korea vs Czechia
  "5427e581-fb8d-4b1c-b0e7-b9a177bca03a", // Canada vs Bosnia
  "b1a10c23-f200-4eae-8dcd-6e61d9bfecfb", // USA vs Paraguay
];

async function main() {
  for (const id of FINISHED_MATCHES) {
    await prisma.match.update({
      where: { id },
      data: { status: "FINISHED" },
    });
    console.log(`✓ Fixed match ${id}`);
  }
  console.log("✅ Done — solo status actualizado, puntos intactos");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
