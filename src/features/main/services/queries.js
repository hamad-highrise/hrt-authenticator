import { Database } from '../../../native-services';

async function getAll() {
    const query = `SELECT account_id, account_name, issuer, type FROM accounts`;
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query);
        let temp = [];
        for (let i = 0; i < result.rows.length; i++) {
            temp.push(result.rows.item(i));
        }

        return Promise.resolve(
            temp.map((account) => {
                if (account.type === 'SAM') {
                    return {
                        ...account,
                        transaction: {
                            available: false
                        },
                        error: false
                    };
                } else return account;
            })
        );
    } catch (error) {
        return Promise.reject(error);
    }
}

async function getSecretByAccountId(accId) {
    const query = `SELECT secret FROM secrets WHERE account_id = ?;`;
    const params = [accId];
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query, params);
        let secret;
        for (let i = 0; i < result.rows.length; i++) {
            secret = result.rows.item(i).secret;
        }
        return Promise.resolve(secret);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default { getAll, getSecretByAccountId };
