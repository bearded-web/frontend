'use strict';

/**
 * Change document title
 * @param {String} [title] new title
 */
export default function setTitle(title) {
    title = title ?
    title + ' • Bearded' :
        'Bearded';

    document.title = title;
}
