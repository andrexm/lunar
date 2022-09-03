import { LunarHTMLElement } from "./LunarHTMLElement.js";

/**
 * Application
 */
 export const lunar = {
    /**
     * Selects an element
     */
    el(selector) {
        return (new LunarHTMLElement(selector));
    },

    /**
     * Selects all elements
     */
    all(selector) {
        return Array.from(document.querySelectorAll(selector));
    },
}
