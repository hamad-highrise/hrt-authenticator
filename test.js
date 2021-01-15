// import parser from './src/util/ui-parser';

const parser = require('./src/util/ui-parser');

const sample = `otpauth://totp/ACME%20Co:john.doe@email.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=ACME%20Co&algorithm=SHA1&digits=6&period=30`;

const result = parser(sample);

console.log(result);
