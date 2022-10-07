/**
 * Element class
 */
 export class LunarHTMLElement {
    // The HTML Element
    pure;

    /**
     * Constructor
     * @param {string|object} selector 
     */
    constructor(selector) {
        this.pure = (typeof selector !== "object") ? document.querySelector(selector) : selector;
    }


    // THE ELEMENT -----------------------------------

    /**
     * Returns the type of the HTML Element
     * @returns string
     */
    get type() {
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

    // CLASSES -----------------------------------------

    /**
     * Returns true if the element contains the specified class
     * @param {string} name the class name
     * @returns bool
     */
    hasClass(name) {
        return this.pure.classList.contains(name);
    }

    /**
     * Adds a class to the element
     * @param {string} name the class name
     * @returns LunarHTMLElement
     */
    addClass(name) {
        this.pure.classList.add(name);
        return this;
    }

    /**
     * Removes a class from the element
     * @param {string} name the class name
     * @returns LunarHTMLElement
     */
    removeClass(name) {
        this.pure.classList.remove(name);
        return this;
    }

    /**
     * Toggles a class from the element
     * @param {string} name the class name
     * @returns LunarHTMLElement
     */
    toggleClass(name) {
        this.pure.classList.toggle(name);
        return this;
    }

    /**
     * @returns DOMTokenList
     */
    get classList() {
        return this.pure.classList;
    }
}