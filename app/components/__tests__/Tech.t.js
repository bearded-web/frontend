import { spy } from 'sinon';
import Tech from '../Tech';
import testTree from 'react-test-tree';
import { CORRECT, INCORRECT, UNKNOWN } from '../../lib/techStatus';

describe('Tech', function() {
    let Component = null;
    let instance = null;
    let root = null;
    let tree = null;
    let tech = null;
    let updateTechStatus = null;

    function buildInstance(props) {
        tree = createTree();
        Component = stubContext(Tech, {
            tree,
            api: {}
        });
        root = testTree(
            <Component {...props}/>
        );
        instance = root.cmp.cmp;
    }

    beforeEach(function() {
        updateTechStatus = spy();
        tech = {
            id: 'tech id',
            name: 'tech name',
            url: 'https://barbudo.net',
            version: '1.0.0',
            status: CORRECT,
            categories: [
                'javascript-frameworks',
                'analytics',
                'javascript-frameworks',
                'web-frameworks'
              ]
        };
        buildInstance({ tech, updateTechStatus });
    });
    afterEach(() => root.dispose());

    it('should render link', () => {
        instance.link.getProp('href').should.be.eql(tech.url);
        instance.link.getProp('target').should.be.eql('_blank');
        instance.link.innerText.should.contain(tech.name);
        instance.link.innerText.should.contain(tech.version);
    });
    it('should render categories', () => {
        instance.categories.innerText.should.contain(tech.categories.join(', '));
    });
    it('should render icon', () => {
        instance.icon.getProp('tech').should.be.eql(tech);
    });

    it('should render set incorrect button', () => {
        instance.incorrect.click();
        updateTechStatus.should.have.been.calledWith(tech.id, INCORRECT);
    });

    describe('unknown status', () => {
        beforeEach(() => {
            tech.status = UNKNOWN;
            buildInstance({ tech, updateTechStatus });
        });

        it('should render set correct btn', () => {
            instance.correct.click();
            updateTechStatus.should.have.been.calledWith(tech.id, CORRECT);
        });
    });
});
