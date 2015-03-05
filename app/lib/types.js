import { PropTypes } from 'react/addons';
import { Map } from 'immutable';

export function $Model(props, propName) {
    let prop = props[propName];

    if (!prop.get || !prop.get('id')) {
        return new Error(`Prop ${propName} id not a immutable Map Model`);
    } 
}