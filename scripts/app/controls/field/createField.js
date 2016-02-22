module.exports = function(app) {
    function createField(name, settings) {
        settings = settings || {};

        var term = app.language.get,
            fieldSettings =  {
            name: name,
            type: 'string'
        };

        for (var key in settings) {
            fieldSettings[key] = settings[key];
        }

        fieldSettings.label = term(settings.label || name);

        return fieldSettings;
    }

    return createField;
};
