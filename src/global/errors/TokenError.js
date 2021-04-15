import constants from './constants';
const { defaultMessages, name } = constants;

const MESSAGE = 'ERROR_WHILE_REQUESTING_TOKEN';

function TokenError({
    message = MESSAGE,
    displayMessage = defaultMessages.TOKEN
}) {
    this.name = name.TOKEN;
    this.message = message;
    this.displayMessage = displayMessage;
}

TokenError.prototype = new Error();

export default TokenError;
