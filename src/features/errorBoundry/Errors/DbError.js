import constants from './constants';

function DbError({ message = 'Database Error' }) {
    this.name = constants.name.DB;
    this.message = message;
}

DbError.prototype = new Error();

export default DbError;
