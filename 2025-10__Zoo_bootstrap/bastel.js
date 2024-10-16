const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ log: ['query'] });

async function main() {
    const id = 'clv3prqir00008oe9wi55wwt4';
    const zo = await prisma.zoo.findUnique({
        where: { id: id },
        include: {
            abteilungen: { select: { name: true } }
        }
    });
    console.log(JSON.stringify(zo, null, 2));
}
main().then((_) => {
    prisma.$disconnect();
});
