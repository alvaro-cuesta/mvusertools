(function (window, document, $, UserTools) {

    UserTools.options.setDefault('forosfavs', true);

    UserTools.options.$('forosfavs', function() {
	var favs;
        var update = function () {
	    favs = UserTools.options.get('-favs', []);
	    $favs = $('#ut-foros-fav').html('');
	    var i;
            for (i = 0; i < favs.length; i++) {
		$favs.append(
                    $('<li><a href="/foro/' + favs[i] + '"><i class="ifid fid_' + favs[i] + '"></i></a><div class="ut-foros-fav-borrar"><i class="sprite UT-trash"></i></div></li>')
		);
            }
        };
        update();

        // Container
        $('<div id="sticky-anchor" style="position: absolute; top: 200px;">')
	    .insertBefore('#content_body, #content_head');
        $('<div id="foros-fav-float">')
	    .append('<div><ul id="ut-foros-fav">')
	    .insertAfter('#sticky-anchor');

        // Boton para añadir a favs
        $('div.fpanel div.icon')
	    .append('<div class="ut-foro-fav-add">')
	    .hover(function () {
                $('.ut-foro-fav-add', this).addClass('ut-foro-fav-add-moveup');
	    }, function () {
                $('.ut-foro-fav-add', this).removeClass('ut-foro-fav-add-moveup');
	    });

        $('.ut-foro-fav-add').click(function () {
	    $this = $(this);
	    $this.closest('div.icon').find('i.ifid').each(function () {
                var foroNumber = $this
		    .attr("class")
		    .match(/fid_(.*)/)[1];

		var index = $.inArray(foroNumber, favs) > -1;
                if (index) {
		    favs.splice(index, 1);
		    UserTools.options.set('-favs', favs);
		    $('#foros-fav-float a[href="/foro/' + foroNumber + '"]')
			.closest('li')
			.remove();
                } else {
		    favs.push(foroNumber);
		    UserTools.options.set('-favs', favs);
		    $('#ut-foros-fav').append('<li><a href="/foro/' + foroNumber + '"><i class="ifid fid_' + foroNumber + '"></i></a><div class="ut-foros-fav-borrar"><i class="sprite UT-trash"></i></div></li>');
                }
	    });
	    $this.toggleClass('ut-foro-fav-added');
        });

        // Botón para borrar
        $(document).on('click', '.ut-foros-fav-borrar', function () {
	    $this = $(this);
	    $this.siblings('a[href^="/foro"]').each(function () {
                var enlace = this + "";
                var split = enlace.split('/');
                var path = split.splice(1, split.length - 1);
                var pathIndexToGet = 3;
                var foroNumber = path[pathIndexToGet];
                favs.splice($.inArray(foroNumber, favs), 1);
		UserTools.options.set('-favs', favs);
                $this
		    .closest('li')
		    .remove();
                $('div.fpanel')
		    .find('a[href="/foro/' + foroNumber + '"]')
		    .closest('div.info')
		    .siblings('div.icon')
		    .children('div.ut-foro-fav-add')
		    .toggleClass('ut-foro-fav-added');
	    });
        });

        // Pone la estrella correcta
        $('div.fpanel div.icon').each(function () {
	    $this = $(this);
	    $this.siblings('div.info').find('a.hb,strong a').each(function () {
                var enlace = this + "";
                var split = enlace.split('/');
                var path = split.splice(1, split.length - 1);
                var pathIndexToGet = 3;
                var foroNumber = path[pathIndexToGet];
                if ($.inArray(foroNumber, favs) > -1) {
		    $this
			.closest('div.info')
			.siblings('div.icon')
			.children('div.ut-foro-fav-add')
			.toggleClass('ut-foro-fav-added');
                }
	    });
        });

        // Panel flotante sigue el scroll
        var sticky_relocate = function() {
	    var window_top = $(window).scrollTop();
	    var div_top = $('#sticky-anchor').offset().top;

	    if (window_top > div_top) {
                $('#foros-fav-float').addClass('foros-fav-float-sticky')
	    } else {
                $('#foros-fav-float').removeClass('foros-fav-float-sticky');
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
