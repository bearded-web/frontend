let inited = false;

export function init(address) {
    const Raven = require('raven-js');
    try {
        Raven.config(address).install();

        inited = true;
    }
    catch(e) {
        console.error(e);
    }
}

export function captureException(...data) {
    const Raven = require('raven-js');
    if (inited) {
        Raven.captureException(...data);
    }
}
