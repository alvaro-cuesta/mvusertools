/*
 * Marcápaginas en los posts a los que entras directamente (URLs acabas en #xx...)
 */

(function ($, UT) {
    UT.options.setDefault('marcapaginas', true);

    UT.options.$('marcapaginas', function () {
	$('div.mark').css({
	    'background-image': 'url("http://www.mvusertools.com/ext/img/marcapaginas2.png")',
	    'background-repeat': 'no-repeat',
	    'background-position': '100px top'
	});
    });
})(jQuery, window.UserTools);
