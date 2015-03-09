'use strict';

import { fromJS, List } from 'immutable';
import { wpScanStarted } from '../actions/app.actions';
import { startFakeTechs, startFakeWp } from '../actions/scan.actions';

var Fluxxor = require('fluxxor'),
    _ = require('lodash'),
    merge = require('../lib/merge-collections'),
    C = require('../constants');

var loading = true;

let ava = require('../components/feed-item/derp.png');



module.exports = Fluxxor.createStore({
    target: null,
    plans: [],
    allScans: [],
    $comments: List(),
    showTechs: false,
    showIssues: false,
    showPs: true,

    showFakeComment: false,

    wpStarted: false,

    initialize: function() {
        this.bindActions(
            C.TARGETS_SET_CURRENT, this._onTargetsSetCurrent,
            C.TARGETS_UNSET_CURRENT, this._onTargetsUnsetCurrent,
            C.PLANS_FETCH_SUCCESS, this._onPlansFetchSuccess,
            C.SCANS_DETECT_CREATED, this._onScansDetectCreated,
            C.SCANS_FETCH_SUCCESS, this._onScansFetchSuccess,
            C.TARGETS_COMMENTS_FETCH_SUCCESS, this._onCommentsFetch,
            C.FAKE_ADD_COMMENT, this._onFakeComent,
            C.FAKE_ADD_PENTESTERS, this._onFakePentesters
        );
    },

    _onFakeComent() {
        this.showFakeComment = true;

        this._emitChange();
    },

    _onFakePentesters() {
        this.showPs = false;

        this._emitChange();
    },

    getState: function() {
        var { target, $comments, showTechs, showIssues, showPs } = this,
            scans,
            detectPlan;

        detectPlan = _.find(this.plans, { name: 'detectWeb' }) || {};

        scans = _(this.allScans)
            .where({ target: target ? target.id : '-' })
            .sortBy('created')
            .reverse()
            .valueOf();

        if (this.showFakeComment) {
            let scanId = scans[0].id;
            let fakeCommentLink = `/#/report?scan=${scanId}&target=${this.target.id}`;
            // $comments = $comments.unshift(fromJS({
            //     "id":"54fb6ce1c168ae4093000326",
            //     "owner":{"id":"54ba68b5c168ae6d38000001",
            //     "nickname":"Mike Mayers ",
            //     "email":"slonoed@gmail.com",
            //     "avatar":ava,
            //     "created":"2015-01-17T10:50:45.007-03:00","updated":"2015-01-31T15:47:50.657-03:00"},
            //     text: `Hi! My name is Mike. I'm your manager now. [Click this link](${fakeCommentLink} "Scan report") to see issue`
            // }));
        }

        return { showPs, target, scans, detectPlan,
             loading, $comments, showTechs, showIssues };
    },

    _onTargetsSetCurrent: function(target) {
        loading = false;
        this.target = target;

        startFakeTechs(this.target.id, this.target.project);

        this._emitChange();
    },

    _onTargetsUnsetCurrent: function() {
        loading = true;

        this._emitChange();
    },

    _onPlansFetchSuccess: function(plans) {
        this.plans = plans;

        this._emitChange();
    },

    _onScansDetectCreated: function(scan) {
        this.allScans.unshift(scan);

        this._emitChange();
    },

    _onScansFetchSuccess: function(scans) {
        merge(this.allScans, scans);

        this.showTechs = this.showTechs ||
            scans.some((scan) => {
                let show = scan.status === 'finished' &&
                    scan.sessions[0].step.name === 'Detect technologies';

                
                if (show && !this.showTechs) {
                    startFakeWp(this.target.id, this.target.project);
                }



                return show;
            });

        this.showIssues = this.showIssues ||
            scans.some((scan) => {
                let finished = scan.status === 'finished';
                    
                let r = scan.sessions[0].step.name === 'Detect wordpress' && finished;

                if (r)
                    setTimeout(()=>{
                        this.showFakeComment = true;
                    }, 2500);

                return r
            });


        scans.forEach((scan) => {
            let started = scan.sessions[0].step.name === 'Detect wordpress';

            if (started && !this.wpStarted) {
                this.wpStarted = true;

                setTimeout(() => {
                    wpScanStarted(this.target);
                }, 100);
            }
        });

        this._emitChange();
    },

    _onCommentsFetch(comments) {
        comments[0].avatar = ava;
        comments[0].nickname = 'Mike Mayers';

        this.$comments = fromJS(comments);

        this.emit('change');
    },


    _emitChange: function() {
        this.emit('change');
    }
});
