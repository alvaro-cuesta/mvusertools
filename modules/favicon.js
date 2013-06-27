(function ($, UserTools, Tinycon) {

    UserTools.options.setDefault('favicon', true);

    // Avisos en el favicon
    if (UserTools.options.get('favicon')) {

	$(function () {

	    var utnoti = $('#userinfo a[href^="/foro/favoritos"] strong.bubble').html();
	    var utavisos = $('#userinfo a[href^="/notificaciones"] strong.bubble').html();
	    var utmsj = $('#userinfo a[href^="/mensajes"] strong.bubble').html();

            if (utnoti === undefined) {
		var utnoti_int = parseInt(0, 10);
            } else {
		var utnoti_int = parseInt($('#userinfo a[href^="/foro/favoritos"] strong.bubble').html(), 10);
            }
            if (utavisos === undefined) {
		var utavisos_int = parseInt(0, 10);
            } else {
		var utavisos_int = parseInt($('#userinfo a[href^="/notificaciones"] strong.bubble').html(), 10);
            }
            if (utmsj === undefined) {
		var utmsj_int = parseInt(0, 10);
            } else {
		var utmsj_int = parseInt($('#userinfo a[href^="/mensajes"] strong.bubble').html(), 10);
            }

            var utavisostotal = utnoti_int + utmsj_int + utavisos_int;
            $('body').addClass(utavisostotal.toString());
            Tinycon.setBubble(utavisostotal);
            Tinycon.setOptions({
		fallback: true
            });

	});

    }

})(jQuery, window.UserTools, Tinycon);
