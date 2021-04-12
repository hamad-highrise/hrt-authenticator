const name = Object.freeze({
    DB: 'DB_ERROR',
    SAM: 'SAM_ERROR',
    TOKEN: 'TOKEN_ERROR',
    NATIVE: 'NATIVE_MODULE_ERROR'
});

const messages = Object.freeze({
    token: tokenMessages
});

const tokenMessages = Object.freeze({});

export default { name, messages };
