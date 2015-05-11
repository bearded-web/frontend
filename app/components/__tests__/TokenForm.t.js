import { spy } from 'sinon';
import mockery from 'mockery';

describe('TokenForm', function() {
    const name = 'token name';

    let Component = null;
    let instance = null;
    let createToken = null;
    let input = null;

    beforeEach(function() {
        createToken = spy();
        mockery.registerMock('../actions/tokensActions', {
            createToken
        });

        mockery.registerAllowable('../TokenForm', true);
        Component = require('../TokenForm');

        instance = TestUtils.renderIntoDocument(
            <Component/>
        );

        input = nodeByTag(instance, 'input')[0];
    });

    describe('onSubmit', () => {
        it('should call createToken action with name', () => {
            input.value = name;
            Simulate.change(input);
            Simulate.submit(nodeByTag(instance, 'form')[0]);

            createToken.should.have.been.calledWith(name);
        });

        it('should not call createToken action if no name entered', () => {
            input.value = '';
            Simulate.change(input);
            Simulate.submit(nodeByTag(instance, 'form')[0]);

            createToken.should.have.not.been.called;
        });

        it('should clear input after submit', () => {
            input.value = name;
            Simulate.change(input);
            Simulate.submit(nodeByTag(instance, 'form')[0]);

            input.value.should.be.empty;
        });
    });

    describe('button', () => {
        let button;

        beforeEach(() => {
            button = nodeByTag(instance, 'button')[0];
        });

        it('should be disabled by default', () => {
            should.exist(button.getAttribute('disabled'));
        });

        it('should be enabled after input changed', () => {
            input.value = name;
            Simulate.change(input);

            should.not.exist(button.getAttribute('disabled'));
        });
    });
});
