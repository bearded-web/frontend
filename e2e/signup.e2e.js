'use strict';

function getCmp(name) {
    return element(By.className(name));
}

function byCss(css) {
    return element(By.css(css));
}

function getEmailField() {
    return byCss('input[type=email]');
}
function getPasswordField() {
    return byCss('input[type=password]');
}

describe('Signup page', () => {
    let creds = null;

    before(() => {
        const rnd = Date.now();

        creds = {
            email: `test${rnd}@test.test`,
            password: 'testtesttest'
        };
    });

    beforeEach(() => {
        browser.get('http://localhost:3003/#/signup');
    });

    it('should show email input', () => {
        var email = element(By.css('input[type=email]'));

        return email.isDisplayed().should.eventually.equal(true);
    });
    it('should show password input', () => {
        var password = element(By.css('input[type=password]'));

        return password.isDisplayed().should.eventually.equal(true);
    });

    it('should sign up user', () => {
        const email = element(By.css('input[type=email]'));
        const password = element(By.css('input[type=password]'));
        const btn = byCss('button[type=submit]');

        return email
            .sendKeys(creds.email)
            .then(() => {
                password.sendKeys(creds.password);
            })
            .then(() => {
                return btn.click();
            })
            .then(() => {
                browser.sleep(200);

                return byCss('.c-dashboard').isDisplayed()
                    .should.eventually.be.true;
            });
    });

    it('should login after sign up', () => {
        return byCss('.btn-white').click()
            .then(() => browser.sleep(200))
            .then(() => byCss('button[type=submit]').getText())
            .then(text => text.should.be.eql('Login'))
            .then(() => getEmailField().sendKeys(creds.email))
            .then(() => getPasswordField().sendKeys(creds.password))
            .then(() => byCss('button[type=submit]').click())
            .then(() => browser.sleep(200))
            .then(() => browser.sleep(200))
            .then(() => byCss('.c-dashboard').isDisplayed().should.eventually.equal(true));
    });
});
