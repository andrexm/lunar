import { LunarHTMLElement } from "./LunarHTMLElement.js";

/**
 * A collection of methods to be executed after instantiate the Lunar class
 */
export const helpers = {
    /**
     * Elements that can be hidded
     */
     hideableElementsStart() {
        this.hideable = Array.from(document.querySelectorAll('[hideable]'));
        this.hideable.forEach(el => {
            el.classList.add('lunar-hidden');
        });
    },

    /**
     * Elements that controls hideable elements
     */
    hideControllersStart() {
        this.hideControllers = Array.from(document.querySelectorAll('[data-hidecontrols]'));
 
        this.hideControllers.forEach(el => {
            el.addEventListener('click', () => {
                let hideableTarget = (new LunarHTMLElement(el.dataset.hidecontrols)).pure;
                hideableTarget.classList.toggle('lunar-hidden');
            });
        });
    },
}
