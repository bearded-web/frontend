import { spy } from 'sinon';
import React, { PropTypes } from 'react/addons';
import TargetTechsPage from '../TargetTechsPage';
import testTree from 'react-test-tree';
import Baobab from 'baobab';
import { assign, mapValues, isObject, isString, zipObject, pluck } from 'lodash';
import { UNKNOWN, CORRECT, INCORRECT } from '../../lib/techStatus';


describe('TargetTechsPage', () => {
    const targetId = 'target id';
    let query = null;

    let instance = null;
    let fetch = null;
    let tree = null;
    let Component = null;
    let router = null;

    beforeEach(() => {
        tree = createTree();
        query = {};
        fetch = spy();
        router = buildRouterStub();
        Component = stubContext(TargetTechsPage, {
            tree,
            router,
            api: {}
        });
    });

    afterEach(() => instance.dispose());

    it('should call fetchTechsPage with current target id', () => {
        const Component = stubContext(TargetTechsPage, {
            tree: createTree(),
            router,
            api: {}
        });
        instance = testTree(<Component query={query} fetchTechs={fetch} params={{targetId}}/>);
        fetch.should.have.been.calledWith({ target: targetId });
    });

    it.skip('should render table with techs', () => {
        const Component = stubContext(TargetTechsPage, {
            tree: new Baobab({
                techs: {
                    'a': { id: 'a', name: 'angular', target: targetId },
                    'j': { id: 'j', name: 'jquery' }
                }
            }),
            api: {}
        });
        instance = testTree(<Component query={query} fetchTechsPage={fetch} params={{targetId}}/>);
        instance.techs.should.have.length(1);
    });

    it('should render "show incorrect btn"', () => {
        instance = testTree(<Component query={query} fetchTechsPage={fetch} params={{targetId}}/>);
        should.exist(instance.cmp.cmp.showIncorrect);
    });

    describe('query.showIncorrect', () => {
        const tech1 = {
            id: 'tech1 id',
            name: 'techname',
            target: targetId,
            status: CORRECT
        };
        const tech2 = {
            id: 'tech2 id',
            target: targetId,
            name: 'techname',
            status: INCORRECT
        };
        const tech3 = {
            name: 'techname',
            id: 'tech3 id',
            target: 'another target',
            status: UNKNOWN
        };
        const tech4 = {
            id: 'tech4 id',
            name: 'techname',
            target: targetId,
            status: UNKNOWN
        };
        const l = [tech1, tech2, tech3, tech4];
        const techs = zipObject(pluck(l, 'id'), l);

        it('should render only incorrect', () => {
            tree.select('techs').set({});
            tree.select('techs').set(techs);
            tree.commit();
            query.showIncorrect = '';
            instance = testTree(<Component
                query={query}
                fetchTechsPage={fetch}
                params={{targetId}}/>);
            instance.techs[0].getProp('tech').should.be.eql(tech2);
        });

        it('should render correct and unknown', () => {
            tree.select('techs').set({});
            tree.select('techs').set(techs);
            tree.commit();
            instance = testTree(<Component
                query={query}
                fetchTechsPage={fetch}
                params={{targetId}}/>);
            instance.techs[0].getProp('tech').should.be.eql(tech4);
            instance.techs[1].getProp('tech').should.be.eql(tech1);
        });


        it('should not render "show incorrect btn"', () => {
            query.showIncorrect = '';
            instance = testTree(<Component query={query} fetchTechsPage={fetch} params={{targetId}}/>);
            should.not.exist(instance.cmp.cmp.showIncorrect);
        });

    });


});
