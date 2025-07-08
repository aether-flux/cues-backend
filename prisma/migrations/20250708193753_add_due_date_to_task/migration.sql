-- DropIndex
DROP INDEX "Project_name_key";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "due" TIMESTAMP(3);
