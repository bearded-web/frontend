describe.only('SettingsPage', () => {
    before(async function() {
        await browser.get('http://localhost:3003/');

        const email = element(By.css('input[type=email]')),
            password = element(By.css('input[type=password]')),
            btn = byCss('button[type=submit]');

        email.sendKeys(browser.params.login.email);
        password.sendKeys(browser.params.login.password);
        btn.click();
        await browser.sleep(200);
        byCss('.c-dashboard').isDisplayed();
        browser.get('http://localhost:3003/#/settings');
        await browser.sleep(200);
        await byCss('h2').isDisplayed();
    });


    it('should open page', async function() {
        const h2s = await element.all(By.css('.page-wrapper h2'));
        const text = await h2s[0].getText();

        text.should.be.eql('Settings');
    });

    describe('tokens', () => {
        it('should and new token', async function() {
            const tokenName = 'token name token token';
            const input = element.all(By.css('input')).last();

            await input.sendKeys(tokenName).sendKeys(protractor.Key.ENTER);

            const strong = element.all(By.css('.ibox')).last().element(By.css('strong'));

            const text = await strong.getText();

            text.should.be.eql(tokenName);
        });

        it('should delete token', async function() {

        });
    });
});
