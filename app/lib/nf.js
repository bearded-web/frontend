import { isObject, mapValues } from 'lodash';
import Baobab from 'baobab';
import React, { PropTypes, Component } from 'react/addons';

export function context(specs = {}, mutators = {}) {
    return function(C) {
        return branch(C, specs);
    };

    function branch(Cmp, specs = {}) {
        if (!isObject(specs)) {
            throw Error(`baobab-react.higher-order: invalid specifications
                (should be an object with cursors and/or facets key).`);
        }

        return class extends Component {
            static contextTypes = {
                router: PropTypes.func.isRequired,
                tree: PropTypes.instanceOf(Baobab).isRequired,
                api: PropTypes.object.isRequired
            };

            // Building initial state
            constructor(props, context) {
                super(props, context);

                const facet = context.tree.createFacet(specs, [props, context]);

                if (facet) this.state = facet.get();

                this.facet = facet;
            }

            // On component mount
            componentWillMount() {
                if (!this.facet) return;

                this.facet.on('update', () => {
                    this.setState(this.facet.get());
                });
            }

            // Render shim
            render() {
                const { tree, api, router } = this.context;
                const ms = mapValues(mutators, m => m.bind(null, { tree, api, router }));
                return <Cmp ref="cmp" {...this.state} {...ms} {...this.props} />;
            }

            // On component unmount
            componentWillUnmount() {
                if (!this.facet) {
                    return;
                }

                // Releasing facet
                this.facet.release();
                this.facet = null;
            }

            // On new props
            componentWillReceiveProps(props) {
                if (!this.facet) {
                    return;
                }

                this.facet.refresh([props, this.context]);
                this.setState(this.facet.get());
            }
        };
    }
}
