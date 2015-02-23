describe('Store', function() {
    var FluxxorTestUtils, fakeFlux, store,
        appStoreSpy, constants;


    jest.dontMock('util');
    jest.dontMock('immutable');
    jest.dontMock('../store');
    jest.dontMock('../../lib/helpers');
    jest.setMock('../../lib/local-storage', {
        getItem: jest.genMockFunction(),
        setItem: jest.genMockFunction()
    })


    beforeEach(function() {
        constants = require('../../constants');

        FluxxorTestUtils = require('fluxxor-test-utils');
        FluxxorTestUtils.extendJasmineMatchers(this);
        // now our jasmine matchers are available

        var Store = require('../store');
        fakeFlux = FluxxorTestUtils.fakeFlux({ Store: new Store() });
        // now we have a FakeFlux instance that has .stores.MyStore

        store = fakeFlux.store('Store');
        // easier access to my store instance

        appStoreSpy = fakeFlux.makeStoreEmitSpy('Store');
        // now all our this.emit() calls from within the store are captured
    });


    describe('project', function() {
        it('must populate state.projects', function() {
            var project = { id: '1', title: 'supp' };

            fakeFlux.dispatcher.dispatch({
                type: constants.PROJECTS_FETCH_SUCCESS,
                payload: [project]
            });

            var projects = store.getState().projects;
            expect(projects.size).toBe(1);
            expect(projects.get('1').get('title')).toBe('supp');
        });
        it('must populate state.currentProject', function() {
            var projects = [
                { id: '1' },
                { id: '2' }
            ];

            fakeFlux.dispatcher.dispatch({
                type: constants.PROJECTS_FETCH_SUCCESS,
                payload: projects
            });

            expect(store.getState().currentProject.get('id')).toBe('1');
        });

        it('must merge project', function() {
            let projects = [
                { id: '1' },
                { id: '2', created: '444' }
            ];

            fakeFlux.dispatcher.dispatch({
                type: constants.PROJECTS_FETCH_SUCCESS,
                payload: projects
            });

            let newProject = { id: '2', updated: '123' };

            fakeFlux.dispatcher.dispatch({
                type: constants.PROJECTS_FETCH_SUCCESS,
                payload: [newProject]
            });

            let $projects = store.getState().projects;
            expect($projects.size).toBe(2);
            expect($projects.get('2').get('created')).toBe('444');
            expect($projects.get('2').get('updated')).toBe('123');
        });
    });

    describe('targets', function() {
        it('must populate state.project[id].targets', function() {
            var project = { id: '1', title: 'supp' };

            fakeFlux.dispatcher.dispatch({
                type: constants.PROJECTS_FETCH_SUCCESS,
                payload: [project]
            });

            var target = { id: '1', title: 'supp', project: project.id };

            fakeFlux.dispatcher.dispatch({
                type: constants.TARGETS_FETCH_SUCCESS,
                payload: [target]
            });

            let { projects } = store.getState(),
                targets = projects.getIn(['1','targets']);

            expect(targets.size).toBe(1);
        });
        it('must populate state.currentProject.targets', function() {
            var project = { id: '1', title: 'supp' };

            fakeFlux.dispatcher.dispatch({
                type: constants.PROJECTS_FETCH_SUCCESS,
                payload: [project]
            });

            var target = { id: '1', title: 'supp', project: project.id };

            fakeFlux.dispatcher.dispatch({
                type: constants.TARGETS_FETCH_SUCCESS,
                payload: [target]
            });

            let { currentProject } = store.getState(),
                targets = currentProject.get('targets');

            expect(targets.size).toBe(1);
        });
        it('must add target to currentProject', function() {
            var project = { id: '1', title: 'supp' };

            fakeFlux.dispatcher.dispatch({
                type: constants.PROJECTS_FETCH_SUCCESS,
                payload: [project]
            });

            var target = { id: '1', title: 'supp', project: project.id };

            fakeFlux.dispatcher.dispatch({
                type: constants.TARGETS_FETCH_SUCCESS,
                payload: [target]
            });


            let target2 = { id: '2', title: 'supp', project: project.id };

            fakeFlux.dispatcher.dispatch({
                type: constants.ADD_TARGET_SUCCESS,
                payload: target2
            });

            let { currentProject } = store.getState(),
                targets = currentProject.get('targets');

            expect(targets.size).toBe(2);
        });

        it('must switch project if current target setted', function() {
             let projects = [
                { id: '1' },
                { id: '2', created: '444' }
            ];

            fakeFlux.dispatcher.dispatch({
                type: constants.PROJECTS_FETCH_SUCCESS,
                payload: projects
            });

            expect(store.getState().currentProject.get('id')).toBe('1');

            fakeFlux.dispatcher.dispatch({
                type: constants.TARGETS_SET_CURRENT,
                payload: { id:'11', project: '2' }
            });

            expect(store.getState().currentProject.get('id')).toBe('2');
        })
    });

    describe('modal', function() {
        it('must populate state.modal', function() {
            let modal = { name: 'mod' };

            expect(store.getState().modal.get('name')).toBeFalsy();

            fakeFlux.dispatcher.dispatch({
                type: constants.MODAL_OPEN,
                payload: modal

            });
            expect(store.getState().modal.get('name')).toBe('mod');
        });
        it('must clear state.modal', function() {
            let modal = { name: 'mod' };


            fakeFlux.dispatcher.dispatch({
                type: constants.MODAL_OPEN,
                payload: modal
            });

            fakeFlux.dispatcher.dispatch({
                type: constants.MODAL_CLOSE,
                payload: modal
            });

            expect(store.getState().modal.get('name')).toBeFalsy();
        });
    });

});
