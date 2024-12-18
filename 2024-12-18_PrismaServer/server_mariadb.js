// npm install express
const express = require("express");

// npm install mariadb
const mariadb = require("mariadb");

// npm install prisma --save-dev

// npx prisma init --datasource-provider sqlite

// Server automatisch neu starten lassen:
// npm i -g nodemon
// Zum Starten: nodemon server.js

const port = 3000;
let app = express();
// Konvertiere Daten an den Server zu Text
//app.use(express.text());
app.use(express.json());

const pool = mariadb.createPool({
    host: "localhost",
    user: "node",
    password: "nodejs",
    database: "menu",
    connectionLimit: 5
});



// Definiere die Klasse Drink
class Drink {
    name;
    ml;
    price;
    alcohol;

    constructor(name, ml, price, alcohol) {
        this.name = name;
        this.ml = ml;
        this.price = price;
        this.alcohol = alcohol;
    }
}

// Erstelle ein Menü mit vorgefertigten Drinks
// Aufgabe: Erstelle drei Getränke
let menu = [new Drink("Water", 500, 0.5, 0),
    new Drink("Cola", 330, 3.8, 0),
    new Drink("Frucade", 500, 4.9, 0)
]

// Aufgabe: Erstelle eine GET Route /menu,
// die das ganze Menü als JSON zurück liefert
// Tipp: Mit res.json() kann ein JSON zurück geliefert werden

// In req.query enthalten:
//localhost:3000/menu?name=Water
app.get("/menu", function(req, res) {
    if (req.query["name"]) {
        let name = req.query["name"];
        pool.query("SELECT * FROM drinks WHERE name = ?;", [name])
        .then(result => 
        {
            res.json(result);
        })
        //res.json(menu.find((item) => item.name === name))
    } else {
        pool.query("SELECT * FROM drinks;")
        .then(result => 
        {
            res.json(result);
        })
        
    }
    
})

// Route mit Wildcard
app.get("/menu/:id", function(req, res) {
    // Hole die wildcard aus dem request
    let id = req.params["id"];
    // Aufgabe: Liefere das gesuchte Element als JSON zurück
    pool.query("SELECT * FROM drinks WHERE id = ?;", [id])
        .then(result => 
        {
            res.json(result);
        })
})

// In Headers setzen: Content-Type application/json
app.post("/menu", function(req, res) {
    let newdrink = req.body;
    console.log(newdrink);
    menu.push(newdrink);
    res.send("Hinzugefügt");
})

app.get("/", function(req, res) {
    res.send("Hello world ");
});

app.post("/", function(req, res) {
    console.log(req.body);
    res.send(req.body);
});


// Aufgabe: Schreibe zwei GET Routen
// Eine mit dem Pfad greeting, die eine Begrüßung zurück liefert
// Eine mit dem Pfad swear, die eine zufällige Beleidigung liefert

// Aufgabe 2: Schreibe eine weitere GET Route swear,
// die deine Lieblingsbeleidigung liefert

// Erstelle eine POST Route swear,
// die die mitgelieferte Beleidigung 10x ausgibt mit "Du ..."

app.post("/swear", function(req, res) {
    const swear = req.body;
    let answer = "";
    for (let i = 0; i < 10; i++) {
        answer += "Du " + swear + "\n";
    }
    res.send(answer);
})

app.listen(port, function() {
    console.log("Server started");
})