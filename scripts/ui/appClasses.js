var doc = require('doc-js'),
    fastn = require('^fastn');

function getClass(activities, name) {
    var isTop = activities.slice(-1).pop().name === name,
        pageClass = name + (isTop ? '-top' : '');

    return pageClass;
}

module.exports = function(app, appSelector) {
    var appElement = doc(appSelector),
        pageClasses = [];

    appElement.addClass('app');

    fastn.binding('.|**', function(activities) {
        pageClasses.forEach(function(oldClass) {
            appElement.removeClass(oldClass);
        });

        activities.forEach(function(activity) {
            var pageClass = getClass(activities, activity.name);
            pageClasses.push(pageClass);

            appElement.addClass(pageClass);
        });
    }).attach(app.router.activities);
};
