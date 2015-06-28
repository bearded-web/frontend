import { spy } from 'sinon';
import testTree from 'react-test-tree';
import Baobab from 'baobab';
import mockery from 'mockery';
import dataTree, { facets } from '../../lib/dataTree';

describe('ProjectPage', () => {
    const project = {
        id: 'project id',
        members: [{
            user: 'member user id'
        }]
    };
    const issue = {
        id: 'issue id',
        project: project.id
    };
    const issue2 = { id: 'issue 2 id', project: 'another project' };
    const issues = {
        [issue.id]: issue,
        [issue2.id]: issue2
    };

    let instance = null;
    let Component = null;
    let fetchIssues = null;

    beforeEach(() => {
        fetchIssues = spy();
        mockery.registerMock('./feed', MockComponent);
        mockery.registerAllowable('../ProjectPage', true);
        const ProjectPage = require('../ProjectPage');
        Component = stubContext(ProjectPage, {
            tree: new Baobab(dataTree, { facets }),
            router: () => null,
            api: {}
        });
        instance = testTree(<Component
            fetchIssues={fetchIssues}
            project={project}
            issues={issues}/>, {
            stub: {
                cmp: { cmp: {
                    feed: <span></span>,
                    members: <span></span>,
                    lifetime: <span></span>
                }
            } }
        });
    });

    afterEach(() => {
        instance.dispose();
    });

    it('should set title of page', () => {
        document.title.should.contain(iget('Dashboard'));
    });

    it('should render Members component with members', () => {
        instance.cmp.cmp.members.getProp('members')
            .should.be.eql(project.members);
    });

    it('should render Feed component', () => {
        instance.cmp.cmp.feed.getProp('source')
            .should.be.eql(project);
        instance.cmp.cmp.feed.getProp('type')
            .should.be.eql('project');
    });

    it('should not render loading if project exist', () => {
        should.not.exist(instance.cmp.loading);
    });

    it('should render loading if no project', () => {
        instance = testTree(<Component/>, {
            stub: {
                cmp: {
                    feed: <span></span>,
                    members: <span></span>
                }
            }
        });
        should.exist(instance.cmp.cmp.loading);
    });

    it('should pass only project issues', () => {
        instance.cmp.cmp.lifetime.getProp('issues').should.be.eql([issue]);
    });

    it('should call fetchIssues', () => {
        fetchIssues.should.have.been.calledWith({
            project: project.id
        });
    });
});
