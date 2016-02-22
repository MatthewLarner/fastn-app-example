module.exports = function(app){
    window.addEventListener('resize', function(){
        app.uiState.resize({
            width: window.innerWidth,
            height: window.innerHeight
        });
    });
};
