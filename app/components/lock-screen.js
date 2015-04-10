/**
 * Lock screen component. Use
 */

'use strict';

import React, { PropTypes, Component, createClass } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';
import { logIn, logOut } from '../actions/app.actions';
import cName from 'classnames';
import { bindAll } from 'lodash';
import { grayColor } from '../style';

export default class LockScreen extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onSubmit',
            'onLoginLinkClick'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onSubmit() {
        const password = this.refs.pwd.getDOMNode().value;
        const email = this.props.user.get('email');

        logIn(email, password);
    }

    onLoginLinkClick() {
        logOut();
    }

    render() {
        const { avatar, email } = this.props.user.toObject();
        const { loginError } = this.props;
        const style = {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: grayColor,
            zIndex: 2000
        };
        const avatarStyle = { margin: '1rem' };
        const controlClass = cName('form-group', { 'has-error': loginError });

        return <div style={style}>
            <div className="middle-box text-center lockscreen animated fadeInDown">
                <h3>
                    <img alt="image"
                         className="img-circle circle-border"
                         style={avatarStyle}
                         src={avatar}/>
                    {email}
                </h3>


                <form onSubmit={this.onSubmit} className="m-t" role="form">
                    <div className={controlClass}>
                        <input type="password"
                               ref="pwd"
                               className="form-control"
                               placeholder="******"
                               required
                               autoComplete="off"/>
                        <span className="help-block">{loginError}</span>
                    </div>
                    <button type="submit" className="btn btn-primary block full-width">Unlock</button>
                    <br/>
                    <a onClick={this.onLoginLinkClick} className="btn btn-sm btn-white btn-block">
                        {iget('Use another account')}
                    </a>
                </form>
            </div>
        </div>;
    }
}

LockScreen.propTypes = {
    user: Model,
    loginError: PropTypes.string.isRequired
};

/* istanbul ignore if  */
if (module.hot) {
    module.hot.accept([
        '../actions/app.actions',
        '../lib/types',
        '../style'
    ], function() {
    });
}
