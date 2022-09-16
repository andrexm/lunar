/**
 * Manages data saved in the localStorage
 */
export class Store {
    state = {};
    storeName = 'lunarStore';

    /**
     * Constructor
     */
    constructor() {
        this.startState();
    }

    /**
     * Gets all the data from the localStorage when the application starts
     */
    startState() {
        let data = localStorage.getItem(this.storeName) ?? '{}';
        data = JSON.parse(data);
        this.state = data;
    }

    /**
     * Adds or updates a value in the state
     * @param {string} key 
     * @param {any} value 
     */
    save(key, value) {
        this.state[key] = value;
        localStorage.setItem(this.storeName, JSON.stringify(this.state));
    }

    /**
     * Deletes an item from the state
     * @param {string} key 
     */
    remove(key) {
        delete this.state[key];
        localStorage.setItem(this.storeName, JSON.stringify(this.state));
    }

    /**
     * Returns an element from the state
     * @param {string} key 
     * @returns any
     */
    get(key) {
        return this.state[key];
    }
}
