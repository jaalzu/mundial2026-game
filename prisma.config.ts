import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: ".env.local" });

const databaseUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Missing DIRECT_URL or DATABASE_URL for Prisma.");
}

function requireSsl(url: string) {
  const parsedUrl = new URL(url);

  if (!parsedUrl.searchParams.has("sslmode")) {
    parsedUrl.searchParams.set("sslmode", "require");
  }

  return parsedUrl.toString();
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: requireSsl(databaseUrl)
  },
  migrations: {
    path: "prisma/migrations"
  }
});
