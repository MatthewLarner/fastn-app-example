var store = require('enti').store,
    EventEmitter = require('events').EventEmitter,
    fieldTypes = require('../field/types');

module.exports = function(app, settings) {
    var form = new EventEmitter(),
        fields = {};

    form.editable = settings.editable === false ? false : true;
    form.type = 'section';
    form.sections = [];

    settings.sections.forEach(function(section) {
        var formSection = {
            heading: section.heading,
            fields: []
        };

        section.properties.forEach(function(property){
            if(!form.editable) {
                property.editable = false;
            }
            fields[property.name] = fieldTypes[property.type](app, settings, property);
            fields[property.name].validate = function(data){
                var field = fields[property.name],
                errorMessage;

                if(!field.validators) {
                    return;
                }

                for(var i = 0; i < field.validators.length; i++) {
                    errorMessage = field.validators[i](app, field, data);

                    if(errorMessage) {
                        break;
                    }
                }

                return errorMessage;
            };

            formSection.fields.push(property.name);
        });

        form.sections.push(formSection);

    });


    form.fields = fields;
    form.heading = settings.heading;

    form.getData = function(){
        var data = {};

        for (var key in form.fields) {
            data[key] = form.fields[key].data.get();
        }

        return data;
    };

    if(!form.unEditable) {
        form.validate = function() {
            var data = form.getData(),
                valid = true;

            for(var key in data) {
                var field = form.fields[key];
                if(!field.validators.length || form.unEditable) {

                    continue;
                }

                var errorMessage = field.validate(data[key]);

                if(errorMessage) {
                    store(form.fields[key], 'error', errorMessage);
                    valid = false;
                }
            }

            store(form, 'valid', valid);

            return valid;
        };

        form.submitText = settings.submitText;

        form.submit = function(){
            form.validate();
            store(form, 'submitted', true);

            if(form.submitActions) {
                form.submitActions();
            }
        };
    }

    return form;
};
