'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';
import { fromJS } from 'immutable';

describe.skip('ReferencesForm', function() {
    const url = 'http://google.com';
    const title = 'Cool ref';
    const references = fromJS([
        { url, title }
    ]);
    let Component = null;
    let instance = null;
    let onChange = null;

    beforeEach(function() {
        mockery.registerAllowable('../references-form', true);
        Component = require('../references-form');

        onChange = spy();
        instance = TestUtils.renderIntoDocument(
            <Component onChange={onChange} references={references}/>
        );
    });

    describe('render', function() {
        it('should render 2 inputs', function() {
            nodeByTag(instance, 'input').should.have.length(2);
        });

        it('should render input url', () => {
            nodeByTag(instance, 'input')[0].value
                .should.be.eql(url);
        });

        it('should render input title', () => {
            nodeByTag(instance, 'input')[1].value
                .should.be.eql(title);
        });

        it('should render 6 inputs if 3 refs', () => {
            const references = fromJS([
                { url, title },
                { url, title },
                { url, title }
            ]);
            instance = TestUtils.renderIntoDocument(
                <Component references={references}/>
            );

            nodeByTag(instance, 'input').should.have.length(6);
        });
        it('should render 8 inputs if 4 refs', () => {
            const references = fromJS([
                { url, title },
                { url, title },
                { url, title },
                { url, title }
            ]);
            instance = TestUtils.renderIntoDocument(
                <Component references={references}/>
            );

            nodeByTag(instance, 'input').should.have.length(8);
        });
    });

    describe('onChange', () => {
        it('should call onChange with refs list if url changed', () => {
            const url = 'mail.ru';
            const urlInput = nodeByTag(instance, 'input')[0];

            Simulate.change(urlInput, { target: { value: url } });

            onChange.should.have.been.calledOnce;
            onChange.firstCall.args[0].toJS().should.be.eql([{
                url: url,
                title
            }]);
        });
        it('should call onChange with refs list if title changed', () => {
            const title = 'Hello world';
            const titleInput = nodeByTag(instance, 'input')[1];

            Simulate.change(titleInput, { target: { value: title } });

            onChange.should.have.been.calledOnce;
            onChange.firstCall.args[0].toJS().should.be.eql([{
                url,
                title
            }]);
        });
    });

    describe('onAddClick', () => {
        it('should add new ref', () => {
            Simulate.click(nodeByTag(instance, 'button')[1]);

            onChange.firstCall.args[0].size.should.be.eql(2);
        });
    });

    describe('onRemoveClick', () => {
        it('should remove ref when clicked', () => {
            Simulate.click(nodeByTag(instance, 'button')[0]);

            onChange.firstCall.args[0].size.should.be.eql(0);
        });
    });
});
