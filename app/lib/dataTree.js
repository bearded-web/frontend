import localStorage from '../lib/local-storage';
import { values } from 'lodash';

export default {
    // models stores
    // hold all entities by [id]:entity
    // projects: { 'project1id': { id: 'project1id', name: ... } }
    projects: {},
    techs: {},
    users: {},
    targets: {},
    report: {},
    agents: {},
    plans: {},
    scans: {},
    feedItems: {},

    // relation stores
    // hold relations between models
    // targetsFeeds: {
    //    target1Id: [feedItem1Id, feedItem2Id]
    // }
    targetsFeeds: {},
    projectsFeeds: {},

    // global data
    currentUserId: null,
    currentProjectId: localStorage.getItem('currentProjectId'),

    // pages
    targetTechsPage: {
        list: [],
        count: 0,
        pageSize: 16,
        targetId: null
    },

    scanReportsPage: {
        scanId: null
    },

    // components
    userPicker: {
        value: '',
        users: [], // Array of strings suggested users ids

        symbol: Symbol('userPickerFetch'),
        fetchDelay: 500
    },

    // options
    feedFetchLimit: 4
};

export const facets = {
    currentUser: {
        cursors: {
            users: ['users'],
            id: ['currentUserId']
        },
        get: data => data.users[data.id]
    },
    currentProject: {
        cursors: {
            id: ['currentProjectId'],
            projects: ['projects']
        },
        get: data => data.projects[data.id]
    },

    userPickerUsers: {
        cursors: {
            users: ['users'],
            list: ['userPicker', 'users']
        },
        get(data) {
            return data.list.map(id => data.users[id]);
        }
    },

    scanReports: {
        cursors: {
            reports: ['reports'],
            scanId: ['scanReportsPage', 'scanId']
        },
        get(data) {
            return values(data.reports).filter(r => r.scan === data.scanId);
        }
    },

    agents: {
        cursors: {
            agents: ['agents']
        },
        get: data => values(data.agents)
    }
};
