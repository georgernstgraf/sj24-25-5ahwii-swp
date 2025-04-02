// Now use the globally exposed functions
const { ok, err } = window.neverthrow;

function divide(a, b) {
    if (b === 0) {
        return err("Cannot divide by zero"); // Error case (string)
    }
    return ok(a / b); // Success case (number)
}
const result1 = divide(10, 2);
const result2 = divide(10, 0);

const outputDiv = document.getElementById("output");
result1.match(
    (value) => {
        outputDiv.innerHTML += `<p>10 ÷ 2 = ${value}</p>`;
    },
    (error) => {
        outputDiv.innerHTML += `<p>10 ÷ 2 = Error: ${error}</p>`;
    },
);

result2.match(
    (value) => {
        outputDiv.innerHTML += `<p>10 ÷ 0 = ${value}</p>`;
    },
    (error) => {
        outputDiv.innerHTML += `<p>10 ÷ 0 = Error: ${error}</p>`;
    },
);
