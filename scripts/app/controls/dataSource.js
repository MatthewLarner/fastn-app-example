var EventEmitter = require('events').EventEmitter;

module.exports = function(){
    var dataSource = new EventEmitter();

    var data,
        isSet = false;

    dataSource.data = function(value){
        if(!arguments.length){
            return dataSource.data.get();
        }

        dataSource.data.set(value);
    };
    dataSource.data.get = function(){
        return dataSource.data._get();
    };
    dataSource.data.set = function(value){
        dataSource.data._set(value);
    };
    dataSource.data._get = function(){
        return data;
    };
    dataSource.data._set = function(value, set){
        isSet = set === false ? set : true;
        data = value;
        dataSource.emit('change', data);
    };
    dataSource.data.isSet = function(){
        return isSet;
    };
    dataSource.data.delete = function(){
        dataSource.data._set(undefined, false);
    };


    return dataSource;
};
