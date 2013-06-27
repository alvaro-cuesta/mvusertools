(function ($, UserTools) {

    UserTools.options.setDefault('livesdestacados', true);

    // hilos con live destacados (solo funciona con theme normal)
    if (UserTools.options.get('livesdestacados')) {
	$(document).on('mouseover', 'body', function () {
            $('img[alt="live"]').closest('tr').addClass('ut-live');
	});
    }

})(jQuery, window.UserTools);
