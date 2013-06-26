(function (document, Mousetrap, UserTools) {

    // Constants
    var BASE_URL = 'http://www.mediavida.com';
    var FAVS_URL = '/foro/favoritos';
    var PROFILE_URL = '/id/';
    var NOTIF_URL = '/notificaciones';
    var PM_URL = '/mensajes';
    var FORUM_URL = '/foro';
    var SPY_URL = '/foro/spy';

    // Vars
    var previousPageLink = jQuery($(".tnext")).attr('href');
    var nextPageLink = jQuery($(".tprev")).attr('href');

    // Go previus page
    if (typeof previousPageLink != 'undefined') {
        Mousetrap.bind('ctrl+alt+z', function () {
            document.location = BASE_URL + '/' + previousPageLink;
        });
    }

    // Go next page
    if (typeof nextPageLink != 'undefined') {
        Mousetrap.bind('ctrl+alt+x', function () {
            document.location = BASE_URL + '/' + nextPageLink;
        });
    }

    // Open/close Spoilers
    Mousetrap.bind('ctrl+alt+s', function () {
        if (jQuery('div[id^="cuerpo_"] div[id^="sp_"]').is(':visible')) {
            jQuery('div[id^="cuerpo_"] a.spoiler.less').removeClass('less');
            jQuery('div[id^="cuerpo_"] div[id^="sp_"]').hide();
        } else {
            jQuery('div[id^="cuerpo_"] a.spoiler').toggleClass('less');
            jQuery('div[id^="cuerpo_"] div[id^="sp_"]').toggle();
        }
    });

    // Go favorites
    Mousetrap.bind('ctrl+alt+e', function () {
        document.location = BASE_URL + FAVS_URL;
    });

    // Go to your profile
    Mousetrap.bind('ctrl+alt+q', function () {
        document.location = BASE_URL + PROFILE_URL + UserTools.user;
    });

    // Go to warnings
    Mousetrap.bind('ctrl+alt+w', function () {
        document.location = BASE_URL + NOTIF_URL;
    });

    // Go to private messages
    Mousetrap.bind('ctrl+alt+r', function () {
        document.location = BASE_URL + PM_URL;
    });

    // Go to forums
    Mousetrap.bind('ctrl+alt+a', function () {
        document.location = BASE_URL + FORUM_URL;
    });

    // Go to spy
    Mousetrap.bind('ctrl+alt+d', function () {
        document.location = BASE_URL + SPY_URL;
    });

})(window.document, Mousetrap, window.UserTools);
