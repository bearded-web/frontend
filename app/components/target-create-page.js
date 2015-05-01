/**
 * TargetCreatePage contain form for creating target
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import targetCreateStore from '../stores/target-create.store';
import setTitle from '../lib/set-title';
import { bindAll } from 'lodash';
import { changeEditable, saveEditable } from '../actions/targ.actions';

import Header from './header';
import TargetCreateForm from './target-create-form';
import Ibox, { IboxTitle, IboxContent } from './ibox';
import { Row, Col } from 'react-bootstrap';

export default class TargetCreatePage extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onStoreChange',
            'onTargetChange',
            'onFormSubmit'
        ]);

        this.state = this.getState();

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    //region life cycle
    componentDidMount() {
        setTitle(iget('New target'));

        targetCreateStore.onChange(this.onStoreChange);

        const projectId = flux.store('Store').getState().currentProject.get('id');
        changeEditable(this.getState().target.set('project', projectId));
    }

    componentWillUnmount() {
        targetCreateStore.offChange(this.onStoreChange);
    }

    //endregion

    //region handlers

    onFormSubmit() {
        saveEditable();
    }

    onTargetChange(target) {
        changeEditable(target);
    }

    //endregion handlers


    //region render

    render() {
        const { loading, error, target, invalid } = this.state;

        return <div>
            <Header>
                <h2>{iget('Create new target')}</h2>
            </Header>

            <Row><Col xs={12} md={8} mdOffset={2}>
                <Ibox><IboxTitle>

                    <h5>{iget('Fill the form to create target')}</h5>

                </IboxTitle><IboxContent>

                    <TargetCreateForm
                        target={target}
                        onChange={this.onTargetChange}
                        onSubmit={this.onFormSubmit}
                        error={error}
                        invalid={invalid}
                        disabled={loading}/>

                </IboxContent></Ibox>
            </Col></Row>
        </div>;
    }

    //endregion render

    //region Private methods
    onStoreChange() {
        this.setState(this.getState());
    }

    getState() {
        return targetCreateStore.getState();
    }

    //endregion
}

TargetCreatePage.propTypes = {};
TargetCreatePage.contextTypes = {
    flux: PropTypes.object.isRequired
};

