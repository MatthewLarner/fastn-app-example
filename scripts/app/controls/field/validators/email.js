module.exports = function(app, control, value){
    var invalidMessage,
        term = app.language.get;

    if(!value.match(/.+@.+\..+/)) {
        invalidMessage = term('validEmailRequired')();
    }

    return invalidMessage;
};
