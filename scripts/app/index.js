var EventEmitter = require('events').EventEmitter;

module.exports = function(){
    var app = new EventEmitter();
    app.notifications = require('./notifications')(app);

    app.persistence = require('./persistence')(app);
    app.session = require('./session')(app);
    app.language = require('./language')(app);
    app.pages = require('./pages')(app);
    app.activities = require('./activities')(app);

    app.uiState = require('./uiState')(app);

    app.init = function(){
        app.emit('init');
    };

    return app;
};
