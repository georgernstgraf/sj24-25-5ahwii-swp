function* asyncTask() {
    console.log("Step 1");
    yield new Promise((resolve) =>
        setTimeout(() => resolve("Step 2 complete"), 1000)
    );

    console.log("Step 2");
    yield new Promise((resolve) =>
        setTimeout(() => resolve("Step 3 complete"), 1000)
    );

    console.log("Step 3");
}

async function runGenerator(gen) {
    const iterator = gen();
    for (
        let next = iterator.next();
        !next.done;
        next = iterator.next(await next.value)
    ) {
        console.log(await next.value);
    }
}

runGenerator(asyncTask);
