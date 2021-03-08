import db from './queries';

async function createAccount({ account, token }) {
    try {
        const { insertId } = await db.createAccountEntry(account);
        console.warn('AccountCreated', insertId);
        await db.addSecret({ secret: account.secret, accId: insertId });
        console.warn('secretAdded');
        await db.saveToken({ ...token, accId: insertId });
        console.warn('TOkenAdded');
        await db.saveAuthId({ authId: account.authId, accId: insertId });
        console.warn('AuthIdSaved');
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export { createAccount };
