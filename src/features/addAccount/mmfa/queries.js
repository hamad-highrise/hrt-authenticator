import Database from '../../../util/sqlite/index.new';

async function saveToken(
    { token, refreshToken, tokenEndpoint, expiry },
    accId
) {
    const query = `INSERT INTO tokens (token, refresh_token, expires_at, endpoint, account_id) VALUES (?, ?, ?, ?, ?);`;
    const params = [token, refreshToken, expiry, tokenEndpoint, accId];
    const database = new Database();
    try {
        await database.executeQuery(query, params);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}
export default { saveToken };
export { saveToken };
