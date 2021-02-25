function encodeFormData(data) {
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

export default encodeFormData;
export { encodeFormData };
