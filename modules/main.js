// ==UserScript==
// @name           MV-Usertools
// @namespace      MVusertools
// @version        2.0.0beta-k
// @description    Añade controles avanzados a los posts en MV
// @grant          GM_addStyle
// @include        http://www.mediavida.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require        http://www.mvusertools.com/ext/libs/tinycon.min.js
// @require        http://www.mvusertools.com/ext/libs/jquery.a-tools-1.5.2.js
// @require        http://www.mvusertools.com/ext/libs/mousetrap.js
// @require        http://www.mvusertools.com/ext/libs/jquery.scrollto.js
// ==/UserScript==

JSON = {
    encode: JSON.encode || JSON.stringify,
    decode: JSON.decode || JSON.parse
};

// Fix old option values
var key;
for (key in localStorage) {
    var val = localStorage.getItem(key);

    if (val !== null) {
	if (val === 'no' || val === 'undefined') {
	    localStorage.setItem(key, 'false');
	} else if (val === 'true' || val === 'on') {
	    localStorage.setItem(key, 'true');
	}
    }
}

window.UserTools = {
    version: '2.0.0beta-k',  // ¡Cambiar en otro lados!
    options: {
	get: function(opcion, defecto) {
	    opcion = 'ut' + opcion;
	    var valor = localStorage.getItem(opcion);

            if (valor !== null && typeof valor !== 'undefined' && valor !== 'undefined') {
		return JSON.decode(valor);
            } else if (defecto !== null && typeof defecto !== 'undefined') {
		defecto = JSON.encode(defecto);
		localStorage.setItem(opcion, defecto);
		return defecto;
            }
	},
	set: function(opcion, valor) {
	    opcion = 'ut' + opcion;
            localStorage.setItem(opcion, JSON.encode(valor));
	},
	setDefault: function(opcion, defecto) {
	    opcion = 'ut' + opcion;

            if (localStorage.getItem(opcion) === null) {
		localStorage.setItem(opcion, JSON.encode(defecto));
            }
	}
    }
};

(function ($, UserTools) {
    $(function () {
	UserTools.user = $('.lu').html();
	UserTools.isDark = $("link[rel='stylesheet']").filter(function () {
            return this.href.match('\/style\/[0-9]+\/mv_oscuro\.css')
	}).length > 0;
	UserTools.postitlive = $("div#pi_body div.embedded object").length > 0;
	UserTools.live = $('div.live_info').length > 0;
    });
})(jQuery, window.UserTools);

// Opciones de features rotas o desaparecidas.
// No comentar, podría destruir el mundo.
window.UserTools.options.setDefault('iconosportada', true);
window.UserTools.options.setDefault('iconosdestacados', true);
window.UserTools.options.setDefault('newquote', true);
window.UserTools.options.setDefault('salvarposts', false);


// Nuevo estilo para los QUOTES
// jQuery(function() {
// if (UserTools.options.get('newquote')) {
// jQuery(function() {
// if (UserTools.isDark == 0) {
// jQuery('div.msg div.body').addClass('newquote');
// }
// else {
// jQuery('div.msg div.body').addClass('newquoteblack');
// }
// });
// }
// });

// > Greentext (no funciona, hace que dejen de ir los popups de las imagenes y los el hover de los quotes)
// > Implicando que no mola
//version original
// jQuery('div[id^="cuerpo_"]').html(
// function (i,h) {
// return h.replace(/^\s*&gt.*/mg, function(a) {
// if (UserTools.isDark) {
// return "<span style='color: #A7BD68;'>" + a + "</span>"
// } else {
// return "<span style='color: #789922;'>" + a + "</span>"
// }
// });
// });
//nueva prueba
// jQuery(document).on('click','body', function(){
// jQuery('div[id^="cuerpo_"]').html(
// function (i,h) {
// return h.replace(/^\s*&gt.*/mg, function(a) {
// if (UserTools.isDark) {
// return "<span style='color: #A7BD68;'>" + a + "</span>"
// } else {
// return "<span style='color: #789922;'>" + a + "</span>"
// }
// });
// });
// });

// Salvar forms .remove()
/* @require        http://www.mvusertools.com/ext/libs/sisyphus.js */
/*jQuery(function () {
    var utavisopostguardado = '<div style="display: none;float: left; margin-top: 28px; opacity: 0.3;">Texto guardado...</div>';
    if (UserTools.options.get('salvarposts') && !UserTools.live) {
        jQuery('form#postear').sisyphus({
            customKeyPrefix: 'utextendido',
            name: 'postear',
            timeout: 15,
            autoRelease: true,
            onSave: function () {
                jQuery(utavisopostguardado).insertAfter('form#postear div[style="width: 410px"]').fadeIn('slow', function () {
                    jQuery(this).delay(2000).fadeOut('slow', function () {
                        jQuery(this).delay(1000).remove();
                    });
                });
            },
        });
    }
});
*/
