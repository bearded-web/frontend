'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';

describe('AuthForm', function() {
    let email = null;
    let password = null;
    let onSubmit = null;
    let Component = null;
    let instance = null;

    beforeEach(function() {
        email = 'test@test.test';
        password = 'some password';
        onSubmit = spy();

        mockery.registerAllowable('../auth-form', true);
        Component = require('../auth-form');

        instance = TestUtils.renderIntoDocument(
            <Component onSubmit={onSubmit}/>
        );
    });

    describe('render', function() {
        it('should disable controls if form disabled', function() {
            const password = 'good password';
            instance = TestUtils.renderIntoDocument(
                <Component disabled/>
            );

            (findDOMNode(byTag(instance, 'button')[0]).getAttribute('disabled') !== null).should.be.true;
            (findDOMNode(byTag(instance, 'input')[0]).getAttribute('disabled') !== null).should.be.true;
            (findDOMNode(byTag(instance, 'input')[1]).getAttribute('disabled') !== null).should.be.true;
        });
        it('should render error', () => {
            const error = 'Some error message';

            instance = TestUtils.renderIntoDocument(
                <Component error={error}/>
            );

            findDOMNode(byClass(instance, 'text-danger')[0]).innerHTML
                .should.be.eql(error);
        });
        it('should render submit button text', () => {
            const label = 'submit label';

            instance = TestUtils.renderIntoDocument(
                <Component submitLabel={label}/>
            );

            findDOMNode(byTag(instance, 'button')[0]).innerHTML
                .should.be.eql(label);
        });
    });

    describe('onSubmit', function() {
        it('should call onSubmit prop with email and password when form submited', function() {
            const node = findDOMNode(byTag(instance, 'form')[0]);

            findDOMNode(byTag(instance, 'input')[0]).value = email;
            findDOMNode(byTag(instance, 'input')[1]).value = password;

            Simulate.submit(node);

            onSubmit.should.have.been.calledWith({ email, password });
        });
    });
});
