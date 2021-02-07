import Database from '../../util/sqlite/index.new';

async function getAll() {
    const query = `SELECT account_id, account_name, issuer FROM accounts`;
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query);
        let temp = [];
        for (let i = 0; i < result.rows.length; i++) {
            temp.push(result.rows.item(i));
        }
        return Promise.resolve(temp);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { getAll };
