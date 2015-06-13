import { spy } from 'sinon';
import mockery from 'mockery';
import { fromJS } from 'immutable';

describe.skip('TokensList', function() {
    const value = 'token value';
    const id = 'token id';
    const tokens = fromJS({
        'id1': { id, name: 'name1', value }
    });

    let Component = null;
    let instance = null;
    let remove = null;

    beforeEach(function() {
        remove = spy();
        mockery.registerMock('../actions/tokensActions', {
            remove
        });

        mockery.registerAllowable('../TokensList', true);
        Component = require('../TokensList');

        instance = TestUtils.renderIntoDocument(
            <Component tokens={tokens}/>
        );
    });

    describe('render', () => {
        it('should render TR for each key', () => {
            byTag(instance, 'tr').should.have.length(1);
        });

        it('should render value input', () => {
            nodeByTag(instance, 'input')[0].value
                .should.be.eql(value);
        });

        it('should not render input if no value', () => {
            const tokens = fromJS({
                'id1': { id: 'id1', name: 'name1' }
            });

            instance = TestUtils.renderIntoDocument(
                <Component tokens={tokens}/>
            );

            nodeByTag(instance, 'input').should.be.empty;
        });
    });

    it('should call remove action when remove button clicked', () => {
        Simulate.click(nodeByTag(instance, 'button')[0]);

        remove.should.have.been.calledWith(id);
    });
});
