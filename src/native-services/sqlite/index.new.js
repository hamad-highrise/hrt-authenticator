import SQlite from 'react-native-sqlite-storage';
SQlite.enablePromise(true);

function Database() {
    this.name = 'verify.db';
    this.version = '1.0';
    this.displayName = 'Test Database';
    this.size = 1024 * 1024 * 5; // 5 MBs
    this.dba = null;
}

Database.prototype.executeQuery = function (query, params = []) {
    return new Promise((resolve, reject) => {
        SQlite.openDatabase(
            this.name,
            this.version,
            this.displayName,
            this.size
        )
            .then((db) => {
                db.executeSql(query, params)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            })
            .catch((err) => {
                reject(err);
            });
    });
};

Database.prototype.tableExists = function () {};

export default Database;
