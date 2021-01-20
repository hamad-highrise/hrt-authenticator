import Database from '../sqlite';

const database = new Database();

const create = async ({ name, issuer, secret, type = 'TOTPOnly' }) => {
    const query = `INSERT INTO accounts (account_name, issuer, type) VALUES (?, ?, ?);`;
    const params = [name, issuer, type];
    const secretQuery = `INSERT INTO secrets (secret, account_id) VALUES (?,?);`;
    try {
        await database.init();
        if (await isUnique(name, issuer)) {
            const [result] = await database.exequteQuery(query, params);
            await database.exequteQuery(secretQuery, [secret, result.insertId]);
            database.closeConn();
            return Promise.resolve(true);
        } else {
            alert('Account can not be created!');
            return Promise.resolve(false);
        }
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
    const query = `SELECT account_id FROM accounts ORDER BY account_id DESC LIMIT 1`;
    try {
        await database.init();
        const result = await database.exequteQuery(query);
        database.closeConn();
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
};

const isUnique = async (name, issuer) => {
    const query = `SELECT account_id FROM accounts WHERE account_name = ? AND issuer = ?;`;
    const params = [name, issuer];
    try {
        await database.init();
        const result = await database.exequteQuery(query, params);
        database.closeConn();
        return Promise.resolve(result[0].rows.length === 0);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getAccount = async (id) => {
    const query = `SELECT accounts.account_name, accounts.issuer, secrets.secret FROM accounts 
    INNER JOIN secrets ON secrets.account_id = accounts.account_id WHERE accounts.account_id = ?;`;
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

const getAllAccounts = async () => {
    const query = `
    SELECT account_id, account_name, issuer, type FROM ACCOUNTS;`;
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
        SELECT * FROM secrets;
    `;
    const params = [id];

    try {
        await database.init();
        const result = await database.exequteQuery(query);
        database.closeConn();
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
};

export default { create, _delete, getAllAccounts, getSecret, getAccount };
