//Single row table, will contain app data
const appDataQuery = `
    CREATE TABLE IF NOT EXISTS "app_meta" (
        "id" TEXT UNIQUE NOT NULL,
        "version" TEXT UNIQUE NOT NULL
    );
`;

const appDataPopulate = `
        INSERT INTO app_meta (id, version) VALUES (?,?);
`;

const accountTableQuery = `
CREATE TABLE IF NOT EXISTS "accounts"(
    "account_id" INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
    "account_name" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT "TOTP",
    "transaction_endpoint" TEXT,
    "enrollment_endpoint" TEXT,
    "ignore_ssl" INTEGER DEFAULT 0,
    "methods" TEXT
    );
`;

const accountSecretTableQuery = `
CREATE TABLE IF NOT EXISTS "secrets"(
    "secret_id" INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
    "secret" TEXT NOT NULL,
    "iv" TEXT,
    "account_id" INTEGER NOT NULL,
        FOREIGN KEY("account_id") 
            REFERENCES "accounts" ("account_id")
                ON DELETE CASCADE
                ON UPDATE NO ACTION
    );
`;

const accountOptionsTableQuery = `
CREATE TABLE IF NOT EXISTS "options" (
    "option_id" INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
    "account_id" INTEGER NOT NULL,
    "period" INTEGER NOT NULL DEFAULT 30,
    "algorithm" TEXT NOT NULL DEFAULT 'SHA1',
    "digits" INTEGER NOT NULL DEFAULT 6,
    "ignoreSSL" INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY("account_id")
            REFERENCES "accounts" ("account_id")
                ON DELETE CASCADE,
                ON UPDATE NO ACTION
    );
`;

const authenticatorIdTableQuery = `
    CREATE TABLE IF NOT EXISTS "authenticatorData" (
        "authenticator_id" TEXT NOT NULL UNIQUE PRIMARY KEY,
        "account_id" INTEGER NOT NULL,
            FOREIGN KEY("account_id")
                REFERENCES "accounts" ("account_id")
                    ON DELETE CASCADE
                    ON UPDATE NO ACTION
    );
`;

//TODO: add composite key
const tokenTableQuery = `
    CREATE TABLE IF NOT EXISTS "tokens" (
        "token" TEXT NOT NULL UNIQUE PRIMARY KEY,
        "refresh_token" TEXT NOT NULL UNIQUE,
        "expires_at" INTEGER NOT NULL,
        "endpoint" TEXT NOT NULL,
        "iv" TEXT,
        "account_id" INTEGER NOT NULL,
            FOREIGN KEY("account_id")
                REFERENCES "accounts" ("account_id")
                    ON DELETE CASCADE
                    ON UPDATE NO ACTION
        );
`;

//TODO:
// const methodTableQuery = `
//     CREATE TABLE IF NOT EXISTS "methods" (
//         "method_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
//         "method_name" TEXT NOT NULL
//     );
// `;

// const methodsPopulate = `
//         INSERT INTO methods (method_name) VALUES (?), (?), (?);
// `;

const accountMethodsTableQuery = `
    CREATE TABLE IF NOT EXISTS "methods" (
        "method_name" INTEGER NOT NULL,
        "account_id" INTEGER NOT NULL,
        "key_handle" TEXT,
        PRIMARY KEY( method_name, account_id),
            FOREIGN KEY("account_id")
                REFERENCES "accounts" ("account_id")
                    ON DELETE CASCADE
                    ON UPDATE NO ACTION
    );
`;

const queries = {
    appDataQuery,
    accountTableQuery,
    accountOptionsTableQuery,
    accountMethodsTableQuery,
    tokenTableQuery,
    authenticatorIdTableQuery,
    accountSecretTableQuery,
    appDataPopulate
};

export default queries;
