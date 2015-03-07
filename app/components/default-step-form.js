"use strict";

import { createClass } from 'react/addons';
import ImMixin from 'react-immutable-render-mixin';

export default createClass({
    mixins: [ImMixin],

    render() {
        return <form className="text-center"><strong>
            {iget('No form provided for this plugin')}
        </strong></form>
    }
});

