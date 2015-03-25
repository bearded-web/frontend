/*global browser*/
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['e2e/**/*.e2e.js'],

    onPrepare: function() {
        browser.ignoreSynchronization = true;
        browser.manage().timeouts().implicitlyWait(2000);
    },

    params: {
        login: {
            email: 'slonoed@gmail.com',
            password: '12345678'
        }
    }
};
