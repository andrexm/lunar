export class Ajax {
    #httpRequest;
    #loading = false;
    #method;
    #opts = {
        method: "GET",
        url: '',
        headers: {},
        data: {},
        beforeSend: () => {},
        success: () => {},
        error: () => {}
    }

    /**
     * Constructor
     * @param {Opts} opts 
     */
    constructor(opts) {
        this.#verify(opts);

        this.#httpRequest = new XMLHttpRequest();
        this.#opts = opts;

        ('method' in this.#opts) ? this.#method = this.#opts.method.toUpperCase()
            : this.#method = 'GET';
    }

    /**
     * Sending the request
     */
    send() {
        this.#onreadystatechange();
        this.#httpRequest.open(this.#method, this.#opts.url); // Open the request
        this.#headers();
        this.#httpRequest.send(JSON.stringify(this.#opts.data) || null); // Send
    }

    /**
     * XMLHttpRequest onreadystatechange
     */
    #onreadystatechange() {
        this.#httpRequest.onreadystatechange = () => {
            if (!this.#loading) {
                this.#loading = true;
                if ('beforeSend' in this.#opts) this.#opts.beforeSend(this.#httpRequest);
            }
    
            if (this.#httpRequest.readyState === 4) {
                // Request successful
                if (this.#httpRequest.status === 200) {
                    if ('success' in this.#opts) {
                        return this.#opts.success(
                            this.#httpRequest.response,
                            this.#httpRequest.status,
                            this.#httpRequest
                        );
                    }
                }
    
                // Error
                if ('error' in this.#opts) return this.#opts.error();
            }
        }
    }

    /**
     * Set headers
     */
    #headers() {
        if ('headers' in this.#opts) {
            let headerKeys = Object.keys(this.#opts.headers);
            headerKeys.forEach(key => {
                this.#httpRequest.setRequestHeader(key, this.#opts.headers[key]);
            });
        }
    }

    /**
     * @param {Opts} opts 
     * @returns boolean
     */
    #verify(opts) {
        if (!('url' in opts)) console.error("Error: please, set an URL.");
        return false;
    }
}
