/*
  Warnings:

  - Added the required column `rating` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Driver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "car" TEXT NOT NULL,
    "kilometers" REAL NOT NULL,
    "photo" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL,
    "rate" REAL NOT NULL,
    "rating" INTEGER NOT NULL
);
INSERT INTO "new_Driver" ("available", "car", "description", "id", "kilometers", "name", "photo", "rate") SELECT "available", "car", "description", "id", "kilometers", "name", "photo", "rate" FROM "Driver";
DROP TABLE "Driver";
ALTER TABLE "new_Driver" RENAME TO "Driver";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
