async function addAccount({ name, issuer, secret }) {}

async function removeAccount(accId) {}

async function editAccount() {}

async function createOptions({ accId, digits, period, algorithm, ignoreSSL }) {}

async function removeOptions(accId) {}

async function enableMethod() {}

async function getAuthMethods() {}

const queries = {
    addAccount,
    removeAccount,
    editAccount,
    createOptions,
    removeOptions,
    enableMethod,
    getAuthMethods
};
