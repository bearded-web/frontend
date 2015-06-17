import dataTree, { facets } from '../dataTree';
import Baobab from 'baobab';

describe('dataTree', () => {
    let tree = null;
    beforeEach(() => {
        tree = new Baobab(dataTree, { facets });
    });

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

        it('should return scanReports', () => {
            const report1 = { id: 'report1 id', scan: '1' };
            const report2 = { id: 'report2 id', scan: '2' };
            const r = tree.select('reports');
            r.update({
                [report1.id]: { $set: report1 },
                [report2.id]: { $set: report2 }
            });
            tree.select('scanReportsPage', 'scanId').set('2');
            tree.commit();
            tree.facets.scanReports.get().should.be.eql([report2]);
        });
    });
});
