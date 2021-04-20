import { Database, utilities } from '../../native-services';
import queries from './queries';
import { constants, errors } from '../../global';

const { DatabaseError } = errors;

async function initiateDb() {
    const database = new Database();
    try {
        await database.executeQuery(queries.appDataQuery);
        await database.executeQuery(queries.accountTableQuery);
        await database.executeQuery(queries.accountSecretTableQuery);
        await database.executeQuery(queries.tokenTableQuery);
        await database.executeQuery(queries.accountMethodsTableQuery);
        await database.executeQuery(queries.authenticatorIdTableQuery);
        await database.executeQuery(queries.appDataPopulate, [
            'uuid-' + (await (await utilities.getUUID()).uuid),
            constants.APP_INFO.VERSION
        ]);

        return;
    } catch (error) {
        throw new DatabaseError({ message: 'ERROR_SETTING_UP_DB' });
    }
}

export { initiateDb };
