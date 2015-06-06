import { spy } from 'sinon';
import testTree from 'react-test-tree';

import SortTh from '../SortTh';
import Fa from '../fa';

describe('SortTh', function() {
    const text = <span>Email</span>;

    let instance = null;

    beforeEach(() => {
        instance = testTree(<SortTh>
            {text}
        </SortTh>);
    });

    describe('render', () => {
        const getIcon = instance => byType(instance.element, Fa)[0];

        it('should render children', () => {
            byTag(instance.element, 'span').should.have.length(1);
        });

        it('should render sort icon', () => {
            const icon = getIcon(instance);
            should.exist(icon);
            icon.props.icon.should.be.eql('sort');
        });

        it('should render sort-asc icon', () => {
            instance = testTree(<SortTh field="email" value="email">
                {text}
            </SortTh>);
            getIcon(instance).props.icon.should.be.eql('sort-asc');
        });

        it('should render sort-desk icon', () => {
            instance = testTree(<SortTh field="email" value="-email">
                {text}
            </SortTh>);
            getIcon(instance).props.icon.should.be.eql('sort-desc');
        });
    });

    describe('onChange', () => {
        let onChange = null;

        beforeEach(() => {
            onChange = spy();
        });

        const renderWithProps = props => TestUtils.renderIntoDocument(<table>
            <thead>
            <tr>
                <SortTh
                    {...props}
                    onChange={onChange}>
                    {text}
                </SortTh>
            </tr>
            </thead>
        </table>);

        it('should call onChange with asc sort by field', () => {
            instance = renderWithProps({ field: 'email', value: '' });

            Simulate.click(byTag(instance, 'th')[0]);
            onChange.should.have.been.calledWith('email');
        });

        it('should call onChange with asc sort by field when click on desc sort', () => {
            instance = renderWithProps({ field: 'email', value: '-email' });

            Simulate.click(byTag(instance, 'th')[0]);
            onChange.should.have.been.calledWith('email');
        });

        it('should call onChange with desc sort by field', () => {
            instance = renderWithProps({ field: 'email', value: 'email' });

            Simulate.click(byTag(instance, 'th')[0]);
            onChange.should.have.been.calledWith('-email');
        });
    });
});

