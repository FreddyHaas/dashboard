/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."EmploymentType" AS ENUM ('fulltime', 'parttime', 'contractor', 'intern');

-- CreateEnum
CREATE TYPE "public"."WorkArrangement" AS ENUM ('hybrid', 'onsite', 'remote');

-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PostToTag" DROP CONSTRAINT "_PostToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PostToTag" DROP CONSTRAINT "_PostToTag_B_fkey";

-- DropTable
DROP TABLE "public"."Post";

-- DropTable
DROP TABLE "public"."Profile";

-- DropTable
DROP TABLE "public"."Tag";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."_PostToTag";

-- CreateTable
CREATE TABLE "public"."filter_states" (
    "scope" TEXT NOT NULL,
    "dateRangeFrom" TIMESTAMP(3),
    "dateRangeTo" TIMESTAMP(3),
    "tenure" INTEGER,
    "location" TEXT,
    "employmentType" "public"."EmploymentType",
    "workArrangement" "public"."WorkArrangement",
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "filter_states_pkey" PRIMARY KEY ("scope")
);
