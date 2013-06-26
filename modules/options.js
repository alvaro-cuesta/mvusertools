(function ($, UserTools) {

    // Constantes
    var ON_COLOR = '#EF5000';
    var OFF_COLOR = '#999999';
    var OSCURO_COLOR = '#222222';

    // Fix old values
    for (key in localStorage) {
	var val = localStorage.getItem(key);

	if (val !== null) {
	    if (val === 'no' || val === 'undefined') {
		localStorage.setItem(key, 'false');
	    } else if (val === 'true') {
		localStorage.setItem(key, 'true');
	    }
	}
    }

    // Opciones por defecto
    UserTools.options.setDefault('linksfooter', true);
    UserTools.options.setDefault('tablamods', true);
    UserTools.options.setDefault('marcapaginas', true);
    UserTools.options.setDefault('iconosportada', true);
    UserTools.options.setDefault('iconosdestacados', true);
    UserTools.options.setDefault('livesdestacados', true);
    UserTools.options.setDefault('newquote', true);
    UserTools.options.setDefault('userinfo', true);
    UserTools.options.setDefault('estilospoilers', true);
    UserTools.options.setDefault('bigscreen', true);
    UserTools.options.setDefault('ordenarposts', true);
    UserTools.options.setDefault('favicon', true);
    UserTools.options.setDefault('forosfavs', true);
    UserTools.options.setDefault('filtrarfavs', true);
    UserTools.options.setDefault('CambiosNombre', true);
    UserTools.options.setDefault('TagsOpcion', true);

    UserTools.options.setDefault('salvarposts', false);
    UserTools.options.setDefault('mensajeupdate', false);
    UserTools.options.setDefault('linksfooteroscuro', false);
    UserTools.options.setDefault('antiguoslinksuserinfo', false);
    UserTools.options.setDefault('cerrarspoilers', false);


    // Movidas gráficas para el menú
    $(function () {

        var optionMarkup = function (opcion) {
	    var $si = $('#ut-' + opcion + '-si');
	    var $no = $('#ut-' + opcion + '-no');

            $si.click(function () {
		UserTools.options.set(opcion, true);
                $si.css('color', ON_COLOR);
                $no.css('color', OFF_COLOR);
            });

            $no.click(function () {
		UserTools.options.set(opcion, false);
                $si.css('color', OFF_COLOR);
                $no.css('color', ON_COLOR);
            });

	    var enabled = UserTools.options.get(opcion);

            $si.css('color', (enabled ? ON_COLOR : OFF_COLOR));
            $no.css('color', (enabled ? OFF_COLOR : ON_COLOR));
        };

        // Cambiar el markup en el menú
        optionMarkup('ordenarposts');
        optionMarkup('bigscreen');
        optionMarkup('estilospoilers');
        optionMarkup('userinfo');
        optionMarkup('newquote');
        optionMarkup('livesdestacados');
        optionMarkup('iconosdestacados');
        optionMarkup('iconosportada');
        optionMarkup('marcapaginas');
        optionMarkup('tablamods');
        optionMarkup('favicon');
        optionMarkup('forosfavs');
        optionMarkup('filtrarfavs');
        optionMarkup('CambiosNombre');
        optionMarkup('TagsOpcion');

        optionMarkup('salvarposts');
        optionMarkup('mensajeupdate');
        optionMarkup('linksfooteroscuro');
        optionMarkup('antiguoslinksuserinfo');
        optionMarkup('cerrarspoilers');

        // Boton de utlinksfooter. Tiene funciones extras, no es posible usar el constructor.
        $('#ut-linksfooter-si').click(function () {
	    UserTools.options.set('linksfooter', true);
            $('#ut-linksfooter-no').css('color', OFF_COLOR);
            $('#ut-linksfooter-si').css('color', ON_COLOR);
            $('#ut-utlinksfooteroscuro').css('color', OSCURO_COLOR);
        });

        $('#ut-linksfooter-no').click(function () {
	    UserTools.options.set('linksfooter', false);
            $('#ut-linksfooter-si').css('color', OFF_COLOR);
            $('#ut-linksfooter-no').css('color', ON_COLOR);
            $('#ut-utlinksfooteroscuro').css('color', OFF_COLOR);
        });

        if (UserTools.options.get('linksfooter')) {
            $('#ut-linksfooter-no').css('color', OFF_COLOR);
            $('#ut-utlinksfooteroscuro').css('color', OSCURO_COLOR);
        } else {
            $('#ut-linksfooter-si').css('color', OFF_COLOR);
            $('#ut-utlinksfooteroscuro').css('color', OFF_COLOR);
        }

    });

})(jQuery, window.UserTools);
