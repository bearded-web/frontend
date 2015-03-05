import React, { addons, PropTypes } from 'react/addons';

import { Input, Button } from 'react-bootstrap';

let { PureRenderMixin, classSet } = addons;

export default React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        onNewComment: PropTypes.func
    },

    onSubmit(event) {
        let input = this.refs.text,
            text = input.getValue();
        
        event.preventDefault();

        if (!text) return;

        this.props.onNewComment(text);
        input.getDOMNode().childNodes[0].value = '';
    },

    render: function() {
        let { onNewComment } = this.props;
            
        return <form onSubmit={this.onSubmit}>
            <Input 
                type="textarea"
                ref="text"
                placeholder={iget('Enter comment text')}/>

            <Button 
                type="submit"
                bsSize="small"
                bsStyle="primary">
            
                {iget('Add comment')}
            </Button>
        </form>
    }
});

