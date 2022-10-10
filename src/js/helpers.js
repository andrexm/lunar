import { LunarElement } from "./LunarElement.js";
import modifiers from "./modifiers.js";

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
            // Verify if this element is loaded
            if (el.classList.contains('l-hes')) return;

            el.classList.add('lunar-hidden');
            el.classList.add('lunar-opacity-0');

            // Tells that this element is loaded
            el.classList.add('l-hes');
        });
    },

    /**
     * Elements that controls hideable elements
     */
    hideControllersStart() {
        this.hideControllers = Array.from(document.querySelectorAll('[data-hidecontrols]'));
 
        this.hideControllers.forEach(el => {
            // Verify if this element is loaded
            if (el.classList.contains('l-shc')) return;

            el.addEventListener('click', () => {
                let hideableTarget = (new LunarElement(el.dataset.hidecontrols)).pure;
                let isHidden = hideableTarget.classList.contains('lunar-hidden');
                this.showElement(hideableTarget, isHidden);

                // Closes the hideableTarget element after clicking outside it and outside the 'el'
                this.clickOutside(hideableTarget, e => {
                    if (e.target !== el) this.showElement(hideableTarget, false);
                });
            });

            // Tells that this element is loaded
            el.classList.add('l-shc');
        });
    },

    /**
     * Executes a function (closure) everytime we click outside the specified element
     * @param {Element} element The element to be verified
     * @param {object} closure The function to be executed
     * @returns void
     */
    clickOutside(element, closure) {
        // Avoid executing the same listener more than one time
        if (element.classList.contains('rcoutside')) return;
        element.classList.add('rcoutside');

        document.addEventListener('click', e => {
            if (!element.contains(e.target) && element !== e.target) {
                closure(e);
            }
        });
    },

    /**
     * Hides all the elements after mouseleave event
     */
    hideOnLeave() {
        let toHide = Array.from(document.querySelectorAll('[hideOnMouseLeave]'));

        toHide.forEach(el => {
            // Verify if this element is loaded
            if (el.classList.contains('l-shol')) return;

            el.setAttribute('tabindex', '0');
            el.addEventListener('mouseleave', () => {
                this.showElement(el, false);
            });

            // Tells that this element is loaded
            el.classList.add('l-shol');
        });
    },

    /**
     * Hides an element after a click outside it
     */
    hideOnClickOutside() {
        let toHide = Array.from(document.querySelectorAll('[hideOnClickOutside]'));
        
        toHide.forEach(el => {
            // Verify if this element is loaded
            if (el.classList.contains('l-hoco')) return;

            el.setAttribute('tabindex', '0');
            document.addEventListener('click', e => {
                if (!el.parentNode.contains(e.target) && el !== document.activeElement && !el.contains(document.activeElement) && !el.classList.contains('lunar-hidden')) {
                    this.showElement(el, false);
                }
            });

            // Tells that this element is loaded
            el.classList.add('l-hoco');
        });
    },

    /**
     * Loads links that are inside the [link] attribute
     */
    dynamicLinks() {
        let links = Array.from(document.querySelectorAll('[link]'));
        links.forEach(el => {
            // Verify if this element is loaded
            if (el.classList.contains('l-dl')) return;
            
            el.style.cursor = 'pointer';
            el.addEventListener('click', () => {
                location.href = el.getAttribute('link');
            });

            // Tells that this element is loaded
            el.classList.add('l-dl');
        });
    },

    /**
     * Loads all the modifiers
     */
    loadModifiers(customMods) {
        let elWithMods = Array.from(document.querySelectorAll('[mod]'));
        let mods = customMods ?? modifiers;

        elWithMods.forEach(el => {
            // Verify if the mods of this element are loaded
            if (el.classList.contains('l-mod')) return;

            let params = el.getAttribute('mod').split('|');
            params.splice(0, 1);
            
            let mod = mods.find(item => item.name == el.getAttribute('mod').split('|')[0]);
            if (!mod) return;
            el.innerHTML = mod.action(el, el.textContent, params);

            // Tells that the mods for this element are loaded
            el.classList.add('l-mod');
        });
        // Note: all the values inside an element are passed to a modifier as a string]
    }
}
