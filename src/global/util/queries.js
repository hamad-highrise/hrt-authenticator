import { Database } from '../../native-services';
import { DatabaseError } from '../errors';

async function getAuthIdByAccount(accId) {
    const query = `SELECT authenticator_id FROM authenticatorData WHERE account_id = ?;`;
    const params = [accId];
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query, params);
        let authId;
        for (let i = 0; i < result.rows.length; i++) {
            authId = result.rows.item(i);
        }
        return authId.authenticator_id;
    } catch (error) {
        throw new DatabaseError({ message: 'AUTH_ID_FETCH_ERROR' });
    }
}

export default { getAuthIdByAccount };
export { getAuthIdByAccount };
