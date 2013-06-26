(function($, UserTools) {

    // Links importantes en el footer
    $(function () {
	if (UserTools.options.get('linksfooter')) {
            if ($('a.boton[href^="/foro/post.php?f"]').length > 0) { // Vista de foro
		$('#nav_bar #userinfo').clone().removeAttr('id').addClass('ut-linksfooter').insertAfter('div.tfooter').prepend('<li><a href="/foro/">Foros</a></li><li><a href="/foro/spy">Spy</a></li><li> |</li>');
		$('#modpanel').css('margin-top', '55px');
		$('.ut-linksfooter a').removeAttr('id');
            } else if ($('.live_link a[href^="/foro/live.php?tid="]').length > 0) { // Live
		$('#nav_bar #userinfo').clone().removeAttr('id').addClass('ut-linksfooter').insertAfter('form#postform[action="/foro/post_action.php"]').prepend('<li><a href="/foro/spy">Spy</a></li><li> |</li>');
		$('.tpanel.live_link:eq(1)').css('margin-top', '55px');
		$('.ut-linksfooter a').removeAttr('id');
            } else { // Hilo normal
		$('#nav_bar #userinfo').clone().removeAttr('id').addClass('ut-linksfooter').insertAfter('form#postform[action="/foro/post_action.php"]').prepend('<li><a href="/foro/spy">Spy</a></li><li> |</li>');
		$('.tpanel #mmform').closest('div').css('margin-top', '55px');
		$('.ut-linksfooter a').removeAttr('id');

            }
            if (UserTools.isDark || UserTools.options.get('linksfooteroscuro')) {
		$('.ut-linksfooter').addClass('ut-linksfooter-negro');
            } else {
		$('.ut-linksfooter').addClass('ut-linksfooter-blanco');
            }
	}
    });

})(jQuery, window.UserTools);
