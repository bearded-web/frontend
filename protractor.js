require('babel/register')({
    stage: 0
});
require('mochawait');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['e2e/**/*.e2e.js'],

    framework: 'mocha',

    onPrepare: function() {
        browser.ignoreSynchronization = true;
        browser.manage().timeouts().implicitlyWait(2000);
    },

    mochaOpts: {
        reporter: 'spec',
        timeout: 4000
    },

    params: {
        login: {
            email: 'test@test.test',
            password: 'testtest'
        }
    },

    beforeLaunch: function() {
        global.getCmp = function(name) {
            return element(By.className(name));
        };

        global.byCss = function(css) {
            return element(By.css(css));
        };
        var chai = require('chai');
        var chaiAsPromised = require('chai-as-promised');

        chai.use(chaiAsPromised);
        chai.should();
    }
};
