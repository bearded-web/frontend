import { spy } from 'sinon';
import { fromJS } from 'immutable';

import UsersList from '../UsersList';

describe('UsersList', () => {
    const Component = UsersList;

    let instance = null;

    it('should change query when sort changed', () => {
        const users = fromJS({
            '1': { id: 1, admin: true }
        });
        const transitionTo = spy();
        const query = { page: '2' };
        const path = 'users';
        const Stub = stubRouterContext(
            Component,
            { users, sortBy: 'email', loading: false },
            {
                transitionTo,
                getCurrentPath: () => path,
                getCurrentQuery: () => query
            }
        );
        instance = TestUtils.renderIntoDocument(
            <Stub/>
        );
        instance = byType(instance, Component)[0];

        const sortBy = 'email';
        instance.onSortChange(sortBy);
        transitionTo.should.have.been.calledWith(path, {}, {
            page: query.page,
            sortBy
        });
    });
});
