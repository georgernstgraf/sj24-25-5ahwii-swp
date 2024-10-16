-- CreateTable
CREATE TABLE "Beispieltabelle" (
    "Personalnummer" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT,
    "Vorname" TEXT,
    "Gehalt" single
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Beispieltabelle_1" ON "Beispieltabelle"("Personalnummer");
Pragma writable_schema=0;
