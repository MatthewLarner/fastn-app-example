var fastn = require('^fastn');

module.exports = function(app) {
    var createField = require('./formField')(app);

    function formSection(heading, fields){
        return fastn('section', {class: 'fields'},
            fastn('h2', heading),
            fields.map(function(field){
                return createField(field);
            })
        );
    }

    return formSection;
};
