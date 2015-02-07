var ReactTools = require('react-tools');

module.exports = {
    process: function(src, fPath) {
        if (fPath.indexOf('node_modules') > -1) {
            return src;
        }

        src = src.replace(/^(require\('.*\.less'\);)$/mi, '');

        try {
            return ReactTools.transform(src, { harmony: true });
        }
        catch(e) {
            console.log('error in ', src);
            console.error(e);

            return src;
        }

    }
};
