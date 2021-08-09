const errorName = Object.freeze({
    DB: 'DB_ERROR',
    SAM: 'SAM_ERROR',
    TOKEN: 'TOKEN_ERROR',
    NATIVE: 'NATIVE_MODULE_ERROR',
    NETWORK: 'NETWORK_ERROR',
    CERTS: 'CERTS_ERROR'
});

const defaultMessages = Object.freeze({
    DB: 'Not able to get account data from storage!',
    SAM: 'Please contact SAM Support!',
    TOKEN: 'Device may have been removed manually!',
    NATIVE: 'Device is behaving unexpectedly!',
    NETWORK: 'Not able to reach server!',
    CERTS: 'SSL Certificates Error!'
});

export default { name: errorName, defaultMessages };
