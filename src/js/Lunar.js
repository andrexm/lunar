import { LunarElement } from "./LunarElement.js";
import { helpers } from "./helpers.js";
import { Store } from "./store.js";
import { Ajax } from "./ajax.js";

/**
 * Lunar
 */
export class Lunar {
    // All the custom modifiers
    modifiers = [];

    // The store object
    store;

    // The components avaiable
    custom = [];

    /**
     * Constructor
     */
    constructor() {
        // Initiates the storage
        this.store = new Store;

        // Loading helpers
        this.loadHelpers();

        // Ends the page loader
        window.addEventListener('load', () => {
            let loader = lunar.el('ln-back-loader');
            loader ? loader.toggle() : '';
        });
    }

    /**
     * Returns if the object is a 'pure element' or an instance of the LunarElement class
     * @param {object} element 
     * @returns bool
     */
    isPure(element) {
        return !(element instanceof LunarElement);
    }

    /**
     * A loop where the closure object receives the pure element or node in each iteration
     * @param {LunarElement[]|Node[]} elements 
     * @param {*} closure 
     */
    iterate(elements, closure) {
        elements.forEach(el => {
            el = lunar.isPure(el) ? el : el.pure;
            closure(el);
        });
    }

    /**
     * Selects an element
     */
     el(selector) {
        let e = (new LunarElement(selector));
        if (!e.pure) return null;
        return e;
    }

    /**
     * Selects all elements
     */
     all(selector, pure = false) {
        let elements = Array.from(document.querySelectorAll(selector));

        // Returns all the elements
        if (pure) return elements;

        // Converts all the elements to LunarElement
        let lunarElements = [];
        elements.forEach(el => {
            lunarElements = [
                ...lunarElements,
                (new LunarElement(el))
            ];
        });

        return lunarElements;
    }

    /**
     * Creates a new element
     * @param {string} type the element type
     * @returns LunarElement
     */
    create(type) {
        let el = document.createElement(type);
        return this.el(el);
    }

    /**
     * Hides an element
     * @param {HTMLElement|LunarElement} el 
     */
    hide(el) {
        if (!this.isPure(el)) return helpers.showElement(el.pure, false);
        return helpers.showElement(el, false);
    }

    /**
     * Shows an element
     * @param {Hides an element} el 
     */
    show(el) {
        if (!this.isPure(el)) return helpers.showElement(el.pure);
        return helpers.showElement(el);
    }

    /**
     * The element to appears on the top of the visible area
     * @param {string} selector the element selector
     * @param {object} opts scrollIntoViewOptions
     * @returns LunarElement
     */
    appear(selector, opts = null) {
        return lunar.el(selector).appear(opts);
    }
    
    /**
     * Hides or shows an element
     * @param {Element} element 
     */
    toggle() {
        Array.from(arguments).forEach(element => {
            let el = this.isPure(element) ? element : element.pure;
        
            if (!el.classList.contains('lunar-hidden')) {
                this.hide(el);
            } else {
                this.show(el);
            }
        });
    }

    /**
     * Executes a closure on a click outside the given element
     * @param {object|LunarElement} element 
     * @param {object} closure 
     * @returns void
     */
    clickOut(element, closure) {
        helpers.clickOutside(this.isPure(element) ? element : element.pure, closure);
    }

    /**
     * Registers some components
     * @param {array} components 
     */
    register(components, append = true) {
        // Load the components
        components.forEach(component => {
            if (append) this.custom = [...this.custom, component]; // Register a new component in Lunar also

            let elements = Array.from(document.querySelectorAll(component.selector));
            elements.forEach(el => {
                el.innerHTML = component.html;
                
                // Loads its classes
                if (el.dataset.class) {
                    let svg = el.firstElementChild;
                    let classes = (el.dataset.class).split(' ');
                    classes.forEach(classToAdd => {
                        svg.classList.add(classToAdd)
                    });
                }
            });
        });

        // Reload the helpers
        this.loadHelpers();
    }

    /**
     * Loads and saves custom modifiers
     * @param {array} mods 
     */
    registerMods(mods) {
        this.modifiers = [...this.modifiers, ...mods];
        helpers.loadModifiers(this.modifiers);
    }

    /**
     * Loads the helpers
     */
    loadHelpers() {
        helpers.hideControllersStart();
        helpers.hideableElementsStart();
        helpers.hideOnLeave();
        helpers.dynamicLinks();
        helpers.hideOnClickOutside();
        helpers.loadModifiers();
        helpers.loadModifiers(this.modifiers);
    }

    /**
     * Reloads all the custom components
     */
    loadUtils() {
        this.register(this.custom, false);
    }

    /**
     * Ajax request method
     * @param {Opts} opts 
     * @returns Ajax
     */
    ajax(opts) {
        return (new Ajax(opts));
    }
}
