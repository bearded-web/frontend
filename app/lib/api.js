var schema = require('./swagger.json');

function requestHandler(error, request) {
    if (error) return console.error(error.toString());

    var xhr = new XMLHttpRequest();
    xhr.open(request.method, request.url);

    if (request.headers) {
        Object.keys(request.headers).forEach(function(header) {
            xhr.setRequestHeader(header, request.headers[header]);
        });
    }

    xhr.onloadend = function() {
        var data = null,
            error = null;

        try {
            var resp = this.response ? JSON.parse(this.response) : {};

            if (this.status >= 200 && this.status < 300) {
                data = resp;
            } else {
                error = resp;
            }

            request.options.callback(error, data);
        }
        catch (e) {
            request.options.callback(e);
            console.log('onloadend error', e);
        }
    };


    xhr.send(request.body);
}

var _ = require('lodash');

var swaggerClientGenerator = require('swagger-client-generator');

var rawapi = swaggerClientGenerator(schema, requestHandler);

var api = function(endpoint, alias, params, data) {
    if (arguments.length === 1) {
        return api.bind(null, endpoint);
    }
    if (arguments.length === 3) {
        data = params;
        params = {};
    }
    if (arguments.length === 2) {
        params = {};
    }


    params.body = data;

    return new Promise(function(resolve, reject) {
        var apiName = 'apiV1' + endpoint.charAt(0).toUpperCase() + endpoint.slice(1);

        if (endpoint === 'targets')
            debugger
        rawapi[apiName][alias](
            params,
            function(err, data) {
                if (err) {
                    return reject(err);
                }

                resolve(data);
            }
        );
    });
};

module.exports = api;
