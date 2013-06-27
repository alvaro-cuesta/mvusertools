/*
 * Funciones generales para spoilers.
 *
 * - Nuevo estilo.
 * - Boton de cerrar el spoiler al final.
 */

(function ($, UserTools) {

    UserTools.options.setDefault('estilospoilers', true);
    UserTools.options.setDefault('cerrarspoilers', false);

    // Estilos para los spoilers
    // TODO: Mejorable?
    UserTools.options.$('estilospoilers', function () {
        $('.spoiler').each(function () {
	    var spoiler_id = $(this).attr('rel');
	    $('#' + spoiler_id)
		.addClass(!UserTools.isDark ? 'spoiler-content' : 'spoiler-content-black');
        });
    });

    // Botón para cerrar spoiler al final del mismo
    // TODO: Mejorable
    UserTools.options.$('cerrarspoilers', function() {
        $('div[id^="cuerpo_"] div[id^="sp_"]').append('<br /><br /><a class="ut-cerrarspoiler-boton" style="cursor: pointer;">Cerrar Spoiler</a>');
        $('.ut-cerrarspoiler-boton').click(function () {
	    var utSpoilerPostId = $(this).closest('div.post').attr('id');
	    var utSpoilerId = $(this).closest('div[id^="sp_"]').attr('id');
	    $(this).closest('div[id^="sp_"]').siblings('a[rel="' + utSpoilerId + '"]').removeClass('less');
	    $(this).closest('div[id^="' + utSpoilerId + '"]').hide();
	    $('#' + utSpoilerPostId).ScrollTo({
                    duration: 0
	    });
        });
    });

})(jQuery, window.UserTools);
