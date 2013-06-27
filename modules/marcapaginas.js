/*
 * Marcápaginas en los posts a los que entras directamente (URLs acabas en #xx...)
 */

(function ($, UserTools) {
    UserTools.options.setDefault('marcapaginas', true);

    UserTools.options.$('marcapaginas', function () {
	$('div.mark').attr(
	    'style',
	    'background-image: url("http://www.mvusertools.com/ext/img/marcapaginas2.png") !important; background-repeat: no-repeat !important; background-position: 100px top !important;'
	);
    });
})(jQuery, window.UserTools);
