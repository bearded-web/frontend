var schema = {
    "swaggerVersion": "1.2",
    "apis": [
        {
            "path": "/api/v1/auth",
            "description": "Authorization management",
            "apiDeclaration": {
                "swaggerVersion": "1.2",
                "apiVersion": "",
                "basePath": "http://localhost:3003",
                "resourcePath": "/api/v1/auth",
                "apis": [
                    {
                        "path": "/api/v1/auth",
                        "description": "Authorization management",
                        "operations": [
                            {
                                "type": "void",
                                "method": "POST",
                                "summary": "Login",
                                "nickname": "login",
                                "parameters": [
                                    {
                                        "type": "auth.authEntity",
                                        "paramType": "body",
                                        "name": "body",
                                        "description": "",
                                        "required": true,
                                        "allowMultiple": false
                                    }
                                ],
                                "responseMessages": [
                                    {
                                        "code": 201,
                                        "message": "Session created",
                                        "responseModel": "auth.sessionEntity"
                                    },
                                    {
                                        "code": 400,
                                        "message": "Bad Request",
                                        "responseModel": "restful.ServiceError"
                                    },
                                    {
                                        "code": 401,
                                        "message": "Unauthorized",
                                        "responseModel": "restful.ServiceError"
                                    },
                                    {
                                        "code": 500,
                                        "message": "Internal Server Error",
                                        "responseModel": "restful.ServiceError"
                                    }
                                ],
                                "produces": ["application/json"],
                                "consumes": ["application/json"]
                            },
                            {
                                "type": "void",
                                "method": "DELETE",
                                "summary": "Logout",
                                "nickname": "logout",
                                "parameters": [],
                                "responseMessages": [
                                    {
                                        "code": 204,
                                        "message": "No Content"
                                    },
                                    {
                                        "code": 400,
                                        "message": "Bad Request",
                                        "responseModel": "restful.ServiceError"
                                    },
                                    {
                                        "code": 500,
                                        "message": "Internal Server Error",
                                        "responseModel": "restful.ServiceError"
                                    }
                                ],
                                "produces": ["application/json"],
                                "consumes": ["application/json"]
                            },
                            {
                                "type": "void",
                                "method": "GET",
                                "summary": "Status",
                                "nickname": "status",
                                "parameters": [],
                                "responseMessages": [
                                    {
                                        "code": 200,
                                        "message": "OK"
                                    },
                                    {
                                        "code": 400,
                                        "message": "Bad Request",
                                        "responseModel": "restful.ServiceError"
                                    },
                                    {
                                        "code": 401,
                                        "message": "Unauthorized",
                                        "responseModel": "restful.ServiceError"
                                    },
                                    {
                                        "code": 500,
                                        "message": "Internal Server Error",
                                        "responseModel": "restful.ServiceError"
                                    }
                                ],
                                "produces": ["application/json"],
                                "consumes": ["application/json"]
                            }
                        ]
                    }
                ],
                "models": {
                    "auth.authEntity": {
                        "id": "auth.authEntity",
                        "required": [
                            "email",
                            "password"
                        ],
                        "properties": {
                            "email": { "type": "string" },
                            "password": { "type": "string" }
                        }
                    },
                    "auth.sessionEntity": {
                        "id": "auth.sessionEntity",
                        "required": ["token"],
                        "properties": {
                            "token": {
                                "type": "string",
                                "description": "isn't implemented yet"
                            }
                        }
                    },
                    "restful.ServiceError": {
                        "id": "restful.ServiceError",
                        "required": [
                            "Code",
                            "Message"
                        ],
                        "properties": {
                            "Code": {
                                "type": "integer",
                                "format": "int32"
                            },
                            "Message": { "type": "string" }
                        }
                    }
                }
            }
        },
        {
            "path": "/api/v1/me",
            "description": "Current user management",
            "apiDeclaration": {
                "swaggerVersion": "1.2",
                "apiVersion": "",
                "basePath": "http://localhost:3003",
                "resourcePath": "/api/v1/me",
                "apis": [
                    {
                        "path": "/api/v1/me",
                        "description": "Current user management",
                        "operations": [
                            {
                                "type": "me.Info",
                                "method": "GET",
                                "summary": "Information",
                                "nickname": "info",
                                "parameters": [],
                                "responseMessages": [
                                    {
                                        "code": 200,
                                        "message": "OK"
                                    },
                                    {
                                        "code": 401,
                                        "message": "Unauthorized",
                                        "responseModel": "restful.ServiceError"
                                    },
                                    {
                                        "code": 500,
                                        "message": "Internal Server Error",
                                        "responseModel": "restful.ServiceError"
                                    }
                                ],
                                "produces": ["application/json"],
                                "consumes": ["application/json"]
                            }
                        ]
                    }
                ],
                "models": {
                    "me.Info": {
                        "id": "me.Info",
                        "required": ["user"],
                        "properties": { "user": { "type": "user.User" } }
                    },
                    "restful.ServiceError": {
                        "id": "restful.ServiceError",
                        "required": [
                            "Code",
                            "Message"
                        ],
                        "properties": {
                            "Code": {
                                "type": "integer",
                                "format": "int32"
                            },
                            "Message": { "type": "string" }
                        }
                    },
                    "user.User": {
                        "id": "user.User",
                        "required": [
                            "id",
                            "email",
                            "created",
                            "updated"
                        ],
                        "properties": {
                            "created": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "email": { "type": "string" },
                            "id": { "type": "string" },
                            "updated": {
                                "type": "string",
                                "format": "date-time"
                            }
                        }
                    }
                }
            }
        },
        {
            "path": "/api/v1/plugins",
            "description": "Manage Plugins",
            "apiDeclaration": {
                "swaggerVersion": "1.2",
                "apiVersion": "",
                "basePath": "http://localhost:3003",
                "resourcePath": "/api/v1/plugins",
                "apis": [
                    {
                        "path": "/api/v1/plugins/{plugin-id}",
                        "description": "Manage Plugins",
                        "operations": [
                            {
                                "type": "plugin.Plugin",
                                "method": "GET",
                                "summary": "Get plugin",
                                "nickname": "get",
                                "parameters": [
                                    {
                                        "type": "string",
                                        "paramType": "path",
                                        "name": "plugin-id",
                                        "description": "",
                                        "required": true,
                                        "allowMultiple": false
                                    }
                                ],
                                "responseMessages": [
                                    {
                                        "code": 200,
                                        "message": "OK"
                                    },
                                    {
                                        "code": 400,
                                        "message": "Bad Request",
                                        "responseModel": "restful.ServiceError"
                                    },
                                    {
                                        "code": 404,
                                        "message": "Not Found"
                                    },
                                    {
                                        "code": 500,
                                        "message": "Internal Server Error",
                                        "responseModel": "restful.ServiceError"
                                    }
                                ],
                                "produces": ["application/json"],
                                "consumes": ["application/json"]
                            },
                            {
                                "type": "plugin.Plugin",
                                "method": "PUT",
                                "summary": "Update plugin",
                                "nickname": "update",
                                "parameters": [
                                    {
                                        "type": "string",
                                        "paramType": "path",
                                        "name": "plugin-id",
                                        "description": "",
                                        "required": true,
                                        "allowMultiple": false
                                    },
                                    {
                                        "type": "plugin.Plugin",
                                        "paramType": "body",
                                        "name": "body",
                                        "description": "",
                                        "required": true,
                                        "allowMultiple": false
                                    }
                                ],
                                "responseMessages": [
                                    {
                                        "code": 200,
                                        "message": "OK"
                                    },
                                    {
                                        "code": 400,
                                        "message": "Bad Request",
                                        "responseModel": "restful.ServiceError"
                                    },
                                    {
                                        "code": 404,
                                        "message": "Not Found"
                                    },
                                    {
                                        "code": 500,
                                        "message": "Internal Server Error",
                                        "responseModel": "restful.ServiceError"
                                    }
                                ],
                                "produces": ["application/json"],
                                "consumes": ["application/json"]
                            }
                        ]
                    },
                    {
                        "path": "/api/v1/plugins",
                        "description": "Manage Plugins",
                        "operations": [
                            {
                                "type": "plugin.PluginList",
                                "method": "GET",
                                "summary": "List plugins",
                                "nickname": "list",
                                "parameters": [],
                                "responseMessages": [
                                    {
                                        "code": 200,
                                        "message": "OK"
                                    },
                                    {
                                        "code": 500,
                                        "message": "Internal Server Error",
                                        "responseModel": "restful.ServiceError"
                                    }
                                ],
                                "produces": ["application/json"],
                                "consumes": ["application/json"]
                            },
                            {
                                "type": "plugin.Plugin",
                                "method": "POST",
                                "summary": "Create plugin",
                                "nickname": "create",
                                "parameters": [
                                    {
                                        "type": "plugin.Plugin",
                                        "paramType": "body",
                                        "name": "body",
                                        "description": "",
                                        "required": true,
                                        "allowMultiple": false
                                    }
                                ],
                                "responseMessages": [
                                    {
                                        "code": 201,
                                        "message": "Created"
                                    },
                                    {
                                        "code": 409,
                                        "message": "Conflict",
                                        "responseModel": "restful.ServiceError"
                                    },
                                    {
                                        "code": 500,
                                        "message": "Internal Server Error",
                                        "responseModel": "restful.ServiceError"
                                    }
                                ],
                                "produces": ["application/json"],
                                "consumes": ["application/json"]
                            }
                        ]
                    }
                ],
                "models": {
                    "plugin.Container": {
                        "id": "plugin.Container",
                        "required": [
                            "registry",
                            "image"
                        ],
                        "properties": {
                            "image": { "type": "string" },
                            "registry": { "type": "string" }
                        }
                    },
                    "plugin.Description": {
                        "id": "plugin.Description",
                        "required": [
                            "title",
                            "info",
                            "url"
                        ],
                        "properties": {
                            "info": { "type": "string" },
                            "title": { "type": "string" },
                            "url": { "type": "string" }
                        }
                    },
                    "plugin.Plugin": {
                        "id": "plugin.Plugin",
                        "required": [
                            "name",
                            "version",
                            "type",
                            "weight",
                            "description",
                            "enabled"
                        ],
                        "properties": {
                            "container": {
                                "type": "plugin.Container",
                                "description": "information about container"
                            },
                            "description": {
                                "type": "plugin.Description",
                                "description": "human readable description"
                            },
                            "enabled": {
                                "type": "boolean",
                                "description": "is plugin enabled for running"
                            },
                            "id": { "type": "string" },
                            "name": {
                                "type": "string",
                                "description": "unique plugin id, ex: barbudo/wpscan"
                            },
                            "type": {
                                "type": "plugin.PluginType",
                                "description": "one of: util|script"
                            },
                            "version": { "type": "string" },
                            "weight": {
                                "type": "plugin.PluginWeight",
                                "description": "one of: light|middle|heavy"
                            }
                        }
                    },
                    "plugin.PluginList": {
                        "id": "plugin.PluginList",
                        "required": [
                            "count",
                            "next",
                            "previous",
                            "results"
                        ],
                        "properties": {
                            "count": {
                                "type": "integer",
                                "format": "int32"
                            },
                            "next": { "type": "string" },
                            "previous": { "type": "string" },
                            "results": {
                                "type": "array",
                                "items": { "$ref": "plugin.Plugin" }
                            }
                        }
                    },
                    "restful.ServiceError": {
                        "id": "restful.ServiceError",
                        "required": [
                            "Code",
                            "Message"
                        ],
                        "properties": {
                            "Code": {
                                "type": "integer",
                                "format": "int32"
                            },
                            "Message": { "type": "string" }
                        }
                    }
                }
            }
        },
        {
            "path": "/api/v1/users",
            "description": "User management",
            "apiDeclaration": {
                "swaggerVersion": "1.2",
                "apiVersion": "",
                "basePath": "http://localhost:3003",
                "resourcePath": "/api/v1/users",
                "apis": [
                    {
                        "path": "/api/v1/users/{user-id}/password",
                        "description": "User management",
                        "operations": [
                            {
                                "type": "void",
                                "method": "POST",
                                "summary": "Set password, only for administrator",
                                "nickname": "setPassword",
                                "parameters": [
                                    {
                                        "type": "string",
                                        "paramType": "path",
                                        "name": "user-id",
                                        "description": "",
                                        "required": true,
                                        "allowMultiple": false
                                    },
                                    {
                                        "type": "user.Password",
                                        "paramType": "body",
                                        "name": "body",
                                        "description": "",
                                        "required": true,
                                        "allowMultiple": false
                                    }
                                ],
                                "responseMessages": [
                                    {
                                        "code": 201,
                                        "message": "Created"
                                    },
                                    {
                                        "code": 400,
                                        "message": "Bad Request",
                                        "responseModel": "restful.ServiceError"
                                    },
                                    {
                                        "code": 401,
                                        "message": "Unauthorized"
                                    },
                                    {
                                        "code": 403,
                                        "message": "Forbidden"
                                    },
                                    {
                                        "code": 404,
                                        "message": "Not Found"
                                    },
                                    {
                                        "code": 500,
                                        "message": "Internal Server Error",
                                        "responseModel": "restful.ServiceError"
                                    }
                                ],
                                "produces": ["application/json"],
                                "consumes": ["application/json"]
                            }
                        ]
                    },
                    {
                        "path": "/api/v1/users",
                        "description": "User management",
                        "operations": [
                            {
                                "type": "user.UserList",
                                "method": "GET",
                                "summary": "List users",
                                "nickname": "list",
                                "parameters": [],
                                "responseMessages": [
                                    {
                                        "code": 200,
                                        "message": "OK"
                                    },
                                    {
                                        "code": 400,
                                        "message": "Bad Request",
                                        "responseModel": "restful.ServiceError"
                                    },
                                    {
                                        "code": 500,
                                        "message": "Internal Server Error",
                                        "responseModel": "restful.ServiceError"
                                    }
                                ],
                                "produces": ["application/json"],
                                "consumes": ["application/json"]
                            },
                            {
                                "type": "user.User",
                                "method": "POST",
                                "summary": "Create user",
                                "nickname": "create",
                                "parameters": [
                                    {
                                        "type": "user.User",
                                        "paramType": "body",
                                        "name": "body",
                                        "description": "",
                                        "required": true,
                                        "allowMultiple": false
                                    }
                                ],
                                "responseMessages": [
                                    {
                                        "code": 201,
                                        "message": "Created"
                                    },
                                    {
                                        "code": 409,
                                        "message": "Conflict",
                                        "responseModel": "restful.ServiceError"
                                    },
                                    {
                                        "code": 500,
                                        "message": "Internal Server Error",
                                        "responseModel": "restful.ServiceError"
                                    }
                                ],
                                "produces": ["application/json"],
                                "consumes": ["application/json"]
                            }
                        ]
                    },
                    {
                        "path": "/api/v1/users/{user-id}",
                        "description": "User management",
                        "operations": [
                            {
                                "type": "user.User",
                                "method": "GET",
                                "summary": "Get user",
                                "nickname": "get",
                                "parameters": [
                                    {
                                        "type": "string",
                                        "paramType": "path",
                                        "name": "user-id",
                                        "description": "",
                                        "required": true,
                                        "allowMultiple": false
                                    }
                                ],
                                "responseMessages": [
                                    {
                                        "code": 200,
                                        "message": "OK"
                                    },
                                    {
                                        "code": 400,
                                        "message": "Bad Request",
                                        "responseModel": "restful.ServiceError"
                                    },
                                    {
                                        "code": 404,
                                        "message": "Not Found"
                                    },
                                    {
                                        "code": 500,
                                        "message": "Internal Server Error",
                                        "responseModel": "restful.ServiceError"
                                    }
                                ],
                                "produces": ["application/json"],
                                "consumes": ["application/json"]
                            }
                        ]
                    }
                ],
                "models": {
                    "restful.ServiceError": {
                        "id": "restful.ServiceError",
                        "required": [
                            "Code",
                            "Message"
                        ],
                        "properties": {
                            "Code": {
                                "type": "integer",
                                "format": "int32"
                            },
                            "Message": { "type": "string" }
                        }
                    },
                    "user.Password": {
                        "id": "user.Password",
                        "required": ["password"],
                        "properties": { "password": { "type": "string" } }
                    },
                    "user.User": {
                        "id": "user.User",
                        "required": [
                            "id",
                            "email",
                            "created",
                            "updated"
                        ],
                        "properties": {
                            "created": {
                                "type": "string",
                                "format": "date-time"
                            },
                            "email": { "type": "string" },
                            "id": { "type": "string" },
                            "updated": {
                                "type": "string",
                                "format": "date-time"
                            }
                        }
                    },
                    "user.UserList": {
                        "id": "user.UserList",
                        "required": [
                            "count",
                            "next",
                            "previous",
                            "results"
                        ],
                        "properties": {
                            "count": {
                                "type": "integer",
                                "format": "int32"
                            },
                            "next": { "type": "string" },
                            "previous": { "type": "string" },
                            "results": {
                                "type": "array",
                                "items": { "$ref": "user.User" }
                            }
                        }
                    }
                }
            }
        }
    ],
    "apiVersion": "",
    "info": {
        "title": "",
        "description": ""
    }
};

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
            console.log('onloadend error', e)
        }
    };


    xhr.send(request.body);
}

var _ = require('lodash');

var swaggerClientGenerator = require('swagger-client-generator');

var rawapi = swaggerClientGenerator(schema, requestHandler);

var api = function(endpoint, alias, data) {
    if (arguments.length === 1) {
        return api.bind(null, endpoint);
    }

    return new Promise(function(resolve, reject) {
        var apiName = 'apiV1' + endpoint.charAt(0).toUpperCase() + endpoint.slice(1);

        rawapi[apiName][alias](
            { body: data },
            function(err, data) {
                if (err) {
                    return reject(err);
                }

                resolve(data)
            }
        );
    })
};

module.exports = api;
