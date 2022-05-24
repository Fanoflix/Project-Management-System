/*
  Warnings:

  - You are about to alter the column `size` on the `WorkItem` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - Made the column `projectId` on table `WorkItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "WorkItem" DROP CONSTRAINT "WorkItem_projectId_fkey";

-- AlterTable
ALTER TABLE "WorkItem" ALTER COLUMN "size" SET DATA TYPE INTEGER,
ALTER COLUMN "projectId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkItem" ADD CONSTRAINT "WorkItem_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
