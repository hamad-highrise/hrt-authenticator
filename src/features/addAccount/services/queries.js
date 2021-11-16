import { Database } from '../../../native-services';

/**
 * @module DBQueries
 */

/**
 * @typedef Account
 * @property {string} name - Account Name
 * @property {issuer} issuer - Service/Issuer name
 * @property {string} type - Account Type i.e. TOTP or SAM
 * @property {string} transactionEndpoint - Endpoint to check pending transactions in case of SAM
 * @property {string} enrollmentEndpoint - Endpoint to enroll/unenroll authentication methods
 * @property {boolean} ignoreSsl - Boolean indicating wheter to ignore SSL warnings or not
 */

/**
 *  To create create an account entry in the Database
 * @param {Account} account - Account Entry
 * @returns {Promise<{insertId: number}>}
 */

async function createAccountEntry({
    name,
    issuer,
    tenantId,
    type = 'TOTP',
    transactionEndpoint = null,
    enrollmentEndpoint = null,
    ignoreSsl = false
}) {
    const query = `INSERT INTO 
        accounts 
            (account_name, issuer, type, ignore_ssl, transaction_endpoint, enrollment_endpoint, tenant_id)
        VALUES
            (?, ?, ?, ?, ?, ?, ?);
        `;
    const params = [
        name,
        issuer,
        type,
        ignoreSsl,
        transactionEndpoint,
        enrollmentEndpoint,
        tenantId
    ];
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query, params);
        return { insertId: result.insertId };
    } catch (error) {
        throw error;
    }
}

/**
 * Check if account given account is unique or not
 * @param {{name:string, issuer:string}} param0
 * @returns {Promise<boolean>} Result
 */

async function isUnique({ name, issuer }) {
    const query = `SELECT account_id FROM accounts WHERE account_name = ? AND issuer = ?;`;
    const params = [name, issuer];
    const database = new Database();
    try {
        const result = await database.executeQuery(query, params);
        return Promise.resolve(result[0].rows.length === 0);
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * Create the Account Secret entry in database
 * @param {{secret:string, accId:number}} param0
 * @returns {Promise<void>}
 */

async function addSecret({ secret, accId }) {
    const query = `INSERT INTO secrets (secret, account_id) VALUES (?, ?);`;
    const params = [secret, accId];
    const database = new Database();
    try {
        await database.executeQuery(query, params);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * @typedef AuthMethod
 * @property {number} accId - Account Id Association
 * @property {string} method - Method Name
 * @property {string} keyHandle - Identifier of Private Key that is stored in Android KeyStore or iOS KeyChain
 */

/**
 *
 * @param {AuthMethod} param0
 * @returns {Promise<void>}
 */

async function addMethod({ accId, method, keyHandle }) {
    const query = `INSERT INTO methods (method_name, account_id, key_handle) VALUES (?,?,?);`;
    const params = [method, accId, keyHandle];
    const databse = new Database();
    try {
        await databse.executeQuery(query, params);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * @typedef Token
 * @property {string} token - Access Token
 * @property {string} refreshToken - Refresh Token
 * @property {string} tokenEndpoint - URL to request for refresh token
 * @property {string} expiry - Time in EPOCH Seconds for expiry
 * @property {number} accId - Account ID associated with the token
 */

/**
 * Create token entry in the database
 * @param {Token} param0
 * @returns {Promise<void>}
 */

async function saveToken({
    token,
    refreshToken,
    tokenEndpoint,
    expiry,
    accId
}) {
    const query = `INSERT INTO 
    tokens (token, refresh_token, expires_at, endpoint, account_id) 
    VALUES (?, ?, ?, ?, ?);`;
    const params = [token, refreshToken, expiry, tokenEndpoint, accId];
    const database = new Database();
    try {
        await database.executeQuery(query, params);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * To save authenticator id in database
 * @param {{authId:string, accId:number}} param0
 * @returns {Promise<void>}
 */

async function saveAuthId({ authId, accId }) {
    const query = `INSERT INTO authenticatorData (authenticator_id, account_id) VALUES (?, ?);`;
    const params = [authId, accId];
    const database = new Database();
    try {
        await database.executeQuery(query, params);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    createAccountEntry,
    saveAuthId,
    saveToken,
    addSecret,
    isUnique,
    addMethod
};

export {
    createAccountEntry,
    saveAuthId,
    saveToken,
    addSecret,
    isUnique,
    addMethod
};
