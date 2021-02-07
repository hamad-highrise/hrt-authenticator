import SQlite from 'react-native-sqlite-storage';
SQlite.enablePromise(true);

function Database() {
    this.name = 'test.db';
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

    // try {
    //     this.db;
    //     this.db.executeSql(query, params, (tx, result) => {
    //         console.warn(result.rows);
    //     });
    // } catch (error) {
    //     alert(error);
    // }

    // return new Promise((resolve, reject) => {
    //     this.db.executeSql(
    //         query,
    //         params,
    //         (tx, result) => {
    //             console.warn('Okay');
    //             alert(result.rows.length);
    //         },
    //         (tx, err) => alert(err.message)
    //     );

    // this.db.transaction((tx) => {
    //     tx.executeSql(
    //         query,
    //         params,
    //         (tx, result) => {
    //             alert('result');
    //             resolve(result);
    //         },
    //         (err) => {
    //             reject(err);
    //         }
    //     );
    // });
    //     this.db.close();
    // });
};

Database.prototype.tableExists = function () {};

export default Database;
