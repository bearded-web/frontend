'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';
import { last } from 'lodash';
import { fromJS } from 'immutable';

describe.skip('TargetCreateForm', function() {
    const url = 'http://domain.com';
    const target = fromJS({
        type: 'web'
    });

    let Component = null;
    let instance = null;
    let onSubmit = null;
    let input = null;
    let button = null;

    const getInput = (instance) => nodeByTag(instance, 'input')[0];
    const getButton = (instance) => last(nodeByTag(instance, 'button'));

    beforeEach(function() {
        onSubmit = spy();

        mockery.registerAllowable('../target-create-form', true);
        Component = require('../target-create-form');

        instance = TestUtils.renderIntoDocument(
            <Component onSubmit={onSubmit} target={target}/>
        );

        input = getInput(instance);
        button = getButton(instance);
    });

    describe.skip('error', () => {
        const error = 'some error';

        beforeEach(() => {
            instance = TestUtils.renderIntoDocument(
                <Component target={target} error={error}/>
            );
        });

        it('should render error', function() {
            nodeByClass(instance, 'text-danger')[0].innerHTML
                .should.contain(error);
        });

        it('should add has-error class to input', () => {
            nodeByClass(instance, 'form-group')[0].className
                .should.contain('has-error');
        });
    });

    describe.skip('button', () => {

        it('should be disabled if input empty', () => {
            should.exist(button.getAttribute('disabled'));
        });

        it('should be disabled if input is not domain', () => {
            input.value = 'not domain';
            Simulate.change(input);
            should.exist(button.getAttribute('disabled'));
        });

        it('should be enabled if input with domain', () => {
            input.value = url;
            Simulate.change(input);
            should.not.exist(button.getAttribute('disabled'));
        });
        it('should be disabled if disabled prop', () => {
            instance = TestUtils.renderIntoDocument(
                <Component target={target} disabled/>
            );
            const input = getInput(instance);
            const button = getButton(instance);
            input.value = url;
            Simulate.change(input);
            should.exist(button.getAttribute('disabled'));
        });
    });



    describe('onSubmit', () => {

        let form = null;

        beforeEach(() => {
            form = nodeByTag(instance, 'form')[0];
        });

        it('should call onSubmit({ url })', () => {
            input.value = url;
            Simulate.change(input);
            Simulate.submit(form);

            onSubmit.should.have.been.calledWith({ url });
        });
    });
});
