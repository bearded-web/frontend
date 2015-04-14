'use strict';

import { Map, fromJS } from 'immutable';
import { spy } from 'sinon';

describe('DefaultStepForm', function() {
    const plugin = fromJS({
        name: 'test-plugin',
        id: 'some id'
    });
    const step = fromJS({
        id: 'some plan id',
        conf: {
            formData: '{}'
        }
    });
    const formSchema = JSON.stringify({
        type: 'object',
        properties: {
            name: {
                type: 'string'
            }
        }
    });

    var defaultStepForm = null;
    var DefaultStepForm = null;
    var onChange = null;

    before(function() {
        DefaultStepForm = require('../default-step-form');
    });


    beforeEach(function() {
        onChange = spy();

        defaultStepForm = TestUtils.renderIntoDocument(
            <DefaultStepForm plugin={plugin}
                             step={step}
                             onChange={onChange}/>
        );
    });

    describe('render', function() {
        it('should render empty span if no schema', function() {
            findDOMNode(defaultStepForm).innerHTML.should.be.empty;
            findDOMNode(defaultStepForm).tagName.should.be.eql('SPAN');
        });

        it('should render empty span if invalid json in schema', function() {
            const plugin = fromJS({
                id: 'some plugin is',
                formSchema: 'invalid json string'
            });

            defaultStepForm = TestUtils.renderIntoDocument(
                <DefaultStepForm plugin={plugin}
                                 step={step}
                                 onChange={onChange}/>
            );

            findDOMNode(defaultStepForm).innerHTML.should.be.empty;
            findDOMNode(defaultStepForm).tagName.should.be.eql('SPAN');
        });

        it('should render form with one input', function() {
            const plugin = fromJS({
                id: 'some plugin is',
                formSchema
            });

            defaultStepForm = <DefaultStepForm plugin={plugin}
                                               step={step}
                                               onChange={onChange}/>;

            defaultStepForm = TestUtils.renderIntoDocument(
                defaultStepForm
            );

            const inputs = byTag(defaultStepForm, 'input');

            inputs.should.have.length(1);
        });

        it('should render form with input and select', function() {
            const formSchema = JSON.stringify({
                type: 'object',
                properties: {
                    name: {
                        type: 'string'
                    },
                    street: {
                        type: 'string',
                        enum: ['Street', 'Avenue', 'Boulevard']
                    }
                }
            });
            const plugin = fromJS({
                id: 'some plugin id',
                formSchema
            });

            defaultStepForm = <DefaultStepForm plugin={plugin}
                                               step={step}
                                               onChange={onChange}/>;

            defaultStepForm = TestUtils.renderIntoDocument(
                defaultStepForm
            );

            const inputs = byTag(defaultStepForm, 'input');
            inputs.should.have.length(1);

            const selects = byTag(defaultStepForm, 'select');
            inputs.should.have.length(1);
        });

        it('should render input with value', function() {
            const plugin = fromJS({
                id: 'some plugin id',
                formSchema
            });

            const name = 'test name';
            const step = fromJS({
                conf: {
                    formData: JSON.stringify({ name })
                }
            });

            defaultStepForm = <DefaultStepForm plugin={plugin}
                                               step={step}
                                               onChange={onChange}/>;

            defaultStepForm = TestUtils.renderIntoDocument(
                defaultStepForm
            );

            const input = byTag(defaultStepForm, 'input')[0];

            input.getDOMNode().value.should.be.eql(name);
        });

        it('should render input without value if invalid json in data', function() {
            const plugin = fromJS({
                formSchema,
                id: 's'
            });
            const step = fromJS({
                conf: {
                    formData: 'invalid data'
                }
            });

            defaultStepForm = <DefaultStepForm plugin={plugin}
                                               step={step}
                                               onChange={onChange}/>;

            defaultStepForm = TestUtils.renderIntoDocument(
                defaultStepForm
            );

            const input = byTag(defaultStepForm, 'input')[0];

            input.getDOMNode().value.should.be.eql('');
        });

        it('should call onChange when input changed', function() {
            const plugin = fromJS({
                formSchema,
                id: 's'
            });

            defaultStepForm = <DefaultStepForm plugin={plugin}
                                               step={step}
                                               onChange={onChange}/>;

            defaultStepForm = TestUtils.renderIntoDocument(
                defaultStepForm
            );

            const input = byTag(defaultStepForm, 'input')[0];
            const name = 'test name';

            TestUtils.Simulate.change(input, { target: { value: name } });

            const fd = onChange.args[0][0].getIn(['conf', 'formData']);

            JSON.parse(fd).name.should.be.eql(name);
        });
    });
});
