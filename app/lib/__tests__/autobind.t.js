'use strict';

import bind from '../autobind';

describe('bindThis', () => {
    let Component = null;
    let instance = null;

    beforeEach(() => {
        class Test {
            constructor() {
                this.value = 1;
            }

            @bind
            method() {
                return this.value;
            }
        }

        Component = Test;
        instance = new Component();
    });

    it('should bind method', () => {
        const method = instance.method;

        method().should.be.eql(1);
    });

    it('should bind after proto changed', () => {

    });
});
