import { Database } from '../../../native-services';

/**@module DBQueries */

/**
 * To get TOTP secret from DB. It'll be encrypted.
 * @param {number} accId - Account ID associated with TOTP Secret
 * @returns {Promise<string>} Encrypted TOTP Secret
 */

async function getSecretByAccountId(accId) {
    const query = `SELECT secret FROM secrets WHERE account_id = ?;`;
    const params = [accId];
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query, params);
        let secret;

        for (let i = 0; i < result.rows.length; i++) {
            secret = result.rows.item(i).secret;
        }
        return Promise.resolve(secret);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { getSecretByAccountId };
export { getSecretByAccountId };
