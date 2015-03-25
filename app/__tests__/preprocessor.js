var babel = require('babel');
require("babel/register");
module.exports = {
    process: function(src, fPath) {
        if (fPath.indexOf('node_modules') > -1) {
            return src;
        }

        src = src.replace(/^(require\('.*\.less'\);)$/mi, '');

        try {
            var result = babel.transform(src);

            return result.code;
        }
        catch(e) {
            console.log('error in ', src);
            console.error(e);

            return src;
        }

    }
};
