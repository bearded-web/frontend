var ReactTools = require('react-tools');
module.exports = {
    process: function(src) {
        // remove require(*.lees)

        src = src.replace(/^(require\('.*\.less'\);)$/mi, '');

        try {
            var result = ReactTools.transform(src, { harmony: true });
        }
        catch(e) {
            console.log('error in ', src);
            console.error(e);
        }

        return result;
    }
};
