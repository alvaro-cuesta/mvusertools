/*
 *  Muestra los avisos (favs, avisos, mensajes) en el favicon de la web.
 */

(function ($, UT, Tinycon) {

    UT.options.setDefault('favicon', true);

    UT.options.$('favicon', function () {
	var favs = $('#userinfo a[href^="/foro/favoritos"] strong.bubble').html();
	var avisos = $('#userinfo a[href^="/notificaciones"] strong.bubble').html();
	var mensajes = $('#userinfo a[href^="/mensajes"] strong.bubble').html();

	var total = 0;

        if (typeof favs !== 'undefined') {
	    total += parseInt(favs, 10);
        }
        if (typeof avisos !== 'undefined') {
	    total += parseInt(avisos, 10);
        }
        if (typeof mensajes !== 'undefined') {
	    total += parseInt(mensajes, 10);
        }

        Tinycon.setBubble(total.toString());
        Tinycon.setOptions({ fallback: true });

    });

})(jQuery, window.UserTools, Tinycon);
