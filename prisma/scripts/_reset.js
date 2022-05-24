import PrismaPackage from "@prisma/client";
const { PrismaClient } = PrismaPackage;
const prisma = new PrismaClient();

console.info(
  "\n\n\n\n < === > < === > Executing Truncation for all Tables... < === > < === > \n"
);

const tablenames = [
  "Survey",
  "SurveyQuestionAnswer",
  "SurveyResponse",
  "Question",
  "QuestionChoice",
  "Respondant",
];

async function TruncateAllTables() {
  for (const tablename of tablenames) {
    if (tablename !== "_prisma_migrations") {
      console.info(`Truncating ${tablename}...`);
      await prisma.$executeRawUnsafe(
        `TRUNCATE "${tablename}" RESTART IDENTITY CASCADE ` // cascades + restarts id (from 1)
      );
    }
  }
}

TruncateAllTables()
  .then(() => {
    console.info("\n >> SUCCESSFULY Truncated All tables!");
  })
  .catch((err) => {
    console.error(`\n // FAILED while truncating tables: \n ${err}`);
  });
