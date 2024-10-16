// @ts-nocheck
"use strict";
const watch = document.querySelector("#date");
const fibs = allFibs();
const main = document.querySelector("main");
const primes = allPrimes();
const analyze = document.querySelector("#analyze");
const zahlFeld = document.querySelector("#zahlInput");
const isPrimFeld = document.querySelector("#prime");
const isFibFeld = document.querySelector("#fib");
const colors = ["#acf", "#9fa", "#f65"];

setInterval(updateWatch, 1000, watch);
analyze.addEventListener("click", updateResults);
zahlFeld.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        updateResults();
    }
});

function updateResults() {
    const checkNumber = Number(zahlFeld.value);
    if (checkNumber > 1000000) {
        isPrimFeld.style.backgroundColor = colors[2];
        isPrimFeld.innerHTML = "TOO LARGE";
        isFibFeld.style.backgroundColor = colors[2];
        isFibFeld.innerHTML = "TOO LARGE";
        return;
    }
    if (primes.includes(checkNumber) && fibs.includes(checkNumber)) {
        isPrimFeld.style.backgroundColor = colors[0];
        isPrimFeld.innerHTML = "PRIM UND";
        isFibFeld.style.backgroundColor = colors[0];
        isFibFeld.innerHTML = "FIBONACCI";
        return;
    }
    if (primes.includes(checkNumber)) {
        isPrimFeld.style.backgroundColor = colors[1];
        isPrimFeld.innerHTML = "PRIM";
        isFibFeld.style.backgroundColor = colors[2];
        isFibFeld.innerHTML = "NO FIB";
        return;
    }
    if (fibs.includes(checkNumber)) {
        isPrimFeld.style.backgroundColor = colors[2];
        isPrimFeld.innerHTML = "NOT PRIME";
        isFibFeld.style.backgroundColor = colors[1];
        isFibFeld.innerHTML = "FIB";
        return;
    }
    isPrimFeld.style.backgroundColor = colors[2];
    isPrimFeld.innerHTML = "neither prime";
    isFibFeld.style.backgroundColor = colors[2];
    isFibFeld.innerHTML = "nor fibonacci";
    main.style.border = "5px solid red";
    return;
}

function allFibs() {
    let rw = [0, 1, 1, 2, 3, 5];
    for (let i = rw.length; rw[rw.length - 1] < 1000000; i++) {
        rw.push(rw[i - 1] + rw[i - 2]);
    }
    return rw;
}
function allPrimes() {
    let rw = [2, 3, 5];
    let konnteTeilen;
    for (let i = 7; i < 1000000; i += 2) {
        let upperBound = Math.sqrt(i);
        konnteTeilen = false;
        for (let j = 2; j <= upperBound; j++) {
            if (i % j === 0) {
                konnteTeilen = true;
                break;
            }
        }
        if (!konnteTeilen) rw.push(i);
    }
    return rw;
}

function updateWatch(target) {
    target.innerHTML = new Date().toLocaleTimeString();
}
