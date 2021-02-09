import Database from '../../util/sqlite/index.new';

const database = new Database();

async function remove(accId) {
    const query = `DELETE FROM accounts WHERE account_id = ?;`;
    const params = [accId];
    // const database = new Database();
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

async function getTokenByAccount(accId) {
    const query = `SELECT token FROM tokens WHERE account_id = ?;`;
    const params = [accId];
    try {
        const [result] = await database.executeQuery(query, params);
        let token;
        for (let i = 0; i < result.rows.length; i++) {
            token = result.rows.item(i);
        }
        return Promise.resolve(await token.token);
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

export default {
    remove,
    getAuthIdByAccount,
    getTokenByAccount,
    getEnrollmentEndpoint
};
export {
    remove as removeAccount,
    getAuthIdByAccount,
    getTokenByAccount,
    getEnrollmentEndpoint
};
