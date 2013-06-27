(function ($, UserTools) {

    UserTools.options.setDefault('bigscreen', true);

    // Modo bigscreen en live con stream
    if (UserTools.options.get('bigscreen')) {

	$(function () {

            if (UserTools.postitlive) {
		$('<div id="bigscreen-mode" class="sprite"></div>').insertAfter('a#showform');
		$('<div style="display: none;" id="bigscreen-mode-off" class="sprite"></div>').insertAfter('a#showform');

		$('#bigscreen-mode').click(function () {
                    $('div.tinycol').addClass('bigscreen');
                    $('div.postit').addClass('bigscreen');
                    $('div#pi_body').addClass('bigscreen');
                    $('div#pi_body div.embedded').addClass('bigscreen');
                    $('div#pi_body div.embedded object').attr({
			width: '930',
			height: '550'
                    });
                    $('div#pi_body div.embedded object embed').attr({
			width: '930',
			height: '550'
                    });
                    $('#bigscreen-mode').hide();
                    $('#bigscreen-mode-off').show();
		});
		$('#bigscreen-mode-off').click(function () {
                    $('div.tinycol').removeClass('bigscreen');
                    $('div.postit').removeClass('bigscreen');
                    $('div#pi_body').removeClass('bigscreen');
                    $('div#pi_body div.embedded').removeClass('bigscreen');
                    $('div#pi_body div.embedded object').attr({
			width: '560',
			height: '315'
                    });
                    $('div#pi_body div.embedded object embed').attr({
			width: '560',
			height: '315'
                    });
                    $('#bigscreen-mode').show();
                    $('#bigscreen-mode-off').hide();
		});
            }

	});

    }

})(jQuery, window.UserTools);
