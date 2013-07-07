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
        if (val === "no" || val === "undefined") {
            localStorage.setItem(key, "false");
        } else if (val === "true" || val === "on") {
            localStorage.setItem(key, "true");
        }
    }
}

window.UserTools = {
    version: "2.0.0beta-k",
    // ¡Cambiar en otros lados!
    patchNotes: [ "Cambio de arquitectura (bug alert).", "Mejoras de rendimiento." ],
    options: {
        get: function(opcion, defecto) {
            opcion = "ut" + opcion;
            var valor = localStorage.getItem(opcion);
            if (valor !== null && typeof valor !== "undefined" && valor !== "undefined") {
                return JSON.decode(valor);
            }
            return defecto;
        },
        set: function(opcion, valor) {
            opcion = "ut" + opcion;
            localStorage.setItem(opcion, JSON.encode(valor));
        },
        setDefault: function(opcion, defecto) {
            opcion = "ut" + opcion;
            if (localStorage.getItem(opcion) === null) {
                localStorage.setItem(opcion, JSON.encode(defecto));
            }
        },
        toggle: function(opcion) {
            window.UserTools.set(opcion, !window.UserTools.get(opcion));
        },
        $: function(option, callback) {
            if (window.UserTools.options.get(option)) {
                $(function() {
                    callback();
                });
            }
        },
        not$: function(option, callback) {
            if (!window.UserTools.options.get(option)) {
                $(function() {
                    callback();
                });
            }
        }
    }
};

// Add CSS loading function
if (typeof GM_addStyle !== "undefined") {
    window.UserTools.css = GM_addStyle;
} else if (typeof PRO_addStyle !== "undefined") {
    window.UserTools.css = PRO_addStyle;
} else if (typeof addStyle !== "undefined") {
    window.UserTools.css = addStyle;
} else {
    window.UserTools.css = function() {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node);
        }
    };
}

// Fetch info from the page
(function($, UT) {
    $(function() {
        UT.user = $(".lu").html();
        UT.isDark = $("link[rel='stylesheet']").filter(function() {
            return this.href.match("/style/[0-9]+/mv_oscuro.css");
        }).length > 0;
        UT.postitlive = $("div#pi_body div.embedded object").length > 0;
        UT.live = $("div.live_info").length > 0;
    });
})(jQuery, window.UserTools);

// Opciones de features rotas o desaparecidas.
// No comentar, podría destruir el mundo.
window.UserTools.options.setDefault("iconosportada", true);

window.UserTools.options.setDefault("iconosdestacados", true);

window.UserTools.options.setDefault("newquote", true);

window.UserTools.options.setDefault("salvarposts", false);

(function() {
    //Inject CSS in header
    var css = ".sprite {background: url(http://www.mvusertools.com/ext/img/sprites18-3.png) no-repeat;}.usertools TABLE TD{padding: 3px;}.usertools A{}.ut-firma{background-position: 0 -58px;text-indent: -9999px;width: 14px;height: 11px;display: block;outline: 0;margin-top: 1px;}.ut-firma:hover{background-position: 0 -69px;}.mensaje{background-position: -20px -58px;text-indent: -9999px;width: 14px;height: 10px;outline: 0;display: block;margin-top: 1px;}.mensaje:hover{background-position: -20px -68px;}.blacklist-off{background-position: -39px -57px;text-indent: -9999px;width: 12px;height: 12px;outline: 0;display: block;margin-top: 1px;}.blacklist-off:hover{background-position: -39px -69px;}.blacklist-on{background-position: -39px -69px;text-indent: -9999px;width: 12px;height: 12px;outline: 0;display: block;margin-top: 1px;}.blacklist-on:hover{background-position: -39px -57px;}.blacklist{}.ut-online{background-position: -56px -72px;text-indent: -99999px;width: 8px;height: 12px;display: block;outline: 0;}.ut-offline{background-position: -56px -58px;text-indent: -99999px;width: 8px;height: 12px;display: block;outline: 0;}.online-pos{float: left;width: 14px;z-index: 999;}.mensaje-pos{float: left;width: 19px;}.blacklist-pos{float: right;margin-top: -1px;width: 15px;}.firma-pos{float: left;width: 19px;}.mensaje-ocultado{font-weight: bold;}.toggle-on{background-position: -37px -21px;width: 34px;height: 34px;cursor: pointer;}.toggle-off{background-position: 0 -21px;width: 34px;height: 34px;cursor: pointer;}.tapavatares{width: 0px; height: 0px; position:relative;}.tapavatares span {position: abosolute; background: url(http://www.mvusertools.com/ext/img/blacklisted.png) no-repeat;background-position: 0 4px;width: 80px; height: 84px; top: 6px; left: 0px;display: block;}.blacklisted-post{border-radius: 7px;ms-border-radius: 7px;-moz-border-radius: 7px;-webkit-border-radius: 7px;-khtml-border-radius: 7px;padding: 3px 10px 2px 10px;background: #ccc;color: #626262 !important;}.usertools{position: relative;width: 67px;margin-top: 10px;}button::-moz-focus-inner {border: 0;padding: 0;margin:0;}.mbuttons button[type], button.alt[type] {padding:2px 4px !important;}.mbuttons a:hover,button.alt:hover {background-color:#aaaaaa;border:1px solid #c2e1ef;color:#ffffff;}button.alt {border-color: #aaa !important;min-width: 20px;border-radius: 5px !important;}button.bleft {border-radius: 5px 0px 0px 5px !important;margin-right: 0px !important;border-right-width: 0px !important;font-weight: normal !important;}button.bcenter {margin-right: 0px !important;border-left-width: 1px !important;border-left-color: #aaa !important;font-weight: normal !important;border-radius: 0px !important;}button.bcenter2 {margin-right: 0px !important;border-left-width: 0px !important;border-left-color: #aaa !important;font-weight: normal !important;border-radius: 0px !important;}button.bright {border-radius: 0px 5px 5px 0px !important;margin-left: 0px !important;border-left-width: 0px !important;font-weight: normal !important;}button.bright2 {border-radius: 0px 5px 5px 0px !important;font-weight: normal !important;}button.bsolo {border-radius: 5px !important;font-weight: normal !important;}button.bb {font-weight: bold !important;}button.bi {font-style: italic !important;}button.bu {text-decoration: underline !important;}button.bs {text-decoration: line-through !important;}.baudio {background-position: -0px 3px;width: 11px; height: 17px; display: block; }.bimg {background-position: -25px 3px;width: 12px; height: 17px; display: block; margin-left: 1px; }.bvideo {background-position: -12px 3px;width: 12px; height: 17px; display: block; }.bcentericon {background-position: -37px 3px;width: 14px; height: 17px; display: block; }.blist {background-position: -51px 3px;width: 14px; height: 17px; display: block; }.ut-live td {background-color: #FFEEEE;}.ut-live td.alt {background-color: #EFE0E0;}#modlist {margin: 20px 0 0;padding: 10px 10px;border-radius: 6px 6px 6px 6px;}.modlistblanco {border: 1px solid #D4D4D2;}.modlistnegro {border: 1px solid #273037;background-color: #39444B;}#modlist H3{margin-top: 0px !important;}#modlist A{padding: 3px 0 3px 3px;display: block;}.modlistblanco A:nth-child(odd){background: #E8EBE3;}.modlistblanco A:hover{background: #D6D8D2;}.modlistblanco span{color: #555555;}.modlistnegro A:nth-child(odd){background: #435058;}.modlistnegro A:hover{background: #273037;}.modlistnegro span{color: #C5D1EC;}.config {background-position: -78px -29px;width: 14px;height: 14px;display: inline-block;margin: 0 3px;position: relative;}.utmenubutton{padding-left: 15px;}#ut-mask {background: #ffffff; width: 100%; height: 100%; position: fixed; opacity: 0.9; z-index: 9998;}#ut-mask-menu {background: #000000; width: 100%; height: 100%; position: fixed; opacity: 0.9; z-index: 9998;}#ut-dialog {width: 500px; top: 10px; left: 50%; margin-left: -250px; position: absolute; z-index: 9999;}#ut-dialog-menu {width: 500px; top: 50px; left: 50%; margin-left: -250px; position: absolute; z-index: 9999;}.ut-boton-sino{cursor: pointer;color: #EF5000;}#ut-window {background: #ffffff; border-radius: 6px; padding: 10px 10px 30px 10px; border: 1px solid #cccccc;}#ut-menu-contenido {background: #fff;min-height: 270px;}#ut-menu-contenido TABLE{border-top: 1px solid #ccc;}.newquote a.toggled, .newquoteblack a.toggled{border-style: solid !important;border-width: 1px !important;margin: 0 !important;padding: 0 3px !important;}.newquote a.toggled {border-color: #CCCCCC #CCCCCC #CCCCCC !important;}.newquoteblack a.toggled{border-color: #CCCCCC #CCCCCC #CCCCCC !important;}.newquote div.quote, .newquoteblack div.quote{border: 1px solid #CCCCCC !important;margin: 0 0 8px !important;border-radius: 0 6px 6px 6px !important;}.tinycol.bigscreen{margin-top: 800px;}.postit.bigscreen{width: 958px;padding-left: 0px;}#pi_body.bigscreen{width: 938px;}.embedded.bigscreen{;}#bigscreen-mode{background-position: -99px -28px;width: 41px;height: 23px;float: right;margin: 5px 0 5px 10px;cursor: pointer;}#bigscreen-mode:hover{background-position: -142px -28px;}#bigscreen-mode-off{background-position: -99px 0;width: 41px;height: 23px;float: right;margin: 5px 0px 5px 10px;cursor: pointer;}#bigscreen-mode-off:hover{background-position: -141px 0;}.post .spoiler-content {background-color: #F0F2ED;padding: 5px;border-bottom: 1px solid #d7d9d4;}.post.odd .spoiler-content {background-color: #E7E9E4;}.post .spoiler-content-black {background-color: #435058;padding: 5px;border-bottom: 1px solid #252C31;}.post.odd .spoiler-content-black {background-color: #39444B;}#ut-menu-tabs div{margin: 0 10px 0 0;padding: 3px 4px;background: #eee;display: inline-block;cursor: pointer;border-top: 1px solid #CCCCCC;border-right: 1px solid #CCCCCC;border-left: 1px solid #CCCCCC;color: #999;font-size: 13px;}#ut-menu-tabs div.active{background: #444;color: #eee;border-top: 1px solid #CCCCCC;border-right: 1px solid #CCCCCC;border-left: 1px solid #CCCCCC;}#ut-menu-tabs div.active:hover{background: #444;color: #eee;border-top: 1px solid #CCCCCC;border-right: 1px solid #CCCCCC;border-left: 1px solid #CCCCCC;}#ut-menu-tabs div:hover{background: #ddd;color: #222;}#ut-menu-contenido .ut-opciones td:nth-child(2n+1){width: 420px;}.ut-arrow-up{background-position: -75px -53px;width: 12px;height: 17px;display: block; }.ut-arrow-down{background-position: -75px -70px;width: 12px;height: 17px;display: block; }#ut-boton-plus{background-color: #888888 !important;}#ut-boton-plus:hover {background-color: #777777 !important;}.ut-titleymacro{padding: 0 0 2px 3px;border-left: 2px solid #FF5500;margin: 10px 0;}.ut-titletxt{font-weight: bold;cursor: default;}.ut-macrotxt {color: #222222;text-overflow: ellipsis;-o-text-overflow: ellipsis;text-overflow: ellipsis;overflow:hidden;white-space:nowrap;width: 460px;}.ut-macrotxt:hover {white-space:pre-wrap;}.icon-down-list{background-position: -97px -59px;width: 12px;height: 9px;display: inline-block;vertical-align: middle;}.UT-trash{background-position: -97px -72px;width: 11px;height: 14px;display: inline-block;vertical-align: middle;}.UT-trash-orange{background-position: -114px -72px; width: 11px;height: 14px;display: inline-block;}#ut-button-macros-list{position: absolute;top: 132px;left: 154px;width: 125px;border-radius: 0px 0px 5px 5px;background-color: #565656;border: 1px solid #AAAAAA;color: #eee;}#ut-button-macros-list li{display: block;cursor: pointer;border-bottom: 1px solid #888888;padding: 1px 1px 1px 3px;}#ut-button-macros-list li:hover{background-color: #aaaaaa;}.ut-button-macros-list-barrendera{top: 68px !important;left: 290px !important;}#ut-button-macros-list-anadir {padding: 1px 1px 2px 3px;cursor: pointer;display: block;color: #ccc;background-color: #333;border-radius: 0 0 5px 5px;}#ut-button-macros-list-anadir:hover {color: #fff;background-color: #ff7700;}#ut-macro {overflow: auto;width: 98%;margin-top: 5px;}#ut-foros-fav LI{margin: 0 0 5px;transition: all 0.5s;-moz-transition: all 0.5s;-ms-transition: all 0.5s;-webkit-transition: all 0.5s;-o-transition: all 0.5s;}#ut-foros-fav LI:hover{}#ut-foros-fav LI A{background: #ccc;border-radius: 3px 3px 3px 3px;border: 1px solid #EEEEEE;vertical-align: middle;padding: 3px 4px;display: inline-block;transition: all 0.5s;-moz-transition: all 0.5s;-ms-transition: all 0.5s;-webkit-transition: all 0.5s;-o-transition: all 0.5s;}#ut-foros-fav LI A:hover{background: #999;}#foros-fav-float{position: absolute;top: 200px;margin-left: 1005px;opacity: 0.2;margin-top: 10px;transition: opacity 0.5s;-moz-transition: opacity 0.5s;-ms-transition: opacity 0.5s;-webkit-transition: opacity 0.5s;-o-transition: opacity 0.5s;}#foros-fav-float:hover {opacity: 1;}.foros-fav-float-sticky{top: 0px !important;position: fixed !important;}.ut-foros-fav-borrar{display: inline-block;margin: 0 0 0 10px;vertical-align: middle;opacity: 0.04;transition: all 0.5s;-moz-transition: all 0.5s;-ms-transition: all 0.5s;-webkit-transition: all 0.5s;-o-transition: all 0.5s;cursor: pointer;}.ut-foros-fav-borrar:hover{opacity: 1;}.ut-foros-fav-borrar:hover{opacity: 1;}.ut-foro-fav-add {background: url('http://www.mvusertools.com/ext/img/star.png') no-repeat scroll center -30px #FF9300;height: 38px;margin: 40px 0 0 -8px;width: 40px;transition: margin 0.5s;-moz-transition: margin 0.5s;-ms-transition: margin 0.5s;-webkit-transition: margin 0.5s;-o-transition: margin 0.5s;cursor: pointer;}.ut-foro-fav-added {background: url('http://www.mvusertools.com/ext/img/star.png') no-repeat scroll center 8px #FF9300;}.ut-foro-fav-add-moveup{margin: 3px 0 0 -8px;}.ut-filtrar {cursor: pointer;}.ut-opacity {opacity: 0.2;}#ut-filtros-fav{}#utFavQuitar{cursor: pointer;margin: 5px 0 20px 0;width: 80px;opacity: 0.7;}#utFavAviso{cursor: pointer;margin: 5px 0 20px 0;font-size: 9px;opacity: 0.5;}#utFavAviso:hover{opacity: 1;}#utFavAvisoTxt{border: 1px solid #ccc;border-radius: 6px;padding: 5px;margin: -15px 0 20px 0;display: none;font-size: 9px;}#ut-filtros-fav .foroicon{display: inline-block;padding: 0 4px 4px;}#ut-filtros-tags .cat2{display: inline-block;margin: 0 15px 5px 5px;}#ut-fav-filto-titulo{font-size: 14px;margin: 0 0 9px;font-family: Trebuchet MS,Arial,Verdana,sans-serif;font-weight: bold;}.ut-linksfooter{margin-top: 15px;}.ut-linksfooter-blanco{border: 1px solid #C7C9C3 !important;border-top:1px solid #C7C9C3 !important;border-bottom:1px solid #BABCB6 !important;background: linear-gradient(to top, #E8EBE3, #D6D8D2) !important;background: -webkit-gradient(linear, left top, left bottom, from(#D6D8D2), to(#E8EBE3)) !important;}.ut-linksfooter-blanco A{color: #777 !important;}.ut-linksfooter-blanco A:hover{color: #444 !important;}.ut-linksfooter-blanco a.lu, .ut-linksfooter-blanco a.ln, .ut-linksfooter-blanco a.lf, .ut-linksfooter-blanco a.lm, .ut-linksfooter-blanco li.logout{background-image: url('http://mvusertools.com/ext/img/ut_topbar_icons.gif') !important;}.ut-linksfooter-blanco strong.bubble {background-image: url('http://mvusertools.com/ext/img/bubble.png') !important;text-shadow: 0 0 3px #000000 !important;}.ut_tag{color: #ffffff;position: absolute;margin-top: 28px;padding: 2px 4px;border-radius: 4px;transition: 0.5s;-moz-transition: 0.5s;-ms-transition: 0.5s;-webkit-transition: 0.5s;-o-transition: 0.5s;cursor: pointer;text-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);white-space: nowrap;}.ut_tag:hover{box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);}.ut_tag_vacia:hover{opacity: 1.0 !important;width: 65px !important;height: 15px !important;}.ut_tag_info {position: absolute;background: #cccccc;border: 1px solid #999999;padding: 5px;margin: -129px 0 0 0;font-size: 10px;border-radius: 0 4px 4px 4px;}.ut_tag_info input,.ut_tag_info textarea{font-size: 9px;padding: 1px 1px 3px 1px;}.ut_tag_info input[type=submit]{padding: 0px;float: right;}.ut_tag_info input[type=submit]:hover{background: #3e8baf;color: #fff;}.ut_tag_tag, .ut_tag_link, .ut_tag_color {width: 110px;}.ut_tag_info_cerrar {cursor: pointer;position: absolute;margin: -8px 0 0 110px;color: #cb0000;}.ut_tag_colores div{width: 10px;height: 10px;display: inline-block;vertical-align: bottom;margin: 0 0 1px 1px;}.ut_tag_colores{display: inline;padding: 0 0 0 2px;}.ut_tag_colores_1 {background: #64ADCC;}.ut_tag_colores_2 {background: #51C25B;}.ut_tag_colores_3 {background: #C28051;}.ut_tag_colores_4 {background: #E3222F;}.ut_tag_colores_5 {background: #BC62BF;}.ut_tag_colores_6 {background: #4A4A4A;}";
    if (typeof GM_addStyle !== "undefined") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle !== "undefined") {
        PRO_addStyle(css);
    } else if (typeof addStyle !== "undefined") {
        addStyle(css);
    } else {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node);
        }
    }
})();

/*
 * Atajos de teclado.
 */
(function($, document, Mousetrap, UT) {
    // Constants
    var BASE_URL = "http://www.mediavida.com";
    var REDIRECCIONES = {
        "ctrl+alt+e": "/foro/favoritos",
        "ctrl+alt+w": "/notificaciones",
        "ctrl+alt+r": "/mensajes",
        "ctrl+alt+a": "/foro",
        "ctrl+alt+d": "/foro/spy"
    };
    // Redirecciones genéricas
    var hotkey;
    for (hotkey in REDIRECCIONES) {
        (function(hotkey) {
            Mousetrap.bind(hotkey, function() {
                document.location = BASE_URL + REDIRECCIONES[hotkey];
            });
        })(hotkey);
    }
    $(function() {
        Mousetrap.bind("ctrl+alt+q", function() {
            document.location = BASE_URL + "/id/" + UT.user;
        });
    });
    // Previous/next page
    var previousPageLink = jQuery($(".tnext")).attr("href");
    var nextPageLink = jQuery($(".tprev")).attr("href");
    if (typeof previousPageLink !== "undefined") {
        Mousetrap.bind("ctrl+alt+z", function() {
            document.location = BASE_URL + "/" + previousPageLink;
        });
    }
    if (typeof nextPageLink !== "undefined") {
        Mousetrap.bind("ctrl+alt+x", function() {
            document.location = BASE_URL + "/" + nextPageLink;
        });
    }
    // Open/close Spoilers
    Mousetrap.bind("ctrl+alt+s", function() {
        var $spoilers = $('div[id^="cuerpo_"] div[id^="sp_"]');
        if ($spoilers.is(":visible")) {
            // At least one is visible
            $('div[id^="cuerpo_"] a.spoiler.less').removeClass("less");
            $spoilers.hide();
        } else {
            $('div[id^="cuerpo_"] a.spoiler').addClass("less");
            $spoilers.show();
        }
    });
})(jQuery, window.document, Mousetrap, window.UserTools);

/*
 * Links importantes en el footer.
 */
(function($, UT) {
    UT.options.setDefault("linksfooter", true);
    UT.options.setDefault("linksfooteroscuro", false);
    UT.options.$("linksfooter", function() {
        var $linkFooter = $("#nav_bar #userinfo").clone().removeAttr("id").addClass("ut-linksfooter");
        // Vista de foro
        if ($('a.boton[href^="/foro/post.php?f"]').length > 0) {
            $linkFooter.insertAfter("div.tfooter").prepend('<li><a href="/foro/">Foros</a></li><li><a href="/foro/spy">Spy</a></li><li> |</li>');
            $("#modpanel").css("margin-top", "55px");
        } else if ($('.live_link a[href^="/foro/live.php?tid="]').length > 0) {
            $linkFooter.insertAfter('form#postform[action="/foro/post_action.php"]').prepend('<li><a href="/foro/spy">Spy</a></li><li> |</li>');
            $(".tpanel.live_link:eq(1)").css("margin-top", "55px");
        } else {
            $linkFooter.insertAfter('form#postform[action="/foro/post_action.php"]').prepend('<li><a href="/foro/spy">Spy</a></li><li> |</li>');
            $(".tpanel #mmform").closest("div").css("margin-top", "55px");
        }
        $(".ut-linksfooter a").removeAttr("id");
        var show_dark = UT.isDark || UT.options.get("linksfooteroscuro");
        $(".ut-linksfooter").addClass(show_dark ? "ut-linksfooter-negro" : "ut-linksfooter-blanco");
    });
})(jQuery, window.UserTools);

/*
 * Lista de mods en sidebar.
 */
(function($, UT) {
    UT.options.setDefault("tablamods", true);
    var mods = {
        1: [ "bazoo", "jadgix", "J40", "RaymaN", "TazzMaTazz" ],
        2: [ "Eristoff", "kalinka-" ],
        3: [ "aLeX", "Josekron", "Loa", "MegalomaniaC", "mongui", "Prava" ],
        6: [ "Atoll", "Bloody", "Eristoff", "Kails", "JMBaDBoY", "Prava", "PruDeN", "sacnoth" ],
        7: [ "abichuela", "AG", "alejo", "Ch4iNeR", "cm07", "Korso", "lb_nacho", "Netzach", "VipeR_CS" ],
        9: [ "Kaos", "PiradoIV", "elkaoD" ],
        10: [ "TNx7", "tutitin" ],
        19: [ "Kaneas", "TNx7" ],
        22: [ "Cryoned", "Dream-MV", "esvarianzza" ],
        23: [ "darkavm", "ElKedao", "Privatovic", "ukuki" ],
        26: [ "Midgard", "StumKrav", "thunder_" ],
        31: [ "Eristoff", "ReYzell" ],
        32: [ "Andy", "eisenfaust", "ISAILOVIC", "JMBaDBoY", "loko_man", "ruben132", "Sh1n0d4", "t0rrY" ],
        38: [ "Hir0shz", "Ligia", "ManOwaR", "sPoiLeR" ],
        40: [ "ferk", "HaZuKi", "horvathzeros", "J40" ],
        42: [ "dangerous", "zashael" ],
        52: [ "BigmAK", "MaSqUi", "tutitin", "XaViMeTaL" ],
        82: [ "Cheester", "cuerpi", "darkavm", "sk_sk4t3r", "TNx7", "Txentx0" ],
        83: [ "dangerous", "spyro512" ],
        87: [ "GR33N" ],
        90: [ "Snorky", "spyro512" ],
        96: [ "JMBaDBoY", "Sirius_spa", "suggus", "ZaGo" ],
        97: [ "granaino127", "SaBaNdIjA" ],
        98: [ "granaino127", "SaBaNdIjA" ],
        99: [ "darkavm", "GryF", "Kb", "lb_nacho", "-Power" ],
        102: [ "ElKedao", "darkavm", "dicon", "sk_sk4t3r" ],
        106: [ "Atoll", "ZaGo" ],
        107: [ "DeNz1L", "kaitoo", "NosFeR_" ],
        108: [ "Skelus" ],
        109: [ "darkavm", "Dolz", "Txentx0", "urrako" ],
        110: [ "babri", "dicon", "RoDRa", "Spank" ],
        111: [ "iosp", "Hogwarts", "lb_nacho" ],
        112: [ "zashael" ],
        113: [ "Charly-", "edvan", "frostttt", "Kazuya_", "zashael" ],
        114: [ "0buS", "RaymaN", "sPoiLeR" ],
        115: [ "CsNarsil", "CybeR" ],
        116: [ "eisenfaust" ],
        117: [ "bazoo", "StumKrav", "thunder_" ],
        118: [ "DarkHawX", "Korso", "Netzach", "StumKrav" ],
        119: [ "benitogb", "BigmAK" ],
        121: [ "Andy", "ISAILOVIC", "JMBaDBoY", "loko_man", "ruben132", "Sh1n0d4", "t0rrY" ],
        122: [ "allmy", "naete", "slakk", "StumKrav", "thunder_" ],
        123: [ "gonya707", "TRON" ],
        124: [ "babri", "RoninPiros" ],
        125: [ "Bidroid", "MagicAnnii" ],
        126: [ "ChaRliFuM", "menolikeyou", "undimmer" ],
        127: [ "locof", "Pedrosa7", "Syuk" ],
        129: [ "alexander", "ferk", "horvathzeros", "J40" ],
        131: [ "KinachO" ],
        132: [ "cm07", "RoninPiros" ],
        134: [ "Rundull" ],
        135: [ "dangerous" ],
        136: [ "HeXaN", "Prostyler", "thunder_" ]
    };
    // Mods de cada foro
    UT.options.$("tablamods", function() {
        if ($('div#topnav a[href="/foro/"]').length > 0 && $("div.live_info").length === 0) {
            var $box = $('<div class="box">').appendTo("div.smallcol, div.tinycol");
            var $modlist = $('<div id="modlist"><h3>Moderadores</h3></div>').addClass(!UT.isDark ? "modlistblanco" : "modlistnegro").appendTo($box);
            var id = $("input#fid").attr("value");
            if (typeof mods[id] === "undefined") {
                $("<p/>").html("<span>Este foro no tiene mods o no están listados.</span>").appendTo($modlist);
            } else {
                $.each(mods[id], function(i, v) {
                    $("<a/>").html(v).attr("href", "/id/" + v + "").append("<br />").appendTo($modlist);
                });
            }
        }
    });
})(jQuery, window.UserTools);

/*
 * Marcápaginas en los posts a los que entras directamente (URLs acabas en #xx...)
 */
(function($, UT) {
    UT.options.setDefault("marcapaginas", true);
    UT.options.$("marcapaginas", function() {
        $("div.mark").css({
            "background-image": 'url("http://www.mvusertools.com/ext/img/marcapaginas2.png")',
            "background-repeat": "no-repeat",
            "background-position": "100px top"
        });
    });
})(jQuery, window.UserTools);

/*
 *  Muestra los avisos (favs, avisos, mensajes) en el favicon de la web.
 */
(function($, UT, Tinycon) {
    UT.options.setDefault("favicon", true);
    UT.options.$("favicon", function() {
        var favs = $('#userinfo a[href^="/foro/favoritos"] strong.bubble').html();
        var avisos = $('#userinfo a[href^="/notificaciones"] strong.bubble').html();
        var mensajes = $('#userinfo a[href^="/mensajes"] strong.bubble').html();
        var total = 0;
        if (typeof favs !== "undefined") {
            total += parseInt(favs, 10);
        }
        if (typeof avisos !== "undefined") {
            total += parseInt(avisos, 10);
        }
        if (typeof mensajes !== "undefined") {
            total += parseInt(mensajes, 10);
        }
        Tinycon.setBubble(total.toString());
        Tinycon.setOptions({
            fallback: true
        });
    });
})(jQuery, window.UserTools, Tinycon);

