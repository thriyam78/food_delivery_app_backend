const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["query"],
});

async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Something went wrong", error);
  }
}
module.exports = { prisma, checkDatabaseConnection };
