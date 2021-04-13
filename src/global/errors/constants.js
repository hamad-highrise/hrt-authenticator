const errorName = Object.freeze({
    DB: 'DB_ERROR',
    SAM: 'SAM_ERROR',
    TOKEN: 'TOKEN_ERROR',
    NATIVE: 'NATIVE_MODULE_ERROR',
    NETWORK: 'NETWORK_ERROR'
});

const defaultMessages = Object.freeze({
    DB: 'An error occurred while accessing storage.',
    SAM: 'Please contact SAM Support.',
    TOKEN:
        'Device may have been removed manually. Delete Locally and add again.',
    NATIVE: 'An error occurred while accessing device info.',
    NETWORK: 'Not able to reach server.'
});

export default { name: errorName, defaultMessages };
