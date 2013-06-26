(function () {

    //Inject CSS in header
    var css = ".sprite {\
background: url(http://www.mvusertools.com/ext/img/sprites18-3.png) no-repeat;\
}\
.usertools TABLE TD\
{\
padding: 3px;\
}\
.usertools A\
{\
}\
.ut-firma\
{\
background-position: 0 -58px;\
text-indent: -9999px;\
width: 14px;\
height: 11px;\
display: block;\
outline: 0;\
margin-top: 1px;\
}\
.ut-firma:hover\
{\
background-position: 0 -69px;\
}\
.mensaje\
{\
background-position: -20px -58px;\
text-indent: -9999px;\
width: 14px;\
height: 10px;\
outline: 0;\
display: block;\
margin-top: 1px;\
}\
.mensaje:hover\
{\
background-position: -20px -68px;\
}\
.blacklist-off\
{\
background-position: -39px -57px;\
text-indent: -9999px;\
width: 12px;\
height: 12px;\
outline: 0;\
display: block;\
margin-top: 1px;\
}\
.blacklist-off:hover\
{\
background-position: -39px -69px;\
}\
.blacklist-on\
{\
background-position: -39px -69px;\
text-indent: -9999px;\
width: 12px;\
height: 12px;\
outline: 0;\
display: block;\
margin-top: 1px;\
}\
.blacklist-on:hover\
{\
background-position: -39px -57px;\
}\
.blacklist\
{\
}\
.ut-online\
{\
background-position: -56px -72px;\
text-indent: -99999px;\
width: 8px;\
height: 12px;\
display: block;\
outline: 0;\
}\
\
.ut-offline\
{\
background-position: -56px -58px;\
text-indent: -99999px;\
width: 8px;\
height: 12px;\
display: block;\
outline: 0;\
}\
.online-pos\
{\
float: left;\
width: 14px;\
z-index: 999;\
}\
.mensaje-pos\
{\
float: left;\
width: 19px;\
}\
.blacklist-pos\
{\
float: right;\
margin-top: -1px;\
width: 15px;\
}\
.firma-pos\
{\
float: left;\
width: 19px;\
}\
.mensaje-ocultado\
{\
font-weight: bold;\
}\
.toggle-on\
{\
background-position: -37px -21px;\
width: 34px;\
height: 34px;\
cursor: pointer;\
}\
.toggle-off\
{\
background-position: 0 -21px;\
width: 34px;\
height: 34px;\
cursor: pointer;\
}\
.tapavatares\
{\
width: 0px; \
height: 0px; \
position:relative;\
}\
.tapavatares span {\
position: abosolute; \
background: url(http://www.mvusertools.com/ext/img/blacklisted.png) no-repeat;\
background-position: 0 4px;\
width: 80px; \
height: 84px; \
top: 6px; \
left: 0px;\
display: block;\
}\
.blacklisted-post\
{\
border-radius: 7px;\
ms-border-radius: 7px;\
-moz-border-radius: 7px;\
-webkit-border-radius: 7px;\
-khtml-border-radius: 7px;\
padding: 3px 10px 2px 10px;\
background: #ccc;\
color: #626262 !important;\
}\
.usertools\
{\
position: relative;\
width: 67px;\
margin-top: 10px;\
}\
button::-moz-focus-inner {\
border: 0;\
padding: 0;\
margin:0;\
}\
.mbuttons button[type], button.alt[type] {\
padding:2px 4px !important;\
\
}\
.mbuttons a:hover,button.alt:hover {\
background-color:#aaaaaa;\
border:1px solid #c2e1ef;\
color:#ffffff;\
}\
button.alt {\
border-color: #aaa !important;\
min-width: 20px;\
border-radius: 5px !important;\
}\
button.bleft {\
border-radius: 5px 0px 0px 5px !important;\
margin-right: 0px !important;\
border-right-width: 0px !important;\
font-weight: normal !important;\
}\
button.bcenter {\
margin-right: 0px !important;\
border-left-width: 1px !important;\
border-left-color: #aaa !important;\
font-weight: normal !important;\
border-radius: 0px !important;\
}\
button.bcenter2 {\
margin-right: 0px !important;\
border-left-width: 0px !important;\
border-left-color: #aaa !important;\
font-weight: normal !important;\
border-radius: 0px !important;\
}\
button.bright {\
border-radius: 0px 5px 5px 0px !important;\
margin-left: 0px !important;\
border-left-width: 0px !important;\
font-weight: normal !important;\
}\
button.bright2 {\
border-radius: 0px 5px 5px 0px !important;\
font-weight: normal !important;\
}\
button.bsolo {\
border-radius: 5px !important;\
font-weight: normal !important;\
}\
button.bb {\
font-weight: bold !important;\
}\
button.bi {\
font-style: italic !important;\
}\
button.bu {\
text-decoration: underline !important;\
}\
button.bs {\
text-decoration: line-through !important;\
}\
.baudio {\
background-position: -0px 3px;\
width: 11px; \
height: 17px; \
display: block; \
}\
.bimg {\
background-position: -25px 3px;\
width: 12px; \
height: 17px; \
display: block; \
margin-left: 1px; \
}\
.bvideo {\
background-position: -12px 3px;\
width: 12px; \
height: 17px; \
display: block; \
}\
.bcentericon {\
background-position: -37px 3px;\
width: 14px; \
height: 17px; \
display: block; \
}\
.blist {\
background-position: -51px 3px;\
width: 14px; \
height: 17px; \
display: block; \
}\
.ut-live td {\
background-color: #FFEEEE;\
}\
.ut-live td.alt {\
background-color: #EFE0E0;\
}\
#modlist {\
margin: 20px 0 0;\
padding: 10px 10px;\
border-radius: 6px 6px 6px 6px;\
}\
.modlistblanco {\
border: 1px solid #D4D4D2;\
}\
.modlistnegro {\
border: 1px solid #273037;\
background-color: #39444B;\
}\
#modlist H3{\
margin-top: 0px !important;\
}\
#modlist A{\
padding: 3px 0 3px 3px;\
display: block;\
}\
.modlistblanco A:nth-child(odd){\
background: #E8EBE3;\
}\
.modlistblanco A:hover{\
background: #D6D8D2;\
}\
.modlistblanco span{\
color: #555555;\
}\
.modlistnegro A:nth-child(odd){\
background: #435058;\
}\
.modlistnegro A:hover{\
background: #273037;\
}\
.modlistnegro span{\
color: #C5D1EC;\
}\
.config {\
background-position: -78px -29px;\
width: 14px;\
height: 14px;\
display: inline-block;\
margin: 0 3px;\
position: relative;\
}\
.utmenubutton{\
padding-left: 15px;\
}\
#ut-mask {\
background: #ffffff; width: 100%; height: 100%; position: fixed; opacity: 0.9; z-index: 9998;\
}\
#ut-mask-menu {\
background: #000000; width: 100%; height: 100%; position: fixed; opacity: 0.9; z-index: 9998;\
}\
#ut-dialog {\
width: 500px; top: 10px; left: 50%; margin-left: -250px; position: absolute; z-index: 9999;\
}\
#ut-dialog-menu {\
width: 500px; top: 50px; left: 50%; margin-left: -250px; position: absolute; z-index: 9999;\
}\
.ut-boton-sino{\
cursor: pointer;\
color: #EF5000;\
}\
#ut-window {\
background: #ffffff; border-radius: 6px; padding: 10px 10px 30px 10px; border: 1px solid #cccccc;\
}\
#ut-menu-contenido {\
background: #fff;\
min-height: 270px;\
}\
#ut-menu-contenido TABLE{\
border-top: 1px solid #ccc;\
}\
.newquote a.toggled, .newquoteblack a.toggled{\
border-style: solid !important;\
border-width: 1px !important;\
margin: 0 !important;\
padding: 0 3px !important;\
}\
.newquote a.toggled {\
border-color: #CCCCCC #CCCCCC #CCCCCC !important;\
}\
.newquoteblack a.toggled{\
border-color: #CCCCCC #CCCCCC #CCCCCC !important;\
}\
.newquote div.quote, .newquoteblack div.quote{\
border: 1px solid #CCCCCC !important;\
margin: 0 0 8px !important;\
border-radius: 0 6px 6px 6px !important;\
}\
.tinycol.bigscreen{\
margin-top: 800px;\
}\
.postit.bigscreen{\
width: 958px;\
padding-left: 0px;\
}\
#pi_body.bigscreen{\
width: 938px;\
}\
.embedded.bigscreen{\
;\
}\
#bigscreen-mode{\
background-position: -99px -28px;\
width: 41px;\
height: 23px;\
float: right;\
margin: 5px 0 5px 10px;\
cursor: pointer;\
}\
#bigscreen-mode:hover{\
background-position: -142px -28px;\
}\
#bigscreen-mode-off{\
background-position: -99px 0;\
width: 41px;\
height: 23px;\
float: right;\
margin: 5px 0px 5px 10px;\
cursor: pointer;\
}\
#bigscreen-mode-off:hover{\
background-position: -141px 0;\
}\
.post .spoiler-content {\
background-color: #F0F2ED;\
padding: 5px;\
border-bottom: 1px solid #d7d9d4;\
}\
.post.odd .spoiler-content {\
background-color: #E7E9E4;\
}\
.post .spoiler-content-black {\
background-color: #435058;\
padding: 5px;\
border-bottom: 1px solid #252C31;\
}\
.post.odd .spoiler-content-black {\
background-color: #39444B;\
}\
#ut-menu-tabs div{\
margin: 0 10px 0 0;\
padding: 3px 4px;\
background: #eee;\
display: inline-block;\
cursor: pointer;\
border-top: 1px solid #CCCCCC;\
border-right: 1px solid #CCCCCC;\
border-left: 1px solid #CCCCCC;\
color: #999;\
font-size: 13px;\
}\
#ut-menu-tabs div.active{\
background: #444;\
color: #eee;\
border-top: 1px solid #CCCCCC;\
border-right: 1px solid #CCCCCC;\
border-left: 1px solid #CCCCCC;\
}\
#ut-menu-tabs div.active:hover{\
background: #444;\
color: #eee;\
border-top: 1px solid #CCCCCC;\
border-right: 1px solid #CCCCCC;\
border-left: 1px solid #CCCCCC;\
}\
#ut-menu-tabs div:hover{\
background: #ddd;\
color: #222;\
}\
#ut-menu-contenido .ut-opciones td:nth-child(2n+1){\
width: 420px;\
}\
.ut-arrow-up{\
background-position: -75px -53px;\
width: 12px;\
height: 17px;\
display: block; \
}\
.ut-arrow-down{\
background-position: -75px -70px;\
width: 12px;\
height: 17px;\
display: block; \
}\
#ut-boton-plus{\
background-color: #888888 !important;\
}\
#ut-boton-plus:hover {\
background-color: #777777 !important;\
}\
.ut-titleymacro{\
padding: 0 0 2px 3px;\
border-left: 2px solid #FF5500;\
margin: 10px 0;\
}\
.ut-titletxt{\
font-weight: bold;\
cursor: default;\
}\
.ut-macrotxt {\
color: #222222;\
text-overflow: ellipsis;\
-o-text-overflow: ellipsis;\
text-overflow: ellipsis;\
overflow:hidden;\
white-space:nowrap;\
width: 460px;\
}\
.ut-macrotxt:hover {\
white-space:pre-wrap;\
}\
.icon-down-list{\
background-position: -97px -59px;\
width: 12px;\
height: 9px;\
display: inline-block;\
vertical-align: middle;\
}\
.UT-trash{\
background-position: -97px -72px;\
width: 11px;\
height: 14px;\
display: inline-block;\
vertical-align: middle;\
}\
.UT-trash-orange{\
background-position: -114px -72px; \
width: 11px;\
height: 14px;\
display: inline-block;\
}\
#ut-button-macros-list{\
position: absolute;\
top: 132px;\
left: 154px;\
width: 125px;\
border-radius: 0px 0px 5px 5px;\
background-color: #565656;\
border: 1px solid #AAAAAA;\
color: #eee;\
}\
#ut-button-macros-list li{\
display: block;\
cursor: pointer;\
border-bottom: 1px solid #888888;\
padding: 1px 1px 1px 3px;\
}\
#ut-button-macros-list li:hover{\
background-color: #aaaaaa;\
}\
.ut-button-macros-list-barrendera{\
top: 68px !important;\
left: 290px !important;\
}\
#ut-button-macros-list-anadir {\
padding: 1px 1px 2px 3px;\
cursor: pointer;\
display: block;\
color: #ccc;\
background-color: #333;\
border-radius: 0 0 5px 5px;\
}\
#ut-button-macros-list-anadir:hover {\
color: #fff;\
background-color: #ff7700;\
}\
#ut-macro {\
overflow: auto;\
width: 98%;\
margin-top: 5px;\
}\
#ut-foros-fav LI{\
margin: 0 0 5px;\
transition: all 0.5s;\
-moz-transition: all 0.5s;\
-ms-transition: all 0.5s;\
-webkit-transition: all 0.5s;\
-o-transition: all 0.5s;\
}\
#ut-foros-fav LI:hover{\
}\
#ut-foros-fav LI A{\
background: #ccc;\
border-radius: 3px 3px 3px 3px;\
border: 1px solid #EEEEEE;\
vertical-align: middle;\
padding: 3px 4px;\
display: inline-block;\
transition: all 0.5s;\
-moz-transition: all 0.5s;\
-ms-transition: all 0.5s;\
-webkit-transition: all 0.5s;\
-o-transition: all 0.5s;\
}\
#ut-foros-fav LI A:hover{\
background: #999;\
}\
#foros-fav-float{\
position: absolute;\
top: 200px;\
margin-left: 1005px;\
opacity: 0.2;\
margin-top: 10px;\
transition: opacity 0.5s;\
-moz-transition: opacity 0.5s;\
-ms-transition: opacity 0.5s;\
-webkit-transition: opacity 0.5s;\
-o-transition: opacity 0.5s;\
}\
#foros-fav-float:hover {\
opacity: 1;\
}\
.foros-fav-float-sticky{\
top: 0px !important;\
position: fixed !important;\
}\
.ut-foros-fav-borrar{\
display: inline-block;\
margin: 0 0 0 10px;\
vertical-align: middle;\
opacity: 0.04;\
transition: all 0.5s;\
-moz-transition: all 0.5s;\
-ms-transition: all 0.5s;\
-webkit-transition: all 0.5s;\
-o-transition: all 0.5s;\
cursor: pointer;\
}\
.ut-foros-fav-borrar:hover{\
opacity: 1;\
}\
.ut-foros-fav-borrar:hover{\
opacity: 1;\
}\
.ut-foro-fav-add {\
background: url('http://www.mvusertools.com/ext/img/star.png') no-repeat scroll center -30px #FF9300;\
height: 38px;\
margin: 40px 0 0 -8px;\
width: 40px;\
transition: margin 0.5s;\
-moz-transition: margin 0.5s;\
-ms-transition: margin 0.5s;\
-webkit-transition: margin 0.5s;\
-o-transition: margin 0.5s;\
cursor: pointer;\
}\
.ut-foro-fav-added {\
background: url('http://www.mvusertools.com/ext/img/star.png') no-repeat scroll center 8px #FF9300;\
}\
.ut-foro-fav-add-moveup{\
margin: 3px 0 0 -8px;\
}\
.ut-filtrar {\
cursor: pointer;\
}\
.ut-opacity {\
opacity: 0.2;\
}\
#ut-filtros-fav{\
}\
#utFavQuitar{\
cursor: pointer;\
margin: 5px 0 20px 0;\
width: 80px;\
opacity: 0.7;\
}\
#utFavAviso{\
cursor: pointer;\
margin: 5px 0 20px 0;\
font-size: 9px;\
opacity: 0.5;\
}\
#utFavAviso:hover{\
opacity: 1;\
}\
#utFavAvisoTxt{\
border: 1px solid #ccc;\
border-radius: 6px;\
padding: 5px;\
margin: -15px 0 20px 0;\
display: none;\
font-size: 9px;\
}\
#ut-filtros-fav .foroicon{\
display: inline-block;\
padding: 0 4px 4px;\
}\
#ut-filtros-tags .cat2{\
display: inline-block;\
margin: 0 15px 5px 5px;\
}\
#ut-fav-filto-titulo{\
font-size: 14px;\
margin: 0 0 9px;\
font-family: Trebuchet MS,Arial,Verdana,sans-serif;\
font-weight: bold;\
}\
.ut-linksfooter{\
margin-top: 15px;\
}\
.ut-linksfooter-blanco{\
border: 1px solid #C7C9C3 !important;\
border-top:1px solid #C7C9C3 !important;\
border-bottom:1px solid #BABCB6 !important;\
background: linear-gradient(to top, #E8EBE3, #D6D8D2) !important;\
background: -webkit-gradient(linear, left top, left bottom, from(#D6D8D2), to(#E8EBE3)) !important;\
}\
.ut-linksfooter-blanco A{\
color: #777 !important;\
}\
.ut-linksfooter-blanco A:hover{\
color: #444 !important;\
}\
.ut-linksfooter-blanco a.lu, .ut-linksfooter-blanco a.ln, .ut-linksfooter-blanco a.lf, .ut-linksfooter-blanco a.lm, .ut-linksfooter-blanco li.logout{\
background-image: url('http://mvusertools.com/ext/img/ut_topbar_icons.gif') !important;\
}\
.ut-linksfooter-blanco strong.bubble {\
background-image: url('http://mvusertools.com/ext/img/bubble.png') !important;\
text-shadow: 0 0 3px #000000 !important;\
}\
.ut_tag{\
color: #ffffff;\
position: absolute;\
margin-top: 28px;\
padding: 2px 4px;\
border-radius: 4px;\
transition: 0.5s;\
-moz-transition: 0.5s;\
-ms-transition: 0.5s;\
-webkit-transition: 0.5s;\
-o-transition: 0.5s;\
cursor: pointer;\
text-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);\
white-space: nowrap;\
}\
.ut_tag:hover{\
box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);\
}\
.ut_tag_vacia:hover{\
opacity: 1.0 !important;\
width: 65px !important;\
height: 15px !important;\
}\
.ut_tag_info {\
position: absolute;\
background: #cccccc;\
border: 1px solid #999999;\
padding: 5px;\
margin: -129px 0 0 0;\
font-size: 10px;\
border-radius: 0 4px 4px 4px;\
}\
.ut_tag_info input,.ut_tag_info textarea{\
font-size: 9px;\
padding: 1px 1px 3px 1px;\
}\
.ut_tag_info input[type=submit]{\
padding: 0px;\
float: right;\
}\
.ut_tag_info input[type=submit]:hover{\
background: #3e8baf;\
color: #fff;\
}\
.ut_tag_tag, .ut_tag_link, .ut_tag_color {\
width: 110px;\
}\
.ut_tag_info_cerrar {\
cursor: pointer;\
position: absolute;\
margin: -8px 0 0 110px;\
color: #cb0000;\
}\
.ut_tag_colores div{\
width: 10px;\
height: 10px;\
display: inline-block;\
vertical-align: bottom;\
margin: 0 0 1px 1px;\
}\
.ut_tag_colores{\
display: inline;\
padding: 0 0 0 2px;\
}\
.ut_tag_colores_1 {\
background: #64ADCC;\
}\
.ut_tag_colores_2 {\
background: #51C25B;\
}\
.ut_tag_colores_3 {\
background: #C28051;\
}\
.ut_tag_colores_4 {\
background: #E3222F;\
}\
.ut_tag_colores_5 {\
background: #BC62BF;\
}\
.ut_tag_colores_6 {\
background: #4A4A4A;\
}\
";

if (typeof GM_addStyle !== 'undefined') {
    GM_addStyle(css);
} else if (typeof PRO_addStyle !== 'undefined') {
    PRO_addStyle(css);
} else if (typeof addStyle !== 'undefined') {
    addStyle(css);
} else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        heads[0].appendChild(node);
    }
}
})();
