/**
 * UserCard
 */

import { Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';
import { create as createStyle } from 'react-style';
import moment from 'moment';

import Avatar from './avatar';

const S = createStyle({
    email: {
        wordBreak: 'break-all'
    }
});

export default class UserCard extends Component {
    static propTypes = {
        user: Model
    };
    shouldComponentUpdate = shouldComponentUpdate;

    render() {
        const { avatar, email, created } = this.props.user.toObject();
        const createdStr = moment(created).format('YYYY-MM-DD HH:mm');

        return <div className="contact-box">
            <div className="col-sm-4">
                <div className="text-center">
                    <Avatar avatar={avatar}/>

                    <div className="m-t-xs font-bold">Graphics designer</div>
                </div>
            </div>
            <div className="col-sm-8">
                <h3 style={S.email}><strong>{email}</strong></h3>
                <p>{createdStr}</p>
            </div>
            <div className="clearfix"></div>
        </div>;
    }
}

