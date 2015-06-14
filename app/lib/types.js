import { PropTypes } from 'react/addons';
import { Map, OrderedMap } from 'immutable';
import { HIGH, MEDIUM, LOW } from './severities';

/*eslint-disable*/
export function $Model(props, propName, componentName) {
    let prop = props[propName];

    if (!Map.isMap(prop) || !prop.get('id')) {
        return new Error(`You must pass Model for prop ${propName}, check ${componentName}`);
    }
}
export const Model = $Model;

export function $Models(props, propName, componentName) {
    const prop = props[propName];

    if (!Map.isMap(prop) && !OrderedMap.isOrderedMap(prop)) { //TODO add checking each model
        return new Error(`You must pass Models for prop ${propName},
            but you pass ${prop},
            check ${componentName}`);
    }
}
export const Models = $Models;

export const Severity = PropTypes.oneOf([HIGH, MEDIUM, LOW]);

export function NaturalNumber(props, propsName, componentName) {
    const value = props[propName];

    if(value < 0 || value % 1) {
        return new Error(`You must pass Natural Number for prop ${propName},
            but you pass ${value}, chec ${componentName}`);
    }
}

export function NaturalNumber(props, propsName, componentName) {
    const value = props[propName];

    if(value <= 0 || value % 1) {
        return new Error(`You must pass Natural Number for prop ${propName},
            but you pass ${value}, chec ${componentName}`);
    }
}

export function NaturalNumberWithZero(props, propsName, componentName) {
    const value = props[propName];

    if(value < 0 || value % 1) {
        return new Error(`You must pass Natural Number or zero for prop ${propName},
            but you pass ${value}, chec ${componentName}`);
    }
}

export const Member = PropTypes.shape({
    user: PropTypes.string.isRequired
});

export const Project = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(Member).isRequired
});

export const User = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
});
/*eslint-enable*/
