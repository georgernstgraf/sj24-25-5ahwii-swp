import * as assert from "@std/assert";
import { add } from "./main.ts";

Deno.test(function addTest() {
  assert.assertEquals(add(2, 3), 5);
});
