import Database from '../../util/sqlite/index.new';

async function getTransactionEndpoint(accId) {
    const query = `SELECT transaction_endpoint FROM accounts WHERE account_id = ?;`;
    const params = [accId];
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query, params);
        let transaction_endpoint;
        for (let i = 0; i < result.rows.length; i++) {
            transaction_endpoint = result.rows.item(i).transaction_endpoint;
        }
        return Promise.resolve({ transactionEndpoint: transaction_endpoint });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getDeviceId() {
    const query = `SELECT id FROM app_meta`;
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query);
        let id;
        for (let i = 0; i < result.rows.length; i++) {
            id = result.rows.item(i).id;
        }
        return Promise.resolve({ id });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getToken(accId) {
    const query = `SELECT token, endpoint, refresh_token, expires_at FROM tokens WHERE account_id = ?`;
    const params = [accId];
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query, params);
        let tokenObj;
        for (let i = 0; i < result.rows.length; i++) {
            tokenObj = result.rows.item(i);
        }
        return Promise.resolve({
            token: tokenObj['token'],
            refreshToken: tokenObj['refresh_token'],
            endpoint: tokenObj['endpoint'],
            expiresAt: tokenObj['expires_at']
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function updateTokenDb({ token, refreshToken, expiry, accId }) {
    const query = `UPDATE tokens 
        SET 
        token = ?,
        refresh_token = ?,
        expires_at = ?
        WHERE account_id = ?;`;
    const params = [token, refreshToken, getExpiryInSeconds(expiry), accId];
    const database = new Database();
    try {
        const result = await database.executeQuery(query, params);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

async function removeAccountDB(accId) {
    const query = `DELETE FROM accounts WHERE account_id = ?;`;
    const params = [accId];
    const database = new Database();
    try {
        await database.executeQuery(query, params);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getAuthIdByAccount(accId) {
    const query = `SELECT authenticator_id FROM authenticatorData WHERE account_id = ?;`;
    const params = [accId];
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query, params);
        let authId;
        for (let i = 0; i < result.rows.length; i++) {
            authId = result.rows.item(i);
        }
        return Promise.resolve({
            authenticatorId: authId.authenticator_id
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getEnrollmentEndpoint(accId) {
    const query = `SELECT enrollment_endpoint FROM accounts WHERE account_id = ?;`;
    const params = [accId];
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query, params);
        let endpoint;
        for (let i = 0; i < result.rows.length; i++) {
            endpoint = result.rows.item(i);
        }
        return Promise.resolve({
            enrollmentEndpoint: endpoint.enrollment_endpoint
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

function getExpiryInSeconds(expiresIn) {
    return Math.floor(Date.now() / 1000) + expiresIn;
}

export default {
    getToken,
    updateTokenDb,
    getEnrollmentEndpoint,
    getAuthIdByAccount,
    removeAccountDB,
    getTransactionEndpoint,
    getDeviceId
};

export {
    getToken,
    updateTokenDb,
    getEnrollmentEndpoint,
    getAuthIdByAccount,
    removeAccountDB,
    getTransactionEndpoint,
    getDeviceId
};
