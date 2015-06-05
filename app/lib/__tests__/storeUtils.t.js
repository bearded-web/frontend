import * as storeUtils from '../storeUtils';
import { OrderedMap, fromJS } from 'immutable';


describe('storeUtils', () => {
    describe('pickItemsByIds', () => {
        it('should return items OrderedMap', () => {
            const state = fromJS({
                '1': { id: '1' },
                '2': { id: '2' },
                '3': { id: '3' }
            });

            let result = storeUtils.pickItemsByIds(state, ['3', '1']);
            OrderedMap.isOrderedMap(result).should.be.eql(true);
            result = result.toArray();
            result.should.have.length(2);
            result[0].get('id').should.be.eql('3');
            result[1].get('id').should.be.eql('1');
        });

    });
});
