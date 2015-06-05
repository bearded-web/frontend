import { spy } from 'sinon';
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

        it('should render max 5 links + borders', () => {
            instance = testTree(<Pagination
                maxLinks={5}
                count={30}
                pageSize={2}
                page={7}/>);

            instance.links.should.have.length(7);
        });

        it('should render active link in center', () => {
            instance = testTree(<Pagination maxLinks={5} count={30} pageSize={2} page={7}/>);

            instance.links[2].innerText.should.be.eql('6');
        });

        it('should render active link in center, but respect left border', () => {
            instance = testTree(<Pagination count={30} pageSize={2} page={2}/>);

            instance.links[2].innerText.should.be.eql('3');
        });

        it('should render active link in center, but respect right border', () => {
            instance = testTree(<Pagination maxLinks={5} count={30} pageSize={2} page={14}/>);

            instance.links[2].innerText.should.be.eql('12');
        });

        it('should render max maxLinks links + borders', () => {
            instance = testTree(
                <Pagination
                    maxLinks={10}
                    count={100}
                    pageSize={2}
                    page={20}/>
            );

            instance.links.should.have.length(12);
        });

        it('should render "go to first" button if first button hidden', () => {
            instance = testTree(
                <Pagination
                    maxLinks={5}
                    count={30}
                    pageSize={2}
                    page={8}/>
            );

            should.exist(instance.goToFirst);
        });

        it('should not render "go to first" button if first button shown', () => {
            instance = testTree(
                <Pagination
                    maxLinks={5}
                    count={30}
                    pageSize={2}
                    page={1}/>
            );

            should.not.exist(instance.goToFirst);
        });

        it('should render "go to last" button if last button hidden', () => {
            instance = testTree(
                <Pagination
                    maxLinks={5}
                    count={30}
                    pageSize={2}
                    page={3}/>
            );

            should.exist(instance.goToLast);
        });

        it('should not render "go to last" button if last button shown', () => {
            instance = testTree(
                <Pagination
                    maxLinks={5}
                    count={30}
                    pageSize={2}
                    page={14}/>
            );

            should.not.exist(instance.goToLast);
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

        it('should call onPageSelect handler when goToFirst clicked', () => {
            instance = testTree(
                <Pagination
                    onPageSelect={onSelect}
                    count={50}
                    page={12}
                    pageSize={3}/>
            );

            instance.goToFirst.click();

            onSelect.should.have.been.calledWith(1);
        });

        it('should call onPageSelect handler when goToLast clicked', () => {
            instance = testTree(
                <Pagination
                    onPageSelect={onSelect}
                    count={100}
                    page={1}
                    pageSize={5}/>
            );

            instance.goToLast.click();

            onSelect.should.have.been.calledWith(20);
        });
    });
});

