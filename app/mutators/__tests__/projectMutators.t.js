import { spy } from 'sinon';
import { setCurrentProject, deleteMember } from '../projectsMutators';

describe.only('projectMutators', () => {
    describe('setCurrentProject', () => {
        const projectId = 'project id';
        const userId = 'user id';
        const target = { id: 'target id' };
        const email = 'test@email.com';
        const user = { id: userId, email };

        let tree = null;
        let api = null;

        beforeEach(() => {
            tree = createTree();

            tree.select('projects').set(projectId, {
                members: [{
                    user: userId
                }]
            });
            tree.commit();

            api = {
                users: {
                    list: spy(() => Promise.resolve({
                        results: [user]
                    }))
                },
                targets: { list: spy(() => Promise.resolve({ results: [target] })) }
            };
        });

        it('should set currentProjectId', () => {
            setCurrentProject({ tree, api }, projectId);
            tree.select('currentProjectId').get().should.be.eql(projectId);
        });

        it('should call api', () => {
            const list = spy();
            const api = { users: { list } };
            setCurrentProject({ tree, api }, projectId);
            list.should.have.been.calledWith({ id_in: userId.toString() });
        });

        it('should populate users', async function() {
            await setCurrentProject({ tree, api }, projectId);
            tree.select('users', userId).get().should.be.eql(user);
        });

        it('should fetch targets', async function() {
            await setCurrentProject({ tree, api }, projectId);
            api.targets.list
                .should.have.been.calledWith({ project: projectId });
        });

        it('should populate targets', async function() {
            await setCurrentProject({ tree, api }, projectId);
            tree.select('targets', target.id).get().should.be.eql(target);
        });
    });

    describe('deleteMember', () => {

    });
});
