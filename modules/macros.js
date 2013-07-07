/*
 * Sistema de macros.
 */

(function ($, UT) {

    var macros = UT.options.get('macros', {});

    // Functions
    // TODO: mejorable
    var updateMacros = function (store, $container) {
        var macros = {};

        $container.children().each(function () {
            var $macro = $(this);
            var title = $macro.data('macro');
            if (typeof store[title] === 'undefined') {
                $macro.slideUp('slow', function () {
                    $macro.remove();
                });
            } else {
                macros[title] = $macro;
            }
        });

        var title;
        for (title in store) {
            if (typeof macros[title] === 'undefined') {
                var $spantitle = $('<span class="ut-titletxt">').text(title);
                var $spanmacro = $('<div class="ut-macrotxt"' + (UT.isDark ? ' style="color: #EEEEEE;"' : '') + '>')
                    .text(store[title]);
                var $title = $('<a>')
                    .html(' <a style="cursor:pointer;" title="Borrar macro" class="ut-remove-macro"><i class="sprite UT-trash-orange"></i></a>')
                    .prepend($spantitle)
                    .append($spanmacro); // solo +title+ para la lista de titulos
                $('<li class="ut-titleymacro">')
                    .data('macro', title)
                    .append($title)
                    .hide()
                    .appendTo($container)
                    .slideDown('slow');
            }
        }
    };

    // TODO: mejorable
    var updateMacrosButton = function (store, $container) {
        var macros = {};

        $container.children().each(function () {
            var $macro = $(this);
            var title = $macro.data('macro');
            if (!(title in store)) {
                $macro.slideUp('slow', function () {
                    $macro.remove();
                });
            } else {
                macros[title] = $macro;
            }
        });

        var title;
        for (title in store) {
            if (!(title in macros)) {
                var $spantitle = $('<span class="ut-titletxt-list">').text(title);
                var $title = $('<div>').html(' ').prepend($spantitle);
                $('<li class="ut-titleymacro-list">')
                    .data('macro', title)
                    .append($title)
                    .hide()
                    .appendTo($container)
                    .slideDown('slow');
            }
        }
    };

    // Visual shit
    $(function () {

        var $macros = $('#ut-macros');
        var $macrosbutton = $('#ut-button-macros-list ul');
        var $macroslist = $('#ut-button-macros-list');
        var $title = $("#ut-title");
        var $macro_text = $("#ut-macro");

        updateMacros(macros, $macros);
        updateMacrosButton(macros, $macrosbutton);

        $("#ut-macros-form").submit(function () {
            var title = $title.val();
            var text = $macro_text.val();

            if (title !== "" && text !== "") {
                macros[title] = text;
                UT.options.set('macros', macros);
                $title.val('');
                $macro_text.val('');
                updateMacros(macros, $macros);
                updateMacrosButton(macros, $macrosbutton);
            }

            return false;
        });

        $macros.on('click', 'a.ut-remove-macro', function () {
            delete macros[$(this).parent().parent().data('macro')];
            UT.options.set('macros', macros);
            updateMacros(macros, $macros);
            updateMacros(macros, $macrosbutton);

            return false;
        });

        var $cuerpo = $('textarea#cuerpo');
        $macrosbutton.on('click', 'li', function () {
            $cuerpo.insertAtCaretPos(macros[$(this).data('macro')]);
            $macroslist.hide();
            return false;
        });

        if ($('#goext').length > 0 || UT.live) {
            $macroslist.addClass('ut-button-macros-list-barrendera');
        }
    });

})(jQuery, window.UserTools);
