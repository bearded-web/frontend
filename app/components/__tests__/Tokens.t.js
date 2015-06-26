import { spy } from 'sinon';
import mockery from 'mockery';
import { fromJS } from 'immutable';

describe.skip('Tokens', function() {
    const value = 'token value';
    const id = 'token id';
    const tokens = fromJS({
        'id1': { id, name: 'name1', value }
    });

    let Component = null;
    let instance = null;
    let fetchTokens = null;

    beforeEach(function() {
        fetchTokens = spy();
        mockery.registerMock('../actions/tokensActions', {
            fetchTokens
        });

        mockery.registerMock('./TokensList', MockComponent);

        mockery.registerAllowable('../Tokens', true);
        Component = require('../Tokens');

        instance = TestUtils.renderIntoDocument(
            <Component tokens={tokens}/>
        );
    });

    describe('render', () => {
        it('should call fetchTokens after mount', () => {
            fetchTokens.should.have.been.calledOnce;
        });

        it('should pass tokens to tokens list', () => {
            byType(instance, MockComponent)[0].props.tokens
                .should.be.eql(tokens);
        });

        it('should not render TokensList if no tokens', () => {
            instance = TestUtils.renderIntoDocument(
                <Component/>
            );

            byType(instance, MockComponent).should.be.empty;
        });
    });

});
