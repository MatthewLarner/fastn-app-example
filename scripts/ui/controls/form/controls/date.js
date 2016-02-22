var fastn = require('^fastn');

module.exports = function dateTemplate(term, item){
    if(!item.editable){
        return fastn('label', fastn.binding('content'));
    }

    var datePicker = fastn('datePicker', {
        date: fastn.binding('value')
    });

    datePicker.on('invalid', function(){
        item.invalid && item.invalid();
    });

    datePicker.date.on('change', function(){
        item.data(datePicker.date());
    });

    return datePicker;
};
