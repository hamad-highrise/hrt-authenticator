import constants from './constants';
const { defaultMessages, name } = constants;

const MESSAGE = 'DATABASE_ACCESS_ERROR';

function DbError({ message = MESSAGE, displayMessage = defaultMessages.DB }) {
    this.name = name.DB;
    this.message = message;
    this.displayMessage = displayMessage;
}

DbError.prototype = new Error();

export default DbError;
