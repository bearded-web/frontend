import { spy } from 'sinon';
import { fetchTechs, fetchTechsPage, updateTechStatus } from '../techsMutators';
import Baobab from 'baobab';
import dataTree from '../../lib/dataTree';
import { CORRECT, UNKNOWN } from '../../lib/techStatus';
import { cloneDeep } from 'lodash';

describe('techsMutators', () => {
    const targetId = 'target Id';
    const tree = new Baobab(dataTree);
    let tech = null;

    let api = null;

    beforeEach(() => {
        tech = { id: 'tech id', target: targetId, name: 'tech name', status: UNKNOWN };
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

    describe('fetchTechs', () => {
        it('should call api', async function() {
            spy(api.techs, 'list');
            await fetchTechs({ tree, api }, { target: targetId });
            api.techs.list.should.have.been.calledWith({ target: targetId });
        });
        it('should populate data', async function() {
            await fetchTechs({ tree, api }, { target: targetId });
            tree.select('techs', tech.id).get().should.be.eql(tech);
        });
    });
    describe('fetchTechsPage', () => {

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

    describe('updateTechStatus', () => {
        beforeEach(() => {
            tree.select('techs').set(tech.id, tech);
            tree.commit();
            api.techs.update = spy(() => Promise.resolve(tech));
        });

        it('should call api', async function() {
            await updateTechStatus({ tree, api }, tech.id, CORRECT);
            const t = cloneDeep(tech);
            t.status = CORRECT;
            api.techs.update.should.have.been.calledWith({
                techId: tech.id,
                body: t
            });
        });

        it('should set new value in tree', async function() {
            updateTechStatus({ tree, api }, tech.id, CORRECT);
            tree.select('techs', tech.id, 'status').get().should.be.eql(CORRECT);
        });

        it('should revert back if error', async function() {
            api.techs.update = spy(() => Promise.reject());
            await updateTechStatus({ tree, api }, tech.id, CORRECT);
            tree.select('techs', tech.id, 'status').get().should.be.eql(UNKNOWN);
        });

        it('should update with new data', async function() {
            const data = { data: 'd' };
            api.techs.update = spy(() => Promise.resolve(data));
            await updateTechStatus({ tree, api }, tech.id, CORRECT);
            tree.select('techs', tech.id).get().should.be.eql(data);
        });
    });
});
