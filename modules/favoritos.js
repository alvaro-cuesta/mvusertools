(function ($, UT) {

    UT.options.setDefault('filtrarfavs', true);
    UT.options.setDefault('ordenarposts', true);

    // Filtrar favoritos
    if (UT.options.get('filtrarfavs')) {
	$(function () {

            $('#favoritos .tinycol').prepend('<div id="ut-filtros-fav">');
            $('<h3 id="ut-fav-filto-titulo">').text('Filtros').insertBefore('#ut-filtros-fav');

            /* Movemos y filtramos iconos de foros */
            $(document).on('mouseover', 'body', function () {
		$('#tfav a.foroicon').each(function () {
                    $('#ut-filtros-fav').append($(this).clone());
		});
		var utforosUnicos = {};
		$('#ut-filtros-fav a.foroicon').each(function () {
                    $(this).attr('href', '#filtrados');
                    var interiorA = $(this).html();
                    if (utforosUnicos[interiorA])
			$(this).remove();
                    else
			utforosUnicos[interiorA] = true;
		});
            });

            /* Filtramos foros y categorias */
            $(document).on('click', '#ut-filtros-fav a.foroicon', function () {
		$('#ut-filtros-fav a.foroicon').removeClass('ut-opacity');
		$('#tfav tr').removeClass('utfiltrado');
		$('#ut-filtros-tags').remove();
		$('#tfav a.foroicon').closest('tr').attr('style', 'display: table-row;');
		var foroImgSrc = $(this).children('i').attr("class").match(/fid_(.*)/)[1];
		$('#tfav a.foroicon i').not('.fid_' + foroImgSrc + '').closest('tr').addClass('utfiltrado').hide();
		$('#ut-filtros-fav a.foroicon').not(this).addClass('ut-opacity');

		$('<div id="ut-filtros-tags">').insertAfter('#ut-filtros-fav');
		$('#tfav tr').not('tr.utfiltrado').children('td.dash').children('a.cat2').each(function () {
                    $('#ut-filtros-tags').append($(this).clone().removeAttr('title'));
		});
		$('#ut-filtros-tags a.cat2 img').removeAttr('alt', 'style');
		var utCatsUnicos = {};
		$('#ut-filtros-tags a.cat2').each(function () {
                    $(this).attr('href', '#filtrados');
                    var interiorB = $(this).html();
                    if (utCatsUnicos[interiorB])
			$(this).remove();
                    else
			utCatsUnicos[interiorB] = true;
		});
            });

            $(document).on('click', '#ut-filtros-tags a.cat2', function () {
		$('#ut-filtros-tags a.cat2').removeClass('ut-opacity');
		$('#tfav a.foroicon').closest('tr').not('tr.utfiltrado').attr('style', 'display: table-row;');
		var catImgSrc = $(this).children('img').attr('src');
		$('#tfav a.cat2 img').not('img[src="' + catImgSrc + '"]').closest('tr').hide();
		$('#ut-filtros-tags a.cat2').not(this).addClass('ut-opacity');
            });

            /* Quitamos filtros */
            $('<p id="utFavQuitar">').text('Quitar filtro.').insertAfter('#ut-filtros-fav');
            $(document).on('click', '#utFavQuitar', function () {
		$('#ut-filtros-fav a.foroicon').removeClass('ut-opacity');
		$('#tfav tr').removeClass('utfiltrado');
		$('#ut-filtros-tags').remove();
		$('#tfav a.foroicon').closest('tr').attr('style', 'display: table-row;');
            });

            /* Aviso para los que tienen más de 30 favoritos */
            var utVerMasFav = $('#favoritos .tfooter #moar').text();
            if (utVerMasFav === 'Ver más') {
		$('<p id="utFavAviso">').text('Tienes más de 30 favoritos +').insertAfter('#utFavQuitar');
		$('<div id="utFavAvisoTxt">').html('Para que el filtro funcione con todos tus hilos guardados en favoritos, debes darle al botón de "Ver más" al final de la lista de hilos. Si no se muestran el filtro no tendrá efecto en ellos.').insertAfter('#utFavAviso');
		$('#utFavAviso').click(function () {
                    $('#utFavAvisoTxt').slideToggle();
                    if ($('#utFavAviso').text() === 'Tienes más de 30 favoritos +') {
			$('#utFavAviso').text('Tienes más de 30 favoritos -');
                    } else {
			$('#utFavAviso').text('Tienes más de 30 favoritos +');
                    }
		});
            }
	});
    }

    // Ordenar por respuestas sin leer en favoritos (bug con hilos con 1k)
    if (UT.options.get('ordenarposts')) {
	$(function () {

            var $table = $('div#main table.full');
            $('<span style="font-size: 10px; margin-left: 20px;">Ordenar por: <span style="cursor: pointer; color: #EF5000;" id="ut-fav-fecha">Fecha</span> | <span style="cursor: pointer; color: #999999;" id="ut-fav-posts">Respuestas sin leer</span></span>').insertAfter('body#favoritos table#tfav th span.left');
            $('<span style="font-size: 10px; margin-left: -110px;">Ordenar por: <span style="cursor: pointer; color: #EF5000;" id="ut-fav-fecha">Fecha</span> | <span style="cursor: pointer; color: #999999;" id="ut-fav-posts">Respuestas sin leer</span></span>').insertAfter('body#foros table.full th span.left');
            var originalRows = $table.find('tr').slice(1).get(),
            rows = originalRows.slice(0);

            $("#ut-fav-posts").click(function () {
		rows.sort(function (a, b) {
                    var keyA = +$(a).find('a.unreadcount').text();
                    var keyB = +$(b).find('a.unreadcount').text();
                    if (keyA < keyB) return 1;
                    if (keyA > keyB) return -1;
                    return 0;
		});
		$.each(rows, function (index, row) {
                    $table.children('tbody').append(row);
		});
		$("#ut-fav-posts").css('color', '#EF5000');
		$("#ut-fav-fecha").css('color', '#999999');
            });

            $("#ut-fav-fecha").click(function () {
		$.each(originalRows, function (index, row) {
                    $table.children('tbody').append(row);
		});
		$("#ut-fav-posts").css('color', '#999999');
		$("#ut-fav-fecha").css('color', '#EF5000');
            });

	});
    }

})(jQuery, window.UserTools);
