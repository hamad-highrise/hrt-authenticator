import constants from './constants';
const { defaultMessages, name } = constants;

const MESSAGE = 'CONNECTIVITY_PROBLEM';

function NetworkError({
    message = MESSAGE,
    displayMessage = defaultMessages.NETWORK
}) {
    this.name = name.NETWORK;
    this.message = message;
    this.displayMessage = displayMessage;
}

NetworkError.prototype = new Error();

export default NetworkError;
