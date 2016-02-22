var EventEmitter = require('events').EventEmitter,
    persistence = new EventEmitter(),
    maxPersistenceListeners = 50;

persistence.setMaxListeners(maxPersistenceListeners);

persistence.abort = function() {
    persistence.emit('abort');
};

module.exports = function(app) {
    persistence.splashbase = require('./splashbase')(app);

    return persistence;
};
