import Database from '../../util/sqlite/index.new';
const database = new Database();

async function getTokenByAccount(accId) {
    const query = `SELECT token, refresh_token, endpoint FROM tokens WHERE account_id = ?;`;
    const params = [accId];
    try {
        const [result] = await database.executeQuery(query, params);

        let tokenObj;
        for (let i = 0; i < result.rows.length; i++) {
            tokenObj = result.rows.item(i);
        }
        return Promise.resolve(tokenObj);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function updateToken({ token, refreshToken, expiry }, accId) {
    const query = `UPDATE tokens 
        SET 
        token = ?,
        refresh_token = ?,
        expires_at = ?
        WHERE account_id = ?;`;
    const params = [token, refreshToken, expiry, accId];
    try {
        const result = await database.executeQuery(query, params);
        console.warn(result);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getTransactionEndpoint(accId) {
    const query = `SELECT transaction_endpoint FROM accounts WHERE account_id = ?;`;
    const params = [accId];
    try {
        const [result] = await database.executeQuery(query, params);
        let transaction_endpoint;
        for (let i = 0; i < result.rows.length; i++) {
            transaction_endpoint = result.rows.item(i).transaction_endpoint;
        }
        return Promise.resolve(transaction_endpoint);
    } catch (error) {
        return Promise.reject(error);
    }
}

export { getTokenByAccount, getTransactionEndpoint, updateToken };

async function removeAccountDB(accId) {
    const query = `DELETE FROM accounts WHERE account_id = ?;`;
    const params = [accId];
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
