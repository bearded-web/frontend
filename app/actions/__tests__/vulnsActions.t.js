'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';
import C from '../../constants';

describe('vulnsActions', function() {
    const vulns = [
        { id: '1', title: 't' },
        { id: '2', title: 't2' }
    ];

    let actions = null;
    let apiMock = null;
    let dispatch = null;

    beforeEach(() => {
        apiMock = {
            vulndb: {
                compact: () => new FakePromise(true, false, { results: vulns })
            }
        };

        mockery.registerMock('../lib/api3', apiMock);


        dispatch = spy();
        mockery.registerMock('../lib/disp', {
            dispatch: dispatch
        });

        mockery.registerAllowable('../vulnsActions', true);
        actions = require('../vulnsActions');
    });

    describe('fetchVulnsCompact', function() {
        beforeEach(() => actions.fetchVulnsCompact());

        it('should dispatch VULNS_FETCH_START', function() {
            dispatch.should.have.been.calledWith(C.VULNS_FETCH_START);
        });

        it('should dispatch VULNS_FETCH_SUCCESS with data', () => {
            dispatch.secondCall.args.should.eql([C.VULNS_FETCH_SUCCESS, {
                vulns
            }]);
        });
    });
});
