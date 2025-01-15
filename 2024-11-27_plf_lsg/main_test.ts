import { assertAlmostEquals, assertEquals } from "jsr:@std/assert";
import { leibniz, tolerance } from "./main.ts";

Deno.test(function bubu() {
  const [piViertel, iterations] = leibniz();
  assertAlmostEquals(piViertel, Math.PI / 4, tolerance);
  console.log(iterations);
});
