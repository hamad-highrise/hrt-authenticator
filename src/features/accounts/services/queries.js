import { Database } from '../../../native-services';

/**@module DBQueries */



async function getAll() {
    const query = `SELECT account_id AS id, account_name AS name, issuer, type, ignore_ssl AS ignoreSsl, suspected FROM accounts`;
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query);
        let accounts = [];
        for (let i = 0; i < result.rows.length; i++) {
            accounts.push(result.rows.item(i));
        }
        return accounts;
    } catch (error) {
        throw error;
    }
}

export default { getAll };
