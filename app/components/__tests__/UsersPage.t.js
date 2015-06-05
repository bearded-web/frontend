import { spy, match } from 'sinon';
import mockery from 'mockery';
import rewire from 'rewire';

describe('UsersPage', () => {
    let Component = null;
    let instance = null;
    let fetchPage = null;

    beforeEach(function() {
        fetchPage = spy();
        mockery.registerMock('../actions/usersActions', {
            fetchPage
        });

        mockery.registerAllowable('../UsersPage', true);
        Component = require('../UsersPage');

        const query = { page: '2' };
        const Stub = stubRouterContext(Component, { pageSize: 21, query }, {});
        instance = TestUtils.renderIntoDocument(
            <Stub/>
        );
        instance = byType(instance, Component)[0];
    });

    it('should call fetchPage with page param from query', () => {
        fetchPage.should.have.been.calledWith(match({ page: '2' }));
    });

    it('should call fetch page with pageSize from store', () => {
        fetchPage.should.have.been.calledWith(match({ pageSize: 21 }));
    });
});
