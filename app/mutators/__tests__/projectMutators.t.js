import { spy } from 'sinon';
import {
    createProject,
    setCurrentProject,
    deleteMember,
    addMember
} from '../projectsMutators';

describe('projectMutators', () => {
    const projectId = 'project id';
    const userId = 'user id';
    const target = { id: 'target id' };
    const email = 'test@email.com';
    const user = { id: userId, email };

    let tree = null;
    let api = null;
    let project = null;

    beforeEach(() => {
        tree = createTree();

        tree.select('projects').set(projectId, {
            members: [{
                user: userId
            }]
        });
        tree.commit();

        api = {
            projects: {},
            users: {
                list: spy(() => Promise.resolve({
                    results: [user]
                }))
            },
            targets: { list: spy(() => Promise.resolve({ results: [target] })) }
        };
    });

    describe('createProject', () => {
        const name = 'project name';

        beforeEach(() => {
            project = { name, id: projectId, members: [{
                user: userId
            }] };
            api.projects.create = spy(() => Promise.resolve(project));
            tree.select('projects', projectId).unset();
            tree.commit();
        });
        it('should call api', async function() {
            await createProject({ tree, api }, name);
            api.projects.create.should.have.been.calledWith({ name });
        });
        it('should add project to tree', async function() {
            await createProject({ tree, api }, name);
            tree.select('projects', projectId).get().should.be.eql(project);
        });
    });

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
            setCurrentProject({ tree, api }, projectId);
            api.users.list.should.have.been.calledWith({ id_in: userId.toString() });
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
        beforeEach(() => {
            tree.select('projects').set(projectId, {
                members: [{
                    user: userId
                }]
            });
            tree.commit();
        });

        it('should delete member from project', async function() {
            api.projects.membersDelete = spy(() => Promise.resolve());
            await deleteMember({ tree, api }, projectId, userId);
            tree.select('projects', projectId, 'members').get().should.be.empty;
        });

        it('should make api call', async function() {
            api.projects.membersDelete = spy(() => Promise.resolve());
            await deleteMember({ tree, api }, projectId, userId);
            api.projects.membersDelete.should.have.been.calledWith({
                'project-id': projectId,
                'user-id': userId
            });
        });

        it('should revert state if server respond with error', async function() {
            api.projects.membersDelete = spy(() => Promise.reject());
            await deleteMember({ tree, api }, projectId, userId);
            tree.select('projects', projectId, 'members', 0, 'user').get()
                .should.be.eql(userId);
        });
    });
    describe('addMember', () => {
        let members = null;
        beforeEach(() => {
            tree.select('projects').set(projectId, {
                members: []
            });
            tree.commit();
            members = tree.select('projects', projectId, 'members');
        });
        it('should add member', async function() {
            api.projects.membersCreate = spy(() => Promise.resolve());
            addMember({ tree, api }, projectId, userId);
            members.get().should.have.length(1);
        });

        it('should call api', async function() {
            api.projects.membersCreate = spy(() => Promise.resolve());
            await addMember({ tree, api }, projectId, userId);
            api.projects.membersCreate.should.have.been.calledWith({
                'project-id': projectId,
                body: {
                    user: userId
                }
            });
        });

        it('should revert if server error', async function() {
            api.projects.membersCreate = spy(() => Promise.reject());
            await addMember({ tree, api }, projectId, userId);
            members.get().should.be.empty;
        });
    });
});
