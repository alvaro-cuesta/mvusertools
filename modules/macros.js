(function(jQuery, JSON) {

    // Vars
    var macros = JSON.decode(localStorage.getItem('macros')) || {};

    // Functions
    var updateMacros = function(store, $container) {
	var macros = {};
	$container.children().each(function(){
	    var $macro = jQuery(this);
	    var title = $macro.data('macro');
	    if (!(title in store)) {
		$macro.slideUp('slow', function() {
		    $macro.remove();
		});
	    } else {
		macros[title] = $macro;
	    }
	});

	var title;
	for (title in store) {
	    if (!(title in macros)) {
		var $spantitle = jQuery('<span class="ut-titletxt">').text(title);
		var $spanmacro = jQuery('<div class="ut-macrotxt"' + (is_dark ? " style='color: #EEEEEE !important;'" : "") + '>').text(store[title]);
		var $title = jQuery('<a>').html(' <a style="cursor:pointer;" title="Borrar macro" class="ut-remove-macro"><i class="sprite UT-trash-orange"></i></a>').prepend($spantitle).append($spanmacro); // solo +title+ para la lista de titulos
		var $item = jQuery('<li class="ut-titleymacro">')
		    .data('macro', title)
		    .append($title)
		    .hide();
		$container.append($item);
		$item.slideDown('slow');
	    }
	}
    };

    var updateMacrosButton = function(store, $container2) {
	var macros = {};
	$container2.children().each(function(){
	    var $macro = jQuery(this);
	    var title = $macro.data('macro');
	    if (!(title in store)) {
		$macro.slideUp('slow', function() {
		    $macro.remove();
		});
	    } else {
		macros[title] = $macro;
	    }
	});

	var title;
	for (title in store) {
	    if (!(title in macros)) {
		var $spantitle = jQuery('<span class="ut-titletxt-list">').text(title);
		var $title = jQuery('<div>').html(' ').prepend($spantitle);
		var $item = jQuery('<li class="ut-titleymacro-list">')
		    .data('macro', title)
		    .append($title)
		    .hide();
		$container2.append($item);
		$item.slideDown('slow');
	    }
	}
    };

    var storeJSON = function(key, object) {
	localStorage.setItem(key, JSON.encode(object));
    };

    // Visual shit
    jQuery(function() {

	var $macros = jQuery('#ut-macros');
	var $macrosbutton = jQuery('#ut-button-macros-list ul');

	updateMacros(macros, $macros);
	updateMacrosButton(macros, $macrosbutton);

	jQuery("#ut-macros-form").submit(function() {
	    var $title = jQuery("#ut-title");
	    var $macro = jQuery("#ut-macro");
	    var title = $title.val();
	    var macro = $macro.val();

	    if (title !== "" && macro !== "") {
		macros[title] = macro;
		storeJSON('macros', macros);
		$title.val('');
		$macro.val('');
		updateMacros(macros, $macros);
		updateMacrosButton(macros, $macrosbutton);
	    }

	    return false;
	});

	$macros.on('click', 'a.ut-remove-macro', function() {
	    delete macros[jQuery(this).parent().parent().data('macro')];
	    storeJSON('macros', macros);
	    updateMacros(macros, $macros);
	    updateMacros(macros, $macrosbutton);

	    return false;
	});

	$macrosbutton.on('click', 'li', function() {
	    jQuery('textarea#cuerpo').insertAtCaretPos(macros[jQuery(this).data('macro')]);
	    jQuery('#ut-button-macros-list').hide();
	    return false;
	});

	if (jQuery('#goext').length > 0 || liveactivado == true) {
	    jQuery('#ut-button-macros-list').addClass('ut-button-macros-list-barrendera');
	}
    });

})(jQuery, patchedJSON);
