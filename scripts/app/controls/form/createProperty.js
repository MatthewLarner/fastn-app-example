var merge = require('flat-merge');

module.exports = function(app) {
    function createProperty(name, settings) {
        settings = settings || {};

        var term = app.language.get;

        return merge(
            {
                name: name,
                type: 'string',
                label: term(name)
            },
            settings
        );
    }

    return createProperty;
};
