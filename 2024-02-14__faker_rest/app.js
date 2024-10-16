const { fakerDE } = require('@faker-js/faker');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 3000;

app.get('/:id', (req, res) => {
    const count = parseInt(req.params.id);
    res.json({ string: fakerDE.word.words(count) });
});

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});
