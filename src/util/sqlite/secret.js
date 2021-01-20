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

const getAll = async () => {
    const query = `SELECT secret FROM secrets;`;
    // const params = [accId];
    try {
        await database.init();
        const result = await database.exequteQuery(query);
        database.closeConn();
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
};

const isUnique = async (secret) => {
    const query = `SELECT secret FROM secrets WHERE secret = ?;`;
    const params = [secret];
    try {
        await database.init();
        const result = await database.exequteQuery(query, params);
        database.closeConn();
        if (result[0].rows.length === 0) return Promise.resolve(true);
        else return Promise.resolve(false);
    } catch (error) {
        return Promise.reject(error);
    }
};

export default { create, _delete, getSecretByAccountId, isUnique, getAll };
