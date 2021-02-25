import Database from '../../util/sqlite/index.new';

async function getToken(accId) {
    const query = `SELECT token, endpoint, refresh_token, expires_at FROM tokens WHERE acccount_id = ?`;
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
            expiresAt: tokenObj[expiresAt]
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

async function updateTokenDb({ token, refreshToken, expiry }, accId) {
    const query = `UPDATE tokens 
        SET 
        token = ?,
        refresh_token = ?,
        expires_at = ?
        WHERE account_id = ?;`;
    const params = [token, refreshToken, expiry, accId];
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
        return Promise.resolve(await authId.authenticator_id);
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
        return Promise.resolve(await endpoint.enrollment_endpoint);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default {
    getToken,
    updateTokenDb,
    getEnrollmentEndpoint,
    getAuthIdByAccount,
    removeAccountDB
};

export {
    getToken,
    updateTokenDb,
    getEnrollmentEndpoint,
    getAuthIdByAccount,
    removeAccountDB
};
