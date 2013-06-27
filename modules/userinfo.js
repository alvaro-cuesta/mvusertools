(function ($, UserTools) {

    UserTools.options.setDefault('userinfo', true);

    // Información del perfil en la lista de users
    if (UserTools.options.get('userinfo')) {

	$(function () {

	    var pendingInfoBox = undefined;
	    var infoBoxX = undefined;
	    var infoBoxY = undefined;

	    function checkUserInfoBox() {
                if (pendingInfoBox !== undefined) {
		    launchUserInfoBox(pendingInfoBox);
                }
	    }

	    function launchUserInfoBox() {
                $.get('http://www.mediavida.com/id/' + pendingInfoBox, function (data) {
		    $('.infoavatar', data).each(function () {
                        if (pendingInfoBox == undefined) return false;
                        $('#ajax_usercard').remove();
                        $('body').append('<div id="ajax_usercard">' + $(this).html() + '</div>');
                        var box = $('#ajax_usercard');
                        if (UserTools.isDark == 0) {
			    box.css('background-Color', 'whitesmoke');
                        } else {
			    box.css('background-color', '#39444B');
                        }
                        box.css('borderRadius', '6px');
                        box.css('padding', '10px 5px 5px 5px');
                        box.css('position', 'absolute');
                        box.css('left', infoBoxX);
                        box.css('top', infoBoxY);
                        box.css('overflow', 'hidden');
                        box.css('boxShadow', '1px 1px 5px rgba(0, 0, 0, 0.25)');
                        box.css('zIndex', '9999');

                        var uavatar = $('.useravatar', box);
                        uavatar.css('float', 'left');
                        uavatar.css('padding', '5px');
                        uavatar.css('marginRight', '5px');

                        var uinfo = $('.userinfo', box);
                        uinfo.css('borderRadius', '6px');
                        uinfo.css('width', '254px');
                        uinfo.css('height', '90px');
                        uinfo.css('backgroundColor', '#F4F6F1');
                        uinfo.css('float', 'left');
                        uinfo.css('padding', '5px');
                        uinfo.css('position', 'relative');
                        uinfo.css('zoom', '1');

		    });
                });
	    }

	    $('.post .autor dt a').hover(function () {
                var offset = $(this).offset();
                var pendingInfoBoxOld = $(this).attr('href');
                pendingInfoBox = pendingInfoBoxOld.match(/id\/(.+)/)[1];
                infoBoxX = offset.left - 10;
                infoBoxY = offset.top + 14;
                setTimeout(checkUserInfoBox, 1000);
	    }, function () {
                pendingInfoBox = undefined;
                $('#ajax_usercard').remove();
	    });

	});
    }

})(jQuery, window.UserTools);
