import { Database } from '../../../native-services';

async function removeAccountFromDB(accId) {
    const query = `DELETE FROM accounts WHERE account_id = ?`;
    const params = [accId];
    const database = new Database();
    try {
        await database.executeQuery(query, params);
        return;
    } catch (error) {
        throw error;
    }
}

export default { removeAccountFromDB };
export { removeAccountFromDB };
