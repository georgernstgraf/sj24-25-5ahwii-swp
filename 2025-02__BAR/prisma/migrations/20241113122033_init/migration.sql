/*
  Warnings:

  - You are about to drop the column `alcohol` on the `Drink` table. All the data in the column will be lost.
  - Added the required column `alcoho` to the `Drink` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Drink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ml" REAL NOT NULL,
    "price" REAL NOT NULL,
    "alcoho" REAL NOT NULL
);
INSERT INTO "new_Drink" ("id", "ml", "name", "price") SELECT "id", "ml", "name", "price" FROM "Drink";
DROP TABLE "Drink";
ALTER TABLE "new_Drink" RENAME TO "Drink";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
