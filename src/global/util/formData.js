/**
 * Converts object to FormData string.
 * @param {Object.<string, (Number|String|Boolean)>} data - Object containing the key-value pair to convert into form-urlencoded.
 * Key should be the same as required in the url.
 * @returns Form URL Encoded string
 */

function encodeToFormData(data = {}) {
    return Object.keys(data)
        .map(function (keyname) {
            return (
                encodeURIComponent(keyname) +
                '=' +
                encodeURIComponent(data[keyname])
            );
        })
        .join('&');
}

export default encodeToFormData;
export { encodeToFormData };
