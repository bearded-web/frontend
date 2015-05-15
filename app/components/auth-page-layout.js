'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';

import Logo from './logo';

export default class AuthPageLayout extends Component {
    constructor(props, context) {
        super(props, context);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    render() {
        const { children } = this.props;

        return <div className="auth-overlay">
            <div className="middle-box text-center loginscreen  animated fadeInDown">
                <div>
                    <div>
                        <Logo/>
                    </div>
                    <br/>
                    <p>{iget('Great system to protect your business')}</p>
                    <br/>

                    {children}

                    <p className="m-t">
                        <small>Barbudo team &copy; 2015</small>
                    </p>
                </div>
            </div>
        </div>;
    }
}

AuthPageLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.oneOf[PropTypes.bool]
    ])
};

