import { assertEquals, assertTrue } from ("@std/assert")

export class Value {
    #ganzzahl;
    #zähler;
    #nenner;
    constructor(ganzzahl, zähler, nenner) {
        assertEquals(typeof ganzzahl, "number");
        assertEquals(typeof zähler, "number");
        assertEquals(typeof nenner, "number");
        assertTrue(Number.isInteger(ganzzahl));
        assertTrue(Number.isInteger(zähler));
        assertTrue(Number.isInteger(nenner));
        if (nenner < 0) {
            zähler *= -1;
            nenner *= -1;
        }
        if (nenner === 0) {
            throw new Error("Nenner darf nicht 0 sein");
        }
        this.#ganzzahl = ganzzahl;
        this.#zähler = zähler;
        this.#nenner = nenner;
        const kgv = Value.kgv(zähler, nenner);
        if (kgv > 1) {
            this.#zähler /= kgv;
            this.#nenner /= kgv;
        }
        const zuviel = Math.floor(this.#zähler / this.#nenner);
        this.#ganzzahl += zuviel;
        this.#zähler -= zuviel * this.#nenner;
    }
    get ganzzahl() {
        return this.#ganzzahl;
    }
    get zähler() {
        return this.#zähler;
    }
    get nenner() {
        return this.#nenner;
    }
    static value_from_string(str) {
        const parts = str.split(" ");
        if (parts.length === 1) { // kann nur ganzzahl oder nur bruch sein
            if (parts[0].includes("/")) {
                return new Value(0, ...parts[0].split("/").map(Number));
            }
            return new Value(Number(parts[0]), 0, 1);
        }
        return new Value(Number(parts[0]), ...parts[1].split("/").map(Number));
    }
    
    static kgv(a, b) {
        let rv = 1;
        const upper = Math.floor(Math.sqrt(a));
        for (let i = 2; i <= upper; i++) {
            if (a % i === 0 && b % i === 0) {
                a /= i;
                b /= i;
                rv *= i--;
            }
        }
        return rv;
    }
    add(other) {
        if (!(other instanceof Value)) {
            throw new Error("Value must be an instance of Value");
        }

        const ganzzahl = this.#ganzzahl + other.#ganzzahl;
        const nenner = this.#nenner * other.#nenner;
        const zähler = this.#zähler * other.#nenner + other.#zähler * this.#nenner;
        return Value.value_from_string(`${ganzzahl} ${zähler}/${nenner}`);
    }
}
// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
    console.log("Add 2 + 3 =", add(2, 3));
}
