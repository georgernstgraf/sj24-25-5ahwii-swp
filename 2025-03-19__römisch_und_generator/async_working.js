function* fetchData() {
    const userResponse = yield fetch(
        "https://jsonplaceholder.typicode.com/users/1",
    );
    const user = yield userResponse.json(); // Wait for JSON conversion

    const postsResponse = yield fetch(
        `https://jsonplaceholder.typicode.com/users/${user.id}/posts`,
    );
    const posts = yield postsResponse.json(); // Wait for JSON conversion

    console.log(user, posts);
}

async function runGenerator(gen) {
    const iterator = gen();

    let result = iterator.next(); // Start the generator

    while (!result.done) {
        try {
            result = iterator.next(await result.value); // Await each yielded promise
        } catch (err) {
            iterator.throw(err); // Handle errors inside the generator
        }
    }
}

runGenerator(fetchData);
