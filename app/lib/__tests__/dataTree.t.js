import dataTree, { facets } from '../dataTree';
import Baobab from 'baobab';

describe('dataTree', () => {
    describe('facets', () => {
        it('should return project', () => {
            const project = { id: 'f', name: 'project name' };
            const tree = new Baobab(dataTree, { facets });
            tree.select('currentProjectId').set('f');
            tree.select('projects').set('f', project);
            tree.commit();
            tree.facets.currentProject.get().should.be.eql(project);
        });

        it('should return picker suggested users', () => {
            const user = { id: 'f', email: 'email@em.ail' };
            const tree = new Baobab(dataTree, { facets });
            tree.select('userPicker', 'users').push(user.id);
            tree.select('users').set(user.id, user);
            tree.commit();
            tree.facets.userPickerUsers.get().should.be.eql([user]);
        });
    });
});
