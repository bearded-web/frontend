/**
 * Decorator, bind class method to instance
 */

'use strict';

const notHot = !module.hot;

function isReactInstance(t) {
    return notHot || !!t.props;
}

export default function bindThis(target, originKey, descriptor) {
    let key = null;
    let originFn = descriptor.value;

    if (typeof originFn !== 'function') {
        throw new Error('@autobind decorator can only be applied to methods not: ' + typeof originFn);
    }

    if (typeof originKey === 'string') {
        key = Symbol('@autobind method: ' + originKey);
    } else if (typeof originKey === 'symbol') {
        key = Symbol('@autobind method: (symbol)');
    } else {
        throw new Error('Unexpected key type: ' + typeof originKey);
    }

    return {
        set (newFn) {
            this[key] = newFn;
        },
        get () {
            let fn = this[key] || originFn;

            if (isReactInstance(this) && !this.hasOwnProperty(key)) {
                fn = this[key] = fn.bind(this);//TODO check performance
            }

            return fn;
        }
    };
}
