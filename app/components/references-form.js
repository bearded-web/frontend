/**
 * ReferencesForm
 */

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { List, Map } from 'immutable';
import bindThis from '../lib/autobind';

import Fa from './fa';
import {
    OverlayTrigger,
    Tooltip,
    Input,
    Button,
    Row } from 'react-bootstrap';

const S = {
    row: {
        position: 'relative',
        paddingRight: '50px'
    },
    remove: {
        position: 'absolute',
        right: '10px',
        lineHeight: 0
    }
};

export default class ReferencesForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }


    //region handlers
    @bindThis
    _onAddClick() {
        this.props.onChange(this.props.references.push(Map({
            url: '',
            title: ''
        })));
    }

    _onRemoveClick(i) {
        this.props.onChange(this.props.references.delete(i));
    }

    /**
     * Firlds change handler
     * @param {String} field field name
     * @param {Number} i ref index
     * @param {Object} e event
     * @private
     */
    @bindThis
    _onFieldChange(field, i, e) {
        const { references } = this.props;
        const { value } = e.target;
        const ref = references
            .get(i)
            .set(field, value);

        this.props.onChange(references.set(i, ref));
    }

    //endregion

    //region render
    render() {
        const { references } = this.props;


        return <form className="form-horizontal">
            {references.toArray().map(this.renderRef)}

            <div className="text-center">
                <Button
                    onClick={this._onAddClick}
                    bsStyle="success">

                    {iget('Add reference')}
                </Button>
            </div>
        </form>;
    }

    @bindThis
    renderRef(ref, i) {
        const { url, title } = ref.toObject();
        const onUrlChange = this._onFieldChange.bind(this, 'url', i);
        const onTitleChange = this._onFieldChange.bind(this, 'title', i);

        return <Row key={i} style={S.row}>
            {this.renderRemoveButton(i)}
            <Input
                value={url}
                onChange={onUrlChange}
                type="text"
                label={iget('Url')}
                placeholder={'https://example.com'}
                labelClassName="col-xs-2"
                wrapperClassName="col-xs-10"/>
            <Input
                value={title}
                onChange={onTitleChange}
                type="text"
                label={iget('Title')}
                placeholder={iget('Link to issue information')}
                labelClassName="col-xs-2"
                wrapperClassName="col-xs-10"/>
        </Row>;
    }

    renderRemoveButton(index) {
        const tooltip = <Tooltip>{iget('Remove reference')}</Tooltip>;

        return <OverlayTrigger
            placement='left'
            overlay={tooltip}>
            <button
                onClick={() => this._onRemoveClick(index)}
                style={S.remove}
                className="btn btn-success btn-circle">
                <Fa icon="close"/>
            </button>
        </OverlayTrigger>;
    }

    //endregion
}

ReferencesForm.propTypes = {
    references: PropTypes.instanceOf(List),
    onChange: PropTypes.func.isRequired
};
