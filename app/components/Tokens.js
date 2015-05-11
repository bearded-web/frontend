import { Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { fetchTokens } from '../actions/tokensActions';
import connectToStores from '../lib/connectToStores';
import { Models } from '../lib/types';
import tokensStore from '../stores/tokensStore';

import TokenForm from './TokenForm';
import TokensList from './TokensList';

function getState(props) {
    return { tokens: props.tokens || tokensStore.getRawState() };
}

@connectToStores([tokensStore], getState)
export default class Tokens extends Component {
    static propTypes = {
        tokens: Models
    };
    shouldComponentUpdate = shouldComponentUpdate;

    componentDidMount() {
        fetchTokens();
    }

    render() {
        const { tokens } = this.props;

        return <div>
            {tokens.size > 0 ? <TokensList tokens={tokens}/> : ''}
            <TokenForm/>
        </div>;
    }
}

