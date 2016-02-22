var fastn = require('^fastn'),
    restArgs = require('rest-args');

module.exports = function(app, form){
    var term = app.language.term,
        children = restArgs(arguments);

    return fastn('form',
        {
            class: fastn.binding('valid', fastn.binding('submitted'), function(valid, submitted) {
                return [!valid && 'invalid', submitted && 'submitted'];
            })
        },
        form.heading ? fastn('h2', form.heading) : '',
        children,
        form.editable ? fastn('button', {
                class: 'submit',
                type: 'submit'
            }, form.submitText || term('submit')
        ) : null
    )
    .on('submit', function(event, model){
        event.preventDefault();
        form.submit();
    })
    .attach(form);
};
