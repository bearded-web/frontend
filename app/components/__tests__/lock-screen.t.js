import { Map } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';

describe.skip('LockScreen', function() {
    const errorText = 'Login error text';
    const userData = {
        email: 'test@example.com',
        avatar: 'test',
        id: '324324'
    };
    const user = Map(userData);
    const unlock = spy();
    const logOut = spy();

    var lockScreen = null;
    var LockScreen = null;

    before(function() {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: false
        });

        mockery.registerMock('../actions/auth.actions', {
            unlock,
            logOut
        });

        LockScreen = require('../lock-screen');
    });


    beforeEach(function() {
        lockScreen = TestUtils.renderIntoDocument(
            <LockScreen user={user} loginError={errorText}/>
        );
    });

    after(function() {
        mockery.deregisterAll();
        mockery.disable();
    });


    describe('render', function() {
        it('should render error if passed', function() {
            const help = byClass(
                lockScreen,
                'help-block'
            )[0];

            findDOMNode(help).innerHTML
                .should.be.eql(errorText);
        });

        it('should render user email', function() {
            const title = byTag(
                lockScreen,
                'h3'
            )[0];

            findDOMNode(title).innerHTML
                .should.contain(userData.email);
        });

        it('should render avatar', function() {
            const avatar = byTag(
                lockScreen,
                'img'
            )[0];

            findDOMNode(avatar).getAttribute('src')
                .should.be.eql(userData.avatar);
        });
    });

    describe('onSubmit', function() {
        it('should call logIn when form sended', function() {
            const inputEl = findDOMNode(byTag(lockScreen, 'input')[0]);
            const form = findDOMNode(byTag(lockScreen, 'form')[0]);
            const pwd = 'testpassword';

            inputEl.value = pwd;

            TestUtils.Simulate.submit(form);

            unlock.should.have.been.calledWith(userData.email, pwd);
        });
    });

    describe('onLoginLinkClick', function() {
        it('should call logOut action when link clicked', function() {
            const btn = byTag(lockScreen, 'a')[0];
            const btnEl = findDOMNode(btn);

            TestUtils.Simulate.click(btnEl);

            logOut.should.have.been.calledOnce;
        });
    });
});
