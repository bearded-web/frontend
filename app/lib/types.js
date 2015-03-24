'use strict';

import { PropTypes } from 'react/addons';
import { Map, OrderedMap } from 'immutable';

export function $Model(props, propName, componentName) {
    let prop = props[propName];

    if (!Map.isMap(prop) || !prop.get('id')) {
        return new Error(`You must pass Model for prop ${propName}, check ${componentName}`);
    }
}

export function $Models(props, propName, componentName) {
    let prop = props[propName];

    if (!Map.isMap(prop) && !OrderedMap.isOrderedMap(prop)) { //TODO add checking each model
        return new Error(`You must pass Models for prop ${propName},
            but you pass ${prop},
            check ${componentName}`);
    }
}
