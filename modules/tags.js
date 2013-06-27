(function ($, UserTools) {

    UserTools.options.setDefault('TagsOpcion', true);

    if (UserTools.options.get('TagsOpcion')) {
	$(function () {
	    // Dibuja tags en el hilo
	    var utTags = UserTools.options.get('-Tags', {});

	    $(':not(form)> div.post > div.autor > dl > dt > a').each(function() {
		var nick = $(this).text();
		if (typeof utTags[nick] !== "undefined") { // dibuja con datos
		    $(this).closest('.autor').append('<div class="ut_tag" style="background-color: '+utTags[nick].color+'">'+utTags[nick].tag+'</div><div class="ut_tag_info" style="display:none;"><div class="ut_tag_info_cerrar">x</div><form class="ut_tag_form">&gt; Tag<br><input class="ut_tag_tag" value="'+utTags[nick].tag+'" maxlength="25"><br />&gt; Color<div class="ut_tag_colores" style="display: inline;"><div class="ut_tag_colores_1"></div><div class="ut_tag_colores_2"></div><div class="ut_tag_colores_3"></div><div class="ut_tag_colores_4"></div><div class="ut_tag_colores_5"></div><div class="ut_tag_colores_6"></div></div><br><input class="ut_tag_color" value="'+utTags[nick].color+'" maxlength="26"><br />&gt; <span class="ut_tag_link_span"><a href="'+utTags[nick].link+'" target="_blank">Link</a></span><br><input class="ut_tag_link" value="'+utTags[nick].link+'"><br />&gt; Descripción<br><textarea class="ut_tag_desc" style="width: 110px;">'+utTags[nick].desc+'</textarea><br /><input type="submit" style="margin-top: 1px;" value="Guardar"></form></div>');
		    if (utTags[nick].link === "") { // quita el link si no tiene enlace
			$(this).closest('.autor').children('.ut_tag_info').children('.ut_tag_form').children('.ut_tag_link_span').replaceWith('<span class="ut_tag_link_span">Link</span>');
		    }
		}
		else { // dibuja sin datos
		    $(this).closest('.autor').append('<div class="ut_tag ut_tag_vacia" style="background-color: #aaaaaa; opacity: 0.25; width: 9px; height: 15px; overflow: hidden;">+ etiqueta</div><div class="ut_tag_info" style="display:none;"><div class="ut_tag_info_cerrar">x</div><form class="ut_tag_form">&gt; Tag<br><input class="ut_tag_tag" placeholder="Tag" maxlength="25"><br />&gt; Color<div class="ut_tag_colores" style="display: inline;"><div class="ut_tag_colores_1"></div><div class="ut_tag_colores_2"></div><div class="ut_tag_colores_3"></div><div class="ut_tag_colores_4"></div><div class="ut_tag_colores_5"></div><div class="ut_tag_colores_6"></div></div><br><input class="ut_tag_color" placeholder="#5eadb9" maxlength="26"><br />&gt; <span class="ut_tag_link_span">Link</span><br><input class="ut_tag_link" placeholder="http://"><br />&gt; Descripción<br><textarea placeholder="Descripción" class="ut_tag_desc" style="width: 110px;"></textarea><br /><input type="submit" style="margin-top: 1px;" value="Guardar"></form></div>');
		}

		$(this).closest('.autor').children(".ut_tag_info").on('submit', 'form.ut_tag_form', function() { // guardamos datos del tag
		    var $tag = $(this).children(".ut_tag_tag");
		    var $color = $(this).children(".ut_tag_color");
		    var $link = $(this).children(".ut_tag_link");
		    var $desc = $(this).children(".ut_tag_desc");
		    var tag = $tag.val();
		    var color = $color.val();
		    if (color === "") { // si no se rellena el color, mete uno default
			var color = '#1392ED';
		    }
		    var link = $link.val();
		    var desc = $desc.val();

		    utTags[''+nick+''] = {tag:''+tag+'', color:''+color+'', link:''+link+'', desc:''+desc+''};

		    if (utTags[''+nick+''].tag !== "") { // si el tag esta relleno mete y actualiza
			$(':not(form)> div.post > div.autor > dl > dt > a:contains("'+nick+'")').each(function() {
			    $(this).closest('.autor').children('.ut_tag').replaceWith('<div class="ut_tag" style="background-color: '+utTags[nick].color+'">'+utTags[nick].tag+'</div>');
			    $(this).closest('.autor').children('.ut_tag_info').children('.ut_tag_form').children('.ut_tag_tag').attr('value',''+utTags[nick].tag+'');
			    $(this).closest('.autor').children('.ut_tag_info').children('.ut_tag_form').children('.ut_tag_color').attr('value',''+utTags[nick].color+'');
			    $(this).closest('.autor').children('.ut_tag_info').children('.ut_tag_form').children('.ut_tag_link').attr('value',''+utTags[nick].link+'');
			    $(this).closest('.autor').children('.ut_tag_info').children('.ut_tag_form').children('.ut_tag_link_span').replaceWith('<span class="ut_tag_link_span"><a href="'+utTags[nick].link+'" target="_blank">Link</a></span>');
			    $(this).closest('.autor').children('.ut_tag_info').children('.ut_tag_form').children('.ut_tag_desc').text(''+utTags[nick].desc+'');
			    if (utTags[nick].link === "") { // quita el link si no tiene enlace
				$(this).closest('.autor').children('.ut_tag_info').children('.ut_tag_form').children('.ut_tag_link_span').replaceWith('<span class="ut_tag_link_span">Link</span>');
			    }
			    $(this).closest('div.autor').children('.ut_tag_info').hide();
			});
		    }
		    else { // si el tag esta vacio borra key y deja default
			$(':not(form)> div.post > div.autor > dl > dt > a:contains("'+nick+'")').each(function() {
			    delete utTags[''+nick+''];
			    $(this).closest('.autor').children('.ut_tag').replaceWith('<div class="ut_tag ut_tag_vacia" style="background-color: #aaaaaa; opacity: 0.25; width: 9px; height: 15px; overflow: hidden;">+ etiqueta</div>');
			    $(this).closest('.autor').children('.ut_tag_info').children('.ut_tag_form').replaceWith('<form class="ut_tag_form">&gt; Tag<br><input class="ut_tag_tag" placeholder="Tag" maxlength="25"><br />&gt; Color<div class="ut_tag_colores" style="display: inline;"><div class="ut_tag_colores_1"></div><div class="ut_tag_colores_2"></div><div class="ut_tag_colores_3"></div><div class="ut_tag_colores_4"></div><div class="ut_tag_colores_5"></div><div class="ut_tag_colores_6"></div></div><br><input class="ut_tag_color" placeholder="#5eadb9" maxlength="26"><br />&gt; <span class="ut_tag_link_span">Link</span><br><input class="ut_tag_link" placeholder="http://"><br />&gt; Descripción<br><textarea placeholder="Descripción" class="ut_tag_desc" style="width: 110px;"></textarea><br /><input type="submit" style="margin-top: 1px;" value="Guardar"></form>');
			    $(this).closest('div.autor').children('.ut_tag_info').hide();
			});
		    }
		    UserTools.options.set('-Tags', utTags);

		    return false;
		});
	    });
	    // Funciones de los botones
	    $('.autor').each(function() {
		$(this).on('click', '.ut_tag, .ut_tag_info_cerrar', function(){
		    $(this).closest('div.autor').children('.ut_tag_info').toggle();
		});
	    });

	    $('.autor').each(function() {
		$(this).on('click', '.ut_tag_colores_1, .ut_tag_colores_2, .ut_tag_colores_3, .ut_tag_colores_4 , .ut_tag_colores_5, .ut_tag_colores_6 ', function(){
		    var color = $(this).css('background-color');
		    $(this).closest('div.ut_tag_colores').siblings('.ut_tag_color').attr('value',''+color+'');
		});
	    });
	});
    }

})(jQuery, window.UserTools);
