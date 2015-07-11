import testTree from 'react-test-tree';
import IssuesLifetimeGraph from '../IssuesLifetimeGraph';
import moment from 'moment';
import { cloneDeep } from 'lodash';

describe('IssuesLifetimeGraph', function() {
    let Component = null;
    let instance = null;
    let issues = null;
    let root = null;

    beforeEach(function() {
        issues = getIssues();
        Component = stubContext(IssuesLifetimeGraph, {
            router: () => null
        });

        root = testTree(
            <Component issues={issues}/>,
            {
                stub: { cmp: { timeline: <MockComponent/> } }
            }
        );

        instance = root.cmp;
    });

    afterEach(() => root.dispose());

    describe('render', function() {
        it('should add options', function() {
            instance.timeline.getProp('maxHeight').should.be.eql(500);
        });

        it('should set items prop', () => {
            let issue = issues[0];
            let pItem = instance.timeline.getProp('items')[0];
            pItem.id.should.be.eql(issue.id);
            pItem.content.should.be.eql(issue.summary);
            pItem.start.should.be.eql(issue.created);
            pItem.end.should.be.eql(issue.resolvedAt);

            issue = issues[1];
            pItem = instance.timeline.getProp('items')[1];
            pItem.id.should.be.eql(issue.id);
            pItem.content.should.be.eql(issue.summary);
            pItem.start.should.be.eql(issue.created);
            moment(pItem.end).isSame(moment(), 'minute').should.be.true;
        });
    });

    describe('shouldComponentUpdate', () => {
        let newProps = null;
        beforeEach(() => {
            newProps = {
                issues: cloneDeep(issues)
            };
        })
        it('should return false if same issue', () => {
            instance.element.shouldComponentUpdate(newProps).should.be.false;
        });
        it('should return true if list changed', () => {
            newProps.issues.pop();
            instance.element.shouldComponentUpdate(newProps).should.be.true;
        });
        it('should return true if issue order changed', () => {
            newProps.issues.unshift(newProps.issues.pop());
            instance.element.shouldComponentUpdate(newProps).should.be.true;
        });
        it('should return true if issue summary changed', () => {
            newProps.issues[1].summary = 'new summary value';
            instance.element.shouldComponentUpdate(newProps).should.be.true;
        });
        it('should return true if issue created changed', () => {
            newProps.issues[1].created = moment().format();
            instance.element.shouldComponentUpdate(newProps).should.be.true;
        });
        it('should return true if issue resolvedAt changed', () => {
            newProps.issues[1].resolvedAt = moment().format();
            instance.element.shouldComponentUpdate(newProps).should.be.true;
        });
        it('should return true if issue resolved changed', () => {
            newProps.issues[1].resolved = !newProps.issues[1].resolved;
            instance.element.shouldComponentUpdate(newProps).should.be.true;
        });
    });
});

