'use strict';

import mergeToState from '../merge-to-state';
import { fromJS } from 'immutable';

describe('mergeToState', () => {
    let items;
    let state;

    beforeEach(() => {
        items = [
            { id: '1', some: 'data1' },
            { id: '2', some: 'data2' }
        ];
        state = fromJS({});
    });

    it('should add array of models to store', () => {
        const newState = mergeToState(state, items);

        newState.toJS().should.be.eql({
            [items[0].id]: items[0],
            [items[1].id]: items[1]
        });
    });

    it('should merge one item', () => {
        let newState = mergeToState(state, items[0]);

        newState.toJS().should.be.eql({
            [items[0].id]: items[0]
        });
    });

    it('should merge new data', () => {
        let newState = mergeToState(state, items);

        items[0].title = 'test';
        newState = mergeToState(newState, items[0]);

        newState.toJS().should.be.eql({
            [items[0].id]: items[0],
            [items[1].id]: items[1]
        });
    });
});

