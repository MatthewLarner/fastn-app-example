var fastn = require('^fastn');

module.exports = function(app){
    return fastn('div', {
            class: 'appWrapper'
        },
        require('./activities')(app)
    );
};
