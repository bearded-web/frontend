'use strict';

import { PropTypes, Component, findDOMNode } from 'react/addons';

export default class Upload extends Component {
    constructor() {
        super();

        this.state = { withFiles: false };
    }

    componentDidMount() {
        let Dropzone = require('../lib/dropzone');
        var options = {};
        for (var opt in Dropzone.prototype.defaultOptions) {
            var prop = this.props[opt];
            if (prop) {
                options[opt] = prop;
                continue;
            }
            options[opt] = Dropzone.prototype.defaultOptions[opt];
        }

        this.dropzone = new Dropzone(findDOMNode(this), options);

        this.dropzone.on('addedfile', () => {
            this.setState({ withFiles: true });
        });

        if (this.props.onChange) {
            this.dropzone.on('drop', this.props.onChange);
        }

        if (this.props.onFileAdded) {
            this.dropzone.on('success', (f, file) => {
                this.props.onFileAdded(file);
            });
        }
    }

    componentWillUnmount() {
        this.dropzone.destroy();
        this.dropzone = null;
    }

    render() {
        const { withFiles } = this.state;
        const { children } = this.props;

        return <div className="dropzone">
            <div ref="dz" className="dropzone-style ">
                {withFiles || <div className="dz-message">
                    {children}
                </div>}
            </div>
        </div>;
    }
}

Upload.propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    onFileAdded: PropTypes.func
};
Upload.defaultProps = {
    url: '/api/v1/files'
};
