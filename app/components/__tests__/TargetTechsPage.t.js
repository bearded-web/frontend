import { spy } from 'sinon';
import React, { PropTypes } from 'react/addons';
import TargetTechsPage from '../TargetTechsPage';
import testTree from 'react-test-tree';
import Baobab from 'baobab';
import { assign, mapValues, isObject, isString } from 'lodash';

function stubContext(Component, context) {
    const types = mapValues(context, v => {
        if (isObject(v)) return React.PropTypes.object;
    });

    return class StubContext extends React.Component {
        static childContextTypes = types;

        getChildContext() {
            return context;
        }

        render() {
            return <Component {...this.props} />;
        }
    };
}

describe('TargetTechsPage', () => {
    const targetId = 'target id';

    let instance = null;
    let fetch = null;

    beforeEach(() => {
        fetch = spy();
    });

    it('should call fetchTechsPage with current target id', () => {
        const Component = stubContext(TargetTechsPage, {
            tree: new Baobab({ targetTechsPage: { list: [] } }),
            api: {}
        });
        instance = testTree(<Component fetchTechsPage={fetch} params={{targetId}}/>);
        fetch.should.have.been.calledWith(targetId);
    });

    it('should render table with techs', () => {
        const Component = stubContext(TargetTechsPage, {
            tree: new Baobab({
                techs: {
                    'a': { id: 'a', name: 'angular' },
                    'j': { id: 'j', name: 'jquery' }
                },
                targetTechsPage: {
                    list: ['a']
                }
            }),
            api: {}
        });
        instance = testTree(<Component fetchTechsPage={fetch} params={{targetId}}/>);
        instance.techs.should.have.length(1);
    });
});
