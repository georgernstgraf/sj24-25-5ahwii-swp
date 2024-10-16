/*
  Warnings:

  - You are about to alter the column `baujahr` on the `Zoo` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Zoo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "land" TEXT NOT NULL,
    "stadt" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "baujahr" INTEGER NOT NULL
);
INSERT INTO "new_Zoo" ("adresse", "baujahr", "id", "land", "stadt") SELECT "adresse", "baujahr", "id", "land", "stadt" FROM "Zoo";
DROP TABLE "Zoo";
ALTER TABLE "new_Zoo" RENAME TO "Zoo";
CREATE UNIQUE INDEX "Zoo_id_key" ON "Zoo"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
