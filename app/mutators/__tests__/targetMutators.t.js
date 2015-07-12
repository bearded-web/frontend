import { spy } from 'sinon';
import { deleteTarget } from '../targetMutators';
import Baobab from 'baobab';
import dataTree from '../../lib/dataTree';

describe('targetMutators', () => {
    let tree = null;
    let api = null;
    let target = null;
    let router = null;

    beforeEach(() => {
        router = {
            transitionTo: spy()
        };
        target = {
            id: 'target id'
        };
        tree = new Baobab(dataTree);
        tree.select('targets').set(target.id, target);
        tree.commit();
        api = {
            targets: {
                delete: spy()
            }
        };
    });

    describe('deleteTarget', () => {
        it('should delete target from tree', async function() {
            await deleteTarget({ tree, api, router }, target.id);
            should.not.exist(tree.select('targets', target.id).get());
        });
        it('should call api', async function() {
            await deleteTarget({ tree, api, router }, target.id);
            api.targets.delete.should.have.been.calledWith({
                'target-id': target.id
            });
        });
        it('should return target back if server respond error', async function() {
            api.targets.delete = () => Promise.reject({});
            await deleteTarget({ tree, api, router }, target.id);
            tree.select('targets', target.id).get().should.be.eql(target);
        });
        it('should not return target back if server respond 404', async function() {
            api.targets.delete = () => Promise.reject({ status: 404 });
            await deleteTarget({ tree, api, router }, target.id);
            should.not.exist(tree.select('targets', target.id).get());
        });
        it('should go to project overview', async function() {
            await deleteTarget({ tree, api, router }, target.id);
            router.transitionTo.should.have.been.calledWith('overview');
        });
    });
});
