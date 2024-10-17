/**
 * A map that compares keys by their value (deep equality), rather than by reference.
 * This class uses JSON serialization to compare the structure of objects as keys.
 * Therefore, keys must not contain undefined or functions.
 * 
 * @template K - The type of keys, which should be serializable by JSON.
 * @template V - The type of values stored in the map.
 */
class ValueMap<K, V> {
    private map: Map<string, V>;

    constructor() {
        this.map = new Map<string, V>();
    }

    private getKey(key: K): string {
        return JSON.stringify(key);
    }

    set(key: K, value: V): this {
        const keyString = this.getKey(key);
        this.map.set(keyString, value);
        return this;
    }

    get(key: K): V | undefined {
        const keyString = this.getKey(key);
        return this.map.get(keyString);
    }

    has(key: K): boolean {
        const keyString = this.getKey(key);
        return this.map.has(keyString);
    }

    delete(key: K): boolean {
        const keyString = this.getKey(key);
        return this.map.delete(keyString);
    }

    clear(): void {
        this.map.clear();
    }

    forEach(callback: (value: V, key: K, map: ValueMap<K, V>) => void): void {
        this.map.forEach((value, keyString) => {
            const key = JSON.parse(keyString) as K;
            callback(value, key, this);
        });
    }

    keys(): K[] {
        return Array.from(this.map.keys()).map(keyString => JSON.parse(keyString) as K);
    }

    values(): V[] {
        return Array.from(this.map.values());
    }

    entries(): [K, V][] {
        return Array.from(this.map.entries()).map(([keyString, value]) =>
            [JSON.parse(keyString) as K, value]);
    }

    get size(): number {
        return this.map.size;
    }
}
