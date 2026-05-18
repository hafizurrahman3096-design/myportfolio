require("dotenv").config({ path: ".env" });

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const pg = require("pg");
const bcrypt = require("bcryptjs");

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const hashedPassword = await bcrypt.hash(
      "hafizur@443",
      10
    );

    await prisma.admin.create({
      data: {
        email: "hafizur",
        password: hashedPassword,
      },
    });

    console.log("Admin created successfully");
  } catch (error) {
    console.log("Admin already exists or error:", error.message);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });


