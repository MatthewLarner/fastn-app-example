var store = require('enti').store,
    dataSource = require('../dataSource');

module.exports = function(app, form, settings) {
    var field = dataSource();

    for(var key in settings) {
        field[key] = settings[key];
    }

    field.editable = typeof settings.editable === 'boolean' ? settings.editable : true;
    field.control = settings.control || settings.type;

    field.on('change', function() {
        store(field, 'isSet', field.data.isSet());
        store(field, 'error', null);
    });

    field.setError = function(error) {
        store(field, 'error', error);
    };

    return field;
};
