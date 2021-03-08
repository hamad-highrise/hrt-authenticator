import db from './queries';

async function createAccount({ account, token }) {
    try {
        const { insertId } = await db.createAccountEntry(account);
        await db.addSecret({ secret: account.secret, accId: insertId });
        if (account.type === 'SAM') {
            await db.saveToken({ ...token, accId: insertId });
            await db.saveAuthId({ authId: account.authId, accId: insertId });
        }
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export { createAccount };
