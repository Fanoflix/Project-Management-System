/*
  Warnings:

  - You are about to drop the column `file` on the `Post` table. All the data in the column will be lost.
  - Added the required column `filename` to the `WorkItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `WorkItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `WorkItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `WorkItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `WorkItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "file";

-- AlterTable
ALTER TABLE "WorkItem" ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "mimetype" TEXT NOT NULL,
ADD COLUMN     "originalName" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "postId" INTEGER,
ADD COLUMN     "size" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkItem" ADD CONSTRAINT "WorkItem_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
