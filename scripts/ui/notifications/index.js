var tBag = require('t-bag'),
    box = new tBag.Box(),
    doc = require('doc-js'),
    terrace = require('terrace');

box.maxBags(1);

doc.ready(function(){
    document.body.appendChild(box.element);
    terrace(box.element, 0, {
        displace: ['above']
    });
    //TODO: add a better solution using tBag rather than just manually adding a class;
    doc(box.element).on('click', function(){
        doc(box.element).addClass('tBagEmpty');
    });
});

module.exports = function(app){
    app.notifications.on('notification', function(message){
        if(message instanceof Error){
            message = message.message;
        }
        box.bag(message);
    });
};
