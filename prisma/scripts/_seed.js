import surveys from "../seed_data/surveys.json";
import questions from "../seed_data/questions.json";
import questionchoices from "../seed_data/questionchoices.json";
import respondants from "../seed_data/respondants.json";
import surveyresponses from "../seed_data/surveyresponses.json";
import surveuquestionanswers from "../seed_data/surveuquestionanswers.json";
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

await TruncateAllTables()
  .then(() => {
    console.info("\n >> SUCCESSFULY Truncated All tables!");
  })
  .catch((err) => {
    console.error(`\n // FAILED while truncating tables: \n ${err}`);
  });

console.log(
  "\n\n\n\n < === > < === > Setting up fresh DB... < === > < === > \n"
);

async function SetupDb() {
  // Create multiple surveys
  await prisma.survey.createMany({
    data: surveys,
  });

  // Create multiple questions
  await prisma.question.createMany({
    data: questions,
  });

  // Create multiple Question choices
  await prisma.questionChoice.createMany({
    data: questionchoices,
  });

  // Create Respondant
  await prisma.respondant.createMany({
    data: respondants,
  });

  // Create multiple Surevey Responses
  await prisma.surveyResponse.createMany({
    data: surveyresponses,
  });

  // Create multiple Survey Question Answers
  await prisma.surveyQuestionAnswer.createMany({
    data: surveuquestionanswers,
  });
}

await SetupDb()
  .then(() => {
    console.log("\n >> SUCCESSFULY created fresh database!");
  })
  .catch((err) => {
    console.log(`\n ${err} \n
    // FAILED while setting up db: \n
    `);
  });
