/**
 * connectToStore utility
 *
 * Cool idea by Dan Abramov
 * https://github.com/gaearon/flux-react-router-example/blob/master/scripts/utils/connectToStores.js
 */

import React, { Component } from 'react';
// Use immutable shallow equal
import shallowEqual from 'react-immutable-render-mixin/shallowEqualImmutable';

/**
 * Exports a higher-order component that connects the component to stores.
 * This higher-order component is most easily used as an ES7 decorator.
 * Decorators are just a syntax sugar over wrapping class in a function call.
 *
 * Read more about higher-order components: https://goo.gl/qKYcHa
 * Read more about decorators: https://github.com/wycats/javascript-decorators
 */
export default function connectToStores(stores, getState) {
    return function(DecoratedComponent) {
        const displayName =
            DecoratedComponent.displayName ||
            DecoratedComponent.name ||
            'Component';

        return class StoreConnector extends Component {
            static displayName = `connectToStores(${displayName})`;

            constructor(props) {
                super(props);
                this.handleStoresChanged = this.handleStoresChanged.bind(this);

                this.state = getState(props);
            }

            componentWillMount() {
                stores.forEach(store =>
                    store.onChange(this.handleStoresChanged)
                );
            }

            componentWillReceiveProps(nextProps) {
                if (!shallowEqual(nextProps, this.props)) {
                    this.setState(getState(nextProps));
                }
            }

            componentWillUnmount() {
                stores.forEach(store =>
                    store.offChange(this.handleStoresChanged)
                );
            }

            handleStoresChanged() {
                this.setState(getState(this.props));
            }

            render() {
                return <DecoratedComponent {...this.props} {...this.state} />;
            }
        };
    };
}
