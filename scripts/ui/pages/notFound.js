var fastn = require('^fastn');

module.exports = function(app, activityModel) {
    var term = app.language.get;

    return fastn('div',
        {
            class:'page',
        },
        term('pageNotFound')
    );
};
