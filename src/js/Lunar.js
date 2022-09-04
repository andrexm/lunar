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
        helpers.hideControllersStart();
        helpers.hideableElementsStart();
        helpers.hideOnLeave();
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
}
