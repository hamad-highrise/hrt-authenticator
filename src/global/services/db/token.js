import { Database } from '../../../native-services';

/**
 * Resolves in to an Object with Token properties.
 * @param {Number} accId - Account ID fow which token is required.
 * @returns Promise<{}>
 * @throws Error
 */

async function getToken(accId) {
    const query = `SELECT token, endpoint, refresh_token, expires_at FROM tokens WHERE account_id = ?`;
    const params = [accId];
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query, params);
        let temp;
        for (let i = 0; i < result.rows.length; i++) {
            temp = result.rows.item(i);
        }
        return {
            accessToken: temp['token'],
            refreshToken: temp['refresh_token'],
            endpoint: temp['endpoint'],
            expiresAt: temp['expires_at']
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Updates the token.
 * @param {{token: String, refreshToken: String, expiry: Number, accId: Number}} param0 - Expiry will be in Epoch (In Seconds) at which token will expire.
 * @throws Error
 */

async function updateTokenDb({ token, refreshToken, expiry, accId }) {
    const query = `UPDATE tokens
        SET
        token = ?,
        refresh_token = ?,
        expires_at = ?
    WHERE account_id = ?;`;
    const params = [token, refreshToken, expiry, accId];
    const database = new Database();
    try {
        await database.executeQuery(query, params);
        return;
    } catch (error) {
        throw error;
    }
}

export default { getToken, updateTokenDb };
export { getToken, updateTokenDb };
