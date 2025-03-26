import { assert } from "@std/assert";

export class Value {
    #ganzzahl: number;
    #zähler: number;
    #nenner: number;
    constructor(ganzzahl: number, zähler: number, nenner: number) {
        assert(Number.isInteger(ganzzahl));
        assert(Number.isInteger(zähler));
        assert(Number.isInteger(nenner));
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
    static value_from_string(str: string) {
        const parts = str.split(" ");
        if (parts.length === 1) { // kann nur ganzzahl oder nur bruch sein
            if (parts[0].includes("/")) {
                const fractionParts = parts[0].split("/").map(Number);
                return new Value(0, fractionParts[0], fractionParts[1]);
            }
            return new Value(Number(parts[0]), 0, 1);
        }
        const fractionParts = parts[1].split("/").map(Number);
        return new Value(Number(parts[0]), fractionParts[0], fractionParts[1]);
    }

    static kgv(a: number, b: number) {
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

    add(other: Value) {
        if (!(other instanceof Value)) {
            throw new Error("Value must be an instance of Value");
        }

        const ganzzahl = this.#ganzzahl + other.#ganzzahl;
        const nenner = this.#nenner * other.#nenner;
        const zähler = this.#zähler * other.#nenner +
            other.#zähler * this.#nenner;
        return Value.value_from_string(`${ganzzahl} ${zähler}/${nenner}`);
    }
}
