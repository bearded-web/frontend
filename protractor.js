'use strict';

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
        require('babel/register');
        var chai = require('chai');
        var chaiAsPromised = require('chai-as-promised');

        chai.use(chaiAsPromised);
        chai.should();
    }
};
