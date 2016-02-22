var fastn = require('^fastn'),
    pages = require('^ui/pages'),
    shuv = require('shuv');

function getClass(activities, name) {
    var isTop = activities.slice(-1).pop().name === name,
        pageClass = name + (isTop ? '-top' : '');

    return ['appBody', pageClass];
}

module.exports = function(app){
    return fastn('list', {
        class: 'activities',
        items: fastn.binding('.|*'),
        template: function(model) {
            var activity = model.get('item'),
                name = activity.name,
                createPage = name in pages ? pages[name] : pages.notFound,
                getAppBodyClass =  shuv(getClass, shuv._, name);

            return fastn('section', {
                    'class': fastn.binding('activities|*', getAppBodyClass).attach(app.router)
                },
                createPage(app, activity)
            );
        }
    }).attach(app.router.activities);
};
