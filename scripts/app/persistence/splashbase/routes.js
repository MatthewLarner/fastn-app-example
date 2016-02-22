var config = require('^config'),
    baseUrl = config.splashbase.baseUrl;

module.exports = {
    random: {
        url: baseUrl + '/images/random?images_only={imagesOnly}',
        method: 'GET'
    },
    latest: {
        url: baseUrl + '/images/latest',
        method: 'GET'
    }
};
