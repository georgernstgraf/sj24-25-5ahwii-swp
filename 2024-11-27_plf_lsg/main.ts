export const tolerance = 0.000000001;
export function leibniz(): [number, number] {
  let current = 1;
  let oldvalue = current;
  let iteration = 1;
  let vorzMult = 1;

  while (true) {
    const nenner = 2 * iteration + 1;
    vorzMult *= -1;
    current += vorzMult / nenner;
    if (nearEnough(current, oldvalue)) {
      return [current, iteration];
    }
    iteration++;
    oldvalue = current;
  }
}
function nearEnough(a: number, b: number): boolean {
  //const differenz = a - b;
  //const betrag = Math.abs(differenz);
  //if (betrag < tolerance) {
  //  return true;
  //} else {
  //  return false;
  //}
  return Math.abs(a - b) < tolerance;
}
