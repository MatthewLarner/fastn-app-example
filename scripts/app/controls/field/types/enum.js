var store = require('enti').store,
    validators = require('../validators'),
    field = require('../');

module.exports = function (app, form, settings){
    var control = field(app, form, settings);

    store(control, 'control', 'select');
    store(control, 'type', 'enum');

    control.enum = settings.enum;
    control.options = settings.options;

    control.data.set = function(value){
        if(value == null || value === ''){
            return control.data.delete();
        }

        control.data._set(value);
    };

    control.on('change', function(){
        store(control, 'value', control.data());
    });

    control.required = settings.required;
    control.validators = [validators.required];

    return control;
};
