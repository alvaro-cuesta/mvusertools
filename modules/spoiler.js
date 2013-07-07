/*
 * Funciones generales para spoilers.
 *
 * - Nuevo estilo.
 * - Boton de cerrar el spoiler al final.
 */

(function ($, UT) {

    var CLOSE_SPOILER = '<br /> <br /> <a class="ut-cerrarspoiler-boton" style="cursor: pointer;">Cerrar Spoiler</a>';

    UT.options.setDefault('estilospoilers', true);
    UT.options.setDefault('cerrarspoilers', false);

    // Estilos para los spoilers
    UT.options.$('estilospoilers', function () {
        $('.spoiler').each(function () {
	    $('#' + $(this).attr('rel'))
		.addClass(!UT.isDark ? 'spoiler-content' : 'spoiler-content-black');
        });
    });

    // Botón para cerrar spoiler al final del mismo
    // TODO: Mejorable?
    //       Scroll al spoiler, no al post
    UT.options.$('cerrarspoilers', function() {
        $('div[id^="cuerpo_"] div[id^="sp_"]').append(CLOSE_SPOILER);
        $('.ut-cerrarspoiler-boton').click(function () {
	    var $this = $(this);
	    var utSpoilerPostId = $this.closest('div.post').attr('id');
	    var utSpoilerId = $this.closest('div[id^="sp_"]').attr('id');
	    $this
		.closest('div[id^="sp_"]')
		.siblings('a[rel="' + utSpoilerId + '"]')
		.removeClass('less');
	    $this
		.closest('div[id^="' + utSpoilerId + '"]')
		.hide();
	    $('#' + utSpoilerPostId).ScrollTo({
                    duration: 0
	    });
        });
    });

})(jQuery, window.UserTools);
