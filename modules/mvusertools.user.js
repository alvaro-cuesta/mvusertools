// ==UserScript==
// @name           MV-Usertools
// @namespace      MVusertools
// @version        1.10.1
// @description    Añade controles avanzados a los posts en MV
// @grant          GM_addStyle
// @include        http://www.mediavida.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require        http://www.mvusertools.com/ext/libs/tinycon.min.js
// @require        http://www.mvusertools.com/ext/libs/jquery.a-tools-1.5.2.js
// @require        http://www.mvusertools.com/ext/libs/sisyphus.js
// @require        http://www.mvusertools.com/ext/libs/mousetrap.js
// @require        http://www.mvusertools.com/ext/libs/jquery.scrollto.js
// ==/UserScript==

JSON = {
    encode: JSON.encode || JSON.stringify,
    decode: JSON.decode || JSON.parse
};

UserTools = window.UserTools = {
    options: {
	get: function(opcion, defecto) {
	    opcion = 'ut' + opcion;
	    var valor = localStorage.getItem(opcion);

            if (valor !== null) {
		return JSON.decode(valor);
            } else {
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












////// VARIABLES REUTILIZABLES //////
/*CAMBIAR VERSIÓN*/
var utversion = '1.10.1';
var bbcode = new Array();
var bbtags = new Array("[b]", "[/b]", "[i]", "[/i]", "[u]", "[/u]", "[url]", "[/url]", "[url=]", "[/url]", "[img]", "[/img]", "[video]", "[/video]", "[spoiler]", "[/spoiler]", "[spoiler=]", "[/spoiler]", "[spoiler=NSFW]", "[/spoiler]", "[code]", "[/code]", "[center]", "[/center]", "[s]", "[/s]", "[bar]", "[/bar]", "[list]", "[/list]", "[audio]", "[/audio]");
var theSelection = false;
var clientPC = navigator.userAgent.toLowerCase();
var clientVer = parseInt(navigator.appVersion);
var is_ie = ((clientPC.indexOf("msie") != -1) && (clientPC.indexOf("opera") == -1));
var is_win = ((clientPC.indexOf("win") != -1) || (clientPC.indexOf("16bit") != -1));
var baseHeight;
var utnoti = jQuery('#userinfo a[href^="/foro/favoritos"] strong.bubble').html();
var utavisos = jQuery('#userinfo a[href^="/notificaciones"] strong.bubble').html();
var utmsj = jQuery('#userinfo a[href^="/mensajes"] strong.bubble').html();
////// VARIABLES REUTILIZABLES //////



function initInsertions() {
    var b;
    if (document.forms[form_name]) {
        b = document;
    } else {
        b = opener.document;
    }
    var a = b.forms[form_name].elements[text_name];
    if (is_ie && typeof (baseHeight) != "number") {
        a.focus();
        baseHeight = b.selection.createRange().duplicate().boundingHeight;
        if (!document.forms[form_name]) {
            document.body.focus();
        }
    }
}

function bbstyle2(a) {
    if (a >= 0 && a <= 30) {
        bbfontstyle(bbtags[a], bbtags[a + 1]);
    } else
        console.log("fuera de rango");
}

function bbfontstyle(b, f) {
    theSelection = false;
    var d = document.forms[form_name].elements[text_name];
    d.focus();
    if ((clientVer >= 4) && is_ie && is_win) {
        theSelection = document.selection.createRange().text;
        if (theSelection) {
            document.selection.createRange().text = b + theSelection + f;
            document.forms[form_name].elements[text_name].focus();
            theSelection = "";
            return;
        }
    } else {
        if (document.forms[form_name].elements[text_name].selectionEnd && (document.forms[form_name].elements[text_name].selectionEnd - document.forms[form_name].elements[text_name].selectionStart > 0)) {
            mozWrap(document.forms[form_name].elements[text_name], b, f);
            document.forms[form_name].elements[text_name].focus();
            theSelection = "";
            return;
        }
    }
    var a = getCaretPosition(d).start;
    var c = a + b.length;
    insert_text(b + f);
    if (!isNaN(d.selectionStart)) {
        d.selectionStart = c;
        d.selectionEnd = c;
    } else {
        if (document.selection) {
            var e = d.createTextRange();
            e.move("character", c);
            e.select();
            storeCaret(d);
        }
    }
    d.focus();
    return;
}

function insert_text(g, d, c) {
    var b;
    if (!c) {
        b = document.forms[form_name].elements[text_name];
    } else {
        b = opener.document.forms[form_name].elements[text_name];
    }
    if (d) {
        g = " " + g + " ";
    }
    if (!isNaN(b.selectionStart)) {
        var f = b.selectionStart;
        var e = b.selectionEnd;
        mozWrap(b, g, "");
        b.selectionStart = f + g.length;
        b.selectionEnd = e + g.length;
    } else {
        if (b.createTextRange && b.caretPos) {
            if (baseHeight != b.caretPos.boundingHeight) {
                b.focus();
                storeCaret(b);
            }
            var a = b.caretPos;
            a.text = a.text.charAt(a.text.length - 1) == " " ? a.text + g + " " : a.text + g;
        } else {
            b.value = b.value + g;
        }
    }
    if (!c) {
        b.focus();
    }
}

function mozWrap(g, d, j) {
    var c = g.textLength;
    var a = g.selectionStart;
    var e = g.selectionEnd;
    var b = g.scrollTop;
    if (e == 1 || e == 2) {
        e = c;
    }
    var i = (g.value).substring(0, a);
    var h = (g.value).substring(a, e);
    var f = (g.value).substring(e, c);
    g.value = i + d + h + j + f;
    g.selectionStart = e + d.length + j.length;
    g.selectionEnd = g.selectionStart;
    g.focus();
    g.scrollTop = b;
    return;
}

function storeCaret(a) {
    if (a.createTextRange) {
        a.caretPos = document.selection.createRange().duplicate();
    }
}

function caretPosition() {
    var b = null;
    var a = null;
}

function getCaretPosition(e) {
    var c = new caretPosition();
    if (e.selectionStart || e.selectionStart == 0) {
        c.start = e.selectionStart;
        c.end = e.selectionEnd;
    } else {
        if (document.selection) {
            var a = document.selection.createRange();
            var b = document.body.createTextRange();
            b.moveToElementText(e);
            var d;
            for (d = 0; b.compareEndPoints("StartToStart", a) < 0; d++) {
                b.moveStart("character", 1);
            }
            e.sel_start = d;
            c.start = e.sel_start;
            c.end = e.sel_start;
        }
    }
    return c;
}
// Fin de la magia

//Cosas de Vegon

var blacklistBarra = "<div class='nopost barra'> \
Usuario <span class='mensaje-ocultado'>Blacklisted</span> \
</div> ";

var balcklistToggle = "<div id='toggle' class='sprite'><div> ";

var blacklistInfo = "<span class='blacklisted-post'" + (UserTools.isDark ? " style='color: #626262 !important;'" : "") + ">Click en <img src='http://www.mvusertools.com/ext/img/blacklist-mini.png'> para desbloquear.</span>";

var blacklistAvatar = "~";


/////////// MENU ///////////////////////////////////////////////////////////////
var bottominfo = '<p style="margin-top: 20px; font-size: 9px; color: #888888;">Si ves algún fallo prueba siempre a hacer ctrl+f5. Si así no se ha solucionado comunícanoslo con un post en <a href="http://www.mediavida.com/foro/4/mv-usertools-extension-para-firefox-chrome-safari-413818">el hilo oficial</a> indicando navegador y su versión, sistema operativo y, si es posible, una screen del error.<br /><br />Instrucciones y más información en <a href="http://mvusertools.com" target="_blank">la web oficial de la extensión</a>.</p>';

// Forma del menu
jQuery('<div id="ut-config" class="last" style="margin-left: 10px;"><ul class="bar" style="margin: 0px 0px 0px 10px; padding: 0px 12px;"><li><a id="ut-menu" class="sprite config uextra" style="cursor: pointer; margin: 0px 0px 0px -5px;"><span class="utmenubutton">Ut</span></a></li></ul></div>').insertAfter('#userinfo');
jQuery('<div style="display: none;" id="ut-mask-menu"></div>').insertBefore('#background');
var utmenutabs = '<div id="ut-menu-tabs"><div id="ut-menu-tab1" class="active">Modulos</div><div id="ut-menu-tab2">Estilos</div><div id="ut-menu-tab4">Macros</div><div id="ut-menu-tab3">Sobre MV-UT</div></div>';
var utmenutabla1 = '<table id="ut-menu-tabla1" class="ut-opciones"><tbody><tr><td>Ventana con aviso y notas de actualización al actualizar.</td><td><span class="ut-boton-sino" id="ut-utmensajeupdate-si">Si</span> <span class="ut-boton-sino" id="ut-utmensajeupdate-no">No</span></td></tr><tr><td>Activar tags (etiquetas).</td><td><span class="ut-boton-sino" id="ut-utTagsOpcion-si">Si</span> <span class="ut-boton-sino" id="ut-utTagsOpcion-no">No</span></td></tr><tr><td>Tener siempre a la vista foros favoritos.</td><td><span class="ut-boton-sino" id="ut-utforosfavs-si">Si</span> <span class="ut-boton-sino" id="ut-utforosfavs-no">No</span></td></tr><tr><td>Activar filtro para hilos en favoritos.</td><td><span class="ut-boton-sino" id="ut-utfiltrarfavs-si">Si</span> <span class="ut-boton-sino" id="ut-utfiltrarfavs-no">No</span></td></tr><td>Links importantes al final de la página</td><td><span class="ut-boton-sino" id="ut-linksfooter-si">Si</span> <span class="ut-boton-sino" id="ut-linksfooter-no">No</span></td></tr><tr style="background: none;"><td><p id="ut-utlinksfooteroscuro" style="color: #999999;">Links importantes estilo oscuro usando theme predeterminado</p></td><td><span class="ut-boton-sino" id="ut-utlinksfooteroscuro-si">Si</span> <span class="ut-boton-sino" id="ut-utlinksfooteroscuro-no">No</span></td></tr><tr><td>Tabla de mods</td><td><span class="ut-boton-sino" id="ut-uttablamods-si">Si</span> <span class="ut-boton-sino" id="ut-uttablamods-no">No</span></td></tr><tr><td>Información del usuario al dejar el ratón sobre su nick</td><td><span class="ut-boton-sino" id="ut-utuserinfo-si">Si</span> <span class="ut-boton-sino" id="ut-utuserinfo-no">No</span></td></tr><tr><td>Opción para ordenar hilos por respuestas sin leer</td><td><span class="ut-boton-sino" id="ut-utordenarposts-si">Si</span> <span class="ut-boton-sino" id="ut-utordenarposts-no">No</span></td></tr><tr><td>Avisos en el favicon</td><td><span class="ut-boton-sino" id="ut-utfavicon-si">Si</span> <span class="ut-boton-sino" id="ut-utfavicon-no">No</span></td></tr><tr><td>Botón para ensanchar streams en hilos con Live! y postit (Experimental)</td><td><span class="ut-boton-sino" id="ut-utbigscreen-si">Si</span> <span class="ut-boton-sino" id="ut-utbigscreen-no">No</span></td></tr><tr><td>Recupera el texto escrito en el formulario extendido si se cierra la pestaña o navegador (Experimental)</td><td><span class="ut-boton-sino" id="ut-utsalvarposts-si">Si</span> <span class="ut-boton-sino" id="ut-utsalvarposts-no">No</span></td></tr></tbody></table>';
var utmenutabla2 = '<table id="ut-menu-tabla2" class="ut-opciones" style="display: none;"><tbody><tr><td>Marcapáginas</td><td><span class="ut-boton-sino" id="ut-utmarcapaginas-si">Si</span> <span class="ut-boton-sino" id="ut-utmarcapaginas-no">No</span></td></tr><tr><td>Hilos con Live! activado destacados (solo para theme predeterminado)</td><td><span class="ut-boton-sino" id="ut-utlivesdestacados-si">Si</span> <span class="ut-boton-sino" id="ut-utlivesdestacados-no">No</span></td></tr><tr><td>Nuevo estilo para los spoilers</td><td><span class="ut-boton-sino" id="ut-utestilospoilers-si">Si</span> <span class="ut-boton-sino" id="ut-utestilospoilers-no">No</span></td></tr><tr><td>Quitar ventanas flotantes en Avisos, Favs y Msj dejandolo como antes</td><td><span class="ut-boton-sino" id="ut-utantiguoslinksuserinfo-si">Si</span> <span class="ut-boton-sino" id="ut-utantiguoslinksuserinfo-no">No</span></td></tr><tr><td>Cambiar algunos nombres de usuarios y foros</td><td><span class="ut-boton-sino" id="ut-utCambiosNombre-si">Si</span> <span class="ut-boton-sino" id="ut-utCambiosNombre-no">No</span></td></tr><tr><td>Añadir botón para cerrar spoilers al final del mismo</td><td><span class="ut-boton-sino" id="ut-utcerrarspoilers-si">Si</span> <span class="ut-boton-sino" id="ut-utcerrarspoilers-no">No</span></td></tr></tbody></table>';
var utmenutabla3 = '<table id="ut-menu-tabla3" style="display: none;"><tbody><tr><td><a href="http://mvusertools.com" target="_blank"><img src="http://www.mediavida.com/img/f/mediavida/2012/11/55268_mv_usertools_extension_para_firefox_chrome_opera_safari_0_full.png" width="48" height="48"><p>MV-Usertools</a> desarrollado por <a href="/id/Vegon">Vegon</a> y <a href="/id/cm07">cm07</a></p><br /><br /><p><a style="cursor: pointer;" id="ut-menu-notasdeparche">Notas del último parche.</a> Versión ' + utversion + '.</p><br /><p>Atajos de teclado:<ul><li>- Ir a Favoritos: ctrl+alt+e</li><li>- Ir a Perfil: ctrl+alt+q</li><li>- Ir a Avisos: ctrl+alt+w</li><li>- Ir a Mensajes: ctrl+alt+r</li><li>- Ir a Foros: ctrl+alt+a</li><li>- Ir a Spy: ctrl+alt+d</li><li>- Abrir/Cerrar todos los spoilers: ctrl+alt+s</li><li>- Ir a la anterior página del hilo: ctrl+alt+z</li><li>- Ir a la siguiente página del hilo: ctrl+alt+x</li></ul></p><br /><br /><p>Para comunicar bugs usa el <a href="http://www.mediavida.com/foro/4/mv-usertools-extension-para-firefox-chrome-opera-safari-413818">hilo oficial</a>. Si tienes dudas de como funciona algun modulo u opción visita el <a href="http://mvusertools.com/caracteristicas">manual en la web oficial</a> que siempre está actualizado con las ultimas novedades.</p><br /><br /><p>Si las MV-Usertools te resultan utiles y quieres agradecernos las horas de trabajo detrás de ellas, tiranos algunas monedas.</p><br /><form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="2TD967SQAC6HC"><input type="image" src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal. La forma rápida y segura de pagar en Internet."><img alt="" border="0" src="https://www.paypalobjects.com/es_ES/i/scr/pixel.gif" width="1" height="1"></form></td></tr></tbody></table>';
var utmenutabla4 = '<table id="ut-menu-tabla4" style="display: none;"><tbody><tr><td><form id="ut-macros-form"><input id="ut-title" placeholder="Título" maxlength="17"><br /><textarea id="ut-macro" placeholder="Macro"></textarea><br /><input type="submit" value="Guardar" style="margin-top: 3px;" ></form><ul id="ut-macros"></ul></td></tr></tbody></table>';
jQuery('<div style="display: none;" id="ut-dialog-menu"><div id="ut-window"><div id="ut-menu-contenido">' + utmenutabs + '' + utmenutabla1 + '' + utmenutabla2 + '' + utmenutabla4 + '' + utmenutabla3 + '</div>' + bottominfo + '<a style="float: right; margin-top: 10px; cursor: pointer;" id="ut-menu-cerrar">Cerrar</a></div></div>').insertBefore('#content_head');
jQuery('#ut-menu-tabla1 tr:odd, #ut-menu-tabla2 tr:odd, #ut-menu-tabla3 tr:odd').addClass('odd');
jQuery('#ut-menu-tab1').click(function () {
    jQuery('#ut-menu-tab1').addClass('active');
    jQuery('#ut-menu-tab2').removeClass('active');
    jQuery('#ut-menu-tab3').removeClass('active');
    jQuery('#ut-menu-tab4').removeClass('active');
    jQuery('#ut-menu-tabla1').show();
    jQuery('#ut-menu-tabla2').hide();
    jQuery('#ut-menu-tabla3').hide();
    jQuery('#ut-menu-tabla4').hide();
});
jQuery('#ut-menu-tab2').click(function () {
    jQuery('#ut-menu-tab1').removeClass('active');
    jQuery('#ut-menu-tab2').addClass('active');
    jQuery('#ut-menu-tab3').removeClass('active');
    jQuery('#ut-menu-tab4').removeClass('active');
    jQuery('#ut-menu-tabla1').hide();
    jQuery('#ut-menu-tabla2').show();
    jQuery('#ut-menu-tabla3').hide();
    jQuery('#ut-menu-tabla4').hide();
});
jQuery('#ut-menu-tab3').click(function () {
    jQuery('#ut-menu-tab1').removeClass('active');
    jQuery('#ut-menu-tab2').removeClass('active');
    jQuery('#ut-menu-tab3').addClass('active');
    jQuery('#ut-menu-tab4').removeClass('active');
    jQuery('#ut-menu-tabla1').hide();
    jQuery('#ut-menu-tabla2').hide();
    jQuery('#ut-menu-tabla3').show();
    jQuery('#ut-menu-tabla4').hide();
});
jQuery('#ut-menu-tab4').click(function () {
    jQuery('#ut-menu-tab1').removeClass('active');
    jQuery('#ut-menu-tab2').removeClass('active');
    jQuery('#ut-menu-tab3').removeClass('active');
    jQuery('#ut-menu-tab4').addClass('active');
    jQuery('#ut-menu-tabla1').hide();
    jQuery('#ut-menu-tabla2').hide();
    jQuery('#ut-menu-tabla3').hide();
    jQuery('#ut-menu-tabla4').show();
});
jQuery('#ut-menu').click(function () {
    jQuery('#ut-mask-menu').show();
    jQuery('#ut-dialog-menu').show();
});
jQuery('#ut-menu-cerrar').click(function () {
    jQuery('#ut-dialog-menu').hide();
    jQuery('#ut-mask-menu').hide();
});
jQuery('#ut-mask-menu').click(function () {
    jQuery('#ut-dialog-menu').hide();
    jQuery('#ut-mask-menu').hide();
});
var nicklenght = jQuery('#userinfo a[href^="/id/"]').text().length;
jQuery(function () {
    if (nicklenght > 10) {
        jQuery('#nav_bar #buscar').css('width', '130px');
        jQuery('#nav_bar #sbii').css('width', '93px');
        jQuery('#nav_bar .bbii').css('left', '103px');
    }
});
jQuery(function () {
    if (nicklenght == 7) {
        jQuery('#nav_bar #buscar').css('width', '170px');
        jQuery('#nav_bar #sbii').css('width', '133px');
        jQuery('#nav_bar .bbii').css('left', '143px');
    }
});

// Mensaje al updatear
var utversionls = localStorage["utversionls"];
var utpatchnotes = '<p style="font-size: 16px; font-weight: bold;">Actualización ' + utversion + '</p><br /><br />\
- Corrección de errores.<br /><br />\
';
jQuery('<div style="display: none" id="ut-mask"></div>').insertBefore('#background');
jQuery('<div style="display: none" id="ut-dialog"><a href="http://mvusertools.com" target="_blank"><img style="margin: 0 150px;" src="http://www.mediavida.com/img/f/mediavida/2012/10/02632_mv_usertools_extension_para_firefox_chrome_safari_0_full.png"></a><div id="ut-window">' + utpatchnotes + '' + bottominfo + '<a style="float: right; margin-top: 10px; cursor: pointer;" id="ut-box-cerrar">Cerrar</a></div></div>').insertBefore('#content_head');
jQuery(function () {
    if (UserTools.options.get('mensajeupdate')) {
        if (utversionls != utversion) {
            jQuery('div#ut-mask').show();
            jQuery('div#ut-dialog').show();
            localStorage["utversionls"] = utversion;
        }
    } else {
        localStorage["utversionls"] = utversion;
    }

    jQuery('#ut-menu-notasdeparche').click(function () {
        jQuery('#ut-dialog-menu').hide();
        jQuery('#ut-mask-menu').hide();
        jQuery('div#ut-mask').show();
        jQuery('div#ut-dialog').show();
    });
    jQuery('#ut-box-cerrar').click(function () {
        jQuery('div#ut-mask').hide();
        jQuery('div#ut-dialog').hide();
    });
    jQuery('#ut-mask').click(function () {
        jQuery('div#ut-mask').hide();
        jQuery('div#ut-dialog').hide();
    });
});

// FUCKING TAGS
jQuery(function () {
    if (UserTools.options.get('TagsOpcion')) {
        if (localStorage['ut-Tags'] == undefined) {
            //var utTags = {"Vegon":{tag:"tag",link:"http://google.es",color:"#98C6F8"}, "-Power":{tag:"tag2",link:"http://mediavida.com",color:"rgb(116, 173, 121)"}};
            var utTags = {};
            localStorage['ut-Tags'] = JSON.stringify(utTags);
        }
        // Dibuja tags en el hilo
        var utTags = JSON.parse(localStorage['ut-Tags']);
        jQuery(':not(form)> div.post > div.autor > dl > dt > a').each(function () {
            var nick = jQuery(this).text();
            if (typeof utTags[nick] !== "undefined") { // dibuja con datos
                jQuery(this).closest('.autor').append('<div class="ut_tag" style="background-color: ' + utTags[nick].color + '">' + utTags[nick].tag + '</div><div class="ut_tag_info" style="display:none;"><div class="ut_tag_info_cerrar">x</div><form class="ut_tag_form">&gt; Tag<br><input class="ut_tag_tag" value="' + utTags[nick].tag + '" maxlength="25"><br />&gt; Color<div class="ut_tag_colores" style="display: inline;"><div class="ut_tag_colores_1"></div><div class="ut_tag_colores_2"></div><div class="ut_tag_colores_3"></div><div class="ut_tag_colores_4"></div><div class="ut_tag_colores_5"></div><div class="ut_tag_colores_6"></div></div><br><input class="ut_tag_color" value="' + utTags[nick].color + '" maxlength="26"><br />&gt; <span class="ut_tag_link_span"><a href="' + utTags[nick].link + '" target="_blank">Link</a></span><br><input class="ut_tag_link" value="' + utTags[nick].link + '"><br />&gt; Descripción<br><textarea class="ut_tag_desc" style="width: 110px;">' + utTags[nick].desc + '</textarea><br /><input type="submit" style="margin-top: 1px;" value="Guardar"></form></div>');
                if (utTags[nick].link === "") { // quita el link si no tiene enlace
                    jQuery(this).closest('.autor').children('.ut_tag_info').children('.ut_tag_form').children('.ut_tag_link_span').replaceWith('<span class="ut_tag_link_span">Link</span>');
                }
            } else { // dibuja sin datos
                jQuery(this).closest('.autor').append('<div class="ut_tag ut_tag_vacia" style="background-color: #aaaaaa; opacity: 0.25; width: 9px; height: 15px; overflow: hidden;">+ etiqueta</div><div class="ut_tag_info" style="display:none;"><div class="ut_tag_info_cerrar">x</div><form class="ut_tag_form">&gt; Tag<br><input class="ut_tag_tag" placeholder="Tag" maxlength="25"><br />&gt; Color<div class="ut_tag_colores" style="display: inline;"><div class="ut_tag_colores_1"></div><div class="ut_tag_colores_2"></div><div class="ut_tag_colores_3"></div><div class="ut_tag_colores_4"></div><div class="ut_tag_colores_5"></div><div class="ut_tag_colores_6"></div></div><br><input class="ut_tag_color" placeholder="#5eadb9" maxlength="26"><br />&gt; <span class="ut_tag_link_span">Link</span><br><input class="ut_tag_link" placeholder="http://"><br />&gt; Descripción<br><textarea placeholder="Descripción" class="ut_tag_desc" style="width: 110px;"></textarea><br /><input type="submit" style="margin-top: 1px;" value="Guardar"></form></div>');
            }

            jQuery(this).closest('.autor').children(".ut_tag_info").on('submit', 'form.ut_tag_form', function () { // guardamos datos del tag
                var $tag = jQuery(this).children(".ut_tag_tag");
                var $color = jQuery(this).children(".ut_tag_color");
                var $link = jQuery(this).children(".ut_tag_link");
                var $desc = jQuery(this).children(".ut_tag_desc");
                var tag = $tag.val();
                var color = $color.val();
                if (color === "") { // si no se rellena el color, mete uno default
                    var color = '#1392ED';
                }
                var link = $link.val();
                var desc = $desc.val();

                utTags['' + nick + ''] = {
                    tag: '' + tag + '',
                    color: '' + color + '',
                    link: '' + link + '',
                    desc: '' + desc + ''
                };

                if (utTags['' + nick + ''].tag !== "") { // si el tag esta relleno mete y actualiza
                    jQuery(':not(form)> div.post > div.autor > dl > dt > a:contains("' + nick + '")').each(function () {
                        jQuery(this).closest('.autor').children('.ut_tag').replaceWith('<div class="ut_tag" style="background-color: ' + utTags[nick].color + '">' + utTags[nick].tag + '</div>');
                        jQuery(this).closest('.autor').children('.ut_tag_info').children('.ut_tag_form').children('.ut_tag_tag').attr('value', '' + utTags[nick].tag + '');
                        jQuery(this).closest('.autor').children('.ut_tag_info').children('.ut_tag_form').children('.ut_tag_color').attr('value', '' + utTags[nick].color + '');
                        jQuery(this).closest('.autor').children('.ut_tag_info').children('.ut_tag_form').children('.ut_tag_link').attr('value', '' + utTags[nick].link + '');
                        jQuery(this).closest('.autor').children('.ut_tag_info').children('.ut_tag_form').children('.ut_tag_link_span').replaceWith('<span class="ut_tag_link_span"><a href="' + utTags[nick].link + '" target="_blank">Link</a></span>');
                        jQuery(this).closest('.autor').children('.ut_tag_info').children('.ut_tag_form').children('.ut_tag_desc').text('' + utTags[nick].desc + '');
                        if (utTags[nick].link === "") { // quita el link si no tiene enlace
                            jQuery(this).closest('.autor').children('.ut_tag_info').children('.ut_tag_form').children('.ut_tag_link_span').replaceWith('<span class="ut_tag_link_span">Link</span>');
                        }
                        jQuery(this).closest('div.autor').children('.ut_tag_info').hide();
                    });
                } else { // si el tag esta vacio borra key y deja default
                    jQuery(':not(form)> div.post > div.autor > dl > dt > a:contains("' + nick + '")').each(function () {
                        delete utTags['' + nick + ''];
                        jQuery(this).closest('.autor').children('.ut_tag').replaceWith('<div class="ut_tag ut_tag_vacia" style="background-color: #aaaaaa; opacity: 0.25; width: 9px; height: 15px; overflow: hidden;">+ etiqueta</div>');
                        jQuery(this).closest('.autor').children('.ut_tag_info').children('.ut_tag_form').replaceWith('<form class="ut_tag_form">&gt; Tag<br><input class="ut_tag_tag" placeholder="Tag" maxlength="25"><br />&gt; Color<div class="ut_tag_colores" style="display: inline;"><div class="ut_tag_colores_1"></div><div class="ut_tag_colores_2"></div><div class="ut_tag_colores_3"></div><div class="ut_tag_colores_4"></div><div class="ut_tag_colores_5"></div><div class="ut_tag_colores_6"></div></div><br><input class="ut_tag_color" placeholder="#5eadb9" maxlength="26"><br />&gt; <span class="ut_tag_link_span">Link</span><br><input class="ut_tag_link" placeholder="http://"><br />&gt; Descripción<br><textarea placeholder="Descripción" class="ut_tag_desc" style="width: 110px;"></textarea><br /><input type="submit" style="margin-top: 1px;" value="Guardar"></form>');
                        jQuery(this).closest('div.autor').children('.ut_tag_info').hide();
                    });
                }
                localStorage['ut-Tags'] = JSON.stringify(utTags);

                return false;
            });
        });
        // Funciones de los botones
        jQuery('.autor').each(function () {
            jQuery(this).on('click', '.ut_tag, .ut_tag_info_cerrar', function () {
                jQuery(this).closest('div.autor').children('.ut_tag_info').toggle();
            });
        });

        jQuery('.autor').each(function () {
            jQuery(this).on('click', '.ut_tag_colores_1, .ut_tag_colores_2, .ut_tag_colores_3, .ut_tag_colores_4 , .ut_tag_colores_5, .ut_tag_colores_6 ', function () {
                var color = jQuery(this).css('background-color');
                jQuery(this).closest('div.ut_tag_colores').siblings('.ut_tag_color').attr('value', '' + color + '');
            });
        });
    }
});

// Botón para cerrar spoiler al final del mismo
jQuery(function () {
    if (UserTools.options.get('cerrarspoilers')) {
        jQuery('div[id^="cuerpo_"] div[id^="sp_"]').append('<br /><br /><a class="ut-cerrarspoiler-boton" style="cursor: pointer;">Cerrar Spoiler</a>');
        jQuery('.ut-cerrarspoiler-boton').click(function () {
            var utSpoilerPostId = jQuery(this).closest('div.post').attr('id');
            var utSpoilerId = jQuery(this).closest('div[id^="sp_"]').attr('id');
            jQuery(this).closest('div[id^="sp_"]').siblings('a[rel="' + utSpoilerId + '"]').removeClass('less');
            jQuery(this).closest('div[id^="' + utSpoilerId + '"]').hide();
            jQuery('#' + utSpoilerPostId).ScrollTo({
                duration: 0
            });
        });
    }
});

// Antiguos links de favs/avisos/msj
jQuery(function () {
    if (UserTools.options.get('antiguoslinkuserinfo')) {
        var utnotifylinkdesnudo = jQuery('#nav_bar a#notifylink').closest('li').clone();
        var utfavslinkdesnudo = jQuery('#nav_bar a#favslink').closest('li').clone();
        var utmplinkdesnudo = jQuery('#nav_bar a#mplink').closest('li').clone();
        jQuery('#nav_bar a#notifylink').closest('li').remove();
        jQuery('#nav_bar a#favslink').closest('li').remove();
        jQuery('#nav_bar a#mplink').closest('li').remove();
        var navbarAncla = jQuery('#nav_bar a[href^="/id/"]').closest('li');
        utnotifylinkdesnudo.add(utfavslinkdesnudo).add(utmplinkdesnudo).insertAfter(navbarAncla);
    }
});

// Filtrar favoritos
jQuery(function () {
    if (UserTools.options.get('filtrarfavs')) {
        jQuery('#favoritos .tinycol').prepend('<div id="ut-filtros-fav">');
        jQuery('<h3 id="ut-fav-filto-titulo">').text('Filtros').insertBefore('#ut-filtros-fav');
        /* Movemos y filtramos iconos de foros */
        jQuery(document).on('mouseover', 'body', function () {
            jQuery('#tfav a.foroicon').each(function () {
                jQuery('#ut-filtros-fav').append(jQuery(this).clone());
            });
            var utforosUnicos = {};
            jQuery('#ut-filtros-fav a.foroicon').each(function () {
                jQuery(this).attr('href', '#filtrados');
                var interiorA = jQuery(this).html();
                if (utforosUnicos[interiorA])
                    jQuery(this).remove();
                else
                    utforosUnicos[interiorA] = true;
            });
        });
        /* Filtramos foros y categorias */
        jQuery(document).on('click', '#ut-filtros-fav a.foroicon', function () {
            jQuery('#ut-filtros-fav a.foroicon').removeClass('ut-opacity');
            jQuery('#tfav tr').removeClass('utfiltrado');
            jQuery('#ut-filtros-tags').remove();
            jQuery('#tfav a.foroicon').closest('tr').attr('style', 'display: table-row;');
            var foroImgSrc = jQuery(this).children('i').attr("class").match(/fid_(.*)/)[1];
            jQuery('#tfav a.foroicon i').not('.fid_' + foroImgSrc + '').closest('tr').addClass('utfiltrado').hide();
            jQuery('#ut-filtros-fav a.foroicon').not(this).addClass('ut-opacity');

            jQuery('<div id="ut-filtros-tags">').insertAfter('#ut-filtros-fav');
            jQuery('#tfav tr').not('tr.utfiltrado').children('td.dash').children('a.cat2').each(function () {
                jQuery('#ut-filtros-tags').append(jQuery(this).clone().removeAttr('title'));
            });
            jQuery('#ut-filtros-tags a.cat2 img').removeAttr('alt', 'style');
            var utCatsUnicos = {};
            jQuery('#ut-filtros-tags a.cat2').each(function () {
                jQuery(this).attr('href', '#filtrados');
                var interiorB = jQuery(this).html();
                if (utCatsUnicos[interiorB])
                    jQuery(this).remove();
                else
                    utCatsUnicos[interiorB] = true;
            });
        });
        jQuery(document).on('click', '#ut-filtros-tags a.cat2', function () {
            jQuery('#ut-filtros-tags a.cat2').removeClass('ut-opacity');
            jQuery('#tfav a.foroicon').closest('tr').not('tr.utfiltrado').attr('style', 'display: table-row;');
            var catImgSrc = jQuery(this).children('img').attr('src');
            jQuery('#tfav a.cat2 img').not('img[src="' + catImgSrc + '"]').closest('tr').hide();
            jQuery('#ut-filtros-tags a.cat2').not(this).addClass('ut-opacity');
        });

        /* Quitamos filtros */
        jQuery('<p id="utFavQuitar">').text('Quitar filtro.').insertAfter('#ut-filtros-fav');
        jQuery(document).on('click', '#utFavQuitar', function () {
            jQuery('#ut-filtros-fav a.foroicon').removeClass('ut-opacity');
            jQuery('#tfav tr').removeClass('utfiltrado');
            jQuery('#ut-filtros-tags').remove();
            jQuery('#tfav a.foroicon').closest('tr').attr('style', 'display: table-row;');
        });

        /* Aviso para los que tienen más de 30 favoritos */
        var utVerMasFav = jQuery('#favoritos .tfooter #moar').text();
        if (utVerMasFav === 'Ver más') {
            jQuery('<p id="utFavAviso">').text('Tienes más de 30 favoritos +').insertAfter('#utFavQuitar');
            jQuery('<div id="utFavAvisoTxt">').html('Para que el filtro funcione con todos tus hilos guardados en favoritos, debes darle al botón de "Ver más" al final de la lista de hilos. Si no se muestran el filtro no tendrá efecto en ellos.').insertAfter('#utFavAviso');
            jQuery('#utFavAviso').click(function () {
                jQuery('#utFavAvisoTxt').slideToggle();
                if (jQuery('#utFavAviso').text() === 'Tienes más de 30 favoritos +') {
                    jQuery('#utFavAviso').text('Tienes más de 30 favoritos -');
                } else {
                    jQuery('#utFavAviso').text('Tienes más de 30 favoritos +');
                }
            });
        }
    }
});

// Ocultar filtros en spy
jQuery(function () {
    var $utfiltrar = jQuery('#nofids').siblings('h3');
    var $utfiltrarP = jQuery('#nofids').closest('.box').siblings('p');
    var utfiltrarOpcion = localStorage['utfiltrarOpcion'];
    $utfiltrar.addClass('ut-filtrar');
    jQuery($utfiltrar).click(function () {
        jQuery('#nofids').slideToggle();
        $utfiltrarP.toggle();
        if (UserTools.options.get('filtrarOpcion')) {
	    UserTools.options.set('filtrarOpcion', false);
        } else {
	    UserTools.options.set('filtrarOpcion', true);
        }
    });

    if (!UserTools.options.get('filtrarOpcion')) {
        jQuery('#nofids').toggle();
        $utfiltrarP.toggle();
    }

});




// Ordenar por respuestas sin leer en favoritos (bug con hilos con 1k)
jQuery(function () {
    if (UserTools.options.get('ordenarposts')) {
        var $table = jQuery('div#main table.full');
        jQuery('<span style="font-size: 10px; margin-left: 20px;">Ordenar por: <span style="cursor: pointer; color: #EF5000;" id="ut-fav-fecha">Fecha</span> | <span style="cursor: pointer; color: #999999;" id="ut-fav-posts">Respuestas sin leer</span></span>').insertAfter('body#favoritos table#tfav th span.left');
        jQuery('<span style="font-size: 10px; margin-left: -110px;">Ordenar por: <span style="cursor: pointer; color: #EF5000;" id="ut-fav-fecha">Fecha</span> | <span style="cursor: pointer; color: #999999;" id="ut-fav-posts">Respuestas sin leer</span></span>').insertAfter('body#foros table.full th span.left');
        var originalRows = $table.find('tr').slice(1).get(),
            rows = originalRows.slice(0);

        jQuery("#ut-fav-posts").click(function () {
            rows.sort(function (a, b) {
                var keyA = +$(a).find('a.unreadcount').text();
                var keyB = +$(b).find('a.unreadcount').text();
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });
            jQuery.each(rows, function (index, row) {
                $table.children('tbody').append(row);
            });
            jQuery("#ut-fav-posts").css('color', '#EF5000');
            jQuery("#ut-fav-fecha").css('color', '#999999');
        });

        jQuery("#ut-fav-fecha").click(function () {
            jQuery.each(originalRows, function (index, row) {
                $table.children('tbody').append(row);
            });
            jQuery("#ut-fav-posts").css('color', '#999999');
            jQuery("#ut-fav-fecha").css('color', '#EF5000');
        });
    }
});


// Estilos para los spoilers
jQuery(function () {
    if (UserTools.options.get('estilospoilers')) {
        jQuery(function () {
            if (UserTools.isDark == 0) {
                jQuery('.spoiler').each(function () {
                    spoiler_id = jQuery(this).attr('rel');
                    jQuery('#' + spoiler_id).addClass('spoiler-content');
                });
            } else {
                jQuery('.spoiler').each(function () {
                    spoiler_id = jQuery(this).attr('rel');
                    jQuery('#' + spoiler_id).addClass('spoiler-content-black');
                });
            }
        });
    }
});




// Información del perfil en la lista de users
jQuery(function () {
    if (UserTools.options.get('userinfo')) {
        jQuery(document).ready(function () {
            var pendingInfoBox = undefined;
            var infoBoxX = undefined;
            var infoBoxY = undefined;

            function checkUserInfoBox() {
                if (pendingInfoBox != undefined) {
                    launchUserInfoBox(pendingInfoBox);
                }
            }

            function launchUserInfoBox() {
                jQuery.get('http://www.mediavida.com/id/' + pendingInfoBox, function (data) {
                    jQuery('.infoavatar', data).each(function () {
                        if (pendingInfoBox == undefined) return false;
                        jQuery('#ajax_usercard').remove();
                        jQuery('body').append('<div id="ajax_usercard">' + jQuery(this).html() + '</div>');
                        var box = jQuery('#ajax_usercard');
                        if (UserTools.isDark == 0) {
                            box.css('background-Color', 'whitesmoke');
                        } else {
                            box.css('background-color', '#39444B');
                        }
                        box.css('borderRadius', '6px');
                        box.css('padding', '10px 5px 5px 5px');
                        box.css('position', 'absolute');
                        box.css('left', infoBoxX);
                        box.css('top', infoBoxY);
                        box.css('overflow', 'hidden');
                        box.css('boxShadow', '1px 1px 5px rgba(0, 0, 0, 0.25)');
                        box.css('zIndex', '9999');

                        var uavatar = jQuery('.useravatar', box);
                        uavatar.css('float', 'left');
                        uavatar.css('padding', '5px');
                        uavatar.css('marginRight', '5px');

                        var uinfo = jQuery('.userinfo', box);
                        uinfo.css('borderRadius', '6px');
                        uinfo.css('width', '254px');
                        uinfo.css('height', '90px');
                        uinfo.css('backgroundColor', '#F4F6F1');
                        uinfo.css('float', 'left');
                        uinfo.css('padding', '5px');
                        uinfo.css('position', 'relative');
                        uinfo.css('zoom', '1');

                    });
                });
            }

            jQuery('.post .autor dt a').hover(function (event) {
                offset = jQuery(this).offset();
                pendingInfoBoxOld = jQuery(this).attr('href');
                pendingInfoBox = pendingInfoBoxOld.match(/id\/(.+)/)[1];
                infoBoxX = offset.left - 10;
                infoBoxY = offset.top + 14;
                setTimeout(checkUserInfoBox, 1000);
            }, function () {
                pendingInfoBox = undefined;
                jQuery('#ajax_usercard').remove();
            });
        });
    }
});



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


// nueva botonera
jQuery('button[accesskey="b"]').hide();
jQuery('<button class="alt bleft bb" accesskey="b" type="button" onclick="bbstyle(0)">b</button>').insertAfter('button[accesskey="b"]');
jQuery('button[accesskey="i"]').hide();
jQuery('<button class="alt bcenter bi" accesskey="i" type="button" onclick="bbstyle(2)">i</button><button class="alt bcenter2 bu" accesskey="u" type="button" onclick="bbstyle(4)">u</button><button id="ut-boton-s" class="alt bright bs" accesskey="x" type="button">s</button><button class="alt bsolo" id="ut-boton-center" accesskey="c" type="button" title="[center]"><a class="sprite bcentericon"></a></button><button class="alt bsolo" id="ut-boton-list" type="button" title="[list] Usar * para cada elemento de la lista"><a class="blist sprite"></a></button>').insertAfter('button[accesskey="i"]');
jQuery('button[accesskey="l"]').hide();
jQuery('<button class="alt bsolo" accesskey="l" type="button" onclick="bbstyle(8)">[url=]</button>').insertAfter('button[accesskey="l"]');
jQuery('button[accesskey="m"]').hide();
jQuery('<button class="alt bleft" accesskey="m" type="button" onclick="bbstyle(10)" title="[img]"><a class="bimg sprite"></a></button>').insertAfter('button[accesskey="m"]');
jQuery('button[accesskey="v"]').hide();
jQuery('<button class="alt bcenter" accesskey="v" type="button" onclick="bbstyle(12)" title="[video]"><a class="bvideo sprite"></a></button><button title="[audio]" id="ut-boton-audio" class="alt bright" type="button"><a class="baudio sprite"></a></button>').insertAfter('button[accesskey="v"]');
jQuery('button[accesskey="s"]').hide();
jQuery('<button class="alt bleft" accesskey="s" type="button" onclick="bbstyle(14)">[spoiler]</button>').insertAfter('button[accesskey="s"]');
jQuery('button[accesskey="d"]').hide();
jQuery('<button class="alt bcenter" accesskey="d" type="button" onclick="bbstyle(16)">[spoiler=]</button>').insertAfter('button[accesskey="d"]');
jQuery('button[accesskey="n"]').hide();
jQuery('<button class="alt bright" accesskey="n" type="button" onclick="bbstyle(18)">NSFW</button><button title="Pulsa para ver más opciones" id="ut-boton-plus" class="alt bsolo" type="button"><a class="ut-arrow-down sprite"></a></button><script></script>').insertAfter('button[accesskey="n"]');

jQuery("#ut-boton-s").click(function () {
    if (jQuery('textarea#cuerpo').getSelection().text.length > 0) {
        jQuery("textarea#cuerpo").replaceSelection('[s]' + jQuery('textarea#cuerpo').getSelection().text + '[/s]').setCaretPos();
    } else {
        jQuery("textarea#cuerpo").insertAtCaretPos('[s][/s]').setCaretPos(jQuery('textarea#cuerpo').getSelection().end - 3);
    }
});
jQuery("#ut-boton-center").click(function () {
    if (jQuery('textarea#cuerpo').getSelection().text.length > 0) {
        jQuery("textarea#cuerpo").replaceSelection('[center]' + jQuery('textarea#cuerpo').getSelection().text + '[/center]').setCaretPos();
    } else {
        jQuery("textarea#cuerpo").insertAtCaretPos('[center][/center]').setCaretPos(jQuery('textarea#cuerpo').getSelection().end - 8);
    }
});
jQuery("#ut-boton-list").click(function () {
    if (jQuery('textarea#cuerpo').getSelection().text.length > 0) {
        jQuery("textarea#cuerpo").replaceSelection('[list]' + jQuery('textarea#cuerpo').getSelection().text + '[/list]').setCaretPos();
    } else {
        jQuery("textarea#cuerpo").insertAtCaretPos('[list][/list]').setCaretPos(jQuery('textarea#cuerpo').getSelection().end - 6);
    }
});
jQuery("#ut-boton-audio").click(function () {
    if (jQuery('textarea#cuerpo').getSelection().text.length > 0) {
        jQuery("textarea#cuerpo").replaceSelection('[audio]' + jQuery('textarea#cuerpo').getSelection().text + '[/audio]').setCaretPos();
    } else {
        jQuery("textarea#cuerpo").insertAtCaretPos('[audio][/audio]').setCaretPos(jQuery('textarea#cuerpo').getSelection().end - 7);
    }
});


// Segunda linea en la botonera
var utsegundabarra = '<button class="alt bsolo" id="ut-boton-bar" type="button">[bar]</button><button class="alt bleft" type="button" onclick="bbstyle(20)">[code]</button><button class="alt bright2" id="ut-boton-cmd" type="button">[cmd]</button><button id="ut-button-macros" class="alt bsolo" type="button">macros <i class="sprite icon-down-list"></i></button><div id="ut-button-macros-list" style="display: none;"><ul></ul><a href="#ut-dialog-menu" id="ut-button-macros-list-anadir">añadir macro</a></div>'
jQuery('<div id="ut-botonera2" style="overflow: hidden;margin: 10px 0;clear: both; display: none;">' + utsegundabarra + '</div>').insertAfter('form#postear div[style="overflow: hidden;margin: 10px 0;clear: both"]');
jQuery('<div id="ut-botonera2" style="overflow: hidden;margin: 10px 0;clear: both; display: none;">' + utsegundabarra + '</div>').insertAfter('form#postform div[style="overflow: hidden;margin-bottom: 10px;clear: both"]');
jQuery('#ut-boton-plus').click(function () {
    if (jQuery('#ut-botonera2').is(":visible")) {
        jQuery('#ut-botonera2').slideUp();
        jQuery('#ut-boton-plus a').toggleClass('ut-arrow-down').toggleClass('ut-arrow-up');
        jQuery('#ut-boton-plus').attr('title', 'Pulsa para ver más opciones');
    } else {
        jQuery('#ut-botonera2').slideDown();
        jQuery('#ut-boton-plus a').toggleClass('ut-arrow-down').toggleClass('ut-arrow-up');
        jQuery('#ut-boton-plus').attr('title', 'Pulsa para ocultar la segunda linea de opciones');
    }
});
jQuery("#ut-boton-bar").click(function () {
    if (jQuery('textarea#cuerpo').getSelection().text.length > 0) {
        jQuery("textarea#cuerpo").replaceSelection('[bar]' + jQuery('textarea#cuerpo').getSelection().text + '[/bar]').setCaretPos();
    } else {
        jQuery("textarea#cuerpo").insertAtCaretPos('[bar][/bar]').setCaretPos(jQuery('textarea#cuerpo').getSelection().end - 5);
    }
});
jQuery("#ut-boton-cmd").click(function () {
    if (jQuery('textarea#cuerpo').getSelection().text.length > 0) {
        jQuery("textarea#cuerpo").replaceSelection('[cmd]' + jQuery('textarea#cuerpo').getSelection().text + '[/cmd]').setCaretPos();
    } else {
        jQuery("textarea#cuerpo").insertAtCaretPos('[cmd][/cmd]').setCaretPos(jQuery('textarea#cuerpo').getSelection().end - 5);
    }
});
jQuery("#ut-button-macros").click(function () {
    if (jQuery('#ut-button-macros-list[style="display: none;"]').length) {
        jQuery('#ut-button-macros-list').show();
    } else {
        jQuery('#ut-button-macros-list').hide();
    }
});
jQuery('#ut-button-macros-list').mouseup(function () {
    return false
});
jQuery('#ut-button-macros').mouseup(function () {
    return false
});
jQuery(document).mouseup(function () {
    jQuery('#ut-button-macros-list').hide();
});
jQuery("#ut-button-macros-list-anadir").click(function () {
    jQuery('#ut-mask-menu').show();
    jQuery('#ut-dialog-menu').show();
    jQuery('#ut-menu-tab1').removeClass('active');
    jQuery('#ut-menu-tab2').removeClass('active');
    jQuery('#ut-menu-tab3').removeClass('active');
    jQuery('#ut-menu-tab4').addClass('active');
    jQuery('#ut-menu-tabla1').hide();
    jQuery('#ut-menu-tabla2').hide();
    jQuery('#ut-menu-tabla3').hide();
    jQuery('#ut-menu-tabla4').show();
});


// Nueva botonera en el perfil
jQuery('<div style="overflow: hidden;margin: 0 0 5px 0;clear: both"><button type="button" accesskey="b" class="alt bleft bb" id="ut-boton-b-perfil">b</button><button type="button" accesskey="i" class="alt bcenter bi" id="ut-boton-i-perfil">i</button><button type="button" accesskey="u" class="alt bright bu" id="ut-boton-u-perfil">u</button><button type="button" accesskey="l" class="alt bsolo" id="ut-boton-url-perfil">[url=]</button><button type="button" accesskey="s" class="alt bleft" id="ut-boton-spoiler-perfil">[spoiler]</button><button type="button" accesskey="d" class="alt bcenter" id="ut-boton-spoiler2-perfil">[spoiler=]</button><button type="button" accesskey="n" class="alt bright" id="ut-boton-nsfw-perfil">NSFW</button></div>').insertBefore('body.usuarios textarea[name="info"]');
jQuery("#ut-boton-b-perfil").click(function () {
    if (jQuery('textarea[name="info"]').getSelection().text.length > 0) {
        jQuery('textarea[name="info"]').replaceSelection('[b]' + jQuery('textarea[name="info"]').getSelection().text + '[/b]').setCaretPos();
    } else {
        jQuery('textarea[name="info"]').insertAtCaretPos('[b][/b]').setCaretPos(jQuery('textarea[name="info"]').getSelection().end - 3);
    }
});
jQuery("#ut-boton-i-perfil").click(function () {
    if (jQuery('textarea[name="info"]').getSelection().text.length > 0) {
        jQuery('textarea[name="info"]').replaceSelection('[i]' + jQuery('textarea[name="info"]').getSelection().text + '[/i]').setCaretPos();
    } else {
        jQuery('textarea[name="info"]').insertAtCaretPos('[i][/i]').setCaretPos(jQuery('textarea[name="info"]').getSelection().end - 3);
    }
});
jQuery("#ut-boton-u-perfil").click(function () {
    if (jQuery('textarea[name="info"]').getSelection().text.length > 0) {
        jQuery('textarea[name="info"]').replaceSelection('[u]' + jQuery('textarea[name="info"]').getSelection().text + '[/u]').setCaretPos();
    } else {
        jQuery('textarea[name="info"]').insertAtCaretPos('[u][/u]').setCaretPos(jQuery('textarea[name="info"]').getSelection().end - 3);
    }
});
jQuery("#ut-boton-url-perfil").click(function () {
    if (jQuery('textarea[name="info"]').getSelection().text.length > 0) {
        jQuery('textarea[name="info"]').replaceSelection('[url=]' + jQuery('textarea[name="info"]').getSelection().text + '[/url]').setCaretPos();
    } else {
        jQuery('textarea[name="info"]').insertAtCaretPos('[url=][/url]').setCaretPos(jQuery('textarea[name="info"]').getSelection().end - 5);
    }
});
jQuery("#ut-boton-spoiler-perfil").click(function () {
    if (jQuery('textarea[name="info"]').getSelection().text.length > 0) {
        jQuery('textarea[name="info"]').replaceSelection('[spoiler]' + jQuery('textarea[name="info"]').getSelection().text + '[/spoiler]').setCaretPos();
    } else {
        jQuery('textarea[name="info"]').insertAtCaretPos('[spoiler][/spoiler]').setCaretPos(jQuery('textarea[name="info"]').getSelection().end - 9);
    }
});
jQuery("#ut-boton-spoiler2-perfil").click(function () {
    if (jQuery('textarea[name="info"]').getSelection().text.length > 0) {
        jQuery('textarea[name="info"]').replaceSelection('[spoiler=]' + jQuery('textarea[name="info"]').getSelection().text + '[/spoiler]').setCaretPos();
    } else {
        jQuery('textarea[name="info"]').insertAtCaretPos('[spoiler=][/spoiler]').setCaretPos(jQuery('textarea[name="info"]').getSelection().end - 9);
    }
});
jQuery("#ut-boton-nsfw-perfil").click(function () {
    if (jQuery('textarea[name="info"]').getSelection().text.length > 0) {
        jQuery('textarea[name="info"]').replaceSelection('[spoiler=NSFW]' + jQuery('textarea[name="info"]').getSelection().text + '[/spoiler]').setCaretPos();
    } else {
        jQuery('textarea[name="info"]').insertAtCaretPos('[spoiler=NSFW][/spoiler]').setCaretPos(jQuery('textarea[name="info"]').getSelection().end - 9);
    }
});

// Botonera en el fast-edit
if (!UserTools.live) {
    function botonessolounavez() {
        jQuery(function () {
            jQuery(document).one('mouseenter', 'div.msg div.body div textarea', function () {
                fasteditbuttons();
            });

            function fasteditbuttons() {
                jQuery('<div style="overflow: hidden;margin: 0 0px 10px -5px;clear: both"><button type="button" accesskey="b" class="alt bleft bb" id="ut-boton-b-fast">b</button><button type="button" accesskey="i" class="alt bcenter bi" id="ut-boton-i-fast">i</button><button type="button" accesskey="u" class="alt bcenter2 bu" id="ut-boton-u-fast">u</button><button type="button" accesskey="x" class="alt bright bs" id="ut-boton-s-fast">s</button><button title="[center]" type="button" accesskey="c" id="ut-boton-center-fast" class="alt bsolo"><a class="sprite bcentericon"></a></button><button title="[list] Usar * para cada elemento de la lista" type="button" id="ut-boton-list-fast" class="alt bsolo"><a class="blist sprite"></a></button><button type="button" accesskey="l" class="alt bsolo" id="ut-boton-url-fast">[url=]</button><button title="[img]" type="button" accesskey="m" class="alt bleft" id="ut-boton-img-fast"><a class="bimg sprite"></a></button><button title="[video]" type="button" accesskey="v" class="alt bcenter" id="ut-boton-video-fast"><a class="bvideo sprite"></a></button><button type="button" class="alt bright" title="[audio]" id="ut-boton-audio-fast"><a class="baudio sprite"></a></button><button type="button" accesskey="s" class="alt bleft" id="ut-boton-spoiler-fast">[spoiler]</button><button type="button" accesskey="d" class="alt bcenter" id="ut-boton-spoiler2-fast">[spoiler=]</button><button type="button" accesskey="n" class="alt bright" id="ut-boton-nsfw-fast">NSFW</button><button type="button" id="ut-boton-bar-fast" class="alt bsolo">[bar]</button><button type="button" class="alt bsolo" id="ut-boton-code-fast">[code]</button></div>').insertBefore('div.msg div.body div textarea:not("div.extraportada textarea")');
            }
        });
    }
    jQuery(document).ready(function () {
        botonessolounavez();
    });
    jQuery(document).on('click', 'button.cancelButton', function () {
        botonessolounavez();
    });
    jQuery(document).on('click', 'button.saveButton', function () {
        botonessolounavez();
    });
    jQuery(document).on('click', '#ut-boton-b-fast', function () {
        if (jQuery('div.msg div.body div textarea').getSelection().text.length > 0) {
            jQuery('div.msg div.body div textarea').replaceSelection('[b]' + jQuery('div.msg div.body div textarea').getSelection().text + '[/b]').setCaretPos();
        } else {
            jQuery('div.msg div.body div textarea').insertAtCaretPos('[b][/b]').setCaretPos(jQuery('div.msg div.body div textarea').getSelection().end - 3);
        }
    });
    jQuery(document).on('click', '#ut-boton-i-fast', function () {
        if (jQuery('div.msg div.body div textarea').getSelection().text.length > 0) {
            jQuery('div.msg div.body div textarea').replaceSelection('[i]' + jQuery('div.msg div.body div textarea').getSelection().text + '[/i]').setCaretPos();
        } else {
            jQuery('div.msg div.body div textarea').insertAtCaretPos('[i][/i]').setCaretPos(jQuery('div.msg div.body div textarea').getSelection().end - 3);
        }
    });
    jQuery(document).on('click', '#ut-boton-u-fast', function () {
        if (jQuery('div.msg div.body div textarea').getSelection().text.length > 0) {
            jQuery('div.msg div.body div textarea').replaceSelection('[u]' + jQuery('div.msg div.body div textarea').getSelection().text + '[/u]').setCaretPos();
        } else {
            jQuery('div.msg div.body div textarea').insertAtCaretPos('[u][/u]').setCaretPos(jQuery('div.msg div.body div textarea').getSelection().end - 3);
        }
    });
    jQuery(document).on('click', '#ut-boton-s-fast', function () {
        if (jQuery('div.msg div.body div textarea').getSelection().text.length > 0) {
            jQuery('div.msg div.body div textarea').replaceSelection('[s]' + jQuery('div.msg div.body div textarea').getSelection().text + '[/s]').setCaretPos();
        } else {
            jQuery('div.msg div.body div textarea').insertAtCaretPos('[s][/s]').setCaretPos(jQuery('div.msg div.body div textarea').getSelection().end - 3);
        }
    });
    jQuery(document).on('click', '#ut-boton-center-fast', function () {
        if (jQuery('div.msg div.body div textarea').getSelection().text.length > 0) {
            jQuery('div.msg div.body div textarea').replaceSelection('[center]' + jQuery('div.msg div.body div textarea').getSelection().text + '[/center]').setCaretPos();
        } else {
            jQuery('div.msg div.body div textarea').insertAtCaretPos('[center][/center]').setCaretPos(jQuery('div.msg div.body div textarea').getSelection().end - 8);
        }
    });
    jQuery(document).on('click', '#ut-boton-list-fast', function () {
        if (jQuery('div.msg div.body div textarea').getSelection().text.length > 0) {
            jQuery('div.msg div.body div textarea').replaceSelection('[list]' + jQuery('div.msg div.body div textarea').getSelection().text + '[/list]').setCaretPos();
        } else {
            jQuery('div.msg div.body div textarea').insertAtCaretPos('[list][/list]').setCaretPos(jQuery('div.msg div.body div textarea').getSelection().end - 6);
        }
    });
    jQuery(document).on('click', '#ut-boton-url-fast', function () {
        if (jQuery('div.msg div.body div textarea').getSelection().text.length > 0) {
            jQuery('div.msg div.body div textarea').replaceSelection('[url=]' + jQuery('div.msg div.body div textarea').getSelection().text + '[/url]').setCaretPos();
        } else {
            jQuery('div.msg div.body div textarea').insertAtCaretPos('[url=][/url]').setCaretPos(jQuery('div.msg div.body div textarea').getSelection().end - 5);
        }
    });
    jQuery(document).on('click', '#ut-boton-img-fast', function () {
        if (jQuery('div.msg div.body div textarea').getSelection().text.length > 0) {
            jQuery('div.msg div.body div textarea').replaceSelection('[img]' + jQuery('div.msg div.body div textarea').getSelection().text + '[/img]').setCaretPos();
        } else {
            jQuery('div.msg div.body div textarea').insertAtCaretPos('[img][/img]').setCaretPos(jQuery('div.msg div.body div textarea').getSelection().end - 5);
        }
    });
    jQuery(document).on('click', '#ut-boton-video-fast', function () {
        if (jQuery('div.msg div.body div textarea').getSelection().text.length > 0) {
            jQuery('div.msg div.body div textarea').replaceSelection('[video]' + jQuery('div.msg div.body div textarea').getSelection().text + '[/video]').setCaretPos();
        } else {
            jQuery('div.msg div.body div textarea').insertAtCaretPos('[video][/video]').setCaretPos(jQuery('div.msg div.body div textarea').getSelection().end - 7);
        }
    });
    jQuery(document).on('click', '#ut-boton-audio-fast', function () {
        if (jQuery('div.msg div.body div textarea').getSelection().text.length > 0) {
            jQuery('div.msg div.body div textarea').replaceSelection('[audio]' + jQuery('div.msg div.body div textarea').getSelection().text + '[/audio]').setCaretPos();
        } else {
            jQuery('div.msg div.body div textarea').insertAtCaretPos('[audio][/audio]').setCaretPos(jQuery('div.msg div.body div textarea').getSelection().end - 7);
        }
    });
    jQuery(document).on('click', '#ut-boton-spoiler-fast', function () {
        if (jQuery('div.msg div.body div textarea').getSelection().text.length > 0) {
            jQuery('div.msg div.body div textarea').replaceSelection('[spoiler]' + jQuery('div.msg div.body div textarea').getSelection().text + '[/spoiler]').setCaretPos();
        } else {
            jQuery('div.msg div.body div textarea').insertAtCaretPos('[spoiler][/spoiler]').setCaretPos(jQuery('div.msg div.body div textarea').getSelection().end - 9);
        }
    });
    jQuery(document).on('click', '#ut-boton-spoiler2-fast', function () {
        if (jQuery('div.msg div.body div textarea').getSelection().text.length > 0) {
            jQuery('div.msg div.body div textarea').replaceSelection('[spoiler=]' + jQuery('div.msg div.body div textarea').getSelection().text + '[/spoiler]').setCaretPos();
        } else {
            jQuery('div.msg div.body div textarea').insertAtCaretPos('[spoiler=][/spoiler]').setCaretPos(jQuery('div.msg div.body div textarea').getSelection().end - 9);
        }
    });
    jQuery(document).on('click', '#ut-boton-nsfw-fast', function () {
        if (jQuery('div.msg div.body div textarea').getSelection().text.length > 0) {
            jQuery('div.msg div.body div textarea').replaceSelection('[spoiler=NSFW]' + jQuery('div.msg div.body div textarea').getSelection().text + '[/spoiler]').setCaretPos();
        } else {
            jQuery('div.msg div.body div textarea').insertAtCaretPos('[spoiler=NSFW][/spoiler]').setCaretPos(jQuery('div.msg div.body div textarea').getSelection().end - 9);
        }
    });
    jQuery(document).on('click', '#ut-boton-bar-fast', function () {
        if (jQuery('div.msg div.body div textarea').getSelection().text.length > 0) {
            jQuery('div.msg div.body div textarea').replaceSelection('[bar]' + jQuery('div.msg div.body div textarea').getSelection().text + '[/bar]').setCaretPos();
        } else {
            jQuery('div.msg div.body div textarea').insertAtCaretPos('[bar][/bar]').setCaretPos(jQuery('div.msg div.body div textarea').getSelection().end - 5);
        }
    });
    jQuery(document).on('click', '#ut-boton-code-fast', function () {
        if (jQuery('div.msg div.body div textarea').getSelection().text.length > 0) {
            jQuery('div.msg div.body div textarea').replaceSelection('[code]' + jQuery('div.msg div.body div textarea').getSelection().text + '[/code]').setCaretPos();
        } else {
            jQuery('div.msg div.body div textarea').insertAtCaretPos('[code][/code]').setCaretPos(jQuery('div.msg div.body div textarea').getSelection().end - 6);
        }
    });
}

// Salvar forms .remove()
jQuery(function () {
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

// hilos con live destacados (solo funciona con theme normal)
if (UserTools.options.get('livedestacados')) {
    jQuery(document).on('mouseover', 'body', function () {
        jQuery('img[alt="live"]').closest('tr').addClass('ut-live');
    });
}


// hilos sobre relaciones y amor destacados (DESCARTADO, YA EXISTE UNA CATEGORIA DE AMOR Y RELACIONES)
// jQuery('<img alt="Relaciones" src="http://www.mvwat.com/mvusertools/heart.png" style="width: 12px; height: 12px;">').insertAfter('a[class="hb"]:contains("amor"), a[class="hb"]:contains("rollo"), a[class="hb"]:contains("novia"), a[class="hb"]:contains("celos")');


// Cambios de nombres
if (UserTools.options.get('CambiosNombre')) {
    // Nicks
    var utCambioDeNick = function (original, falso, ct) {
        jQuery('div.post div[class="autor"]:contains("' + original + '")').each(function () {
            jQuery(this).children().children('dt').children('a').text('' + falso + '');
            if (typeof ct !== "undefined") {
                jQuery(this).children().children('dd:first').text('' + ct + '');
            }
        });
        jQuery(document).on('mouseover', 'body', function () {
            jQuery('div.lastpost cite a:contains("' + original + '")').text('' + falso + '');
        });
        jQuery('tr div.left a[href^="/id/"]:contains("' + original + '")').each(function () {
            jQuery(this).text('' + falso + '');
        });
    };
    utCambioDeNick('Alien_crrpt', 'Alien_derp');
    utCambioDeNick('Achotiodeque', 'Achotoditeque');
    utCambioDeNick('Masme', 'Madme');
    utCambioDeNick('MavenBack', 'Madven');
    utCambioDeNick('Ekisu', 'X-Crim', 'Mod de Mario Kart');
    utCambioDeNick('Txentx0', 'Txentxo');
    utCambioDeNick('Link34', 'Link-pyon');
    utCambioDeNick('GaTToO', 'GaTToO', 'Me punishean :_(');
    //Foros
    var utCambioDeNombreForo = function (original, falso) {
        jQuery('div.fpanels div.fpanel div.info span.sub a:contains("' + original + '")').text('' + falso + '');
        jQuery('#topnav h1:contains("' + original + '")').text('' + falso + '');
        jQuery('#topnav a:contains("' + original + '")').text('' + falso + '');
        jQuery('#footnav a:contains("' + original + '")').text('' + falso + '');
        jQuery('div.fpanels div.fpanel div.info strong a:contains("' + original + '")').text('' + falso + '');
    };
    utCambioDeNombreForo('Juegos móvil', 'Shitphones');
}

// Version en el footer
jQuery(function () {
    if (utversionls == undefined) {
        jQuery('div#footer div.f_info p').append('• <a href="http://mvusertools.com" target="_blank">MV-Usertools</a>');
    } else {
        jQuery('div#footer div.f_info p').append('• <a href="http://mvusertools.com" target="_blank">MV-Usertools</a> ' + utversionls + '');
    }
});


//Set Toggle Class

jQuery("#scrollpages").append(balcklistToggle);

if (localStorage.getItem('blacklist') == 'on') {
    jQuery('#toggle').addClass("toggle-on");
    jQuery('#toggle').removeClass("toggle-off");
} else {
    jQuery('#toggle').addClass("toggle-off");
    jQuery('#toggle').removeClass("toggle-on");
}


//put usernames where they belong.
jQuery("a[href^='/id/']")
    .each(function () {
        var name = this.href.slice(this.href.lastIndexOf('/') + 1);
        jQuery(this).parent().parent().parent('.autor').data('name', name);
    });

//jQuery("img[src^='/img/users/avatar']").parent().after("<div class='ancla'><div>");

jQuery('.autor').each(function () {

    jQuery(this).append("<div class='usertools'>\
<div class='online-pos'><a class='tooltip ut-offline sprite' href='http://www.mediavida.com/id/" + jQuery(this).data('name') + "' original-title='Perfil' ></a></div>\
<div class='mensaje-pos'><a class='tooltip mensaje sprite' href='http://www.mediavida.com/mensajes/nuevo/" + jQuery(this).data('name') + "' original-title='Mensaje'></a></div>\
<div class='firma-pos'><a class='tooltip ut-firma sprite' href='http://www.mediavida.com/id/" + jQuery(this).data('name') + "/firmas' original-title='Firma'></a></div>\
<div class='blacklist-pos'><a class='tooltip blacklist blacklist-off sprite' href='javascript:void(0)' original-title='Blacklist'></a></div>\
</div>");
});
jQuery('div.autor dd.online').hide();
jQuery('div.autor dd.online').parent().parent().find('.ut-offline').toggleClass('ut-online ut-offline');

//Primera carga del a página. Tapar los posts de la blacklist si procede.

jQuery("img[src^='/img/users/avatar']").parent().prepend("<div class=''><span></span></div>");

//jQuery("img[src^='/img/users/avatar']").parent().append("<div class='ancla'><div>");

//jQuery("img[src^='/img/users/avatar']").after("<div class='tapavatares'></div>")

jQuery('.autor').each(function () {
    //Pijadas que marcan el post como blacklisted

    var localvalue = 'blacklist.' + jQuery(this).data('name');
    // INFO & BOTONES & AVATARES
    if (localStorage.getItem(localvalue) == 'true') {
        jQuery(this).find(".blacklist").addClass('blacklist-on');
        jQuery(this).find(".blacklist").removeClass('blacklist-off');
        jQuery(this).parent().find(".info").append(blacklistInfo);
    } else {
        jQuery(this).find(".blacklist").addClass('blacklist-off');
        jQuery(this).find(".blacklist").removeClass('blacklist-on');
        jQuery(this).parent().find(".info").append(blacklistInfo);
        jQuery(this).parent().find(".blacklisted-post").hide();
        jQuery(this).parent().find(".tapavatares").hide();
    }
    // BARRA
    jQuery(this).parent().before(blacklistBarra);
    if (localStorage.getItem('blacklist') == 'on') {
        if (localStorage.getItem(localvalue) == 'true') {
            jQuery(this).parent().hide();
        } else {
            jQuery(this).parent().prev().hide();
        }
    } else
        jQuery(this).parent().prev().hide();


});
// Fin de la primera carga

jQuery("#toggle").click(function () {

    //	jQuery('#toggle').toggleClass("toggle-on toggle-off");

    if (localStorage.getItem('blacklist') == 'on') {
        jQuery('#toggle').addClass("toggle-off");
        jQuery('#toggle').removeClass("toggle-on");
        localStorage.setItem('blacklist', 'off');
    } else {
        jQuery('#toggle').addClass("toggle-on");
        jQuery('#toggle').removeClass("toggle-off");
        localStorage.setItem('blacklist', 'on');
    }
    console.log(localStorage.getItem('blacklist'));
    //Tenemos un nuevo estado. Si ahora es on, tenemos que ocultar, si es off tenemos que mostrar
    jQuery('.autor').each(function () {
        var localvalue = 'blacklist.' + jQuery(this).data('name');
        if (localStorage.getItem('blacklist') == 'on') {
            if (localStorage.getItem(localvalue) == 'true') {
                jQuery(this).parent().prev().show();
                jQuery(this).parent().hide();
            }
        } else {
            if (localStorage.getItem(localvalue) == 'true') {
                jQuery(this).parent().prev().hide();
                jQuery(this).parent().slideDown();
                jQuery('.social').show();
            }
        }
    });
});
// Fin de actualización

jQuery(".blacklist").click(function () {
    var localvalue = 'blacklist.' + jQuery(this).parent().parent().parent().data('name');
    if (localStorage.getItem(localvalue) == 'true')
        localStorage.removeItem(localvalue);
    else
        localStorage.setItem(localvalue, 'true');

    console.log('set ' + localvalue + ' = ' + localStorage.getItem(localvalue));


    // En caso de blacklist ON Tapar los posts del autor si ahora esta blacklisted, o mostrarlos en caso contrario.
    // Si esta off, añadir pijadas o quitarlas.

    jQuery('.autor').each(function () {
        var localvalue = 'blacklist.' + jQuery(this).data('name');


        if (localStorage.getItem(localvalue) == 'true') {
            jQuery(this).find(".blacklist").addClass('blacklist-on');
            jQuery(this).find(".blacklist").removeClass('blacklist-off');
            jQuery(this).parent().find(".blacklisted-post").show();
            jQuery(this).parent().find(".tapavatares").show();
        } else {
            jQuery(this).find(".blacklist").addClass('blacklist-off');
            jQuery(this).find(".blacklist").removeClass('blacklist-on');
            jQuery(this).parent().find(".blacklisted-post").hide();
            jQuery(this).parent().find(".tapavatares").hide();
        }

        if (localStorage.getItem('blacklist') == 'on') {
            if (localStorage.getItem(localvalue) == 'true') {
                jQuery(this).parent().prev().show();
                jQuery(this).parent().slideUp();
            } else {
                jQuery(this).parent().slideDown();
                jQuery(this).parent().prev().hide();
            }
        } else
        if (localStorage.getItem(localvalue) == 'true') {
            //añadir pijadas
        } else {
            //quitar pijadas
        }
    });
    // Fin de actualización
});
//jQuery("a.tooltip").tipsy();
