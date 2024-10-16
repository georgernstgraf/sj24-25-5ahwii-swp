/*
  Warnings:

  - You are about to alter the column `Gehalt` on the `Beispieltabelle` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("single")` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Beispieltabelle" (
    "Personalnummer" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT,
    "Vorname" TEXT,
    "Gehalt" REAL
);
INSERT INTO "new_Beispieltabelle" ("Gehalt", "Name", "Personalnummer", "Vorname") SELECT "Gehalt", "Name", "Personalnummer", "Vorname" FROM "Beispieltabelle";
DROP TABLE "Beispieltabelle";
ALTER TABLE "new_Beispieltabelle" RENAME TO "Beispieltabelle";
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Beispieltabelle_1" ON "Beispieltabelle"("Personalnummer");
Pragma writable_schema=0;
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
