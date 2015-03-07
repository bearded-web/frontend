"use strict";

import { PropTypes, createClass, createElement } from 'react/addons';
import { $Model } from '../lib/types';
import ImMixin from 'react-immutable-render-mixin';

import UtilStepForm from './util-step-form';
import DefaultForm from './default-step-form';

export default createClass({
    mixins: [ImMixin],

    propTypes: {
         $step: PropTypes.instanceOf(Map).isRequired,
         $plugin: $Model,
         onChange: PropTypes.func.isRequired
     },

    /**
     * Method must return React component form for edit plan step settings
     */
    getFormComponent() {
        let { $plugin } = this.props,
            { type, name, version } = $plugin.toObject();

        switch (true) {
            case type === 'util':
                return UtilStepForm;
            default:
                return DefaultForm;
        }
    },

    render() {
        return createElement(this.getFormComponent(), this.props);
    }
});


