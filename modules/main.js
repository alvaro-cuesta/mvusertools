// ==UserScript==
// @name           MV-Usertools
// @namespace      MVusertools
// @version        2.0.0beta-k
// @description    Añade controles avanzados a los posts en MV
// @grant          GM_addStyle
// @include        http://www.mediavida.com/*
// @require        http://ajax.googleapiscom/ajax/libs/jquery/1.8.2/jquery.min.js
// @require        http://www.mvusertools.com/ext/libs/tinycon.min.js
// @require        http://www.mvusertools.com/ext/libs/jquery.a-tools-1.5.2.js
// @require        http://www.mvusertools.com/ext/libs/mousetrap.js
// @require        http://www.mvusertools.com/ext/libs/jquery.scrollto.js
// ==/UserScript==

window.JSON = {
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
    version: '2.0.0beta-k',  // ¡Cambiar en otros lados!
    patchNotes: [
	'Cambio de arquitectura (bug alert).',
	'Mejoras de rendimiento.'
    ],
    options: {
	get: function(opcion, defecto) {
	    opcion = 'ut' + opcion;
	    var valor = localStorage.getItem(opcion);

            if (valor !== null && typeof valor !== 'undefined' && valor !== 'undefined') {
		return JSON.decode(valor);
            }

	    return defecto;
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
	},
	toggle: function(opcion) {
            window.UserTools.set(opcion, !window.UserTools.get(opcion));
	},
	$: function(option, callback) {
	    if (window.UserTools.options.get(option)) {
		$(function () {
		    callback();
		})
	    }
        },
	not$: function(option, callback) {
	    if (!window.UserTools.options.get(option)) {
		$(function () {
		    callback();
		})
	    }
	}
    }
};

// Add CSS loading function
if (typeof GM_addStyle !== 'undefined') {
    window.UserTools.css = GM_addStyle;
} else if (typeof PRO_addStyle !== 'undefined') {
    window.UserTools.css = PRO_addStyle;
} else if (typeof addStyle !== 'undefined') {
    window.UserTools.css = addStyle;
} else {
    window.UserTools.css = function () {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node);
	}
    }
}

// Fetch info from the page
(function ($, UT) {
    $(function () {
	UT.user = $('.lu').html();
	UT.isDark = $("link[rel='stylesheet']").filter(function () {
            return this.href.match('\/style\/[0-9]+\/mv_oscuro\.css')
	}).length > 0;
	UT.postitlive = $("div#pi_body div.embedded object").length > 0;
	UT.live = $('div.live_info').length > 0;
    });
})(jQuery, window.UserTools);

// Opciones de features rotas o desaparecidas.
// No comentar, podría destruir el mundo.
window.UserTools.options.setDefault('iconosportada', true);
window.UserTools.options.setDefault('iconosdestacados', true);
window.UserTools.options.setDefault('newquote', true);
window.UserTools.options.setDefault('salvarposts', false);
