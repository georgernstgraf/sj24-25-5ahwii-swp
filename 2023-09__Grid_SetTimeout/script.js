import { Bunny } from "./bunny.mjs";
import { StartStopBtn } from "./startstopbutton.mjs";
import { JumpBtn } from "./jumpbutton.mjs";

const bunny = new Bunny(document.querySelector("#bunny"));
const jumpBtn = new JumpBtn(document.querySelector("#jump"));
const startStopBtn = new StartStopBtn(document.querySelector("#startStop"));

// document.querySelector("#posX").style.width = "2.5rem";
// document.querySelector("#posY").style.width = "2.5rem";
// document.querySelector("#mS").style.width = "4.5rem";

jumpBtn.setPosXSrc(document.querySelector("#posX"));
jumpBtn.setPosYSrc(document.querySelector("#posY"));
jumpBtn.registerBunny(bunny);

startStopBtn.setMSSrc(document.querySelector("#mS"));
startStopBtn.registerBunny(bunny);
