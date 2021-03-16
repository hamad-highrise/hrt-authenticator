import Database from '../../../native-services/sqlite/index.new';

async function createAccountEntry({
    name,
    issuer,
    type = 'TOTP',
    transactionEndpoint = null,
    enrollmentEndpoint = null,
    ignoreSSL = false
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
        ignoreSSL,
        transactionEndpoint,
        enrollmentEndpoint
    ];
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query, params);
        return Promise.resolve({ insertId: result.insertId });
    } catch (error) {
        return Promise.resolve(error);
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

async function addSecret({ secret, accId, iv }) {
    const query = `INSERT INTO secrets (secret, iv, account_id) VALUES (?, ?, ?);`;
    const params = [secret, iv, accId];
    const database = new Database();
    try {
        await database.executeQuery(query, params);
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
    iv,
    accId
}) {
    const query = `INSERT INTO 
    tokens (token, refresh_token, expires_at, endpoint, account_id, iv) 
    VALUES (?, ?, ?, ?, ?, ?);`;
    const params = [token, refreshToken, expiry, tokenEndpoint, accId, iv];
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
    isUnique
};

export { createAccountEntry, saveAuthId, saveToken, addSecret, isUnique };
