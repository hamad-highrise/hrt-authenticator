import apiRequests from './api';
import db from './queries';

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
                if (result.respInfo.status !== 200) {
                    //error in device removal
                    console.warn(result.json());
                    return Promise.resolve({
                        success: false,
                        message: 'ERROR_REMOVING_DEVICE'
                    });
                }
                //Unregister totp after removing device from SAM
                const unregisterTotpResult = await apiRequests.unregisterTotp({
                    endpoint: enrollmentEndpoint,
                    token,
                    secure: false
                });
                if (unregisterTotpResult.respInfo.status !== 200) {
                    //error in unregistering TOTP
                    console.warn(unregisterTotpResult.json());
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
        if (!isTokenValid(expiresAt)) {
            console.warn('Token refreshed');
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

function isTokenValid(expiresAt) {
    const currentTime = Math.floor(Date.now() / 1000); //time in seconds
    return expiresAt > currentTime && expiresAt - currentTime > 5;
}

export { getToken, removeAccount };
export { default as getFetchInstance } from './RNFetch';
export { default as encodeFormData } from './formData';
