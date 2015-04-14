'use strict';

import { Map, fromJS, OrderedMap } from 'immutable';
import { spy } from 'sinon';
import mockery from 'mockery';
import { HIGH } from '../../lib/severities';

describe('ProfileNav', function() {
    const avatar = 'http://example.com/avatar.png';
    const nickname = 'Superman';

    let Component = null;
    let instance = null;
    let user = null;
    let logOut = null;

    beforeEach(function() {
        user = Map({
            avatar,
            nickname,
            id: 'someid'
        });
        logOut = spy();

        mockery.registerMock('../actions/auth.actions', {
            logOut
        });

        mockery.registerAllowable('../profile-nav', true);
        Component = require('../profile-nav');

        instance = TestUtils.renderIntoDocument(
            <Component user={user}/>
        );
    });

    describe('render', function() {
        it('should render avatar', function() {
            findDOMNode(byTag(instance, 'img')[0]).getAttribute('src')
                .should.be.eql(avatar);
        });

        it('should render nickname', function() {
            findDOMNode(instance).innerHTML.should.contain(nickname);
        });
    });

    describe('.onLogoutClick()', function() {
        it('should call logOut action', function() {
            instance.onLogoutClick();

            logOut.should.have.been.calledOnce;
        });
    });
});
