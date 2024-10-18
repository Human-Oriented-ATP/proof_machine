/**
 * A map that compares keys by their value (deep equality), rather than by reference.
 * This class uses JSON serialization to compare the structure of objects as keys.
 * Therefore, keys must not contain undefined or functions.
 * 
 * @template K - The type of keys, which should be serializable by JSON.
 * @template V - The type of values stored in the map.
 */
export class ValueMap<K, V> {
    private data: Map<string, V>;

    constructor(entries?: [K, V][]);
    constructor(otherMap?: ValueMap<K, V>);

    constructor(arg?: [K, V][] | ValueMap<K, V>) {
        this.data = new Map<string, V>();

        if (Array.isArray(arg)) {
            for (const [key, value] of arg) {
                this.set(key, value);
            }
        }

        else if (arg instanceof ValueMap) {
            arg.forEach((value, key) => {
                this.set(key, value);
            });
        }
    }

    private getKey(key: K): string {
        return JSON.stringify(key);
    }

    set(key: K, value: V): this {
        const keyString = this.getKey(key);
        this.data.set(keyString, value);
        return this;
    }

    get(key: K): V | undefined {
        const keyString = this.getKey(key);
        return this.data.get(keyString);
    }

    has(key: K): boolean {
        const keyString = this.getKey(key);
        return this.data.has(keyString);
    }

    delete(key: K): boolean {
        const keyString = this.getKey(key);
        return this.data.delete(keyString);
    }

    clear(): void {
        this.data.clear();
    }

    forEach(callback: (value: V, key: K, map: ValueMap<K, V>) => void): void {
        this.data.forEach((value, keyString) => {
            const key = JSON.parse(keyString) as K;
            callback(value, key, this);
        });
    }

    keys(): K[] {
        return Array.from(this.data.keys()).map(keyString => JSON.parse(keyString) as K);
    }

    values(): V[] {
        return Array.from(this.data.values());
    }

    entries(): [K, V][] {
        return Array.from(this.data.entries()).map(([keyString, value]) =>
            [JSON.parse(keyString) as K, value]);
    }

    map<U>(callback: (value: V, key: K) => U): ValueMap<K, U> {
        const newMap = new ValueMap<K, U>();
        this.forEach((value, key) => {
            newMap.set(key, callback(value, key));
        });
        return newMap;
    }

    flatMap<U>(callback: (value: V, key: K) => [K, U][]): ValueMap<K, U> {
        const newMap = new ValueMap<K, U>();
        this.forEach((value, key) => {
            const newEntries = callback(value, key);
            newEntries.forEach(([newKey, newValue]) => {
                newMap.set(newKey, newValue);
            });
        });
        return newMap;
    }

    get size(): number {
        return this.data.size;
    }
}
