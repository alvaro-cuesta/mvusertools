Limpiar:
- main.js
- css.js
- botoneras.js
- favoritos.js
- tags.js
- blacklist.js
- usertools.js
- bigscreen.js

Por hacer:
- bigscreen.js
- blacklist.js

Bundler:
- Firefox
- Opera
- Safari
- Chrome
- Makefile para windows con copy
- Quitar comentarios y añadir el header a manubrio

Sistema REAL de módulos:
- Sin opciones hardcoded

Fixear:
- Guardar posts
- Greentext

Nuevos módulos:
- Infinite loading
- Load auto cuando sale el mensaje

Más cosas:
- Mostrar en el mensaje de hotkeys las agregadas dinámicamente
- Añadir > a los selectores.
- Sacar $ constructores fuera del $
- Elimintar parents siblings y demás caca
- Modularizar CSS pero cargar de golpe
- Modularizar HTML
- Quitar los chorros de HTML en macros
- Cambios de opciones en tiempo real


Nuevo estilo para los QUOTES
jQuery(function() {
if (UserTools.options.get('newquote')) {
jQuery(function() {
if (UserTools.isDark == 0) {
jQuery('div.msg div.body').addClass('newquote');
}
else {
jQuery('div.msg div.body').addClass('newquoteblack');
}
});
}
});

> Greentext (no funciona, hace que dejen de ir los popups de las imagenes y los el hover de los quotes)
> Implicando que no mola
ersion original
jQuery('div[id^="cuerpo_"]').html(
function (i,h) {
return h.replace(/^\s*&gt.*/mg, function(a) {
if (UserTools.isDark) {
return "<span style='color: #A7BD68;'>" + a + "</span>"
} else {
return "<span style='color: #789922;'>" + a + "</span>"
}
});
});
ueva prueba
jQuery(document).on('click','body', function(){
jQuery('div[id^="cuerpo_"]').html(
function (i,h) {
return h.replace(/^\s*&gt.*/mg, function(a) {
if (UserTools.isDark) {
return "<span style='color: #A7BD68;'>" + a + "</span>"
} else {
return "<span style='color: #789922;'>" + a + "</span>"
}
});
});
});

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
