import { LunarHTMLElement } from "./LunarHTMLElement.js";
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
                let hideableTarget = (new LunarHTMLElement(el.dataset.hidecontrols)).pure;
                let isHidden = hideableTarget.classList.contains('lunar-hidden')
                this.showElement(hideableTarget, isHidden);
            });

            // Tells that this element is loaded
            el.classList.add('l-shc');
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
            document.addEventListener('click', () => {
                if (el !== document.activeElement && !el.contains(document.activeElement) && !el.classList.contains('lunar-hidden')) {
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

            let mod = mods.find(item => item.name == el.getAttribute('mod'));
            if (!mod) return;
            el.innerHTML = mod.action(el, el.textContent);

            // Tells that the mods for this element are loaded
            el.classList.add('l-mod');
        });
        // Note: all the values inside an element are passed to a modifier as a string]
    }
}
