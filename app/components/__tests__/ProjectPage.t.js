import testTree from 'react-test-tree';
import Baobab from 'baobab';
import mockery from 'mockery';

describe('ProjectPage', () => {
    const project = {
        id: 'project id',
        members: [{
            user: 'member user id'
        }]
    };

    let instance = null;

    beforeEach(() => {
        mockery.registerMock('./feed', MockComponent);
        mockery.registerAllowable('../ProjectPage', true);
        const ProjectPage = require('../ProjectPage');
        const Component = stubContext(ProjectPage, {
            tree: new Baobab({}),
            api: {}
        });
        instance = testTree(<Component project={project}/>, {
            stub: {
                cmp: {
                    feed: <span></span>
                }
            }
        });
    });

    it('should set title of page', () => {
        document.title.should.contain(iget('Dashboard'));
    });

    it('should render Members component with members', () => {
        instance.cmp.members.getProp('members')
            .should.be.eql(project.members);
    });

    it('should render Feed component', () => {
        instance.cmp.feed.getProp('source')
            .should.be.eql(project);
        instance.cmp.feed.getProp('type')
            .should.be.eql('project');
    });
});
