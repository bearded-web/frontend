/**
 * Loading
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { highlightColor } from '../style';
import { create as createStyle } from 'react-style';

import Fa from './fa';

const S = createStyle({
    loading: {
        textAlign: 'center'
    }
});

export default class Loading extends Component {
    static propTypes = {
        style: PropTypes.object,
        text: PropTypes.string
    };
    shouldComponentUpdate = shouldComponentUpdate;

    render() {
        const { text, style } = this.props;

        return <div styles={[S.loading, style]}>
            <Fa icon="play-circle-o" spin size="2x"/>
            <br/>
            {text}
        </div>;
    }
}
