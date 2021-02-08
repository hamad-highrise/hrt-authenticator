import Database from '../../../util/sqlite/index.new';

const database = new Database();

const addAccount = async (account) => {
    try {
        const accId = await create(account);
        await addSecret(account.secret, accId);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject();
    }
};

async function create({ name, issuer, type = 'TOTP' }) {
    const query = `INSERT INTO accounts ( account_name, issuer, type ) VALUES (?, ?, ?);`;
    const params = [name, issuer, type];
    try {
        const [result] = await database.executeQuery(query, params);
        return Promise.resolve(result.insertId);
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

//Check if account is unique

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

//Will be ignored at the moment
async function addOptions({
    period = 30,
    digit = 6,
    algorithm = 'SHA1',
    ignoreSSL = 1
}) {}

export { addAccount, isUnique };
