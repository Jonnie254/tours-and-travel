/*
  Warnings:

  - You are about to drop the `tourImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `images` to the `Tours` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[tourImage] DROP CONSTRAINT [tourImage_tourId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Tours] ADD [images] NVARCHAR(1000) NOT NULL;

-- DropTable
DROP TABLE [dbo].[tourImage];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
