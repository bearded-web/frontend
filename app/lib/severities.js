/**
 * Severities types
 */

'use strict';

export const HIGH = 'high';
export const MEDIUM = 'medium';
export const LOW = 'low';


/**
 * Return severity weight. Bigger -> more danger
 * @param {String} severity severity
 * @returns {number} weight
 */
export function weight(severity) {
    if (severity === HIGH) return 3;
    if (severity === MEDIUM) return 2;
    if (severity === LOW) return 1;

    return 0;
}
