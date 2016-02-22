var localPersistence = require('^app/persistence/local'),
    session = localPersistence.getAll(),
    Enti = require('enti'),
    sessionModel = new Enti(session);

module.exports = function(app) {
    sessionModel.on('.|**', function(session){
        Object.keys(session).forEach(function(key){
            var value = session[key];

            if(!value) {
                localPersistence.remove(key);
                Enti.remove(app.session, key);
            } else {
                localPersistence.set(key, JSON.stringify(value));
            }

        });
    });

    return session;
};
