import 'vis/dist/vis.css';
import { Component, findDOMNode, PropTypes } from 'react';
import vis from 'vis/dist/vis';

export default class Timeline extends Component {
    static propTypes = {
        onSelect: PropTypes.func,
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired
        }))
    };

    componentDidMount() {
        const { items, onSelect, ...options } = this.props;
        // Create a DataSet (allows two way data-binding)
        this.data = new vis.DataSet(items);

        // Create a Timeline
        this.timeline = new vis.Timeline(findDOMNode(this), this.data, options);

        if (onSelect) this.timeline.on('select', onSelect);
    }
    componentWillUnmount() {
        this.timeline.destroy();
        this.timeline = null;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.props.items) {
            this.data.clear();
            this.data.add(nextProps.items);
        }
    }

    render() {
        return <span></span>;
    }
}
