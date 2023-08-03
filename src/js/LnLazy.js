export class LnLazy extends HTMLElement {
	#loaded;
    #pos;

	constructor() {
		super();
        this.style.paddingTop = "400px";
        this.#loaded = false;
        this.#pos = this.getBoundingClientRect().top + window.scrollY;
        this.start(window.innerHeight >= this.getBoundingClientRect().top);
	}

    /**
     * @param {boolean} visible element is visible when page loads
     * @returns boolean
     */
    #render(visible) {
        if (this.#loaded) return false;
        
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
                    this.#loaded = true;
                    lunar.loadHelpers();
                },
                error: () => {
                    console.error('The component ' + src + ' cannot be #loaded.');
                    this.#loaded = true;
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