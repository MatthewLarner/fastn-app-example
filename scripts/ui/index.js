var doc = require('doc-js'),
    createAppWrapper = require('./appWrapper'),
    appClasses = require('./appClasses'),
    notifications = require('./notifications');

require('./interactionSetup');

module.exports = function(app){
    require('./uiState')(app);
    var interface = createAppWrapper(app);
    notifications(app);

    doc.ready(function(){
        appClasses(app, 'html');

        interface.render();
        document.body.appendChild(interface.element);
        window.app = app;
    });
};
