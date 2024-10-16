// npx browserify  bundle_node.js -o bundle_browser.mjs

const { fakerDE } = require('@faker-js/faker');
if (typeof window !== 'undefined') {
    // falls im Browser
    window.fakerDE = fakerDE;
    // da ginge auch noch viel mehr ..
} // else: node
// exports hier nicht möglich
