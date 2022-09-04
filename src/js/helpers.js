import { LunarHTMLElement } from "./LunarHTMLElement.js";

/**
 * A collection of methods to be executed after instantiate the Lunar class
 */
export const helpers = {
    /**
     * Shows or hides an HTML element
     * @param {HTMLElement} element 
     * @param {boolean} show 
     */
    showElement(element, show = true) {
        element.style.transition = "0.3s";
        
        if (show) {
            element.classList.remove("lunar-hidden");
            setTimeout(() => {
                element.classList.remove("lunar-opacity-0");
            }, 0);
        } else {
            element.classList.add("lunar-opacity-0");
            element.style.transition = "0.3s";
            setTimeout(() => element.classList.add("lunar-hidden"), 300);
        }
    },

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
                //hideableTarget.classList.toggle('lunar-hidden');
                let isHidden = hideableTarget.classList.contains('lunar-hidden')
                this.showElement(hideableTarget, isHidden);
            });
        });
    },
}
