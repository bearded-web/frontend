/**
 * Page for user profile, settings, etc.
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import settingsStore from '../stores/user-settings.store';
import { bindAll } from 'lodash';

import Header from './header';
import { Grid, Row, Col } from 'react-bootstrap';
import ChangePasswordForm from './change-password-form';
import Ibox, { IboxTitle, IboxContent } from './ibox';

export default class UserSettingsPage extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onStoreChange'
        ]);

        this.state = {};

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    componentDidMount() {
        settingsStore.onChange(this.onStoreChange);
    }


    componentWillUnmount() {
        settingsStore.offChange(this.onStoreChange);
    }

    onStoreChange() {
        this.setState(this.getState());
    }

    getState() {
        return settingsStore.getState();
    }

    render() {
        const { password, oldPassword, loading, error } = this.state;

        return <div>
            <Header>
                <Col xs={12}>
                    <h2>Settings</h2>
                </Col>
            </Header>

            <Row>
                <Col xs={12} sm={6} md={4}>
                    <Ibox><IboxTitle><h5>{iget('Set new password')}</h5></IboxTitle><IboxContent>
                        <ChangePasswordForm
                            disabled={loading}
                            error={error}
                            password={password}
                            oldPassword={oldPassword}/>
                    </IboxContent></Ibox>
                </Col>
            </Row>
        </div>;
    }
}

UserSettingsPage.propTypes = {};

