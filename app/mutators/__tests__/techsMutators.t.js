import { spy } from 'sinon';
import { fetchTechsPage } from '../techsMutators';
import Baobab from 'baobab';
import dataTree from '../../lib/dataTree';

describe('techsMutators', () => {
    describe('fetchTechsPage', () => {
        const targetId = 'target Id';
        const tree = new Baobab(dataTree);
        const tech = { id: 'tech id', target: targetId, name: 'tech name' };

        let api = null;

        beforeEach(() => {
            api = {
                techs: {
                    list: () => Promise.resolve({
                        count: 1,
                        results: [
                            tech
                        ]
                    })
                }
            };

        });

        it('should call api list', async function() {
            spy(api.techs, 'list');
            await fetchTechsPage({ tree, api }, targetId);
            api.techs.list.should.have.been.calledWith({
                target: targetId,
                skip: 0,
                limit: dataTree.targetTechsPage.pageSize
            });
        });

        it('should add tech to techs list', async function() {
            await fetchTechsPage({ tree, api }, targetId);
            tree.select('techs', tech.id).get().should.be.eql(tech);
        });

        it('should set count', async function() {
            await fetchTechsPage({ tree, api }, targetId);
            tree.select('targetTechsPage', 'count').get().should.be.eql(1);
        });
        it('should set targetId', async function() {
            await fetchTechsPage({ tree, api }, targetId);
            tree.select('targetTechsPage', 'targetId').get()
                .should.be.eql(tech.target);
        });
        it('should set list ids', async function() {
            await fetchTechsPage({ tree, api }, targetId);
            tree.select('targetTechsPage', 'list').get()
                .should.be.eql([tech.id]);
        });
    });
});
