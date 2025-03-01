-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderDrink" (
    "orderId" INTEGER NOT NULL,
    "drinkId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("orderId", "drinkId"),
    CONSTRAINT "OrderDrink_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderDrink_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "Drink" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderDrink" ("drinkId", "orderId", "quantity") SELECT "drinkId", "orderId", "quantity" FROM "OrderDrink";
DROP TABLE "OrderDrink";
ALTER TABLE "new_OrderDrink" RENAME TO "OrderDrink";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
