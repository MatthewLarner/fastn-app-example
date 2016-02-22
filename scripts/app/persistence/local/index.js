var prefix = 'fastn-app-demo',
    parseJSON = require('try-parse-json');

function parseJSONValue(value){
    if(value == null) {
        return value;
    }

    var result = parseJSON(value);

    if(result instanceof Error) {
        result = null;
    }

    return result;
}

function getAppKeys() {
    var keys = Object.keys(window.localStorage)
        .filter(function(key){
            return key.indexOf(prefix) === 0;
        });

    return keys;
}

function getAll() {
    var result = {};

    getAppKeys() .forEach(function(key){
        var appKey = key.slice(prefix.length);
        result[appKey] = parseJSONValue(window.localStorage[key]);
    });

    return result;
}

function get(key){
    return parseJSONValue(window.localStorage.getItem(prefix + key));
}

function set(key, value){
    window.localStorage.setItem(prefix + key, value);
}

function remove(key) {
    window.localStorage.removeItem(prefix + key);
}

function removeAll() {
    getAppKeys().forEach(function(key){
        window.localStorage.removeItem(key);
    });
}

module.exports = {
    get: get,
    getAll: getAll,
    set: set,
    remove: remove,
    removeAll: removeAll
};
