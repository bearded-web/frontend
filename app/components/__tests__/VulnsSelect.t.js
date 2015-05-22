import { spy } from 'sinon';
import mockery from 'mockery';
import { Map } from 'immutable';

describe('VulnsSelect', function() {
    const vulns = Map()
        .set(1, Map({ id: 1, title: 't' }))
        .set(2, Map({ id: 2, title: 't2' }));

    let Component = null;
    let instance = null;
    let onChange = null;

    beforeEach(function() {
        onChange = spy();

        mockery.registerAllowable('../VulnsSelect', true);
        Component = require('../VulnsSelect');

        instance = TestUtils.renderIntoDocument(
            <Component value="2" vulns={vulns} onChange={onChange}/>
        );
    });

    describe('render', () => {
        it('should set value in select', () => {
            nodeByTag(instance, 'select')[0].value.should.be.eql('2');
        });
    });

    describe('onChange', () => {
        it('should call onChange prop with selected vuln', () => {
            const node = nodeByTag(instance, 'select')[0];

            Simulate.change(node, { target: { value: '1' } });

            onChange.firstCall.args[0].toJS()
                .should.be.eql(vulns.toJS()[1]);
        });
    });
});
