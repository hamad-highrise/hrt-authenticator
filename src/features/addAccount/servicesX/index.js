import { errors } from '../../../global';

import helpers from '../../../helpers';
import api from './api';

const { SAMError } = errors;

export default function resgisterDevice(scanned) {
    const isValidMmfaData = helpers.checkQrValidity(scanned);
    if (isValidMmfaData) {
        const accountMetaData = {
            name: '',
            issuer: '',
            type: '',
            secret: '',
            authId: '',
            ignoreSsl: false
        };
        const endpoints = {
            enrollmentEndpoint: '',
            transactionEndpoint: '',
            tokenEndpoint: ''
        };

        accountMetaData.ignoreSsl = helpers.getIgnoreSslOption(
            scanned?.options
        );
    } else {
        return;
    }
}
