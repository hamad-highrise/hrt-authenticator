import 'react-native-url-polyfill/auto';

/**
 * @module Parser
 */

/**
 * Function parses the otpauth URI and returns an object containing
 * @param {string} uri - OTP Auth URI
 * @returns {{type:string, label:string, query: {}}}
 */

function parseOTPAuthUri(uri) {
    if (typeof uri !== 'string' || uri.length < 7) {
        return null;
    }
    const regex = /otpauth:\/\/([A-Za-z]+)\/([^?]+)\??(.*)?/i;
    const parts = regex.exec(uri);
    if (!parts || parts.length < 3) {
        return null;
    }
    const [fullURI, type, fullLabel] = parts;

    if (!type || !fullLabel) {
        return null;
    }

    const decodedLabel = decodeURIComponent(fullLabel);
    const labelParts = decodedLabel.split(/: ?/);
    const label =
        labelParts && labelParts.length === 2
            ? { issuer: labelParts[0], account: labelParts[1] }
            : { issuer: '', account: decodedLabel };
    const queryString = parts[3] ? new URLSearchParams(parts[3]) : [];
    const query = [...queryString].reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
    return { type: type.toLowerCase(), label, query };
}

/**
 * Evaluates if a string is valid Json or not and returns an Object
 * @param {String} str - string to be evaluated
 * @returns {{valid:boolean, value:{}}}
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

export default { tryJSONParser, uriParser: parseOTPAuthUri };
