import constants from './constants';
const { defaultMessages, name } = constants;

const MESSAGE = 'CERTIFICATE_ERROR';

function CertsError({
    message = MESSAGE,
    displayMessage = defaultMessages.CERTS
}) {
    this.name = name.CERTS;
    this.message = message;
    this.displayMessage = displayMessage;
}

CertsError.prototype = new Error();

export default CertsError;
