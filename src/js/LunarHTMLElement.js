/**
 * Element class
 */
 export class LunarHTMLElement {
    // The HTML Element
    pure;

    /**
     * Constructor
     * @param {string} selector 
     */
    constructor(selector, element = false) {
        this.pure = !element ? document.querySelector(selector) : element;
    }

    /**
     * Returns the type of the HTML Element
     * @returns string
     */
    type() {
        return this.pure.nodeName.toLowerCase();
    }

    /**
     * Returns the parent of order n of the element
     * @param {int} order 
     * @returns 
     */
    parent(order = 1) {
        let parent = this.pure;
        do {
            parent = parent.parentElement;
            order--;
        } while (order > 0);
        return parent;
    }

    /**
     * Executes a function on the specified event
     * @param {string} type
     * @param {Object} closure
     */
    event(type, closure) {
        this.pure.addEventListener(type, target => {
            closure(target);
        });
    }
}