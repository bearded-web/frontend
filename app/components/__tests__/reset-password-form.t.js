'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('ResetPasswordForm', function() {
    let Component = null;
    let instance = null;
    let onSubmit = null;
    let error = null;

    beforeEach(function() {
        mockery.registerAllowable('../password-reset-form', true);
        Component = require('../password-reset-form');
        onSubmit = spy();
        error = 'some error';
        instance = TestUtils.renderIntoDocument(
            <Component onSubmit={onSubmit} error={error}/>
        );
    });

    describe('render', function() {
        it('should render error', () => {
            findDOMNode(byClass(instance, 'text-danger')[0]).innerHTML
                .should.be.eql(error);
        });

        it('should render enabled input', () => {
            (findDOMNode(byTag(instance, 'input')[0]).getAttribute('disabled') !== null).should.be.false;
        });
        it('should render enabled button', () => {
            (findDOMNode(byTag(instance, 'button')[0]).getAttribute('disabled') !== null).should.be.false;
        });

        it('should disable input if disabled prop', () => {
            instance = TestUtils.renderIntoDocument(
                <Component onSubmit={onSubmit} disabled/>
            );

            (findDOMNode(byTag(instance, 'input')[0]).getAttribute('disabled') !== null).should.be.true;
        });

        it('should disable button if disabled prop', () => {
            instance = TestUtils.renderIntoDocument(
                <Component onSubmit={onSubmit} disabled/>
            );

            (findDOMNode(byTag(instance, 'button')[0]).getAttribute('disabled') !== null).should.be.true;
        });
    });

    describe('onSubmit', function() {
        it('should call onSubmit prop with { email } when form submit', () => {
            const email = 'test@email.com';

            findDOMNode(byTag(instance, 'input')[0]).value = email;

            const form = findDOMNode(byTag(instance, 'form')[0]);

            Simulate.submit(form);

            onSubmit.should.have.been.calledWith({ email });
        });
    });
});
