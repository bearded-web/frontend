describe('Login page', function() {


    beforeEach(() => {
        browser.get('http://localhost:3003/');
    });

    it('should show email input', () => {
        const email = element(By.css('input[type=email]'));

        return email.isDisplayed().should.eventually.equal(true);
    });
    it('should show password input', () => {
        var password = element(By.css('input[type=password]'));

        return password.isDisplayed().should.eventually.equal(true);
    });

    it('should show error if wrongs data', () => {
        var email = element(By.css('input[type=email]')),
            password = element(By.css('input[type=password]')),
            btn = byCss('button[type=submit]');

        return email
            .sendKeys(browser.params.login.email)
            .then(() => {
                password.sendKeys(browser.params.login.password + '1');
            })
            .then(() => {
                return btn.click();
            })
            .then(() => {
                browser.sleep(200);

                return byCss('.text-danger').getText()
                    .should.eventually.equal('Wrong email or password');
            });
    });

    it('should login', () => {
        var email = element(By.css('input[type=email]')),
            password = element(By.css('input[type=password]')),
            btn = byCss('button[type=submit]');

        return email
            .sendKeys(browser.params.login.email)
            .then(() => {
                password.sendKeys(browser.params.login.password);
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
});
