var fastn = require('^fastn'),
    SeeThreepio = require('see-threepio'),
    terms = require('./terms'),
    seeThreepio = new SeeThreepio(terms.en),
    Enti = require('enti'),
    store = Enti.store,
    unDefinedTerms = {};

function get(term){
    if(!term || (fastn.isBinding(term) && !term())){
        return;
    }

    var result = seeThreepio.get(term, Array.prototype.slice.call(arguments, 1));

    if(result instanceof Error){
        console.error('No term defined named: ' + term);
        var text = term.replace(/(.)([A-Z])/g, function(match, group1, group2) {
            return group1 + ' ' + group2.toLowerCase();
        });

        text = text.charAt(0).toUpperCase() + text.slice(1);

        unDefinedTerms[term] = text;

        return term;
    }

    return result;
}

module.exports = function(app){
    var language = {};
    app.seeThreepio = seeThreepio;

    language.unDefinedTerms = unDefinedTerms;

    function setLanguageTerms(name){
        store(language, 'currentLanguage', name);
        seeThreepio.replaceTerms(terms[name]);
        store(language, 'terms', seeThreepio._terms);
    }

    language.setLanguage = function(name) {
        store(language, 'currentLanguage', name);
        setLanguageTerms(name);
    };

    language.setLanguage('en');
    language.get = get;

    return language;
};
