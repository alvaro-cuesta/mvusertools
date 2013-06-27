/*
 * Links importantes en el footer.
 */

(function($, UserTools) {
    UserTools.options.setDefault('linksfooter', true);
    UserTools.options.setDefault('linksfooteroscuro', false);

    UserTools.options.$('linksfooter', function () {
	var $linkFooter = $('#nav_bar #userinfo')
	    .clone()
	    .removeAttr('id')
	    .addClass('ut-linksfooter');

	// Vista de foro
        if ($('a.boton[href^="/foro/post.php?f"]').length > 0) {
	    $linkFooter
		.insertAfter('div.tfooter')
		.prepend('<li><a href="/foro/">Foros</a></li><li><a href="/foro/spy">Spy</a></li><li> |</li>');
	    $('#modpanel').css('margin-top', '55px');
        }
	// Live
	else if ($('.live_link a[href^="/foro/live.php?tid="]').length > 0) {
	    $linkFooter
		.insertAfter('form#postform[action="/foro/post_action.php"]')
		.prepend('<li><a href="/foro/spy">Spy</a></li><li> |</li>');
	    $('.tpanel.live_link:eq(1)').css('margin-top', '55px');
        }
	// Hilo normal
	else {
	    $linkFooter
		.insertAfter('form#postform[action="/foro/post_action.php"]')
		.prepend('<li><a href="/foro/spy">Spy</a></li><li> |</li>');
	    $('.tpanel #mmform').closest('div').css('margin-top', '55px');
        }

	$('.ut-linksfooter a').removeAttr('id');

        var show_dark = UserTools.isDark || UserTools.options.get('linksfooteroscuro');

	$('.ut-linksfooter').addClass(
	    show_dark ? 'ut-linksfooter-negro' : 'ut-linksfooter-blanco');
    });
})(jQuery, window.UserTools);
