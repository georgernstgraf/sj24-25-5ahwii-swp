class HashSet {
    constructor() {
        this.items = {};
    }

    add(item) {
        const key = JSON.stringify(item);
        this.items[key] = item;
    }

    remove(item) {
        const key = JSON.stringify(item);
        delete this.items[key];
    }

    contains(item) {
        const key = JSON.stringify(item);
        return this.items.hasOwnProperty(key);
    }

    size() {
        return Object.keys(this.items).length;
    }

    toArray() {
        return Object.values(this.items);
    }
}
export { HashSet };
