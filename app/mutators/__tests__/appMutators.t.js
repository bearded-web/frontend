import { spy } from 'sinon';
import { handleMeData } from '../appMutators';
import Baobab from 'baobab';
import dataTree from '../../lib/dataTree';

describe('appMutators', () => {
    describe('handleMeData', () => {
        const tree = new Baobab(dataTree);
        const project = { id: 'project id', name: 'project name' };
        const projects = [project];

        it('should set projects', () => {
            handleMeData({ tree }, { projects });
            tree.select('projects').get().should.be.eql({
                [project.id]: project
            });
        });

    });
});
