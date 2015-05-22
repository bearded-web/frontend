/**
 * Severities types
 */

import { red, orange, blue, lazur, gray } from '../style';

export const HIGH = 'high';
export const MEDIUM = 'medium';
export const LOW = 'low';
export const INFO = 'info';

export const ERROR = 'error';

export const all = [HIGH, MEDIUM, LOW, INFO];

/**
 * Return severity weight. Bigger -> more danger
 * @param {String} severity severity
 * @returns {number} weight
 */
export function weight(severity) {
    if (severity === HIGH) return 4;
    if (severity === MEDIUM) return 3;
    if (severity === LOW) return 2;
    if (severity === INFO) return 1;

    if (severity === ERROR) return 0;

    return 0;
}

/**
 * Return severity icon name (font awesome)
 * @param {String} severity
 * @returns {String} icon name
 */
export function icon(severity) {
    return {
        [HIGH]: 'exclamation-circle',
        [MEDIUM]: 'bug',
        [LOW]: 'eye',
        [INFO]: 'info',
        [ERROR]: 'medkit'
    }[severity];
}

/**
 * Return HEX code for severity color (like #FFDD33)
 * @param {String} severity
 * @return {String} color
 */
export function color(severity) {
    return {
        [HIGH]: red,
        [MEDIUM]: orange,
        [LOW]: blue,
        [INFO]: lazur,
        [ERROR]: gray
    }[severity];
}

/**
 * Return bootstrap bsStyle code
 * @param {String} severity
 * @return {String} color
 */
export function bsStyle(severity) {
    return {
        [HIGH]: 'danger',
        [MEDIUM]: 'warning',
        [LOW]: 'success',
        [INFO]: 'info'
    }[severity];
}
