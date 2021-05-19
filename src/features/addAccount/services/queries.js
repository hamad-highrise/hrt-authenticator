import { Database } from '../../../native-services';

async function createAccountEntry({
    name,
    issuer,
    type = 'TOTP',
    transactionEndpoint = null,
    enrollmentEndpoint = null,
    ignoreSsl = false
}) {
    const query = `INSERT INTO 
        accounts 
            (account_name, issuer, type, ignore_ssl, transaction_endpoint, enrollment_endpoint)
        VALUES
            (?, ?, ?, ?, ?, ?);
        `;
    const params = [
        name,
        issuer,
        type,
        ignoreSsl,
        transactionEndpoint,
        enrollmentEndpoint
    ];
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query, params);
        return { insertId: result.insertId };
    } catch (error) {
        throw error;
    }
}

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
