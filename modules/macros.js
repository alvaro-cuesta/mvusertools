(function ($, UserTools) {

    // Vars
    var macros = UserTools.options.get('macros', {});

    // Functions
    var updateMacros = function (store, $container) {
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
                var $spantitle = $('<span class="ut-titletxt">').text(title);
                var $spanmacro = $('<div class="ut-macrotxt"' + (is_dark ? " style='color: #EEEEEE !important;'" : "") + '>').text(store[title]);
                var $title = $('<a>').html(' <a style="cursor:pointer;" title="Borrar macro" class="ut-remove-macro"><i class="sprite UT-trash-orange"></i></a>').prepend($spantitle).append($spanmacro); // solo +title+ para la lista de titulos
                var $item = $('<li class="ut-titleymacro">')
                    .data('macro', title)
                    .append($title)
                    .hide();
                $container.append($item);
                $item.slideDown('slow');
            }
        }
    };

    var updateMacrosButton = function (store, $container2) {
        var macros = {};
        $container2.children().each(function () {
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
                var $item = $('<li class="ut-titleymacro-list">')
                    .data('macro', title)
                    .append($title)
                    .hide();
                $container2.append($item);
                $item.slideDown('slow');
            }
        }
    };

    // Visual shit
    $(function () {

        var $macros = $('#ut-macros');
        var $macrosbutton = $('#ut-button-macros-list ul');

        updateMacros(macros, $macros);
        updateMacrosButton(macros, $macrosbutton);

        $("#ut-macros-form").submit(function () {
            var $title = $("#ut-title");
            var $macro = $("#ut-macro");
            var title = $title.val();
            var macro = $macro.val();

            if (title !== "" && macro !== "") {
                macros[title] = macro;
                UserTools.options.set('macros', macros);
                $title.val('');
                $macro.val('');
                updateMacros(macros, $macros);
                updateMacrosButton(macros, $macrosbutton);
            }

            return false;
        });

        $macros.on('click', 'a.ut-remove-macro', function () {
            delete macros[$(this).parent().parent().data('macro')];
            UserTools.options.set('macros', macros);
            updateMacros(macros, $macros);
            updateMacros(macros, $macrosbutton);

            return false;
        });

        $macrosbutton.on('click', 'li', function () {
            $('textarea#cuerpo').insertAtCaretPos(macros[$(this).data('macro')]);
            $('#ut-button-macros-list').hide();
            return false;
        });

        if ($('#goext').length > 0 || liveactivado == true) {
            $('#ut-button-macros-list').addClass('ut-button-macros-list-barrendera');
        }
    });

})(jQuery, window.UserTools);
