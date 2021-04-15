import constants from './constants';
const { defaultMessages, name } = constants;

const MESSAGE = 'ERROR_RETURNED_FROM_SAM';
function SAMError({ message = MESSAGE, displayMessage = defaultMessages.SAM }) {
    this.name = name.SAM;
    this.message = message;
    this.displayMessage = displayMessage;
}

SAMError.prototype = new Error();

export default SAMError;
