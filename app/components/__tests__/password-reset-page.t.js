'use strict';

import { Map, fromJS, OrderedMap } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';

describe('PasswordResetPage', function() {
    const avatar = 'http://example.com/avatar.png';
    const nickname = 'Superman';

    let Component = null;
    let instance = null;
    let resetPassword = null;
    let transitionTo = null;

    beforeEach(function() {
        resetPassword = spy();
        mockery.registerMock('../actions/auth.actions', {
            resetPassword
        });

        mockery.registerMock('./auth-page-layout', MockComponent);
        mockery.registerMock('../stores/auth.store', {
            getState() {
                return {};
            },
            onChange(){},
            offChange(){}
        });

        mockery.registerAllowable('../password-reset-page', true);
        Component = require('../password-reset-page');

        transitionTo = spy();
        const Subject = stubRouterContext(Component, {}, {
            transitionTo: transitionTo
        });
        instance = TestUtils.renderIntoDocument(
            <Subject/>
        );
        instance = byType(instance, Component)[0];
    });

    describe('.onSubmit()', function() {
        it('should call resetPassword action with email', function() {
            const email = 'email@email.com';

            instance.onSubmit({ email });

            resetPassword.should.have.been.calledWith({ email });
        });
    });

});
