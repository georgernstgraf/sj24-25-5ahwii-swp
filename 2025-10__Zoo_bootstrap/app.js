const express = require('express');
const app = express();
const port = 3000;
const prisma = require('./lib/db');
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use('/', express.static('static'));

app.get('/', async (req, res) => {
    res.render('index', { zoos: await prisma.zoo.findMany() });
});

app.get('/zoo/:id', async (req, res) => {
    const id = req.params.id;
    const zo = await prisma.zoo.findUnique({
        where: { id: id },
        include: {
            abteilungen: { select: { name: true } }
        }
    });
    return res.render('details', { zoo: zo });
});
app.get('/htmx/', (req, res, next) => {
    if (req.originalUrl.endsWith('/')) return res.redirect('/htmx');
    next();
});
app.get('/htmx', async (req, res) => {
    res.render('htmx');
});
app.post('/htmx-click', (req, res) => {
    res.render('htmx-click');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
