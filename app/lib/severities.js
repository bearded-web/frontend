/**
 * Severities types
 */

'use strict';

export const HIGH = 'high';
export const MEDIUM = 'medium';
export const LOW = 'low';
export const INFO = 'info';

export const ERROR = 'error';

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
