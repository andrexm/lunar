import { LunarHTMLElement } from "./LunarHTMLElement.js";
import { helpers } from "./helpers.js";

/**
 * Lunar
 */
export class Lunar {
    /**
     * Constructor
     */
    constructor() {
        // Loading helpers
        this.loadHelpers();
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
                (new LunarHTMLElement(false, el))
            ];
        });

        return lunarElements;
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
     * Loads the helpers
     */
    loadHelpers() {
        helpers.hideControllersStart();
        helpers.hideableElementsStart();
        helpers.hideOnLeave();
        helpers.dynamicLinks();
        helpers.hideOnClickOutside();
    }
}
