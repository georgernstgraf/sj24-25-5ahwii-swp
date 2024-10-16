const out = document.getElementById('output');
const button = document.getElementById('button');
button.addEventListener('click', async () => {
    out.innerHTML = fakerDE.word.words(8);
});
