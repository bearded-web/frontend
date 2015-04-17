'use strict';

import { Map, fromJS, OrderedMap } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';


describe('PasswordResetEndPage', function() {
    const error = 'some error';
    const token = 'testToken';

    let Component = null;
    let instance = null;
    let setNewPassword = null;
    let PasswordResetEndForm = null;

    beforeEach(function() {
        setNewPassword = spy();

        mockery.registerMock('../actions/auth.actions', {
            setNewPassword
        });

        mockery.registerMock('../stores/auth.store', storeMock);

        mockery.registerMock('./auth-page-layout', MockComponent);

        mockery.registerAllowable('../password-reset-end-form', true);
        PasswordResetEndForm = require('../password-reset-end-form');

        mockery.registerAllowable('../password-reset-end-page', true);
        Component = require('../password-reset-end-page');

        const Subject = stubRouterContext(Component, {}, {
            getCurrentQuery() {
                return { token };
            }
        });
        instance = TestUtils.renderIntoDocument(
            <Subject/>
        );
        instance = byType(instance, Component)[0];
    });

    describe('render', () => {
        it('should render error from url query', () => {
            const Subject = stubRouterContext(Component, {}, {
                getCurrentQuery() {
                    return { error };
                }
            });
            instance = TestUtils.renderIntoDocument(
                <Subject/>
            );
            instance = byType(instance, Component)[0];

            nodeByClass(instance, 'text-danger')[0].innerHTML.should.contain(error);
        });

        it('should render error if token not provided', () => {
            const Subject = stubRouterContext(Component, {}, {
                getCurrentQuery() {
                    return {};
                }
            });
            instance = TestUtils.renderIntoDocument(
                <Subject/>
            );
            instance = byType(instance, Component)[0];

            nodeByClass(instance, 'text-danger')[0].innerHTML.should.contain('Token not provided');
        });

        it('should render form if token provided', () => {
            const form = byType(instance, PasswordResetEndForm)[0];

            form.props.token.should.be.eql(token);
        });
    });

    describe('onSubmit', () => {
        it('should call setNewPassword action', () => {
            const password = 'test pwd';
            const form = byType(instance, PasswordResetEndForm)[0];

            form.props.onSubmit({ password });

            setNewPassword.should.have.been.calledWith(token, password);
        });
    });
});
