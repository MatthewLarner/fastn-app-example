module.exports = function(app, control, value){
    var invalidMessage,
        term = app.language.get;

    if(control.required && (value == null || value === '')) {
        invalidMessage = term('requiredField');
    }

    return invalidMessage;
};
