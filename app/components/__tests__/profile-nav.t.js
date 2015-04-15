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
    let transitionTo = null;

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

        transitionTo = spy();
        const Subject = stubRouterContext(Component, { user }, {
            transitionTo: transitionTo
        });
        instance = TestUtils.renderIntoDocument(
            <Subject/>
        );
        instance = byType(instance, Component)[0];
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

    describe('.onSettingsClick()', function() {
        it('should transit user to settings page', function() {
            const isSettings = el => {
                const node = findDOMNode(el);

                return node &&
                    (node.tagName === 'A') &&
                    (node.textContent === 'Settings');
            };
            const el = TestUtils.findAllInRenderedTree(instance, isSettings)[0];

            const node = findDOMNode(el);

            Simulate.click(node);

            transitionTo.should.have.been.calledWith('user-settings');
        });
    });
});
