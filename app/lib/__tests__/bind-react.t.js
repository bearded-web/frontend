'use strict';

import bind from '../bind-react';

describe('bindThis', () => {
    let Compoent = null;
    let instance = null;

    beforeEach(() => {
        class Test {
            constructor() {
                this.value = 1;
            }

           // @bind
            method() {
                return this.value;
            }
        }

        Compoent = Test;
        instance = new Compoent();
    });

    it('should bind method', () => {
        const method = instance.method;

        method().should.be.eql(1);
    });

    it('should bind after proto changed', () => {

    });
});
