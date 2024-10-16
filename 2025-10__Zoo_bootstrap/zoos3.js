const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const zoos = await prisma.zoo.findMany();
    const zoo = zoos[Math.floor(Math.random() * zoos.length)];
    const abteilungen = await prisma.zoo.findMany({
        where: {
            id: zoo.id,
        },
        include: {
            abteilungen: {
                include: { _count: { select: { tiere: true } } },
            },
        },
    });
    console.log(JSON.stringify(abteilungen, null, 2));
}
main().then((_) => {
    prisma.$disconnect();
});
