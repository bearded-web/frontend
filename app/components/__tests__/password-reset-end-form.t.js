'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('PasswordResetEndForm', function() {
    let password = null;
    let Component = null;
    let instance = null;
    let onSubmit = null;

    beforeEach(function() {
        onSubmit = spy();
        password = 'some password';

        mockery.registerAllowable('../password-reset-end-form', true);
        Component = require('../password-reset-end-form');

        instance = TestUtils.renderIntoDocument(
            <Component onSubmit={onSubmit}/>
        );
    });

    describe('render', function() {
        it('should render disabled button', () => {
            //TODO use should(atr) form
            (nodeByTag(instance, 'button')[0].getAttribute('disabled') !== null)
                .should.be.true;
        });

        it('should enable button if password more then 8 symbols', () => {
            const input = nodeByTag(instance, 'input')[0];

            input.value = password;
            Simulate.change(input);

            (nodeByTag(instance, 'button')[0].getAttribute('disabled') !== null)
                .should.be.false;
        });

        it('should disable input and button id disabled props', () => {
            instance = TestUtils.renderIntoDocument(
                <Component disabled/>
            );

            (nodeByTag(instance, 'button')[0].getAttribute('disabled') !== null)
                .should.be.true;
            (nodeByTag(instance, 'input')[0].getAttribute('disabled') !== null)
                .should.be.true;
        });
    });

    describe('onFormSubmit', function() {
        it('should call onSubmit prop with { password }', () => {
            nodeByTag(instance, 'input')[0].value = password;

            Simulate.submit(nodeByTag(instance, 'form')[0]);

            onSubmit.should.have.been.calledWith({ password });
        });
    });
});
