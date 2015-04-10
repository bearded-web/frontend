'use strict';

import { PropTypes, createClass, createElement } from 'react/addons';
import { Model } from '../lib/types';
import ImMixin from 'react-immutable-render-mixin';
import { Map } from 'immutable';

import UtilStepForm from './util-step-form';
import DefaultForm from './default-step-form';
import W3afScriptStepForm from './w3af-script-step-form'

export default createClass({
    mixins: [ImMixin],
    displayName: 'StepForm',

    propTypes: {
         step: PropTypes.instanceOf(Map).isRequired,
         plugin: Model,
         onChange: PropTypes.func.isRequired
     },

    /**
     * Method return React component form for edit plan step settings
     */
    getFormComponent() {
        let { plugin } = this.props,
            { type, name } = plugin.toObject();

        switch (true) {
            case name === 'barbudo/w3af-script':
                return W3afScriptStepForm;
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


