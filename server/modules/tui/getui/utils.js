var crypto = require('crypto');

exports.md5 = function(text) {
    return crypto.createHash('md5').update(text).digest('hex');  //hex是编码方式，可以为'hex', 'binary' 或者'base64'
};