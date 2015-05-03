'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';
import { fromJS } from 'immutable';

describe('EntityForm', function() {
    const status = '200 OK';
    const content = 'body content text';
    const contentEncoding = 'text';

    let Component = null;
    let instance = null;
    let onChange = null;
    let buildWithEntity = null;

    beforeEach(function() {
        mockery.registerAllowable('../entity-form', true);
        Component = require('../entity-form');

        onChange = spy();


        buildWithEntity = entity => TestUtils.renderIntoDocument(
            <Component onChange={onChange} entity={fromJS(entity)}/>
        );

        instance = buildWithEntity({});
    });

    describe('render', function() {
        it('should render body content', function() {
            instance = buildWithEntity({
                status,
                body: {
                    content,
                    contentEncoding
                }
            });

            nodeByTag(instance, 'textarea')[0].value.should.be.eql(content);
        });
    });

    describe('onBodyChange', () => {
        it('should call onChange with body content & contentEncoding', () => {
            instance = buildWithEntity({
                status
            });

            const bodyInput = nodeByTag(instance, 'textarea')[0];

            Simulate.change(bodyInput, { target: { value: content } });

            onChange.firstCall.args[0].toJS().should.be.eql({
                status,
                body: {
                    content,
                    contentEncoding: 'text'
                }
            });
        });

        it('should call onChange with empty body if empty content', () => {
            instance = buildWithEntity({
                status,
                body: {
                    content,
                    contentEncoding
                }
            });

            const bodyInput = nodeByTag(instance, 'textarea')[0];

            Simulate.change(bodyInput, { target: { value: '' } });

            onChange.firstCall.args[0].toJS().should.be.eql({
                status
            });
        });
    });
});
