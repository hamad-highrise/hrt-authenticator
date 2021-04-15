import { cipher } from '../../../native-services';
import { constants } from '../../../global';
import db from './queries';

const { isUnique, addMethod } = db;

async function createAccount({ account, token }) {
    try {
        const { insertId } = await db.createAccountEntry(account);
        const { cipherText: secret } = await cipher.encrypt({
            payload: account.secret,
            keyAlias: constants.KEY_ALIAS.SECRET
        });
        await db.addSecret({ secret, accId: insertId });
        if (account.type === 'SAM') {
            await db.saveToken({ ...token, accId: insertId });
            await db.saveAuthId({ authId: account.authId, accId: insertId });
        }
        return Promise.resolve(insertId);
    } catch (error) {
        return Promise.reject(error);
    }
}

export { createAccount, isUnique, addMethod };
