const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { faker } = require('@faker-js/faker');

class FakeUser {
    constructor() {
        this.username = faker.internet.userName();
        this.firstname = faker.person.firstName();
        this.lastname = faker.person.lastName();
        this.birthdate = faker.date.birthdate();
    }
}
class FakeMovie {
    constructor(genreId) {
        this.title = faker.music.songName();
        this.length = faker.number.int({ min: 60, max: 7200 });
        this.description = faker.word.words({ count: { min: 3, max: 7 } });
        this.director = faker.person.fullName();
        this.genreId = genreId;
    }
}
class FakeGenre {
    constructor() {
        this.name = faker.music.genre();
    }
}

async function main() {
    for (let i = 0; i < 100; i++) {
        const u = new FakeUser();
        //console.log(u);
        const prisma_user = await prisma.user.create({
            data: u,
        });
    }
    const userIds = (await prisma.user.findMany({ select: { id: true } })).map(
        (_) => _.id
    );
    console.log(`${userIds.length} users are in the database`);
    for (let i = 0; i < 30; i++) {
        const g = new FakeGenre();
        //console.log(g.name);
        try {
            const prisma_genre = await prisma.genre.create({
                data: g,
            });
        } catch (e) {
            //console.log(g.name + ' already exists');
        }
    }
    console.log('30 genres created');
    const genreIds = (
        await prisma.genre.findMany({ select: { id: true } })
    ).map((_) => _.id);
    for (let i = 0; i < 300; i++) {
        const m = new FakeMovie(
            genreIds[Math.floor(Math.random() * genreIds.length)]
        );
        const prisma_movie = await prisma.movie.create({
            data: m,
        });
    }
    const movieIds = (
        await prisma.movie.findMany({ select: { id: true } })
    ).map((_) => _.id);
    console.log(`${movieIds.length} movies are in the database`);
    // create a couple of watchlist records
    for (let uid of userIds) {
        const numMovies = faker.number.int({ min: 1, max: 10 });
        const movieIdsToWatch = new Set();
        for (let i = 0; i < numMovies; i++) {
            movieIdsToWatch.add(
                movieIds[Math.floor(Math.random() * movieIds.length)]
            );
        }
        for (let i of movieIdsToWatch) {
            const prisma_watchlist = await prisma.watchlist.create({
                data: {
                    userId: uid,
                    movieId: i,
                },
            });
        }
    }
}
main().then(() => {
    prisma.$disconnect();
    console.log('done');
}); // eslint-disable-line no-console
