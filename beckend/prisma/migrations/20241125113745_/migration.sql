-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "car" TEXT NOT NULL,
    "kilometers" REAL NOT NULL,
    "photo" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL,
    "rate" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Race" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "duration" REAL NOT NULL,
    "distance" REAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    CONSTRAINT "Race_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Race_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "driverId" INTEGER NOT NULL,
    "Assessment" TEXT NOT NULL,
    CONSTRAINT "Assessment_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
