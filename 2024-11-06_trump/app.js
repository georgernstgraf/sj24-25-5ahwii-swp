function f(x) {
    const y = arguments;
    console.log(y);
    return 2 * x - 3;
}

function g(x) {
    let called;
    if (!called) {
        called = true;
        return f(x);
    }
    return undefined;
}
const repl = require('repl');
const context = repl.start();
context.context.f = f;
context.context.g = g;