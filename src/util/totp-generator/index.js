//Copied from https://github.com/bellstrand/totp-generator
import JsSHA from 'jssha';

/**
 * Function returns Time-based OTP against a given secret which is valid for 30 seconds(default) or for the period provided in the options.
 * @param {String} secret  User Secret
 * @param {{algorithm?: String, period?: Number, digits?: Number}} options  Options for algorithm
 * @returns OTP valid for a specific period
 */

const getTokenGenerator = (secret, options = {}) => {
    let epoch, time, shaObj, hmac, offset, otp;
    //unpacking the options
    options.period = options.period || 30;
    options.algorithm = options.algorithm || 'SHA-1';
    options.digits = options.digits || 6;
    //
    secret = base32tohex(secret);
    epoch = Math.round(Date.now() / 1000.0);
    time = leftpad(dec2hex(Math.floor(epoch / options.period)), 16, '0');
    shaObj = new JsSHA(options.algorithm, 'HEX');
    shaObj.setHMACKey(secret, 'HEX');
    shaObj.update(time);
    hmac = shaObj.getHMAC('HEX');
    offset = hex2dec(hmac.substring(hmac.length - 1));
    otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec('7fffffff')) + '';
    otp = otp.substr(otp.length - options.digits, options.digits);
    return otp;
};

function hex2dec(s) {
    return parseInt(s, 16);
}

function dec2hex(s) {
    return (s < 15.5 ? '0' : '') + Math.round(s).toString(16);
}

function base32tohex(base32) {
    let base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
        bits = '',
        hex = '';

    for (let i = 0; i < base32.length; i++) {
        let val = base32chars.indexOf(base32.charAt(i).toUpperCase());
        bits += leftpad(val.toString(2), 5, '0');
    }

    for (let i = 0; i + 4 <= bits.length; i += 4) {
        let chunk = bits.substr(i, 4);
        hex = hex + parseInt(chunk, 2).toString(16);
    }
    return hex;
}

function leftpad(str, len, pad) {
    if (len + 1 >= str.length) {
        str = Array(len + 1 - str.length).join(pad) + str;
    }
    return str;
}

export default getTokenGenerator;

// timer function
function timer() {
    var epoch = Math.round(new Date().getTime() / 1000.0);
    var countDown = 30 - (epoch % 30);
    if (epoch % 30 == 0) updateOtp();
}
