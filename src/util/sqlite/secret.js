import Database from '../sqlite';

const database = new Database();

const create = async ({ secret, accId }) => {
    const query = `INSERT INTO secrets (secret, account_id) VALUES (?, ?);`;
    const params = [secret, accId];
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
    const query = `DELETE FROM secrets WHERE secret_id = ?;`;
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

const getSecretByAccountId = async (accId) => {
    const query = `SELECT secret FROM secrets WHERE account_id = ?;`;
    const params = [accId];
    try {
        await database.init();
        const result = await database.exequteQuery(query, params);
        database.closeConn();
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
};

export default { create, _delete, getSecretByAccountId };
