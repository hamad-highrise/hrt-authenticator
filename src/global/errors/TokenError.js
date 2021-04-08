import constants from './constants';

function TokenError({ message = 'Unknown Error!' }) {
    this.name = constants.name.TOKEN;
    this.message = message;
}

TokenError.prototype = new Error();

export default TokenError;
