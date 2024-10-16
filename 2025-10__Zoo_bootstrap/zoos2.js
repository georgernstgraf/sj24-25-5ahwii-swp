const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const zoos = await prisma.zoo.findMany();
    const zoo = zoos[Math.floor(Math.random() * zoos.length)];
    const abteilungen = await prisma.abteilung.findMany({
        where: {
            zoo: zoo,
        },
    });
    console.log(zoo);
    console.log(abteilungen);
}
main().then((_) => {
    prisma.$disconnect();
});
