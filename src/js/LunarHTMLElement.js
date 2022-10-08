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
     * @returns string
     */
    get id() {
        return this.pure.id;
    }

    /**
     * @param {string} markup 
     * @returns string|void
     */
    html(markup = null) {
        if (!markup) return this.pure.innerHTML;
        this.pure.innerHTML = markup;
    }

    /**
     * @param {string} content 
     * @returns string|void
     */
    text(content = null) {
        if (!content) return this.pure.textContent;
        this.pure.textContent = content;
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

    /**
     * @returns number
     */
    get width() {
        return this.pure.clientWidth;
    }

    /**
     * @returns number
     */
    get height() {
        return this.pure.clientHeight;
    }


    // RELATED NODES --------------------------------------

    /**
     * Returns the parent of order n of the element
     * @param {int} order 
     * @returns Element
     */
    parent(order = 1) {
        let parent = this.pure;
        do {
            parent = parent.parentElement;
            order--;
        } while (order > 0);
        return lunar.el(parent);
    }

    /**
     * @returns NodeList
     */
    get nodes() {
        return this.pure.childNodes;
    }

    /**
     * @returns HTMLCollection
     */
    get children() {
        return this.pure.children;
    }

    /**
     * The first element child
     * @returns LunarHTMLElement
     */
    get firstEl() {
        return lunar.el(this.pure.firstElementChild);
    }

    /**
     * The last element child
     * @returns LunarHTMLElement
     */
    get lastEl() {
        return lunar.el(this.pure.lastElementChild);
    }

    /**
     * The first child
     * @returns LunarHTMLElement
     */
    get firstNode() {
        return this.pure.firstChild;
    }

    /**
     * The last child
     * @returns LunarHTMLElement
     */
    get lastNode() {
        return this.pure.lastChild;
    }

    /**
     * Returns a node sibling before or after the element
     * @param {number} order 
     * @returns LunarHTMLElement|Node
     */
    sibling(order = 1) {
        let el = this.pure;

        if (order > 0) do {
            el = el.nextSibling;
            order--;
        } while (order > 0);

        if (order < 0) do {
            el = el.previousSibling;
            order++;
        } while (order < 0);

        return (el instanceof Element) ? lunar.el(el) : el;
    }

    /**
     * Inserts one or multiple elements or nodes after this element
     * @param {LunarHTMLElement[]|Node[]} arguments 
     */
    after() {
        Array.from(arguments).forEach(el => {
            el = lunar.isPure(el) ? el : el.pure;
            this.pure.after(el);
        });
        return this;
    }

    /**
     * Inserts one or multiple elements or nodes before this element
     * @param {LunarHTMLElement[]|Node[]} arguments 
     */
    before() {
        Array.from(arguments).forEach(el => {
            el = lunar.isPure(el) ? el : el.pure;
            this.pure.before(el);
        });
        return this;
    }

    /**
     * Inserts a set of Node objects after the last child of this element
     * @returns LunarHTMLElement
     */
    append() {
        Array.from(arguments).forEach(el => {
            el = lunar.isPure(el) ? el : el.pure;
            this.pure.append(el);
        });
        return this;
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