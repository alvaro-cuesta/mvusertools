/*
 * Sistema de tagging de usuarios.
 */

(function ($, UserTools) {
    UserTools.options.setDefault('TagsOpcion', true);

    UserTools.options.$('TagsOpcion', function() {
	var tags = UserTools.options.get('-Tags', {});

	// Dibuja tags en el hilo
	$(':not(form)> div.post > div.autor > dl > dt > a').each(function () {
	    var $this = $(this);
	    var nick = $this.text();

	    // dibuja con datos
	    if (typeof tags[nick] !== "undefined") {
		$this
		    .closest('.autor')
		    .append('<div class="ut_tag" style="background-color: ' + tags[nick].color+'">' + tags[nick].tag + '</div><div class="ut_tag_info" style="display:none;"><div class="ut_tag_info_cerrar">x</div><form class="ut_tag_form">&gt; Tag<br><input class="ut_tag_tag" value="'+tags[nick].tag+'" maxlength="25"><br />&gt; Color<div class="ut_tag_colores" style="display: inline;"><div class="ut_tag_colores_1"></div><div class="ut_tag_colores_2"></div><div class="ut_tag_colores_3"></div><div class="ut_tag_colores_4"></div><div class="ut_tag_colores_5"></div><div class="ut_tag_colores_6"></div></div><br><input class="ut_tag_color" value="'+tags[nick].color+'" maxlength="26"><br />&gt; <span class="ut_tag_link_span"><a href="' + tags[nick].link + '" target="_blank">Link</a></span><br><input class="ut_tag_link" value="'+tags[nick].link+'"><br />&gt; Descripción<br><textarea class="ut_tag_desc" style="width: 110px;">'+tags[nick].desc+'</textarea><br /><input type="submit" style="margin-top: 1px;" value="Guardar"></form></div>');

		if (tags[nick].link === "") { // quita el link si no tiene enlace
		    $this
			.closest('.autor')
			.children('.ut_tag_info')
			.children('.ut_tag_form')
			.children('.ut_tag_link_span')
			.replaceWith('<span class="ut_tag_link_span">Link</span>');
		}
	    }
	    // dibuja sin datos
	    else {
		$this
		    .closest('.autor')
		    .append('<div class="ut_tag ut_tag_vacia" style="background-color: #aaaaaa; opacity: 0.25; width: 9px; height: 15px; overflow: hidden;">+ etiqueta</div><div class="ut_tag_info" style="display:none;"><div class="ut_tag_info_cerrar">x</div><form class="ut_tag_form">&gt; Tag<br><input class="ut_tag_tag" placeholder="Tag" maxlength="25"><br />&gt; Color<div class="ut_tag_colores" style="display: inline;"><div class="ut_tag_colores_1"></div><div class="ut_tag_colores_2"></div><div class="ut_tag_colores_3"></div><div class="ut_tag_colores_4"></div><div class="ut_tag_colores_5"></div><div class="ut_tag_colores_6"></div></div><br><input class="ut_tag_color" placeholder="#5eadb9" maxlength="26"><br />&gt; <span class="ut_tag_link_span">Link</span><br><input class="ut_tag_link" placeholder="http://"><br />&gt; Descripción<br><textarea placeholder="Descripción" class="ut_tag_desc" style="width: 110px;"></textarea><br /><input type="submit" style="margin-top: 1px;" value="Guardar"></form></div>');
	    }

	    $this
		.closest('.autor')
		.children(".ut_tag_info")
		.on('submit', 'form.ut_tag_form', function() { // guardamos datos del tag
		    var $this = $(this);
		    var $tag = $this.children(".ut_tag_tag");
		    var $color = $this.children(".ut_tag_color");
		    var $link = $this.children(".ut_tag_link");
		    var $desc = $this.children(".ut_tag_desc");
		    var tag = $tag.val();
		    var color = $color.val();
		    if (color === "") { // si no se rellena el color, mete uno default
			var color = '#1392ED';
		    }
		    var link = $link.val();
		    var desc = $desc.val();

		    tags[nick] = {
			'tag': tag,
			'color': color,
			'link': link,
			'desc': desc
		    };

		    // si el tag esta relleno mete y actualiza
		    if (tags[nick].tag !== "") {
			$(':not(form)> div.post > div.autor > dl > dt > a:contains("'+nick+'")').each(function() {
			    $this
				.closest('.autor')
				.children('.ut_tag')
				.replaceWith('<div class="ut_tag" style="background-color: ' + tags[nick].color + '">' + tags[nick].tag + '</div>');

			    var $tag_form = $this
				.closest('.autor')
				.children('.ut_tag_info')
				.children('.ut_tag_form');

			    $tag_form.children('.ut_tag_tag')
				.attr('value', tags[nick].tag);
			    $tag_form.children('.ut_tag_color')
				.attr('value', tags[nick].color);
			    $tag_form
				.children('.ut_tag_link')
				.attr('value', tags[nick].link);
			    $tag_form
				.children('.ut_tag_link_span')
				.replaceWith('<span class="ut_tag_link_span"><a href="' + tags[nick].link + '" target="_blank">Link</a></span>');
			    $tag_form
				.children('.ut_tag_desc')
				.text(''+tags[nick].desc+'');

			    // quita el link si no tiene enlace
			    if (tags[nick].link === "") {
				$tag_form
				    .children('.ut_tag_link_span')
				    .replaceWith('<span class="ut_tag_link_span">Link</span>');
			    }

			    $this
				.closest('div.autor')
				.children('.ut_tag_info').hide();
			});
		    }
		    // si el tag esta vacio borra key y deja default
		    else {
			$(':not(form)> div.post > div.autor > dl > dt > a:contains("' + nick + '")').each(function () {
			    delete tags[nick];
			    $this
				.closest('.autor')
				.children('.ut_tag')
				.replaceWith('<div class="ut_tag ut_tag_vacia" style="background-color: #aaaaaa; opacity: 0.25; width: 9px; height: 15px; overflow: hidden;">+ etiqueta</div>');
			    $this
				.closest('.autor')
				.children('.ut_tag_info')
				.children('.ut_tag_form')
				.replaceWith('<form class="ut_tag_form">&gt; Tag<br><input class="ut_tag_tag" placeholder="Tag" maxlength="25"><br />&gt; Color<div class="ut_tag_colores" style="display: inline;"><div class="ut_tag_colores_1"></div><div class="ut_tag_colores_2"></div><div class="ut_tag_colores_3"></div><div class="ut_tag_colores_4"></div><div class="ut_tag_colores_5"></div><div class="ut_tag_colores_6"></div></div><br><input class="ut_tag_color" placeholder="#5eadb9" maxlength="26"><br />&gt; <span class="ut_tag_link_span">Link</span><br><input class="ut_tag_link" placeholder="http://"><br />&gt; Descripción<br><textarea placeholder="Descripción" class="ut_tag_desc" style="width: 110px;"></textarea><br /><input type="submit" style="margin-top: 1px;" value="Guardar"></form>');
			    $this
				.closest('div.autor')
				.children('.ut_tag_info')
				.hide();
			});
		    }
		    UserTools.options.set('-Tags', tags);

		    return false;
		});
	});

	// Funciones de los botones
	$('.autor').each(function() {
	    var $this = $(this);

	    $this.on('click', '.ut_tag, .ut_tag_info_cerrar', function() {
		$this
		    .closest('div.autor')
		    .children('.ut_tag_info')
		    .toggle();
	    });

	    $this.on('click', '.ut_tag_colores_1, .ut_tag_colores_2, .ut_tag_colores_3, .ut_tag_colores_4 , .ut_tag_colores_5, .ut_tag_colores_6 ', function() {
		var color = $this.css('background-color');
		$this
		    .closest('div.ut_tag_colores')
		    .siblings('.ut_tag_color')
		    .attr('value',''+color+'');
	    });
	});
    });
})(jQuery, window.UserTools);
