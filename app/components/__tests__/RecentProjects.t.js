import { spy } from 'sinon';
import RecentProjects from '../RecentProjects';
import testTree from 'react-test-tree';


describe.skip('RecentProjects', function() {
    let Component = null;
    let instance = null;
    let root = null;
    let tree = null;

    const build = (props) => {
        root = testTree(
            <Component {...props}/>
        );
        instance = root.cmp;
    };

    beforeEach(function() {
        tree = createTree();
        Component = stubContext(RecentProjects, {
            tree,
            api: {}
        });
    });
    afterEach(() => root.dispose());

    describe('render', function() {
        it('should fail', function() {
            true.should.be.false;
        });
    });
});
