import * as jsdom from "npm:jsdom";

const s =
  `Lorem <think>ipsum dolor sit amet, consectetur adipisicing elit. Aut minima explicabo voluptates molestias,
    consequatur
    fugit voluptate aspernatur omnis quaerat illum!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, a quaerat quo cum pariatur vitae ab laboriosam
    quos
    quas adipisci </think> tempora ipsam, unde nisi ea rem soluta repellendus, porro magnam? Aliquid eius esse modi
id neque
odit placeat laborum <think>quia vel </think> cum aspernatur rem tempore quod, assumenda, quos corporis!`;

const dom = new jsdom.JSDOM(s);
const think = dom.window.document.querySelectorAll("think");
think.forEach((el) => {
  el.remove();
});
console.log(dom.window.document.body.innerHTML);
