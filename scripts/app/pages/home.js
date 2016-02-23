var Enti = require('enti'),
    store = Enti.store;

var page = {
        image: {
            url: ''
        }
    };

function imageLoaded() {
    store(page, 'loading', false);
}

module.exports = function(app) {
    var splashbase = app.persistence.splashbase;

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

    function loadPage(event, activity) {
        page.imageLoaded = imageLoaded;
        page.refreshSource = getRandomImage;

        getRandomImage();

        return page;
    }

    return loadPage;
};
