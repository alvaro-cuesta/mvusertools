/*
 * Cambios de nombres en foros y usuarios + cambio de CTs.
 */

(function($, UT) {

    UT.options.setDefault('CambiosNombre', true);

    var NICKS = {
	'Alien_crrpt': {nick: 'Alien_derp'},
	'Achotiodeque': {nick: 'Achotoditeque'},
	'Masme': {nick: 'Madme'},
	'MavenBack': {nick: 'Madven'},
	'Ekisu': {
	    nick: 'X-Crim',
	    ct: 'Mod de Mario Kart'
	},
	'Txentx0': {nick: 'Txentxo'},
	'Link34': {nick: 'Link-pyon'},
	'GaTToO': {ct: 'Me punishean :_('}
    }

    var FOROS = {
	'Juegos móvil': 'Shitphones'
    };

    UT.options.$('CambiosNombre', function () {
	// Usuarios
	// TODO: Mejorable
	var cambiar_usuario = function (original, info) {
	    var falso = info.nick;
	    var ct = info.ct;

	    $('div.post div[class="autor"]:contains("' + original + '")').each(function () {
		if (typeof falso !== "undefined") {
		    $(this).children().children('dt').children('a').text(falso);
		}

		if (typeof ct !== "undefined") {
		    $(this).children().children('dd:first').text('' + ct + '');
		}
	    });

	    if (typeof falso !== "undefined") {
		$(document).on('mouseover', 'body', function () {
		    $('div.lastpost cite a:contains("' + original + '")').text(falso);
		});

		$('tr div.left a[href^="/id/"]:contains("' + original + '")').each(function () {
		    $(this).text(falso);
		});
	    }
	};

	var nick;
	for (nick in NICKS) {
	    cambiar_usuario(nick, NICKS[nick]);
	}

	//Foros
	var cambiar_foro = function (original, falso) {
	    $('div.fpanels div.fpanel div.info span.sub a:contains("' + original + '")').text(falso);
	    $('#topnav h1:contains("' + original + '")').text(falso);
	    $('#topnav a:contains("' + original + '")').text(falso);
	    $('#footnav a:contains("' + original + '")').text(falso);
	    $('div.fpanels div.fpanel div.info strong a:contains("' + original + '")').text(falso);
	};

	var nombre;
	for (nombre in FOROS) {
	    cambiar_foro(nombre, FOROS[nombre]);
	}
    });

})(jQuery, window.UserTools);
