var cpjax = require('cpjax'),
    iconCache = {};

module.exports = function(fastn, component, type, settings, children){
    settings.tagName = 'i';

    component.extend('_generic', settings, children);

    function setImage(svg){
        if(!component.element){ // Componant has been destroyed
            return;
        }
        component.element.innerHTML = svg;
    }

    function updateName(){
        var name = component.name();

        if(!component.element || !name){
            return;
        }

        var path = 'images/svg-icons/' + name + '.svg';

        if(path in iconCache){
            if(typeof iconCache[path] === 'function'){
                iconCache[path](setImage);
            }else{
                setImage(iconCache[path]);
            }
            return;
        }

        iconCache[path] = function(callback){
            iconCache[path].callbacks.push(callback);
        };
        iconCache[path].callbacks = [];
        iconCache[path](setImage);

        cpjax('images/svg-icons/' + name + '.svg', function(error, svg){
            if(error){
                setImage(null);
                return;
            }

            iconCache[path].callbacks.forEach(function(callback){
                callback(svg);
            });

            iconCache[path] = svg;
        });
    }

    component.setProperty('name', fastn.property('', updateName));

    return component;
};
