var Enti = require('enti'),
    store = Enti.store,
    EventEmitter = require('events').EventEmitter;

var page = new EventEmitter();

module.exports = function(app) {
    function createPage(event, app, activity){
        var splashbase = app.persistence.splashbase;
        store(page, 'image', {
            url: ''
        });

        function getRandomImage() {
            store(page, 'loading', true);

            splashbase.random({
                    imagesOnly: true
                },
                function(error, data) {
                    store(page, 'image', data);
                }
            );
        }

        page.imageLoaded = function() {
            store(page, 'loading', false);
        };

        getRandomImage();

        page.refreshSource = getRandomImage;

        return page;
    }

    return createPage;
};
