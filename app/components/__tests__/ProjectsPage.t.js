import { spy } from 'sinon';
import ProjectsPage from '../ProjectsPage';
import testTree from 'react-test-tree';


describe('ProjectsPage', function() {
    let Component = null;
    let instance = null;
    let root = null;
    // let tree = null;
    let project = null;
    let project2 = null;
    let projects = null;
    let list = null;
    let query = null;
    let fetchProjectsPage = null;

    const build = (props) => {
        root = testTree(
            <Component
                fetchProjectsPage={fetchProjectsPage}
                {...props}/>
        );
        instance = root.cmp.cmp;
    };

    beforeEach(function() {
        fetchProjectsPage = spy();
        query = {};
        project = {
            id: 'project id',
            name: 'project name',
            members: []
        };
        project2 = {
            id: 'project 2',
            name: 'project 2 name',
            members: []
        };
        projects = {
            [project.id]: project,
            [project2.id]: project2
        };
        list = [project.id];
        let tree = createTree();
        let router = () => null;
        router.makeHref = () => null;
        router.isActive = () => null;
        Component = stubContext(ProjectsPage, {
            router,
            tree,
            api: {}
        });
    });
    afterEach(() => root && root.dispose());

    describe('render', function() {
        it('should render tr for each projct in list', () => {
            build({ projects, list, query });
            instance.projects.should.have.length(1);
        });
    });

    it('should call fetchProjectsPage', () => {
        query.page = '2';
        build({ projects, list, query, fetchProjectsPage });
        fetchProjectsPage.should.have.been.calledWith(2);
    });
});
