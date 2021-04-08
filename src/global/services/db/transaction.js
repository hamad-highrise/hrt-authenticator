import { Database } from '../../../native-services';

/**
 * Gives transaction endpoint of an account.
 * @param {Number} accId - Account ID of which transaction endpoint is required.
 * @returns Transaction Endpoint
 */

async function getTransactionEndpoint(accId) {
    const query = `SELECT transaction_endpoint FROM accounts WHERE account_id = ?;`;
    const params = [accId];
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query, params);
        let temp;
        for (let i = 0; i < result.rows.length; i++) {
            temp = result.rows.item(i);
        }
        return temp['transaction_endpoint'];
    } catch (error) {
        throw error;
    }
}

export default { getTransactionEndpoint };
export { getTransactionEndpoint };
