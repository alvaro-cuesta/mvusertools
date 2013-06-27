/*
 * Links de favs/avisos/mensajes al estilo antiguo.
 */

(function ($, UserTools) {
    UserTools.options.setDefault('antiguoslinksuserinfo', false);

    UserTools.options.$('antiguoslinksuserinfo', function () {
        var utnotifylinkdesnudo = $('#nav_bar a#notifylink').closest('li').clone();
        var utfavslinkdesnudo = $('#nav_bar a#favslink').closest('li').clone();
        var utmplinkdesnudo = $('#nav_bar a#mplink').closest('li').clone();

        $('#nav_bar a#notifylink').closest('li').remove();
        $('#nav_bar a#favslink').closest('li').remove();
        $('#nav_bar a#mplink').closest('li').remove();

        var navbarAncla = $('#nav_bar a[href^="/id/"]').closest('li');
        utnotifylinkdesnudo
	    .add(utfavslinkdesnudo)
	    .add(utmplinkdesnudo)
	    .insertAfter(navbarAncla);
    });
})(jQuery, window.UserTools);
