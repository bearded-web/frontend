/**
 * VectorForm
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Map } from 'immutable';
import t from 'tcomb-form';
import HeadersForm from './headers-form';

const Form = t.form.Form;
const Entity = t.struct({
    status: t.Str,
    body: t.maybe(t.struct({
        content: t.Str
    })),
    header: t.maybe(t.subtype(t.struct({}), n => true))
});
const Vector = t.struct({
    url: t.maybe(t.Str),
    httpTransactions: t.maybe(t.list(t.struct({
        url: t.Str,
        method: t.enums.of('GET POST PUT DELETE OPTION PATCH'),
        params: t.maybe(t.list(t.Str)),
        request: t.maybe(Entity),
        response: t.maybe(Entity)
    })))
});

export default class VectorForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onFormChange() {

    }

    //region render
    render() {
        const values = this.props.vector.toJS();
        const formOptions = {
            fields: {
                httpTransactions: {
                    disableOrder: true,
                    i18n: {
                        add: iget('Add transaction'),
                        remove: iget('Remove'),
                        optional: ' (' + iget('optional') + ')'
                    },
                    item: {
                        fields: {
                            url: {
                                auto: 'placeholders'
                            },
                            method: {
                                nullOption: false,
                                auto: 'placeholders'
                            },
                            params: {
                                disableOrder: true,
                                i18n: {
                                    add: iget('Add param'),
                                    remove: iget('Remove')
                                }
                            },
                            request: {
                                fields: {
                                    header: {
                                        disableOrder: true,
                                        factory: HeadersForm
                                    }
                                }
                            },
                            response: {
                                fields: {
                                    header: {
                                        disableOrder: true
                                    }
                                }
                            }
                        }
                    }
                },
                summary: {
                    label: iget('Summary'),
                    error: iget('Summary is required')
                },
                vulnType: {
                    nullOption: false
                },
                desc: {
                    type: 'textarea',
                    label: iget('Description')
                },
                references: {
                    disableOrder: true,
                    item: {
                        order: ['title', 'url'],
                        auto: 'placeholders'
                    }
                }
            }
        };

        return <Form type={Vector}
                     ref="form"
                     options={formOptions}
                     onChange={this.onFormChange}
                     value={values}/>;
        //endregion
    }
}

VectorForm.propTypes = {
    vector: PropTypes.instanceOf(Map).isRequired,
    onChange: PropTypes.func.isRequired
};
