import Raven from 'raven-js';

let inited = false;

export function init(address) {
    try {
        Raven.config(address).install();

        inited = true;
    }
    catch(e) {
        console.error(e);
    }
}

export function captureException(...data) {
    if (inited) Raven.captureException(...data);
}
