'use strict';
describe('plan.actions', function() {
    jest.dontMock('../../constants');
    jest.dontMock('../../lib/helpers');

    jest.dontMock('../feed.actions');

    var C, actions, dispatch, api, query;

    beforeEach(function() {
        jest.setMock('../../lib/dispatcher', {
            dispatch: jest.genMockFunction()
        });
        jest.setMock('../../lib/api3', {
            feed: {
                list: jest.genMockFunction().mockImplementation(function() {
                    return new Promise(function(resolve) {
                        resolve({
                            results: [
                                {
                                    id: '1',
                                    owner: 'o1'
                                },
                                {
                                    id: '2',
                                    owner: 'o1'
                                },
                                {
                                    id: '3',
                                    owner: 'o2'
                                }
                            ]
                        });
                    });
                })
            },
            users: {
                list: jest.genMockFunction().mockImplementation(function(query) {
                    return new Promise(function(resolve) {
                        resolve({
                            results: [
                                {
                                    id: 'o1',
                                    avatar: 'a1'
                                },
                                {
                                    id: 'o2',
                                    avatar: 'a2'
                                },
                                {
                                    id: 'o3',
                                    avatar: 'a3'
                                }
                            ]
                        });
                    });
                })
            }
        });

        C = require('../../constants');
        actions = require('../feed.actions');
        dispatch = require('../../lib/dispatcher').dispatch;
        api = require('../../lib/api3');
        query = { limit: 10, skip: 0, target: '1' };
    });

    describe('.fetchFeed()', function() {
        pit('must call api.feed.list with params', function() {
            return actions.fetchFeed(query).then(function() {
                expect(api.feed.list).toBeCalledWith(query);
            });

        });

        pit('must call users.list with id_in=o1,o2', function() {
            return actions.fetchFeed(query).then(function() {
                expect(api.users.list).toBeCalledWith({
                    id_in: 'o1,o2'
                });
            });
        });

        pit('must fill owner field', function() {
            return actions.fetchFeed(query).then(function() {
                expect(dispatch).toBeCalledWith(C.FEED_FETCH_SUCCESS, [
                    {
                        id: '1',
                        owner: {
                            id: 'o1',
                            avatar: 'a1'
                        }
                    },
                    {
                        id: '2',
                        owner: {
                            id: 'o1',
                            avatar: 'a1'
                        }
                    },
                    {
                        id: '3',
                        owner: {
                            id: 'o2',
                            avatar: 'a2'
                        }
                    }
                ]);
            });
        });
    });

    describe('.fetchItems()', function() {
        pit('must call api.feed.list with params', function() {
            return actions.fetchItems('target', 't1', 10, 1).then(function() {
                expect(api.feed.list).toBeCalledWith({
                    target: 't1',
                    skip: 1,
                    limit: 10
                });
            });

        });
        pit('must call api.feed.list with default params', function() {
            return actions.fetchItems('target', 't1').then(function() {
                expect(api.feed.list).toBeCalledWith({
                    target: 't1',
                    skip: 0,
                    limit: 3
                });
            });

        });
    });

    describe('.fetchNewItems()', function() {
        pit('must call api.feed.list with updated_gte', function() {
            return actions.fetchNewItems('target', 't1', 'last-update').then(function() {
                expect(api.feed.list).toBeCalledWith({
                    target: 't1',
                    updated_gte: 'last-update'
                });
            });
        });
    });
});


