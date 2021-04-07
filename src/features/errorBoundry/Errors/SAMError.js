import constants from './constants';

function SAMError({ message = 'SAM Error' }) {
    this.name = constants.name.SAM;
    this.message = message;
}

SAMError.prototype = new Error();

export default SAMError;
