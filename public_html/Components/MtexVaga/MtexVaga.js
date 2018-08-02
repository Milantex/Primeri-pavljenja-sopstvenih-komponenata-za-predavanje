const MtexVagaLocalDocument = document.currentScript.ownerDocument;

class MtexVaga extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});

        const sablon = MtexVagaLocalDocument.querySelector('#mtex-vaga-template');
        this.shadowRoot.appendChild(sablon.content.cloneNode(true));

        this.redraw();
    }

    get left() {
        return Math.max(0, this.getAttribute('left'));
    }

    set left(newValue) {
        this.setAttribute('left', Math.max(newValue, 0));
    }

    get right() {
        return Math.max(0, this.getAttribute('right'));
    }

    set right(newValue) {
        this.setAttribute('right', Math.max(newValue, 0));
    }

    redraw() {
        if (!this.shadowRoot) {
            return;
        }

        const maks  = Math.max(this.left, this.right);
        const levo  = Number(165 - 165 * this.left / maks).toFixed(0);
        const desno = Number(165 - 165 * this.right / maks).toFixed(0);

        this.shadowRoot.querySelector('.left-side').style.top  = levo  + 'px';
        this.shadowRoot.querySelector('.right-side').style.top = desno + 'px';

        this.shadowRoot.querySelector('.left-label').innerText  = this.left  + ' kg';
        this.shadowRoot.querySelector('.right-label').innerText = this.right + ' kg';
    }

    static get observedAttributes() {
        return ['left', 'right'];
    }

    attributeChangedCallback() {
        this.redraw();
    }
}

window.customElements.define('mtex-vaga', MtexVaga);
