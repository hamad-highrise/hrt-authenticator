import { Database } from '../../../native-services';

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
