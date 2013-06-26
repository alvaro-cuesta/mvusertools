(function ($) {

    if (UserTools.options.get('marcapaginas')) {
	$(function () {
            $('div.mark').attr(
		'style',
		'background-image: url("http://www.mvusertools.com/ext/img/marcapaginas2.png") !important; background-repeat: no-repeat !important; background-position: 100px top !important;'
	    );
	});
    }

})(jQuery, UserTools);
