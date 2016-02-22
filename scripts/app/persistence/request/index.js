var cpjax = require('cpjax');

module.exports = function(routes){
    return function request(app, routeName, settings, callback){
        settings = settings || {};

        var route = routes[routeName];

        var ajax = cpjax({
            url: route.url.replace(/\{(.*?)\}/g, function(match, value){
                return settings[value];
            }),
            cors: true,
            requestedWith: settings.requestedWith,
            contentType: settings.contentType,
            method: route.method,
            dataType: 'json',
            data: settings.body,
            headers: settings.headers
        }, function complete(error, data, response){
            app.persistence.removeListener('abort', abortRequest);

            if(error){
                if(response.type === 'abort') {
                    return;
                }

                return callback(error);
            }

            callback(null, data);
        });

        function abortRequest() {
            ajax.request.abort();
        }

        app.persistence.on('abort', abortRequest);

        return {
            abort: abortRequest
        };
    };
};
