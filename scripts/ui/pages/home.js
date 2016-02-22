var fastn = require('^fastn');

module.exports = function(app, activityModel) {
    var page = activityModel.page,
        term = app.language.get,
        urlBinding = fastn.binding('image.url');

    return fastn('div',{
            class: fastn.binding('loading', function(loading) {
                return ['page', 'home', loading && 'loading'];
            })
        },
        fastn('div', {
                class: 'actions'
            },
            fastn('button', term('newImage')).on('click', page.refreshSource)
        ),
        fastn('div', {
                class: 'imageContainer'
            },
            fastn('svgIcon', {
                name: 'spinner'
            }),
            fastn('img', {
                src: urlBinding
            })
            .on('load', page.imageLoaded),
            fastn('div', {
                    class: 'info'
                },
                fastn('a', {
                    href: urlBinding,
                    target: '_blank'
                }, urlBinding)
            )
        )
    ).attach(page);
};
