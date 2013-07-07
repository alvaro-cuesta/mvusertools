(function (window, document, $, UT) {

    UT.options.setDefault('forosfavs', true);

    UT.options.$('forosfavs', function() {

        // Container
	var $favs = $('<ul id="ut-foros-fav">');

        $('<div id="sticky-anchor" style="position: absolute; top: 200px;">')
	    .insertBefore('#content_body, #content_head');
        $('<div id="foros-fav-float">')
	    .append($('<div>').append($favs))
	    .insertAfter('#sticky-anchor');

	// Add favorites
	var favs;
	var remove = function(index) {
	    favs.splice(index, 1);
	    UT.options.set('-favs', favs);
	    update();
	};
        var update = function () {
	    $favs.html('');
	    favs = UT.options.get('-favs', []);

	    var i;
            for (i = 0; i < favs.length; i++) {
		(function (i) {
		    // Botón para borrar
		    var $borrar = $('<i class="sprite UT-trash">').click(function () {
			remove(i);
		    });
		    $('<li>')
			.append('<a href="/foro/' + favs[i] + '"><i class="ifid fid_' + favs[i] + '"></i></a>')
			.append($('<div class="ut-foros-fav-borrar">').append($borrar))
			.appendTo($favs);
		})(i);
            }
        };
	update();

        // Boton para añadir a favs
        $icons = $('div.fpanel div.icon');

	$icons.hover(function () {
	    $('.ut-foro-fav-add', this).addClass('ut-foro-fav-add-moveup');
	}, function () {
	    $('.ut-foro-fav-add', this).removeClass('ut-foro-fav-add-moveup');
	});

	$icons.each(function () {
	    var $icon = $(this);
	    $('i.ifid', $icon).each(function () {
		var foroNumber = $(this).attr("class").match(/fid_(.*)/)[1];

		// Star icon
		var $star = $('<div class="ut-foro-fav-add">').click(function () {
		    $(this).toggleClass('ut-foro-fav-added');

		    var index = $.inArray(foroNumber, favs);
		    if (index > -1) {
			remove(index);
		    } else {
			favs.push(foroNumber);
			UT.options.set('-favs', favs);
		    }
		    update();
		});

		var index = $.inArray(foroNumber, favs);
		if (index > -1) {
		    $star.addClass('ut-foro-fav-added');
		}

		$icon.append($star);
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
