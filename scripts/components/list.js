var listComponent = require('fastn/listComponent'),
    crel = require('crel'),
    doc = require('doc-js');

module.exports = function(fastn, component, type, settings, children){
    listComponent.apply(null, arguments);

    component.removeItem = function(item, itemsMap){
        var childComponent = itemsMap.get(item),
            element = childComponent.element;

        childComponent.detach();

        if(crel.isElement(element)){
            childComponent._initialClasses += ' removed'; // In case of later class modifications.
            doc(element).addClass('removed');
        }

        setTimeout(function(){
            itemsMap.delete(item);
            childComponent.remove(childComponent);
            childComponent.destroy();
        }, 200);
    };

    return component;
};