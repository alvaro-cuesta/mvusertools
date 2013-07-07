/*
 * Hilos con live destacados (sólo funciona con theme normal).
 */


(function ($, UT) {
    UT.options.setDefault('livesdestacados', true);

    UT.options.$('livesdestacados', function () {
        $('img[alt="live"]').closest('tr').addClass('ut-live');
    });

})(jQuery, window.UserTools);
