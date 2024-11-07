export function deepIncludes<T>(array: Array<T>, value: T) {
    return array.some(item => JSON.stringify(item) == JSON.stringify(value));
}