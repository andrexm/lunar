import { LunarHTMLElement } from "./LunarHTMLElement.js";
import { helpers } from "./helpers.js";
import { Store } from "./store.js";

/**
 * Lunar
 */
export class Lunar {
    // All the custom modifiers
    modifiers = [];

    // The store object
    store;

    /**
     * Constructor
     */
    constructor() {
        // Initiates the storage
        this.store = new Store;

        // Loading helpers
        this.loadHelpers();
    }

    /**
     * Returns if the object is a 'pure element' or an instance of the LunarHTMLElement class
     * @param {object} element 
     * @returns bool
     */
    isPure(element) {
        return !(element instanceof LunarHTMLElement);
    }

    /**
     * Selects an element
     */
     el(selector) {
        return (new LunarHTMLElement(selector));
    }

    /**
     * Selects all elements
     */
     all(selector, pure = false) {
        let elements = Array.from(document.querySelectorAll(selector));

        // Returns all the elements
        if (pure) return elements;

        // Converts all the elements to LunarHTMLElement
        let lunarElements = [];
        elements.forEach(el => {
            lunarElements = [
                ...lunarElements,
                (new LunarHTMLElement(el))
            ];
        });

        return lunarElements;
    }

    /**
     * Hides an element
     * @param {HTMLElement|LunarHTMLElement} el 
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
     * @param {object|LunarHTMLElement} element 
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
    register(components) {
        // Load the components
        components.forEach(component => {
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
}
