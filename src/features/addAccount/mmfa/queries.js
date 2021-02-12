import Database from '../../../util/sqlite/index.new';

const database = new Database();

async function addAccount(account, token) {
    try {
        const accId = await create(account);
        await addSecret(account.secret, accId);
        await saveToken(token, accId);
        await saveAuthId(account.authId, accId);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

async function create({
    name,
    issuer,
    type = 'TOTP',
    transactionEndpoint,
    enrollmentEndpoint
}) {
    const query = `INSERT INTO accounts ( account_name, issuer, type, transaction_endpoint, enrollment_endpoint ) VALUES (?, ?, ?, ?, ?);`;
    const params = [
        name,
        issuer,
        type,
        transactionEndpoint,
        enrollmentEndpoint
    ];
    try {
        const [result] = await database.executeQuery(query, params);
        return Promise.resolve(result.insertId);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function isUnique({ name, issuer }) {
    const query = `SELECT account_id FROM accounts WHERE account_name = ? AND issuer = ?;`;
    const params = [name, issuer];
    try {
        const result = await database.executeQuery(query, params);
        return Promise.resolve(result[0].rows.length === 0);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function addSecret(secret, accId) {
    const query = `INSERT INTO "secrets" ("secret", "account_id") VALUES (?, ?);`;
    const params = [secret, accId];
    try {
        await database.executeQuery(query, params);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

async function saveToken(
    { token, refreshToken, tokenEndpoint, expiry },
    accId
) {
    const query = `INSERT INTO tokens (token, refresh_token, expires_at, endpoint, account_id) VALUES (?, ?, ?, ?, ?);`;
    const params = [token, refreshToken, expiry, tokenEndpoint, accId];
    try {
        await database.executeQuery(query, params);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

async function saveAuthId(authId, accId) {
    const query = `INSERT INTO authenticatorData (authenticator_id, account_id) VALUES (?, ?);`;
    const params = [authId, accId];
    try {
        await database.executeQuery(query, params);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}
export default { addAccount, isUnique };
export { addAccount, isUnique };