function getFeed() {
    return {
        "count": 61,
        "next": "",
        "previous": "",
        "results": [
            {
                "id": "54d61c0cc168ae101e000018",
                "type": "scan",
                "created": "2015-02-07T11:07:08.501-03:00",
                "updated": "2015-02-07T11:07:35.265-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54cd431dc168ae4e8300000a",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54d61c0cc168ae101e000017",
                    "status": "finished",
                    "conf": {
                        "target": "http://miet.ru",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54d61c0cc168ae101e000015",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "http://miet.ru"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54d61c0cc168ae101e000017",
                            "created": "2015-02-07T11:07:08.498-03:00",
                            "updated": "2015-02-07T11:07:08.498-03:00",
                            "queued": "2015-02-07T11:07:09.382-03:00",
                            "started": "2015-02-07T11:07:09.386-03:00",
                            "finished": "2015-02-07T11:07:19.075-03:00"
                        },
                        {
                            "id": "54d61c0cc168ae101e000016",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://miet.ru"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54d61c0cc168ae101e000017",
                            "created": "2015-02-07T11:07:08.498-03:00",
                            "updated": "2015-02-07T11:07:08.498-03:00",
                            "queued": "2015-02-07T11:07:19.406-03:00",
                            "started": "2015-02-07T11:07:19.409-03:00",
                            "finished": "2015-02-07T11:07:35.264-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54cd431dc168ae4e8300000a",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-07T11:07:08.499-03:00",
                    "updated": "2015-02-07T11:07:35.264-03:00",
                    "queued": "2015-02-07T11:07:09.382-03:00",
                    "started": "2015-02-07T11:07:09.386-03:00",
                    "finished": "2015-02-07T11:07:35.264-03:00"
                }
            },
            {
                "id": "54d61b0fc168ae101e000013",
                "type": "scan",
                "created": "2015-02-07T11:02:55.826-03:00",
                "updated": "2015-02-07T11:03:05.599-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54d61a20c168ae101e00000a",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54d61b0fc168ae101e000012",
                    "status": "finished",
                    "conf": {
                        "target": "http://www.nickol.ru/",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54d61b0fc168ae101e000011",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://www.nickol.ru/"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54d61b0fc168ae101e000012",
                            "created": "2015-02-07T11:02:55.824-03:00",
                            "updated": "2015-02-07T11:02:55.824-03:00",
                            "queued": "2015-02-07T11:02:56.791-03:00",
                            "started": "2015-02-07T11:02:56.794-03:00",
                            "finished": "2015-02-07T11:03:05.598-03:00"
                        }
                    ],
                    "plan": "54d6153bc168ae101e000007",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54d61a20c168ae101e00000a",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-07T11:02:55.826-03:00",
                    "updated": "2015-02-07T11:03:05.598-03:00",
                    "queued": "2015-02-07T11:02:56.791-03:00",
                    "started": "2015-02-07T11:02:56.794-03:00",
                    "finished": "2015-02-07T11:03:05.598-03:00"
                }
            },
            {
                "id": "54d61a28c168ae101e00000e",
                "type": "scan",
                "created": "2015-02-07T10:59:04.167-03:00",
                "updated": "2015-02-07T10:59:24.725-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54d61a20c168ae101e00000a",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54d61a28c168ae101e00000d",
                    "status": "finished",
                    "conf": {
                        "target": "http://www.nickol.ru/",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54d61a28c168ae101e00000b",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "http://www.nickol.ru/"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54d61a28c168ae101e00000d",
                            "created": "2015-02-07T10:59:04.156-03:00",
                            "updated": "2015-02-07T10:59:04.156-03:00",
                            "queued": "2015-02-07T10:59:04.228-03:00",
                            "started": "2015-02-07T10:59:04.237-03:00",
                            "finished": "2015-02-07T10:59:15.289-03:00"
                        },
                        {
                            "id": "54d61a28c168ae101e00000c",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://www.nickol.ru/"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54d61a28c168ae101e00000d",
                            "created": "2015-02-07T10:59:04.156-03:00",
                            "updated": "2015-02-07T10:59:04.156-03:00",
                            "queued": "2015-02-07T10:59:16.265-03:00",
                            "started": "2015-02-07T10:59:16.272-03:00",
                            "finished": "2015-02-07T10:59:24.725-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54d61a20c168ae101e00000a",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-07T10:59:04.16-03:00",
                    "updated": "2015-02-07T10:59:24.725-03:00",
                    "queued": "2015-02-07T10:59:04.228-03:00",
                    "started": "2015-02-07T10:59:04.237-03:00",
                    "finished": "2015-02-07T10:59:24.725-03:00"
                }
            },
            {
                "id": "54d3958dc168ae527a000006",
                "type": "scan",
                "created": "2015-02-05T13:08:45.871-03:00",
                "updated": "2015-02-05T13:08:51.958-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54cd34f6c168ae4bb3000067",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54d3958dc168ae527a000005",
                    "status": "finished",
                    "conf": {
                        "target": "http://slonoed.net",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54d3958dc168ae527a000003",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54d3958dc168ae527a000005",
                            "created": "2015-02-05T13:08:45.83-03:00",
                            "updated": "2015-02-05T13:08:45.83-03:00",
                            "queued": "2015-02-05T13:08:45.872-03:00",
                            "started": "2015-02-05T13:08:45.904-03:00",
                            "finished": "2015-02-05T13:08:48.875-03:00"
                        },
                        {
                            "id": "54d3958dc168ae527a000004",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54d3958dc168ae527a000005",
                            "created": "2015-02-05T13:08:45.83-03:00",
                            "updated": "2015-02-05T13:08:45.83-03:00",
                            "queued": "2015-02-05T13:08:49.907-03:00",
                            "started": "2015-02-05T13:08:49.91-03:00",
                            "finished": "2015-02-05T13:08:51.958-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54cd34f6c168ae4bb3000067",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-05T13:08:45.845-03:00",
                    "updated": "2015-02-05T13:08:51.958-03:00",
                    "queued": "2015-02-05T13:08:45.872-03:00",
                    "started": "2015-02-05T13:08:45.904-03:00",
                    "finished": "2015-02-05T13:08:51.958-03:00"
                }
            },
            {
                "id": "54d2739cc168aeb0a2000054",
                "type": "scan",
                "created": "2015-02-04T16:31:40.627-03:00",
                "updated": "2015-02-04T16:31:43.939-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54cd34f6c168ae4bb3000067",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54d2739cc168aeb0a2000053",
                    "status": "finished",
                    "conf": {
                        "target": "http://slonoed.net",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54d2739cc168aeb0a2000051",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54d2739cc168aeb0a2000053",
                            "created": "2015-02-04T16:31:40.626-03:00",
                            "updated": "2015-02-04T16:31:40.626-03:00",
                            "queued": "2015-02-04T16:31:40.77-03:00",
                            "started": "2015-02-04T16:31:40.776-03:00",
                            "finished": "2015-02-04T16:31:42.014-03:00"
                        },
                        {
                            "id": "54d2739cc168aeb0a2000052",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54d2739cc168aeb0a2000053",
                            "created": "2015-02-04T16:31:40.626-03:00",
                            "updated": "2015-02-04T16:31:40.626-03:00",
                            "queued": "2015-02-04T16:31:42.776-03:00",
                            "started": "2015-02-04T16:31:42.779-03:00",
                            "finished": "2015-02-04T16:31:43.939-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54cd34f6c168ae4bb3000067",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-04T16:31:40.627-03:00",
                    "updated": "2015-02-04T16:31:43.939-03:00",
                    "queued": "2015-02-04T16:31:40.77-03:00",
                    "started": "2015-02-04T16:31:40.776-03:00",
                    "finished": "2015-02-04T16:31:43.939-03:00"
                }
            },
            {
                "id": "54d27360c168aeb0a200004e",
                "type": "scan",
                "created": "2015-02-04T16:30:40.377-03:00",
                "updated": "2015-02-04T16:30:43.903-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54cd34f6c168ae4bb3000067",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54d27360c168aeb0a200004d",
                    "status": "finished",
                    "conf": {
                        "target": "http://slonoed.net",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54d27360c168aeb0a200004b",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54d27360c168aeb0a200004d",
                            "created": "2015-02-04T16:30:40.376-03:00",
                            "updated": "2015-02-04T16:30:40.376-03:00",
                            "queued": "2015-02-04T16:30:40.628-03:00",
                            "started": "2015-02-04T16:30:40.631-03:00",
                            "finished": "2015-02-04T16:30:42.16-03:00"
                        },
                        {
                            "id": "54d27360c168aeb0a200004c",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54d27360c168aeb0a200004d",
                            "created": "2015-02-04T16:30:40.376-03:00",
                            "updated": "2015-02-04T16:30:40.376-03:00",
                            "queued": "2015-02-04T16:30:42.634-03:00",
                            "started": "2015-02-04T16:30:42.641-03:00",
                            "finished": "2015-02-04T16:30:43.902-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54cd34f6c168ae4bb3000067",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-04T16:30:40.377-03:00",
                    "updated": "2015-02-04T16:30:43.902-03:00",
                    "queued": "2015-02-04T16:30:40.628-03:00",
                    "started": "2015-02-04T16:30:40.631-03:00",
                    "finished": "2015-02-04T16:30:43.902-03:00"
                }
            },
            {
                "id": "54d27358c168aeb0a2000048",
                "type": "scan",
                "created": "2015-02-04T16:30:32.301-03:00",
                "updated": "2015-02-04T16:30:35.86-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54cd34f6c168ae4bb3000067",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54d27358c168aeb0a2000047",
                    "status": "finished",
                    "conf": {
                        "target": "http://slonoed.net",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54d27358c168aeb0a2000045",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54d27358c168aeb0a2000047",
                            "created": "2015-02-04T16:30:32.298-03:00",
                            "updated": "2015-02-04T16:30:32.298-03:00",
                            "queued": "2015-02-04T16:30:32.599-03:00",
                            "started": "2015-02-04T16:30:32.604-03:00",
                            "finished": "2015-02-04T16:30:34.099-03:00"
                        },
                        {
                            "id": "54d27358c168aeb0a2000046",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54d27358c168aeb0a2000047",
                            "created": "2015-02-04T16:30:32.298-03:00",
                            "updated": "2015-02-04T16:30:32.298-03:00",
                            "queued": "2015-02-04T16:30:34.606-03:00",
                            "started": "2015-02-04T16:30:34.611-03:00",
                            "finished": "2015-02-04T16:30:35.86-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54cd34f6c168ae4bb3000067",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-04T16:30:32.301-03:00",
                    "updated": "2015-02-04T16:30:35.86-03:00",
                    "queued": "2015-02-04T16:30:32.599-03:00",
                    "started": "2015-02-04T16:30:32.604-03:00",
                    "finished": "2015-02-04T16:30:35.86-03:00"
                }
            },
            {
                "id": "54d27339c168aeb0a2000042",
                "type": "scan",
                "created": "2015-02-04T16:30:01.97-03:00",
                "updated": "2015-02-04T16:30:05.853-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54cd34f6c168ae4bb3000067",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54d27339c168aeb0a2000041",
                    "status": "finished",
                    "conf": {
                        "target": "http://slonoed.net",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54d27339c168aeb0a200003f",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54d27339c168aeb0a2000041",
                            "created": "2015-02-04T16:30:01.969-03:00",
                            "updated": "2015-02-04T16:30:01.969-03:00",
                            "queued": "2015-02-04T16:30:02.519-03:00",
                            "started": "2015-02-04T16:30:02.522-03:00",
                            "finished": "2015-02-04T16:30:03.803-03:00"
                        },
                        {
                            "id": "54d27339c168aeb0a2000040",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54d27339c168aeb0a2000041",
                            "created": "2015-02-04T16:30:01.969-03:00",
                            "updated": "2015-02-04T16:30:01.969-03:00",
                            "queued": "2015-02-04T16:30:04.525-03:00",
                            "started": "2015-02-04T16:30:04.528-03:00",
                            "finished": "2015-02-04T16:30:05.852-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54cd34f6c168ae4bb3000067",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-04T16:30:01.97-03:00",
                    "updated": "2015-02-04T16:30:05.852-03:00",
                    "queued": "2015-02-04T16:30:02.519-03:00",
                    "started": "2015-02-04T16:30:02.522-03:00",
                    "finished": "2015-02-04T16:30:05.852-03:00"
                }
            },
            {
                "id": "54d2731ac168aeb0a200003b",
                "type": "scan",
                "created": "2015-02-04T16:29:30.903-03:00",
                "updated": "2015-02-04T16:29:35.447-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54cd34f6c168ae4bb3000067",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54d2731ac168aeb0a200003a",
                    "status": "finished",
                    "conf": {
                        "target": "http://slonoed.net",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54d2731ac168aeb0a2000038",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54d2731ac168aeb0a200003a",
                            "created": "2015-02-04T16:29:30.901-03:00",
                            "updated": "2015-02-04T16:29:30.901-03:00",
                            "queued": "2015-02-04T16:29:32.441-03:00",
                            "started": "2015-02-04T16:29:32.443-03:00",
                            "finished": "2015-02-04T16:29:33.703-03:00"
                        },
                        {
                            "id": "54d2731ac168aeb0a2000039",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54d2731ac168aeb0a200003a",
                            "created": "2015-02-04T16:29:30.901-03:00",
                            "updated": "2015-02-04T16:29:30.901-03:00",
                            "queued": "2015-02-04T16:29:34.446-03:00",
                            "started": "2015-02-04T16:29:34.449-03:00",
                            "finished": "2015-02-04T16:29:35.447-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54cd34f6c168ae4bb3000067",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-04T16:29:30.903-03:00",
                    "updated": "2015-02-04T16:29:35.447-03:00",
                    "queued": "2015-02-04T16:29:32.441-03:00",
                    "started": "2015-02-04T16:29:32.443-03:00",
                    "finished": "2015-02-04T16:29:35.447-03:00"
                }
            },
            {
                "id": "54d27316c168aeb0a2000034",
                "type": "scan",
                "created": "2015-02-04T16:29:26.727-03:00",
                "updated": "2015-02-04T16:29:31.92-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54cd34f6c168ae4bb3000067",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54d27316c168aeb0a2000033",
                    "status": "finished",
                    "conf": {
                        "target": "http://slonoed.net",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54d27316c168aeb0a2000031",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54d27316c168aeb0a2000033",
                            "created": "2015-02-04T16:29:26.726-03:00",
                            "updated": "2015-02-04T16:29:26.726-03:00",
                            "queued": "2015-02-04T16:29:28.428-03:00",
                            "started": "2015-02-04T16:29:28.432-03:00",
                            "finished": "2015-02-04T16:29:30.179-03:00"
                        },
                        {
                            "id": "54d27316c168aeb0a2000032",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54d27316c168aeb0a2000033",
                            "created": "2015-02-04T16:29:26.726-03:00",
                            "updated": "2015-02-04T16:29:26.726-03:00",
                            "queued": "2015-02-04T16:29:30.434-03:00",
                            "started": "2015-02-04T16:29:30.437-03:00",
                            "finished": "2015-02-04T16:29:31.92-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54cd34f6c168ae4bb3000067",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-04T16:29:26.727-03:00",
                    "updated": "2015-02-04T16:29:31.92-03:00",
                    "queued": "2015-02-04T16:29:28.428-03:00",
                    "started": "2015-02-04T16:29:28.432-03:00",
                    "finished": "2015-02-04T16:29:31.92-03:00"
                }
            },
            {
                "id": "54d27314c168aeb0a2000030",
                "type": "scan",
                "created": "2015-02-04T16:29:24.81-03:00",
                "updated": "2015-02-04T16:29:29.804-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54cd34f6c168ae4bb3000067",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54d27314c168aeb0a200002f",
                    "status": "finished",
                    "conf": {
                        "target": "http://slonoed.net",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54d27314c168aeb0a200002d",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54d27314c168aeb0a200002f",
                            "created": "2015-02-04T16:29:24.807-03:00",
                            "updated": "2015-02-04T16:29:24.807-03:00",
                            "queued": "2015-02-04T16:29:26.42-03:00",
                            "started": "2015-02-04T16:29:26.423-03:00",
                            "finished": "2015-02-04T16:29:27.937-03:00"
                        },
                        {
                            "id": "54d27314c168aeb0a200002e",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54d27314c168aeb0a200002f",
                            "created": "2015-02-04T16:29:24.807-03:00",
                            "updated": "2015-02-04T16:29:24.807-03:00",
                            "queued": "2015-02-04T16:29:28.425-03:00",
                            "started": "2015-02-04T16:29:28.43-03:00",
                            "finished": "2015-02-04T16:29:29.803-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54cd34f6c168ae4bb3000067",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-04T16:29:24.809-03:00",
                    "updated": "2015-02-04T16:29:29.803-03:00",
                    "queued": "2015-02-04T16:29:26.42-03:00",
                    "started": "2015-02-04T16:29:26.423-03:00",
                    "finished": "2015-02-04T16:29:29.803-03:00"
                }
            },
            {
                "id": "54d27306c168aeb0a200002a",
                "type": "scan",
                "created": "2015-02-04T16:29:10.598-03:00",
                "updated": "2015-02-04T16:29:15.489-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54cd34f6c168ae4bb3000067",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54d27306c168aeb0a2000029",
                    "status": "finished",
                    "conf": {
                        "target": "http://slonoed.net",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54d27306c168aeb0a2000027",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54d27306c168aeb0a2000029",
                            "created": "2015-02-04T16:29:10.593-03:00",
                            "updated": "2015-02-04T16:29:10.593-03:00",
                            "queued": "2015-02-04T16:29:12.369-03:00",
                            "started": "2015-02-04T16:29:12.374-03:00",
                            "finished": "2015-02-04T16:29:13.634-03:00"
                        },
                        {
                            "id": "54d27306c168aeb0a2000028",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54d27306c168aeb0a2000029",
                            "created": "2015-02-04T16:29:10.593-03:00",
                            "updated": "2015-02-04T16:29:10.593-03:00",
                            "queued": "2015-02-04T16:29:14.377-03:00",
                            "started": "2015-02-04T16:29:14.381-03:00",
                            "finished": "2015-02-04T16:29:15.488-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54cd34f6c168ae4bb3000067",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-04T16:29:10.598-03:00",
                    "updated": "2015-02-04T16:29:15.488-03:00",
                    "queued": "2015-02-04T16:29:12.369-03:00",
                    "started": "2015-02-04T16:29:12.374-03:00",
                    "finished": "2015-02-04T16:29:15.488-03:00"
                }
            },
            {
                "id": "54d272fdc168aeb0a2000024",
                "type": "scan",
                "created": "2015-02-04T16:29:01.249-03:00",
                "updated": "2015-02-04T16:29:05.611-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54cd34f6c168ae4bb3000067",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54d272fdc168aeb0a2000023",
                    "status": "finished",
                    "conf": {
                        "target": "http://slonoed.net",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54d272fdc168aeb0a2000021",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54d272fdc168aeb0a2000023",
                            "created": "2015-02-04T16:29:01.248-03:00",
                            "updated": "2015-02-04T16:29:01.248-03:00",
                            "queued": "2015-02-04T16:29:02.34-03:00",
                            "started": "2015-02-04T16:29:02.345-03:00",
                            "finished": "2015-02-04T16:29:03.528-03:00"
                        },
                        {
                            "id": "54d272fdc168aeb0a2000022",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54d272fdc168aeb0a2000023",
                            "created": "2015-02-04T16:29:01.248-03:00",
                            "updated": "2015-02-04T16:29:01.248-03:00",
                            "queued": "2015-02-04T16:29:04.347-03:00",
                            "started": "2015-02-04T16:29:04.35-03:00",
                            "finished": "2015-02-04T16:29:05.608-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54cd34f6c168ae4bb3000067",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-04T16:29:01.248-03:00",
                    "updated": "2015-02-04T16:29:05.608-03:00",
                    "queued": "2015-02-04T16:29:02.34-03:00",
                    "started": "2015-02-04T16:29:02.345-03:00",
                    "finished": "2015-02-04T16:29:05.608-03:00"
                }
            },
            {
                "id": "54d272e9c168aeb0a200001c",
                "type": "scan",
                "created": "2015-02-04T16:28:41.77-03:00",
                "updated": "2015-02-04T16:28:45.432-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54cd34f6c168ae4bb3000067",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54d272e9c168aeb0a200001b",
                    "status": "finished",
                    "conf": {
                        "target": "http://slonoed.net",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54d272e9c168aeb0a2000019",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54d272e9c168aeb0a200001b",
                            "created": "2015-02-04T16:28:41.769-03:00",
                            "updated": "2015-02-04T16:28:41.769-03:00",
                            "queued": "2015-02-04T16:28:42.292-03:00",
                            "started": "2015-02-04T16:28:42.295-03:00",
                            "finished": "2015-02-04T16:28:43.916-03:00"
                        },
                        {
                            "id": "54d272e9c168aeb0a200001a",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54d272e9c168aeb0a200001b",
                            "created": "2015-02-04T16:28:41.769-03:00",
                            "updated": "2015-02-04T16:28:41.769-03:00",
                            "queued": "2015-02-04T16:28:44.299-03:00",
                            "started": "2015-02-04T16:28:44.301-03:00",
                            "finished": "2015-02-04T16:28:45.432-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54cd34f6c168ae4bb3000067",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-04T16:28:41.769-03:00",
                    "updated": "2015-02-04T16:28:45.432-03:00",
                    "queued": "2015-02-04T16:28:42.292-03:00",
                    "started": "2015-02-04T16:28:42.295-03:00",
                    "finished": "2015-02-04T16:28:45.432-03:00"
                }
            },
            {
                "id": "54d272e5c168aeb0a2000016",
                "type": "scan",
                "created": "2015-02-04T16:28:37.9-03:00",
                "updated": "2015-02-04T16:28:41.897-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54cd34f6c168ae4bb3000067",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54d272e5c168aeb0a2000015",
                    "status": "finished",
                    "conf": {
                        "target": "http://slonoed.net",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54d272e5c168aeb0a2000013",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54d272e5c168aeb0a2000015",
                            "created": "2015-02-04T16:28:37.897-03:00",
                            "updated": "2015-02-04T16:28:37.897-03:00",
                            "queued": "2015-02-04T16:28:38.228-03:00",
                            "started": "2015-02-04T16:28:38.233-03:00",
                            "finished": "2015-02-04T16:28:40.018-03:00"
                        },
                        {
                            "id": "54d272e5c168aeb0a2000014",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54d272e5c168aeb0a2000015",
                            "created": "2015-02-04T16:28:37.897-03:00",
                            "updated": "2015-02-04T16:28:37.897-03:00",
                            "queued": "2015-02-04T16:28:40.283-03:00",
                            "started": "2015-02-04T16:28:40.291-03:00",
                            "finished": "2015-02-04T16:28:41.896-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54cd34f6c168ae4bb3000067",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-04T16:28:37.898-03:00",
                    "updated": "2015-02-04T16:28:41.896-03:00",
                    "queued": "2015-02-04T16:28:38.228-03:00",
                    "started": "2015-02-04T16:28:38.233-03:00",
                    "finished": "2015-02-04T16:28:41.896-03:00"
                }
            },
            {
                "id": "54d272e4c168aeb0a2000012",
                "type": "scan",
                "created": "2015-02-04T16:28:36.877-03:00",
                "updated": "2015-02-04T16:28:41.802-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54cd34f6c168ae4bb3000067",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54d272e4c168aeb0a2000011",
                    "status": "finished",
                    "conf": {
                        "target": "http://slonoed.net",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54d272e4c168aeb0a200000f",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54d272e4c168aeb0a2000011",
                            "created": "2015-02-04T16:28:36.876-03:00",
                            "updated": "2015-02-04T16:28:36.876-03:00",
                            "queued": "2015-02-04T16:28:38.226-03:00",
                            "started": "2015-02-04T16:28:38.23-03:00",
                            "finished": "2015-02-04T16:28:40.027-03:00"
                        },
                        {
                            "id": "54d272e4c168aeb0a2000010",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54d272e4c168aeb0a2000011",
                            "created": "2015-02-04T16:28:36.876-03:00",
                            "updated": "2015-02-04T16:28:36.876-03:00",
                            "queued": "2015-02-04T16:28:40.271-03:00",
                            "started": "2015-02-04T16:28:40.282-03:00",
                            "finished": "2015-02-04T16:28:41.801-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54cd34f6c168ae4bb3000067",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-04T16:28:36.877-03:00",
                    "updated": "2015-02-04T16:28:41.801-03:00",
                    "queued": "2015-02-04T16:28:38.226-03:00",
                    "started": "2015-02-04T16:28:38.23-03:00",
                    "finished": "2015-02-04T16:28:41.801-03:00"
                }
            },
            {
                "id": "54d27249c168aeb0a200000c",
                "type": "scan",
                "created": "2015-02-04T16:26:01.574-03:00",
                "updated": "2015-02-04T16:26:04.83-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54cd34f6c168ae4bb3000067",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54d27249c168aeb0a200000b",
                    "status": "finished",
                    "conf": {
                        "target": "http://slonoed.net",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54d27249c168aeb0a2000009",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54d27249c168aeb0a200000b",
                            "created": "2015-02-04T16:26:01.573-03:00",
                            "updated": "2015-02-04T16:26:01.573-03:00",
                            "queued": "2015-02-04T16:26:01.807-03:00",
                            "started": "2015-02-04T16:26:01.81-03:00",
                            "finished": "2015-02-04T16:26:03.101-03:00"
                        },
                        {
                            "id": "54d27249c168aeb0a200000a",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54d27249c168aeb0a200000b",
                            "created": "2015-02-04T16:26:01.573-03:00",
                            "updated": "2015-02-04T16:26:01.573-03:00",
                            "queued": "2015-02-04T16:26:03.813-03:00",
                            "started": "2015-02-04T16:26:03.822-03:00",
                            "finished": "2015-02-04T16:26:04.829-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54cd34f6c168ae4bb3000067",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-04T16:26:01.574-03:00",
                    "updated": "2015-02-04T16:26:04.829-03:00",
                    "queued": "2015-02-04T16:26:01.807-03:00",
                    "started": "2015-02-04T16:26:01.81-03:00",
                    "finished": "2015-02-04T16:26:04.829-03:00"
                }
            },
            {
                "id": "54d27236c168aeb0a2000006",
                "type": "scan",
                "created": "2015-02-04T16:25:42.079-03:00",
                "updated": "2015-02-04T16:25:49.286-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54cd34f6c168ae4bb3000067",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54d27236c168aeb0a2000005",
                    "status": "finished",
                    "conf": {
                        "target": "http://slonoed.net",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54d27236c168aeb0a2000003",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54d27236c168aeb0a2000005",
                            "created": "2015-02-04T16:25:42.031-03:00",
                            "updated": "2015-02-04T16:25:42.031-03:00",
                            "queued": "2015-02-04T16:25:43.741-03:00",
                            "started": "2015-02-04T16:25:43.761-03:00",
                            "finished": "2015-02-04T16:25:46.88-03:00"
                        },
                        {
                            "id": "54d27236c168aeb0a2000004",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54d27236c168aeb0a2000005",
                            "created": "2015-02-04T16:25:42.031-03:00",
                            "updated": "2015-02-04T16:25:42.031-03:00",
                            "queued": "2015-02-04T16:25:47.766-03:00",
                            "started": "2015-02-04T16:25:47.772-03:00",
                            "finished": "2015-02-04T16:25:49.283-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54cd34f6c168ae4bb3000067",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-04T16:25:42.054-03:00",
                    "updated": "2015-02-04T16:25:49.283-03:00",
                    "queued": "2015-02-04T16:25:43.741-03:00",
                    "started": "2015-02-04T16:25:43.761-03:00",
                    "finished": "2015-02-04T16:25:49.283-03:00"
                }
            },
            {
                "id": "54cf9cf1c168ae57db000006",
                "type": "scan",
                "created": "2015-02-02T12:51:13.59-03:00",
                "updated": "2015-02-02T12:51:18.829-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54ce2bddc168ae4e83000017",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54cf9cf1c168ae57db000005",
                    "status": "finished",
                    "conf": {
                        "target": "https://google.com",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54cf9cf1c168ae57db000003",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "https://google.com"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54cf9cf1c168ae57db000005",
                            "created": "2015-02-02T12:51:13.577-03:00",
                            "updated": "2015-02-02T12:51:13.577-03:00",
                            "queued": "2015-02-02T12:51:15.501-03:00",
                            "started": "2015-02-02T12:51:15.512-03:00",
                            "finished": "2015-02-02T12:51:16.891-03:00"
                        },
                        {
                            "id": "54cf9cf1c168ae57db000004",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "https://google.com"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54cf9cf1c168ae57db000005",
                            "created": "2015-02-02T12:51:13.577-03:00",
                            "updated": "2015-02-02T12:51:13.577-03:00",
                            "queued": "2015-02-02T12:51:17.517-03:00",
                            "started": "2015-02-02T12:51:17.523-03:00",
                            "finished": "2015-02-02T12:51:18.828-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54ce2bddc168ae4e83000017",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-02T12:51:13.584-03:00",
                    "updated": "2015-02-02T12:51:18.828-03:00",
                    "queued": "2015-02-02T12:51:15.501-03:00",
                    "started": "2015-02-02T12:51:15.512-03:00",
                    "finished": "2015-02-02T12:51:18.828-03:00"
                }
            },
            {
                "id": "54cf8db0c168ae4b3c000006",
                "type": "scan",
                "created": "2015-02-02T11:46:08.976-03:00",
                "updated": "2015-02-02T11:46:17.045-03:00",
                "owner": "54ba68b5c168ae6d38000001",
                "target": "54cd34f6c168ae4bb3000067",
                "project": "54bb270ec168aeb6f3000003",
                "scan": {
                    "id": "54cf8db0c168ae4b3c000005",
                    "status": "finished",
                    "conf": {
                        "target": "http://slonoed.net",
                        "params": {}
                    },
                    "sessions": [
                        {
                            "id": "54cf8db0c168ae4b3c000003",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/wappalyzer:0.0.2",
                                "name": "Detect technologies",
                                "desc": "Use wappalyzer in phantomjs to detect web technologies used by the site",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c10f9dc168ae62bb000002",
                            "scan": "54cf8db0c168ae4b3c000005",
                            "created": "2015-02-02T11:46:08.963-03:00",
                            "updated": "2015-02-02T11:46:08.963-03:00",
                            "queued": "2015-02-02T11:46:10.945-03:00",
                            "started": "2015-02-02T11:46:10.952-03:00",
                            "finished": "2015-02-02T11:46:13.181-03:00"
                        },
                        {
                            "id": "54cf8db0c168ae4b3c000004",
                            "status": "finished",
                            "step": {
                                "plugin": "barbudo/retirejs:0.0.2",
                                "name": "Detect vulnerable js",
                                "desc": "Detect usage of JavaScript libraries with known vulnerabilities",
                                "conf": {
                                    "commandArgs": "http://slonoed.net"
                                }
                            },
                            "plugin": "54c553c3c168ae4ba7000004",
                            "scan": "54cf8db0c168ae4b3c000005",
                            "created": "2015-02-02T11:46:08.963-03:00",
                            "updated": "2015-02-02T11:46:08.963-03:00",
                            "queued": "2015-02-02T11:46:14.962-03:00",
                            "started": "2015-02-02T11:46:14.965-03:00",
                            "finished": "2015-02-02T11:46:17.045-03:00"
                        }
                    ],
                    "plan": "54c10f78c168ae62bb000001",
                    "owner": "54ba68b5c168ae6d38000001",
                    "target": "54cd34f6c168ae4bb3000067",
                    "project": "54bb270ec168aeb6f3000003",
                    "created": "2015-02-02T11:46:08.97-03:00",
                    "updated": "2015-02-02T11:46:17.045-03:00",
                    "queued": "2015-02-02T11:46:10.945-03:00",
                    "started": "2015-02-02T11:46:10.952-03:00",
                    "finished": "2015-02-02T11:46:17.045-03:00"
                }
            }
        ]
    };
}
