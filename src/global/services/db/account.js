import { Database } from '../../../native-services';
import { DatabaseError } from '../../errors';

async function getTenantId(accId) {
    const query = `SELECT tenant_id FROM accounts WHERE account_id = ?;`;
    const params = [accId];
    const db = new Database();
    try {
        const [result] = await db.executeQuery(query, params);
        let temp;
        for (let i = 0; i < result.rows.length; i++) {
            temp = result.rows.item(i);
        }
        if (!temp) return;
        return temp.tenant_id;
    } catch (error) {
        throw new DatabaseError({ message: error.message });
    }
}

async function getAccIdFromTenantId(tenantId) {
    const query = `SELECT account_id FROM accounts WHERE tenant_id = ?;`;
    const params = [tenantId];
    const db = new Database();
    try {
        const [result] = await db.executeQuery(query, params);
        let temp;
        for (let i = 0; i < result.rows.length; i++) {
            temp = result.rows.item(i);
        }
        if (!temp) return;
        return temp.account_id;
    } catch (error) {
        throw new DatabaseError({ message: error.message });
    }
}

export default { getAccIdFromTenantId, getTenantId };
export { getTenantId, getAccIdFromTenantId };
