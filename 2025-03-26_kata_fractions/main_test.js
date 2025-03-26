import { assertEquals } from "@std/assert";
import { Value } from "./main.js";

Deno.test(function kgvTest() {
    assertEquals(Value.kgv(14, 8), 2);
    assertEquals(Value.kgv(16, 8), 8);
    assertEquals(Value.kgv(16, 12), 4);
    assertEquals(Value.kgv(12, 8), 4);
});
Deno.test(function valueFromStringTest() {
    let value = Value.value_from_string("1 1/2");
    assertEquals(value.ganzzahl, 1);
    assertEquals(value.zähler, 1);
    assertEquals(value.nenner, 2);
    value = Value.value_from_string("1/2");
    assertEquals(value.ganzzahl, 0);
    assertEquals(value.zähler, 1);
    assertEquals(value.nenner, 2);
    value = Value.value_from_string("2");
    assertEquals(value.ganzzahl, 2);
    assertEquals(value.zähler, 0);
    assertEquals(value.nenner, 1);
    value = Value.value_from_string("12/8");
    assertEquals(value.ganzzahl, 1);
    assertEquals(value.zähler, 1);
    assertEquals(value.nenner, 2);
});

Deno.test(function addTest() {
    let value1 = new Value(0, 1, 2);
    let value2 = new Value(0, 3, 4);
    let result = value1.add(value2);
    assertEquals(result.ganzzahl, 1);
    assertEquals(result.zähler, 1);
    assertEquals(result.nenner, 4);

    value1 = new Value(1, 1, 2);
    value2 = new Value(1, 1, 3);
    result = value1.add(value2);
    assertEquals(result.ganzzahl, 2);
    assertEquals(result.zähler, 5);
    assertEquals(result.nenner, 6);

    value1 = new Value(1, 1, 2);
    value2 = new Value(1, 1, 4);
    result = value1.add(value2);
    assertEquals(result.ganzzahl, 2);
    assertEquals(result.zähler, 3);
    assertEquals(result.nenner, 4);

    value1 = new Value(1, 1, 2);
    value2 = new Value(1, 1, 5);
    result = value1.add(value2);
    assertEquals(result.ganzzahl, 2);
    assertEquals(result.zähler, 7);
    assertEquals(result.nenner, 10);
});