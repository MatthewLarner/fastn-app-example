var fastn = require('^fastn');

module.exports = function(app, activityModel) {
    return fastn('div',
        {
            class:'page',
        },
        'Page not found'
    );
};
