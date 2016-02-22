var fastn = require('^fastn'),
    merge = require('flat-merge');

module.exports = function(settings){
    return fastn('div',
        merge({
            'class':fastn.binding(settings.isSetBinding, settings.errorBinding, function(isSet, error){
                return [
                    'field',
                    settings.type,
                    settings.subType,
                    (isSet ? 'set' : ''),
                    (error && error.length ? 'error': ''),
                    settings.class
                ];
            })
        }, settings.fieldSettings),
        settings.children,
        fastn('span', {
                'class':'fieldLabel'
            },
            settings.fieldLabel
        )
    );
};
