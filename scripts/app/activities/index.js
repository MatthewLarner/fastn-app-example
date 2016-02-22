var createActivityRouter = require('activity-router'),
    initRoutes = require('./routes'),
    fastn = require('^fastn'),
    deepEqual = require('deep-equal'),
    maxRouteListeners = 25,
    clone = require('clone');

module.exports = function(app){
    var pages = app.pages,
        routes = initRoutes(app);

    var activityRouter = createActivityRouter(routes),
        activities = [],
        activitiesModel =  new fastn.Model(activityRouter);

    activityRouter.setMaxListeners(maxRouteListeners);

    activitiesModel.set('activities', []);

    function updateInfo(route){
        fastn.Model.set(route, '_info', activityRouter.router.info(route.name));
    }

    activityRouter.on('add', function(activity, index){
        activities.push(clone(activity));
        var currentActivity = activities[index];


        pages(currentActivity.name, 'add', currentActivity);
        updateInfo(currentActivity);

        activitiesModel.push('activities', currentActivity);
        activityRouter.replace(currentActivity.name, currentActivity.values, index);

        fastn.binding('values|*', function(values){
            activityRouter.replace(currentActivity.name, values, index);
        }).attach(currentActivity);
    });

    activityRouter.on('update', function(activity, index){
        var currentActivity = activities[index];


        if(deepEqual(activity.values, currentActivity.values)){
            return;
        }

        var Enti = require('enti');

        Enti.update(currentActivity.values, activity.values);

        updateInfo(currentActivity);


        activitiesModel.update('activities.' + index, currentActivity);
    });

    activityRouter.on('replace', function(activity, index){
        activities[index] = clone(activity);
        var currentActivity = activities[index];

        app.persistence.abort();

        pages(currentActivity.name, 'replace', currentActivity, index);
        updateInfo(currentActivity);

        activitiesModel.set('activities.' + index, currentActivity);
        activityRouter.replace(currentActivity.name, currentActivity.values, index);

        fastn.binding('values|*', function(values){
            activityRouter.replace(currentActivity.name, values, index);
        }).attach(currentActivity);
    });

    activityRouter.on('remove', function(activity, index){
        activities.splice(index, 1);
        var currentActivity = activities[index];


        pages(currentActivity.name, 'remove', currentActivity);
        activitiesModel.remove('activities', index);
    });

    activityRouter.top = function() {
        return activities.slice(-1).pop();
    };

    activityRouter.all = activities;

    app.on('init', function() {
        activityRouter.init();
    });

    app.router = activityRouter;

    app.router.navigateTo = function(route, values) {
        var topRoute = activityRouter.top();

        if(route === (topRoute && topRoute.name)) {
            return;
        }

        activityRouter.reset(route, values);
    };
};
