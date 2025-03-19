function* fibo(upper_limit) {
    let a = 0, b = 1;
    while (a < upper_limit) {
        yield a;
        [a, b] = [b, a + b];
    }
    return "done";
}

for (let n of fibo(10)) {
    console.log(n);
}
