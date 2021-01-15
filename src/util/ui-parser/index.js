/**
 * Function parses the otpauth URI and returns an object containing
 * @param {String} uri - OTP Auth URI
 * @returns Object
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

module.exports = parseOTPAuthUri;
