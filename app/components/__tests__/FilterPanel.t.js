import { spy } from 'sinon';
import mockery from 'mockery';
import testTree from 'react-test-tree';

import FilterPanel from '../FilterPanel';

describe('FilterPanel', function() {
    let instance = null;

    beforeEach(() => {
        instance = testTree(<FilterPanel/>);
    });

    describe('render', function() {
        it('should render no checkboxes', () => {
            instance.controls.should.be.empty;
        });

        it('should render 1 checkbox', () => {
            const values = { test: true };
            instance = testTree(<FilterPanel values={values}/>);
            instance.controls.should.have.length(1);
        });

        it('should render 2 checkbox', () => {
            const values = { test: true, a: false };
            instance = testTree(<FilterPanel values={values}/>);
            instance.controls.should.have.length(2);
        });

        it('should render checked checkbox', () => {
            const values = { test: true };
            instance = testTree(<FilterPanel values={values}/>);
            should.exist(instance.controls[0].input.getAttribute('checked'));
        });

        it('should render not checked checkbox', () => {
            const values = { test: false };
            instance = testTree(<FilterPanel values={values}/>);
            should.not.exist(instance.controls[0].input.getAttribute('checked'));
        });

        it.skip('should render checkbox with label', () => {
            const values = { test: false };
            const labels = { test: 'test label' };
            instance = testTree(<FilterPanel values={values} labels={labels}/>);
            instance.cbxtest.innerText.should.be.eql('test label');
        });

        it('should render "Check all" link', () => {
            should.exist(instance.checkAll);
        });
    });

    describe('onChange', () => {
        it('should call onChange with new values if click checkAll', () => {
            const onChange = spy();
            const values = { test: false };
            instance = testTree(<FilterPanel values={values} onChange={onChange}/>);
            instance.checkAll.click();
            onChange.should.have.been.calledWith({ test: true });
        });
    });
});

