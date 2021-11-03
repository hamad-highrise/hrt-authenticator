//https://github.com/bellstrand/totp-generator
import JsSHA from 'jssha';

/** @module TOTP */

/**
 * 
 * @typedef TOTPOptions
 * @property {string} algorithm - Algorithm to use for generating totp
 * @property {number} period - Interval Period to generate totp
 * @property {numver} digits - TOTP Digits to generate 
 */

/**
 * Function returns Time-based OTP against a given secret which is valid for 30 seconds(default) or for the period provided in the options.
 * @param {String} secret  User Secret
 * @param {TOTPOptions} totpOptions  Options for algorithm
 * @returns OTP valid for a specific period
 */

const totpGenerator = (secret, totpOptions = {}) => {
    let epoch, time, shaObj, hmac, offset, otp;
    //unpacking the options
    totpOptions.period = totpOptions?.period || 30;
    totpOptions.algorithm = totpOptions?.algorithm || 'SHA-1';
    totpOptions.digits = totpOptions?.digits || 6;
    //
    secret = base32tohex(secret);
    epoch = Math.round(Date.now() / 1000.0);
    time = leftpad(dec2hex(Math.floor(epoch / totpOptions.period)), 16, '0');
    shaObj = new JsSHA(totpOptions.algorithm, 'HEX');
    shaObj.setHMACKey(secret, 'HEX');
    shaObj.update(time);
    hmac = shaObj.getHMAC('HEX');
    offset = hex2dec(hmac.substring(hmac.length - 1));
    otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec('7fffffff')) + '';
    otp = otp.substr(otp.length - totpOptions.digits, totpOptions.digits);
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

export default totpGenerator;
