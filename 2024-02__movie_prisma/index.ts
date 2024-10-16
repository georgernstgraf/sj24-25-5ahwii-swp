const { PrismaClient } = require('@prisma/client');
const express = require('express');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post('/genre', async (req, res) => {
    const { name } = req.body;
    const genre = await prisma.genre.create({
        data: {
            name,
        },
    });
    res.json(genre);
});

app.get('/genres', async (req, res) => {
    const genres = await prisma.genre.findMany();
    res.json(genres);
});

app.post('/movie', async (req, res) => {
    const { title, length, description, director, genreId } = req.body;
    const movie = await prisma.movie.create({
        data: {
            title,
            length,
            description,
            director,
            genreId,
        },
    });
    res.json(movie);
});

app.get('/movie/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await prisma.movie.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    res.json(movie);
});

app.get('/movies', async (req, res) => {
    const movies = await prisma.movie.findMany();
    res.json(movies);
});

app.put('/movie/:id', async (req, res) => {
    const { id } = req.params;
    const { title, length, description, director, genreId } = req.body;
    const movie = await prisma.movie.update({
        where: { id: Number(id) },
        data: {
            title,
            length,
            description,
            director,
            genreId,
        },
    });
    res.json(movie);
});

app.delete('/movie/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await prisma.movie.delete({
        where: { id: Number(id) },
    });
    res.json(movie);
});

app.post('/watchlist', async (req, res) => {
    const { movieId, userId } = req.body;
    const watchlist = await prisma.watchlist.create({
        data: {
            movieId,
            userId,
        },
    });
    res.json(watchlist);
});

app.get('/watchlists', async (req, res) => {
    const watchlists = await prisma.watchlist.findMany();
    res.json(watchlists);
});

app.post('/user', async (req, res) => {
    const { username, firstname, lastname, birthdate } = req.body;
    const user = await prisma.user.create({
        data: {
            username,
            firstname,
            lastname,
            birthdate: new Date(birthdate),
        },
    });
    res.json(user);
});

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

const server = app.listen(3000, () =>
    console.log(`Server ready at: http://localhost:3000`)
);
