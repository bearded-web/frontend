'use strict';

import { stub, spy, mock } from 'sinon';
import { Map } from 'immutable';
import mockery from 'mockery';
import C from '../../constants';

describe('settingsActions', function() {
    let password = 'smp11';
    let oldPassword = 'smp11';

    let actions = null;
    let apiMock = null;
    let dispatch = null;
    let meApi = null;
    let settingsStore = null;

    beforeEach(() => {
        password = 'smp111232';
        oldPassword = 'smp111232';

        meApi = {
            changePassword: () => new Promise((r, e) => {
                r();
                e();
            })
        };
        spy(meApi, 'changePassword');
        mockery.registerMock('../lib/api3', {
            me: meApi
        });

        settingsStore = { getState() {
            return {
                password,
                oldPassword
            };
        } };
        spy(settingsStore, 'getState');
        mockery.registerMock('../stores/user-settings.store', settingsStore);

        dispatch = spy();
        mockery.registerMock('../lib/disp', {
            dispatch: dispatch
        });

        mockery.registerAllowable('../settings.actions', true);
        actions = require('../settings.actions');
    });

    describe('updateSettings', function() {


        it('should dispatch US_OLD_PASSWORD_FIELD_CHANGE', function() {
            actions.updateSettings({ password, oldPassword });

            dispatch.should.have.been.calledWith(C.US_OLD_PASSWORD_FIELD_CHANGE, {
                oldPassword
            });
        });

        it('should dispatch US_PASSWORD_FIELD_CHANGE', function() {
            actions.updateSettings({ password, oldPassword });

            dispatch.should.have.been.calledWith(C.US_PASSWORD_FIELD_CHANGE, {
                password
            });
        });
    });

    describe('changePassword', function() {
        it('should dispatch US_PASSWORD_CHANGE_START', function() {
            actions.changePassword({ password, oldPassword });
            dispatch.should.have.been.calledWith(C.US_PASSWORD_CHANGE_START);
        });

        it('should call api', function() {
            actions.changePassword({ password, oldPassword });

            meApi.changePassword.should.have.been.calledWith({
                old: oldPassword,
                'new': password
            });
        });

        it('should dispatch US_PASSWORD_CHANGE_SUCCESS', function(done) {
            actions.changePassword({ password, oldPassword });

            setTimeout(() => {
                dispatch.should.have.been.calledWith(C.US_PASSWORD_CHANGE_SUCCESS);
                done();
            }, 1);
        });
    });
});
