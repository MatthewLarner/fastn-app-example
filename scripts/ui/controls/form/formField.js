var fastn = require('^fastn'),
    field = require('../field'),
    fieldLabel = require('./fieldLabel'),
    controls = require('./controls');

module.exports = function(app) {
    var term = app.language.term;

    function createFormField(item){
        var control = controls[item.control](term, item),
            errorBinding = fastn.binding('error|*'),
            validationLabel = fastn('span', {'class': 'errors', display: errorBinding}, errorBinding),
            descriptionBinding = item.description,
            description = fastn('span', {class: 'description', display: descriptionBinding}, descriptionBinding);
        return field({

                fieldLabel: fieldLabel(item),
                errorBinding: errorBinding,
                isSetBinding: fastn.binding('isSet'),
                children: [control, description, validationLabel],
                class: item.type + ' ' + item.subtype
            }
        ).attach(item);
    }

    return createFormField;
};
