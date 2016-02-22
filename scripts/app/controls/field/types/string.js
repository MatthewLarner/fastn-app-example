var store = require('enti').store,
    validators = require('../validators'),
    field = require('../');

module.exports = function(app, form, settings) {
    var control = field(app, form, settings),
        subtype = settings.subtype;

    store(control, 'control', settings.required);
    store(control, 'control', settings.subtype || settings.type);
    store(control, 'subtype', subtype);
    store(control, 'type', 'string');

    control.data.set = function(value) {
        if(value == null || value === ''){
            return control.data.delete();
        }

        control.data._set(value);
    };

    control.on('change', function(){
        var value = control.data();
        store(control, 'value', value);
    });

    control.validators = [];

    if(settings.required) {
        control.validators.push(validators.required);
    }

    if(subtype && validators[subtype]) {
        control.validators.push(validators[subtype]);
    }

    return control;

};
