import constants from './constants';
const { defaultMessages, name } = constants;

const MESSAGE = 'NATIVE_FUNCTIONALITY_ERROR';

function NativeError({
    message = MESSAGE,
    displayMessage = defaultMessages.NATIVE
}) {
    this.name = name.NATIVE;
    this.message = message;
    this.displayMessage = displayMessage;
}

NativeError.prototype = new Error();

export default NativeError;
