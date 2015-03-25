// spec.js
describe('Login page', function() {

    function getCmp(name) {
        return element(By.className(name));
    }

    function byCss(css) {
        return element(By.css(css));

    }

    beforeEach(function() {
        browser.get('http://localhost:3003/');
    });

    it('must show login form', function() {
        expect(getCmp('auth-overlay').isDisplayed()).toBeTruthy();
    });

    it('must show error if wrongs data', function() {
        var email = element(By.css('input[type=email]')),
            password = element(By.css('input[type=password]')),
            btn = byCss('button[type=submit]');


        email
            .sendKeys(browser.params.login.email)
            .then(function() {
                password.sendKeys(browser.params.login.password);
            })
            .then(function() {
                return btn.click();
            })
            .then(function() {
                browser.sleep(200);
                expect(getCmp('c-dashboard').isDisplayed()).toBeTruthy();
            });
    });

    it('must logout', function() {
        var logoutBtn = byCss('.navbar--logout');

        logoutBtn
            .click()
            .then(function() {
                browser.sleep(200)
            })
            .then(function() {
                expect(getCmp('auth-overlay').isDisplayed()).toBeTruthy();
            })
    });
});
