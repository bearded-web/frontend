import { spy } from 'sinon';
import mockery from 'mockery';
import testTree from 'react-test-tree';

import Pagination from '../Pagination';

describe('Pagination', function() {
    let instance = null;

    beforeEach(() => {
        instance = testTree(<Pagination/>);
    });

    describe('render', function() {
        it('should render 1 button with no params', () => {
            instance.links.should.have.length(1);
        });

        it('should render 1 button', () => {
            instance = testTree(<Pagination count={5} pageSize={5}/>);

            instance.links.should.have.length(1);
        });

        it('should render 2 links', () => {
            instance = testTree(<Pagination count={6} pageSize={5}/>);

            instance.links.should.have.length(2);
        });

        it('should mark current page as active', () => {
            instance = testTree(<Pagination count={6} pageSize={5} page={2}/>);

            instance.links[1].getAttribute('class').should.contain('active');
        });

        it('should render max 5 links by default', () => {
            instance = testTree(<Pagination count={30} pageSize={2} page={2}/>);

            instance.links.should.have.length(5);
        });

        it('should render active link in center', () => {
            instance = testTree(<Pagination count={30} pageSize={2} page={7}/>);

            instance.links[2].innerText.should.be.eql('7');
        });

        it('should render active link in center, but respect left border', () => {
            instance = testTree(<Pagination count={30} pageSize={2} page={2}/>);

            instance.links[2].innerText.should.be.eql('3');
        });

        it('should render active link in center, but respect right border', () => {
            instance = testTree(<Pagination count={30} pageSize={2} page={14}/>);

            instance.links[2].innerText.should.be.eql('13');
        });

        it('should render max maxLinks links', () => {
            instance = testTree(
                <Pagination
                    maxLinks={10}
                    count={30}
                    pageSize={2}
                    page={2}/>
            );

            instance.links.should.have.length(10);
        });
    });

    describe('onLinkClick', () => {
        let onSelect = null;

        beforeEach(() => {
            onSelect = spy();
        });

        it('should call onPageSelect handler when link clicked', () => {
            instance = testTree(
                <Pagination
                    onPageSelect={onSelect}
                    count={6}
                    pageSize={5}/>
            );

            instance.page2.click();

            onSelect.should.have.been.calledWith(2);
        });
    });
});

