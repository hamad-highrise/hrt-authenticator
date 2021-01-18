import Database from '../sqlite';

const database = new Database();

const create = async ({ name, issuer, type = 'TOTPOnly' }) => {
    const query = `INSERT INTO accounts (account_name, issuer, type) VALUES (?, ?, ?);`;
    const params = [name, issuer, type];
    try {
        await database.init();
        await database.exequteQuery(query, params);
        database.closeConn();
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

const _delete = async (id) => {
    const query = `DELETE FROM accounts WHERE account_id = ?;`;
    const params = [id];
    try {
        await database.init();
        await database.exequteQuery(query, params);
        database.closeConn();
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

const getRecentAccountId = async () => {
    const query = `SELECT account_id FROM accounts ORDER BY DESC LIMIT 1`;
    try {
        await database.init();
        const result = await database.exequteQuery(query);
        database.closeConn();
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getAllAccounts = async () => {
    const query = `
    SELECT account_name, issuer, type FROM ACCOUNTS;`;
    try {
        await database.init();
        const result = await database.exequteQuery(query);
        database.closeConn();
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getSecret = async (id) => {
    const query = `
        SELECT secret FROM secrets WHERE account_id = ?;
    `;
    const params = [id];

    try {
        await database.init();
        const result = await database.exequteQuery(query, params);
        database.closeConn();
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
};

export default { create, _delete, getAllAccounts, getSecret };
