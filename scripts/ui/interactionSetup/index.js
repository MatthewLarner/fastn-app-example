var doc = require('doc-js'),
    merge = require('merge'),
    morrison = require('morrison'),

    defaultValidators = morrison.defaultValidators(),
    validators = merge(defaultValidators, {
        '[data-validate=integer]': /^\d*$/
    });

doc.ready(function(){
    morrison({
        validators: validators
    });
    require('./apple');
});

window.onerror = function(){
    console.log.apply(console, arguments);
};
