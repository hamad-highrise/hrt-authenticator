import { Database, utilities } from '../../native-services';
import queries from './queries';
import { constants } from '../../global';

async function initiateDb() {
    const database = new Database();
    try {
        await database.executeQuery(queries.appDataQuery);
        await database.executeQuery(queries.accountTableQuery);
        await database.executeQuery(queries.accountSecretTableQuery);
        await database.executeQuery(queries.tokenTableQuery);
        // await database.executeQuery(queries.methodTableQuery);
        await database.executeQuery(queries.accountMethodsTableQuery);
        await database.executeQuery(queries.authenticatorIdTableQuery);
        await database.executeQuery(queries.appDataPopulate, [
            'uuid-' + (await (await utilities.getUUID()).uuid),
            constants.APP_INFO.VERSION
        ]);

        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

export { initiateDb };
