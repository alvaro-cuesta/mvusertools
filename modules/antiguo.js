/*
 * Links de favs/avisos/mensajes al estilo antiguo.
 */

(function ($, UT) {
    UT.options.setDefault('antiguoslinksuserinfo', false);

    UT.options.$('antiguoslinksuserinfo', function () {
        var $notify = $('#nav_bar a#notifylink');
        var $favs = $('#nav_bar a#favslink');
        var $mps = $('#nav_bar a#mplink');

        var $new_notify = $notify.closest('li').clone();
        var $new_favs = $favs.closest('li').clone();
        var $new_mps = $mps.closest('li').clone();

        $notify.closest('li').remove();
        $favs.closest('li').remove();
        $mps.closest('li').remove();

        var $all = $new_notify.add($new_favs).add($new_mps);
        $('#nav_bar a[href^="/id/"]')
            .closest('li')
            .after($all);
    });
})(jQuery, window.UserTools);
