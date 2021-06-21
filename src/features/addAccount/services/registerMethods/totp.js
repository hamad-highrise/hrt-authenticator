import { registerTotp } from '../api';

async function totpRegistraion({ endpoint, token, ignoreSsl }) {
    try {
        const result = await registerTotp({ endpoint, token, ignoreSsl });
        if (result.respInfo.status !== 200) {
            if (result.respInfo.status >= 400 && result.respInfo.status < 500)
                throw new TokenError({
                    message: 'ERROR_REGISTERING_TOTP',
                    displayMessage:
                        'An error was occurred while registering TOTP.'
                });

            if (result.respInfo.status >= 500)
                throw new SAMError({
                    message: 'ERROR_REGISTERING_TOTP',
                    displayMessage: 'An error occurred while registering TOTP.'
                });
        }
        const totp = await result.json();
        return {
            period: totp['period'],
            digit: totp['digits'],
            secretKey: totp['secretKey'],
            algorithm: totp['algorithm']
        };
    } catch (error) {
        throw error;
    }
}

export default totpRegistraion;
