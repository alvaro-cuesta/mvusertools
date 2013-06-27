/*
 * Infomración del perfil en la lista de users.
 */

(function ($, UserTools) {
    var TIMEOUT = 1000;

    UserTools.options.setDefault('userinfo', true);

    UserTools.options.$('userinfo', function () {
	var info_box = function(id, left, top) {
	    var aborted = false;
	    var request;

	    var timeout = setTimeout(function () {
		request = $.get('http://www.mediavida.com/id/' + id, function (data) {
		    $('#ajax_usercard').remove();
		    var $usercard = $('<div id="ajax_usercard">' +
				      $('.infoavatar', data).html() +
				      '</div>');
		    $('body').append($usercard);

		    $usercard.css({
			'background-color': (UserTools.isDark ? 'whitesmoke' : '#39444B'),
			'borderRadius': '6px',
                        'padding': '10px 5px 5px 5px',
                        'position': 'absolute',
                        'left': x,
                        'top': y,
                        'overflow': 'hidden',
                        '$usercardShadow': '1px 1px 5px rgba(0, 0, 0, 0.25)',
                        'zIndex': '9999'
		    });
		    $('.useravatar', $usercard).css({
			'float': 'left',
			'padding': '5px',
			'marginRight': '5px'
		    });
		    $('.userinfo', $usercard).css({
                        'borderRadius': '6px',
                        'width': '254px',
                        'height': '90px',
                        'backgroundColor': '#F4F6F1',
                        'float': 'left',
                        'padding': '5px',
                        'position': 'relative',
                        'zoom': '1'
		    });
		});
	    }, TIMEOUT);

	    return function () {
		if (!aborted) {
		    clearTimeout(timeout);
		    if (typeof request !== 'undefined') {
			request.abort();
		    }
		    $('#ajax_usercard').remove();
		    aborted = true;
		}
	    };
	};

	var abort;
	$('.post .autor dt a').hover(function () {
	    var $this = $(this);
	    var offset = $this.offset();

            abort = info_box(
		$this.attr('href').match(/id\/(.+)/)[1],
		offset.left - 10,
		offset.top + 14
	    );
	}, abort);

    });
})(jQuery, window.UserTools);
