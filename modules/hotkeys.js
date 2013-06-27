/*
 * Atajos de teclado.
 */

(function ($, document, Mousetrap, UserTools) {

    // Constants
    var BASE_URL = 'http://www.mediavida.com';

    var REDIRECCIONES = {
	'ctrl+alt+e': '/foro/favoritos',
	'ctrl+alt+q': '/id/' + UserTools.user,
	'ctrl+alt+w': '/notificaciones',
	'ctrl+alt+r': '/mensajes',
	'ctrl+alt+a': '/foro',
	'ctrl+alt+d': '/foro/spy'
    }

    // Redirecciones genéricas
    for (hotkey in REDIRECCIONES) {
	if (REDIRECCIONES.hasOwnProperty(hotkey)) {
	    Mousetrap.bind(hotkey, function () {
		document.location = BASE_URL + REDIRECCIONES[hotkey];
	    });
	}
    }

    // Previous/next page
    var previousPageLink = jQuery($(".tnext")).attr('href');
    var nextPageLink = jQuery($(".tprev")).attr('href');

    if (typeof previousPageLink !== 'undefined') {
        Mousetrap.bind('ctrl+alt+z', function () {
            document.location = BASE_URL + '/' + previousPageLink;
        });
    }
    if (typeof nextPageLink !== 'undefined') {
        Mousetrap.bind('ctrl+alt+x', function () {
            document.location = BASE_URL + '/' + nextPageLink;
        });
    }

    // Open/close Spoilers
    Mousetrap.bind('ctrl+alt+s', function () {
	var $spoilers= $('div[id^="cuerpo_"] div[id^="sp_"]');

        if ($spoilers.is(':visible')) {  // At least one is visible
            $('div[id^="cuerpo_"] a.spoiler.less').removeClass('less');
            $spoilers.hide();
        } else {
            $('div[id^="cuerpo_"] a.spoiler').addClass('less');
            $spoilers.show();
        }
    });

})(jQuery, window.document, Mousetrap, window.UserTools);
