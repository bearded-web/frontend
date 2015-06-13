import TargetLabel from '../TargetLabel';
import testTree from 'react-test-tree';
import { ANDROID, WEB } from '../../lib/target-types';

describe('TargetLabel', () => {
    let target = null;
    let instance = null;
    let Component = null;
    beforeEach(() => {
        target = {
            id: 'target id',
            type: WEB,
            web: {
                domain: 'http://domain.com'
            },
            summaryReport: { issues: {
                high: 6,
                low: 0,
                medium: 0
            } }
        };
        Component = stubContext(TargetLabel, {
            router: {
                makeHref: () => '',
                isActive: () => ''
            }
        });
        instance = testTree(
            <Component target={target}/>
        ).cmp;
    });

    it('should render title', () => {
        instance.innerText.should.contain('domain.com');
    });

    it('should render issues counter', () => {
        instance.count.innerText.should.be.eql('6');
    });

    it('should render medium count if high eql 0', () => {
        target.summaryReport.issues.high = 0;
        target.summaryReport.issues.medium = 4;
        instance = testTree(
            <Component target={target}/>
        ).cmp;
        instance.count.innerText.should.be.eql('4');
    });

    it('should render globe icon', () => {
        instance.icon.getProp('icon').should.be.eql('globe');
    });

    it('should render android icon', () => {
        target.type = ANDROID;
        target.android = { name: 'mobile name' };
        instance = testTree(
            <Component target={target}/>
        ).cmp;
        instance.icon.getProp('icon').should.be.eql('android');
    });

    it('should render android name', () => {
        target.type = ANDROID;
        target.android = { name: 'mobile name' };
        instance = testTree(
            <Component target={target}/>
        ).cmp;
        instance.innerText.should.contain(target.android.name);
    });
});
