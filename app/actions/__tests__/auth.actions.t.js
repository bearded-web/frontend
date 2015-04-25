'use strict';

import { stub, spy, mock } from 'sinon';
import mockery from 'mockery';
import C from '../../constants';
import { Map } from 'immutable';

describe('authActions', function() {
    let actions = null;
    let api = null;
    let apiMe = null;
    let dispatch = null;
    let token = null;
    let password = null;

    beforeEach(() => {
        token = 'some nice token';
        password = 'secure password';

        api = {
            logout: () => new Promise(r => r()),
            resetPassword: () => new Promise((r, e) => {
                r();
            })
        };

        apiMe = {
            changePassword: () => new Promise(r => r())
        };

        spy(api, 'logout');
        spy(api, 'resetPassword');
        spy(apiMe, 'changePassword');
        mockery.registerMock('../lib/api3', {
            auth: api,
            me: apiMe
        });

        dispatch = spy();
        mockery.registerMock('../lib/disp', {
            dispatch: dispatch
        });

        mockery.registerMock('../router', {
            get: () => ({
                transitionTo: spy()
            })
        });

        mockery.registerAllowable('../auth.actions', true);
        actions = require('../auth.actions');
    });

    describe('loadForTarget', function() {
        it('should call logout', function() {
            actions.logOut();

            api.logout.should.have.been.calledOnce;
        });
    });

    describe('lostAuth', function() {
        it('should dispatch USER_LOST_AUTH', function() {
            actions.lostAuth();

            dispatch.should.have.been.calledWith(C.USER_LOST_AUTH);
        });
    });

    describe('resetPassword', () => {
        let email = null;

        beforeEach(() => {
            email = 'test@email.com';
        });

        it('should dispatch AUTH_RESET_PASSWORD_START', () => {
            actions.resetPassword({ email });

            dispatch.should.have.been.calledWith(C.AUTH_RESET_PASSWORD_START);
        });
        it('should dispatch AUTH_RESET_PASSWORD_SUCCESS', (done) => {
            actions.resetPassword({ email });

            setTimeout(() => {
                dispatch.should.have.been.calledWith(C.AUTH_RESET_PASSWORD_SUCCESS);
                done();
            }, 1);
        });
        it('should dispatch AUTH_RESET_PASSWORD_FAIL with error', (done) => {
            mockery.deregisterAll();

            const message = 'error message';
            const resetPassword = () => new Promise((r, e) => e({ Message: message }));

            const auth = { resetPassword };

            spy(auth, 'resetPassword');
            mockery.registerMock('../lib/api3', { auth });

            dispatch = spy();
            mockery.registerMock('../lib/disp', { dispatch });

            mockery.registerAllowable('../auth.actions', true);
            actions = require('../auth.actions');

            actions.resetPassword({ email });

            setTimeout(() => {
                dispatch.should.have.been.calledWith(C.AUTH_RESET_PASSWORD_FAIL, { message });
                done();
            }, 1);
        });
    });

    describe('setNewPassword', () => {
        it('should dispatch AUTH_NEW_PASSWORD_START', () => {
            actions.setNewPassword(token, password);
            dispatch.should.have.been.calledWith(C.AUTH_NEW_PASSWORD_START);
        });

        it('should call api.me.passwordChange with token and password', () => {
            actions.setNewPassword(token, password);

            apiMe.changePassword.should.be.calledWith({
                token,
                new: password
            });
        });

        it('should dispatch AUTH_NEW_PASSWORD_SUCCESS', (done) => {
            actions.setNewPassword(token, password);

            setTimeout(() => {
                dispatch.should.have.been.calledWith(C.AUTH_NEW_PASSWORD_SUCCESS);
                done();
            }, 1);
        });

        it('should dispatch error', (done) => {
            mockery.deregisterAll();

            const message = 'error message';
            const changePassword = () => new Promise((r, e) => e({ Message: message }));

            const me = { changePassword };

            spy(me, 'changePassword');
            mockery.registerMock('../lib/api3', { me });

            dispatch = spy();
            mockery.registerMock('../lib/disp', { dispatch });

            mockery.registerAllowable('../auth.actions', true);
            actions = require('../auth.actions');

            actions.setNewPassword(token, password);

            setTimeout(() => {
                dispatch.should.have.been.calledWith(C.AUTH_NEW_PASSWORD_FAIL, { message });
                done();
            }, 1);
        });
    });
});