(function($, UT) {
    $(function() {
        // Botonera en formulario extendido
        $('button[accesskey="b"]').hide();
        $('<button class="alt bleft bb" accesskey="b" type="button" onclick="bbstyle(0)">b</button>').insertAfter('button[accesskey="b"]');
        $('button[accesskey="i"]').hide();
        $('<button class="alt bcenter bi" accesskey="i" type="button" onclick="bbstyle(2)">i</button><button class="alt bcenter2 bu" accesskey="u" type="button" onclick="bbstyle(4)">u</button><button id="ut-boton-s" class="alt bright bs" accesskey="x" type="button">s</button><button class="alt bsolo" id="ut-boton-center" accesskey="c" type="button" title="[center]"><a class="sprite bcentericon"></a></button><button class="alt bsolo" id="ut-boton-list" type="button" title="[list] Usar * para cada elemento de la lista"><a class="blist sprite"></a></button>').insertAfter('button[accesskey="i"]');
        $('button[accesskey="l"]').hide();
        $('<button class="alt bsolo" accesskey="l" type="button" onclick="bbstyle(8)">[url=]</button>').insertAfter('button[accesskey="l"]');
        $('button[accesskey="m"]').hide();
        $('<button class="alt bleft" accesskey="m" type="button" onclick="bbstyle(10)" title="[img]"><a class="bimg sprite"></a></button>').insertAfter('button[accesskey="m"]');
        $('button[accesskey="v"]').hide();
        $('<button class="alt bcenter" accesskey="v" type="button" onclick="bbstyle(12)" title="[video]"><a class="bvideo sprite"></a></button><button title="[audio]" id="ut-boton-audio" class="alt bright" type="button"><a class="baudio sprite"></a></button>').insertAfter('button[accesskey="v"]');
        $('button[accesskey="s"]').hide();
        $('<button class="alt bleft" accesskey="s" type="button" onclick="bbstyle(14)">[spoiler]</button>').insertAfter('button[accesskey="s"]');
        $('button[accesskey="d"]').hide();
        $('<button class="alt bcenter" accesskey="d" type="button" onclick="bbstyle(16)">[spoiler=]</button>').insertAfter('button[accesskey="d"]');
        $('button[accesskey="n"]').hide();
        $('<button class="alt bright" accesskey="n" type="button" onclick="bbstyle(18)">NSFW</button><button title="Pulsa para ver más opciones" id="ut-boton-plus" class="alt bsolo" type="button"><a class="ut-arrow-down sprite"></a></button><script></script>').insertAfter('button[accesskey="n"]');
        $("#ut-boton-s").click(function() {
            if ($("textarea#cuerpo").getSelection().text.length > 0) {
                $("textarea#cuerpo").replaceSelection("[s]" + $("textarea#cuerpo").getSelection().text + "[/s]").setCaretPos();
            } else {
                $("textarea#cuerpo").insertAtCaretPos("[s][/s]").setCaretPos($("textarea#cuerpo").getSelection().end - 3);
            }
        });
        $("#ut-boton-center").click(function() {
            if ($("textarea#cuerpo").getSelection().text.length > 0) {
                $("textarea#cuerpo").replaceSelection("[center]" + $("textarea#cuerpo").getSelection().text + "[/center]").setCaretPos();
            } else {
                $("textarea#cuerpo").insertAtCaretPos("[center][/center]").setCaretPos($("textarea#cuerpo").getSelection().end - 8);
            }
        });
        $("#ut-boton-list").click(function() {
            if ($("textarea#cuerpo").getSelection().text.length > 0) {
                $("textarea#cuerpo").replaceSelection("[list]" + $("textarea#cuerpo").getSelection().text + "[/list]").setCaretPos();
            } else {
                $("textarea#cuerpo").insertAtCaretPos("[list][/list]").setCaretPos($("textarea#cuerpo").getSelection().end - 6);
            }
        });
        $("#ut-boton-audio").click(function() {
            if ($("textarea#cuerpo").getSelection().text.length > 0) {
                $("textarea#cuerpo").replaceSelection("[audio]" + $("textarea#cuerpo").getSelection().text + "[/audio]").setCaretPos();
            } else {
                $("textarea#cuerpo").insertAtCaretPos("[audio][/audio]").setCaretPos($("textarea#cuerpo").getSelection().end - 7);
            }
        });
        // Segunda linea en la botonera del formulario extendido
        var utsegundabarra = '<button class="alt bsolo" id="ut-boton-bar" type="button">[bar]</button><button class="alt bleft" type="button" onclick="bbstyle(20)">[code]</button><button class="alt bright2" id="ut-boton-cmd" type="button">[cmd]</button><button id="ut-button-macros" class="alt bsolo" type="button">macros <i class="sprite icon-down-list"></i></button><div id="ut-button-macros-list" style="display: none;"><ul></ul><a href="#ut-dialog-menu" id="ut-button-macros-list-anadir">añadir macro</a></div>';
        $('<div id="ut-botonera2" style="overflow: hidden;margin: 10px 0;clear: both; display: none;">' + utsegundabarra + "</div>").insertAfter('form#postear div[style="overflow: hidden;margin: 10px 0;clear: both"]');
        $('<div id="ut-botonera2" style="overflow: hidden;margin: 10px 0;clear: both; display: none;">' + utsegundabarra + "</div>").insertAfter('form#postform div[style="overflow: hidden;margin-bottom: 10px;clear: both"]');
        $("#ut-boton-plus").click(function() {
            if ($("#ut-botonera2").is(":visible")) {
                $("#ut-botonera2").slideUp();
                $("#ut-boton-plus a").toggleClass("ut-arrow-down").toggleClass("ut-arrow-up");
                $("#ut-boton-plus").attr("title", "Pulsa para ver más opciones");
            } else {
                $("#ut-botonera2").slideDown();
                $("#ut-boton-plus a").toggleClass("ut-arrow-down").toggleClass("ut-arrow-up");
                $("#ut-boton-plus").attr("title", "Pulsa para ocultar la segunda linea de opciones");
            }
        });
        $("#ut-boton-bar").click(function() {
            if ($("textarea#cuerpo").getSelection().text.length > 0) {
                $("textarea#cuerpo").replaceSelection("[bar]" + $("textarea#cuerpo").getSelection().text + "[/bar]").setCaretPos();
            } else {
                $("textarea#cuerpo").insertAtCaretPos("[bar][/bar]").setCaretPos($("textarea#cuerpo").getSelection().end - 5);
            }
        });
        $("#ut-boton-cmd").click(function() {
            if ($("textarea#cuerpo").getSelection().text.length > 0) {
                $("textarea#cuerpo").replaceSelection("[cmd]" + $("textarea#cuerpo").getSelection().text + "[/cmd]").setCaretPos();
            } else {
                $("textarea#cuerpo").insertAtCaretPos("[cmd][/cmd]").setCaretPos($("textarea#cuerpo").getSelection().end - 5);
            }
        });
        $("#ut-button-macros").click(function() {
            if ($('#ut-button-macros-list[style="display: none;"]').length) {
                $("#ut-button-macros-list").show();
            } else {
                $("#ut-button-macros-list").hide();
            }
        });
        $("#ut-button-macros-list").mouseup(function() {
            return false;
        });
        $("#ut-button-macros").mouseup(function() {
            return false;
        });
        $(document).mouseup(function() {
            $("#ut-button-macros-list").hide();
        });
        $("#ut-button-macros-list-anadir").click(function() {
            $("#ut-mask-menu").show();
            $("#ut-dialog-menu").show();
            $("#ut-menu-tab1").removeClass("active");
            $("#ut-menu-tab2").removeClass("active");
            $("#ut-menu-tab3").removeClass("active");
            $("#ut-menu-tab4").addClass("active");
            $("#ut-menu-tabla1").hide();
            $("#ut-menu-tabla2").hide();
            $("#ut-menu-tabla3").hide();
            $("#ut-menu-tabla4").show();
        });
        // Botonera en el fast-edit
        if (!UT.live) {
            var botonessolounavez = function() {
                var fasteditbuttons = function() {
                    $('<div style="overflow: hidden;margin: 0 0px 10px -5px;clear: both"><button type="button" accesskey="b" class="alt bleft bb" id="ut-boton-b-fast">b</button><button type="button" accesskey="i" class="alt bcenter bi" id="ut-boton-i-fast">i</button><button type="button" accesskey="u" class="alt bcenter2 bu" id="ut-boton-u-fast">u</button><button type="button" accesskey="x" class="alt bright bs" id="ut-boton-s-fast">s</button><button title="[center]" type="button" accesskey="c" id="ut-boton-center-fast" class="alt bsolo"><a class="sprite bcentericon"></a></button><button title="[list] Usar * para cada elemento de la lista" type="button" id="ut-boton-list-fast" class="alt bsolo"><a class="blist sprite"></a></button><button type="button" accesskey="l" class="alt bsolo" id="ut-boton-url-fast">[url=]</button><button title="[img]" type="button" accesskey="m" class="alt bleft" id="ut-boton-img-fast"><a class="bimg sprite"></a></button><button title="[video]" type="button" accesskey="v" class="alt bcenter" id="ut-boton-video-fast"><a class="bvideo sprite"></a></button><button type="button" class="alt bright" title="[audio]" id="ut-boton-audio-fast"><a class="baudio sprite"></a></button><button type="button" accesskey="s" class="alt bleft" id="ut-boton-spoiler-fast">[spoiler]</button><button type="button" accesskey="d" class="alt bcenter" id="ut-boton-spoiler2-fast">[spoiler=]</button><button type="button" accesskey="n" class="alt bright" id="ut-boton-nsfw-fast">NSFW</button><button type="button" id="ut-boton-bar-fast" class="alt bsolo">[bar]</button><button type="button" class="alt bsolo" id="ut-boton-code-fast">[code]</button></div>').insertBefore('div.msg div.body div textarea:not("div.extraportada textarea")');
                };
                $(document).one("mouseenter", "div.msg div.body div textarea", function() {
                    fasteditbuttons();
                });
            };
            $(botonessolounavez);
            $(document).on("click", "button.cancelButton", botonessolounavez);
            $(document).on("click", "button.saveButton", botonessolounavez);
            $(document).on("click", "#ut-boton-b-fast", function() {
                if ($("div.msg div.body div textarea").getSelection().text.length > 0) {
                    $("div.msg div.body div textarea").replaceSelection("[b]" + $("div.msg div.body div textarea").getSelection().text + "[/b]").setCaretPos();
                } else {
                    $("div.msg div.body div textarea").insertAtCaretPos("[b][/b]").setCaretPos($("div.msg div.body div textarea").getSelection().end - 3);
                }
            });
            $(document).on("click", "#ut-boton-i-fast", function() {
                if ($("div.msg div.body div textarea").getSelection().text.length > 0) {
                    $("div.msg div.body div textarea").replaceSelection("[i]" + $("div.msg div.body div textarea").getSelection().text + "[/i]").setCaretPos();
                } else {
                    $("div.msg div.body div textarea").insertAtCaretPos("[i][/i]").setCaretPos($("div.msg div.body div textarea").getSelection().end - 3);
                }
            });
            $(document).on("click", "#ut-boton-u-fast", function() {
                if ($("div.msg div.body div textarea").getSelection().text.length > 0) {
                    $("div.msg div.body div textarea").replaceSelection("[u]" + $("div.msg div.body div textarea").getSelection().text + "[/u]").setCaretPos();
                } else {
                    $("div.msg div.body div textarea").insertAtCaretPos("[u][/u]").setCaretPos($("div.msg div.body div textarea").getSelection().end - 3);
                }
            });
            $(document).on("click", "#ut-boton-s-fast", function() {
                if ($("div.msg div.body div textarea").getSelection().text.length > 0) {
                    $("div.msg div.body div textarea").replaceSelection("[s]" + $("div.msg div.body div textarea").getSelection().text + "[/s]").setCaretPos();
                } else {
                    $("div.msg div.body div textarea").insertAtCaretPos("[s][/s]").setCaretPos($("div.msg div.body div textarea").getSelection().end - 3);
                }
            });
            $(document).on("click", "#ut-boton-center-fast", function() {
                if ($("div.msg div.body div textarea").getSelection().text.length > 0) {
                    $("div.msg div.body div textarea").replaceSelection("[center]" + $("div.msg div.body div textarea").getSelection().text + "[/center]").setCaretPos();
                } else {
                    $("div.msg div.body div textarea").insertAtCaretPos("[center][/center]").setCaretPos($("div.msg div.body div textarea").getSelection().end - 8);
                }
            });
            $(document).on("click", "#ut-boton-list-fast", function() {
                if ($("div.msg div.body div textarea").getSelection().text.length > 0) {
                    $("div.msg div.body div textarea").replaceSelection("[list]" + $("div.msg div.body div textarea").getSelection().text + "[/list]").setCaretPos();
                } else {
                    $("div.msg div.body div textarea").insertAtCaretPos("[list][/list]").setCaretPos($("div.msg div.body div textarea").getSelection().end - 6);
                }
            });
            $(document).on("click", "#ut-boton-url-fast", function() {
                if ($("div.msg div.body div textarea").getSelection().text.length > 0) {
                    $("div.msg div.body div textarea").replaceSelection("[url=]" + $("div.msg div.body div textarea").getSelection().text + "[/url]").setCaretPos();
                } else {
                    $("div.msg div.body div textarea").insertAtCaretPos("[url=][/url]").setCaretPos($("div.msg div.body div textarea").getSelection().end - 5);
                }
            });
            $(document).on("click", "#ut-boton-img-fast", function() {
                if ($("div.msg div.body div textarea").getSelection().text.length > 0) {
                    $("div.msg div.body div textarea").replaceSelection("[img]" + $("div.msg div.body div textarea").getSelection().text + "[/img]").setCaretPos();
                } else {
                    $("div.msg div.body div textarea").insertAtCaretPos("[img][/img]").setCaretPos($("div.msg div.body div textarea").getSelection().end - 5);
                }
            });
            $(document).on("click", "#ut-boton-video-fast", function() {
                if ($("div.msg div.body div textarea").getSelection().text.length > 0) {
                    $("div.msg div.body div textarea").replaceSelection("[video]" + $("div.msg div.body div textarea").getSelection().text + "[/video]").setCaretPos();
                } else {
                    $("div.msg div.body div textarea").insertAtCaretPos("[video][/video]").setCaretPos($("div.msg div.body div textarea").getSelection().end - 7);
                }
            });
            $(document).on("click", "#ut-boton-audio-fast", function() {
                if ($("div.msg div.body div textarea").getSelection().text.length > 0) {
                    $("div.msg div.body div textarea").replaceSelection("[audio]" + $("div.msg div.body div textarea").getSelection().text + "[/audio]").setCaretPos();
                } else {
                    $("div.msg div.body div textarea").insertAtCaretPos("[audio][/audio]").setCaretPos($("div.msg div.body div textarea").getSelection().end - 7);
                }
            });
            $(document).on("click", "#ut-boton-spoiler-fast", function() {
                if ($("div.msg div.body div textarea").getSelection().text.length > 0) {
                    $("div.msg div.body div textarea").replaceSelection("[spoiler]" + $("div.msg div.body div textarea").getSelection().text + "[/spoiler]").setCaretPos();
                } else {
                    $("div.msg div.body div textarea").insertAtCaretPos("[spoiler][/spoiler]").setCaretPos($("div.msg div.body div textarea").getSelection().end - 9);
                }
            });
            $(document).on("click", "#ut-boton-spoiler2-fast", function() {
                if ($("div.msg div.body div textarea").getSelection().text.length > 0) {
                    $("div.msg div.body div textarea").replaceSelection("[spoiler=]" + $("div.msg div.body div textarea").getSelection().text + "[/spoiler]").setCaretPos();
                } else {
                    $("div.msg div.body div textarea").insertAtCaretPos("[spoiler=][/spoiler]").setCaretPos($("div.msg div.body div textarea").getSelection().end - 9);
                }
            });
            $(document).on("click", "#ut-boton-nsfw-fast", function() {
                if ($("div.msg div.body div textarea").getSelection().text.length > 0) {
                    $("div.msg div.body div textarea").replaceSelection("[spoiler=NSFW]" + $("div.msg div.body div textarea").getSelection().text + "[/spoiler]").setCaretPos();
                } else {
                    $("div.msg div.body div textarea").insertAtCaretPos("[spoiler=NSFW][/spoiler]").setCaretPos($("div.msg div.body div textarea").getSelection().end - 9);
                }
            });
            $(document).on("click", "#ut-boton-bar-fast", function() {
                if ($("div.msg div.body div textarea").getSelection().text.length > 0) {
                    $("div.msg div.body div textarea").replaceSelection("[bar]" + $("div.msg div.body div textarea").getSelection().text + "[/bar]").setCaretPos();
                } else {
                    $("div.msg div.body div textarea").insertAtCaretPos("[bar][/bar]").setCaretPos($("div.msg div.body div textarea").getSelection().end - 5);
                }
            });
            $(document).on("click", "#ut-boton-code-fast", function() {
                if ($("div.msg div.body div textarea").getSelection().text.length > 0) {
                    $("div.msg div.body div textarea").replaceSelection("[code]" + $("div.msg div.body div textarea").getSelection().text + "[/code]").setCaretPos();
                } else {
                    $("div.msg div.body div textarea").insertAtCaretPos("[code][/code]").setCaretPos($("div.msg div.body div textarea").getSelection().end - 6);
                }
            });
        }
        // Botonera en el perfil
        $('<div style="overflow: hidden;margin: 0 0 5px 0;clear: both"><button type="button" accesskey="b" class="alt bleft bb" id="ut-boton-b-perfil">b</button><button type="button" accesskey="i" class="alt bcenter bi" id="ut-boton-i-perfil">i</button><button type="button" accesskey="u" class="alt bright bu" id="ut-boton-u-perfil">u</button><button type="button" accesskey="l" class="alt bsolo" id="ut-boton-url-perfil">[url=]</button><button type="button" accesskey="s" class="alt bleft" id="ut-boton-spoiler-perfil">[spoiler]</button><button type="button" accesskey="d" class="alt bcenter" id="ut-boton-spoiler2-perfil">[spoiler=]</button><button type="button" accesskey="n" class="alt bright" id="ut-boton-nsfw-perfil">NSFW</button></div>').insertBefore('body.usuarios textarea[name="info"]');
        $("#ut-boton-b-perfil").click(function() {
            if ($('textarea[name="info"]').getSelection().text.length > 0) {
                $('textarea[name="info"]').replaceSelection("[b]" + $('textarea[name="info"]').getSelection().text + "[/b]").setCaretPos();
            } else {
                $('textarea[name="info"]').insertAtCaretPos("[b][/b]").setCaretPos($('textarea[name="info"]').getSelection().end - 3);
            }
        });
        $("#ut-boton-i-perfil").click(function() {
            if ($('textarea[name="info"]').getSelection().text.length > 0) {
                $('textarea[name="info"]').replaceSelection("[i]" + $('textarea[name="info"]').getSelection().text + "[/i]").setCaretPos();
            } else {
                $('textarea[name="info"]').insertAtCaretPos("[i][/i]").setCaretPos($('textarea[name="info"]').getSelection().end - 3);
            }
        });
        $("#ut-boton-u-perfil").click(function() {
            if ($('textarea[name="info"]').getSelection().text.length > 0) {
                $('textarea[name="info"]').replaceSelection("[u]" + $('textarea[name="info"]').getSelection().text + "[/u]").setCaretPos();
            } else {
                $('textarea[name="info"]').insertAtCaretPos("[u][/u]").setCaretPos($('textarea[name="info"]').getSelection().end - 3);
            }
        });
        $("#ut-boton-url-perfil").click(function() {
            if ($('textarea[name="info"]').getSelection().text.length > 0) {
                $('textarea[name="info"]').replaceSelection("[url=]" + $('textarea[name="info"]').getSelection().text + "[/url]").setCaretPos();
            } else {
                $('textarea[name="info"]').insertAtCaretPos("[url=][/url]").setCaretPos($('textarea[name="info"]').getSelection().end - 5);
            }
        });
        $("#ut-boton-spoiler-perfil").click(function() {
            if ($('textarea[name="info"]').getSelection().text.length > 0) {
                $('textarea[name="info"]').replaceSelection("[spoiler]" + $('textarea[name="info"]').getSelection().text + "[/spoiler]").setCaretPos();
            } else {
                $('textarea[name="info"]').insertAtCaretPos("[spoiler][/spoiler]").setCaretPos($('textarea[name="info"]').getSelection().end - 9);
            }
        });
        $("#ut-boton-spoiler2-perfil").click(function() {
            if ($('textarea[name="info"]').getSelection().text.length > 0) {
                $('textarea[name="info"]').replaceSelection("[spoiler=]" + $('textarea[name="info"]').getSelection().text + "[/spoiler]").setCaretPos();
            } else {
                $('textarea[name="info"]').insertAtCaretPos("[spoiler=][/spoiler]").setCaretPos($('textarea[name="info"]').getSelection().end - 9);
            }
        });
        $("#ut-boton-nsfw-perfil").click(function() {
            if ($('textarea[name="info"]').getSelection().text.length > 0) {
                $('textarea[name="info"]').replaceSelection("[spoiler=NSFW]" + $('textarea[name="info"]').getSelection().text + "[/spoiler]").setCaretPos();
            } else {
                $('textarea[name="info"]').insertAtCaretPos("[spoiler=NSFW][/spoiler]").setCaretPos($('textarea[name="info"]').getSelection().end - 9);
            }
        });
    });
})(jQuery, window.UserTools);

