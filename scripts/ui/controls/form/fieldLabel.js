var fastn = require('^fastn');

module.exports = function fieldLabel(item){
    return fastn.binding('label').attach(item)();
};
