function initPages(app) {
    return {
        home: require('./home')(app),

        notFound: function(){}
    };
}

var Enti = require('enti'),
    store = Enti.store;

function handleActivityChange(app, pages, name, event, activity, index) {
    if(event === 'replace') {
        app.router.activities[index].page.destroy();
    }

    if(name) {
        var info = app.router.router.info(name);
        name = info && info.pageName || name;
        activity.info = info;
    }

    if(name in pages) {
        var createPage = pages[name];

        if(!createPage) {
            return;
        }

        var page = createPage(event, activity);

        store(activity, 'page', page);
    }
}

module.exports = function(app) {
    var pages = initPages(app);

    return handleActivityChange.bind(null, app, pages);
};
