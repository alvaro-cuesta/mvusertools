(function ($) {

    $(function () {

	// Botonera en formulario extendido
	$('button[accesskey="b"]').hide();
	$('<button class="alt bleft bb" accesskey="b" type="button" onclick="bbstyle(0)">b</button>').insertAfter('button[accesskey="b"]');
	$('button[accesskey="i"]').hide();
	$('<button class="alt bcenter bi" accesskey="i" type="button" onclick="bbstyle(2)">i</button><button class="alt bcenter2 bu" accesskey="u" type="button" onclick="bbstyle(4)">u</button><button id="ut-boton-s" class="alt bright bs" accesskey="x" type="button">s</button><button class="alt bsolo" id="ut-boton-center" accesskey="c" type="button" title="[center]"><a class="sprite bcentericon"></a></button><button class="alt bsolo" id="ut-boton-list" type="button" title="[list] Usar * para cada elemento de la lista"><a class="blist sprite"></a></button>').insertAfter('button[accesskey="i"]');
	$('button[accesskey="l"]').hide();
	$('<button class="alt bsolo" accesskey="l" type="button" onclick="bbstyle(8)">[url=]</button>').insertAfter('button[accesskey="l"]');
	$('button[accesskey="m"]').hide();
	$('<button class="alt bleft" accesskey="m" type="button" onclick="bbstyle(10)" title="[img]"><a class="bimg sprite"></a></button>').insertAfter('button[accesskey="m"]');
	$('button[accesskey="v"]').hide();
	$('<button class="alt bcenter" accesskey="v" type="button" onclick="bbstyle(12)" title="[video]"><a class="bvideo sprite"></a></button><button title="[audio]" id="ut-boton-audio" class="alt bright" type="button"><a class="baudio sprite"></a></button>').insertAfter('button[accesskey="v"]');
	$('button[accesskey="s"]').hide();
	$('<button class="alt bleft" accesskey="s" type="button" onclick="bbstyle(14)">[spoiler]</button>').insertAfter('button[accesskey="s"]');
	$('button[accesskey="d"]').hide();
	$('<button class="alt bcenter" accesskey="d" type="button" onclick="bbstyle(16)">[spoiler=]</button>').insertAfter('button[accesskey="d"]');
	$('button[accesskey="n"]').hide();
	$('<button class="alt bright" accesskey="n" type="button" onclick="bbstyle(18)">NSFW</button><button title="Pulsa para ver más opciones" id="ut-boton-plus" class="alt bsolo" type="button"><a class="ut-arrow-down sprite"></a></button><script></script>').insertAfter('button[accesskey="n"]');

	$("#ut-boton-s").click(function () {
	    if ($('textarea#cuerpo').getSelection().text.length > 0) {
		$("textarea#cuerpo").replaceSelection('[s]' + $('textarea#cuerpo').getSelection().text + '[/s]').setCaretPos();
	    } else {
		$("textarea#cuerpo").insertAtCaretPos('[s][/s]').setCaretPos($('textarea#cuerpo').getSelection().end - 3);
	    }
	});
	$("#ut-boton-center").click(function () {
	    if ($('textarea#cuerpo').getSelection().text.length > 0) {
		$("textarea#cuerpo").replaceSelection('[center]' + $('textarea#cuerpo').getSelection().text + '[/center]').setCaretPos();
	    } else {
		$("textarea#cuerpo").insertAtCaretPos('[center][/center]').setCaretPos($('textarea#cuerpo').getSelection().end - 8);
	    }
	});
	$("#ut-boton-list").click(function () {
	    if ($('textarea#cuerpo').getSelection().text.length > 0) {
		$("textarea#cuerpo").replaceSelection('[list]' + $('textarea#cuerpo').getSelection().text + '[/list]').setCaretPos();
	    } else {
		$("textarea#cuerpo").insertAtCaretPos('[list][/list]').setCaretPos($('textarea#cuerpo').getSelection().end - 6);
	    }
	});
	$("#ut-boton-audio").click(function () {
	    if ($('textarea#cuerpo').getSelection().text.length > 0) {
		$("textarea#cuerpo").replaceSelection('[audio]' + $('textarea#cuerpo').getSelection().text + '[/audio]').setCaretPos();
	    } else {
		$("textarea#cuerpo").insertAtCaretPos('[audio][/audio]').setCaretPos($('textarea#cuerpo').getSelection().end - 7);
	    }
	});


	// Segunda linea en la botonera del formulario extendido
	var utsegundabarra = '<button class="alt bsolo" id="ut-boton-bar" type="button">[bar]</button><button class="alt bleft" type="button" onclick="bbstyle(20)">[code]</button><button class="alt bright2" id="ut-boton-cmd" type="button">[cmd]</button><button id="ut-button-macros" class="alt bsolo" type="button">macros <i class="sprite icon-down-list"></i></button><div id="ut-button-macros-list" style="display: none;"><ul></ul><a href="#ut-dialog-menu" id="ut-button-macros-list-anadir">añadir macro</a></div>'
	$('<div id="ut-botonera2" style="overflow: hidden;margin: 10px 0;clear: both; display: none;">' + utsegundabarra + '</div>').insertAfter('form#postear div[style="overflow: hidden;margin: 10px 0;clear: both"]');
	$('<div id="ut-botonera2" style="overflow: hidden;margin: 10px 0;clear: both; display: none;">' + utsegundabarra + '</div>').insertAfter('form#postform div[style="overflow: hidden;margin-bottom: 10px;clear: both"]');
	$('#ut-boton-plus').click(function () {
	    if ($('#ut-botonera2').is(":visible")) {
		$('#ut-botonera2').slideUp();
		$('#ut-boton-plus a').toggleClass('ut-arrow-down').toggleClass('ut-arrow-up');
		$('#ut-boton-plus').attr('title', 'Pulsa para ver más opciones');
	    } else {
		$('#ut-botonera2').slideDown();
		$('#ut-boton-plus a').toggleClass('ut-arrow-down').toggleClass('ut-arrow-up');
		$('#ut-boton-plus').attr('title', 'Pulsa para ocultar la segunda linea de opciones');
	    }
	});
	$("#ut-boton-bar").click(function () {
	    if ($('textarea#cuerpo').getSelection().text.length > 0) {
		$("textarea#cuerpo").replaceSelection('[bar]' + $('textarea#cuerpo').getSelection().text + '[/bar]').setCaretPos();
	    } else {
		$("textarea#cuerpo").insertAtCaretPos('[bar][/bar]').setCaretPos($('textarea#cuerpo').getSelection().end - 5);
	    }
	});
	$("#ut-boton-cmd").click(function () {
	    if ($('textarea#cuerpo').getSelection().text.length > 0) {
		$("textarea#cuerpo").replaceSelection('[cmd]' + $('textarea#cuerpo').getSelection().text + '[/cmd]').setCaretPos();
	    } else {
		$("textarea#cuerpo").insertAtCaretPos('[cmd][/cmd]').setCaretPos($('textarea#cuerpo').getSelection().end - 5);
	    }
	});
	$("#ut-button-macros").click(function () {
	    if ($('#ut-button-macros-list[style="display: none;"]').length) {
		$('#ut-button-macros-list').show();
	    } else {
		$('#ut-button-macros-list').hide();
	    }
	});
	$('#ut-button-macros-list').mouseup(function () {
	    return false
	});
	$('#ut-button-macros').mouseup(function () {
	    return false
	});
	$(document).mouseup(function () {
	    $('#ut-button-macros-list').hide();
	});
	$("#ut-button-macros-list-anadir").click(function () {
	    $('#ut-mask-menu').show();
	    $('#ut-dialog-menu').show();
	    $('#ut-menu-tab1').removeClass('active');
	    $('#ut-menu-tab2').removeClass('active');
	    $('#ut-menu-tab3').removeClass('active');
	    $('#ut-menu-tab4').addClass('active');
	    $('#ut-menu-tabla1').hide();
	    $('#ut-menu-tabla2').hide();
	    $('#ut-menu-tabla3').hide();
	    $('#ut-menu-tabla4').show();
	});

	// Botonera en el fast-edit
	if (!UserTools.live) {
	    var botonessolounavez = function() {
		var fasteditbuttons = function () {
                    $('<div style="overflow: hidden;margin: 0 0px 10px -5px;clear: both"><button type="button" accesskey="b" class="alt bleft bb" id="ut-boton-b-fast">b</button><button type="button" accesskey="i" class="alt bcenter bi" id="ut-boton-i-fast">i</button><button type="button" accesskey="u" class="alt bcenter2 bu" id="ut-boton-u-fast">u</button><button type="button" accesskey="x" class="alt bright bs" id="ut-boton-s-fast">s</button><button title="[center]" type="button" accesskey="c" id="ut-boton-center-fast" class="alt bsolo"><a class="sprite bcentericon"></a></button><button title="[list] Usar * para cada elemento de la lista" type="button" id="ut-boton-list-fast" class="alt bsolo"><a class="blist sprite"></a></button><button type="button" accesskey="l" class="alt bsolo" id="ut-boton-url-fast">[url=]</button><button title="[img]" type="button" accesskey="m" class="alt bleft" id="ut-boton-img-fast"><a class="bimg sprite"></a></button><button title="[video]" type="button" accesskey="v" class="alt bcenter" id="ut-boton-video-fast"><a class="bvideo sprite"></a></button><button type="button" class="alt bright" title="[audio]" id="ut-boton-audio-fast"><a class="baudio sprite"></a></button><button type="button" accesskey="s" class="alt bleft" id="ut-boton-spoiler-fast">[spoiler]</button><button type="button" accesskey="d" class="alt bcenter" id="ut-boton-spoiler2-fast">[spoiler=]</button><button type="button" accesskey="n" class="alt bright" id="ut-boton-nsfw-fast">NSFW</button><button type="button" id="ut-boton-bar-fast" class="alt bsolo">[bar]</button><button type="button" class="alt bsolo" id="ut-boton-code-fast">[code]</button></div>').insertBefore('div.msg div.body div textarea:not("div.extraportada textarea")');
		}

		$(document).one('mouseenter', 'div.msg div.body div textarea', function () {
                    fasteditbuttons();
		});
	    }

	    $(botonessolounavez);
	    $(document).on('click', 'button.cancelButton', botonessolounavez);
	    $(document).on('click', 'button.saveButton', botonessolounavez);

	    $(document).on('click', '#ut-boton-b-fast', function () {
		if ($('div.msg div.body div textarea').getSelection().text.length > 0) {
		    $('div.msg div.body div textarea').replaceSelection('[b]' + $('div.msg div.body div textarea').getSelection().text + '[/b]').setCaretPos();
		} else {
		    $('div.msg div.body div textarea').insertAtCaretPos('[b][/b]').setCaretPos($('div.msg div.body div textarea').getSelection().end - 3);
		}
	    });
	    $(document).on('click', '#ut-boton-i-fast', function () {
		if ($('div.msg div.body div textarea').getSelection().text.length > 0) {
		    $('div.msg div.body div textarea').replaceSelection('[i]' + $('div.msg div.body div textarea').getSelection().text + '[/i]').setCaretPos();
		} else {
		    $('div.msg div.body div textarea').insertAtCaretPos('[i][/i]').setCaretPos($('div.msg div.body div textarea').getSelection().end - 3);
		}
	    });
	    $(document).on('click', '#ut-boton-u-fast', function () {
		if ($('div.msg div.body div textarea').getSelection().text.length > 0) {
		    $('div.msg div.body div textarea').replaceSelection('[u]' + $('div.msg div.body div textarea').getSelection().text + '[/u]').setCaretPos();
		} else {
		    $('div.msg div.body div textarea').insertAtCaretPos('[u][/u]').setCaretPos($('div.msg div.body div textarea').getSelection().end - 3);
		}
	    });
	    $(document).on('click', '#ut-boton-s-fast', function () {
		if ($('div.msg div.body div textarea').getSelection().text.length > 0) {
		    $('div.msg div.body div textarea').replaceSelection('[s]' + $('div.msg div.body div textarea').getSelection().text + '[/s]').setCaretPos();
		} else {
		    $('div.msg div.body div textarea').insertAtCaretPos('[s][/s]').setCaretPos($('div.msg div.body div textarea').getSelection().end - 3);
		}
	    });
	    $(document).on('click', '#ut-boton-center-fast', function () {
		if ($('div.msg div.body div textarea').getSelection().text.length > 0) {
		    $('div.msg div.body div textarea').replaceSelection('[center]' + $('div.msg div.body div textarea').getSelection().text + '[/center]').setCaretPos();
		} else {
		    $('div.msg div.body div textarea').insertAtCaretPos('[center][/center]').setCaretPos($('div.msg div.body div textarea').getSelection().end - 8);
		}
	    });
	    $(document).on('click', '#ut-boton-list-fast', function () {
		if ($('div.msg div.body div textarea').getSelection().text.length > 0) {
		    $('div.msg div.body div textarea').replaceSelection('[list]' + $('div.msg div.body div textarea').getSelection().text + '[/list]').setCaretPos();
		} else {
		    $('div.msg div.body div textarea').insertAtCaretPos('[list][/list]').setCaretPos($('div.msg div.body div textarea').getSelection().end - 6);
		}
	    });
	    $(document).on('click', '#ut-boton-url-fast', function () {
		if ($('div.msg div.body div textarea').getSelection().text.length > 0) {
		    $('div.msg div.body div textarea').replaceSelection('[url=]' + $('div.msg div.body div textarea').getSelection().text + '[/url]').setCaretPos();
		} else {
		    $('div.msg div.body div textarea').insertAtCaretPos('[url=][/url]').setCaretPos($('div.msg div.body div textarea').getSelection().end - 5);
		}
	    });
	    $(document).on('click', '#ut-boton-img-fast', function () {
		if ($('div.msg div.body div textarea').getSelection().text.length > 0) {
		    $('div.msg div.body div textarea').replaceSelection('[img]' + $('div.msg div.body div textarea').getSelection().text + '[/img]').setCaretPos();
		} else {
		    $('div.msg div.body div textarea').insertAtCaretPos('[img][/img]').setCaretPos($('div.msg div.body div textarea').getSelection().end - 5);
		}
	    });
	    $(document).on('click', '#ut-boton-video-fast', function () {
		if ($('div.msg div.body div textarea').getSelection().text.length > 0) {
		    $('div.msg div.body div textarea').replaceSelection('[video]' + $('div.msg div.body div textarea').getSelection().text + '[/video]').setCaretPos();
		} else {
		    $('div.msg div.body div textarea').insertAtCaretPos('[video][/video]').setCaretPos($('div.msg div.body div textarea').getSelection().end - 7);
		}
	    });
	    $(document).on('click', '#ut-boton-audio-fast', function () {
		if ($('div.msg div.body div textarea').getSelection().text.length > 0) {
		    $('div.msg div.body div textarea').replaceSelection('[audio]' + $('div.msg div.body div textarea').getSelection().text + '[/audio]').setCaretPos();
		} else {
		    $('div.msg div.body div textarea').insertAtCaretPos('[audio][/audio]').setCaretPos($('div.msg div.body div textarea').getSelection().end - 7);
		}
	    });
	    $(document).on('click', '#ut-boton-spoiler-fast', function () {
		if ($('div.msg div.body div textarea').getSelection().text.length > 0) {
		    $('div.msg div.body div textarea').replaceSelection('[spoiler]' + $('div.msg div.body div textarea').getSelection().text + '[/spoiler]').setCaretPos();
		} else {
		    $('div.msg div.body div textarea').insertAtCaretPos('[spoiler][/spoiler]').setCaretPos($('div.msg div.body div textarea').getSelection().end - 9);
		}
	    });
	    $(document).on('click', '#ut-boton-spoiler2-fast', function () {
		if ($('div.msg div.body div textarea').getSelection().text.length > 0) {
		    $('div.msg div.body div textarea').replaceSelection('[spoiler=]' + $('div.msg div.body div textarea').getSelection().text + '[/spoiler]').setCaretPos();
		} else {
		    $('div.msg div.body div textarea').insertAtCaretPos('[spoiler=][/spoiler]').setCaretPos($('div.msg div.body div textarea').getSelection().end - 9);
		}
	    });
	    $(document).on('click', '#ut-boton-nsfw-fast', function () {
		if ($('div.msg div.body div textarea').getSelection().text.length > 0) {
		    $('div.msg div.body div textarea').replaceSelection('[spoiler=NSFW]' + $('div.msg div.body div textarea').getSelection().text + '[/spoiler]').setCaretPos();
		} else {
		    $('div.msg div.body div textarea').insertAtCaretPos('[spoiler=NSFW][/spoiler]').setCaretPos($('div.msg div.body div textarea').getSelection().end - 9);
		}
	    });
	    $(document).on('click', '#ut-boton-bar-fast', function () {
		if ($('div.msg div.body div textarea').getSelection().text.length > 0) {
		    $('div.msg div.body div textarea').replaceSelection('[bar]' + $('div.msg div.body div textarea').getSelection().text + '[/bar]').setCaretPos();
		} else {
		    $('div.msg div.body div textarea').insertAtCaretPos('[bar][/bar]').setCaretPos($('div.msg div.body div textarea').getSelection().end - 5);
		}
	    });
	    $(document).on('click', '#ut-boton-code-fast', function () {
		if ($('div.msg div.body div textarea').getSelection().text.length > 0) {
		    $('div.msg div.body div textarea').replaceSelection('[code]' + $('div.msg div.body div textarea').getSelection().text + '[/code]').setCaretPos();
		} else {
		    $('div.msg div.body div textarea').insertAtCaretPos('[code][/code]').setCaretPos($('div.msg div.body div textarea').getSelection().end - 6);
		}
	    });
	}

	// Botonera en el perfil
	$('<div style="overflow: hidden;margin: 0 0 5px 0;clear: both"><button type="button" accesskey="b" class="alt bleft bb" id="ut-boton-b-perfil">b</button><button type="button" accesskey="i" class="alt bcenter bi" id="ut-boton-i-perfil">i</button><button type="button" accesskey="u" class="alt bright bu" id="ut-boton-u-perfil">u</button><button type="button" accesskey="l" class="alt bsolo" id="ut-boton-url-perfil">[url=]</button><button type="button" accesskey="s" class="alt bleft" id="ut-boton-spoiler-perfil">[spoiler]</button><button type="button" accesskey="d" class="alt bcenter" id="ut-boton-spoiler2-perfil">[spoiler=]</button><button type="button" accesskey="n" class="alt bright" id="ut-boton-nsfw-perfil">NSFW</button></div>').insertBefore('body.usuarios textarea[name="info"]');
	$("#ut-boton-b-perfil").click(function () {
	    if ($('textarea[name="info"]').getSelection().text.length > 0) {
		$('textarea[name="info"]').replaceSelection('[b]' + $('textarea[name="info"]').getSelection().text + '[/b]').setCaretPos();
	    } else {
		$('textarea[name="info"]').insertAtCaretPos('[b][/b]').setCaretPos($('textarea[name="info"]').getSelection().end - 3);
	    }
	});
	$("#ut-boton-i-perfil").click(function () {
	    if ($('textarea[name="info"]').getSelection().text.length > 0) {
		$('textarea[name="info"]').replaceSelection('[i]' + $('textarea[name="info"]').getSelection().text + '[/i]').setCaretPos();
	    } else {
		$('textarea[name="info"]').insertAtCaretPos('[i][/i]').setCaretPos($('textarea[name="info"]').getSelection().end - 3);
	    }
	});
	$("#ut-boton-u-perfil").click(function () {
	    if ($('textarea[name="info"]').getSelection().text.length > 0) {
		$('textarea[name="info"]').replaceSelection('[u]' + $('textarea[name="info"]').getSelection().text + '[/u]').setCaretPos();
	    } else {
		$('textarea[name="info"]').insertAtCaretPos('[u][/u]').setCaretPos($('textarea[name="info"]').getSelection().end - 3);
	    }
	});
	$("#ut-boton-url-perfil").click(function () {
	    if ($('textarea[name="info"]').getSelection().text.length > 0) {
		$('textarea[name="info"]').replaceSelection('[url=]' + $('textarea[name="info"]').getSelection().text + '[/url]').setCaretPos();
	    } else {
		$('textarea[name="info"]').insertAtCaretPos('[url=][/url]').setCaretPos($('textarea[name="info"]').getSelection().end - 5);
	    }
	});
	$("#ut-boton-spoiler-perfil").click(function () {
	    if ($('textarea[name="info"]').getSelection().text.length > 0) {
		$('textarea[name="info"]').replaceSelection('[spoiler]' + $('textarea[name="info"]').getSelection().text + '[/spoiler]').setCaretPos();
	    } else {
		$('textarea[name="info"]').insertAtCaretPos('[spoiler][/spoiler]').setCaretPos($('textarea[name="info"]').getSelection().end - 9);
	    }
	});
	$("#ut-boton-spoiler2-perfil").click(function () {
	    if ($('textarea[name="info"]').getSelection().text.length > 0) {
		$('textarea[name="info"]').replaceSelection('[spoiler=]' + $('textarea[name="info"]').getSelection().text + '[/spoiler]').setCaretPos();
	    } else {
		$('textarea[name="info"]').insertAtCaretPos('[spoiler=][/spoiler]').setCaretPos($('textarea[name="info"]').getSelection().end - 9);
	    }
	});
	$("#ut-boton-nsfw-perfil").click(function () {
	    if ($('textarea[name="info"]').getSelection().text.length > 0) {
		$('textarea[name="info"]').replaceSelection('[spoiler=NSFW]' + $('textarea[name="info"]').getSelection().text + '[/spoiler]').setCaretPos();
	    } else {
		$('textarea[name="info"]').insertAtCaretPos('[spoiler=NSFW][/spoiler]').setCaretPos($('textarea[name="info"]').getSelection().end - 9);
	    }
	});

    });

})(jQuery);
