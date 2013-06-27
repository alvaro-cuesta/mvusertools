/*
 * Hilos con live destacados (sólo funciona con theme normal).
 */


(function ($, UserTools) {
    UserTools.options.setDefault('livesdestacados', true);

    UserTools.options.$('livesdestacados', function () {
        $('img[alt="live"]').closest('tr').addClass('ut-live');
    });

})(jQuery, window.UserTools);
