var routes = require('./routes'),
    request = require('../request')(routes),
    shuv = require('shuv'),
    transforms = require('./transforms'),
    endpoints = {};

function simpleRequest(app, name, settings, callback){
    var term = app.language.get;

    if(!callback) {
        callback = settings;
        settings = null;
    }

    settings = settings || {};
    settings.requestedWith = false;
    settings.contentType = false;

    return request(app, name, settings, function(error, data){
        if(error) {

            var errorMessage = error.message || term('anUnknownErrorOccured');

            app.notifications.notify(errorMessage);
            return callback(error);
        }

        callback(null, transforms.camelise(data));
    });
}

module.exports = function(app) {
    for (var key in routes) {
        endpoints[key] = shuv(simpleRequest, app, key);
    }

    return endpoints;
};
