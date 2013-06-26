(function ($, UserTools) {

    // Mods de cada foro
    if (UserTools.options.get('tablamods')) {
        $(function () {
	    if ($('div#topnav a[href="/foro/"]').length > 0 && $('div.live_info').length == 0) {
                $('div.smallcol, div.tinycol').append('<div class="box"><div id="modlist"><h3>Moderadores</h3></div></div>');
                //var url = window.location.pathname;
                //var id = url.split("/")[2];
                var id = $('input#fid').attr('value');

		// TODO: Hay alguna razón para que esto no sea un objeto en lugar de array?
                mods = [
		    ['nulo'],
		    ['bazoo', 'jadgix', 'J40', 'RaymaN', 'TazzMaTazz'],
		    ['Eristoff', 'kalinka-'],
		    ['aLeX', 'Josekron', 'Loa', 'MegalomaniaC', 'mongui', 'Prava'],
		    [''],
		    [''],
		    ['Atoll', 'Bloody', 'Eristoff', 'Kails', 'JMBaDBoY', 'Prava', 'PruDeN', 'sacnoth', ],
		    ['abichuela', 'AG', 'alejo', 'Ch4iNeR', 'cm07', 'Korso', 'lb_nacho', 'Netzach', 'VipeR_CS'],
		    [''],
		    ['Kaos', 'PiradoIV', 'elkaoD'],
		    ['TNx7', 'tutitin'],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    ['Kaneas', 'TNx7'],
		    [''],
		    [''],
		    ['Cryoned', 'Dream-MV', 'esvarianzza'],
		    ['darkavm', 'ElKedao', 'Privatovic', 'ukuki'],
		    [''],
		    [''],
		    ['Midgard', 'StumKrav', 'thunder_'],
		    [''],
		    [''],
		    [''],
		    [''],
		    ['Eristoff', 'ReYzell'],
		    ['Andy', 'eisenfaust', 'ISAILOVIC', 'JMBaDBoY', 'loko_man', 'ruben132', 'Sh1n0d4', 't0rrY', ],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    ['Hir0shz', 'Ligia', 'ManOwaR', 'sPoiLeR', ],
		    [''],
		    ['ferk', 'HaZuKi', 'horvathzeros', 'J40'],
		    [''],
		    ['dangerous', 'zashael'],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    ['BigmAK', 'MaSqUi', 'tutitin', 'XaViMeTaL'],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    ['Cheester', 'cuerpi', 'darkavm', 'sk_sk4t3r', 'TNx7', 'Txentx0'],
		    ['dangerous', 'spyro512'],
		    [''],
		    [''],
		    [''],
		    ['GR33N'],
		    [''],
		    [''],
		    ['Snorky', 'spyro512'],
		    [''],
		    [''],
		    [''],
		    [''],
		    [''],
		    ['JMBaDBoY', 'Sirius_spa', 'suggus', 'ZaGo'],
		    ['granaino127', 'SaBaNdIjA'],
		    ['granaino127', 'SaBaNdIjA'],
		    ['darkavm', 'GryF', 'Kb', 'lb_nacho', '-Power'],
		    [''],
		    [''],
		    ['ElKedao', 'darkavm', 'dicon', 'sk_sk4t3r'],
		    [''],
		    [''],
		    [''],
		    ['Atoll', 'ZaGo'],
		    ['DeNz1L', 'kaitoo', 'NosFeR_'],
		    ['Skelus'],
		    ['darkavm', 'Dolz', 'Txentx0', 'urrako'],
		    ['babri', 'dicon', 'RoDRa', 'Spank'],
		    ['iosp', 'Hogwarts', 'lb_nacho'],
		    ['zashael'],
		    ['Charly-', 'edvan', 'frostttt', 'Kazuya_', 'zashael'],
		    ['0buS', 'RaymaN', 'sPoiLeR'],
		    ['CsNarsil', 'CybeR'],
		    ['eisenfaust'],
		    ['bazoo', 'StumKrav', 'thunder_'],
		    ['DarkHawX', 'Korso', 'Netzach', 'StumKrav'],
		    ['benitogb', 'BigmAK'],
		    [''],
		    ['Andy', 'ISAILOVIC', 'JMBaDBoY', 'loko_man', 'ruben132', 'Sh1n0d4', 't0rrY'],
		    [''],
		    ['allmy', 'naete', 'slakk', 'StumKrav', 'thunder_'],
		    ['gonya707', 'TRON'],
		    ['babri', 'RoninPiros', ],
		    ['Bidroid', 'MagicAnnii'],
		    ['ChaRliFuM', 'menolikeyou', 'undimmer'],
		    ['locof', 'Pedrosa7', 'Syuk', ],
		    [''],
		    ['alexander', 'ferk', 'horvathzeros', 'J40'],
		    [''],
		    ['KinachO'],
		    ['cm07', 'RoninPiros'],
		    [''],
		    ['Rundull'],
		    ['dangerous'],
		    ['HeXaN', 'Prostyler', 'thunder_'],
		    [''],
		    [''],
		    ['']
                ];
                $.each(mods[id], function (i, v) {
		    if (mods[id] == '') {
                        $('<p/>').html('<span>Este foro no tiene mods o no están listados.</span>').appendTo('#modlist');
		    } else {
                        //$('<li/>').html(v).appendTo('#modlist');
                        $('<a/>').html(v).attr('href', '/id/' + v + '').append('<br />').appendTo('#modlist');
		    }
                });
	    }

	    if (UserTools.isDark == 0) {
                $('#modlist').addClass('modlistblanco');
	    } else {
                $('#modlist').addClass('modlistnegro');
	    }
        });
    }

})(jQuery, window.UserTools);
