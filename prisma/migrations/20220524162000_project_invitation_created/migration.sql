-- CreateTable
CREATE TABLE "ProjectInvitation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "ProjectInvitation_pkey" PRIMARY KEY ("id")
);
