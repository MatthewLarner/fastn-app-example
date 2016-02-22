var fastn = require('^fastn');

function createForm(app, form, settings){
    var term = app.language.term,
        formField = require('./formField')(app);

    settings = settings || {};

    return fastn('form',
        {
            class: fastn.binding('valid', fastn.binding('submitted'), function(valid, submitted) {
                return [!valid && 'invalid', submitted && 'submitted', settings.class];
            })
        },
        form.heading ? fastn('h2', form.heading) : '',
        fastn('list', {
            items: fastn.binding('fields'),
            class: 'fields',
            template: function(model) {
                return formField(model.get('item'));
            }
        }),
        form.editable ? fastn('button', {
                class: 'submit',
                type: 'submit'
            }, form.submitText || term('submit')
        ) : null
    );
}

function createSectionForm(app, form) {
    var formSection = require('./section')(app),
        formTemplate = require('./template');

    return formTemplate(app, form,
        form.sections.map(function(section) {
            return formSection(
                section.heading,
                section.fields.map(function(fieldName){
                    return form.fields[fieldName];
                })
            );
        })
    );
}

var formTypes = {
    form: createForm,
    section: createSectionForm
};

module.exports = function(app, form){
    return formTypes[form.type](app, form)
        .on('submit', function(event, model){
            event.preventDefault();
            form.submit();
        })
        .attach(form);
};
