/* eslint-disable */
import { spy } from 'sinon';
import TargetsPage from '../TargetsPage';
import testTree from 'react-test-tree';


describe.skip('TargetsPage', function() {
    let Component = null;
    let instance = null;
    let root = null;
    let tree = null;

    beforeEach(function() {
        let tree = createTree();
        Component = stubContext(TargetsPage, {
            tree,
            api: {}
        })
        root = testTree(
            <Component/>
        );
        instance = root.cmp;
    });
    afterEach(() => root.dispose());

    describe('render', function() {
        it('should fail', function() {
            true.should.be.false;
        });
    });
});
