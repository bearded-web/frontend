'use strict';

import { cloneElement, PropTypes, addons, Component } from 'react/addons';
import Title from './ibox-title';
import Content from './ibox-content';

let { PureRenderMixin } = addons;

/**
 * Panel container
 */
export default class Ibox extends Component {
    static propTypes = {
        children: PropTypes.node
    };
    constructor() {
        super();

        this.state = { expanded: true };
    }

    onToggle() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    render() {
        const { expanded } = this.state;
        const { children } = this.props;

        let title;
        let ch = children;

        const withTitle = children && children[0] && children[0].type === Title;
        const withContent = children && children[1] && children[1].type === Content;

        if (withTitle && withContent && children.length === 2) {
            ch = [];
            ch.push(cloneElement(children[0], {
                expanded,
                key: 0,
                onToggle: () => this.onToggle()
            }));
            if (expanded) ch.push(cloneElement(children[1], { key: 1 }));
        }

        return <div {...this.props} className="ibox">
            {ch}
        </div>;
    }
}

export const IboxTitle = Title;
export const IboxContent = Content;

if (module.hot) {
    module.hot.accept(['./ibox-content', './ibox-title']);
}
