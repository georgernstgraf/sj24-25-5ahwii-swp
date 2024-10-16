const out = document.getElementById('output');
const button = document.getElementById('button');
button.addEventListener('click', async () => {
    const promise = await fetch('http://localhost:3000/5');
    const data = await promise.json();
    out.innerHTML = data.string;
});
