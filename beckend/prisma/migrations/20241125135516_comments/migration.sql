/*
  Warnings:

  - You are about to drop the column `Assessment` on the `Assessment` table. All the data in the column will be lost.
  - Added the required column `comment` to the `Assessment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assessment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "driverId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    CONSTRAINT "Assessment_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Assessment" ("driverId", "id", "rating") SELECT "driverId", "id", "rating" FROM "Assessment";
DROP TABLE "Assessment";
ALTER TABLE "new_Assessment" RENAME TO "Assessment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
