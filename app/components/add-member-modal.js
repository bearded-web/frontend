import React, { PropTypes, addons } from 'react/addons';
import { Map } from 'immutable';
import { addMember, fillMembersSuggest } from '../actions/project.actions.js';
import { closeModal } from '../actions/app.actions.js';
import flux from '../flux';
import { debounce } from 'lodash';

let { PureRenderMixin } = addons;

import ErrorMessage from './error-message';
import { Modal, Input, Button } from 'react-bootstrap';
import Member from './project-member';
import SuggestUsers from './suggest-users';

export default React.createClass({
    mixins: [
        PureRenderMixin,
        FluxMixin,
        flux.createStoreWatchMixin('Store')
    ],

    propTypes: {
        params: PropTypes.shape({
            project: PropTypes.instanceOf(Map)
        }).isRequired,
        onRequestHide: PropTypes.func
    },


    getStateFromFlux() {
        let state = flux.store('Store').getState();

        return {
            $projects: state.projects,
            $membersSuggest: state.membersSuggest
        };
    },

    componentDidMount() {
        fillMembersSuggest('');
    },

    onEmailChange: debounce(function() {
       let email = this.refs.email.getValue();

       fillMembersSuggest(email);
    }, 500),

    addMember($user) {
        let { params } = this.props,
            $project = params.project;
            
        addMember($project.get('id'), $user);
        this.refs.email.getDOMNode().childNodes[1].value = '';
        fillMembersSuggest('');
    },

    render() {
        let error = '',
            { onRequestHide, params } = this.props,
            $project = params.project,
            title = __('Add member to project');
            
        $project = this.state.$projects.get($project.get('id'));

        let { $membersSuggest } = this.state;

        console.log('suggest',$membersSuggest.toJS())

        
        let $members = $project.get('members');

        return <Modal title={title} onRequestHide={onRequestHide}  animation={true}>
            <div className="modal-body">
                <form>
                    <label>{__('Members')}</label>
                    <div>
                        {$members.toArray().map(function($member){
                            return <Member member={$member} />
                        })}
                    </div>
                    <br style={{clear:'both'}}/>
                    <br/>
                    <Input 
                        ref="email"
                        onChange={this.onEmailChange}
                        required
                        label={__('User email')} 
                        type="email"
                        placeholder={__('User email')}/>

                    <div>
                        <SuggestUsers $users={$membersSuggest} onSelect={this.addMember}/>
                       
                    </div>
                   
                    <ErrorMessage text={error} />
                </form>
            </div>
            <div className="modal-footer">
                <Button onClick={onRequestHide}>
                    {__('Close')}
                </Button>
            </div>
        </Modal>
    }
});

if (module.hot) {
    module.hot.accept([
        './suggest-user'
    ], function() {
        //TODO flux add actions
    });
}