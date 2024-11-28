-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Race" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "duration" TEXT NOT NULL,
    "distance" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Race_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Race_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Race" ("date", "destination", "distance", "driverId", "duration", "id", "origin", "userId", "value") SELECT "date", "destination", "distance", "driverId", "duration", "id", "origin", "userId", "value" FROM "Race";
DROP TABLE "Race";
ALTER TABLE "new_Race" RENAME TO "Race";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
