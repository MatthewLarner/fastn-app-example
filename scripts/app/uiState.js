var fastn = require('^fastn');

module.exports = function(app){
    var windowSize = {
            width: window.innerWidth,
            height: window.innerHeight
        },
        largeScreen = fastn.binding('width', function(width) {
            return width > 768;
        }).attach(windowSize);

    return {
        windowSize: windowSize,
        resize: function(size){
            fastn.Model.update(windowSize, size);
        },
        largeScreen: largeScreen
    };
};
