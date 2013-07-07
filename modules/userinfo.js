/*
 * Infomración del perfil en la lista de users.
 */

(function ($, UT) {
    var TIMEOUT = 1000;
    var FADE = 400;

    UT.options.setDefault('userinfo', true);

    UT.options.$('userinfo', function () {
	var $usercard = $('<div id="ajax_usercard">').css({
	    'backgroundColor': (UT.isDark ? '#39444B' : 'whitesmoke'),
	    'borderRadius': '6px',
            'padding': '10px 5px 5px 5px',
            'position': 'absolute',
            'overflow': 'hidden',
            'boxShadow': '1px 1px 5px rgba(0, 0, 0, 0.25)',
            'zIndex': '9999'
	}).appendTo($('body'));
	var request = null;
	var timeout = null;

	var info_box = function(id, left, top) {
	    timeout = setTimeout(function () {
		request = $.get('http://www.mediavida.com/id/' + id, function ($data) {
		    $usercard.html($('.infoavatar', $data).html()).css({
			'left': left,
			'top': top
		    });
		    $('.userinfo', $usercard).css({
                        'borderRadius': '6px',
                        'width': '254px',
                        'height': '90px',
                        'backgroundColor': '#F4F6F1',
                        'float': 'left',
                        'padding': '7px 5px 0 5px',
                        'position': 'relative',
                        'zoom': '1'
		    });
		    $('.useravatar', $usercard).css({
			'float': 'left',
			'padding': '5px',
			'marginRight': '5px'
		    }).find('img').load(function() {
			$usercard.fadeIn(FADE);
		    });
		});
	    }, TIMEOUT);
	};

	$('.post .autor dt a').hover(function () {
	    var $this = $(this);
	    var offset = $this.offset();

            info_box(
		$this.attr('href').match(/id\/(.+)/)[1],
		offset.left - 10,
		offset.top + 15
	    );
	}, function () {
	    if (timeout !== null) {
		clearTimeout(timeout);
		timeout = null;
	    }
	    if (request !== null) {
		request.abort();
		request = null;
	    }
	    $usercard.fadeOut(FADE);
	});

    });
})(jQuery, window.UserTools);
