export class LnLazy extends HTMLElement {
	#isLoaded;
    #pos; // the element y position
    loaded = () => {}; // closure to be executed after loading the component

	constructor() {
		super();
        this.style.paddingTop = "400px";
        this.#isLoaded = false;
        this.#pos = this.getBoundingClientRect().top + window.scrollY;
        this.start(window.innerHeight >= this.getBoundingClientRect().top);
	}

    /**
     * @param {boolean} visible element is visible when page loads
     * @returns boolean
     */
    #render(visible) {
        if (this.#isLoaded) return false;
        
        if (window.scrollY + window.innerHeight + Number(this.getAttribute('dis') ?? 400) >= this.#pos || visible) {
            let src = this.getAttribute('src');
            lunar.ajax({
                method: 'GET',
                url: src,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                success: data => {
                    this.innerHTML = data;
                    this.#isLoaded = true;
                    lunar.loadHelpers(); // the component can use lunar
                    this.loaded(); // run custom scripts for the component
                },
                error: () => {
                    console.error('The component ' + src + ' cannot be #isLoaded.');
                    this.#isLoaded = true;
                }
            }).send();
            this.style.paddingTop = "0px";
        }
        return false;
    }

	/**
	 * Loads the content
	 */
	start(visible) {
        if (visible) {
            this.#render(visible);
            return false;
        }
		document.addEventListener('scroll', () => {
            this.#render(visible);
        });
	}
}