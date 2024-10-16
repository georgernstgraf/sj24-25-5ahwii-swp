import { Component } from "./component.mjs";
class StartStopBtn extends Component {
    bunny;
    options;
    constructor(dom) {
        super(dom);
    }
    registerBunny(bunny) {
        this.bunny = bunny;
        bunny.registerStartStopBtn(this); // for messaging back
        this.dom.addEventListener("click", this.click.bind(this));
    }
    click() {
        const action = this.dom.innerHTML;
        switch (action) {
            case "start":
                this.bunny.act("start", this.ms);
                break;
            case "stop":
                this.bunny.act("stop");
                break;
            default:
                throw new Error(`Unknown action '${action}'`);
        }
    }
    setStartStop(value) {
        this.dom.innerHTML = value;
    }
    setMSSrc(mSSrc) {
        this.mSSrc = mSSrc;
    }
    get ms() {
        return Number(this.mSSrc.value);
    }
}
export { StartStopBtn };
