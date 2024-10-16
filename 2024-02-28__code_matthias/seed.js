const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');
class fakeuser {
    constructor() {
        this.username = faker.person.fullName();
    }
}
class fakeSong {
    constructor() {
        this.title = faker.music.songName();
        this.artist = faker.person.fullName();
        this.genre = faker.music.genre();
    }
}
async function main() {
    await prisma.playlist.deleteMany();
    await prisma.song.deleteMany();
    await prisma.user.deleteMany();
    for (let i = 0; i < 5; i++) {
        const user = new fakeuser();
        const prismaUser = await prisma.user.create({
            data: user,
        });
    }
    const userIds = (await prisma.user.findMany({ select: { id: true } })).map(
        (_) => _.id
    );
    for (let i = 0; i < 5; i++) {
        const user = new fakeuser();
        const prismaUser = await prisma.user.create({
            data: user,
        });
    }
    console.log(userIds.length + ' users created');
    for (let i = 0; i < 10; i++) {
        const song = new fakeSong();
        const prismaSong = await prisma.song.create({
            data: song,
        });
    }
    const songIds = (await prisma.song.findMany({ select: { id: true } })).map(
        (_) => _.id
    );
    console.log(songIds.length + ' songs created');

    for (let i = 0; i < 10; i++) {
        await prisma.playlist.create({
            data: {
                name: faker.lorem.words(2),
                userId: userIds[
                    faker.number.int({ min: 0, max: userIds.length - 1 })
                ],
            },
        });
    }
    const playlistIds = (
        await prisma.playlist.findMany({ select: { id: true } })
    ).map((_) => _.id);
    console.log(playlistIds.length + ' playlists created');
    for (let i = 0; i < 50; i++) {
        await prisma.playlist.update({
            where: {
                id: playlistIds[
                    faker.number.int({ min: 0, max: playlistIds.length - 1 })
                ],
            },
            data: {
                song: {
                    connect: {
                        id: songIds[
                            faker.number.int({
                                min: 0,
                                max: songIds.length - 1,
                            })
                        ],
                    },
                },
            },
        });
    }
}
// const userIds = (await prisma.user.findMany({select: {id: true}})).map(_ => _.id);
// for (uid of userIds) {
//     const playSongs = 3; //faker.number.int({min: 1, max: 5});
//     const songsPlaylist = new Set();
//     for (let i = 0; i < playSongs; i++) { // Songs Playlist ist ein set wo playSongs viele Songids drin sind
//         songsPlaylist.add(
//             songIds[faker.number.int({min: 0, max: songIds.length - 1})]
//         );
//     }
//     for (let i of songsPlaylist) {
//         const prismaPlaylist = await prisma.playlist.create({
//             data: {
//                 userId: uid,
//                 song: {
//                     create: {
//                 },
//                 name: faker.lorem.words(3),
//             },
//         });
//     }
// }

main()
    .then(() => {
        prisma.$disconnect();
        console.log('done');
    })
    .catch((e) => {
        console.error(e.message);
        process.exit(1);
    });
