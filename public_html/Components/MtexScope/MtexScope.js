const MtexScopeLocalDocument = document.currentScript.ownerDocument;

class MtexScope extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});

        const sablon = MtexScopeLocalDocument.querySelector('#mtex-scope-template');
        this.shadowRoot.appendChild(sablon.content.cloneNode(true));

        window.requestAnimationFrame(() => this.redraw());
    }

    get frequency() {
        return Math.max(1, this.getAttribute('frequency'));
    }

    set frequency(newValue) {
        this.setAttribute('frequency', Math.max(newValue, 1));
    }

    redraw() {
        if (!this.shadowRoot) {
            return;
        }

        const timestamp = new Date().getTime() / 10.;

        const canvas = this.shadowRoot.querySelector('canvas');
        let g = canvas.getContext("2d");

        g.fillStyle = '#116622';
        g.fillRect(0, 0, canvas.width, canvas.height);

        g.lineWidth = 2;
        g.lineCap = 'round';
        g.strokeStyle = '#1fe827';

        g.beginPath();
        let start = 15+(canvas.height-30)/2. + ((canvas.height-30)/2.) * Math.sin(this.frequency * ( timestamp ) / 500.);
        g.moveTo(0, start);

        for (let i=0; i<canvas.width; i++) {
            g.lineTo(i, 15+(canvas.height-30)/2. + ((canvas.height-30)/2.) * Math.sin(this.frequency * ( i + timestamp ) / 500.));
        }

        g.stroke();

        window.requestAnimationFrame(() => this.redraw());
    }
}

window.customElements.define('mtex-scope', MtexScope);
