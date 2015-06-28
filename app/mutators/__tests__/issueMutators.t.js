import { spy } from 'sinon';
import {
    fetchIssue,
    increaseSeverity,
    decreaseSeverity,
    toggleIssueStatus
} from '../issueMutators';
import { MEDIUM, LOW, HIGH, INFO } from '../../lib/severities';

describe.only('issueMutators', () => {
    const issueId = 'issue id';
    let tree = null;
    let api = null;
    let issue = null;

    beforeEach(() => {
        issue = { id: issueId, severity: MEDIUM, muted: false };
        tree = createTree();
        tree.select('issues').set(issueId, issue);
        tree.commit();
        api = {
            issues: {}
        };
        api.issues.get = spy(() => Promise.resolve(issue));
        api.issues.update = spy(() => Promise.resolve(issue));
    });

    describe('fetchIssue', () => {
        it('should call api', async function() {
           await fetchIssue({ tree, api }, issue.id);
           api.issues.get.should.been.calledWith({ issueId: issue.id });
        });
        it('should populate issues in tree', async function() {
           await fetchIssue({ tree, api }, issue.id);
           tree.select('issues', issue.id).get().should.be.eql(issue);
        });
        it('should not throw', async function() {
            api.issues.get = spy(() => Promise.reject(issue));
            const th = spy();
            try {
                await fetchIssue({ tree, api }, issue.id).catch(th);
            }
            catch(e) {
               th();
            }
            th.should.not.have.been.called;
        });
    });

    describe('increaseSeverity', () => {
        it('should call api', async function() {
            increaseSeverity({ tree, api }, issueId);
            api.issues.update.should.have.been.calledWith({
                issueId,
                body: { severity: HIGH }
            });
        });
        it('should call api with MEDIUM if LOW', async function() {
            tree.select('issues', issueId, 'severity').set(LOW);
            tree.commit();
            increaseSeverity({ tree, api }, issueId);
            api.issues.update.should.have.been.calledWith({
                issueId,
                body: { severity: MEDIUM }
            });
        });
        it('should call api with LOW if INFO', async function() {
            tree.select('issues', issueId, 'severity').set(INFO);
            tree.commit();
            increaseSeverity({ tree, api }, issueId);
            api.issues.update.should.have.been.calledWith({
                issueId,
                body: { severity: LOW }
            });
        });
        it('should not call api if HIGH', async function() {
            tree.select('issues', issueId, 'severity').set(HIGH);
            tree.commit();
            increaseSeverity({ tree, api }, issueId);
            api.issues.update.should.not.have.been.called;
        });
        it('should set new severity', async function() {
            increaseSeverity({ tree, api }, issueId);
            tree.select('issues', issueId, 'severity').get()
                .should.be.eql(HIGH);
        });
        it('should return severity back if fail', async function() {
            api.issues.update = spy(() => Promise.reject(issue));
            await increaseSeverity({ tree, api }, issueId);
            tree.select('issues', issueId, 'severity').get()
                .should.be.eql(MEDIUM);
        });
    });

    describe('decreaseSeverity', () => {
        it('should call api', async function() {
            await decreaseSeverity({ tree, api }, issueId);
            api.issues.update.should.have.been.calledWith({
                issueId,
                body: { severity: LOW }
            });
        });
        it('should call api with MEDIUM if HIGH', async function() {
            tree.select('issues', issueId, 'severity').set(HIGH);
            tree.commit();
            await decreaseSeverity({ tree, api }, issueId);
            api.issues.update.should.have.been.calledWith({
                issueId,
                body: { severity: MEDIUM }
            });
        });
        it('should call api with INFO if LOW', async function() {
            tree.select('issues', issueId, 'severity').set(LOW);
            tree.commit();
            await decreaseSeverity({ tree, api }, issueId);
            api.issues.update.should.have.been.calledWith({
                issueId,
                body: { severity: INFO }
            });
        });
        it('should return severity back if fail', async function() {
            api.issues.update = spy(() => Promise.reject(issue));
            await increaseSeverity({ tree, api }, issueId);
            tree.select('issues', issueId, 'severity').get()
                .should.be.eql(MEDIUM);
        });
    });

    describe('toggleIssueStatus', () => {
        it('should call api', async function() {
            await toggleIssueStatus({ tree, api }, issueId, 'muted');
            api.issues.update.should.have.been.calledWith({
                issueId,
                body: { muted: true }
            });
        });
        it('should set new status in tree', async function() {
            await toggleIssueStatus({ tree, api }, issueId, 'muted');
            tree.select('issues', issueId, 'muted').get().should.be.true;
        });
        it('should revert back if fail', async function() {
            api.issues.update = () => Promise.reject();
            await toggleIssueStatus({ tree, api }, issueId, 'muted');
            tree.select('issues', issueId, 'muted').get().should.be.false;
        });
    });
});
