/*
 * Permite ocultar filtros en el spy.
 */

(function ($, UserTools) {
    UserTools.options.not$('filtrarOpcion', function() {
	var $nofids = $('#nofids');
	var $utfiltrar = $nofids.siblings('h3');
	var $utfiltrarP = $nofids.closest('.box').siblings('p');

	$utfiltrar
	    .addClass('ut-filtrar')
	    .click(function () {
		$nofids.slideToggle();
		$utfiltrarP.toggle();
		UserTools.options.toggle('filtrarOpcion');
	    });

        $nofids.toggle();
        $utfiltrarP.toggle();
    });
})(jQuery, window.UserTools);
