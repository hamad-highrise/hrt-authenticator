/**
 * Evaluates if a string is valid Json or not and returns an Object
 * @param {String} str - string to be evaluated
 * @returns Object with two keys {valid, value}
 */

const tryJSONParser = (str) => {
    if (typeof str !== 'string') return { valid: false, value: str };
    try {
        const value = JSON.parse(str);
        return { valid: true, value };
    } catch (error) {
        return { valid: false, value: str };
    }
};

export { default as Biometrics } from './biometrics';
export { default as uRIParser } from './ui-parser';
export { tryJSONParser };
