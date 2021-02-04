function convertToFormEncoded(data) {
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

export default convertToFormEncoded;
