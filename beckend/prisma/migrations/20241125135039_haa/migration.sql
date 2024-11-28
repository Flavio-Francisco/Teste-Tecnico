/*
  Warnings:

  - You are about to drop the column `rating` on the `Driver` table. All the data in the column will be lost.
  - Added the required column `rating` to the `Assessment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assessment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "driverId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "Assessment" TEXT NOT NULL,
    CONSTRAINT "Assessment_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Assessment" ("Assessment", "driverId", "id") SELECT "Assessment", "driverId", "id" FROM "Assessment";
DROP TABLE "Assessment";
ALTER TABLE "new_Assessment" RENAME TO "Assessment";
CREATE TABLE "new_Driver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "car" TEXT NOT NULL,
    "kilometers" REAL NOT NULL,
    "photo" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL,
    "rate" REAL NOT NULL
);
INSERT INTO "new_Driver" ("available", "car", "description", "id", "kilometers", "name", "photo", "rate") SELECT "available", "car", "description", "id", "kilometers", "name", "photo", "rate" FROM "Driver";
DROP TABLE "Driver";
ALTER TABLE "new_Driver" RENAME TO "Driver";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
