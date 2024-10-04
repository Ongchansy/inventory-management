-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "image" TEXT,
ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePic" TEXT;
