const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');
const assert = require('assert');

async function main() {
    await prisma.mitarbeiter.deleteMany();
    await prisma.tier.deleteMany();
    await prisma.abteilung.deleteMany();
    await prisma.zoo.deleteMany();
    // wird oft gebraucht
    const allAnimalTypes = Array.from(
        new Set(new Array(100).fill().map((_) => faker.animal.type()))
    );
    // 5 ZOOs erzeugen
    const zoos = [];
    for (let i = 0; i < 5; i++) {
        zoos.push(
            await prisma.zoo.create({
                data: {
                    land: faker.location.country(),
                    stadt: faker.location.city(),
                    adresse: faker.location.streetAddress(),
                    baujahr: faker.date.past({ years: 150 }).getFullYear(),
                },
            })
        );
    }

    // ABT erzeugen: 2-7 (incl) pro Zoo, keine doppelt pro Zoo
    const abteilungen = [];
    for (zoo of zoos) {
        const abteilungCount = faker.number.int({ min: 2, max: 7 });
        const abteilungTypen = Array.from(allAnimalTypes)
            .toSorted((_) => Math.random() - 0.5)
            .slice(0, abteilungCount);
        for (let i = 0; i < abteilungCount; i++) {
            const animalType = abteilungTypen.pop();
            abteilungen.push(
                await prisma.abteilung.create({
                    data: {
                        zooId: zoo.id,
                        name: animalType,
                    },
                })
            );
        }
    }

    // create tiere (5-20 pro Abteilung)
    tiere = [];
    for (let abteilung of abteilungen) {
        const tierCount = faker.number.int({ min: 5, max: 20 });
        for (let i = 0; i < tierCount; i++) {
            tiere.push(
                await prisma.tier.create({
                    data: {
                        art: faker.animal[abteilung.name](),
                        name: `${abteilung.name}: ${faker.person.firstName()}`,
                        abteilungId: abteilung.id,
                    },
                })
            );
        }
    }

    // 100 MA, jede und jeder in 1-4 Abteilungen
    mitarbeiter = [];
    for (let i = 0; i < 100; i++) {
        myAbteilungen = abteilungen
            .toSorted((_) => Math.random() - 0.5)
            .slice(0, faker.number.int({ min: 1, max: 4 }));
        assert.ok(myAbteilungen.length > 0);
        mitarbeiter.push(
            await prisma.Mitarbeiter.create({
                data: {
                    name: faker.person.fullName(),
                    abteilungen: {
                        connect: myAbteilungen,
                    },
                },
            })
        );
    }

    console.log(zoos.length + ' Zoos created');
    console.log(abteilungen.length + ' Abteilungen created');
    console.log(tiere.length + ' Tiere created');
    console.log(mitarbeiter.length + ' Mitarbeiter created');
}

main()
    .then(() => {
        prisma.$disconnect();
        console.log('done');
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
