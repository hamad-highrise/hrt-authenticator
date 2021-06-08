const ACCOUNT_METHODS = Object.freeze({
    FINGERPRINT: 'FINGERPRINT_METHOD',
    USER_PRESENCE: 'USER_PRESENCE_METHOD',
    TOTP: 'TOTP_METHOD',
    FACE_ID: 'FACE_ID_METHOD'
});

const ERROR_MESSAGES = Object.freeze({
    INVALID_QR: 'INVALID_QR_CODE',
    DETAILS_FETCH: 'ERROR_FETCHING_DETAILS',
    TOKEN_FETCH: 'ERROR_FETCHING_TOKEN',
    USER_PRESENCE_REGISTER: 'ERROR_REGISTERING_USER_PRESENCE',
    TOTP_REGISTER: 'ERROR_REGISTERING_TOTP',
    FINGERPRINT_REGISTER: 'ERROR_REGISTERING_FINGERPRINT',
    DUPLICATE_ACCOUNT: 'DUPLICATED_ACCOUNT_ERROR'
});

const APP_INFO = Object.freeze({
    VERSION: '1.0.0',
    APPLICATION_ID: 'com.highrise.verify'
});

const ACCOUNT_TYPES = Object.freeze({
    SAM: 'SAM',
    TOTP: 'TOTP'
});

const KEY_ALIAS = Object.freeze({
    SECRET: 'SECRET12',
    TOKEN: 'TOKEN12'
});

const SAM_ERROR_CODE = Object.freeze({
    AUTH_GRANT_NOT_EXIST: 'FBTOAU211E'
});

const productFlavors = Object.freeze({
    HIGHRISE: 'highrise',
    ALFALAH: 'alfalah',
    FIDELITY: 'fidelity'
});

export default {
    ACCOUNT_METHODS,
    ERROR_MESSAGES,
    APP_INFO,
    ACCOUNT_TYPES,
    KEY_ALIAS,
    SAM_ERROR_CODE,
    productFlavors
};
export {
    ACCOUNT_METHODS,
    ERROR_MESSAGES,
    APP_INFO,
    ACCOUNT_TYPES,
    KEY_ALIAS,
    SAM_ERROR_CODE,
    productFlavors
};