/* eslint-disable */
function getIssues() {

    return [
        {
      "id": "552d6644c168ae47d100000c",
      "target": "552992acc168ae8128000003",
      "project": "5511a2e6c168ae211e000005",
      "created": "2015-04-14T22:11:00.245+03:00",
      "updated": "2015-04-14T22:11:00.245+03:00",
      "resolvedAt": "2015-06-14T22:11:00.245+03:00",
      "activities": [
        {
          "type": "reported",
          "created": "2015-04-14T22:11:00.245+03:00",
          "report": {
            "report": "552d6644c168ae47d1000008",
            "scan": "552d663ac168ae47d1000004",
            "scanSession": "552d663ac168ae47d1000003"
          }
        }
      ],
      "uniqId": "6c2762f280c2c0b15995939880b269ad",
      "summary": "Vulnerability in angularjs version 1.2.12",
      "severity": "medium",
      "references": [
        {
          "url": "https://github.com/angular/angular.js/blob/b3b5015cb7919708ce179dc3d6f0d7d7f43ef621/CHANGELOG.md"
        }
      ],
      "desc": "execution of arbitrary javascript\nFixed in '1.3.0-beta.14' release",
      "vector": {
        "url": "http://skimmer.tulu.la"
      },
      "confirmed": false,
      "false": false,
      "muted": false,
      "resolved": true
    },
    {
        "resolvedAt": "2015-06-14T22:11:00.245+03:00",
      "id": "552d6644c168ae47d100000d",
      "target": "552992acc168ae8128000003",
      "project": "5511a2e6c168ae211e000005",
      "created": "2015-04-14T22:11:00.245+03:00",
      "updated": "2015-04-14T22:11:00.245+03:00",
      "activities": [
        {
          "type": "reported",
          "created": "2015-04-14T22:11:00.245+03:00",
          "report": {
            "report": "552d6644c168ae47d1000008",
            "scan": "552d663ac168ae47d1000004",
            "scanSession": "552d663ac168ae47d1000003"
          }
        }
      ],
      "uniqId": "8816a414736da8257aac9430b25ecf70",
      "summary": "Vulnerability in angularjs version 1.2.12",
      "severity": "medium",
      "references": [
        {
          "url": "http://avlidienbrunn.se/angular.txt"
        },
        {
          "url": "https://github.com/angular/angular.js/commit/b39e1d47b9a1b39a9fe34c847a81f589fba522f8"
        }
      ],
      "desc": "execution of arbitrary javascript\nFixed in 'b39e1d47b9a1b39a9fe34c847a81f589fba522f8' commit",
      "vector": {
        "url": "http://skimmer.tulu.la"
      },
      "confirmed": false,
      "false": false,
      "muted": false,
      "resolved": false
    },
    {
      "id": "552d94d9c168aeabe2000011",
      "target": "552d94a6c168aeabe2000003",
      "project": "5511a2e6c168ae211e000005",
      "created": "2015-04-15T01:29:45.976+03:00",
      "updated": "2015-04-15T01:29:45.976+03:00",
      "activities": [
        {
          "type": "reported",
          "created": "2015-04-15T01:29:45.976+03:00",
          "report": {
            "report": "552d94d9c168aeabe200000e",
            "scan": "552d94bec168aeabe2000008",
            "scanSession": "552d94bec168aeabe2000007"
          }
        }
      ],
      "uniqId": "8a510bab1361d1c7c972f2848aeb577d",
      "summary": "Error in w3af execution threading",
      "severity": "error",
      "desc": "A \"AssertionError\" exception was found while running crawl.web_spider on \"Method: GET | http://domain/\". The exception was: \"\" at threadpool.py:map_multi_args():145. The scan will continue but some vulnerabilities might not be identified.",
      "confirmed": false,
      "false": false,
      "muted": false,
      "resolved": false
    },
    {
      "id": "552d94d9c168aeabe2000012",
      "target": "552d94a6c168aeabe2000003",
      "project": "5511a2e6c168ae211e000005",
      "created": "2015-04-15T01:29:45.98+03:00",
      "updated": "2015-04-15T15:01:37.008+03:00",
      "activities": [
        {
          "type": "reported",
          "created": "2015-04-15T01:29:45.98+03:00",
          "report": {
            "report": "552d94d9c168aeabe200000e",
            "scan": "552d94bec168aeabe2000008",
            "scanSession": "552d94bec168aeabe2000007"
          }
        }
      ],
      "uniqId": "7eb3fe93e5c4235e8ed9ebcda02b76a1",
      "summary": "Error in w3af execution threading",
      "severity": "error",
      "desc": "A \"AssertionError\" exception was found while running crawl.web_spider on \"Method: POST | http://domain/search.php | URL encoded form: (searchFor)\". The exception was: \"\" at threadpool.py:map_multi_args():145. The scan will continue but some vulnerabilities might not be identified.",
      "confirmed": false,
      "false": false,
      "muted": false,
      "resolved": false
    },
    {
      "id": "552d9614c168aeabe2000024",
      "target": "552d94a6c168aeabe2000003",
      "project": "5511a2e6c168ae211e000005",
      "created": "2015-04-15T01:35:00.418+03:00",
      "updated": "2015-04-15T01:35:00.418+03:00",
      "activities": [
        {
          "type": "reported",
          "created": "2015-04-15T01:35:00.418+03:00",
          "report": {
            "report": "552d9614c168aeabe2000021",
            "scan": "552d95fcc168aeabe200001b",
            "scanSession": "552d95fcc168aeabe200001a"
          }
        }
      ],
      "uniqId": "9fb2014c0a6991779467b63ce1a4fad8",
      "summary": "Error in w3af execution threading",
      "severity": "error",
      "desc": "A \"AssertionError\" exception was found while running audit.sqli on \"Method: GET | http://domain/\". The exception was: \"\" at pool276.py:imap_unordered():310. The scan will continue but some vulnerabilities might not be identified.",
      "confirmed": false,
      "false": false,
      "muted": false,
      "resolved": false
    },
    {
      "id": "552d9614c168aeabe2000027",
      "target": "552d94a6c168aeabe2000003",
      "project": "5511a2e6c168ae211e000005",
      "created": "2015-04-15T01:35:00.425+03:00",
      "updated": "2015-04-15T01:35:00.425+03:00",
      "activities": [
        {
          "type": "reported",
          "created": "2015-04-15T01:35:00.425+03:00",
          "report": {
            "report": "552d9614c168aeabe2000021",
            "scan": "552d95fcc168aeabe200001b",
            "scanSession": "552d95fcc168aeabe200001a"
          }
        }
      ],
      "uniqId": "b182fde239aa318888608e547faf77a2",
      "summary": "Error in w3af execution threading",
      "severity": "error",
      "desc": "A \"AssertionError\" exception was found while running audit.sqli on \"Method: POST | http://domain/search.php | URL encoded form: (searchFor)\". The exception was: \"\" at pool276.py:imap_unordered():310. The scan will continue but some vulnerabilities might not be identified.",
      "confirmed": false,
      "false": false,
      "muted": false,
      "resolved": false
    },
    {
      "id": "552da0eec168aeba90000011",
      "target": "552d94a6c168aeabe2000003",
      "project": "5511a2e6c168ae211e000005",
      "created": "2015-04-15T02:21:18.788+03:00",
      "updated": "2015-04-15T02:21:18.788+03:00",
      "activities": [
        {
          "type": "reported",
          "created": "2015-04-15T02:21:18.788+03:00",
          "report": {
            "report": "552da0eec168aeba9000000a",
            "scan": "552da0d8c168aeba90000004",
            "scanSession": "552da0d8c168aeba90000003"
          }
        }
      ],
      "uniqId": "e2ebec8d015bf7274b755b599afa739e",
      "summary": "Error in w3af execution threading",
      "severity": "error",
      "desc": "A \"AssertionError\" exception was found while running audit.xss on \"Method: POST | http://domain/search.php | URL encoded form: (searchFor)\". The exception was: \"\" at pool276.py:imap_unordered():310. The scan will continue but some vulnerabilities might not be identified.",
      "confirmed": false,
      "false": false,
      "muted": false,
      "resolved": false
    },
    {
      "id": "553ec02dc168ae5dea000003",
      "target": "55310bb6c168ae200f000005",
      "project": "552ff0c4c168ae200f000004",
      "created": "2015-04-28T02:03:09.612+03:00",
      "updated": "2015-04-28T02:03:09.612+03:00",
      "activities": [
        {
          "type": "reported",
          "created": "2015-04-28T02:03:09.612+03:00",
          "user": "552ff0c2c168ae200f000003"
        }
      ],
      "uniqId": "553ec02dc168ae5dea000003",
      "summary": "ffsdf",
      "severity": "info",
      "desc": "asdf",
      "confirmed": true,
      "false": false,
      "muted": false,
      "resolved": false
    },
    {
      "id": "552d94d9c168aeabe2000013",
      "target": "552d94a6c168aeabe2000003",
      "project": "5511a2e6c168ae211e000005",
      "created": "2015-04-15T01:29:45.981+03:00",
      "updated": "2015-04-15T04:55:25.371+03:00",
      "activities": [
        {
          "type": "reported",
          "created": "2015-04-15T01:29:45.981+03:00",
          "report": {
            "report": "552d94d9c168aeabe200000e",
            "scan": "552d94bec168aeabe2000008",
            "scanSession": "552d94bec168aeabe2000007"
          }
        }
      ],
      "uniqId": "9813123661d511c89c965380ef106fa4",
      "summary": "SQL injection",
      "severity": "high",
      "desc": "SQL injection in a MySQL database was found at: \"http://testphp.vulnweb.com/search.php\", using HTTP method POST. The sent data was: \"test=a%27b%22c%27d%22\" The modified parameter was \"test\".",
      "confirmed": true,
      "false": false,
      "muted": false,
      "resolved": true
    }
    ]
}
