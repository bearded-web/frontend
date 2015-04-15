'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('ChangePasswordForm', function() {
    let password = null;
    let oldPassword = null;
    let Component = null;
    let instance = null;
    let updateSettings = null;
    let changePassword = null;

    beforeEach(function() {
        password = 'some password';
        oldPassword = 'old pwd';
        updateSettings = spy();
        changePassword = spy();

        mockery.registerMock('../actions/settings.actions', {
            updateSettings,
            changePassword
        });

        mockery.registerAllowable('../change-password-form', true);
        Component = require('../change-password-form');

        instance = TestUtils.renderIntoDocument(
            <Component password={password} oldPassword={oldPassword}/>
        );
    });

    describe('render', function() {
        it('should render password input', function() {
            findDOMNode(byTag(instance, 'input')[1]).value
                .should.be.eql(password);
        });
        it('should render old password input', function() {
            findDOMNode(byTag(instance, 'input')[0]).value
                .should.be.eql(oldPassword);
        });
        it('should disable button if passwords less then 6 chars', function() {
            password = 'less6';
            instance = TestUtils.renderIntoDocument(
                <Component password={password} oldPassword={password}/>
            );
            const node = findDOMNode(byTag(instance, 'button')[0]);

            node.getAttribute('disabled').should.exist;
        });

        it('should disable controls if form disabled', function() {
            const password = 'good password';
            instance = TestUtils.renderIntoDocument(
                <Component password={password} oldPassword={password} disabled/>
            );

            (findDOMNode(byTag(instance, 'button')[0]).getAttribute('disabled') !== null).should.be.true;
            (findDOMNode(byTag(instance, 'input')[0]).getAttribute('disabled') !== null).should.be.true;
            (findDOMNode(byTag(instance, 'input')[1]).getAttribute('disabled') !== null).should.be.true;
        });

        it('should render error', () => {
            const error = 'Some error message';

            instance = TestUtils.renderIntoDocument(
                <Component
                    password={password}
                    oldPassword={password}
                    error={error}/>
            );

            findDOMNode(byClass(instance, 'text-danger')[0]).innerHTML
                .should.be.eql(error);
        });
    });

    describe('onFieldChange', function() {
        it('should call updateSettings action', function() {
            const pwdNode = findDOMNode(byTag(instance, 'input')[1]);

            pwdNode.value = password;
            findDOMNode(byTag(instance, 'input')[0]).value = oldPassword;

            Simulate.change(pwdNode);
            updateSettings.should.have.been.calledWith({ password, oldPassword });
        });
    });

    describe('onFormSubmit', function() {
        it('should call changePassword action when form submited', function() {
            const node = findDOMNode(byTag(instance, 'form')[0]);

            Simulate.submit(node);

            changePassword.should.have.been.calledWith({ password, oldPassword });
        });
        //it('should call changePassword action when btn click', function() {
        //    const node = findDOMNode(byTag(instance, 'button')[0]);
        //
        //    //TODO this not work, find workaround
        //    Simulate.click(node);
        //
        //    changePassword.should.have.been.calledWith({ password, oldPassword });
        //});
    });
});
