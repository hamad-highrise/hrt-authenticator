import { Database } from '../../native-services';
import { DatabaseError } from '../errors';

async function getAuthIdByAccount(accId) {
    const query = `SELECT authenticator_id FROM authenticatorData WHERE account_id = ?;`;
    const params = [accId];
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query, params);
        let authId;
        for (let i = 0; i < result.rows.length; i++) {
            authId = result.rows.item(i);
        }
        return authId.authenticator_id;
    } catch (error) {
        throw new DatabaseError({ message: 'AUTH_ID_FETCH_ERROR' });
    }
}

async function getEnrollmentEndpoint(accId) {
    const query = `SELECT enrollment_endpoint FROM accounts WHERE account_id = ?;`;
    const params = [accId];
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query, params);
        let temp;
        for (let i = 0; i < result.rows.length; i++) {
            temp = result.rows.item(i).enrollment_endpoint;
        }
        return temp;
    } catch (error) {
        throw new DatabaseError({ message: 'ENROLLMENT_ENDPOINT_ERROR' });
    }
}

async function getDeviceId() {
    const query = `SELECT id FROM app_meta`;
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query);
        let id;
        for (let i = 0; i < result.rows.length; i++) {
            id = result.rows.item(i).id;
        }
        return id;
    } catch (error) {
        throw new DatabaseError({ message: 'DEVICE_ID_ERROR' });
    }
}

async function addMethod({ accId, method, keyHandle }) {
    const query = `INSERT INTO methods (method_name, account_id, key_handle) VALUES (?,?,?);`;
    const params = [method, accId, keyHandle];
    const databse = new Database();
    try {
        await databse.executeQuery(query, params);
        return;
    } catch (error) {
        throw new DatabaseError({ message: 'ADD_METHOD_ERROR' });
    }
}

async function getIgnoreSslOption(accId) {
    const query = `SELECT ignore_ssl AS ignoreSsl FROM accounts WHERE account_id = ?;`;
    const params = [accId];
    const database = new Database();
    try {
        const [result] = await database.executeQuery(query, params);

        let temp;
        for (let i = 0; i < result.rows.length; i++) {
            temp = result.rows.item(i).ignoreSsl;
        }
        return temp;
    } catch (error) {
        throw new DatabaseError({ message: 'IGNORE_SSL_OPTION_ERROR' });
    }
}

export default {
    getAuthIdByAccount,
    getEnrollmentEndpoint,
    getDeviceId,
    addMethod,
    getIgnoreSslOption
};
export {
    getAuthIdByAccount,
    getEnrollmentEndpoint,
    getDeviceId,
    addMethod,
    getIgnoreSslOption
};
