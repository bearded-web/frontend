var reqwest = require('reqwest');

var path = '/api/v1/';

function makeRequest(options) {
    options.url = path + options.url;
    options.contentType = 'application/json';
    options.type = 'json';
    if (options.data) {
        options.data = JSON.stringify(options.data, null, 4);
    }

    return reqwest(options);
}

module.exports.one = function apiAll(endpoint, id) {
    return makeRequest({
        url: endpoint + '/' + id,
        method: 'get'
    });
};
module.exports.all = function apiAll(endpoint) {
    return makeRequest({
        url: endpoint,
        method: 'get'
    });
};
module.exports.create = function apiAll(endpoint, data) {
    return makeRequest({
        url: endpoint,
        method: 'post',
        data
    });
};


module.exports.targets = {
    one: function(targetId) {
        return makeRequest({
            url: 'targets/' + targetId,
            method: 'get'
        });
    },

    fetch: function() {
        return makeRequest({
            url: 'targets',
            method: 'get'
        }).then((data) => data.results);
    },

    create: function(target) {
        return reqwest({
            url: path + 'targets',
            type: 'json',
            contentType: 'application/json',
            method: 'post',
            data: JSON.stringify(target, null, 4)
        });
    },

    remove: function(target) {
        return reqwest({
            url: path + 'targets/' + target.id,
            type: 'json',
            contentType: 'application/json',
            method: 'delete'
        });
    }
};

