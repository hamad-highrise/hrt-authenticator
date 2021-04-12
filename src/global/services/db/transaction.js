import { Database } from '../../../native-services';
import { DatabaseError } from '../../errors';

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
        throw new DatabaseError({ message: 'TRXN_ENDPOINT_ERROR' });
    }
}

async function getMethods(accId) {
    const query = `SELECT method_name FROM methods WHERE account_id = ?;`;
    const params = [accId];
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query, params);
        let temp = [];
        for (let i = 0; i < result.rows.length; i++) {
            temp.push(result.rows.item(i).method_name);
        }
        return temp;
    } catch (error) {
        throw new DatabaseError({ message: 'METHOD_FETCH_ERROR' });
    }
}

export default { getTransactionEndpoint, getMethods };
export { getTransactionEndpoint, getMethods };
