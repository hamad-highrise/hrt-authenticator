import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);
let db;
const initDB = async () => {
    try {
        db = await SQLite.openDatabase({ name: 'auth_db' });
        const result = await db.executeSql(
            'SELECT COUNT(*) FROM sqlite_master WHERE '
        );
    } catch (error) {}
};

const populateMethodTable = async () => {};

const createAccount = async () => {};
