/*
 * Lista de mods en sidebar.
 */

(function ($, UT) {

    UT.options.setDefault('tablamods', true);

    var mods = {
	1: ['bazoo', 'jadgix', 'J40', 'RaymaN', 'TazzMaTazz'],
	2: ['Eristoff', 'kalinka-'],
	3: ['aLeX', 'Josekron', 'Loa', 'MegalomaniaC', 'mongui', 'Prava'],
	6: ['Atoll', 'Bloody', 'Eristoff', 'Kails', 'JMBaDBoY', 'Prava', 'PruDeN', 'sacnoth', ],
	7: ['abichuela', 'AG', 'alejo', 'Ch4iNeR', 'cm07', 'Korso', 'lb_nacho', 'Netzach', 'VipeR_CS'],
	9: ['Kaos', 'PiradoIV', 'elkaoD'],
	10: ['TNx7', 'tutitin'],
	19: ['Kaneas', 'TNx7'],
	22: ['Cryoned', 'Dream-MV', 'esvarianzza'],
	23: ['darkavm', 'ElKedao', 'Privatovic', 'ukuki'],
	26: ['Midgard', 'StumKrav', 'thunder_'],
	31: ['Eristoff', 'ReYzell'],
	32: ['Andy', 'eisenfaust', 'ISAILOVIC', 'JMBaDBoY', 'loko_man', 'ruben132', 'Sh1n0d4', 't0rrY', ],
	38: ['Hir0shz', 'Ligia', 'ManOwaR', 'sPoiLeR', ],
	40: ['ferk', 'HaZuKi', 'horvathzeros', 'J40'],
	42: ['dangerous', 'zashael'],
	52: ['BigmAK', 'MaSqUi', 'tutitin', 'XaViMeTaL'],
	82: ['Cheester', 'cuerpi', 'darkavm', 'sk_sk4t3r', 'TNx7', 'Txentx0'],
	83: ['dangerous', 'spyro512'],
	87: ['GR33N'],
	90: ['Snorky', 'spyro512'],
	96: ['JMBaDBoY', 'Sirius_spa', 'suggus', 'ZaGo'],
	97: ['granaino127', 'SaBaNdIjA'],
	98: ['granaino127', 'SaBaNdIjA'],
	99: ['darkavm', 'GryF', 'Kb', 'lb_nacho', '-Power'],
	102: ['ElKedao', 'darkavm', 'dicon', 'sk_sk4t3r'],
	106: ['Atoll', 'ZaGo'],
	107: ['DeNz1L', 'kaitoo', 'NosFeR_'],
	108: ['Skelus'],
	109: ['darkavm', 'Dolz', 'Txentx0', 'urrako'],
	110: ['babri', 'dicon', 'RoDRa', 'Spank'],
	111: ['iosp', 'Hogwarts', 'lb_nacho'],
	112: ['zashael'],
	113: ['Charly-', 'edvan', 'frostttt', 'Kazuya_', 'zashael'],
	114: ['0buS', 'RaymaN', 'sPoiLeR'],
	115: ['CsNarsil', 'CybeR'],
	116: ['eisenfaust'],
	117: ['bazoo', 'StumKrav', 'thunder_'],
	118: ['DarkHawX', 'Korso', 'Netzach', 'StumKrav'],
	119: ['benitogb', 'BigmAK'],
	121: ['Andy', 'ISAILOVIC', 'JMBaDBoY', 'loko_man', 'ruben132', 'Sh1n0d4', 't0rrY'],
	122: ['allmy', 'naete', 'slakk', 'StumKrav', 'thunder_'],
	123: ['gonya707', 'TRON'],
	124: ['babri', 'RoninPiros', ],
	125: ['Bidroid', 'MagicAnnii'],
	126: ['ChaRliFuM', 'menolikeyou', 'undimmer'],
	127: ['locof', 'Pedrosa7', 'Syuk', ],
	129: ['alexander', 'ferk', 'horvathzeros', 'J40'],
	131: ['KinachO'],
	132: ['cm07', 'RoninPiros'],
	134: ['Rundull'],
	135: ['dangerous'],
	136: ['HeXaN', 'Prostyler', 'thunder_'],
    };

    // Mods de cada foro
    UT.options.$('tablamods', function () {
	if ($('div#topnav a[href="/foro/"]').length > 0 && $('div.live_info').length === 0) {
	    var $box = $('<div class="box">').appendTo('div.smallcol, div.tinycol');

	    var $modlist = $('<div id="modlist"><h3>Moderadores</h3></div>')
		.addClass(!UT.isDark ? 'modlistblanco' : 'modlistnegro')
		.appendTo($box);

            var id = $('input#fid').attr('value');

	    if (typeof mods[id] === 'undefined') {
                $('<p/>')
		    .html('<span>Este foro no tiene mods o no están listados.</span>')
		    .appendTo($modlist);
	    } else {
		$.each(mods[id], function (i, v) {
                    $('<a/>')
			.html(v)
			.attr('href', '/id/' + v + '')
			.append('<br />')
			.appendTo($modlist);
		});
            };
	}
    });

})(jQuery, window.UserTools);
