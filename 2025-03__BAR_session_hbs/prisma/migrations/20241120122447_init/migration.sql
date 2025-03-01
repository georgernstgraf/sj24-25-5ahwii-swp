-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "OrderDrink" (
    "orderId" INTEGER NOT NULL,
    "drinkId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("orderId", "drinkId"),
    CONSTRAINT "OrderDrink_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderDrink_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "Drink" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
