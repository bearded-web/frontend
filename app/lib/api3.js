//https://github.com/signalfx/swagger-ajax-client
//TODO refactor
'use strict';

//import { lostAuth } from '../actions/auth.actions';

import schema from './swagger.json';

var clientGenerator,
    api,
    __auth;

const statusHandlers = {

};

schema.apis.forEach(function(endpoint) {
    endpoint.apiDeclaration.basePath = '';
});

clientGenerator = require('swagger-client-generator');

api = clientGenerator(schema, requestHandler);

__auth = api.auth;
delete api.auth;

Object.keys(api).forEach(function(endpoint) {
    if (endpoint === 'auth') return;

    var shortEndpoint = endpoint.slice(5).toLowerCase();

    api[shortEndpoint] = api[endpoint];
});

api.__auth = __auth;

api.resultExtractor = function resultsExtractor(callback, self) {
    return function(data) {
        return callback.call(self, data.results ? data.results : [data]);
    };
};

/**
 * Return array from fetch response
 * @param {Array|Object} data response
 * @returns {Array}
 */
api.extractor = function extractor(data) {
    return data.results ? data.results : [data];
};

api.onStatus = (status, handler) => {
    if (!statusHandlers[status]) {
        statusHandlers[status] = [];
    }

    statusHandlers[status].push(handler);
};

module.exports = api;

function requestHandler(error, request) {
    return new Promise(function(resolve, reject) {
        if (error) {
            //TODO make logging
            //console.error(error);

            return reject(error);
        }

        var method = request.method;
        var url = request.url;
        var body = request.body;
        var headers = request.headers;

        var options = request.options;
        var async = ('async' in options) ? options.async : true;
        var xhr = new window.XMLHttpRequest();

        xhr.open(method, url, async);

        if (headers) {
            Object.keys(headers).forEach(function(header) {
                xhr.setRequestHeader(header, headers[header]);
            });
        }

        /*eslint-disable*/
        if (options.withCredentials) xhr.withCredentials = options.withCredentials;
        if (options.timeout) xhr.timeout = options.timeout;
        if (options.onabort) xhr.onabort = options.onabort;
        if (options.onerror) xhr.onerror = options.onerror;
        if (options.onload) xhr.onload = options.onload;
        if (options.ontimeout) xhr.ontimeout = options.ontimeout;
        if (options.onprogress) xhr.onprogress = options.onprogress;
        /*eslint-enable*/

        xhr.onloadend = function() {
            var data = this.response;
            var contentType = this.getResponseHeader('Content-Type');

            const handlers = statusHandlers[this.status] || [];
            handlers.forEach(h => h(data));


            if (contentType && contentType.indexOf('application/json') !== -1) {
                try {
                    data = JSON.parse(data);
                } catch (error) {
                    reject({
                        error: error,
                        status: this.status,
                        data: data
                    });
                }
            }

            if (this.status < 200 || this.status >= 300) {
                reject({
                    error: error,
                    status: this.status,
                    data: data
                });
            } else {
                resolve(data);
            }

            if (options.onloadend) options.onloadend.call(this);
        };

        xhr.send(body);
    });
}
