import db from './queries';
const { isUnique, addMethod } = db;

async function createAccount({ account, token }) {
    try {
        const { insertId } = await db.createAccountEntry(account);
        await db.addSecret({ secret: account.secret, accId: insertId });
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
