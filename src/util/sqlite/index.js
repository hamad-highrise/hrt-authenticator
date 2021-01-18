import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

function Database() {
    this.name = 'test.db';
    this.version = '1.0';
    this.displayName = 'Test Database';
    this.size = 1024 * 1024 * 5;
    this.db = null;
}

Database.prototype.init = async function () {
    if (this.db) return Promise.resolve(this.db);
    else {
        try {
            this.db = await SQLite.openDatabase(
                this.name,
                this.version,
                this.displayName,
                this.size
            );
            return Promise.resolve(this.db);
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

Database.prototype.setUpDatabase = async function () {
    const accountTableQuery = `
    CREATE TABLE IF NOT EXISTS "accounts"(
        "account_id" INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
        "account_name" TEXT NOT NULL,
        "issuer" TEXT NOT NULL,
        "type" TEXT NOT NULL DEFAULT "TOTP_Only"
        );
    `;
    const accountSecretTableQUery = `
    CREATE TABLE IF NOT EXISTS "secrets"(
        "secret" TEXT NOT NULL PRIMARY KEY UNIQUE,
        "account_id" INTEGER NOT NULL,
            FOREIGN KEY("account_id") 
                REFERENCES "accounts" ("account_id")
                    ON DELETE CASCADE
                    ON UPDATE NO ACTION
    );
    `;
    const methodTableQuery = `
    CREATE TABLE IF NOT EXISTS "methods"(
        "method_id" INTEGER NOT NULL UNIQUE PRIMARY KEY AUTOINCREMENT,
        "method_name" TEXT NOT NULL UNIQUE,
        "enrolled" INTEGER DEFAULT 0

    );
    `;
    const populateMethodTable = `
    INSERT INTO "methods" ("method_name") VALUES (?),(?),(?);
    `;
    const defaultMethodsValues = ['user_appearence', 'totp', 'biometric'];
    try {
        // const transaction = await this.db.transaction();
        await this.db.executeSql(accountTableQuery);
        // const result = await this.db.executeSql('SELECT * FROM accounts');
        // console.warn(result);
        await this.db.executeSql(accountSecretTableQUery);
        await this.db.executeSql(methodTableQuery);
        await this.db.executeSql(populateMethodTable, defaultMethodsValues);
        return Promise.resolve(true);
    } catch (error) {
        // console.warn(error);
        return Promise.reject(error);
    }
};

Database.prototype.exequteQuery = async function (query, params = []) {
    try {
        // const transaction = await this.db.transaction();
        const result = await this.db.executeSql(query, params);
        console.warn(result);
        return Promise.resolve(result);
    } catch (error) {
        console.warn(error);
    }
};

Database.prototype.closeConn = function () {
    try {
        this.db.close();
    } catch (error) {
        console.warn(error);
    }
};

export default Database;
