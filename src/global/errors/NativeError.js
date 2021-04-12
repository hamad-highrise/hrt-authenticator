import constants from './constants';

function NativeError({ message = 'Unknown Error!' }) {
    this.name = constants.name.NATIVE;
    this.message = message;
}

NativeError.prototype = new Error();

export default NativeError;
