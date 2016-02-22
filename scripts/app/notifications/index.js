var EventEmitter = require('events').EventEmitter;

module.exports = function(app){
    var notifications = new EventEmitter();

    notifications.notify = function(message){
        notifications.emit('notification', message);
    };

    return notifications;
};
