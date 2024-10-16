const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const zoos = await prisma.zoo.findMany();
    console.log(zoos);
}
main().then((_) => {
    prisma.$disconnect();
});
