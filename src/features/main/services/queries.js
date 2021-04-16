import { Database } from '../../../native-services';

async function getAll() {
    const query = `SELECT account_id AS id, account_name AS name, issuer, type, ignore_ssl AS ignoreSsl FROM accounts`;
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

export default { getAll };