/*
 * Infomración del perfil en la lista de users.
 */
(function($, UT) {
    var TIMEOUT = 1e3;
    var FADE = 400;
    UT.options.setDefault("userinfo", true);
    UT.options.$("userinfo", function() {
        var $usercard = $('<div id="ajax_usercard">').css({
            backgroundColor: UT.isDark ? "#39444B" : "whitesmoke",
            borderRadius: "6px",
            padding: "10px 5px 5px 5px",
            position: "absolute",
            overflow: "hidden",
            boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.25)",
            zIndex: "9999"
        }).appendTo($("body"));
        var request = null;
        var timeout = null;
        var info_box = function(id, left, top) {
            timeout = setTimeout(function() {
                request = $.get("http://www.mediavida.com/id/" + id, function($data) {
                    $usercard.html($(".infoavatar", $data).html()).css({
                        left: left,
                        top: top
                    });
                    $(".userinfo", $usercard).css({
                        borderRadius: "6px",
                        width: "254px",
                        height: "90px",
                        backgroundColor: "#F4F6F1",
                        "float": "left",
                        padding: "7px 5px 0 5px",
                        position: "relative",
                        zoom: "1"
                    });
                    $(".useravatar", $usercard).css({
                        "float": "left",
                        padding: "5px",
                        marginRight: "5px"
                    }).find("img").load(function() {
                        $usercard.fadeIn(FADE);
                    });
                });
            }, TIMEOUT);
        };
        $(".post .autor dt a").hover(function() {
            var $this = $(this);
            var offset = $this.offset();
            info_box($this.attr("href").match(/id\/(.+)/)[1], offset.left - 10, offset.top + 15);
        }, function() {
            if (timeout !== null) {
                clearTimeout(timeout);
                timeout = null;
            }
            if (request !== null) {
                request.abort();
                request = null;
            }
            $usercard.fadeOut(FADE);
        });
    });
})(jQuery, window.UserTools);

/*
 * Cambios de nombres en foros y usuarios + cambio de CTs.
 */
