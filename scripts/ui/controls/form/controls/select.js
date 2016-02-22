var fastn = require('^fastn'),
    laidout = require('laidout'),
    doc = require('doc-js');

module.exports = function stringTemplate(term, item){
    if(!item.editable){
        return fastn('label', fastn.binding('value'));
    }

    var select = fastn('span',
        {
            'class': 'select'
        },
        fastn('list', {
            tagName: 'select',
            value: fastn.binding('value'),
            items: item.options,
            template: function(model){
                var option = model.get('item');

                return fastn('option', {
                        value: option.value
                    },
                    option.label
                );
            }
        })
        .on('change', function(event, scope){
            var select = this,
                multiple = this.element.multiple,
                selectedValues = Array.prototype.map.call(this.element.selectedOptions, function(option){
                    return select.items()[doc(option).indexOfElement()].value;
                });

            item.data(multiple ? selectedValues : selectedValues[0]);
        })
        .on('render', function(){
            var select = this;
            laidout(select.element, function(){
                select.element.selectedIndex = -1;
                select.element.value = select.value();
            });
        })
    );

    return select;
};
