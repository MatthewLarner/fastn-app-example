var crel = require('crel');

module.exports = function(fastn, component, type, settings, children){

    component.extend('_generic', settings, children);

    component.render = function(){
        component.element = crel('a', {
            tabindex: 0
        });

        component.emit('render');

        return component;
    };

    return component;
};