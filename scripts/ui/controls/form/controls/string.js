var fastn = require('^fastn');

module.exports = function stringTemplate(term, item){
    var subtype = item.subtype;

    if(!item.editable){
        return fastn('label', fastn.binding('value'));
    }

    var inputSettings = {
            value: fastn.binding('value'),
            onchange: 'value:value'
        };

    if(subtype){
        inputSettings.type = subtype;

        if(subtype === 'password') {
            inputSettings.autocomplete = 'off';
        }
    }

    var input = fastn('input', inputSettings)
        .on('change keyup', function(event, scope){
            item.data(event.target.value);
        });

    return input;
};
