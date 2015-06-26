import { spy } from 'sinon';
import { createScan, fetchScan } from '../scanMutators';

describe('scanMutators', () => {
    const targetId = 'target id';
    const projectId = 'project id';
    const planId = 'plan id';
    const scanId = 'scan id';

    let tree = null;
    let api = null;
    let scan = null;

    beforeEach(() => {
        scan = {
            target: targetId,
            project: projectId,
            plan: planId,
            id: scanId
        };
        tree = createTree();
        api = {
            scans: {
                create: spy(() => Promise.resolve(scan)),
                get: spy(() => Promise.resolve(scan))
            }
        };
    });

    describe('createScan', () => {
        it('should call api', async function() {
            await createScan({ tree, api }, targetId, projectId, planId);
            api.scans.create.should.have.been.calledWith({
                target: targetId,
                project: projectId,
                plan: planId
            });
        });

        it('should populate scans', async function() {
            await createScan({ tree, api }, targetId, projectId, planId);
            tree.select('scans', scan.id).get().should.be.eql(scan);
        });

        it('should move to target page', async function() {
            const router = { transitionTo: spy() };
            await createScan({ tree, api, router }, targetId, projectId, planId);
            router.transitionTo.should.have.been.calledWith('target', {
                targetId
            });
        });
    });

    describe('fetchScan', () => {
        it('should call api', async function() {
            await fetchScan({ tree, api }, scanId);
            api.scans.get.should.have.been.calledWith({
                'scan-id': scanId
            });
        });
        it('should not call api if no scanId', async function() {
            await fetchScan({ tree, api });
            api.scans.get.should.have.not.been.called;
        });

        it('should populate scans', async function() {
            await fetchScan({ tree, api }, scanId);
            tree.select('scans', scan.id).get().should.be.eql(scan);
        });
    });
});
