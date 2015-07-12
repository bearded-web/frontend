import { spy } from 'sinon';
import TargetHeader from '../TargetHeader';
import testTree from 'react-test-tree';
import { ANDROID, WEB } from '../../lib/target-types';

describe('TargetHeader', function() {
    let Component = null;
    let instance = null;
    let root = null;
    let tree = null;
    let target = null;
    let deleteTarget = spy();

    const buildInstance = (props) => {
        const t = {
            type: WEB,
            web: {
                domain: 'http://somedomain.com'
            }
        };
        root = testTree(
            <Component target={t} deleteTarget={deleteTarget} {...props}/>
        );
        instance = root.cmp.cmp;
    };

    beforeEach(function() {

        let tree = createTree();
        const router = () => null;
        router.makeHref = () => null;
        router.isActive = () => null;
        Component = stubContext(TargetHeader, {
            router,
            tree,
            api: {}
        });
    });
    afterEach(() => root && root.dispose());

    describe('render', function() {
        it('should render web target name', function() {
            target = {
                type: WEB,
                web: {
                    domain: 'http://somedomain.com'
                }
            };
            buildInstance({ target });
            instance.title.innerText.should.contain(target.web.domain);
        });
        it('should render mobile target name', function() {
            target = {
                type: ANDROID,
                android: {
                    name: 'android target name'
                }
            };
            buildInstance({ target });
            instance.title.innerText.should.contain(target.android.name);
        });
    });

    it('should call deleteTarget prop after delete click', () => {
        target = {
            id: 'target id',
            type: WEB,
            web: {
                domain: 'http://somedomain.com'
            }
        };
        buildInstance({ target });
        instance.delete.click();
        deleteTarget.should.have.been.calledWith(target.id);
    });
});
