/**
 * Page for user profile, settings, etc.
 */

import { Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import settingsStore from '../stores/user-settings.store';
import { bindAll } from 'lodash';
import setTitle from '../lib/set-title';
import autobind from '../lib/autobind';

import Header from './header';
import { Row, Col } from 'react-bootstrap';
import ChangePasswordForm from './change-password-form';
import Ibox, { IboxTitle, IboxContent } from './ibox';
import Tokens from './Tokens';

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
        setTitle(iget('Settings'));

        settingsStore.onChange(this.onStoreChange);
    }

    componentWillUnmount() {
        settingsStore.offChange(this.onStoreChange);
    }

    @autobind
    onStoreChange() {
        this.setState(this.getState());
    }

    getState() {
        return settingsStore.getState();
    }

    render() {
        const { password, oldPassword, loading, error, success } = this.state;

        return <div>
            <Header>
                <Col xs={12}>
                    <h2>Settings</h2>
                </Col>
            </Header>

            <Row>
                <Col xs={12} lg={4}>
                    <Ibox><IboxTitle><h5>{iget('Set new password')}</h5></IboxTitle><IboxContent>
                        <ChangePasswordForm
                            success={success}
                            disabled={loading}
                            error={error}
                            password={password}
                            oldPassword={oldPassword}/>
                    </IboxContent></Ibox>
                </Col>
                <Col xs={12} lg={8}>
                    <Ibox><IboxTitle><h5>{iget('Tokens')}</h5></IboxTitle><IboxContent>
                        <Tokens/>
                    </IboxContent></Ibox>
                </Col>
            </Row>
        </div>;
    }
}

UserSettingsPage.propTypes = {};

