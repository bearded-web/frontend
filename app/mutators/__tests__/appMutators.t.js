import { spy } from 'sinon';
import { handleMeData } from '../appMutators';
import Baobab from 'baobab';
import dataTree from '../../lib/dataTree';

describe('appMutators', () => {
    const user = {
        id: 'user id',
        email: 'user@email.com',
        admin: true
    };
    describe('handleMeData', () => {
        const tree = new Baobab(dataTree);
        const project = { id: 'project id', name: 'project name' };
        const projects = [project];
        const target = { id: 'target id', project: project.id };

        let api = null;

        beforeEach(async function() {
            api = {
                targets: {
                    list: spy(() => Promise.resolve({ results: [target] }))
                }
            };
            await handleMeData({ tree, api }, { projects, user });
        });

        it('should set projects', () => {
            tree.select('projects').get().should.be.eql({
                [project.id]: project
            });
        });

        it('should pupulate users with user', () => {
            tree.select('users', user.id).get().should.be.eql(user);
        });
        it('should set currentUserId', () => {
           tree.select('currentUserId').get().should.be.eql(user.id);
        });
        it('should call targets api', () => {
            api.targets.list.should.have.been.calledWith({
                project_in: project.id
            });
        });
        it('should populate targets', () => {
           tree.select('targets').get().should.be.eql({
               [target.id]: target
           });
        });
    });
});
