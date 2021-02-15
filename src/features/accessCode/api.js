import getInsecureFetch from '../addAccount/RNFetch';

async function getPendingTransactions(endpoint, token) {
    const insecureFetch = getInsecureFetch();
    try {
        const result = await insecureFetch('GET', endpoint, {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        });
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function refreshToken(endpoint, refreshToken) {
    const insecureFetch = getInsecureFetch();
    const body = {
        client_id: 'AuthenticatorClient',
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        scope: 'mmfaAuthn'
    };
    const encoded = convertToFormEncoded(body);
    try {
        const result = await insecureFetch(
            'POST',
            endpoint,
            {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            encoded
        );
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export { getPendingTransactions, refreshToken };

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
