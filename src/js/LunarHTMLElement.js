/**
 * Element class
 */
 export class LunarHTMLElement {
    // The HTML Element
    pure;
    currentChildToAdd;
    currentChildTextToAdd;
    currentChildHTMLContentToAdd;
    type;

    /**
     * Constructor
     * @param {string} selector 
     */
    constructor(selector) {
        this.pure = document.querySelector(selector);
        this.type = this.pure.nodeName.toLowerCase();
    }

    /**
     * Returns the parent of order [order] of the element
     * @param {int} order 
     * @returns 
     */
    parent(order = 1) {
        let parent = this.pure;
        do {
            parent = parent.parentElement;
            console.log(parent)
            order--;
        } while (order > 0);
        return parent;
    }
}