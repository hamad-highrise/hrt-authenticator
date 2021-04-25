const errorName = Object.freeze({
    DB: 'DB_ERROR',
    SAM: 'SAM_ERROR',
    TOKEN: 'TOKEN_ERROR',
    NATIVE: 'NATIVE_MODULE_ERROR',
    NETWORK: 'NETWORK_ERROR'
});

const defaultMessages = Object.freeze({
    DB: 'Not able to get account from storage!',
    SAM: 'Please contact SAM Support!',
    TOKEN: 'Device may have been removed manually!',
    NATIVE: 'Device is behaving unexpectedly!',
    NETWORK: 'Not able to reach server!'
});

export default { name: errorName, defaultMessages };
