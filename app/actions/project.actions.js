import { dispatch } from '../lib/dispatcher';
import consts from '../constants';
import { projects, targets } from '../lib/api3';
import { nextTick } from '../lib/helpers';

/**
 * Create new project
 * @param  {String} name Project name
 * @return {Promise} promise with no data
 */
export function create(name) {
    return projects.create({ name }).then(function(project) {
        dispatch(consts.PROJECTS_FETCH_SUCCESS, [project]);   

        nextTick(() => setCurrentProject(project.id));
    });
}

/**
 * Set current project in dashboard
 * @param {String} projectId project id
 */
export function setCurrentProject(projectId, noTransition) {
    dispatch(consts.PROJECTS_SET_CURRENT, projectId);



    // call target actions
    return targets.list({ project: projectId }).then(function(data) {
        dispatch(consts.TARGETS_FETCH_SUCCESS, data.results);

        if (!noTransition) {
            nextTick(() => {

                let router = require('../router.js').get(); 
                router.transitionTo('overview');
            })    
        }

        return data.results;
    });
}


export function openCreateModal() {
    dispatch(consts.MODAL_OPEN, { name: 'project-create' });
}