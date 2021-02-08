import Database from '../../util/sqlite/index.new';

async function remove(accId) {
    const query = `DELETE FROM accounts WHERE account_id = ?;`;
    const params = [accId];
    const database = new Database();
    try {
        await database.executeQuery(query, params);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { remove };
export { remove as removeAccount };
