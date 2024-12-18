// npm install express
const express = require("express");

// npm install prisma --save-dev

// npx prisma init --datasource-provider sqlite
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

// Wird für das PW hashing genutzt
// npm install bcrypt
const bcrypt = require("bcrypt")

// Nicht nutzen! Session stattdessen
// https://www.npmjs.com/package/express-session
// Wird genutzt um sichere Token zu erstellen
// npm install jsonwebtoken
const jwt = require("jsonwebtoken")

// Server automatisch neu starten lassen:
// npm i -g nodemon
// Zum Starten: nodemon server.js

const port = 3000;
const JWT_SECRET = 'my-secure-token'; // Muss ausgetauscht werden für Produktiveinsatz!
let app = express();

app.use(express.json());

app.post("/register", async function (req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Speichern des Hash in der DB
    
    // Hier wird die Session erzeugt und an den Client geschickt
})

app.post("/menu", async function (req, res) {
    const drink = req.body;
    const result = await prisma.drink.create({
        data: drink
    })
    res.send(result)
})

app.get("/menu", async function (req, res) {
    const drinks = await prisma.drink.findMany()
    res.json(drinks)
})

app.get("/menu/:id", async function (req, res) {
    const id = req.params["id"]
    try {
        const drink = await prisma.drink.findUniqueOrThrow({
            where: {
                id: parseInt(id)
            }
        })
        res.json(drink)
    } catch (error) {
        res.status(404).json({ error: "Drink not found" })
    }
})

// Aufgabe: In try catch einbinden
app.delete("/menu/:id", async function (req, res) {
    const id = req.params["id"]
    try {
        const result = await prisma.drink.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.json(result)
    } catch (error) {
        res.status(404).json({ error: "Drink not found" })
    }
})

app.patch("/menu/:id", async function (req, res) {
    const id = req.params["id"]
    try {
        const drink = req.body
        const result = await prisma.drink.update({
            where: {
                id: parseInt(id)
            },
            data: drink
        })

        res.json(result)
    } catch (error) {
        res.status(404).json({ error: "Drink not found" })
    }
})

/* Wichtig: In einer Order darf ein Drink nicht doppelt vorkommen!
{
    "drinks": [
        {"drinkId": 2, "quantity": 2},
        {"drinkId": 1, "quantity": 4}
    ],
    "foods": [
        {...}
    ]
}

*/

app.post("/order", async function(req, res) {
    let order = req.body;
    try {
        const result = await prisma.order.create({
            data: {
                drinks: {
                    // Eintrag in Zwischentabelle OrderDrink erstellen
                    // Gehe jeden Eintrag in dem empfangenen JSON durch
                    create: order.drinks.map(row => ({
                        // Verknüpfe die drinkId mit dem neu erstellten OrderDrink Element
                        drink: {
                            connect: {
                                id: row.drinkId
                            }
                        },
                        // Setze die Quantity von OrderDrink
                        quantity: row.quantity
                    })
                    )
                }
            }
        })
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Could not create order"})
    } 
})

app.get("/order", async function (req, res) {
    const orders = await prisma.order.findMany({
        include: {
            // Inkludiere die Zwischentabelle
            drinks: {
                include: {
                    // Inkludiere den Drink in der Zwischentabelle
                    drink: true
                }
            }
        }
    })
    res.json(orders)
})

app.get("/order/:id", async function(req, res) {
    const orderId = parseInt(req.params["id"]);
    try {
        const order = await prisma.order.findUniqueOrThrow({
            where: {id: orderId},
            include: {
                drinks: {
                    include: {
                        drink: true
                    }
                }
            }
        })
        res.json(order)
    } catch (error) {
        res.status(404).json({error: "Order not found"})
    }
})

app.delete("/order/:id", async function(req, res) {
    const id = parseInt(req.params["id"]);
    try {
        /*
        Holzweg - zu viel Aufwand!
        await prisma.orderDrink.deleteMany({
            where: {
                orderId: id
            }
        })*/

        const result = await prisma.order.delete({
            where: {id: id}
        })
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(404).json({"error":"Order not found"});
    }
});

app.patch("/order/:id", async function(req, res) {
    let id = req.params.id;
    let updatedOrder = req.body;

    try {
        await prisma.orderDrink.deleteMany({
            where: {
                orderId: parseInt(id)
            }
        });
        // TODO: delete bei orderFood auch ausführen

        const result = await prisma.order.update({
            where: {
                id: parseInt(id)
            },
            data: {
                drinks: {
                    create: updatedOrder.drinks.map(row => ({
                        drink: {
                            connect: {
                                id: row.drinkId
                            }
                        },
                        quantity: row.quantity
                    })),
                },
                // TODO: orderFood auch wieder aufbauen
            }
        })
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: "Failed to update order"});
    }
})

app.listen(port, function () {
    console.log("Server started");
})