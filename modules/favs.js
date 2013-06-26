(function (document, $, UserTools) {

    if (UserTools.options.get('forosfavs')) {

	$(function () {

	    var forosFav = UserTools.options.get('-forosFav', []);

            /*Container*/
            //$('<div id="foros-fav-float">').append('<div><ul id="ut-foros-fav">').insertBefore('#content_body, #content_head');
            $('<div id="sticky-anchor" style="position: absolute; top: 200px;">').insertBefore('#content_body, #content_head');
            $('<div id="foros-fav-float">').append('<div><ul id="ut-foros-fav">').insertAfter('#sticky-anchor');

            /*Dibujamos los foros favoritos en la lista*/
            var forosFavUpdate = function () {
		forosFav = UserTools.options.get('-forosFav', []);
		var forosFavDibujo = function () {
                    for (i = 0; i < forosFav.length; i++) {
			var foroNombre = $('div.fpanel div.info a.hb[href="/foro/' + forosFav[i] + '"]').html();
			$('#ut-foros-fav').append(
                            $('<li>').html('<a href="/foro/' + forosFav[i] + '"><i class="ifid fid_' + forosFav[i] + '"></i></a><div class="ut-foros-fav-borrar"><i class="sprite UT-trash"></i></div>')
			);
                    }
		};

		forosFavDibujo();
            };

            forosFavUpdate();

            /*Boton para añadir a favoritos*/
            $('div.fpanel div.icon').append('<div class="ut-foro-fav-add">');
            $("div.fpanel div.icon").hover(
		function () {
                    $(this).children('.ut-foro-fav-add').addClass('ut-foro-fav-add-moveup');

		},
		function () {
                    $(this).children('.ut-foro-fav-add').removeClass('ut-foro-fav-add-moveup');
		}
            );

            $('.ut-foro-fav-add').click(function () {
		$(this).closest('div.icon').find('i.ifid').each(function () {
                    var foroNumber = $(this).attr("class").match(/fid_(.*)/)[1];
                    if ($.inArray(foroNumber, forosFav) > -1) {
			forosFav.splice($.inArray(foroNumber, forosFav), 1);
			UserTools.options.set('-forosFav', forosFav);
			$('#foros-fav-float a[href="/foro/' + foroNumber + '"]').closest('li').remove();
                    } else {
			forosFav.push(foroNumber);
			UserTools.options.set('-forosFav', forosFav);
			$('#ut-foros-fav').append(
                            $('<li>').html('<a href="/foro/' + foroNumber + '"><i class="ifid fid_' + foroNumber + '"></i></a><div class="ut-foros-fav-borrar"><i class="sprite UT-trash"></i></div>')
			);
                    }
		});
		$(this).toggleClass('ut-foro-fav-added');
            });

            /*Botón para borrar*/
            $(document).on('click', '.ut-foros-fav-borrar', function () {
		$(this).siblings('a[href^="/foro"]').each(function () {
                    var enlace = this + "";
                    var split = enlace.split('/');
                    var path = split.splice(1, split.length - 1);
                    var pathIndexToGet = 3;
                    var foroNumber = path[pathIndexToGet];
                    forosFav.splice($.inArray(foroNumber, forosFav), 1);
		    UserTools.options.set('-forosFav', forosFav);
                    $(this).closest('li').remove();
                    $('div.fpanel').find('a[href="/foro/' + foroNumber + '"]').closest('div.info').siblings('div.icon').children('div.ut-foro-fav-add').toggleClass('ut-foro-fav-added');
		});
            });

            /*Pone la estrella correcta*/
            $('div.fpanel div.icon').each(function () {
		$(this).siblings('div.info').find('a.hb,strong a').each(function () {
                    var enlace = this + "";
                    var split = enlace.split('/');
                    var path = split.splice(1, split.length - 1);
                    var pathIndexToGet = 3;
                    var foroNumber = path[pathIndexToGet];
                    if ($.inArray(foroNumber, forosFav) > -1) {
			$(this).closest('div.info').siblings('div.icon').children('div.ut-foro-fav-add').toggleClass('ut-foro-fav-added');
                    }
		});
            });

            /*Panel flotante sigue el scroll*/
            function sticky_relocate() {
		var window_top = $(window).scrollTop();
		var div_top = $('#sticky-anchor').offset().top;
		if (window_top > div_top)
                    $('#foros-fav-float').addClass('foros-fav-float-sticky')
		else
                    $('#foros-fav-float').removeClass('foros-fav-float-sticky');
            };
            $(window).scroll(sticky_relocate);
            sticky_relocate();

            if ($.browser.safari) {
		$("#foros-fav-float").css("margin-left", "1145px");
            } else if ($.browser.opera) {
		$("#foros-fav-float").css("margin-left", "1145px");
            }

	});

    }

})(window.document, jQuery, window.UserTools);