(function($, UT) {
    UT.options.setDefault("CambiosNombre", true);
    var NICKS = {
        Alien_crrpt: {
            nick: "Alien_derp"
        },
        Achotiodeque: {
            nick: "Achotoditeque"
        },
        Masme: {
            nick: "Madme"
        },
        MavenBack: {
            nick: "Madven"
        },
        Ekisu: {
            nick: "X-Crim",
            ct: "Mod de Mario Kart"
        },
        Txentx0: {
            nick: "Txentxo"
        },
        Link34: {
            nick: "Link-pyon"
        },
        GaTToO: {
            ct: "Me punishean :_("
        }
    };
    var FOROS = {
        "Juegos móvil": "Shitphones"
    };
    UT.options.$("CambiosNombre", function() {
        // Usuarios
        // TODO: Mejorable
        var cambiar_usuario = function(original, info) {
            var falso = info.nick;
            var ct = info.ct;
            $('div.post div[class="autor"]:contains("' + original + '")').each(function() {
                if (typeof falso !== "undefined") {
                    $(this).children().children("dt").children("a").text(falso);
                }
                if (typeof ct !== "undefined") {
                    $(this).children().children("dd:first").text("" + ct + "");
                }
            });
            if (typeof falso !== "undefined") {
                $(document).on("mouseover", "body", function() {
                    $('div.lastpost cite a:contains("' + original + '")').text(falso);
                });
                $('tr div.left a[href^="/id/"]:contains("' + original + '")').each(function() {
                    $(this).text(falso);
                });
            }
        };
        var nick;
        for (nick in NICKS) {
            cambiar_usuario(nick, NICKS[nick]);
        }
        //Foros
        var cambiar_foro = function(original, falso) {
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

(function($, UT) {
    UT.options.setDefault("filtrarfavs", true);
    UT.options.setDefault("ordenarposts", true);
    // Filtrar favoritos
    if (UT.options.get("filtrarfavs")) {
        $(function() {
            $("#favoritos .tinycol").prepend('<div id="ut-filtros-fav">');
            $('<h3 id="ut-fav-filto-titulo">').text("Filtros").insertBefore("#ut-filtros-fav");
            /* Movemos y filtramos iconos de foros */
            $(document).on("mouseover", "body", function() {
                $("#tfav a.foroicon").each(function() {
                    $("#ut-filtros-fav").append($(this).clone());
                });
                var utforosUnicos = {};
                $("#ut-filtros-fav a.foroicon").each(function() {
                    $(this).attr("href", "#filtrados");
                    var interiorA = $(this).html();
                    if (utforosUnicos[interiorA]) $(this).remove(); else utforosUnicos[interiorA] = true;
                });
            });
            /* Filtramos foros y categorias */
            $(document).on("click", "#ut-filtros-fav a.foroicon", function() {
                $("#ut-filtros-fav a.foroicon").removeClass("ut-opacity");
                $("#tfav tr").removeClass("utfiltrado");
                $("#ut-filtros-tags").remove();
                $("#tfav a.foroicon").closest("tr").attr("style", "display: table-row;");
                var foroImgSrc = $(this).children("i").attr("class").match(/fid_(.*)/)[1];
                $("#tfav a.foroicon i").not(".fid_" + foroImgSrc + "").closest("tr").addClass("utfiltrado").hide();
                $("#ut-filtros-fav a.foroicon").not(this).addClass("ut-opacity");
                $('<div id="ut-filtros-tags">').insertAfter("#ut-filtros-fav");
                $("#tfav tr").not("tr.utfiltrado").children("td.dash").children("a.cat2").each(function() {
                    $("#ut-filtros-tags").append($(this).clone().removeAttr("title"));
                });
                $("#ut-filtros-tags a.cat2 img").removeAttr("alt", "style");
                var utCatsUnicos = {};
                $("#ut-filtros-tags a.cat2").each(function() {
                    $(this).attr("href", "#filtrados");
                    var interiorB = $(this).html();
                    if (utCatsUnicos[interiorB]) $(this).remove(); else utCatsUnicos[interiorB] = true;
                });
            });
            $(document).on("click", "#ut-filtros-tags a.cat2", function() {
                $("#ut-filtros-tags a.cat2").removeClass("ut-opacity");
                $("#tfav a.foroicon").closest("tr").not("tr.utfiltrado").attr("style", "display: table-row;");
                var catImgSrc = $(this).children("img").attr("src");
                $("#tfav a.cat2 img").not('img[src="' + catImgSrc + '"]').closest("tr").hide();
                $("#ut-filtros-tags a.cat2").not(this).addClass("ut-opacity");
            });
            /* Quitamos filtros */
            $('<p id="utFavQuitar">').text("Quitar filtro.").insertAfter("#ut-filtros-fav");
            $(document).on("click", "#utFavQuitar", function() {
                $("#ut-filtros-fav a.foroicon").removeClass("ut-opacity");
                $("#tfav tr").removeClass("utfiltrado");
                $("#ut-filtros-tags").remove();
                $("#tfav a.foroicon").closest("tr").attr("style", "display: table-row;");
            });
            /* Aviso para los que tienen más de 30 favoritos */
            var utVerMasFav = $("#favoritos .tfooter #moar").text();
            if (utVerMasFav === "Ver más") {
                $('<p id="utFavAviso">').text("Tienes más de 30 favoritos +").insertAfter("#utFavQuitar");
                $('<div id="utFavAvisoTxt">').html('Para que el filtro funcione con todos tus hilos guardados en favoritos, debes darle al botón de "Ver más" al final de la lista de hilos. Si no se muestran el filtro no tendrá efecto en ellos.').insertAfter("#utFavAviso");
                $("#utFavAviso").click(function() {
                    $("#utFavAvisoTxt").slideToggle();
                    if ($("#utFavAviso").text() === "Tienes más de 30 favoritos +") {
                        $("#utFavAviso").text("Tienes más de 30 favoritos -");
                    } else {
                        $("#utFavAviso").text("Tienes más de 30 favoritos +");
                    }
                });
            }
        });
    }
    // Ordenar por respuestas sin leer en favoritos (bug con hilos con 1k)
    if (UT.options.get("ordenarposts")) {
        $(function() {
            var $table = $("div#main table.full");
            $('<span style="font-size: 10px; margin-left: 20px;">Ordenar por: <span style="cursor: pointer; color: #EF5000;" id="ut-fav-fecha">Fecha</span> | <span style="cursor: pointer; color: #999999;" id="ut-fav-posts">Respuestas sin leer</span></span>').insertAfter("body#favoritos table#tfav th span.left");
            $('<span style="font-size: 10px; margin-left: -110px;">Ordenar por: <span style="cursor: pointer; color: #EF5000;" id="ut-fav-fecha">Fecha</span> | <span style="cursor: pointer; color: #999999;" id="ut-fav-posts">Respuestas sin leer</span></span>').insertAfter("body#foros table.full th span.left");
            var originalRows = $table.find("tr").slice(1).get(), rows = originalRows.slice(0);
            $("#ut-fav-posts").click(function() {
                rows.sort(function(a, b) {
                    var keyA = +$(a).find("a.unreadcount").text();
                    var keyB = +$(b).find("a.unreadcount").text();
                    if (keyA < keyB) return 1;
                    if (keyA > keyB) return -1;
                    return 0;
                });
                $.each(rows, function(index, row) {
                    $table.children("tbody").append(row);
                });
                $("#ut-fav-posts").css("color", "#EF5000");
                $("#ut-fav-fecha").css("color", "#999999");
            });
            $("#ut-fav-fecha").click(function() {
                $.each(originalRows, function(index, row) {
                    $table.children("tbody").append(row);
                });
                $("#ut-fav-posts").css("color", "#999999");
                $("#ut-fav-fecha").css("color", "#EF5000");
            });
        });
    }
})(jQuery, window.UserTools);

/*
 * Permite ocultar filtros en el spy.
 */
(function($, UT) {
    UT.options.not$("filtrarOpcion", function() {
        var $nofids = $("#nofids");
        var $utfiltrar = $nofids.siblings("h3");
        var $utfiltrarP = $nofids.closest(".box").siblings("p");
        $utfiltrar.addClass("ut-filtrar").click(function() {
            $nofids.slideToggle();
            $utfiltrarP.toggle();
            UT.options.toggle("filtrarOpcion");
        });
        $nofids.toggle();
        $utfiltrarP.toggle();
    });
})(jQuery, window.UserTools);

/*
 * Funciones generales para spoilers.
 *
 * - Nuevo estilo.
 * - Boton de cerrar el spoiler al final.
 */
(function($, UT) {
    var CLOSE_SPOILER = '<br /> <br /> <a class="ut-cerrarspoiler-boton" style="cursor: pointer;">Cerrar Spoiler</a>';
    UT.options.setDefault("estilospoilers", true);
    UT.options.setDefault("cerrarspoilers", false);
    // Estilos para los spoilers
    UT.options.$("estilospoilers", function() {
        $(".spoiler").each(function() {
            $("#" + $(this).attr("rel")).addClass(!UT.isDark ? "spoiler-content" : "spoiler-content-black");
        });
    });
    // Botón para cerrar spoiler al final del mismo
    // TODO: Mejorable?
    //       Scroll al spoiler, no al post
    UT.options.$("cerrarspoilers", function() {
        $('div[id^="cuerpo_"] div[id^="sp_"]').append(CLOSE_SPOILER);
        $(".ut-cerrarspoiler-boton").click(function() {
            var $this = $(this);
            var utSpoilerPostId = $this.closest("div.post").attr("id");
            var utSpoilerId = $this.closest('div[id^="sp_"]').attr("id");
            $this.closest('div[id^="sp_"]').siblings('a[rel="' + utSpoilerId + '"]').removeClass("less");
            $this.closest('div[id^="' + utSpoilerId + '"]').hide();
            $("#" + utSpoilerPostId).ScrollTo({
                duration: 0
            });
        });
    });
})(jQuery, window.UserTools);

(function(window, document, $, UT) {
    UT.options.setDefault("forosfavs", true);
    UT.options.$("forosfavs", function() {
        // Container
        var $favs = $('<ul id="ut-foros-fav">');
        $('<div id="sticky-anchor" style="position: absolute; top: 200px;">').insertBefore("#content_body, #content_head");
        $('<div id="foros-fav-float">').append($("<div>").append($favs)).insertAfter("#sticky-anchor");
        // Add favorites
        var favs;
        var remove = function(index) {
            favs.splice(index, 1);
            UT.options.set("-favs", favs);
            update();
        };
        var update = function() {
            $favs.html("");
            favs = UT.options.get("-favs", []);
            var i;
            for (i = 0; i < favs.length; i++) {
                (function(i) {
                    // Botón para borrar
                    var $borrar = $('<i class="sprite UT-trash">').click(function() {
                        remove(i);
                    });
                    $("<li>").append('<a href="/foro/' + favs[i] + '"><i class="ifid fid_' + favs[i] + '"></i></a>').append($('<div class="ut-foros-fav-borrar">').append($borrar)).appendTo($favs);
                })(i);
            }
        };
        update();
        // Boton para añadir a favs
        $icons = $("div.fpanel div.icon");
        $icons.hover(function() {
            $(".ut-foro-fav-add", this).addClass("ut-foro-fav-add-moveup");
        }, function() {
            $(".ut-foro-fav-add", this).removeClass("ut-foro-fav-add-moveup");
        });
        $icons.each(function() {
            var $icon = $(this);
            $("i.ifid", $icon).each(function() {
                var foroNumber = $(this).attr("class").match(/fid_(.*)/)[1];
                // Star icon
                var $star = $('<div class="ut-foro-fav-add">').click(function() {
                    $(this).toggleClass("ut-foro-fav-added");
                    var index = $.inArray(foroNumber, favs);
                    if (index > -1) {
                        remove(index);
                    } else {
                        favs.push(foroNumber);
                        UT.options.set("-favs", favs);
                    }
                    update();
                });
                var index = $.inArray(foroNumber, favs);
                if (index > -1) {
                    $star.addClass("ut-foro-fav-added");
                }
                $icon.append($star);
            });
        });
        // Panel flotante sigue el scroll
        var sticky_relocate = function() {
            var window_top = $(window).scrollTop();
            var div_top = $("#sticky-anchor").offset().top;
            if (window_top > div_top) {
                $("#foros-fav-float").addClass("foros-fav-float-sticky");
            } else {
                $("#foros-fav-float").removeClass("foros-fav-float-sticky");
            }
        };
        $(window).scroll(sticky_relocate);
        sticky_relocate();
        // Fixes vendor?
        if ($.browser.safari || $.browser.opera) {
            $("#foros-fav-float").css("margin-left", "1145px");
        }
    });
})(window, window.document, jQuery, window.UserTools);

/*
 * Links de favs/avisos/mensajes al estilo antiguo.
 */
(function($, UT) {
    UT.options.setDefault("antiguoslinksuserinfo", false);
    UT.options.$("antiguoslinksuserinfo", function() {
        var $notify = $("#nav_bar a#notifylink");
        var $favs = $("#nav_bar a#favslink");
        var $mps = $("#nav_bar a#mplink");
        var $new_notify = $notify.closest("li").clone();
        var $new_favs = $favs.closest("li").clone();
        var $new_mps = $mps.closest("li").clone();
        $notify.closest("li").remove();
        $favs.closest("li").remove();
        $mps.closest("li").remove();
        var $all = $new_notify.add($new_favs).add($new_mps);
        $('#nav_bar a[href^="/id/"]').closest("li").after($all);
    });
})(jQuery, window.UserTools);

/*
 * Hilos con live destacados (sólo funciona con theme normal).
 */
(function($, UT) {
    UT.options.setDefault("livesdestacados", true);
    UT.options.$("livesdestacados", function() {
        $('img[alt="live"]').closest("tr").addClass("ut-live");
    });
})(jQuery, window.UserTools);

/*
 * Sistema de tagging de usuarios.
 */
(function($, UT) {
    var DEFAULT_TAG = '<div class="ut_tag ut_tag_vacia" style="background-color: #aaaaaa; opacity: 0.25; width: 9px; height: 15px; overflow: hidden;">   + etiqueta </div> <div class="ut_tag_info" style="display:none;">   <div class="ut_tag_info_cerrar">x</div>   <form class="ut_tag_form">     &gt; Tag<br>     <input class="ut_tag_tag" placeholder="Tag" maxlength="25"> <br />     &gt; Color     <div class="ut_tag_colores" style="display: inline;">       <div class="ut_tag_colores_1"></div>       <div class="ut_tag_colores_2"></div>       <div class="ut_tag_colores_3"></div>       <div class="ut_tag_colores_4"></div>       <div class="ut_tag_colores_5"></div>       <div class="ut_tag_colores_6"></div>    </div> <br>    <input class="ut_tag_color" placeholder="#5eadb9" maxlength="26"> <br />    &gt; <span class="ut_tag_link_span">Link</span> <br>    <input class="ut_tag_link" placeholder="http://"> <br />    &gt; Descripción<br>    <textarea placeholder="Descripción" class="ut_tag_desc" style="width: 110px;"></textarea> <br />    <input type="submit" style="margin-top: 1px;" value="Guardar">   </form> </div>';
    UT.options.setDefault("TagsOpcion", true);
    UT.options.$("TagsOpcion", function() {
        var tags = UT.options.get("-Tags", {});
        // Dibuja tags en el hilo
        $(":not(form)> div.post > div.autor > dl > dt > a").each(function() {
            var $this = $(this);
            var nick = $this.text();
            // dibuja con datos
            if (typeof tags[nick] !== "undefined") {
                $this.closest(".autor").append('<div class="ut_tag" style="background-color: ' + tags[nick].color + '">' + tags[nick].tag + '</div><div class="ut_tag_info" style="display:none;"><div class="ut_tag_info_cerrar">x</div><form class="ut_tag_form">&gt; Tag<br><input class="ut_tag_tag" value="' + tags[nick].tag + '" maxlength="25"><br />&gt; Color<div class="ut_tag_colores" style="display: inline;"><div class="ut_tag_colores_1"></div><div class="ut_tag_colores_2"></div><div class="ut_tag_colores_3"></div><div class="ut_tag_colores_4"></div><div class="ut_tag_colores_5"></div><div class="ut_tag_colores_6"></div></div><br><input class="ut_tag_color" value="' + tags[nick].color + '" maxlength="26"><br />&gt; <span class="ut_tag_link_span"><a href="' + tags[nick].link + '" target="_blank">Link</a></span><br><input class="ut_tag_link" value="' + tags[nick].link + '"><br />&gt; Descripción<br><textarea class="ut_tag_desc" style="width: 110px;">' + tags[nick].desc + '</textarea><br /><input type="submit" style="margin-top: 1px;" value="Guardar"></form></div>');
                if (tags[nick].link === "") {
                    // quita el link si no tiene enlace
                    $this.closest(".autor").children(".ut_tag_info").children(".ut_tag_form").children(".ut_tag_link_span").replaceWith('<span class="ut_tag_link_span">Link</span>');
                }
            } else {
                $this.closest(".autor").append(DEFAULT_TAG);
            }
            $this.closest(".autor").children(".ut_tag_info").on("submit", "form.ut_tag_form", function() {
                // guardamos datos del tag
                var $this = $(this);
                var $tag = $this.children(".ut_tag_tag");
                var $color = $this.children(".ut_tag_color");
                var $link = $this.children(".ut_tag_link");
                var $desc = $this.children(".ut_tag_desc");
                var tag = $tag.val();
                var color = $color.val();
                if (color === "") {
                    // si no se rellena el color, mete uno default
                    var color = "#1392ED";
                }
                var link = $link.val();
                var desc = $desc.val();
                tags[nick] = {
                    tag: tag,
                    color: color,
                    link: link,
                    desc: desc
                };
                // si el tag esta relleno mete y actualiza
                if (tags[nick].tag !== "") {
                    $(':not(form)> div.post > div.autor > dl > dt > a:contains("' + nick + '")').each(function() {
                        $this.closest(".autor").children(".ut_tag").replaceWith('<div class="ut_tag" style="background-color: ' + tags[nick].color + '">' + tags[nick].tag + "</div>");
                        var $tag_form = $this.closest(".autor").children(".ut_tag_info").children(".ut_tag_form");
                        $tag_form.children(".ut_tag_tag").attr("value", tags[nick].tag);
                        $tag_form.children(".ut_tag_color").attr("value", tags[nick].color);
                        $tag_form.children(".ut_tag_link").attr("value", tags[nick].link);
                        $tag_form.children(".ut_tag_link_span").replaceWith('<span class="ut_tag_link_span"><a href="' + tags[nick].link + '" target="_blank">Link</a></span>');
                        $tag_form.children(".ut_tag_desc").text("" + tags[nick].desc + "");
                        // quita el link si no tiene enlace
                        if (tags[nick].link === "") {
                            $tag_form.children(".ut_tag_link_span").replaceWith('<span class="ut_tag_link_span">Link</span>');
                        }
                        $this.closest("div.autor").children(".ut_tag_info").hide();
                    });
                } else {
                    $(':not(form)> div.post > div.autor > dl > dt > a:contains("' + nick + '")').each(function() {
                        delete tags[nick];
                        $this.closest(".autor").children(".ut_tag").replaceWith('<div class="ut_tag ut_tag_vacia" style="background-color: #aaaaaa; opacity: 0.25; width: 9px; height: 15px; overflow: hidden;">+ etiqueta</div>');
                        $this.closest(".autor").children(".ut_tag_info").children(".ut_tag_form").replaceWith('<form class="ut_tag_form">&gt; Tag<br><input class="ut_tag_tag" placeholder="Tag" maxlength="25"><br />&gt; Color<div class="ut_tag_colores" style="display: inline;"><div class="ut_tag_colores_1"></div><div class="ut_tag_colores_2"></div><div class="ut_tag_colores_3"></div><div class="ut_tag_colores_4"></div><div class="ut_tag_colores_5"></div><div class="ut_tag_colores_6"></div></div><br><input class="ut_tag_color" placeholder="#5eadb9" maxlength="26"><br />&gt; <span class="ut_tag_link_span">Link</span><br><input class="ut_tag_link" placeholder="http://"><br />&gt; Descripción<br><textarea placeholder="Descripción" class="ut_tag_desc" style="width: 110px;"></textarea><br /><input type="submit" style="margin-top: 1px;" value="Guardar"></form>');
                        $this.closest("div.autor").children(".ut_tag_info").hide();
                    });
                }
                UT.options.set("-Tags", tags);
                return false;
            });
        });
        // Funciones de los botones
        $(".autor").each(function() {
            var $this = $(this);
            $this.on("click", ".ut_tag, .ut_tag_info_cerrar", function() {
                $this.closest("div.autor").children(".ut_tag_info").toggle();
            });
            $this.on("click", ".ut_tag_colores_1, .ut_tag_colores_2, .ut_tag_colores_3, .ut_tag_colores_4 , .ut_tag_colores_5, .ut_tag_colores_6 ", function() {
                var color = $this.css("background-color");
                $this.closest("div.ut_tag_colores").siblings(".ut_tag_color").attr("value", "" + color + "");
            });
        });
    });
})(jQuery, window.UserTools);

(function($, UT) {
    $(function() {
        var TOGGLE = "<div id='toggle' class='sprite'><div> ";
        var INFO = "<span class='blacklisted-post'" + (UT.isDark ? " style='color: #626262 !important;'" : "") + ">Click en <img src='http://www.mvusertools.com/ext/img/blacklist-mini.png'> para desbloquear.</span>";
        var BARRA = "<div class='nopost barra'> Usuario <span class='mensaje-ocultado'>Blacklisted</span> </div> ";
        var blacklisted = UT.options.get("blacklisted", {});
        //Set Toggle Class
        $("#scrollpages").append(TOGGLE);
        if (UT.options.get("blacklist")) {
            $("#toggle").addClass("toggle-on");
            $("#toggle").removeClass("toggle-off");
        } else {
            $("#toggle").addClass("toggle-off");
            $("#toggle").removeClass("toggle-on");
        }
        //put usernames where they belong.
        $("a[href^='/id/']").each(function() {
            var name = this.href.slice(this.href.lastIndexOf("/") + 1);
            $(this).parent().parent().parent(".autor").data("name", name);
        });
        //$("img[src^='/img/users/avatar']").parent().after("<div class='ancla'><div>");
        $(".autor").each(function() {
            $(this).append("<div class='usertools'><div class='online-pos'><a class='tooltip ut-offline sprite' href='http://www.mediavida.com/id/" + $(this).data("name") + "' original-title='Perfil' ></a></div><div class='mensaje-pos'><a class='tooltip mensaje sprite' href='http://www.mediavida.com/mensajes/nuevo/" + $(this).data("name") + "' original-title='Mensaje'></a></div><div class='firma-pos'><a class='tooltip ut-firma sprite' href='http://www.mediavida.com/id/" + $(this).data("name") + "/firmas' original-title='Firma'></a></div><div class='blacklist-pos'><a class='tooltip blacklist blacklist-off sprite' href='javascript:void(0)' original-title='Blacklist'></a></div></div>");
        });
        $("div.autor dd.online").hide();
        $("div.autor dd.online").parent().parent().find(".ut-offline").toggleClass("ut-online ut-offline");
        //Primera carga del a página. Tapar los posts de la blacklist si procede.
        $("img[src^='/img/users/avatar']").parent().prepend("<div class=''><span></span></div>");
        //$("img[src^='/img/users/avatar']").parent().append("<div class='ancla'><div>");
        //$("img[src^='/img/users/avatar']").after("<div class='tapavatares'></div>")
        $(".autor").each(function() {
            //Pijadas que marcan el post como blacklisted
            var nick = $(this).data("name");
            // INFO & BOTONES & AVATARES
            if (blacklisted[nick]) {
                $(this).find(".blacklist").addClass("blacklist-on");
                $(this).find(".blacklist").removeClass("blacklist-off");
                $(this).parent().find(".info").append(INFO);
            } else {
                $(this).find(".blacklist").addClass("blacklist-off");
                $(this).find(".blacklist").removeClass("blacklist-on");
                $(this).parent().find(".info").append(INFO);
                $(this).parent().find(".blacklisted-post").hide();
                $(this).parent().find(".tapavatares").hide();
            }
            // BARRA
            $(this).parent().before(BARRA);
            if (UT.options.get("blacklist")) {
                if (blacklisted[nick]) {
                    $(this).parent().hide();
                } else {
                    $(this).parent().prev().hide();
                }
            } else {
                $(this).parent().prev().hide();
            }
        });
        // Fin de la primera carga
        $("#toggle").click(function() {
            //	$('#toggle').toggleClass("toggle-on toggle-off");
            if (UT.options.get("blacklist")) {
                $("#toggle").addClass("toggle-off");
                $("#toggle").removeClass("toggle-on");
                UT.options.set("blacklist", false);
            } else {
                $("#toggle").addClass("toggle-on");
                $("#toggle").removeClass("toggle-off");
                UT.options.set("blacklist", true);
            }
            //Tenemos un nuevo estado. Si ahora es on, tenemos que ocultar, si es off tenemos que mostrar
            $(".autor").each(function() {
                var nick = $(this).data("name");
                if (UT.options.get("blacklist")) {
                    if (blacklisted[nick]) {
                        $(this).parent().prev().show();
                        $(this).parent().hide();
                    }
                } else if (blacklisted[nick]) {
                    $(this).parent().prev().hide();
                    $(this).parent().slideDown();
                    $(".social").show();
                }
            });
        });
        // Fin de actualización
        $(".blacklist").click(function() {
            var nick = $(this).parent().parent().parent().data("name");
            if (blacklisted[nick]) {
                console.log("must delete");
                delete blacklisted[nick];
            } else {
                console.log("must not delete");
                console.log(nick);
                console.log(blacklisted);
                blacklisted[nick] = true;
                console.log(blacklisted);
            }
            console.log(blacklisted);
            UT.options.set("blacklisted", blacklisted);
            // En caso de blacklist ON Tapar los posts del autor si ahora esta blacklisted, o mostrarlos en caso contrario.
            // Si esta off, añadir pijadas o quitarlas.
            $(".autor").each(function() {
                var nick = $(this).data("name");
                if (blacklisted[nick]) {
                    $(this).find(".blacklist").addClass("blacklist-on");
                    $(this).find(".blacklist").removeClass("blacklist-off");
                    $(this).parent().find(".blacklisted-post").show();
                    $(this).parent().find(".tapavatares").show();
                } else {
                    $(this).find(".blacklist").addClass("blacklist-off");
                    $(this).find(".blacklist").removeClass("blacklist-on");
                    $(this).parent().find(".blacklisted-post").hide();
                    $(this).parent().find(".tapavatares").hide();
                }
                if (UT.options.get("blacklist")) {
                    if (blacklisted[nick]) {
                        $(this).parent().prev().show();
                        $(this).parent().slideUp();
                    } else {
                        $(this).parent().slideDown();
                        $(this).parent().prev().hide();
                    }
                }
            });
        });
    });
})(jQuery, window.UserTools);

(function($, UT) {
    UT.options.setDefault("mensajeupdate", false);
    $(function() {
        /////////// MENU ///////////////////////////////////////////////////////////////
        var bottominfo = '<p style="margin-top: 20px; font-size: 9px; color: #888888;">Si ves algún fallo prueba siempre a hacer ctrl+f5. Si así no se ha solucionado comunícanoslo con un post en <a href="http://www.mediavida.com/foro/4/mv-usertools-extension-para-firefox-chrome-safari-413818">el hilo oficial</a> indicando navegador y su versión, sistema operativo y, si es posible, una screen del error.<br /><br />Instrucciones y más información en <a href="http://mvusertools.com" target="_blank">la web oficial de la extensión</a>.</p>';
        // Forma del menu
        $('<div id="ut-config" class="last" style="margin-left: 10px;"><ul class="bar" style="margin: 0px 0px 0px 10px; padding: 0px 12px;"><li><a id="ut-menu" class="sprite config uextra" style="cursor: pointer; margin: 0px 0px 0px -5px;"><span class="utmenubutton">Ut</span></a></li></ul></div>').insertAfter("#userinfo");
        $('<div style="display: none;" id="ut-mask-menu"></div>').insertBefore("#background");
        var utmenutabs = '<div id="ut-menu-tabs"><div id="ut-menu-tab1" class="active">Modulos</div><div id="ut-menu-tab2">Estilos</div><div id="ut-menu-tab4">Macros</div><div id="ut-menu-tab3">Sobre MV-UT</div></div>';
        var utmenutabla1 = '<table id="ut-menu-tabla1" class="ut-opciones"><tbody><tr><td>Ventana con aviso y notas de actualización al actualizar.</td><td><span class="ut-boton-sino" id="ut-utmensajeupdate-si">Si</span> <span class="ut-boton-sino" id="ut-utmensajeupdate-no">No</span></td></tr><tr><td>Activar tags (etiquetas).</td><td><span class="ut-boton-sino" id="ut-utTagsOpcion-si">Si</span> <span class="ut-boton-sino" id="ut-utTagsOpcion-no">No</span></td></tr><tr><td>Tener siempre a la vista foros favoritos.</td><td><span class="ut-boton-sino" id="ut-utforosfavs-si">Si</span> <span class="ut-boton-sino" id="ut-utforosfavs-no">No</span></td></tr><tr><td>Activar filtro para hilos en favoritos.</td><td><span class="ut-boton-sino" id="ut-utfiltrarfavs-si">Si</span> <span class="ut-boton-sino" id="ut-utfiltrarfavs-no">No</span></td></tr><td>Links importantes al final de la página</td><td><span class="ut-boton-sino" id="ut-linksfooter-si">Si</span> <span class="ut-boton-sino" id="ut-linksfooter-no">No</span></td></tr><tr style="background: none;"><td><p id="ut-utlinksfooteroscuro" style="color: #999999;">Links importantes estilo oscuro usando theme predeterminado</p></td><td><span class="ut-boton-sino" id="ut-utlinksfooteroscuro-si">Si</span> <span class="ut-boton-sino" id="ut-utlinksfooteroscuro-no">No</span></td></tr><tr><td>Tabla de mods</td><td><span class="ut-boton-sino" id="ut-uttablamods-si">Si</span> <span class="ut-boton-sino" id="ut-uttablamods-no">No</span></td></tr><tr><td>Información del usuario al dejar el ratón sobre su nick</td><td><span class="ut-boton-sino" id="ut-utuserinfo-si">Si</span> <span class="ut-boton-sino" id="ut-utuserinfo-no">No</span></td></tr><tr><td>Opción para ordenar hilos por respuestas sin leer</td><td><span class="ut-boton-sino" id="ut-utordenarposts-si">Si</span> <span class="ut-boton-sino" id="ut-utordenarposts-no">No</span></td></tr><tr><td>Avisos en el favicon</td><td><span class="ut-boton-sino" id="ut-utfavicon-si">Si</span> <span class="ut-boton-sino" id="ut-utfavicon-no">No</span></td></tr><tr><td>Botón para ensanchar streams en hilos con Live! y postit (Experimental)</td><td><span class="ut-boton-sino" id="ut-utbigscreen-si">Si</span> <span class="ut-boton-sino" id="ut-utbigscreen-no">No</span></td></tr><tr><td>Recupera el texto escrito en el formulario extendido si se cierra la pestaña o navegador (Experimental)</td><td><span class="ut-boton-sino" id="ut-utsalvarposts-si">Si</span> <span class="ut-boton-sino" id="ut-utsalvarposts-no">No</span></td></tr></tbody></table>';
        var utmenutabla2 = '<table id="ut-menu-tabla2" class="ut-opciones" style="display: none;"><tbody><tr><td>Marcapáginas</td><td><span class="ut-boton-sino" id="ut-utmarcapaginas-si">Si</span> <span class="ut-boton-sino" id="ut-utmarcapaginas-no">No</span></td></tr><tr><td>Hilos con Live! activado destacados (solo para theme predeterminado)</td><td><span class="ut-boton-sino" id="ut-utlivesdestacados-si">Si</span> <span class="ut-boton-sino" id="ut-utlivesdestacados-no">No</span></td></tr><tr><td>Nuevo estilo para los spoilers</td><td><span class="ut-boton-sino" id="ut-utestilospoilers-si">Si</span> <span class="ut-boton-sino" id="ut-utestilospoilers-no">No</span></td></tr><tr><td>Quitar ventanas flotantes en Avisos, Favs y Msj dejandolo como antes</td><td><span class="ut-boton-sino" id="ut-utantiguoslinksuserinfo-si">Si</span> <span class="ut-boton-sino" id="ut-utantiguoslinksuserinfo-no">No</span></td></tr><tr><td>Cambiar algunos nombres de usuarios y foros</td><td><span class="ut-boton-sino" id="ut-utCambiosNombre-si">Si</span> <span class="ut-boton-sino" id="ut-utCambiosNombre-no">No</span></td></tr><tr><td>Añadir botón para cerrar spoilers al final del mismo</td><td><span class="ut-boton-sino" id="ut-utcerrarspoilers-si">Si</span> <span class="ut-boton-sino" id="ut-utcerrarspoilers-no">No</span></td></tr></tbody></table>';
        var utmenutabla3 = '<table id="ut-menu-tabla3" style="display: none;"><tbody><tr><td><a href="http://mvusertools.com" target="_blank"><img src="http://www.mediavida.com/img/f/mediavida/2012/11/55268_mv_usertools_extension_para_firefox_chrome_opera_safari_0_full.png" width="48" height="48"><p>MV-Usertools</a> desarrollado por <a href="/id/Vegon">Vegon</a> y <a href="/id/cm07">cm07</a></p><br /><br /><p><a style="cursor: pointer;" id="ut-menu-notasdeparche">Notas del último parche.</a> Versión ' + UT.version + '.</p><br /><p>Atajos de teclado:<ul><li>- Ir a Favoritos: ctrl+alt+e</li><li>- Ir a Perfil: ctrl+alt+q</li><li>- Ir a Avisos: ctrl+alt+w</li><li>- Ir a Mensajes: ctrl+alt+r</li><li>- Ir a Foros: ctrl+alt+a</li><li>- Ir a Spy: ctrl+alt+d</li><li>- Abrir/Cerrar todos los spoilers: ctrl+alt+s</li><li>- Ir a la anterior página del hilo: ctrl+alt+z</li><li>- Ir a la siguiente página del hilo: ctrl+alt+x</li></ul></p><br /><br /><p>Para comunicar bugs usa el <a href="http://www.mediavida.com/foro/4/mv-usertools-extension-para-firefox-chrome-opera-safari-413818">hilo oficial</a>. Si tienes dudas de como funciona algun modulo u opción visita el <a href="http://mvusertools.com/caracteristicas">manual en la web oficial</a> que siempre está actualizado con las ultimas novedades.</p><br /><br /><p>Si las MV-Usertools te resultan utiles y quieres agradecernos las horas de trabajo detrás de ellas, tiranos algunas monedas.</p><br /><form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="2TD967SQAC6HC"><input type="image" src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal. La forma rápida y segura de pagar en Internet."><img alt="" border="0" src="https://www.paypalobjects.com/es_ES/i/scr/pixel.gif" width="1" height="1"></form></td></tr></tbody></table>';
        var utmenutabla4 = '<table id="ut-menu-tabla4" style="display: none;"><tbody><tr><td><form id="ut-macros-form"><input id="ut-title" placeholder="Título" maxlength="17"><br /><textarea id="ut-macro" placeholder="Macro"></textarea><br /><input type="submit" value="Guardar" style="margin-top: 3px;" ></form><ul id="ut-macros"></ul></td></tr></tbody></table>';
        $('<div style="display: none;" id="ut-dialog-menu"><div id="ut-window"><div id="ut-menu-contenido">' + utmenutabs + "" + utmenutabla1 + "" + utmenutabla2 + "" + utmenutabla4 + "" + utmenutabla3 + "</div>" + bottominfo + '<a style="float: right; margin-top: 10px; cursor: pointer;" id="ut-menu-cerrar">Cerrar</a></div></div>').insertBefore("#content_head");
        $("#ut-menu-tabla1 tr:odd, #ut-menu-tabla2 tr:odd, #ut-menu-tabla3 tr:odd").addClass("odd");
        $("#ut-menu-tab1").click(function() {
            $("#ut-menu-tab1").addClass("active");
            $("#ut-menu-tab2").removeClass("active");
            $("#ut-menu-tab3").removeClass("active");
            $("#ut-menu-tab4").removeClass("active");
            $("#ut-menu-tabla1").show();
            $("#ut-menu-tabla2").hide();
            $("#ut-menu-tabla3").hide();
            $("#ut-menu-tabla4").hide();
        });
        $("#ut-menu-tab2").click(function() {
            $("#ut-menu-tab1").removeClass("active");
            $("#ut-menu-tab2").addClass("active");
            $("#ut-menu-tab3").removeClass("active");
            $("#ut-menu-tab4").removeClass("active");
            $("#ut-menu-tabla1").hide();
            $("#ut-menu-tabla2").show();
            $("#ut-menu-tabla3").hide();
            $("#ut-menu-tabla4").hide();
        });
        $("#ut-menu-tab3").click(function() {
            $("#ut-menu-tab1").removeClass("active");
            $("#ut-menu-tab2").removeClass("active");
            $("#ut-menu-tab3").addClass("active");
            $("#ut-menu-tab4").removeClass("active");
            $("#ut-menu-tabla1").hide();
            $("#ut-menu-tabla2").hide();
            $("#ut-menu-tabla3").show();
            $("#ut-menu-tabla4").hide();
        });
        $("#ut-menu-tab4").click(function() {
            $("#ut-menu-tab1").removeClass("active");
            $("#ut-menu-tab2").removeClass("active");
            $("#ut-menu-tab3").removeClass("active");
            $("#ut-menu-tab4").addClass("active");
            $("#ut-menu-tabla1").hide();
            $("#ut-menu-tabla2").hide();
            $("#ut-menu-tabla3").hide();
            $("#ut-menu-tabla4").show();
        });
        $("#ut-menu").click(function() {
            $("#ut-mask-menu").show();
            $("#ut-dialog-menu").show();
        });
        $("#ut-menu-cerrar").click(function() {
            $("#ut-dialog-menu").hide();
            $("#ut-mask-menu").hide();
        });
        $("#ut-mask-menu").click(function() {
            $("#ut-dialog-menu").hide();
            $("#ut-mask-menu").hide();
        });
        var nicklenght = $('#userinfo a[href^="/id/"]').text().length;
        if (nicklenght > 10) {
            $("#nav_bar #buscar").css("width", "130px");
            $("#nav_bar #sbii").css("width", "93px");
            $("#nav_bar .bbii").css("left", "103px");
        }
        if (nicklenght == 7) {
            $("#nav_bar #buscar").css("width", "170px");
            $("#nav_bar #sbii").css("width", "133px");
            $("#nav_bar .bbii").css("left", "143px");
        }
        // Mensaje al updatear
        var patch_notes = '<p style="font-size: 16px; font-weight: bold;">Actualización ' + UT.version + "</p> <br /><br /> -" + UT.patchNotes.join("<br />- ") + " <br /><br />";
        $('<div style="display: none" id="ut-mask"></div>').insertBefore("#background");
        $('<div style="display: none" id="ut-dialog"><a href="http://mvusertools.com" target="_blank"><img style="margin: 0 150px;" src="http://www.mediavida.com/img/f/mediavida/2012/10/02632_mv_usertools_extension_para_firefox_chrome_safari_0_full.png"></a><div id="ut-window">' + patch_notes + "" + bottominfo + '<a style="float: right; margin-top: 10px; cursor: pointer;" id="ut-box-cerrar">Cerrar</a></div></div>').insertBefore("#content_head");
        if (UT.options.get("mensajeupdate")) {
            if (UT.options.get("versionls") !== UT.version) {
                $("div#ut-mask").show();
                $("div#ut-dialog").show();
            }
        }
        UT.options.set("versionls", UT.version);
        $("#ut-menu-notasdeparche").click(function() {
            $("#ut-dialog-menu").hide();
            $("#ut-mask-menu").hide();
            $("div#ut-mask").show();
            $("div#ut-dialog").show();
        });
        $("#ut-box-cerrar").click(function() {
            $("div#ut-mask").hide();
            $("div#ut-dialog").hide();
        });
        $("#ut-mask").click(function() {
            $("div#ut-mask").hide();
            $("div#ut-dialog").hide();
        });
        // Version en el footer
        if (typeof UT.version === undefined) {
            $("div#footer div.f_info p").append('• <a href="http://mvusertools.com" target="_blank">MV-Usertools</a>');
        } else {
            $("div#footer div.f_info p").append('• <a href="http://mvusertools.com" target="_blank">MV-Usertools</a> ' + UT.version + "");
        }
        // Estilos de opciones
        var ON_COLOR = "#EF5000";
        var OFF_COLOR = "#999999";
        var OSCURO_COLOR = "#222222";
        var optionMarkup = function(opcion) {
            var $si = $("#ut-ut" + opcion + "-si");
            var $no = $("#ut-ut" + opcion + "-no");
            $si.click(function() {
                UT.options.set(opcion, true);
                $si.css("color", ON_COLOR);
                $no.css("color", OFF_COLOR);
            });
            $no.click(function() {
                UT.options.set(opcion, false);
                $si.css("color", OFF_COLOR);
                $no.css("color", ON_COLOR);
            });
            var enabled = UT.options.get(opcion);
            $si.css("color", enabled ? ON_COLOR : OFF_COLOR);
            $no.css("color", enabled ? OFF_COLOR : ON_COLOR);
        };
        // Cambiar el markup en el menú
        optionMarkup("ordenarposts");
        optionMarkup("bigscreen");
        optionMarkup("estilospoilers");
        optionMarkup("userinfo");
        optionMarkup("newquote");
        optionMarkup("livesdestacados");
        optionMarkup("iconosdestacados");
        optionMarkup("iconosportada");
        optionMarkup("marcapaginas");
        optionMarkup("tablamods");
        optionMarkup("favicon");
        optionMarkup("forosfavs");
        optionMarkup("filtrarfavs");
        optionMarkup("CambiosNombre");
        optionMarkup("TagsOpcion");
        optionMarkup("salvarposts");
        optionMarkup("mensajeupdate");
        optionMarkup("linksfooteroscuro");
        optionMarkup("antiguoslinksuserinfo");
        optionMarkup("cerrarspoilers");
        // Boton de utlinksfooter. Tiene funciones extras, no es posible usar el constructor.
        $("#ut-linksfooter-si").click(function() {
            UT.options.set("linksfooter", true);
            $("#ut-linksfooter-no").css("color", OFF_COLOR);
            $("#ut-linksfooter-si").css("color", ON_COLOR);
            $("#ut-utlinksfooteroscuro").css("color", OSCURO_COLOR);
        });
        $("#ut-linksfooter-no").click(function() {
            UT.options.set("linksfooter", false);
            $("#ut-linksfooter-si").css("color", OFF_COLOR);
            $("#ut-linksfooter-no").css("color", ON_COLOR);
            $("#ut-utlinksfooteroscuro").css("color", OFF_COLOR);
        });
        if (UT.options.get("linksfooter")) {
            $("#ut-linksfooter-no").css("color", OFF_COLOR);
            $("#ut-utlinksfooteroscuro").css("color", OSCURO_COLOR);
        } else {
            $("#ut-linksfooter-si").css("color", OFF_COLOR);
            $("#ut-utlinksfooteroscuro").css("color", OFF_COLOR);
        }
    });
})(jQuery, window.UserTools);

/*
 * Sistema de macros.
 */
(function($, UT) {
    var macros = UT.options.get("macros", {});
    // Functions
    // TODO: mejorable
    var updateMacros = function(store, $container) {
        var macros = {};
        $container.children().each(function() {
            var $macro = $(this);
            var title = $macro.data("macro");
            if (typeof store[title] === "undefined") {
                $macro.slideUp("slow", function() {
                    $macro.remove();
                });
            } else {
                macros[title] = $macro;
            }
        });
        var title;
        for (title in store) {
            if (typeof macros[title] === "undefined") {
                var $spantitle = $('<span class="ut-titletxt">').text(title);
                var $spanmacro = $('<div class="ut-macrotxt"' + (UT.isDark ? ' style="color: #EEEEEE;"' : "") + ">").text(store[title]);
                var $title = $("<a>").html(' <a style="cursor:pointer;" title="Borrar macro" class="ut-remove-macro"><i class="sprite UT-trash-orange"></i></a>').prepend($spantitle).append($spanmacro);
                // solo +title+ para la lista de titulos
                $('<li class="ut-titleymacro">').data("macro", title).append($title).hide().appendTo($container).slideDown("slow");
            }
        }
    };
    // TODO: mejorable
    var updateMacrosButton = function(store, $container) {
        var macros = {};
        $container.children().each(function() {
            var $macro = $(this);
            var title = $macro.data("macro");
            if (!(title in store)) {
                $macro.slideUp("slow", function() {
                    $macro.remove();
                });
            } else {
                macros[title] = $macro;
            }
        });
        var title;
        for (title in store) {
            if (!(title in macros)) {
                var $spantitle = $('<span class="ut-titletxt-list">').text(title);
                var $title = $("<div>").html(" ").prepend($spantitle);
                $('<li class="ut-titleymacro-list">').data("macro", title).append($title).hide().appendTo($container).slideDown("slow");
            }
        }
    };
    // Visual shit
    $(function() {
        var $macros = $("#ut-macros");
        var $macrosbutton = $("#ut-button-macros-list ul");
        var $macroslist = $("#ut-button-macros-list");
        var $title = $("#ut-title");
        var $macro_text = $("#ut-macro");
        updateMacros(macros, $macros);
        updateMacrosButton(macros, $macrosbutton);
        $("#ut-macros-form").submit(function() {
            var title = $title.val();
            var text = $macro_text.val();
            if (title !== "" && text !== "") {
                macros[title] = text;
                UT.options.set("macros", macros);
                $title.val("");
                $macro_text.val("");
                updateMacros(macros, $macros);
                updateMacrosButton(macros, $macrosbutton);
            }
            return false;
        });
        $macros.on("click", "a.ut-remove-macro", function() {
            delete macros[$(this).parent().parent().data("macro")];
            UT.options.set("macros", macros);
            updateMacros(macros, $macros);
            updateMacros(macros, $macrosbutton);
            return false;
        });
        var $cuerpo = $("textarea#cuerpo");
        $macrosbutton.on("click", "li", function() {
            $cuerpo.insertAtCaretPos(macros[$(this).data("macro")]);
            $macroslist.hide();
            return false;
        });
        if ($("#goext").length > 0 || UT.live) {
            $macroslist.addClass("ut-button-macros-list-barrendera");
        }
    });
})(jQuery, window.UserTools);