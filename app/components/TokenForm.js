/**
 * TokenForm
 */

import { Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { createToken } from '../actions/tokensActions';
import autobind from '../lib/autobind'; // eslint-disable-line no-unused-vars

import { Input, Button } from 'react-bootstrap';

export default class TokenForm extends Component {
    shouldComponentUpdate = shouldComponentUpdate;
    state = { name: '' };

    @autobind
    onSubmit(e) {
        e.preventDefault();

        const { name } = this.state;

        if (name) createToken(name);

        this.setState({ name: '' });
    }

    @autobind
    onChange() {
        this.setState({ name: this.refs.name.getValue() });
    }

    render() {
        const { name } = this.state;
        const button = <Button
            disabled={!name.length}
            type="submit"
            bsStyle="primary">
            {iget('Add token')}
        </Button>;

        return <form onSubmit={this.onSubmit}>
            <Input
                value={name}
                onChange={this.onChange}
                ref="name"
                type='text'
                placeholder={iget('New token name')}
                buttonAfter={button}/>
        </form>;
    }
}

