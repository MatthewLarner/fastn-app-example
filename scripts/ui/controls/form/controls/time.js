var fastn = require('^fastn');

module.exports = function stringTemplate(term, item){
    if(!item.editable){
        return fastn('label', fastn.binding('value'));
    }

    var timePicker = fastn('timePicker', {
        time: fastn.binding('value'),
        secondsEnabled: false
    });

    timePicker.time.on('change', function(time){
        item.data(timePicker.time());
    });

    return timePicker;
};
