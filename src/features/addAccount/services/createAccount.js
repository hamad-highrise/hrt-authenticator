import { cipher } from '../../../native-services';
import { constants } from '../../../global';
import db from './queries';

async function createAccount({ account, token }) {
    try {
        const { insertId } = await db.createAccountEntry(account);
        const { cipherText: secret } = await cipher.encrypt({
            payload: account.secret,
            keyAlias: constants.KEY_ALIAS.SECRET
        });
        await db.addSecret({ secret, accId: insertId });
        if (account.type === constants.ACCOUNT_TYPES.SAM) {
            await db.saveToken({ ...token, accId: insertId });
            await db.saveAuthId({ authId: account.authId, accId: insertId });
        }
        return Promise.resolve(insertId);
    } catch (error) {
        return Promise.reject(error);
    }
}

export default createAccount;
