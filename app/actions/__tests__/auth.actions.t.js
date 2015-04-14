'use strict';

import { stub, spy, mock } from 'sinon';
import mockery from 'mockery';
import C from '../../constants';
import { Map } from 'immutable';

describe('authActions', function() {
    let actions = null;
    let apiMock = null;
    let dispatch = null;

    beforeEach(() => {
        const authApi = {
            logout: () => false
        };

        apiMock = mock(authApi);
        apiMock.expects('logout').once().returns(new Promise(r => r()));
        mockery.registerMock('../lib/api3', {
            auth: apiMock.object
        });

        dispatch = spy();
        mockery.registerMock('../lib/disp', {
            dispatch: dispatch
        });

        mockery.registerAllowable('../auth.actions', true);
        actions = require('../auth.actions');
    });

    describe('loadForTarget', function() {
        it('should call logout', function() {
            actions.logOut();

            apiMock.verify();
        });
    });

    describe('lostAuth', function() {
        it('should dispatch USER_LOST_AUTH', function() {
            actions.lostAuth();

            dispatch.should.have.been.calledWith(C.USER_LOST_AUTH);
        });
    });
});
