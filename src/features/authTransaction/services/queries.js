import Database from '../../../util/sqlite/index.new';

async function getTokenByAccount(accId) {
    const database = new Database();
    const query = `SELECT token, endpoint, refresh_token FROM tokens WHERE account_id = ?`;
    const params = [accId];
    try {
        const [result] = await database.executeQuery(query, params);
        let temp;
        for (let i = 0; i < result.rows.length; i++) {
            temp = result.rows.item(i);
        }
        return Promise.resolve({
            token: temp.token,
            refreshToken: temp.resfresh_token,
            endpoint: temp.endpoint
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { getTokenByAccount };
export { getTokenByAccount };
