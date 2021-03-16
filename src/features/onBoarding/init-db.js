import Database from '../../util/sqlite/index.new';
import queries from './queries';
import { utilities } from '../../util';

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
        await database.executeQuery(queries.appDataPopulate, [
            'uuid-' + (await (await utilities.getUUID()).uuid),
            '1.0.0'
        ]);
        await database.executeQuery(queries.methodsPopulate, [
            'TOTP',
            'FINGERPRINT',
            'USER_PRESENCE'
        ]);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export { initiateDb };
