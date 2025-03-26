function* _fibonacci(upper_limit) {
    let a = 0, b = 1;
    while (a <= upper_limit) {
        yield a;
        [a, b] = [b, a + b];
    }
    return "done";
}

function* natürliche() {
    let n = 0;
    while (true) {
        yield n++;
    }
}
for (const n of natürliche()) {
    console.log(n);
}
