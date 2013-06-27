(function ($, UserTools) {

    // Ocultar filtros en spy
    $(function () {
	var $utfiltrar = $('#nofids').siblings('h3');
	var $utfiltrarP = $('#nofids').closest('.box').siblings('p');

	$utfiltrar.addClass('ut-filtrar');

	$($utfiltrar).click(function () {
            $('#nofids').slideToggle();
            $utfiltrarP.toggle();

            if (UserTools.options.get('filtrarOpcion')) {
		UserTools.options.set('filtrarOpcion', false);
            } else {
		UserTools.options.set('filtrarOpcion', true);
            }
	});

	if (!UserTools.options.get('filtrarOpcion')) {
            $('#nofids').toggle();
            $utfiltrarP.toggle();
	}

    });

})(jQuery, window.UserTools);
