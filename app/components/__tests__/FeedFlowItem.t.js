import { spy } from 'sinon';
import testTree from 'react-test-tree';
import Baobab from 'baobab';
import dataTree, { facets } from '../../lib/dataTree';
import mockery from 'mockery';
import moment from 'moment';
import { MEDIUM } from '../../lib/severities';

describe('FeedFlowItem', () => {
    const user = {
        id: 'user id',
        nickname: 'superuser',
        avatar: 'avatar url'
    };
    let item = null;
    const users = { [user.id]: user };
    let instance = null;
    let Component = null;
    let router = null;
    let root = null;

    const buildInstance = () => testTree(<Component
        users={users}
        item={item}/>
    );

    beforeEach((d) => {
        item = {
            id: 'item id',
            type: 'scan',
            scan: {
                conf: {
                    target: 'target url'
                }
            },
            owner: user.id,
            created: '2011-03-11'
        };
        router = () => ({});
        router.transitionTo = spy();
        mockery.registerMock('./target-scan', MockComponent);
        mockery.registerAllowable('../FeedFlowItem');
        Component = stubContext(require('../FeedFlowItem'), {
            tree: new Baobab(dataTree, { facets }),
            api: {},
            router
        });
        root = buildInstance();
        instance = root.cmp.cmp;
        d();
    });

    afterEach(() => root.dispose());

    it('should render avatar if owner is present', () => {
        instance.avatar.getProp('avatar').should.be.eql(user.avatar);
    });

    describe('type scan', () => {
        beforeEach(() => {
            item = {
                id: 'item id',
                type: 'scan',
                scan: {
                    conf: {
                        target: 'target url'
                    }
                },
                owner: user.id,
                created: '2011-03-11'
            };
        });
        it('should render created at date', () => {
            instance.date.innerText.should.be.eql(moment(item.created).calendar());
        });
        it('should render action label', () => {
            instance.action.innerText.should.contain(user.nickname);
            instance.action.innerText.should.contain(item.scan.conf.target);
        });
        it('should render action label even if no conf', () => {
            delete item.scan.conf;
            const r = buildInstance();
            r.cmp.cmp.action.innerText.should.contain(user.nickname);
            r.dispose();
        });
        it('should render TargetScan', () => {
            instance.scan.getProp('scan').should.be.eql(item.scan);
        });
    });

    describe('techs', () => {
        it('should render techs if present in feed item', () => {
            item.techs = [
                { name: 'tech name' }
            ];
            const r = buildInstance();
            r.cmp.cmp.techs.should.have.length(1);
            r.dispose();
        });
    });

    describe('summary', () => {
        it('should render summary values', () => {
            item.summaryReport = {
                issues: {
                    [MEDIUM]: 144121
                }
            };
            const r = buildInstance();
            r.cmp.cmp.summary.innerText.should.contain('144121');
            r.dispose();
        });
        it('should not render summary if summary is empty', () => {
            item.summaryReport = {
                issues: {}
            };
            const r = buildInstance();
            should.not.exist(r.cmp.cmp.summary);
            r.dispose();
        });
    });
});
