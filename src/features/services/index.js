import apiRequests from './api';
import db from './queries';
import { processTransaction } from './transaction';

async function getTransactions({ accId, secure }) {
    try {
        const { token, success, message } = await getToken(accId);

        if (success) {
            const { transactionEndpoint } = await db.getTransactionEndpoint(
                accId
            );
            const result = await apiRequests.getPendingTransactions({
                endpoint: transactionEndpoint,
                token,
                secure
            });
            if (result.respInfo.status === 200) {
                const processed = processTransaction(
                    result.json()[
                        'urn:ietf:params:scim:schemas:extension:isam:1.0:MMFA:Transaction'
                    ]
                );
                return (await db.getMethods(accId)).includes(processed.method)
                    ? Promise.resolve({
                          transaction: processed,
                          success: true,
                          message: 'SUCCESS'
                      })
                    : Promise.resolve({
                          message: 'UNREGISTERED_METHODS',
                          success: true
                      });
            } else {
                return Promise.resolve({
                    success: false,
                    message: 'GET_TRANS_ERROR_!200'
                });
            }
        } else {
            //evaluate message
            return Promise.resolve({
                success: false,
                message: 'TOKEN_ERROR'
            });
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

async function removeAccount({ accId, type, ignoreSsl }) {
    try {
        if (type === 'SAM') {
            //SAM account removal flow
            const { success, message, token } = await getToken(accId);
            if (success) {
                //token
                const { authenticatorId } = await db.getAuthIdByAccount(accId);
                const { enrollmentEndpoint } = await db.getEnrollmentEndpoint(
                    accId
                );

                const result = await apiRequests.removeDeviceFromSam({
                    endpoint: enrollmentEndpoint,
                    authId: authenticatorId,
                    token,
                    secure: false
                });

                if (result.respInfo.status === 400) {
                    //device has been removed from SAM server
                    //account from local db will be removed here
                    await db.removeAccountDB(accId);
                    return Promise.resolve({
                        success: true,
                        message:
                            'DEVICE_ALREADY_REMOVED_FROM_SAM_REMOVED_LOCALLY'
                    });
                }
                //Unregister totp after removing device from SAM
                const unregisterTotpResult = await apiRequests.unregisterTotp({
                    endpoint: enrollmentEndpoint,
                    token,
                    secure: false
                });

                if (unregisterTotpResult.respInfo.status !== 200) {
                    //account from local db will be removed here
                    await db.removeAccountDB(accId);
                    //error in unregistering TOTP
                    return Promise.resolve({
                        success: false,
                        message: 'ERROR_REMOVING_UNREGISTERING_TOTP'
                    });
                }
            } else {
                //Device removed and unknown error will be handled
                return Promise.resolve({ success: false, message });
            }
        }
        //account from local db will be removed here
        await db.removeAccountDB(accId);
        return Promise.resolve({ success: true });
    } catch (error) {
        return Promise.resolve(error);
    }
}

async function getToken(accId) {
    try {
        const { token, expiresAt, endpoint, refreshToken } = await db.getToken(
            accId
        );
        //TODO: Only token expiry is being handeled here. Need to implement device deletion on individual requests to server.
        if (!isTokenValid(expiresAt)) {
            //here token expiry will be handled
            const result = await apiRequests.getRefreshedToken({
                endpoint,
                refreshToken,
                secure: false
            });
            if (result.respInfo.status === 200) {
                //token has been refreshed successfully
                const {
                    access_token: token,
                    refresh_token: refreshToken,
                    expires_in: expiry
                } = result.json();
                db.updateTokenDb({ token, refreshToken, expiry, accId });
                return Promise.resolve({
                    success: true,
                    message: 'OKAY',
                    token
                });
            } else if (result.respInfo.status === 400) {
                //Device has been manually removed from SAM
                return Promise.resolve({
                    success: false,
                    message: 'DEVICE_REMOVED'
                });
            } else {
                //some unhandeled error has occured
                return Promise.resolve({
                    success: false,
                    message: 'UNKNOWN_ERROR'
                });
            }
        } else {
            //token is valid
            return Promise.resolve({
                success: true,
                message: 'OKAY',
                token
            });
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

export { getToken, removeAccount, getTransactions };
export { getDeviceId, getMethods } from './queries';
export { default as getFetchInstance } from './RNFetch';
export { default as encodeFormData } from './formData';
export { default as constants } from './constants';
export { removeDeviceFromSam } from './api';

function isTokenValid(expiresAt) {
    const currentTime = Math.floor(Date.now() / 1000); //time in seconds
    return expiresAt > currentTime && expiresAt - currentTime > 5;
}
