(function ($, UserTools) {

    UserTools.options.setDefault('mensajeupdate', false);

    $(function () {

	/////////// MENU ///////////////////////////////////////////////////////////////
	var bottominfo = '<p style="margin-top: 20px; font-size: 9px; color: #888888;">Si ves algún fallo prueba siempre a hacer ctrl+f5. Si así no se ha solucionado comunícanoslo con un post en <a href="http://www.mediavida.com/foro/4/mv-usertools-extension-para-firefox-chrome-safari-413818">el hilo oficial</a> indicando navegador y su versión, sistema operativo y, si es posible, una screen del error.<br /><br />Instrucciones y más información en <a href="http://mvusertools.com" target="_blank">la web oficial de la extensión</a>.</p>';

	// Forma del menu
	$('<div id="ut-config" class="last" style="margin-left: 10px;"><ul class="bar" style="margin: 0px 0px 0px 10px; padding: 0px 12px;"><li><a id="ut-menu" class="sprite config uextra" style="cursor: pointer; margin: 0px 0px 0px -5px;"><span class="utmenubutton">Ut</span></a></li></ul></div>').insertAfter('#userinfo');
	$('<div style="display: none;" id="ut-mask-menu"></div>').insertBefore('#background');
	var utmenutabs = '<div id="ut-menu-tabs"><div id="ut-menu-tab1" class="active">Modulos</div><div id="ut-menu-tab2">Estilos</div><div id="ut-menu-tab4">Macros</div><div id="ut-menu-tab3">Sobre MV-UT</div></div>';
	var utmenutabla1 = '<table id="ut-menu-tabla1" class="ut-opciones"><tbody><tr><td>Ventana con aviso y notas de actualización al actualizar.</td><td><span class="ut-boton-sino" id="ut-utmensajeupdate-si">Si</span> <span class="ut-boton-sino" id="ut-utmensajeupdate-no">No</span></td></tr><tr><td>Activar tags (etiquetas).</td><td><span class="ut-boton-sino" id="ut-utTagsOpcion-si">Si</span> <span class="ut-boton-sino" id="ut-utTagsOpcion-no">No</span></td></tr><tr><td>Tener siempre a la vista foros favoritos.</td><td><span class="ut-boton-sino" id="ut-utforosfavs-si">Si</span> <span class="ut-boton-sino" id="ut-utforosfavs-no">No</span></td></tr><tr><td>Activar filtro para hilos en favoritos.</td><td><span class="ut-boton-sino" id="ut-utfiltrarfavs-si">Si</span> <span class="ut-boton-sino" id="ut-utfiltrarfavs-no">No</span></td></tr><td>Links importantes al final de la página</td><td><span class="ut-boton-sino" id="ut-linksfooter-si">Si</span> <span class="ut-boton-sino" id="ut-linksfooter-no">No</span></td></tr><tr style="background: none;"><td><p id="ut-utlinksfooteroscuro" style="color: #999999;">Links importantes estilo oscuro usando theme predeterminado</p></td><td><span class="ut-boton-sino" id="ut-utlinksfooteroscuro-si">Si</span> <span class="ut-boton-sino" id="ut-utlinksfooteroscuro-no">No</span></td></tr><tr><td>Tabla de mods</td><td><span class="ut-boton-sino" id="ut-uttablamods-si">Si</span> <span class="ut-boton-sino" id="ut-uttablamods-no">No</span></td></tr><tr><td>Información del usuario al dejar el ratón sobre su nick</td><td><span class="ut-boton-sino" id="ut-utuserinfo-si">Si</span> <span class="ut-boton-sino" id="ut-utuserinfo-no">No</span></td></tr><tr><td>Opción para ordenar hilos por respuestas sin leer</td><td><span class="ut-boton-sino" id="ut-utordenarposts-si">Si</span> <span class="ut-boton-sino" id="ut-utordenarposts-no">No</span></td></tr><tr><td>Avisos en el favicon</td><td><span class="ut-boton-sino" id="ut-utfavicon-si">Si</span> <span class="ut-boton-sino" id="ut-utfavicon-no">No</span></td></tr><tr><td>Botón para ensanchar streams en hilos con Live! y postit (Experimental)</td><td><span class="ut-boton-sino" id="ut-utbigscreen-si">Si</span> <span class="ut-boton-sino" id="ut-utbigscreen-no">No</span></td></tr><tr><td>Recupera el texto escrito en el formulario extendido si se cierra la pestaña o navegador (Experimental)</td><td><span class="ut-boton-sino" id="ut-utsalvarposts-si">Si</span> <span class="ut-boton-sino" id="ut-utsalvarposts-no">No</span></td></tr></tbody></table>';
	var utmenutabla2 = '<table id="ut-menu-tabla2" class="ut-opciones" style="display: none;"><tbody><tr><td>Marcapáginas</td><td><span class="ut-boton-sino" id="ut-utmarcapaginas-si">Si</span> <span class="ut-boton-sino" id="ut-utmarcapaginas-no">No</span></td></tr><tr><td>Hilos con Live! activado destacados (solo para theme predeterminado)</td><td><span class="ut-boton-sino" id="ut-utlivesdestacados-si">Si</span> <span class="ut-boton-sino" id="ut-utlivesdestacados-no">No</span></td></tr><tr><td>Nuevo estilo para los spoilers</td><td><span class="ut-boton-sino" id="ut-utestilospoilers-si">Si</span> <span class="ut-boton-sino" id="ut-utestilospoilers-no">No</span></td></tr><tr><td>Quitar ventanas flotantes en Avisos, Favs y Msj dejandolo como antes</td><td><span class="ut-boton-sino" id="ut-utantiguoslinksuserinfo-si">Si</span> <span class="ut-boton-sino" id="ut-utantiguoslinksuserinfo-no">No</span></td></tr><tr><td>Cambiar algunos nombres de usuarios y foros</td><td><span class="ut-boton-sino" id="ut-utCambiosNombre-si">Si</span> <span class="ut-boton-sino" id="ut-utCambiosNombre-no">No</span></td></tr><tr><td>Añadir botón para cerrar spoilers al final del mismo</td><td><span class="ut-boton-sino" id="ut-utcerrarspoilers-si">Si</span> <span class="ut-boton-sino" id="ut-utcerrarspoilers-no">No</span></td></tr></tbody></table>';
	var utmenutabla3 = '<table id="ut-menu-tabla3" style="display: none;"><tbody><tr><td><a href="http://mvusertools.com" target="_blank"><img src="http://www.mediavida.com/img/f/mediavida/2012/11/55268_mv_usertools_extension_para_firefox_chrome_opera_safari_0_full.png" width="48" height="48"><p>MV-Usertools</a> desarrollado por <a href="/id/Vegon">Vegon</a> y <a href="/id/cm07">cm07</a></p><br /><br /><p><a style="cursor: pointer;" id="ut-menu-notasdeparche">Notas del último parche.</a> Versión ' + UserTools.version + '.</p><br /><p>Atajos de teclado:<ul><li>- Ir a Favoritos: ctrl+alt+e</li><li>- Ir a Perfil: ctrl+alt+q</li><li>- Ir a Avisos: ctrl+alt+w</li><li>- Ir a Mensajes: ctrl+alt+r</li><li>- Ir a Foros: ctrl+alt+a</li><li>- Ir a Spy: ctrl+alt+d</li><li>- Abrir/Cerrar todos los spoilers: ctrl+alt+s</li><li>- Ir a la anterior página del hilo: ctrl+alt+z</li><li>- Ir a la siguiente página del hilo: ctrl+alt+x</li></ul></p><br /><br /><p>Para comunicar bugs usa el <a href="http://www.mediavida.com/foro/4/mv-usertools-extension-para-firefox-chrome-opera-safari-413818">hilo oficial</a>. Si tienes dudas de como funciona algun modulo u opción visita el <a href="http://mvusertools.com/caracteristicas">manual en la web oficial</a> que siempre está actualizado con las ultimas novedades.</p><br /><br /><p>Si las MV-Usertools te resultan utiles y quieres agradecernos las horas de trabajo detrás de ellas, tiranos algunas monedas.</p><br /><form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="2TD967SQAC6HC"><input type="image" src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal. La forma rápida y segura de pagar en Internet."><img alt="" border="0" src="https://www.paypalobjects.com/es_ES/i/scr/pixel.gif" width="1" height="1"></form></td></tr></tbody></table>';
	var utmenutabla4 = '<table id="ut-menu-tabla4" style="display: none;"><tbody><tr><td><form id="ut-macros-form"><input id="ut-title" placeholder="Título" maxlength="17"><br /><textarea id="ut-macro" placeholder="Macro"></textarea><br /><input type="submit" value="Guardar" style="margin-top: 3px;" ></form><ul id="ut-macros"></ul></td></tr></tbody></table>';
	$('<div style="display: none;" id="ut-dialog-menu"><div id="ut-window"><div id="ut-menu-contenido">' + utmenutabs + '' + utmenutabla1 + '' + utmenutabla2 + '' + utmenutabla4 + '' + utmenutabla3 + '</div>' + bottominfo + '<a style="float: right; margin-top: 10px; cursor: pointer;" id="ut-menu-cerrar">Cerrar</a></div></div>').insertBefore('#content_head');
	$('#ut-menu-tabla1 tr:odd, #ut-menu-tabla2 tr:odd, #ut-menu-tabla3 tr:odd').addClass('odd');
	$('#ut-menu-tab1').click(function () {
	    $('#ut-menu-tab1').addClass('active');
	    $('#ut-menu-tab2').removeClass('active');
	    $('#ut-menu-tab3').removeClass('active');
	    $('#ut-menu-tab4').removeClass('active');
	    $('#ut-menu-tabla1').show();
	    $('#ut-menu-tabla2').hide();
	    $('#ut-menu-tabla3').hide();
	    $('#ut-menu-tabla4').hide();
	});
	$('#ut-menu-tab2').click(function () {
	    $('#ut-menu-tab1').removeClass('active');
	    $('#ut-menu-tab2').addClass('active');
	    $('#ut-menu-tab3').removeClass('active');
	    $('#ut-menu-tab4').removeClass('active');
	    $('#ut-menu-tabla1').hide();
	    $('#ut-menu-tabla2').show();
	    $('#ut-menu-tabla3').hide();
	    $('#ut-menu-tabla4').hide();
	});
	$('#ut-menu-tab3').click(function () {
	    $('#ut-menu-tab1').removeClass('active');
	    $('#ut-menu-tab2').removeClass('active');
	    $('#ut-menu-tab3').addClass('active');
	    $('#ut-menu-tab4').removeClass('active');
	    $('#ut-menu-tabla1').hide();
	    $('#ut-menu-tabla2').hide();
	    $('#ut-menu-tabla3').show();
	    $('#ut-menu-tabla4').hide();
	});
	$('#ut-menu-tab4').click(function () {
	    $('#ut-menu-tab1').removeClass('active');
	    $('#ut-menu-tab2').removeClass('active');
	    $('#ut-menu-tab3').removeClass('active');
	    $('#ut-menu-tab4').addClass('active');
	    $('#ut-menu-tabla1').hide();
	    $('#ut-menu-tabla2').hide();
	    $('#ut-menu-tabla3').hide();
	    $('#ut-menu-tabla4').show();
	});
	$('#ut-menu').click(function () {
	    $('#ut-mask-menu').show();
	    $('#ut-dialog-menu').show();
	});
	$('#ut-menu-cerrar').click(function () {
	    $('#ut-dialog-menu').hide();
	    $('#ut-mask-menu').hide();
	});
	$('#ut-mask-menu').click(function () {
	    $('#ut-dialog-menu').hide();
	    $('#ut-mask-menu').hide();
	});
	var nicklenght = $('#userinfo a[href^="/id/"]').text().length;

	if (nicklenght > 10) {
            $('#nav_bar #buscar').css('width', '130px');
            $('#nav_bar #sbii').css('width', '93px');
            $('#nav_bar .bbii').css('left', '103px');
	}
	if (nicklenght == 7) {
            $('#nav_bar #buscar').css('width', '170px');
            $('#nav_bar #sbii').css('width', '133px');
            $('#nav_bar .bbii').css('left', '143px');
	}

	// Mensaje al updatear
	var utpatchnotes = '<p style="font-size: 16px; font-weight: bold;">Actualización ' + UserTools.version + '</p><br /><br />\
- Cambio de arquitectura (bug alert).
- Mejoras de rendimiento.<br /><br />\
';

	$('<div style="display: none" id="ut-mask"></div>').insertBefore('#background');
	$('<div style="display: none" id="ut-dialog"><a href="http://mvusertools.com" target="_blank"><img style="margin: 0 150px;" src="http://www.mediavida.com/img/f/mediavida/2012/10/02632_mv_usertools_extension_para_firefox_chrome_safari_0_full.png"></a><div id="ut-window">' + utpatchnotes + '' + bottominfo + '<a style="float: right; margin-top: 10px; cursor: pointer;" id="ut-box-cerrar">Cerrar</a></div></div>').insertBefore('#content_head');

	if (UserTools.options.get('mensajeupdate')) {
	    if (UserTools.options.get('versionls') !== UserTools.version) {
		$('div#ut-mask').show();
		$('div#ut-dialog').show();
		UserTools.options.set('versionls', UserTools.version);
	    }
	} else {
	    UserTools.options.set('versionls', UserTools.version);
	}

	$('#ut-menu-notasdeparche').click(function () {
	    $('#ut-dialog-menu').hide();
	    $('#ut-mask-menu').hide();
	    $('div#ut-mask').show();
	    $('div#ut-dialog').show();
	});
	$('#ut-box-cerrar').click(function () {
	    $('div#ut-mask').hide();
	    $('div#ut-dialog').hide();
	});
	$('#ut-mask').click(function () {
	    $('div#ut-mask').hide();
	    $('div#ut-dialog').hide();
	});

	// Version en el footer
	if (typeof UserTools.version === undefined) {
	    $('div#footer div.f_info p').append('• <a href="http://mvusertools.com" target="_blank">MV-Usertools</a>');
	} else {
	    $('div#footer div.f_info p').append('• <a href="http://mvusertools.com" target="_blank">MV-Usertools</a> ' + UserTools.version + '');
	}

	// Estilos de opciones
	var ON_COLOR = '#EF5000';
	var OFF_COLOR = '#999999';
	var OSCURO_COLOR = '#222222';

	var optionMarkup = function (opcion) {
	    var $si = $('#ut-ut' + opcion + '-si');
	    var $no = $('#ut-ut' + opcion + '-no');

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
