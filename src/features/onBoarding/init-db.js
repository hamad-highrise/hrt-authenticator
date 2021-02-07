import Database from '../../util/sqlite/index.new';
import queries from './queries';

async function initiateDb() {
    const database = new Database();
    try {
        await database.executeQuery(queries.appDataQuery);
        await database.executeQuery(queries.accountTableQuery);
        await database.executeQuery(queries.accountSecretTableQuery);
        await database.executeQuery(queries.tokenTableQuery);
        await database.executeQuery(queries.methodTableQuery);
        await database.executeQuery(queries.accountMethodsTableQuery);
        await database.executeQuery(queries.authenticatorIdTableQuery);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export { initiateDb };
