const arr = [1, 2, 3];

function mod(a: number[]) {
  a[0] = 5;
}

console.log(arr);
mod(arr);
console.log(arr);
