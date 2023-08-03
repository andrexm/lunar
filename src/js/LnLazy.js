export class LnLazy extends HTMLElement {
	#loaded = false;

	constructor() {
		super();
		this.start();
        this.style.paddingTop = "400px";
	}

	/**
	 * Loads the content
	 */
	start() {
		let pos = this.getBoundingClientRect().top + window.scrollY;

		document.addEventListener('scroll', () => {
            if (this.#loaded) return false;

            if (window.scrollY + window.innerHeight + Number(this.getAttribute('dis') ?? 400) >= pos) {
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
                    },
                    error: () => {
                        console.error('The component ' + src + ' cannot be loaded.');
                        this.#loaded = true;
                    }
                }).send();
                this.style.paddingTop = "0px";
            }
        });
	}
}