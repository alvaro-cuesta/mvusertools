(function ($, UserTools) {

    $(function() {

	var TOGGLE = "<div id='toggle' class='sprite'><div> ";
	var INFO = "<span class='blacklisted-post'" + (UserTools.isDark ? " style='color: #626262 !important;'" : "") + ">Click en <img src='http://www.mvusertools.com/ext/img/blacklist-mini.png'> para desbloquear.</span>";
	var BARRA = "<div class='nopost barra'> \
Usuario <span class='mensaje-ocultado'>Blacklisted</span> \
</div> ";

	var blacklisted = UserTools.options.get('blacklisted', {});

	//Set Toggle Class
	$("#scrollpages").append(TOGGLE);

	if (UserTools.options.get('blacklist')) {
	    $('#toggle').addClass("toggle-on");
	    $('#toggle').removeClass("toggle-off");
	} else {
	    $('#toggle').addClass("toggle-off");
	    $('#toggle').removeClass("toggle-on");
	}

	//put usernames where they belong.
	$("a[href^='/id/']").each(function () {
            var name = this.href.slice(this.href.lastIndexOf('/') + 1);
            $(this).parent().parent().parent('.autor').data('name', name);
	});

	//$("img[src^='/img/users/avatar']").parent().after("<div class='ancla'><div>");

	$('.autor').each(function () {

	    $(this).append("<div class='usertools'>\
<div class='online-pos'><a class='tooltip ut-offline sprite' href='http://www.mediavida.com/id/" + $(this).data('name') + "' original-title='Perfil' ></a></div>\
<div class='mensaje-pos'><a class='tooltip mensaje sprite' href='http://www.mediavida.com/mensajes/nuevo/" + $(this).data('name') + "' original-title='Mensaje'></a></div>\
<div class='firma-pos'><a class='tooltip ut-firma sprite' href='http://www.mediavida.com/id/" + $(this).data('name') + "/firmas' original-title='Firma'></a></div>\
<div class='blacklist-pos'><a class='tooltip blacklist blacklist-off sprite' href='javascript:void(0)' original-title='Blacklist'></a></div>\
</div>");
	});
	$('div.autor dd.online').hide();
	$('div.autor dd.online').parent().parent().find('.ut-offline').toggleClass('ut-online ut-offline');

	//Primera carga del a página. Tapar los posts de la blacklist si procede.

	$("img[src^='/img/users/avatar']").parent().prepend("<div class=''><span></span></div>");

	//$("img[src^='/img/users/avatar']").parent().append("<div class='ancla'><div>");

	//$("img[src^='/img/users/avatar']").after("<div class='tapavatares'></div>")

	$('.autor').each(function () {
	    //Pijadas que marcan el post como blacklisted

	    var nick = $(this).data('name');

	    // INFO & BOTONES & AVATARES
	    if (blacklisted[nick]) {
		$(this).find(".blacklist").addClass('blacklist-on');
		$(this).find(".blacklist").removeClass('blacklist-off');
		$(this).parent().find(".info").append(INFO);
	    } else {
		$(this).find(".blacklist").addClass('blacklist-off');
		$(this).find(".blacklist").removeClass('blacklist-on');
		$(this).parent().find(".info").append(INFO);
		$(this).parent().find(".blacklisted-post").hide();
		$(this).parent().find(".tapavatares").hide();
	    }

	    // BARRA
	    $(this).parent().before(BARRA);
	    if (UserTools.options.get('blacklist')) {
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

	$("#toggle").click(function () {

	    //	$('#toggle').toggleClass("toggle-on toggle-off");

	    if (UserTools.options.get('blacklist')) {
		$('#toggle').addClass("toggle-off");
		$('#toggle').removeClass("toggle-on");
		UserTools.options.set('blacklist', false);
	    } else {
		$('#toggle').addClass("toggle-on");
		$('#toggle').removeClass("toggle-off");
		UserTools.options.set('blacklist', true);
	    }

	    //Tenemos un nuevo estado. Si ahora es on, tenemos que ocultar, si es off tenemos que mostrar
	    $('.autor').each(function () {
		var nick = $(this).data('name');

		if (UserTools.options.get('blacklist')) {
		    if (blacklisted[nick]) {
			$(this).parent().prev().show();
			$(this).parent().hide();
		    }
		} else if (blacklisted[nick]) {
		    $(this).parent().prev().hide();
		    $(this).parent().slideDown();
		    $('.social').show();
		}
	    });
	});
	// Fin de actualización

	$(".blacklist").click(function () {
	    var nick = $(this).parent().parent().parent().data('name');

	    if (blacklisted[nick]) {
		console.log('must delete');
		delete blacklisted[nick];
	    } else {
		console.log('must not delete');
		console.log(nick);
		console.log(blacklisted);
		blacklisted[nick] = true;
		console.log(blacklisted);
	    }

	    console.log(blacklisted);

	    UserTools.options.set('blacklisted', blacklisted);

	    // En caso de blacklist ON Tapar los posts del autor si ahora esta blacklisted, o mostrarlos en caso contrario.
	    // Si esta off, añadir pijadas o quitarlas.

	    $('.autor').each(function () {
		var nick = $(this).data('name');

		if (blacklisted[nick]) {
		    $(this).find(".blacklist").addClass('blacklist-on');
		    $(this).find(".blacklist").removeClass('blacklist-off');
		    $(this).parent().find(".blacklisted-post").show();
		    $(this).parent().find(".tapavatares").show();
		} else {
		    $(this).find(".blacklist").addClass('blacklist-off');
		    $(this).find(".blacklist").removeClass('blacklist-on');
		    $(this).parent().find(".blacklisted-post").hide();
		    $(this).parent().find(".tapavatares").hide();
		}

		if (UserTools.options.get('blacklist')) {
		    if (blacklisted[nick]) {
			$(this).parent().prev().show();
			$(this).parent().slideUp();
		    } else {
			$(this).parent().slideDown();
			$(this).parent().prev().hide();
		    }
		}
	    });
	    // Fin de actualización
	});

    });

})(jQuery, window.UserTools);
