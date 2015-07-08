/**
 * TechIcon
 */

import { Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Tech } from '../lib/types';
import { create as createStyle } from 'react-style';

const S = createStyle({
    noIcon: {
        display: 'inline-block',
        width: 32,
        height: 32,
        background: '#ccc',
        color: '#fff',
        lineHeight: '32px',
        fontSize: '24px',
        textAlign: 'center',
        verticalAlign: 'middle'
    }
});

export default class TechIcon extends Component {
    static propTypes = {
        tech: Tech
    };
    shouldComponentUpdate = shouldComponentUpdate;

    render() {
        const { name } = this.props.tech;
        let iconSrc = name.replace('!', '');

        try {
            iconSrc = require(`../styles/techIcons/${iconSrc}.png`);
            return <img src={iconSrc} alt={name}/>;
        }
        catch (e) {
            // when not found
            const letter = name.slice(0, 1).toUpperCase();
            return <span style={S.noIcon}>{letter}</span>;
        }
    }
}
