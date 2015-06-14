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
    });
});
