// The loader element
export class Loader extends HTMLElement {
    static get observedAttributes() {
        return ['color'];
    }

    constructor() {
        super();
    }

    /**
     * @param {string} name 
     * @param {string} oldValue 
     * @param {string} newValue 
     */
    attributeChangedCallback(name, oldValue, newValue) {
        let colors = newValue.split(',');
        this.style.borderColor = colors[0] ?? "#f3f3f3";
        this.style.borderTopColor = colors[1] ?? "#3498db";
    }
}