import { Component } from "./component.mjs";
class JumpBtn extends Component {
    bunny;
    constructor(dom) {
        super(dom);
    }
    registerBunny(bunny) {
        this.bunny = bunny;
        // TODO make the following re-entrant
        this.dom.addEventListener("click", this.jump.bind(this));
    }
    jump() {
        this.bunny.act("jump", this.posX, this.posY);
    }
    setPosXSrc(posXSrc) {
        this.posXSrc = posXSrc;
    }
    get posX() {
        return Number(this.posXSrc.value);
    }
    setPosYSrc(posYSrc) {
        this.posYSrc = posYSrc;
    }
    get posY() {
        return Number(this.posYSrc.value);
    }
}
export { JumpBtn };
