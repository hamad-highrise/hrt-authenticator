import constants from './constants';

function NetworkError({ message = 'Unknown Error!' }) {
    this.name = constants.name.NETWORK;
    this.message = 'Connectivity Problem';
}

NetworkError.prototype = new Error();

export default NetworkError;
