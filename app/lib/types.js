import { PropTypes } from 'react/addons';
import { Map, OrderedMap } from 'immutable';
import { HIGH, MEDIUM, LOW } from './severities';

const { arrayOf } = PropTypes;
const str = PropTypes.string;
const rStr = str.isRequied;

/*eslint-disable*/
export function $Model(props, propName, componentName) {
    let prop = props[propName];

    if (!Map.isMap(prop) || !prop.get('id')) {
        return new Error(`You must pass Model for prop ${propName}, but you pass ${prop}, check ${componentName}`);
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

export function NaturalNumber(props, propName, componentName) {
    const value = props[propName];

    if(value < 0 || value % 1) {
        return new Error(`You must pass Natural Number for prop ${propName},
            but you pass ${value}, chec ${componentName}`);
    }
}

export function NaturalNumber(props, propName, componentName) {
    const value = props[propName];

    if(value <= 0 || value % 1) {
        return new Error(`You must pass Natural Number for prop ${propName},
            but you pass ${value}, chec ${componentName}`);
    }
}

export function NaturalNumberWithZero(props, propName, componentName) {
    const value = props[propName];

    if(value < 0 || value % 1) {
        return new Error(`You must pass Natural Number or zero for prop ${propName},
            but you pass ${value}, chec ${componentName}`);
    }
}

export const Member = PropTypes.shape({
    user: rStr
});

export const Project = PropTypes.shape({
    id: rStr,
    name: rStr,
    members: PropTypes.arrayOf(Member).isRequired
});

export const Tech = PropTypes.shape({
    id: rStr
});

export const Target = PropTypes.shape({
    id: rStr,
    name: rStr,
    url: rStr,
    categories: arrayOf(str),
    target: rStr,
    project: rStr,
    version: rStr
});

export const User = PropTypes.shape({
    id: rStr,
    name: rStr,
    avatar: rStr,
    email: rStr
});

export const Agent = PropTypes.shape({
    id: rStr,
    status: rStr,
    name: rStr
});

export const Plan = PropTypes.shape({
    id: rStr,
    name: rStr
});

export const FeedItem = PropTypes.shape({
    id: rStr
});

export const Issue = PropTypes.shape({
    id: rStr
});
/*eslint-enable*/
