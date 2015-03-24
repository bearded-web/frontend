/*eslint-disable*/
'use strict';

import React from 'react/addons';

import { Button, Col, Label } from 'react-bootstrap';
import Fa from './fa';

export default React.createClass({
    getInitialState() {
        return {
            specs: [
                {
                    name: 'Sam Fisher',
                    avatar: require('./feed-item/no.png'),
                    match: 97,
                    labels: [
                        'Wordpress',
                        'Angular',
                        'Jquery',
                        'Nginx',
                        'Ubuntu',
                        'MySQL'
                    ]
                },
                {
                    name: 'Ivan Ivanov',
                    avatar: require('./feed-item/megusta.png'),
                    match: 92,
                     labels: [
                        'Wordpress',
                        'Jquery',
                        'Nginx',
                        'Ubuntu',
                        'MySQL',
                        'Apache',
                        'React'
                    ]
                },
                {
                    name: 'Gred Selinger',
                    avatar: require('../me_beard_glasses.jpg'),
                    match: 86,
                    labels: [
                        'Wordpress',
                        'Jquery',
                        'Backbone',
                        'Apache',
                        'Angular',
                        'Nginx',
                        'Ubuntu'
                    ]
                },
                {
                    name: 'Walter White',
                    avatar: require('../walter-white-bearded.jpg'),
                    match: 81,
                    labels: [
                        'Wordpress',
                        'Jquery',
                        'Angular',
                        'React'
                    ]
                },
                {
                    name: 'Jessy pinkman',
                    avatar: require('../pinkman.jpg'),
                    match: 77,
                    labels: [
                        'Wordpress',
                        'Jquery',
                        'Debian',
                        'Windows',
                        'Meteor'
                    ]
                }
            ]
        }
    },

    render() {
        let { specs } = this.state;

        return <div>
            {specs.map(this.renderSpec)}
        </div>
    },

    renderSpec(spec, i) {
        let checkHanlder = function(e) {
            e.preventDefault();
            spec.checked = true; this.forceUpdate() 
        }.bind(this);

        let avatar = spec.avatar;

        let match = spec.match;
        let labels = spec.labels || [];

        return <div className="contact-box">
            <div className="col-sm-2">
                <div className="text-center">
                    <div style={{width: '45px', margin: '0 auto'}}>
                        <img alt="image" className="img-circle m-t-xs img-responsive" src={avatar} />
                    </div>
                    <h3>{match}%</h3>
                </div>
            </div>
            <div className="col-sm-8">
                <h3><strong>{spec.name}</strong></h3>
                <div>
                {labels.map((label, i) => {
                    return <Label bsStyle="success" style={{margin: '2px', float: 'left'}}>{label}</Label>
                })}
                </div>
            </div>
            <Col sm={2}>
                <Button 
                    onClick={checkHanlder}
                    className="btn-circle pull-right"
                    bsStyle={spec.checked ? 'success' : 'default'}>
                    <Fa icon="check"/>
                </Button>
            </Col>
            <div className="clearfix"></div>
        </div>
    }
})
