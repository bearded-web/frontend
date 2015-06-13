let inited = false;

export function init(address) {
    if (!window) return;

    try {
        const Raven = require('raven-js');
        Raven.config(address).install();

        inited = true;
    }
    catch(e) {
        /* eslint-disable no-console */
        console.error(e);
    }
}

export function captureException(...data) {
    const Raven = require('raven-js');
    if (inited) {
        Raven.captureException(...data);
    }
    else {
        console.log('Exception data', ...data);
    }
}
