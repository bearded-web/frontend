'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';
import { fromJS } from 'immutable';

function buildInstance(Component, props) {
    const instance = TestUtils.renderIntoDocument(
        <Component {...props}/>
    );

    const nameInput = nodeByTag(instance, 'input')[0];
    const valueInput = nodeByTag(instance, 'input')[1];
    const addButton = nodeByTag(instance, 'button')[0];

    return { instance, nameInput, valueInput, addButton };
}

describe('HeadersForm', function() {
    const headers = fromJS({});
    const name = 'header name';
    const value = 'header value';
    const newValue = 'new header value';

    let Component = null;
    let instance = null;
    let nameInput = null;
    let valueInput = null;
    let onChange = null;
    let addButton = null;

    beforeEach(function() {
        onChange = spy();
        mockery.registerAllowable('../headers-form', true);
        Component = require('../headers-form');

        const res = buildInstance(Component, { headers, onChange });

        instance = res.instance;
        nameInput = res.nameInput;
        valueInput = res.valueInput;
        addButton = res.addButton;
    });


    describe('render', function() {
        it('should render header', () => {
            const headers = fromJS({
                [name]: [value, newValue]
            });

            instance = buildInstance(Component, { headers, onChange }).instance;

            findDOMNode(instance).innerHTML.should.contain(name);
            findDOMNode(instance).innerHTML.should.contain(value);
            findDOMNode(instance).innerHTML.should.contain(newValue);
        });
    });

    describe('onAddClick', () => {
        it('should not call onChange if name empty', () => {
            nameInput.value = '';
            valueInput.value = value;

            Simulate.click(addButton);

            onChange.should.have.not.been.called;
        });
        it('should not call onChange if value empty', () => {
            nameInput.value = name;
            valueInput.value = '';

            Simulate.click(addButton);

            onChange.should.have.not.been.called;
        });

        it('should call props.onChange with new headers', () => {
            nameInput.value = name;
            valueInput.value = value;

            Simulate.click(addButton);

            onChange.firstCall.args[0].toJS().should.be.eql({
                [name]: [value]
            });
        });

        it('should push new value to existing list', () => {
            const headers = fromJS({
                [name]: [value]
            });

            const res = buildInstance(Component, { headers, onChange });

            res.nameInput.value = name;
            res.valueInput.value = newValue;

            Simulate.click(res.addButton);

            onChange.firstCall.args[0].toJS().should.be.eql({
                [name]: [value, newValue]
            });
        });

        it('should clear inputs after add', () => {
            nameInput.value = name;
            valueInput.value = value;

            Simulate.click(addButton);

            nameInput.value.should.be.empty;
            valueInput.value.should.be.empty;
        });
    });

    describe('onRemoveClick', () => {
        it('should remove header', () => {
            const headers = fromJS({
                [name]: [value]
            });

            instance = buildInstance(Component, { headers, onChange }).instance;

            Simulate.click(nodeByTag(instance, 'a')[[0]]);

            onChange.firstCall.args[0].toJS().should.be.eql({});
        });
    });
});
