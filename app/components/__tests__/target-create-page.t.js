'use strict';

import mockery from 'mockery';

describe.skip('TargetCreatePage', function() {
    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerMock('./target-create-form', MockComponent);

        mockery.registerMock('../stores/target-create.store', createStoreMock({
            loading: false,
            error: ''
        }));

        mockery.registerAllowable('../target-create-page', true);
        Component = require('../target-create-page');

        instance = TestUtils.renderIntoDocument(
            <Component/>
        );
    });

    describe('loading', () => {
        it('should set form disabled if not loading state', () => {
            const form = byType(instance, MockComponent)[0];

            form.props.disabled.should.be.false;
        });
        it('should set form disabled if loading state', () => {
            mockery.deregisterAll();

            mockery.registerMock('./target-create-form', MockComponent);

            mockery.registerMock('../stores/target-create.store', createStoreMock({
                loading: true,
                error: ''
            }));

            mockery.registerAllowable('../target-create-page', true);
            Component = require('../target-create-page');

            instance = TestUtils.renderIntoDocument(
                <Component/>
            );

            const form = byType(instance, MockComponent)[0];

            form.props.disabled.should.be.true;
        });
    });
});
