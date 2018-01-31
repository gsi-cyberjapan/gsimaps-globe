/************************************************************************
 設定
 ************************************************************************/
var GSI = {
	 ClientMode  : {}
	,Modal       : {}
	,Control     : {}
	,Utils       : {
		Browser  : {}
	 }
	,GLOBALS     : {}
};
var CONFIG = {};

CONFIG.ISFROMGSIMAP = (function(){
	// 高さ、緯度、経度、（倍率）の指定はあり、カメラ角度の指定が無い場合に真
	var params = location.hash.replace(/^#/, '').replace(/\/?\&.*/, '').split('/');
	var result = false;
	result = (params.length > 1 && params.length <= 4 ? true : false);
	return result;
})();

// 表示できる情報にレイヤータイプを表示したい場合に真
CONFIG.LAYERTYPEDISPLAY = false;

var MATEST = {
	enabled: null,
	
	proxyUrl: function( url )
	{
		return url;
	}
};



//標高タイル(png)
//https://cyberjapandata.gsi.go.jp/xyz/png_dem5a/{z}/{x}/{y}.png
//https://cyberjapandata.gsi.go.jp/xyz/png_dem5b/{z}/{x}/{y}.png
//https://cyberjapandata.gsi.go.jp/xyz/png_dem10b/{z}/{x}/{y}.png
/*
CONFIG.TERRAINPROVIDEROPTIONS = {
	url :"//cyberjapandata.gsi.go.jp/xyz/png_dem10b/{z}/{x}/{y}.png",
	maxZoom : 14
};
*/
/*
//標高タイル(テキスト)
CONFIG.TERRAINPROVIDEROPTIONS = {
	url :"//cyberjapandata.gsi.go.jp/xyz/dem/{z}/{x}/{y}.txt",
	maxZoom : 14
};
*/



// 地理院地図用 layersファイル指定。
// (CONFIG.layers = null;に変更すると、同階層のlayers.txtを読込)
CONFIG.layersTab = [
	{
		'caption' : 'トピック',
		'layers' : [
			'../layers_txt/layers1.txt',
			'../layers_txt/layers_topic.txt',
			'../layers_txt/layers_skhb.txt',
			'../layers_txt/layers_topic_kusatsushirane.txt',
			'../layers_txt/layers_topic_nishi.txt'
		]
	},
	{
		'caption' : 'ベースマップ',
		'layers' : [
			'../layers_txt/layers0.txt'
		]
	},
	{
		'caption' : '全て',
		'layers' : null,
		'isDetail' : true
	}
	
];

CONFIG.layerBase          = ['../layers_txt/layers0.txt'];
CONFIG.layerBaseDefaultID = "std";
CONFIG.layerBaseFolder    = "ベースマップ";
CONFIG.layerBaseFolderSYS = "GSI.MAP.BASE";
CONFIG.layers = [
	'../layers_txt/layers1.txt',
	'../layers_txt/layers2.txt',
	'../layers_txt/layers3.txt',
	'../layers_txt/layers4.txt',
	'../layers_txt/layers_skhb.txt',
	'../layers_txt/layers5.txt',
	'../layers_txt/layers_experimental.txt',
];

CONFIG.layerEvacuationFolder = "指定緊急避難場所";
CONFIG.layerEvacuationFolderSYS = "GSI.MAP.EVAC";
CONFIG.layerEvacuationHeader = "skhb";
CONFIG.layerEvacuationIsConfirmOK = false;

//キャッシュ（Layers.txt）
CONFIG.LOADLAYERSTXTCACHE = false;

//キャッシュ（ココタイル）
CONFIG.LOADCOCOTILECACHE = true;

// レイヤータイプリスト
CONFIG.LAYERTYPELIST = {
	"kml"           : { caption : "KML", isTile: false },
	"tile"          : { caption : "タイル", isTile: true, isTileImage : true },
	"geojson"       : { caption : "GeoJSON", isTile: false },
	"topojson"      : { caption : "TopoJSON", isTile: false },
	"geojson_tile"  : { caption : "GeoJSONタイル", isTile: true },
	"topojson_tile" : { caption : "TopoJSONタイル", isTile: true },
	"tms"           : { caption : "TMS", isTile: true, isTileImage : true },
	"multiLayer"    : { caption : "複数レイヤ", isTile: false }
};

// 背景地図
CONFIG.BASETILES = [];
// パラメータ用
CONFIG.HIDDENCONTROLPARAMETER = {
	INFOMENU : 'i',
	FUNCMENU : 'f',
    FOOTER : 'footer',
	HEADER : 'h',
	CONTEXTMENU : 'c',
	BASEMAPSELECTOR : 'b',
	ALL : 'all'
};

CONFIG.DIALOGPARAMETER = {
	VIEWLISTDIALOG : 'v',
	LAYERTREEDIALOG : 'l'
};
// ダイアログ表示等エフェクト
CONFIG.EFFECTS = {
	// メニュー表示エフェクト
	MENU : {
		ROOT : {
			animation : "slide",
			option : {"easing": "linear"},
			speed : "fast"
		},
		OTHER : {
			animation : "scale",
			option : {"direction": "both","easing": "linear"},
			speed : "fast"
		}
	},
	// ダイアログ表示エフェクト
	DIALOG : {
		animation : "puff",
		option : {"percent": 10},
		speed : "fast"
	}

};

CONFIG.LAYERTREEDIALOGKEEPCURRENT = true;
// サーバーサイドAPI
CONFIG.SERVERAPI = {};

CONFIG.SERVERAPI.GETADDR = "https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress";
CONFIG.SERVERAPI.CHIMEI_SEARCH="https://msearch.gsi.go.jp/address-search/AddressSearch";


/// 標高
/*
CONFIG.DEM     = new Array(1);
CONFIG.DEM[0] = { type : "PNG", url : "./[@]/tile.gsi/{z}/{x}/{y}.png"                   , z :  9, fixed : 1, src : "標高ＰＮＧ" };
*/

CONFIG.DEM = new Array(4);
CONFIG.DEM[0] = { type : "TXT", url : "https://cyberjapandata.gsi.go.jp/xyz/dem5a/{z}/{x}/{y}.txt", z : 15, fixed : 1, src : "DEM5A" };
CONFIG.DEM[1] = { type : "TXT", url : "https://cyberjapandata.gsi.go.jp/xyz/dem5b/{z}/{x}/{y}.txt", z : 15, fixed : 1, src : "DEM5B" };
CONFIG.DEM[2] = { type : "TXT", url : "https://cyberjapandata.gsi.go.jp/xyz/dem/{z}/{x}/{y}.txt"  , z : 14, fixed : 0, src : "DEM10B"};
CONFIG.DEM[3] = { type : "TXT", url : "https://cyberjapandata.gsi.go.jp/xyz/demgm/{z}/{x}/{y}.txt"  , z : 8, fixed : 0, src : "DEMGM"};

//for IE9
var vs = window.navigator.appVersion.toLowerCase();
var ua = window.navigator.userAgent.toLowerCase();
if((ua.indexOf("msie") >= 0) && (vs.indexOf("msie 9") >= 0))
{
	CONFIG.DEM[0] = { type : "TXT", url : "http://cyberjapandata.gsi.go.jp/xyz/dem5a/{z}/{x}/{y}.txt", z : 15, fixed : 1, src : "DEM5A" };
	CONFIG.DEM[1] = { type : "TXT", url : "http://cyberjapandata.gsi.go.jp/xyz/dem5b/{z}/{x}/{y}.txt", z : 15, fixed : 1, src : "DEM5B" };
	CONFIG.DEM[2] = { type : "TXT", url : "http://cyberjapandata.gsi.go.jp/xyz/dem/{z}/{x}/{y}.txt"  , z : 14, fixed : 0, src : "DEM10B"};
	CONFIG.DEM[3] = { type : "TXT", url : "http://cyberjapandata.gsi.go.jp/xyz/demgm/{z}/{x}/{y}.txt"  , z : 8, fixed : 0, src : "DEMGM"};
	
	CONFIG.SERVERAPI.GETADDR = "http://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress";
	CONFIG.SERVERAPI.CHIMEI_SEARCH="http://msearch.gsi.go.jp/address-search/AddressSearch";
}

CONFIG.Z2HEIGHT = {
	 0: 70000000,
	 1: 50000000,
	 2: 25000000,
	 3: 15000000,
	 4: 7000000,
	 5: 3500000,
	 6: 2500000,
	 7: 1200000,
	 8: 550000,
	 9: 250000,
	10: 150000,
	11: 70000,
	12: 35000,
	13: 15000,
	14: 8000,
	15: 4000,
	16: 2200,
	17: 1200,
	18: 550
};

// アイコンの描画方法（真：SingleTileImageryProvederを使用／偽：Billboardを使用）
CONFIG.TILEASICON_ENABLED = false;

// アイコンの描画にSingleTileImageryProvederを利用する際、クリック反応用に重ね合わせるBillboardのalpha値
CONFIG.TILEASICON_ICONALPHA = 0.00001;



/************************************************************************
 設定：メニュー：情報
 ************************************************************************/
CONFIG.MAPMENU = {
	title : '情報'
};

/************************************************************************
 設定：メニュー：機能
 ************************************************************************/

CONFIG.FUNCMENU = {
	title : '機能',
	children : [
		{
			title : 'ツール',
			arrow : true,
			childrenWidth:230,
			children : [
				{
					id : 'file_read',
					title : 'ファイル読込',
					arrow : true
				},
				{
					id : 'height_power',
					title : '高さ倍率',
					arrow : true
				},
				{
					id : 'share_link',
					title : 'リンクを取得',
					arrow : true
				}
			]
		},
		{
			title : '地理院地図',
			arrow : true,
			href : 'gsi2d'
		},
		{
			title : '3D',
			arrow : true,
			href : 'gsi3d'
		}
	]
};

/************************************************************************
 設定：文言
 ************************************************************************/
GSI.TEXT = {};
GSI.TEXT.SAKUZU = {};

GSI.TEXT.SAKUZU.DIALOG_LOAD_COMMENT = '<strong>KML,GeoJSON</strong>ファイルを選択してください<br><div style="font-size:85%">※ファイルを地図上にドラッグ＆ドロップすることでも読み込めます</div>';
GSI.TEXT.SAKUZU.DIALOG_LOAD_COMMENT_IE8 = '<strong>KML,GeoJSON</strong>ファイルの内容を入力して下さい<br><div style="font-size:85%">※ファイルを地図上にドラッグ＆ドロップすることでも読み込めます</div>' ;
GSI.TEXT.SAKUZU.DIALOG_LOAD_FILENAMECAPTION = 'パネル上の表示名' ;

GSI.TEXT.SAKUZU.DIALOG_LOAD_OKBTN = '読込を開始';
GSI.TEXT.SAKUZU.DIALOG_LOAD_CANCELBTN = '中　止';
GSI.TEXT.SAKUZU.DIALOG_LOAD_NOFILE = 'ファイルが選択されていません。';
GSI.TEXT.SAKUZU.DIALOG_LOAD_NOTEXT = 'テキストが入力されていません。';
GSI.TEXT.SAKUZU.DIALOG_LOAD_ERROR = '読み込みに失敗しました。ファイルの形式をご確認ください。';

GSI.TEXT.EVAC = {};
GSI.TEXT.EVAC.KIYAKU = '最新の状況などは当該市町村にご確認ください。';
GSI.TEXT.EVAC.KIYAKULINK = '<a href="http://www.gsi.go.jp/bousaichiri/hinanbasho.html" target="blank">「指定緊急避難場所」について</a>　<a href="http://disaportal.gsi.go.jp/hinanbasho/koukaidate.html" target="blank">市町村別公開日・更新日一覧</a>';
GSI.TEXT.EVAC.CONFIRMTOP = '地理院地図に掲載されている指定緊急避難場所データ（以下、「本データ」といいます）を利用される場合は、<a href="http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html" target="blank">国土地理院コンテンツ利用規約</a>のほか、以下のご利用上の注意をご確認いただき、内容に同意された場合のみご利用ください。';
GSI.TEXT.EVAC.ATTENTION = '【ご利用上の注意】';
GSI.TEXT.EVAC.CONFIRMITEM1 = '本データは、災害対策基本法第49条の4に基づき市町村長が指定した指定緊急避難場所の情報を各市町村に提供いただき、当該市町村に確認の上、地図上に表示したものです。最新の状況などは当該市町村にご確認ください。';
GSI.TEXT.EVAC.CONFIRMITEM2 = '本データを、ダウンロードや印刷等を行い国土地理院サーバ外で利用される場合は、本データの更新にあわせて最新の情報をご利用ください（参照：<a href="http://disaportal.gsi.go.jp/hinanbasho/koukaidate.html" target="blank">市町村別公開日・更新日一覧</a>）。';
GSI.TEXT.EVAC.CONFIRMITEM3 = '指定緊急避難場所は、災害種別ごとに指定されています。本データをダウンロードや印刷等を行い国土地理院サーバ外で利用される場合、指定された災害種別を利用者が正確に理解できるよう、十分にご留意ください。';
GSI.TEXT.EVAC.ATTENTIONDATA = '【データについて】';
GSI.TEXT.EVAC.DATAITEM1 = '<a href="http://www.gsi.go.jp/bousaichiri/hinanbasho.html" target="blank">「指定緊急避難場所」について</a>';
GSI.TEXT.EVAC.DATAITEM2 = '<a href="http://www.gsi.go.jp/bousaichiri/hinanbasho-help.html" target="blank">利用方法</a>';
GSI.TEXT.EVAC.DATAITEM3 = '<a href="http://disaportal.gsi.go.jp/hinanbasho/koukaidate.html" target="blank">市町村別公開日・更新日一覧</a>';
GSI.TEXT.EVAC.DATAITEM5 = '<a href="https://geoinfo2.gsi.go.jp/contact/Inquiry2.aspx?pcode=1004&bcode=100411&mcode=10041101" target="blank">お問い合わせ</a>';


GSI.MUNI_ARRAY = {};
GSI.MUNI_ARRAY["1100"] = '1,北海道,1100,札幌市';
GSI.MUNI_ARRAY["1101"] = '1,北海道,1101,札幌市　中央区';
GSI.MUNI_ARRAY["1102"] = '1,北海道,1102,札幌市　北区';
GSI.MUNI_ARRAY["1103"] = '1,北海道,1103,札幌市　東区';
GSI.MUNI_ARRAY["1104"] = '1,北海道,1104,札幌市　白石区';
GSI.MUNI_ARRAY["1105"] = '1,北海道,1105,札幌市　豊平区';
GSI.MUNI_ARRAY["1106"] = '1,北海道,1106,札幌市　南区';
GSI.MUNI_ARRAY["1107"] = '1,北海道,1107,札幌市　西区';
GSI.MUNI_ARRAY["1108"] = '1,北海道,1108,札幌市　厚別区';
GSI.MUNI_ARRAY["1109"] = '1,北海道,1109,札幌市　手稲区';
GSI.MUNI_ARRAY["1110"] = '1,北海道,1110,札幌市　清田区';
GSI.MUNI_ARRAY["1202"] = '1,北海道,1202,函館市';
GSI.MUNI_ARRAY["1203"] = '1,北海道,1203,小樽市';
GSI.MUNI_ARRAY["1204"] = '1,北海道,1204,旭川市';
GSI.MUNI_ARRAY["1205"] = '1,北海道,1205,室蘭市';
GSI.MUNI_ARRAY["1206"] = '1,北海道,1206,釧路市';
GSI.MUNI_ARRAY["1207"] = '1,北海道,1207,帯広市';
GSI.MUNI_ARRAY["1208"] = '1,北海道,1208,北見市';
GSI.MUNI_ARRAY["1209"] = '1,北海道,1209,夕張市';
GSI.MUNI_ARRAY["1210"] = '1,北海道,1210,岩見沢市';
GSI.MUNI_ARRAY["1211"] = '1,北海道,1211,網走市';
GSI.MUNI_ARRAY["1212"] = '1,北海道,1212,留萌市';
GSI.MUNI_ARRAY["1213"] = '1,北海道,1213,苫小牧市';
GSI.MUNI_ARRAY["1214"] = '1,北海道,1214,稚内市';
GSI.MUNI_ARRAY["1215"] = '1,北海道,1215,美唄市';
GSI.MUNI_ARRAY["1216"] = '1,北海道,1216,芦別市';
GSI.MUNI_ARRAY["1217"] = '1,北海道,1217,江別市';
GSI.MUNI_ARRAY["1218"] = '1,北海道,1218,赤平市';
GSI.MUNI_ARRAY["1219"] = '1,北海道,1219,紋別市';
GSI.MUNI_ARRAY["1220"] = '1,北海道,1220,士別市';
GSI.MUNI_ARRAY["1221"] = '1,北海道,1221,名寄市';
GSI.MUNI_ARRAY["1222"] = '1,北海道,1222,三笠市';
GSI.MUNI_ARRAY["1223"] = '1,北海道,1223,根室市';
GSI.MUNI_ARRAY["1224"] = '1,北海道,1224,千歳市';
GSI.MUNI_ARRAY["1225"] = '1,北海道,1225,滝川市';
GSI.MUNI_ARRAY["1226"] = '1,北海道,1226,砂川市';
GSI.MUNI_ARRAY["1227"] = '1,北海道,1227,歌志内市';
GSI.MUNI_ARRAY["1228"] = '1,北海道,1228,深川市';
GSI.MUNI_ARRAY["1229"] = '1,北海道,1229,富良野市';
GSI.MUNI_ARRAY["1230"] = '1,北海道,1230,登別市';
GSI.MUNI_ARRAY["1231"] = '1,北海道,1231,恵庭市';
GSI.MUNI_ARRAY["1233"] = '1,北海道,1233,伊達市';
GSI.MUNI_ARRAY["1234"] = '1,北海道,1234,北広島市';
GSI.MUNI_ARRAY["1235"] = '1,北海道,1235,石狩市';
GSI.MUNI_ARRAY["1236"] = '1,北海道,1236,北斗市';
GSI.MUNI_ARRAY["1303"] = '1,北海道,1303,当別町';
GSI.MUNI_ARRAY["1304"] = '1,北海道,1304,新篠津村';
GSI.MUNI_ARRAY["1331"] = '1,北海道,1331,松前町';
GSI.MUNI_ARRAY["1332"] = '1,北海道,1332,福島町';
GSI.MUNI_ARRAY["1333"] = '1,北海道,1333,知内町';
GSI.MUNI_ARRAY["1334"] = '1,北海道,1334,木古内町';
GSI.MUNI_ARRAY["1337"] = '1,北海道,1337,七飯町';
GSI.MUNI_ARRAY["1343"] = '1,北海道,1343,鹿部町';
GSI.MUNI_ARRAY["1345"] = '1,北海道,1345,森町';
GSI.MUNI_ARRAY["1346"] = '1,北海道,1346,八雲町';
GSI.MUNI_ARRAY["1347"] = '1,北海道,1347,長万部町';
GSI.MUNI_ARRAY["1361"] = '1,北海道,1361,江差町';
GSI.MUNI_ARRAY["1362"] = '1,北海道,1362,上ノ国町';
GSI.MUNI_ARRAY["1363"] = '1,北海道,1363,厚沢部町';
GSI.MUNI_ARRAY["1364"] = '1,北海道,1364,乙部町';
GSI.MUNI_ARRAY["1367"] = '1,北海道,1367,奥尻町';
GSI.MUNI_ARRAY["1370"] = '1,北海道,1370,今金町';
GSI.MUNI_ARRAY["1371"] = '1,北海道,1371,せたな町';
GSI.MUNI_ARRAY["1391"] = '1,北海道,1391,島牧村';
GSI.MUNI_ARRAY["1392"] = '1,北海道,1392,寿都町';
GSI.MUNI_ARRAY["1393"] = '1,北海道,1393,黒松内町';
GSI.MUNI_ARRAY["1394"] = '1,北海道,1394,蘭越町';
GSI.MUNI_ARRAY["1395"] = '1,北海道,1395,ニセコ町';
GSI.MUNI_ARRAY["1396"] = '1,北海道,1396,真狩村';
GSI.MUNI_ARRAY["1397"] = '1,北海道,1397,留寿都村';
GSI.MUNI_ARRAY["1398"] = '1,北海道,1398,喜茂別町';
GSI.MUNI_ARRAY["1399"] = '1,北海道,1399,京極町';
GSI.MUNI_ARRAY["1400"] = '1,北海道,1400,倶知安町';
GSI.MUNI_ARRAY["1401"] = '1,北海道,1401,共和町';
GSI.MUNI_ARRAY["1402"] = '1,北海道,1402,岩内町';
GSI.MUNI_ARRAY["1403"] = '1,北海道,1403,泊村';
GSI.MUNI_ARRAY["1404"] = '1,北海道,1404,神恵内村';
GSI.MUNI_ARRAY["1405"] = '1,北海道,1405,積丹町';
GSI.MUNI_ARRAY["1406"] = '1,北海道,1406,古平町';
GSI.MUNI_ARRAY["1407"] = '1,北海道,1407,仁木町';
GSI.MUNI_ARRAY["1408"] = '1,北海道,1408,余市町';
GSI.MUNI_ARRAY["1409"] = '1,北海道,1409,赤井川村';
GSI.MUNI_ARRAY["1423"] = '1,北海道,1423,南幌町';
GSI.MUNI_ARRAY["1424"] = '1,北海道,1424,奈井江町';
GSI.MUNI_ARRAY["1425"] = '1,北海道,1425,上砂川町';
GSI.MUNI_ARRAY["1427"] = '1,北海道,1427,由仁町';
GSI.MUNI_ARRAY["1428"] = '1,北海道,1428,長沼町';
GSI.MUNI_ARRAY["1429"] = '1,北海道,1429,栗山町';
GSI.MUNI_ARRAY["1430"] = '1,北海道,1430,月形町';
GSI.MUNI_ARRAY["1431"] = '1,北海道,1431,浦臼町';
GSI.MUNI_ARRAY["1432"] = '1,北海道,1432,新十津川町';
GSI.MUNI_ARRAY["1433"] = '1,北海道,1433,妹背牛町';
GSI.MUNI_ARRAY["1434"] = '1,北海道,1434,秩父別町';
GSI.MUNI_ARRAY["1436"] = '1,北海道,1436,雨竜町';
GSI.MUNI_ARRAY["1437"] = '1,北海道,1437,北竜町';
GSI.MUNI_ARRAY["1438"] = '1,北海道,1438,沼田町';
GSI.MUNI_ARRAY["1452"] = '1,北海道,1452,鷹栖町';
GSI.MUNI_ARRAY["1453"] = '1,北海道,1453,東神楽町';
GSI.MUNI_ARRAY["1454"] = '1,北海道,1454,当麻町';
GSI.MUNI_ARRAY["1455"] = '1,北海道,1455,比布町';
GSI.MUNI_ARRAY["1456"] = '1,北海道,1456,愛別町';
GSI.MUNI_ARRAY["1457"] = '1,北海道,1457,上川町';
GSI.MUNI_ARRAY["1458"] = '1,北海道,1458,東川町';
GSI.MUNI_ARRAY["1459"] = '1,北海道,1459,美瑛町';
GSI.MUNI_ARRAY["1460"] = '1,北海道,1460,上富良野町';
GSI.MUNI_ARRAY["1461"] = '1,北海道,1461,中富良野町';
GSI.MUNI_ARRAY["1462"] = '1,北海道,1462,南富良野町';
GSI.MUNI_ARRAY["1463"] = '1,北海道,1463,占冠村';
GSI.MUNI_ARRAY["1464"] = '1,北海道,1464,和寒町';
GSI.MUNI_ARRAY["1465"] = '1,北海道,1465,剣淵町';
GSI.MUNI_ARRAY["1468"] = '1,北海道,1468,下川町';
GSI.MUNI_ARRAY["1469"] = '1,北海道,1469,美深町';
GSI.MUNI_ARRAY["1470"] = '1,北海道,1470,音威子府村';
GSI.MUNI_ARRAY["1471"] = '1,北海道,1471,中川町';
GSI.MUNI_ARRAY["1472"] = '1,北海道,1472,幌加内町';
GSI.MUNI_ARRAY["1481"] = '1,北海道,1481,増毛町';
GSI.MUNI_ARRAY["1482"] = '1,北海道,1482,小平町';
GSI.MUNI_ARRAY["1483"] = '1,北海道,1483,苫前町';
GSI.MUNI_ARRAY["1484"] = '1,北海道,1484,羽幌町';
GSI.MUNI_ARRAY["1485"] = '1,北海道,1485,初山別村';
GSI.MUNI_ARRAY["1486"] = '1,北海道,1486,遠別町';
GSI.MUNI_ARRAY["1487"] = '1,北海道,1487,天塩町';
GSI.MUNI_ARRAY["1511"] = '1,北海道,1511,猿払村';
GSI.MUNI_ARRAY["1512"] = '1,北海道,1512,浜頓別町';
GSI.MUNI_ARRAY["1513"] = '1,北海道,1513,中頓別町';
GSI.MUNI_ARRAY["1514"] = '1,北海道,1514,枝幸町';
GSI.MUNI_ARRAY["1516"] = '1,北海道,1516,豊富町';
GSI.MUNI_ARRAY["1517"] = '1,北海道,1517,礼文町';
GSI.MUNI_ARRAY["1518"] = '1,北海道,1518,利尻町';
GSI.MUNI_ARRAY["1519"] = '1,北海道,1519,利尻富士町';
GSI.MUNI_ARRAY["1520"] = '1,北海道,1520,幌延町';
GSI.MUNI_ARRAY["1543"] = '1,北海道,1543,美幌町';
GSI.MUNI_ARRAY["1544"] = '1,北海道,1544,津別町';
GSI.MUNI_ARRAY["1545"] = '1,北海道,1545,斜里町';
GSI.MUNI_ARRAY["1546"] = '1,北海道,1546,清里町';
GSI.MUNI_ARRAY["1547"] = '1,北海道,1547,小清水町';
GSI.MUNI_ARRAY["1549"] = '1,北海道,1549,訓子府町';
GSI.MUNI_ARRAY["1550"] = '1,北海道,1550,置戸町';
GSI.MUNI_ARRAY["1552"] = '1,北海道,1552,佐呂間町';
GSI.MUNI_ARRAY["1555"] = '1,北海道,1555,遠軽町';
GSI.MUNI_ARRAY["1559"] = '1,北海道,1559,湧別町';
GSI.MUNI_ARRAY["1560"] = '1,北海道,1560,滝上町';
GSI.MUNI_ARRAY["1561"] = '1,北海道,1561,興部町';
GSI.MUNI_ARRAY["1562"] = '1,北海道,1562,西興部村';
GSI.MUNI_ARRAY["1563"] = '1,北海道,1563,雄武町';
GSI.MUNI_ARRAY["1564"] = '1,北海道,1564,大空町';
GSI.MUNI_ARRAY["1571"] = '1,北海道,1571,豊浦町';
GSI.MUNI_ARRAY["1575"] = '1,北海道,1575,壮瞥町';
GSI.MUNI_ARRAY["1578"] = '1,北海道,1578,白老町';
GSI.MUNI_ARRAY["1581"] = '1,北海道,1581,厚真町';
GSI.MUNI_ARRAY["1584"] = '1,北海道,1584,洞爺湖町';
GSI.MUNI_ARRAY["1585"] = '1,北海道,1585,安平町';
GSI.MUNI_ARRAY["1586"] = '1,北海道,1586,むかわ町';
GSI.MUNI_ARRAY["1601"] = '1,北海道,1601,日高町';
GSI.MUNI_ARRAY["1602"] = '1,北海道,1602,平取町';
GSI.MUNI_ARRAY["1604"] = '1,北海道,1604,新冠町';
GSI.MUNI_ARRAY["1607"] = '1,北海道,1607,浦河町';
GSI.MUNI_ARRAY["1608"] = '1,北海道,1608,様似町';
GSI.MUNI_ARRAY["1609"] = '1,北海道,1609,えりも町';
GSI.MUNI_ARRAY["1610"] = '1,北海道,1610,新ひだか町';
GSI.MUNI_ARRAY["1631"] = '1,北海道,1631,音更町';
GSI.MUNI_ARRAY["1632"] = '1,北海道,1632,士幌町';
GSI.MUNI_ARRAY["1633"] = '1,北海道,1633,上士幌町';
GSI.MUNI_ARRAY["1634"] = '1,北海道,1634,鹿追町';
GSI.MUNI_ARRAY["1635"] = '1,北海道,1635,新得町';
GSI.MUNI_ARRAY["1636"] = '1,北海道,1636,清水町';
GSI.MUNI_ARRAY["1637"] = '1,北海道,1637,芽室町';
GSI.MUNI_ARRAY["1638"] = '1,北海道,1638,中札内村';
GSI.MUNI_ARRAY["1639"] = '1,北海道,1639,更別村';
GSI.MUNI_ARRAY["1641"] = '1,北海道,1641,大樹町';
GSI.MUNI_ARRAY["1642"] = '1,北海道,1642,広尾町';
GSI.MUNI_ARRAY["1643"] = '1,北海道,1643,幕別町';
GSI.MUNI_ARRAY["1644"] = '1,北海道,1644,池田町';
GSI.MUNI_ARRAY["1645"] = '1,北海道,1645,豊頃町';
GSI.MUNI_ARRAY["1646"] = '1,北海道,1646,本別町';
GSI.MUNI_ARRAY["1647"] = '1,北海道,1647,足寄町';
GSI.MUNI_ARRAY["1648"] = '1,北海道,1648,陸別町';
GSI.MUNI_ARRAY["1649"] = '1,北海道,1649,浦幌町';
GSI.MUNI_ARRAY["1661"] = '1,北海道,1661,釧路町';
GSI.MUNI_ARRAY["1662"] = '1,北海道,1662,厚岸町';
GSI.MUNI_ARRAY["1663"] = '1,北海道,1663,浜中町';
GSI.MUNI_ARRAY["1664"] = '1,北海道,1664,標茶町';
GSI.MUNI_ARRAY["1665"] = '1,北海道,1665,弟子屈町';
GSI.MUNI_ARRAY["1667"] = '1,北海道,1667,鶴居村';
GSI.MUNI_ARRAY["1668"] = '1,北海道,1668,白糠町';
GSI.MUNI_ARRAY["1691"] = '1,北海道,1691,別海町';
GSI.MUNI_ARRAY["1692"] = '1,北海道,1692,中標津町';
GSI.MUNI_ARRAY["1693"] = '1,北海道,1693,標津町';
GSI.MUNI_ARRAY["1694"] = '1,北海道,1694,羅臼町';
GSI.MUNI_ARRAY["1695"] = '1,北海道,1695,色丹村';
GSI.MUNI_ARRAY["1696"] = '1,北海道,1696,泊村';
GSI.MUNI_ARRAY["1697"] = '1,北海道,1697,留夜別村';
GSI.MUNI_ARRAY["1698"] = '1,北海道,1698,留別村';
GSI.MUNI_ARRAY["1699"] = '1,北海道,1699,紗那村';
GSI.MUNI_ARRAY["1700"] = '1,北海道,1700,蘂取村';
GSI.MUNI_ARRAY["2201"] = '2,青森県,2201,青森市';
GSI.MUNI_ARRAY["2202"] = '2,青森県,2202,弘前市';
GSI.MUNI_ARRAY["2203"] = '2,青森県,2203,八戸市';
GSI.MUNI_ARRAY["2204"] = '2,青森県,2204,黒石市';
GSI.MUNI_ARRAY["2205"] = '2,青森県,2205,五所川原市';
GSI.MUNI_ARRAY["2206"] = '2,青森県,2206,十和田市';
GSI.MUNI_ARRAY["2207"] = '2,青森県,2207,三沢市';
GSI.MUNI_ARRAY["2208"] = '2,青森県,2208,むつ市';
GSI.MUNI_ARRAY["2209"] = '2,青森県,2209,つがる市';
GSI.MUNI_ARRAY["2210"] = '2,青森県,2210,平川市';
GSI.MUNI_ARRAY["2301"] = '2,青森県,2301,平内町';
GSI.MUNI_ARRAY["2303"] = '2,青森県,2303,今別町';
GSI.MUNI_ARRAY["2304"] = '2,青森県,2304,蓬田村';
GSI.MUNI_ARRAY["2307"] = '2,青森県,2307,外ヶ浜町';
GSI.MUNI_ARRAY["2321"] = '2,青森県,2321,鰺ヶ沢町';
GSI.MUNI_ARRAY["2323"] = '2,青森県,2323,深浦町';
GSI.MUNI_ARRAY["2343"] = '2,青森県,2343,西目屋村';
GSI.MUNI_ARRAY["2361"] = '2,青森県,2361,藤崎町';
GSI.MUNI_ARRAY["2362"] = '2,青森県,2362,大鰐町';
GSI.MUNI_ARRAY["2367"] = '2,青森県,2367,田舎館村';
GSI.MUNI_ARRAY["2381"] = '2,青森県,2381,板柳町';
GSI.MUNI_ARRAY["2384"] = '2,青森県,2384,鶴田町';
GSI.MUNI_ARRAY["2387"] = '2,青森県,2387,中泊町';
GSI.MUNI_ARRAY["2401"] = '2,青森県,2401,野辺地町';
GSI.MUNI_ARRAY["2402"] = '2,青森県,2402,七戸町';
GSI.MUNI_ARRAY["2405"] = '2,青森県,2405,六戸町';
GSI.MUNI_ARRAY["2406"] = '2,青森県,2406,横浜町';
GSI.MUNI_ARRAY["2408"] = '2,青森県,2408,東北町';
GSI.MUNI_ARRAY["2411"] = '2,青森県,2411,六ヶ所村';
GSI.MUNI_ARRAY["2412"] = '2,青森県,2412,おいらせ町';
GSI.MUNI_ARRAY["2423"] = '2,青森県,2423,大間町';
GSI.MUNI_ARRAY["2424"] = '2,青森県,2424,東通村';
GSI.MUNI_ARRAY["2425"] = '2,青森県,2425,風間浦村';
GSI.MUNI_ARRAY["2426"] = '2,青森県,2426,佐井村';
GSI.MUNI_ARRAY["2441"] = '2,青森県,2441,三戸町';
GSI.MUNI_ARRAY["2442"] = '2,青森県,2442,五戸町';
GSI.MUNI_ARRAY["2443"] = '2,青森県,2443,田子町';
GSI.MUNI_ARRAY["2445"] = '2,青森県,2445,南部町';
GSI.MUNI_ARRAY["2446"] = '2,青森県,2446,階上町';
GSI.MUNI_ARRAY["2450"] = '2,青森県,2450,新郷村';
GSI.MUNI_ARRAY["3201"] = '3,岩手県,3201,盛岡市';
GSI.MUNI_ARRAY["3202"] = '3,岩手県,3202,宮古市';
GSI.MUNI_ARRAY["3203"] = '3,岩手県,3203,大船渡市';
GSI.MUNI_ARRAY["3205"] = '3,岩手県,3205,花巻市';
GSI.MUNI_ARRAY["3206"] = '3,岩手県,3206,北上市';
GSI.MUNI_ARRAY["3207"] = '3,岩手県,3207,久慈市';
GSI.MUNI_ARRAY["3208"] = '3,岩手県,3208,遠野市';
GSI.MUNI_ARRAY["3209"] = '3,岩手県,3209,一関市';
GSI.MUNI_ARRAY["3210"] = '3,岩手県,3210,陸前高田市';
GSI.MUNI_ARRAY["3211"] = '3,岩手県,3211,釜石市';
GSI.MUNI_ARRAY["3213"] = '3,岩手県,3213,二戸市';
GSI.MUNI_ARRAY["3214"] = '3,岩手県,3214,八幡平市';
GSI.MUNI_ARRAY["3215"] = '3,岩手県,3215,奥州市';
GSI.MUNI_ARRAY["3216"] = '3,岩手県,3216,滝沢市';
GSI.MUNI_ARRAY["3301"] = '3,岩手県,3301,雫石町';
GSI.MUNI_ARRAY["3302"] = '3,岩手県,3302,葛巻町';
GSI.MUNI_ARRAY["3303"] = '3,岩手県,3303,岩手町';
GSI.MUNI_ARRAY["3321"] = '3,岩手県,3321,紫波町';
GSI.MUNI_ARRAY["3322"] = '3,岩手県,3322,矢巾町';
GSI.MUNI_ARRAY["3366"] = '3,岩手県,3366,西和賀町';
GSI.MUNI_ARRAY["3381"] = '3,岩手県,3381,金ケ崎町';
GSI.MUNI_ARRAY["3402"] = '3,岩手県,3402,平泉町';
GSI.MUNI_ARRAY["3441"] = '3,岩手県,3441,住田町';
GSI.MUNI_ARRAY["3461"] = '3,岩手県,3461,大槌町';
GSI.MUNI_ARRAY["3482"] = '3,岩手県,3482,山田町';
GSI.MUNI_ARRAY["3483"] = '3,岩手県,3483,岩泉町';
GSI.MUNI_ARRAY["3484"] = '3,岩手県,3484,田野畑村';
GSI.MUNI_ARRAY["3485"] = '3,岩手県,3485,普代村';
GSI.MUNI_ARRAY["3501"] = '3,岩手県,3501,軽米町';
GSI.MUNI_ARRAY["3503"] = '3,岩手県,3503,野田村';
GSI.MUNI_ARRAY["3506"] = '3,岩手県,3506,九戸村';
GSI.MUNI_ARRAY["3507"] = '3,岩手県,3507,洋野町';
GSI.MUNI_ARRAY["3524"] = '3,岩手県,3524,一戸町';
GSI.MUNI_ARRAY["4100"] = '4,宮城県,4100,仙台市';
GSI.MUNI_ARRAY["4101"] = '4,宮城県,4101,仙台市　青葉区';
GSI.MUNI_ARRAY["4102"] = '4,宮城県,4102,仙台市　宮城野区';
GSI.MUNI_ARRAY["4103"] = '4,宮城県,4103,仙台市　若林区';
GSI.MUNI_ARRAY["4104"] = '4,宮城県,4104,仙台市　太白区';
GSI.MUNI_ARRAY["4105"] = '4,宮城県,4105,仙台市　泉区';
GSI.MUNI_ARRAY["4202"] = '4,宮城県,4202,石巻市';
GSI.MUNI_ARRAY["4203"] = '4,宮城県,4203,塩竈市';
GSI.MUNI_ARRAY["4205"] = '4,宮城県,4205,気仙沼市';
GSI.MUNI_ARRAY["4206"] = '4,宮城県,4206,白石市';
GSI.MUNI_ARRAY["4207"] = '4,宮城県,4207,名取市';
GSI.MUNI_ARRAY["4208"] = '4,宮城県,4208,角田市';
GSI.MUNI_ARRAY["4209"] = '4,宮城県,4209,多賀城市';
GSI.MUNI_ARRAY["4211"] = '4,宮城県,4211,岩沼市';
GSI.MUNI_ARRAY["4212"] = '4,宮城県,4212,登米市';
GSI.MUNI_ARRAY["4213"] = '4,宮城県,4213,栗原市';
GSI.MUNI_ARRAY["4214"] = '4,宮城県,4214,東松島市';
GSI.MUNI_ARRAY["4215"] = '4,宮城県,4215,大崎市';
GSI.MUNI_ARRAY["4216"] = '4,宮城県,4216,富谷市';
GSI.MUNI_ARRAY["4301"] = '4,宮城県,4301,蔵王町';
GSI.MUNI_ARRAY["4302"] = '4,宮城県,4302,七ケ宿町';
GSI.MUNI_ARRAY["4321"] = '4,宮城県,4321,大河原町';
GSI.MUNI_ARRAY["4322"] = '4,宮城県,4322,村田町';
GSI.MUNI_ARRAY["4323"] = '4,宮城県,4323,柴田町';
GSI.MUNI_ARRAY["4324"] = '4,宮城県,4324,川崎町';
GSI.MUNI_ARRAY["4341"] = '4,宮城県,4341,丸森町';
GSI.MUNI_ARRAY["4361"] = '4,宮城県,4361,亘理町';
GSI.MUNI_ARRAY["4362"] = '4,宮城県,4362,山元町';
GSI.MUNI_ARRAY["4401"] = '4,宮城県,4401,松島町';
GSI.MUNI_ARRAY["4404"] = '4,宮城県,4404,七ヶ浜町';
GSI.MUNI_ARRAY["4406"] = '4,宮城県,4406,利府町';
GSI.MUNI_ARRAY["4421"] = '4,宮城県,4421,大和町';
GSI.MUNI_ARRAY["4422"] = '4,宮城県,4422,大郷町';
GSI.MUNI_ARRAY["4423"] = '4,宮城県,4423,富谷市';
GSI.MUNI_ARRAY["4424"] = '4,宮城県,4424,大衡村';
GSI.MUNI_ARRAY["4444"] = '4,宮城県,4444,色麻町';
GSI.MUNI_ARRAY["4445"] = '4,宮城県,4445,加美町';
GSI.MUNI_ARRAY["4501"] = '4,宮城県,4501,涌谷町';
GSI.MUNI_ARRAY["4505"] = '4,宮城県,4505,美里町';
GSI.MUNI_ARRAY["4581"] = '4,宮城県,4581,女川町';
GSI.MUNI_ARRAY["4606"] = '4,宮城県,4606,南三陸町';
GSI.MUNI_ARRAY["5201"] = '5,秋田県,5201,秋田市';
GSI.MUNI_ARRAY["5202"] = '5,秋田県,5202,能代市';
GSI.MUNI_ARRAY["5203"] = '5,秋田県,5203,横手市';
GSI.MUNI_ARRAY["5204"] = '5,秋田県,5204,大館市';
GSI.MUNI_ARRAY["5206"] = '5,秋田県,5206,男鹿市';
GSI.MUNI_ARRAY["5207"] = '5,秋田県,5207,湯沢市';
GSI.MUNI_ARRAY["5209"] = '5,秋田県,5209,鹿角市';
GSI.MUNI_ARRAY["5210"] = '5,秋田県,5210,由利本荘市';
GSI.MUNI_ARRAY["5211"] = '5,秋田県,5211,潟上市';
GSI.MUNI_ARRAY["5212"] = '5,秋田県,5212,大仙市';
GSI.MUNI_ARRAY["5213"] = '5,秋田県,5213,北秋田市';
GSI.MUNI_ARRAY["5214"] = '5,秋田県,5214,にかほ市';
GSI.MUNI_ARRAY["5215"] = '5,秋田県,5215,仙北市';
GSI.MUNI_ARRAY["5303"] = '5,秋田県,5303,小坂町';
GSI.MUNI_ARRAY["5327"] = '5,秋田県,5327,上小阿仁村';
GSI.MUNI_ARRAY["5346"] = '5,秋田県,5346,藤里町';
GSI.MUNI_ARRAY["5348"] = '5,秋田県,5348,三種町';
GSI.MUNI_ARRAY["5349"] = '5,秋田県,5349,八峰町';
GSI.MUNI_ARRAY["5361"] = '5,秋田県,5361,五城目町';
GSI.MUNI_ARRAY["5363"] = '5,秋田県,5363,八郎潟町';
GSI.MUNI_ARRAY["5366"] = '5,秋田県,5366,井川町';
GSI.MUNI_ARRAY["5368"] = '5,秋田県,5368,大潟村';
GSI.MUNI_ARRAY["5434"] = '5,秋田県,5434,美郷町';
GSI.MUNI_ARRAY["5463"] = '5,秋田県,5463,羽後町';
GSI.MUNI_ARRAY["5464"] = '5,秋田県,5464,東成瀬村';
GSI.MUNI_ARRAY["6201"] = '6,山形県,6201,山形市';
GSI.MUNI_ARRAY["6202"] = '6,山形県,6202,米沢市';
GSI.MUNI_ARRAY["6203"] = '6,山形県,6203,鶴岡市';
GSI.MUNI_ARRAY["6204"] = '6,山形県,6204,酒田市';
GSI.MUNI_ARRAY["6205"] = '6,山形県,6205,新庄市';
GSI.MUNI_ARRAY["6206"] = '6,山形県,6206,寒河江市';
GSI.MUNI_ARRAY["6207"] = '6,山形県,6207,上山市';
GSI.MUNI_ARRAY["6208"] = '6,山形県,6208,村山市';
GSI.MUNI_ARRAY["6209"] = '6,山形県,6209,長井市';
GSI.MUNI_ARRAY["6210"] = '6,山形県,6210,天童市';
GSI.MUNI_ARRAY["6211"] = '6,山形県,6211,東根市';
GSI.MUNI_ARRAY["6212"] = '6,山形県,6212,尾花沢市';
GSI.MUNI_ARRAY["6213"] = '6,山形県,6213,南陽市';
GSI.MUNI_ARRAY["6301"] = '6,山形県,6301,山辺町';
GSI.MUNI_ARRAY["6302"] = '6,山形県,6302,中山町';
GSI.MUNI_ARRAY["6321"] = '6,山形県,6321,河北町';
GSI.MUNI_ARRAY["6322"] = '6,山形県,6322,西川町';
GSI.MUNI_ARRAY["6323"] = '6,山形県,6323,朝日町';
GSI.MUNI_ARRAY["6324"] = '6,山形県,6324,大江町';
GSI.MUNI_ARRAY["6341"] = '6,山形県,6341,大石田町';
GSI.MUNI_ARRAY["6361"] = '6,山形県,6361,金山町';
GSI.MUNI_ARRAY["6362"] = '6,山形県,6362,最上町';
GSI.MUNI_ARRAY["6363"] = '6,山形県,6363,舟形町';
GSI.MUNI_ARRAY["6364"] = '6,山形県,6364,真室川町';
GSI.MUNI_ARRAY["6365"] = '6,山形県,6365,大蔵村';
GSI.MUNI_ARRAY["6366"] = '6,山形県,6366,鮭川村';
GSI.MUNI_ARRAY["6367"] = '6,山形県,6367,戸沢村';
GSI.MUNI_ARRAY["6381"] = '6,山形県,6381,高畠町';
GSI.MUNI_ARRAY["6382"] = '6,山形県,6382,川西町';
GSI.MUNI_ARRAY["6401"] = '6,山形県,6401,小国町';
GSI.MUNI_ARRAY["6402"] = '6,山形県,6402,白鷹町';
GSI.MUNI_ARRAY["6403"] = '6,山形県,6403,飯豊町';
GSI.MUNI_ARRAY["6426"] = '6,山形県,6426,三川町';
GSI.MUNI_ARRAY["6428"] = '6,山形県,6428,庄内町';
GSI.MUNI_ARRAY["6461"] = '6,山形県,6461,遊佐町';
GSI.MUNI_ARRAY["7201"] = '7,福島県,7201,福島市';
GSI.MUNI_ARRAY["7202"] = '7,福島県,7202,会津若松市';
GSI.MUNI_ARRAY["7203"] = '7,福島県,7203,郡山市';
GSI.MUNI_ARRAY["7204"] = '7,福島県,7204,いわき市';
GSI.MUNI_ARRAY["7205"] = '7,福島県,7205,白河市';
GSI.MUNI_ARRAY["7207"] = '7,福島県,7207,須賀川市';
GSI.MUNI_ARRAY["7208"] = '7,福島県,7208,喜多方市';
GSI.MUNI_ARRAY["7209"] = '7,福島県,7209,相馬市';
GSI.MUNI_ARRAY["7210"] = '7,福島県,7210,二本松市';
GSI.MUNI_ARRAY["7211"] = '7,福島県,7211,田村市';
GSI.MUNI_ARRAY["7212"] = '7,福島県,7212,南相馬市';
GSI.MUNI_ARRAY["7213"] = '7,福島県,7213,伊達市';
GSI.MUNI_ARRAY["7214"] = '7,福島県,7214,本宮市';
GSI.MUNI_ARRAY["7301"] = '7,福島県,7301,桑折町';
GSI.MUNI_ARRAY["7303"] = '7,福島県,7303,国見町';
GSI.MUNI_ARRAY["7308"] = '7,福島県,7308,川俣町';
GSI.MUNI_ARRAY["7322"] = '7,福島県,7322,大玉村';
GSI.MUNI_ARRAY["7342"] = '7,福島県,7342,鏡石町';
GSI.MUNI_ARRAY["7344"] = '7,福島県,7344,天栄村';
GSI.MUNI_ARRAY["7362"] = '7,福島県,7362,下郷町';
GSI.MUNI_ARRAY["7364"] = '7,福島県,7364,檜枝岐村';
GSI.MUNI_ARRAY["7367"] = '7,福島県,7367,只見町';
GSI.MUNI_ARRAY["7368"] = '7,福島県,7368,南会津町';
GSI.MUNI_ARRAY["7402"] = '7,福島県,7402,北塩原村';
GSI.MUNI_ARRAY["7405"] = '7,福島県,7405,西会津町';
GSI.MUNI_ARRAY["7407"] = '7,福島県,7407,磐梯町';
GSI.MUNI_ARRAY["7408"] = '7,福島県,7408,猪苗代町';
GSI.MUNI_ARRAY["7421"] = '7,福島県,7421,会津坂下町';
GSI.MUNI_ARRAY["7422"] = '7,福島県,7422,湯川村';
GSI.MUNI_ARRAY["7423"] = '7,福島県,7423,柳津町';
GSI.MUNI_ARRAY["7444"] = '7,福島県,7444,三島町';
GSI.MUNI_ARRAY["7445"] = '7,福島県,7445,金山町';
GSI.MUNI_ARRAY["7446"] = '7,福島県,7446,昭和村';
GSI.MUNI_ARRAY["7447"] = '7,福島県,7447,会津美里町';
GSI.MUNI_ARRAY["7461"] = '7,福島県,7461,西郷村';
GSI.MUNI_ARRAY["7464"] = '7,福島県,7464,泉崎村';
GSI.MUNI_ARRAY["7465"] = '7,福島県,7465,中島村';
GSI.MUNI_ARRAY["7466"] = '7,福島県,7466,矢吹町';
GSI.MUNI_ARRAY["7481"] = '7,福島県,7481,棚倉町';
GSI.MUNI_ARRAY["7482"] = '7,福島県,7482,矢祭町';
GSI.MUNI_ARRAY["7483"] = '7,福島県,7483,塙町';
GSI.MUNI_ARRAY["7484"] = '7,福島県,7484,鮫川村';
GSI.MUNI_ARRAY["7501"] = '7,福島県,7501,石川町';
GSI.MUNI_ARRAY["7502"] = '7,福島県,7502,玉川村';
GSI.MUNI_ARRAY["7503"] = '7,福島県,7503,平田村';
GSI.MUNI_ARRAY["7504"] = '7,福島県,7504,浅川町';
GSI.MUNI_ARRAY["7505"] = '7,福島県,7505,古殿町';
GSI.MUNI_ARRAY["7521"] = '7,福島県,7521,三春町';
GSI.MUNI_ARRAY["7522"] = '7,福島県,7522,小野町';
GSI.MUNI_ARRAY["7541"] = '7,福島県,7541,広野町';
GSI.MUNI_ARRAY["7542"] = '7,福島県,7542,楢葉町';
GSI.MUNI_ARRAY["7543"] = '7,福島県,7543,富岡町';
GSI.MUNI_ARRAY["7544"] = '7,福島県,7544,川内村';
GSI.MUNI_ARRAY["7545"] = '7,福島県,7545,大熊町';
GSI.MUNI_ARRAY["7546"] = '7,福島県,7546,双葉町';
GSI.MUNI_ARRAY["7547"] = '7,福島県,7547,浪江町';
GSI.MUNI_ARRAY["7548"] = '7,福島県,7548,葛尾村';
GSI.MUNI_ARRAY["7561"] = '7,福島県,7561,新地町';
GSI.MUNI_ARRAY["7564"] = '7,福島県,7564,飯舘村';
GSI.MUNI_ARRAY["8201"] = '8,茨城県,8201,水戸市';
GSI.MUNI_ARRAY["8202"] = '8,茨城県,8202,日立市';
GSI.MUNI_ARRAY["8203"] = '8,茨城県,8203,土浦市';
GSI.MUNI_ARRAY["8204"] = '8,茨城県,8204,古河市';
GSI.MUNI_ARRAY["8205"] = '8,茨城県,8205,石岡市';
GSI.MUNI_ARRAY["8207"] = '8,茨城県,8207,結城市';
GSI.MUNI_ARRAY["8208"] = '8,茨城県,8208,龍ケ崎市';
GSI.MUNI_ARRAY["8210"] = '8,茨城県,8210,下妻市';
GSI.MUNI_ARRAY["8211"] = '8,茨城県,8211,常総市';
GSI.MUNI_ARRAY["8212"] = '8,茨城県,8212,常陸太田市';
GSI.MUNI_ARRAY["8214"] = '8,茨城県,8214,高萩市';
GSI.MUNI_ARRAY["8215"] = '8,茨城県,8215,北茨城市';
GSI.MUNI_ARRAY["8216"] = '8,茨城県,8216,笠間市';
GSI.MUNI_ARRAY["8217"] = '8,茨城県,8217,取手市';
GSI.MUNI_ARRAY["8219"] = '8,茨城県,8219,牛久市';
GSI.MUNI_ARRAY["8220"] = '8,茨城県,8220,つくば市';
GSI.MUNI_ARRAY["8221"] = '8,茨城県,8221,ひたちなか市';
GSI.MUNI_ARRAY["8222"] = '8,茨城県,8222,鹿嶋市';
GSI.MUNI_ARRAY["8223"] = '8,茨城県,8223,潮来市';
GSI.MUNI_ARRAY["8224"] = '8,茨城県,8224,守谷市';
GSI.MUNI_ARRAY["8225"] = '8,茨城県,8225,常陸大宮市';
GSI.MUNI_ARRAY["8226"] = '8,茨城県,8226,那珂市';
GSI.MUNI_ARRAY["8227"] = '8,茨城県,8227,筑西市';
GSI.MUNI_ARRAY["8228"] = '8,茨城県,8228,坂東市';
GSI.MUNI_ARRAY["8229"] = '8,茨城県,8229,稲敷市';
GSI.MUNI_ARRAY["8230"] = '8,茨城県,8230,かすみがうら市';
GSI.MUNI_ARRAY["8231"] = '8,茨城県,8231,桜川市';
GSI.MUNI_ARRAY["8232"] = '8,茨城県,8232,神栖市';
GSI.MUNI_ARRAY["8233"] = '8,茨城県,8233,行方市';
GSI.MUNI_ARRAY["8234"] = '8,茨城県,8234,鉾田市';
GSI.MUNI_ARRAY["8235"] = '8,茨城県,8235,つくばみらい市';
GSI.MUNI_ARRAY["8236"] = '8,茨城県,8236,小美玉市';
GSI.MUNI_ARRAY["8302"] = '8,茨城県,8302,茨城町';
GSI.MUNI_ARRAY["8309"] = '8,茨城県,8309,大洗町';
GSI.MUNI_ARRAY["8310"] = '8,茨城県,8310,城里町';
GSI.MUNI_ARRAY["8341"] = '8,茨城県,8341,東海村';
GSI.MUNI_ARRAY["8364"] = '8,茨城県,8364,大子町';
GSI.MUNI_ARRAY["8442"] = '8,茨城県,8442,美浦村';
GSI.MUNI_ARRAY["8443"] = '8,茨城県,8443,阿見町';
GSI.MUNI_ARRAY["8447"] = '8,茨城県,8447,河内町';
GSI.MUNI_ARRAY["8521"] = '8,茨城県,8521,八千代町';
GSI.MUNI_ARRAY["8542"] = '8,茨城県,8542,五霞町';
GSI.MUNI_ARRAY["8546"] = '8,茨城県,8546,境町';
GSI.MUNI_ARRAY["8564"] = '8,茨城県,8564,利根町';
GSI.MUNI_ARRAY["9201"] = '9,栃木県,9201,宇都宮市';
GSI.MUNI_ARRAY["9202"] = '9,栃木県,9202,足利市';
GSI.MUNI_ARRAY["9203"] = '9,栃木県,9203,栃木市';
GSI.MUNI_ARRAY["9204"] = '9,栃木県,9204,佐野市';
GSI.MUNI_ARRAY["9205"] = '9,栃木県,9205,鹿沼市';
GSI.MUNI_ARRAY["9206"] = '9,栃木県,9206,日光市';
GSI.MUNI_ARRAY["9208"] = '9,栃木県,9208,小山市';
GSI.MUNI_ARRAY["9209"] = '9,栃木県,9209,真岡市';
GSI.MUNI_ARRAY["9210"] = '9,栃木県,9210,大田原市';
GSI.MUNI_ARRAY["9211"] = '9,栃木県,9211,矢板市';
GSI.MUNI_ARRAY["9213"] = '9,栃木県,9213,那須塩原市';
GSI.MUNI_ARRAY["9214"] = '9,栃木県,9214,さくら市';
GSI.MUNI_ARRAY["9215"] = '9,栃木県,9215,那須烏山市';
GSI.MUNI_ARRAY["9216"] = '9,栃木県,9216,下野市';
GSI.MUNI_ARRAY["9301"] = '9,栃木県,9301,上三川町';
GSI.MUNI_ARRAY["9342"] = '9,栃木県,9342,益子町';
GSI.MUNI_ARRAY["9343"] = '9,栃木県,9343,茂木町';
GSI.MUNI_ARRAY["9344"] = '9,栃木県,9344,市貝町';
GSI.MUNI_ARRAY["9345"] = '9,栃木県,9345,芳賀町';
GSI.MUNI_ARRAY["9361"] = '9,栃木県,9361,壬生町';
GSI.MUNI_ARRAY["9364"] = '9,栃木県,9364,野木町';
GSI.MUNI_ARRAY["9384"] = '9,栃木県,9384,塩谷町';
GSI.MUNI_ARRAY["9386"] = '9,栃木県,9386,高根沢町';
GSI.MUNI_ARRAY["9407"] = '9,栃木県,9407,那須町';
GSI.MUNI_ARRAY["9411"] = '9,栃木県,9411,那珂川町';
GSI.MUNI_ARRAY["10201"] = '10,群馬県,10201,前橋市';
GSI.MUNI_ARRAY["10202"] = '10,群馬県,10202,高崎市';
GSI.MUNI_ARRAY["10203"] = '10,群馬県,10203,桐生市';
GSI.MUNI_ARRAY["10204"] = '10,群馬県,10204,伊勢崎市';
GSI.MUNI_ARRAY["10205"] = '10,群馬県,10205,太田市';
GSI.MUNI_ARRAY["10206"] = '10,群馬県,10206,沼田市';
GSI.MUNI_ARRAY["10207"] = '10,群馬県,10207,館林市';
GSI.MUNI_ARRAY["10208"] = '10,群馬県,10208,渋川市';
GSI.MUNI_ARRAY["10209"] = '10,群馬県,10209,藤岡市';
GSI.MUNI_ARRAY["10210"] = '10,群馬県,10210,富岡市';
GSI.MUNI_ARRAY["10211"] = '10,群馬県,10211,安中市';
GSI.MUNI_ARRAY["10212"] = '10,群馬県,10212,みどり市';
GSI.MUNI_ARRAY["10344"] = '10,群馬県,10344,榛東村';
GSI.MUNI_ARRAY["10345"] = '10,群馬県,10345,吉岡町';
GSI.MUNI_ARRAY["10366"] = '10,群馬県,10366,上野村';
GSI.MUNI_ARRAY["10367"] = '10,群馬県,10367,神流町';
GSI.MUNI_ARRAY["10382"] = '10,群馬県,10382,下仁田町';
GSI.MUNI_ARRAY["10383"] = '10,群馬県,10383,南牧村';
GSI.MUNI_ARRAY["10384"] = '10,群馬県,10384,甘楽町';
GSI.MUNI_ARRAY["10421"] = '10,群馬県,10421,中之条町';
GSI.MUNI_ARRAY["10424"] = '10,群馬県,10424,長野原町';
GSI.MUNI_ARRAY["10425"] = '10,群馬県,10425,嬬恋村';
GSI.MUNI_ARRAY["10426"] = '10,群馬県,10426,草津町';
GSI.MUNI_ARRAY["10428"] = '10,群馬県,10428,高山村';
GSI.MUNI_ARRAY["10429"] = '10,群馬県,10429,東吾妻町';
GSI.MUNI_ARRAY["10443"] = '10,群馬県,10443,片品村';
GSI.MUNI_ARRAY["10444"] = '10,群馬県,10444,川場村';
GSI.MUNI_ARRAY["10448"] = '10,群馬県,10448,昭和村';
GSI.MUNI_ARRAY["10449"] = '10,群馬県,10449,みなかみ町';
GSI.MUNI_ARRAY["10464"] = '10,群馬県,10464,玉村町';
GSI.MUNI_ARRAY["10521"] = '10,群馬県,10521,板倉町';
GSI.MUNI_ARRAY["10522"] = '10,群馬県,10522,明和町';
GSI.MUNI_ARRAY["10523"] = '10,群馬県,10523,千代田町';
GSI.MUNI_ARRAY["10524"] = '10,群馬県,10524,大泉町';
GSI.MUNI_ARRAY["10525"] = '10,群馬県,10525,邑楽町';
GSI.MUNI_ARRAY["11100"] = '11,埼玉県,11100,さいたま市';
GSI.MUNI_ARRAY["11101"] = '11,埼玉県,11101,さいたま市　西区';
GSI.MUNI_ARRAY["11102"] = '11,埼玉県,11102,さいたま市　北区';
GSI.MUNI_ARRAY["11103"] = '11,埼玉県,11103,さいたま市　大宮区';
GSI.MUNI_ARRAY["11104"] = '11,埼玉県,11104,さいたま市　見沼区';
GSI.MUNI_ARRAY["11105"] = '11,埼玉県,11105,さいたま市　中央区';
GSI.MUNI_ARRAY["11106"] = '11,埼玉県,11106,さいたま市　桜区';
GSI.MUNI_ARRAY["11107"] = '11,埼玉県,11107,さいたま市　浦和区';
GSI.MUNI_ARRAY["11108"] = '11,埼玉県,11108,さいたま市　南区';
GSI.MUNI_ARRAY["11109"] = '11,埼玉県,11109,さいたま市　緑区';
GSI.MUNI_ARRAY["11110"] = '11,埼玉県,11110,さいたま市　岩槻区';
GSI.MUNI_ARRAY["11201"] = '11,埼玉県,11201,川越市';
GSI.MUNI_ARRAY["11202"] = '11,埼玉県,11202,熊谷市';
GSI.MUNI_ARRAY["11203"] = '11,埼玉県,11203,川口市';
GSI.MUNI_ARRAY["11206"] = '11,埼玉県,11206,行田市';
GSI.MUNI_ARRAY["11207"] = '11,埼玉県,11207,秩父市';
GSI.MUNI_ARRAY["11208"] = '11,埼玉県,11208,所沢市';
GSI.MUNI_ARRAY["11209"] = '11,埼玉県,11209,飯能市';
GSI.MUNI_ARRAY["11210"] = '11,埼玉県,11210,加須市';
GSI.MUNI_ARRAY["11211"] = '11,埼玉県,11211,本庄市';
GSI.MUNI_ARRAY["11212"] = '11,埼玉県,11212,東松山市';
GSI.MUNI_ARRAY["11214"] = '11,埼玉県,11214,春日部市';
GSI.MUNI_ARRAY["11215"] = '11,埼玉県,11215,狭山市';
GSI.MUNI_ARRAY["11216"] = '11,埼玉県,11216,羽生市';
GSI.MUNI_ARRAY["11217"] = '11,埼玉県,11217,鴻巣市';
GSI.MUNI_ARRAY["11218"] = '11,埼玉県,11218,深谷市';
GSI.MUNI_ARRAY["11219"] = '11,埼玉県,11219,上尾市';
GSI.MUNI_ARRAY["11221"] = '11,埼玉県,11221,草加市';
GSI.MUNI_ARRAY["11222"] = '11,埼玉県,11222,越谷市';
GSI.MUNI_ARRAY["11223"] = '11,埼玉県,11223,蕨市';
GSI.MUNI_ARRAY["11224"] = '11,埼玉県,11224,戸田市';
GSI.MUNI_ARRAY["11225"] = '11,埼玉県,11225,入間市';
GSI.MUNI_ARRAY["11227"] = '11,埼玉県,11227,朝霞市';
GSI.MUNI_ARRAY["11228"] = '11,埼玉県,11228,志木市';
GSI.MUNI_ARRAY["11229"] = '11,埼玉県,11229,和光市';
GSI.MUNI_ARRAY["11230"] = '11,埼玉県,11230,新座市';
GSI.MUNI_ARRAY["11231"] = '11,埼玉県,11231,桶川市';
GSI.MUNI_ARRAY["11232"] = '11,埼玉県,11232,久喜市';
GSI.MUNI_ARRAY["11233"] = '11,埼玉県,11233,北本市';
GSI.MUNI_ARRAY["11234"] = '11,埼玉県,11234,八潮市';
GSI.MUNI_ARRAY["11235"] = '11,埼玉県,11235,富士見市';
GSI.MUNI_ARRAY["11237"] = '11,埼玉県,11237,三郷市';
GSI.MUNI_ARRAY["11238"] = '11,埼玉県,11238,蓮田市';
GSI.MUNI_ARRAY["11239"] = '11,埼玉県,11239,坂戸市';
GSI.MUNI_ARRAY["11240"] = '11,埼玉県,11240,幸手市';
GSI.MUNI_ARRAY["11241"] = '11,埼玉県,11241,鶴ヶ島市';
GSI.MUNI_ARRAY["11242"] = '11,埼玉県,11242,日高市';
GSI.MUNI_ARRAY["11243"] = '11,埼玉県,11243,吉川市';
GSI.MUNI_ARRAY["11245"] = '11,埼玉県,11245,ふじみ野市';
GSI.MUNI_ARRAY["11301"] = '11,埼玉県,11301,伊奈町';
GSI.MUNI_ARRAY["11324"] = '11,埼玉県,11324,三芳町';
GSI.MUNI_ARRAY["11326"] = '11,埼玉県,11326,毛呂山町';
GSI.MUNI_ARRAY["11327"] = '11,埼玉県,11327,越生町';
GSI.MUNI_ARRAY["11341"] = '11,埼玉県,11341,滑川町';
GSI.MUNI_ARRAY["11342"] = '11,埼玉県,11342,嵐山町';
GSI.MUNI_ARRAY["11343"] = '11,埼玉県,11343,小川町';
GSI.MUNI_ARRAY["11346"] = '11,埼玉県,11346,川島町';
GSI.MUNI_ARRAY["11347"] = '11,埼玉県,11347,吉見町';
GSI.MUNI_ARRAY["11348"] = '11,埼玉県,11348,鳩山町';
GSI.MUNI_ARRAY["11349"] = '11,埼玉県,11349,ときがわ町';
GSI.MUNI_ARRAY["11361"] = '11,埼玉県,11361,横瀬町';
GSI.MUNI_ARRAY["11362"] = '11,埼玉県,11362,皆野町';
GSI.MUNI_ARRAY["11363"] = '11,埼玉県,11363,長瀞町';
GSI.MUNI_ARRAY["11365"] = '11,埼玉県,11365,小鹿野町';
GSI.MUNI_ARRAY["11369"] = '11,埼玉県,11369,東秩父村';
GSI.MUNI_ARRAY["11381"] = '11,埼玉県,11381,美里町';
GSI.MUNI_ARRAY["11383"] = '11,埼玉県,11383,神川町';
GSI.MUNI_ARRAY["11385"] = '11,埼玉県,11385,上里町';
GSI.MUNI_ARRAY["11408"] = '11,埼玉県,11408,寄居町';
GSI.MUNI_ARRAY["11442"] = '11,埼玉県,11442,宮代町';
GSI.MUNI_ARRAY["11246"] = '11,埼玉県,11246,白岡市';
GSI.MUNI_ARRAY["11464"] = '11,埼玉県,11464,杉戸町';
GSI.MUNI_ARRAY["11465"] = '11,埼玉県,11465,松伏町';
GSI.MUNI_ARRAY["12100"] = '12,千葉県,12100,千葉市';
GSI.MUNI_ARRAY["12101"] = '12,千葉県,12101,千葉市　中央区';
GSI.MUNI_ARRAY["12102"] = '12,千葉県,12102,千葉市　花見川区';
GSI.MUNI_ARRAY["12103"] = '12,千葉県,12103,千葉市　稲毛区';
GSI.MUNI_ARRAY["12104"] = '12,千葉県,12104,千葉市　若葉区';
GSI.MUNI_ARRAY["12105"] = '12,千葉県,12105,千葉市　緑区';
GSI.MUNI_ARRAY["12106"] = '12,千葉県,12106,千葉市　美浜区';
GSI.MUNI_ARRAY["12202"] = '12,千葉県,12202,銚子市';
GSI.MUNI_ARRAY["12203"] = '12,千葉県,12203,市川市';
GSI.MUNI_ARRAY["12204"] = '12,千葉県,12204,船橋市';
GSI.MUNI_ARRAY["12205"] = '12,千葉県,12205,館山市';
GSI.MUNI_ARRAY["12206"] = '12,千葉県,12206,木更津市';
GSI.MUNI_ARRAY["12207"] = '12,千葉県,12207,松戸市';
GSI.MUNI_ARRAY["12208"] = '12,千葉県,12208,野田市';
GSI.MUNI_ARRAY["12210"] = '12,千葉県,12210,茂原市';
GSI.MUNI_ARRAY["12211"] = '12,千葉県,12211,成田市';
GSI.MUNI_ARRAY["12212"] = '12,千葉県,12212,佐倉市';
GSI.MUNI_ARRAY["12213"] = '12,千葉県,12213,東金市';
GSI.MUNI_ARRAY["12215"] = '12,千葉県,12215,旭市';
GSI.MUNI_ARRAY["12216"] = '12,千葉県,12216,習志野市';
GSI.MUNI_ARRAY["12217"] = '12,千葉県,12217,柏市';
GSI.MUNI_ARRAY["12218"] = '12,千葉県,12218,勝浦市';
GSI.MUNI_ARRAY["12219"] = '12,千葉県,12219,市原市';
GSI.MUNI_ARRAY["12220"] = '12,千葉県,12220,流山市';
GSI.MUNI_ARRAY["12221"] = '12,千葉県,12221,八千代市';
GSI.MUNI_ARRAY["12222"] = '12,千葉県,12222,我孫子市';
GSI.MUNI_ARRAY["12223"] = '12,千葉県,12223,鴨川市';
GSI.MUNI_ARRAY["12224"] = '12,千葉県,12224,鎌ケ谷市';
GSI.MUNI_ARRAY["12225"] = '12,千葉県,12225,君津市';
GSI.MUNI_ARRAY["12226"] = '12,千葉県,12226,富津市';
GSI.MUNI_ARRAY["12227"] = '12,千葉県,12227,浦安市';
GSI.MUNI_ARRAY["12228"] = '12,千葉県,12228,四街道市';
GSI.MUNI_ARRAY["12229"] = '12,千葉県,12229,袖ケ浦市';
GSI.MUNI_ARRAY["12230"] = '12,千葉県,12230,八街市';
GSI.MUNI_ARRAY["12231"] = '12,千葉県,12231,印西市';
GSI.MUNI_ARRAY["12232"] = '12,千葉県,12232,白井市';
GSI.MUNI_ARRAY["12233"] = '12,千葉県,12233,富里市';
GSI.MUNI_ARRAY["12234"] = '12,千葉県,12234,南房総市';
GSI.MUNI_ARRAY["12235"] = '12,千葉県,12235,匝瑳市';
GSI.MUNI_ARRAY["12236"] = '12,千葉県,12236,香取市';
GSI.MUNI_ARRAY["12237"] = '12,千葉県,12237,山武市';
GSI.MUNI_ARRAY["12238"] = '12,千葉県,12238,いすみ市';
GSI.MUNI_ARRAY["12322"] = '12,千葉県,12322,酒々井町';
GSI.MUNI_ARRAY["12329"] = '12,千葉県,12329,栄町';
GSI.MUNI_ARRAY["12342"] = '12,千葉県,12342,神崎町';
GSI.MUNI_ARRAY["12347"] = '12,千葉県,12347,多古町';
GSI.MUNI_ARRAY["12349"] = '12,千葉県,12349,東庄町';
GSI.MUNI_ARRAY["12239"] = '12,千葉県,12239,大網白里市';
GSI.MUNI_ARRAY["12403"] = '12,千葉県,12403,九十九里町';
GSI.MUNI_ARRAY["12409"] = '12,千葉県,12409,芝山町';
GSI.MUNI_ARRAY["12410"] = '12,千葉県,12410,横芝光町';
GSI.MUNI_ARRAY["12421"] = '12,千葉県,12421,一宮町';
GSI.MUNI_ARRAY["12422"] = '12,千葉県,12422,睦沢町';
GSI.MUNI_ARRAY["12423"] = '12,千葉県,12423,長生村';
GSI.MUNI_ARRAY["12424"] = '12,千葉県,12424,白子町';
GSI.MUNI_ARRAY["12426"] = '12,千葉県,12426,長柄町';
GSI.MUNI_ARRAY["12427"] = '12,千葉県,12427,長南町';
GSI.MUNI_ARRAY["12441"] = '12,千葉県,12441,大多喜町';
GSI.MUNI_ARRAY["12443"] = '12,千葉県,12443,御宿町';
GSI.MUNI_ARRAY["12463"] = '12,千葉県,12463,鋸南町';
GSI.MUNI_ARRAY["13101"] = '13,東京都,13101,千代田区';
GSI.MUNI_ARRAY["13102"] = '13,東京都,13102,中央区';
GSI.MUNI_ARRAY["13103"] = '13,東京都,13103,港区';
GSI.MUNI_ARRAY["13104"] = '13,東京都,13104,新宿区';
GSI.MUNI_ARRAY["13105"] = '13,東京都,13105,文京区';
GSI.MUNI_ARRAY["13106"] = '13,東京都,13106,台東区';
GSI.MUNI_ARRAY["13107"] = '13,東京都,13107,墨田区';
GSI.MUNI_ARRAY["13108"] = '13,東京都,13108,江東区';
GSI.MUNI_ARRAY["13109"] = '13,東京都,13109,品川区';
GSI.MUNI_ARRAY["13110"] = '13,東京都,13110,目黒区';
GSI.MUNI_ARRAY["13111"] = '13,東京都,13111,大田区';
GSI.MUNI_ARRAY["13112"] = '13,東京都,13112,世田谷区';
GSI.MUNI_ARRAY["13113"] = '13,東京都,13113,渋谷区';
GSI.MUNI_ARRAY["13114"] = '13,東京都,13114,中野区';
GSI.MUNI_ARRAY["13115"] = '13,東京都,13115,杉並区';
GSI.MUNI_ARRAY["13116"] = '13,東京都,13116,豊島区';
GSI.MUNI_ARRAY["13117"] = '13,東京都,13117,北区';
GSI.MUNI_ARRAY["13118"] = '13,東京都,13118,荒川区';
GSI.MUNI_ARRAY["13119"] = '13,東京都,13119,板橋区';
GSI.MUNI_ARRAY["13120"] = '13,東京都,13120,練馬区';
GSI.MUNI_ARRAY["13121"] = '13,東京都,13121,足立区';
GSI.MUNI_ARRAY["13122"] = '13,東京都,13122,葛飾区';
GSI.MUNI_ARRAY["13123"] = '13,東京都,13123,江戸川区';
GSI.MUNI_ARRAY["13201"] = '13,東京都,13201,八王子市';
GSI.MUNI_ARRAY["13202"] = '13,東京都,13202,立川市';
GSI.MUNI_ARRAY["13203"] = '13,東京都,13203,武蔵野市';
GSI.MUNI_ARRAY["13204"] = '13,東京都,13204,三鷹市';
GSI.MUNI_ARRAY["13205"] = '13,東京都,13205,青梅市';
GSI.MUNI_ARRAY["13206"] = '13,東京都,13206,府中市';
GSI.MUNI_ARRAY["13207"] = '13,東京都,13207,昭島市';
GSI.MUNI_ARRAY["13208"] = '13,東京都,13208,調布市';
GSI.MUNI_ARRAY["13209"] = '13,東京都,13209,町田市';
GSI.MUNI_ARRAY["13210"] = '13,東京都,13210,小金井市';
GSI.MUNI_ARRAY["13211"] = '13,東京都,13211,小平市';
GSI.MUNI_ARRAY["13212"] = '13,東京都,13212,日野市';
GSI.MUNI_ARRAY["13213"] = '13,東京都,13213,東村山市';
GSI.MUNI_ARRAY["13214"] = '13,東京都,13214,国分寺市';
GSI.MUNI_ARRAY["13215"] = '13,東京都,13215,国立市';
GSI.MUNI_ARRAY["13218"] = '13,東京都,13218,福生市';
GSI.MUNI_ARRAY["13219"] = '13,東京都,13219,狛江市';
GSI.MUNI_ARRAY["13220"] = '13,東京都,13220,東大和市';
GSI.MUNI_ARRAY["13221"] = '13,東京都,13221,清瀬市';
GSI.MUNI_ARRAY["13222"] = '13,東京都,13222,東久留米市';
GSI.MUNI_ARRAY["13223"] = '13,東京都,13223,武蔵村山市';
GSI.MUNI_ARRAY["13224"] = '13,東京都,13224,多摩市';
GSI.MUNI_ARRAY["13225"] = '13,東京都,13225,稲城市';
GSI.MUNI_ARRAY["13227"] = '13,東京都,13227,羽村市';
GSI.MUNI_ARRAY["13228"] = '13,東京都,13228,あきる野市';
GSI.MUNI_ARRAY["13229"] = '13,東京都,13229,西東京市';
GSI.MUNI_ARRAY["13303"] = '13,東京都,13303,瑞穂町';
GSI.MUNI_ARRAY["13305"] = '13,東京都,13305,日の出町';
GSI.MUNI_ARRAY["13307"] = '13,東京都,13307,檜原村';
GSI.MUNI_ARRAY["13308"] = '13,東京都,13308,奥多摩町';
GSI.MUNI_ARRAY["13361"] = '13,東京都,13361,大島町';
GSI.MUNI_ARRAY["13362"] = '13,東京都,13362,利島村';
GSI.MUNI_ARRAY["13363"] = '13,東京都,13363,新島村';
GSI.MUNI_ARRAY["13364"] = '13,東京都,13364,神津島村';
GSI.MUNI_ARRAY["13381"] = '13,東京都,13381,三宅村';
GSI.MUNI_ARRAY["13382"] = '13,東京都,13382,御蔵島村';
GSI.MUNI_ARRAY["13401"] = '13,東京都,13401,八丈町';
GSI.MUNI_ARRAY["13402"] = '13,東京都,13402,青ヶ島村';
GSI.MUNI_ARRAY["13421"] = '13,東京都,13421,小笠原村';
GSI.MUNI_ARRAY["14100"] = '14,神奈川県,14100,横浜市';
GSI.MUNI_ARRAY["14101"] = '14,神奈川県,14101,横浜市　鶴見区';
GSI.MUNI_ARRAY["14102"] = '14,神奈川県,14102,横浜市　神奈川区';
GSI.MUNI_ARRAY["14103"] = '14,神奈川県,14103,横浜市　西区';
GSI.MUNI_ARRAY["14104"] = '14,神奈川県,14104,横浜市　中区';
GSI.MUNI_ARRAY["14105"] = '14,神奈川県,14105,横浜市　南区';
GSI.MUNI_ARRAY["14106"] = '14,神奈川県,14106,横浜市　保土ケ谷区';
GSI.MUNI_ARRAY["14107"] = '14,神奈川県,14107,横浜市　磯子区';
GSI.MUNI_ARRAY["14108"] = '14,神奈川県,14108,横浜市　金沢区';
GSI.MUNI_ARRAY["14109"] = '14,神奈川県,14109,横浜市　港北区';
GSI.MUNI_ARRAY["14110"] = '14,神奈川県,14110,横浜市　戸塚区';
GSI.MUNI_ARRAY["14111"] = '14,神奈川県,14111,横浜市　港南区';
GSI.MUNI_ARRAY["14112"] = '14,神奈川県,14112,横浜市　旭区';
GSI.MUNI_ARRAY["14113"] = '14,神奈川県,14113,横浜市　緑区';
GSI.MUNI_ARRAY["14114"] = '14,神奈川県,14114,横浜市　瀬谷区';
GSI.MUNI_ARRAY["14115"] = '14,神奈川県,14115,横浜市　栄区';
GSI.MUNI_ARRAY["14116"] = '14,神奈川県,14116,横浜市　泉区';
GSI.MUNI_ARRAY["14117"] = '14,神奈川県,14117,横浜市　青葉区';
GSI.MUNI_ARRAY["14118"] = '14,神奈川県,14118,横浜市　都筑区';
GSI.MUNI_ARRAY["14130"] = '14,神奈川県,14130,川崎市';
GSI.MUNI_ARRAY["14131"] = '14,神奈川県,14131,川崎市　川崎区';
GSI.MUNI_ARRAY["14132"] = '14,神奈川県,14132,川崎市　幸区';
GSI.MUNI_ARRAY["14133"] = '14,神奈川県,14133,川崎市　中原区';
GSI.MUNI_ARRAY["14134"] = '14,神奈川県,14134,川崎市　高津区';
GSI.MUNI_ARRAY["14135"] = '14,神奈川県,14135,川崎市　多摩区';
GSI.MUNI_ARRAY["14136"] = '14,神奈川県,14136,川崎市　宮前区';
GSI.MUNI_ARRAY["14137"] = '14,神奈川県,14137,川崎市　麻生区';
GSI.MUNI_ARRAY["14150"] = '14,神奈川県,14150,相模原市';
GSI.MUNI_ARRAY["14151"] = '14,神奈川県,14151,相模原市　緑区';
GSI.MUNI_ARRAY["14152"] = '14,神奈川県,14152,相模原市　中央区';
GSI.MUNI_ARRAY["14153"] = '14,神奈川県,14153,相模原市　南区';
GSI.MUNI_ARRAY["14201"] = '14,神奈川県,14201,横須賀市';
GSI.MUNI_ARRAY["14203"] = '14,神奈川県,14203,平塚市';
GSI.MUNI_ARRAY["14204"] = '14,神奈川県,14204,鎌倉市';
GSI.MUNI_ARRAY["14205"] = '14,神奈川県,14205,藤沢市';
GSI.MUNI_ARRAY["14206"] = '14,神奈川県,14206,小田原市';
GSI.MUNI_ARRAY["14207"] = '14,神奈川県,14207,茅ヶ崎市';
GSI.MUNI_ARRAY["14208"] = '14,神奈川県,14208,逗子市';
GSI.MUNI_ARRAY["14210"] = '14,神奈川県,14210,三浦市';
GSI.MUNI_ARRAY["14211"] = '14,神奈川県,14211,秦野市';
GSI.MUNI_ARRAY["14212"] = '14,神奈川県,14212,厚木市';
GSI.MUNI_ARRAY["14213"] = '14,神奈川県,14213,大和市';
GSI.MUNI_ARRAY["14214"] = '14,神奈川県,14214,伊勢原市';
GSI.MUNI_ARRAY["14215"] = '14,神奈川県,14215,海老名市';
GSI.MUNI_ARRAY["14216"] = '14,神奈川県,14216,座間市';
GSI.MUNI_ARRAY["14217"] = '14,神奈川県,14217,南足柄市';
GSI.MUNI_ARRAY["14218"] = '14,神奈川県,14218,綾瀬市';
GSI.MUNI_ARRAY["14301"] = '14,神奈川県,14301,葉山町';
GSI.MUNI_ARRAY["14321"] = '14,神奈川県,14321,寒川町';
GSI.MUNI_ARRAY["14341"] = '14,神奈川県,14341,大磯町';
GSI.MUNI_ARRAY["14342"] = '14,神奈川県,14342,二宮町';
GSI.MUNI_ARRAY["14361"] = '14,神奈川県,14361,中井町';
GSI.MUNI_ARRAY["14362"] = '14,神奈川県,14362,大井町';
GSI.MUNI_ARRAY["14363"] = '14,神奈川県,14363,松田町';
GSI.MUNI_ARRAY["14364"] = '14,神奈川県,14364,山北町';
GSI.MUNI_ARRAY["14366"] = '14,神奈川県,14366,開成町';
GSI.MUNI_ARRAY["14382"] = '14,神奈川県,14382,箱根町';
GSI.MUNI_ARRAY["14383"] = '14,神奈川県,14383,真鶴町';
GSI.MUNI_ARRAY["14384"] = '14,神奈川県,14384,湯河原町';
GSI.MUNI_ARRAY["14401"] = '14,神奈川県,14401,愛川町';
GSI.MUNI_ARRAY["14402"] = '14,神奈川県,14402,清川村';
GSI.MUNI_ARRAY["15100"] = '15,新潟県,15100,新潟市';
GSI.MUNI_ARRAY["15101"] = '15,新潟県,15101,新潟市　北区';
GSI.MUNI_ARRAY["15102"] = '15,新潟県,15102,新潟市　東区';
GSI.MUNI_ARRAY["15103"] = '15,新潟県,15103,新潟市　中央区';
GSI.MUNI_ARRAY["15104"] = '15,新潟県,15104,新潟市　江南区';
GSI.MUNI_ARRAY["15105"] = '15,新潟県,15105,新潟市　秋葉区';
GSI.MUNI_ARRAY["15106"] = '15,新潟県,15106,新潟市　南区';
GSI.MUNI_ARRAY["15107"] = '15,新潟県,15107,新潟市　西区';
GSI.MUNI_ARRAY["15108"] = '15,新潟県,15108,新潟市　西蒲区';
GSI.MUNI_ARRAY["15202"] = '15,新潟県,15202,長岡市';
GSI.MUNI_ARRAY["15204"] = '15,新潟県,15204,三条市';
GSI.MUNI_ARRAY["15205"] = '15,新潟県,15205,柏崎市';
GSI.MUNI_ARRAY["15206"] = '15,新潟県,15206,新発田市';
GSI.MUNI_ARRAY["15208"] = '15,新潟県,15208,小千谷市';
GSI.MUNI_ARRAY["15209"] = '15,新潟県,15209,加茂市';
GSI.MUNI_ARRAY["15210"] = '15,新潟県,15210,十日町市';
GSI.MUNI_ARRAY["15211"] = '15,新潟県,15211,見附市';
GSI.MUNI_ARRAY["15212"] = '15,新潟県,15212,村上市';
GSI.MUNI_ARRAY["15213"] = '15,新潟県,15213,燕市';
GSI.MUNI_ARRAY["15216"] = '15,新潟県,15216,糸魚川市';
GSI.MUNI_ARRAY["15217"] = '15,新潟県,15217,妙高市';
GSI.MUNI_ARRAY["15218"] = '15,新潟県,15218,五泉市';
GSI.MUNI_ARRAY["15222"] = '15,新潟県,15222,上越市';
GSI.MUNI_ARRAY["15223"] = '15,新潟県,15223,阿賀野市';
GSI.MUNI_ARRAY["15224"] = '15,新潟県,15224,佐渡市';
GSI.MUNI_ARRAY["15225"] = '15,新潟県,15225,魚沼市';
GSI.MUNI_ARRAY["15226"] = '15,新潟県,15226,南魚沼市';
GSI.MUNI_ARRAY["15227"] = '15,新潟県,15227,胎内市';
GSI.MUNI_ARRAY["15307"] = '15,新潟県,15307,聖籠町';
GSI.MUNI_ARRAY["15342"] = '15,新潟県,15342,弥彦村';
GSI.MUNI_ARRAY["15361"] = '15,新潟県,15361,田上町';
GSI.MUNI_ARRAY["15385"] = '15,新潟県,15385,阿賀町';
GSI.MUNI_ARRAY["15405"] = '15,新潟県,15405,出雲崎町';
GSI.MUNI_ARRAY["15461"] = '15,新潟県,15461,湯沢町';
GSI.MUNI_ARRAY["15482"] = '15,新潟県,15482,津南町';
GSI.MUNI_ARRAY["15504"] = '15,新潟県,15504,刈羽村';
GSI.MUNI_ARRAY["15581"] = '15,新潟県,15581,関川村';
GSI.MUNI_ARRAY["15586"] = '15,新潟県,15586,粟島浦村';
GSI.MUNI_ARRAY["16201"] = '16,富山県,16201,富山市';
GSI.MUNI_ARRAY["16202"] = '16,富山県,16202,高岡市';
GSI.MUNI_ARRAY["16204"] = '16,富山県,16204,魚津市';
GSI.MUNI_ARRAY["16205"] = '16,富山県,16205,氷見市';
GSI.MUNI_ARRAY["16206"] = '16,富山県,16206,滑川市';
GSI.MUNI_ARRAY["16207"] = '16,富山県,16207,黒部市';
GSI.MUNI_ARRAY["16208"] = '16,富山県,16208,砺波市';
GSI.MUNI_ARRAY["16209"] = '16,富山県,16209,小矢部市';
GSI.MUNI_ARRAY["16210"] = '16,富山県,16210,南砺市';
GSI.MUNI_ARRAY["16211"] = '16,富山県,16211,射水市';
GSI.MUNI_ARRAY["16321"] = '16,富山県,16321,舟橋村';
GSI.MUNI_ARRAY["16322"] = '16,富山県,16322,上市町';
GSI.MUNI_ARRAY["16323"] = '16,富山県,16323,立山町';
GSI.MUNI_ARRAY["16342"] = '16,富山県,16342,入善町';
GSI.MUNI_ARRAY["16343"] = '16,富山県,16343,朝日町';
GSI.MUNI_ARRAY["17201"] = '17,石川県,17201,金沢市';
GSI.MUNI_ARRAY["17202"] = '17,石川県,17202,七尾市';
GSI.MUNI_ARRAY["17203"] = '17,石川県,17203,小松市';
GSI.MUNI_ARRAY["17204"] = '17,石川県,17204,輪島市';
GSI.MUNI_ARRAY["17205"] = '17,石川県,17205,珠洲市';
GSI.MUNI_ARRAY["17206"] = '17,石川県,17206,加賀市';
GSI.MUNI_ARRAY["17207"] = '17,石川県,17207,羽咋市';
GSI.MUNI_ARRAY["17209"] = '17,石川県,17209,かほく市';
GSI.MUNI_ARRAY["17210"] = '17,石川県,17210,白山市';
GSI.MUNI_ARRAY["17211"] = '17,石川県,17211,能美市';
GSI.MUNI_ARRAY["17212"] = '17,石川県,17212,野々市市';
GSI.MUNI_ARRAY["17324"] = '17,石川県,17324,川北町';
GSI.MUNI_ARRAY["17361"] = '17,石川県,17361,津幡町';
GSI.MUNI_ARRAY["17365"] = '17,石川県,17365,内灘町';
GSI.MUNI_ARRAY["17384"] = '17,石川県,17384,志賀町';
GSI.MUNI_ARRAY["17386"] = '17,石川県,17386,宝達志水町';
GSI.MUNI_ARRAY["17407"] = '17,石川県,17407,中能登町';
GSI.MUNI_ARRAY["17461"] = '17,石川県,17461,穴水町';
GSI.MUNI_ARRAY["17463"] = '17,石川県,17463,能登町';
GSI.MUNI_ARRAY["18201"] = '18,福井県,18201,福井市';
GSI.MUNI_ARRAY["18202"] = '18,福井県,18202,敦賀市';
GSI.MUNI_ARRAY["18204"] = '18,福井県,18204,小浜市';
GSI.MUNI_ARRAY["18205"] = '18,福井県,18205,大野市';
GSI.MUNI_ARRAY["18206"] = '18,福井県,18206,勝山市';
GSI.MUNI_ARRAY["18207"] = '18,福井県,18207,鯖江市';
GSI.MUNI_ARRAY["18208"] = '18,福井県,18208,あわら市';
GSI.MUNI_ARRAY["18209"] = '18,福井県,18209,越前市';
GSI.MUNI_ARRAY["18210"] = '18,福井県,18210,坂井市';
GSI.MUNI_ARRAY["18322"] = '18,福井県,18322,永平寺町';
GSI.MUNI_ARRAY["18382"] = '18,福井県,18382,池田町';
GSI.MUNI_ARRAY["18404"] = '18,福井県,18404,南越前町';
GSI.MUNI_ARRAY["18423"] = '18,福井県,18423,越前町';
GSI.MUNI_ARRAY["18442"] = '18,福井県,18442,美浜町';
GSI.MUNI_ARRAY["18481"] = '18,福井県,18481,高浜町';
GSI.MUNI_ARRAY["18483"] = '18,福井県,18483,おおい町';
GSI.MUNI_ARRAY["18501"] = '18,福井県,18501,若狭町';
GSI.MUNI_ARRAY["19201"] = '19,山梨県,19201,甲府市';
GSI.MUNI_ARRAY["19202"] = '19,山梨県,19202,富士吉田市';
GSI.MUNI_ARRAY["19204"] = '19,山梨県,19204,都留市';
GSI.MUNI_ARRAY["19205"] = '19,山梨県,19205,山梨市';
GSI.MUNI_ARRAY["19206"] = '19,山梨県,19206,大月市';
GSI.MUNI_ARRAY["19207"] = '19,山梨県,19207,韮崎市';
GSI.MUNI_ARRAY["19208"] = '19,山梨県,19208,南アルプス市';
GSI.MUNI_ARRAY["19209"] = '19,山梨県,19209,北杜市';
GSI.MUNI_ARRAY["19210"] = '19,山梨県,19210,甲斐市';
GSI.MUNI_ARRAY["19211"] = '19,山梨県,19211,笛吹市';
GSI.MUNI_ARRAY["19212"] = '19,山梨県,19212,上野原市';
GSI.MUNI_ARRAY["19213"] = '19,山梨県,19213,甲州市';
GSI.MUNI_ARRAY["19214"] = '19,山梨県,19214,中央市';
GSI.MUNI_ARRAY["19346"] = '19,山梨県,19346,市川三郷町';
GSI.MUNI_ARRAY["19364"] = '19,山梨県,19364,早川町';
GSI.MUNI_ARRAY["19365"] = '19,山梨県,19365,身延町';
GSI.MUNI_ARRAY["19366"] = '19,山梨県,19366,南部町';
GSI.MUNI_ARRAY["19368"] = '19,山梨県,19368,富士川町';
GSI.MUNI_ARRAY["19384"] = '19,山梨県,19384,昭和町';
GSI.MUNI_ARRAY["19422"] = '19,山梨県,19422,道志村';
GSI.MUNI_ARRAY["19423"] = '19,山梨県,19423,西桂町';
GSI.MUNI_ARRAY["19424"] = '19,山梨県,19424,忍野村';
GSI.MUNI_ARRAY["19425"] = '19,山梨県,19425,山中湖村';
GSI.MUNI_ARRAY["19429"] = '19,山梨県,19429,鳴沢村';
GSI.MUNI_ARRAY["19430"] = '19,山梨県,19430,富士河口湖町';
GSI.MUNI_ARRAY["19442"] = '19,山梨県,19442,小菅村';
GSI.MUNI_ARRAY["19443"] = '19,山梨県,19443,丹波山村';
GSI.MUNI_ARRAY["20201"] = '20,長野県,20201,長野市';
GSI.MUNI_ARRAY["20202"] = '20,長野県,20202,松本市';
GSI.MUNI_ARRAY["20203"] = '20,長野県,20203,上田市';
GSI.MUNI_ARRAY["20204"] = '20,長野県,20204,岡谷市';
GSI.MUNI_ARRAY["20205"] = '20,長野県,20205,飯田市';
GSI.MUNI_ARRAY["20206"] = '20,長野県,20206,諏訪市';
GSI.MUNI_ARRAY["20207"] = '20,長野県,20207,須坂市';
GSI.MUNI_ARRAY["20208"] = '20,長野県,20208,小諸市';
GSI.MUNI_ARRAY["20209"] = '20,長野県,20209,伊那市';
GSI.MUNI_ARRAY["20210"] = '20,長野県,20210,駒ヶ根市';
GSI.MUNI_ARRAY["20211"] = '20,長野県,20211,中野市';
GSI.MUNI_ARRAY["20212"] = '20,長野県,20212,大町市';
GSI.MUNI_ARRAY["20213"] = '20,長野県,20213,飯山市';
GSI.MUNI_ARRAY["20214"] = '20,長野県,20214,茅野市';
GSI.MUNI_ARRAY["20215"] = '20,長野県,20215,塩尻市';
GSI.MUNI_ARRAY["20217"] = '20,長野県,20217,佐久市';
GSI.MUNI_ARRAY["20218"] = '20,長野県,20218,千曲市';
GSI.MUNI_ARRAY["20219"] = '20,長野県,20219,東御市';
GSI.MUNI_ARRAY["20220"] = '20,長野県,20220,安曇野市';
GSI.MUNI_ARRAY["20303"] = '20,長野県,20303,小海町';
GSI.MUNI_ARRAY["20304"] = '20,長野県,20304,川上村';
GSI.MUNI_ARRAY["20305"] = '20,長野県,20305,南牧村';
GSI.MUNI_ARRAY["20306"] = '20,長野県,20306,南相木村';
GSI.MUNI_ARRAY["20307"] = '20,長野県,20307,北相木村';
GSI.MUNI_ARRAY["20309"] = '20,長野県,20309,佐久穂町';
GSI.MUNI_ARRAY["20321"] = '20,長野県,20321,軽井沢町';
GSI.MUNI_ARRAY["20323"] = '20,長野県,20323,御代田町';
GSI.MUNI_ARRAY["20324"] = '20,長野県,20324,立科町';
GSI.MUNI_ARRAY["20349"] = '20,長野県,20349,青木村';
GSI.MUNI_ARRAY["20350"] = '20,長野県,20350,長和町';
GSI.MUNI_ARRAY["20361"] = '20,長野県,20361,下諏訪町';
GSI.MUNI_ARRAY["20362"] = '20,長野県,20362,富士見町';
GSI.MUNI_ARRAY["20363"] = '20,長野県,20363,原村';
GSI.MUNI_ARRAY["20382"] = '20,長野県,20382,辰野町';
GSI.MUNI_ARRAY["20383"] = '20,長野県,20383,箕輪町';
GSI.MUNI_ARRAY["20384"] = '20,長野県,20384,飯島町';
GSI.MUNI_ARRAY["20385"] = '20,長野県,20385,南箕輪村';
GSI.MUNI_ARRAY["20386"] = '20,長野県,20386,中川村';
GSI.MUNI_ARRAY["20388"] = '20,長野県,20388,宮田村';
GSI.MUNI_ARRAY["20402"] = '20,長野県,20402,松川町';
GSI.MUNI_ARRAY["20403"] = '20,長野県,20403,高森町';
GSI.MUNI_ARRAY["20404"] = '20,長野県,20404,阿南町';
GSI.MUNI_ARRAY["20407"] = '20,長野県,20407,阿智村';
GSI.MUNI_ARRAY["20409"] = '20,長野県,20409,平谷村';
GSI.MUNI_ARRAY["20410"] = '20,長野県,20410,根羽村';
GSI.MUNI_ARRAY["20411"] = '20,長野県,20411,下條村';
GSI.MUNI_ARRAY["20412"] = '20,長野県,20412,売木村';
GSI.MUNI_ARRAY["20413"] = '20,長野県,20413,天龍村';
GSI.MUNI_ARRAY["20414"] = '20,長野県,20414,泰阜村';
GSI.MUNI_ARRAY["20415"] = '20,長野県,20415,喬木村';
GSI.MUNI_ARRAY["20416"] = '20,長野県,20416,豊丘村';
GSI.MUNI_ARRAY["20417"] = '20,長野県,20417,大鹿村';
GSI.MUNI_ARRAY["20422"] = '20,長野県,20422,上松町';
GSI.MUNI_ARRAY["20423"] = '20,長野県,20423,南木曽町';
GSI.MUNI_ARRAY["20425"] = '20,長野県,20425,木祖村';
GSI.MUNI_ARRAY["20429"] = '20,長野県,20429,王滝村';
GSI.MUNI_ARRAY["20430"] = '20,長野県,20430,大桑村';
GSI.MUNI_ARRAY["20432"] = '20,長野県,20432,木曽町';
GSI.MUNI_ARRAY["20446"] = '20,長野県,20446,麻績村';
GSI.MUNI_ARRAY["20448"] = '20,長野県,20448,生坂村';
GSI.MUNI_ARRAY["20450"] = '20,長野県,20450,山形村';
GSI.MUNI_ARRAY["20451"] = '20,長野県,20451,朝日村';
GSI.MUNI_ARRAY["20452"] = '20,長野県,20452,筑北村';
GSI.MUNI_ARRAY["20481"] = '20,長野県,20481,池田町';
GSI.MUNI_ARRAY["20482"] = '20,長野県,20482,松川村';
GSI.MUNI_ARRAY["20485"] = '20,長野県,20485,白馬村';
GSI.MUNI_ARRAY["20486"] = '20,長野県,20486,小谷村';
GSI.MUNI_ARRAY["20521"] = '20,長野県,20521,坂城町';
GSI.MUNI_ARRAY["20541"] = '20,長野県,20541,小布施町';
GSI.MUNI_ARRAY["20543"] = '20,長野県,20543,高山村';
GSI.MUNI_ARRAY["20561"] = '20,長野県,20561,山ノ内町';
GSI.MUNI_ARRAY["20562"] = '20,長野県,20562,木島平村';
GSI.MUNI_ARRAY["20563"] = '20,長野県,20563,野沢温泉村';
GSI.MUNI_ARRAY["20583"] = '20,長野県,20583,信濃町';
GSI.MUNI_ARRAY["20588"] = '20,長野県,20588,小川村';
GSI.MUNI_ARRAY["20590"] = '20,長野県,20590,飯綱町';
GSI.MUNI_ARRAY["20602"] = '20,長野県,20602,栄村';
GSI.MUNI_ARRAY["21201"] = '21,岐阜県,21201,岐阜市';
GSI.MUNI_ARRAY["21202"] = '21,岐阜県,21202,大垣市';
GSI.MUNI_ARRAY["21203"] = '21,岐阜県,21203,高山市';
GSI.MUNI_ARRAY["21204"] = '21,岐阜県,21204,多治見市';
GSI.MUNI_ARRAY["21205"] = '21,岐阜県,21205,関市';
GSI.MUNI_ARRAY["21206"] = '21,岐阜県,21206,中津川市';
GSI.MUNI_ARRAY["21207"] = '21,岐阜県,21207,美濃市';
GSI.MUNI_ARRAY["21208"] = '21,岐阜県,21208,瑞浪市';
GSI.MUNI_ARRAY["21209"] = '21,岐阜県,21209,羽島市';
GSI.MUNI_ARRAY["21210"] = '21,岐阜県,21210,恵那市';
GSI.MUNI_ARRAY["21211"] = '21,岐阜県,21211,美濃加茂市';
GSI.MUNI_ARRAY["21212"] = '21,岐阜県,21212,土岐市';
GSI.MUNI_ARRAY["21213"] = '21,岐阜県,21213,各務原市';
GSI.MUNI_ARRAY["21214"] = '21,岐阜県,21214,可児市';
GSI.MUNI_ARRAY["21215"] = '21,岐阜県,21215,山県市';
GSI.MUNI_ARRAY["21216"] = '21,岐阜県,21216,瑞穂市';
GSI.MUNI_ARRAY["21217"] = '21,岐阜県,21217,飛騨市';
GSI.MUNI_ARRAY["21218"] = '21,岐阜県,21218,本巣市';
GSI.MUNI_ARRAY["21219"] = '21,岐阜県,21219,郡上市';
GSI.MUNI_ARRAY["21220"] = '21,岐阜県,21220,下呂市';
GSI.MUNI_ARRAY["21221"] = '21,岐阜県,21221,海津市';
GSI.MUNI_ARRAY["21302"] = '21,岐阜県,21302,岐南町';
GSI.MUNI_ARRAY["21303"] = '21,岐阜県,21303,笠松町';
GSI.MUNI_ARRAY["21341"] = '21,岐阜県,21341,養老町';
GSI.MUNI_ARRAY["21361"] = '21,岐阜県,21361,垂井町';
GSI.MUNI_ARRAY["21362"] = '21,岐阜県,21362,関ケ原町';
GSI.MUNI_ARRAY["21381"] = '21,岐阜県,21381,神戸町';
GSI.MUNI_ARRAY["21382"] = '21,岐阜県,21382,輪之内町';
GSI.MUNI_ARRAY["21383"] = '21,岐阜県,21383,安八町';
GSI.MUNI_ARRAY["21401"] = '21,岐阜県,21401,揖斐川町';
GSI.MUNI_ARRAY["21403"] = '21,岐阜県,21403,大野町';
GSI.MUNI_ARRAY["21404"] = '21,岐阜県,21404,池田町';
GSI.MUNI_ARRAY["21421"] = '21,岐阜県,21421,北方町';
GSI.MUNI_ARRAY["21501"] = '21,岐阜県,21501,坂祝町';
GSI.MUNI_ARRAY["21502"] = '21,岐阜県,21502,富加町';
GSI.MUNI_ARRAY["21503"] = '21,岐阜県,21503,川辺町';
GSI.MUNI_ARRAY["21504"] = '21,岐阜県,21504,七宗町';
GSI.MUNI_ARRAY["21505"] = '21,岐阜県,21505,八百津町';
GSI.MUNI_ARRAY["21506"] = '21,岐阜県,21506,白川町';
GSI.MUNI_ARRAY["21507"] = '21,岐阜県,21507,東白川村';
GSI.MUNI_ARRAY["21521"] = '21,岐阜県,21521,御嵩町';
GSI.MUNI_ARRAY["21604"] = '21,岐阜県,21604,白川村';
GSI.MUNI_ARRAY["22100"] = '22,静岡県,22100,静岡市';
GSI.MUNI_ARRAY["22101"] = '22,静岡県,22101,静岡市　葵区';
GSI.MUNI_ARRAY["22102"] = '22,静岡県,22102,静岡市　駿河区';
GSI.MUNI_ARRAY["22103"] = '22,静岡県,22103,静岡市　清水区';
GSI.MUNI_ARRAY["22130"] = '22,静岡県,22130,浜松市';
GSI.MUNI_ARRAY["22131"] = '22,静岡県,22131,浜松市　中区';
GSI.MUNI_ARRAY["22132"] = '22,静岡県,22132,浜松市　東区';
GSI.MUNI_ARRAY["22133"] = '22,静岡県,22133,浜松市　西区';
GSI.MUNI_ARRAY["22134"] = '22,静岡県,22134,浜松市　南区';
GSI.MUNI_ARRAY["22135"] = '22,静岡県,22135,浜松市　北区';
GSI.MUNI_ARRAY["22136"] = '22,静岡県,22136,浜松市　浜北区';
GSI.MUNI_ARRAY["22137"] = '22,静岡県,22137,浜松市　天竜区';
GSI.MUNI_ARRAY["22203"] = '22,静岡県,22203,沼津市';
GSI.MUNI_ARRAY["22205"] = '22,静岡県,22205,熱海市';
GSI.MUNI_ARRAY["22206"] = '22,静岡県,22206,三島市';
GSI.MUNI_ARRAY["22207"] = '22,静岡県,22207,富士宮市';
GSI.MUNI_ARRAY["22208"] = '22,静岡県,22208,伊東市';
GSI.MUNI_ARRAY["22209"] = '22,静岡県,22209,島田市';
GSI.MUNI_ARRAY["22210"] = '22,静岡県,22210,富士市';
GSI.MUNI_ARRAY["22211"] = '22,静岡県,22211,磐田市';
GSI.MUNI_ARRAY["22212"] = '22,静岡県,22212,焼津市';
GSI.MUNI_ARRAY["22213"] = '22,静岡県,22213,掛川市';
GSI.MUNI_ARRAY["22214"] = '22,静岡県,22214,藤枝市';
GSI.MUNI_ARRAY["22215"] = '22,静岡県,22215,御殿場市';
GSI.MUNI_ARRAY["22216"] = '22,静岡県,22216,袋井市';
GSI.MUNI_ARRAY["22219"] = '22,静岡県,22219,下田市';
GSI.MUNI_ARRAY["22220"] = '22,静岡県,22220,裾野市';
GSI.MUNI_ARRAY["22221"] = '22,静岡県,22221,湖西市';
GSI.MUNI_ARRAY["22222"] = '22,静岡県,22222,伊豆市';
GSI.MUNI_ARRAY["22223"] = '22,静岡県,22223,御前崎市';
GSI.MUNI_ARRAY["22224"] = '22,静岡県,22224,菊川市';
GSI.MUNI_ARRAY["22225"] = '22,静岡県,22225,伊豆の国市';
GSI.MUNI_ARRAY["22226"] = '22,静岡県,22226,牧之原市';
GSI.MUNI_ARRAY["22301"] = '22,静岡県,22301,東伊豆町';
GSI.MUNI_ARRAY["22302"] = '22,静岡県,22302,河津町';
GSI.MUNI_ARRAY["22304"] = '22,静岡県,22304,南伊豆町';
GSI.MUNI_ARRAY["22305"] = '22,静岡県,22305,松崎町';
GSI.MUNI_ARRAY["22306"] = '22,静岡県,22306,西伊豆町';
GSI.MUNI_ARRAY["22325"] = '22,静岡県,22325,函南町';
GSI.MUNI_ARRAY["22341"] = '22,静岡県,22341,清水町';
GSI.MUNI_ARRAY["22342"] = '22,静岡県,22342,長泉町';
GSI.MUNI_ARRAY["22344"] = '22,静岡県,22344,小山町';
GSI.MUNI_ARRAY["22424"] = '22,静岡県,22424,吉田町';
GSI.MUNI_ARRAY["22429"] = '22,静岡県,22429,川根本町';
GSI.MUNI_ARRAY["22461"] = '22,静岡県,22461,森町';
GSI.MUNI_ARRAY["23100"] = '23,愛知県,23100,名古屋市';
GSI.MUNI_ARRAY["23101"] = '23,愛知県,23101,名古屋市　千種区';
GSI.MUNI_ARRAY["23102"] = '23,愛知県,23102,名古屋市　東区';
GSI.MUNI_ARRAY["23103"] = '23,愛知県,23103,名古屋市　北区';
GSI.MUNI_ARRAY["23104"] = '23,愛知県,23104,名古屋市　西区';
GSI.MUNI_ARRAY["23105"] = '23,愛知県,23105,名古屋市　中村区';
GSI.MUNI_ARRAY["23106"] = '23,愛知県,23106,名古屋市　中区';
GSI.MUNI_ARRAY["23107"] = '23,愛知県,23107,名古屋市　昭和区';
GSI.MUNI_ARRAY["23108"] = '23,愛知県,23108,名古屋市　瑞穂区';
GSI.MUNI_ARRAY["23109"] = '23,愛知県,23109,名古屋市　熱田区';
GSI.MUNI_ARRAY["23110"] = '23,愛知県,23110,名古屋市　中川区';
GSI.MUNI_ARRAY["23111"] = '23,愛知県,23111,名古屋市　港区';
GSI.MUNI_ARRAY["23112"] = '23,愛知県,23112,名古屋市　南区';
GSI.MUNI_ARRAY["23113"] = '23,愛知県,23113,名古屋市　守山区';
GSI.MUNI_ARRAY["23114"] = '23,愛知県,23114,名古屋市　緑区';
GSI.MUNI_ARRAY["23115"] = '23,愛知県,23115,名古屋市　名東区';
GSI.MUNI_ARRAY["23116"] = '23,愛知県,23116,名古屋市　天白区';
GSI.MUNI_ARRAY["23201"] = '23,愛知県,23201,豊橋市';
GSI.MUNI_ARRAY["23202"] = '23,愛知県,23202,岡崎市';
GSI.MUNI_ARRAY["23203"] = '23,愛知県,23203,一宮市';
GSI.MUNI_ARRAY["23204"] = '23,愛知県,23204,瀬戸市';
GSI.MUNI_ARRAY["23205"] = '23,愛知県,23205,半田市';
GSI.MUNI_ARRAY["23206"] = '23,愛知県,23206,春日井市';
GSI.MUNI_ARRAY["23207"] = '23,愛知県,23207,豊川市';
GSI.MUNI_ARRAY["23208"] = '23,愛知県,23208,津島市';
GSI.MUNI_ARRAY["23209"] = '23,愛知県,23209,碧南市';
GSI.MUNI_ARRAY["23210"] = '23,愛知県,23210,刈谷市';
GSI.MUNI_ARRAY["23211"] = '23,愛知県,23211,豊田市';
GSI.MUNI_ARRAY["23212"] = '23,愛知県,23212,安城市';
GSI.MUNI_ARRAY["23213"] = '23,愛知県,23213,西尾市';
GSI.MUNI_ARRAY["23214"] = '23,愛知県,23214,蒲郡市';
GSI.MUNI_ARRAY["23215"] = '23,愛知県,23215,犬山市';
GSI.MUNI_ARRAY["23216"] = '23,愛知県,23216,常滑市';
GSI.MUNI_ARRAY["23217"] = '23,愛知県,23217,江南市';
GSI.MUNI_ARRAY["23219"] = '23,愛知県,23219,小牧市';
GSI.MUNI_ARRAY["23220"] = '23,愛知県,23220,稲沢市';
GSI.MUNI_ARRAY["23221"] = '23,愛知県,23221,新城市';
GSI.MUNI_ARRAY["23222"] = '23,愛知県,23222,東海市';
GSI.MUNI_ARRAY["23223"] = '23,愛知県,23223,大府市';
GSI.MUNI_ARRAY["23224"] = '23,愛知県,23224,知多市';
GSI.MUNI_ARRAY["23225"] = '23,愛知県,23225,知立市';
GSI.MUNI_ARRAY["23226"] = '23,愛知県,23226,尾張旭市';
GSI.MUNI_ARRAY["23227"] = '23,愛知県,23227,高浜市';
GSI.MUNI_ARRAY["23228"] = '23,愛知県,23228,岩倉市';
GSI.MUNI_ARRAY["23229"] = '23,愛知県,23229,豊明市';
GSI.MUNI_ARRAY["23230"] = '23,愛知県,23230,日進市';
GSI.MUNI_ARRAY["23231"] = '23,愛知県,23231,田原市';
GSI.MUNI_ARRAY["23232"] = '23,愛知県,23232,愛西市';
GSI.MUNI_ARRAY["23233"] = '23,愛知県,23233,清須市';
GSI.MUNI_ARRAY["23234"] = '23,愛知県,23234,北名古屋市';
GSI.MUNI_ARRAY["23235"] = '23,愛知県,23235,弥富市';
GSI.MUNI_ARRAY["23236"] = '23,愛知県,23236,みよし市';
GSI.MUNI_ARRAY["23237"] = '23,愛知県,23237,あま市';
GSI.MUNI_ARRAY["23238"] = '23,愛知県,23238,長久手市';
GSI.MUNI_ARRAY["23302"] = '23,愛知県,23302,東郷町';
GSI.MUNI_ARRAY["23342"] = '23,愛知県,23342,豊山町';
GSI.MUNI_ARRAY["23361"] = '23,愛知県,23361,大口町';
GSI.MUNI_ARRAY["23362"] = '23,愛知県,23362,扶桑町';
GSI.MUNI_ARRAY["23424"] = '23,愛知県,23424,大治町';
GSI.MUNI_ARRAY["23425"] = '23,愛知県,23425,蟹江町';
GSI.MUNI_ARRAY["23427"] = '23,愛知県,23427,飛島村';
GSI.MUNI_ARRAY["23441"] = '23,愛知県,23441,阿久比町';
GSI.MUNI_ARRAY["23442"] = '23,愛知県,23442,東浦町';
GSI.MUNI_ARRAY["23445"] = '23,愛知県,23445,南知多町';
GSI.MUNI_ARRAY["23446"] = '23,愛知県,23446,美浜町';
GSI.MUNI_ARRAY["23447"] = '23,愛知県,23447,武豊町';
GSI.MUNI_ARRAY["23501"] = '23,愛知県,23501,幸田町';
GSI.MUNI_ARRAY["23561"] = '23,愛知県,23561,設楽町';
GSI.MUNI_ARRAY["23562"] = '23,愛知県,23562,東栄町';
GSI.MUNI_ARRAY["23563"] = '23,愛知県,23563,豊根村';
GSI.MUNI_ARRAY["24201"] = '24,三重県,24201,津市';
GSI.MUNI_ARRAY["24202"] = '24,三重県,24202,四日市市';
GSI.MUNI_ARRAY["24203"] = '24,三重県,24203,伊勢市';
GSI.MUNI_ARRAY["24204"] = '24,三重県,24204,松阪市';
GSI.MUNI_ARRAY["24205"] = '24,三重県,24205,桑名市';
GSI.MUNI_ARRAY["24207"] = '24,三重県,24207,鈴鹿市';
GSI.MUNI_ARRAY["24208"] = '24,三重県,24208,名張市';
GSI.MUNI_ARRAY["24209"] = '24,三重県,24209,尾鷲市';
GSI.MUNI_ARRAY["24210"] = '24,三重県,24210,亀山市';
GSI.MUNI_ARRAY["24211"] = '24,三重県,24211,鳥羽市';
GSI.MUNI_ARRAY["24212"] = '24,三重県,24212,熊野市';
GSI.MUNI_ARRAY["24214"] = '24,三重県,24214,いなべ市';
GSI.MUNI_ARRAY["24215"] = '24,三重県,24215,志摩市';
GSI.MUNI_ARRAY["24216"] = '24,三重県,24216,伊賀市';
GSI.MUNI_ARRAY["24303"] = '24,三重県,24303,木曽岬町';
GSI.MUNI_ARRAY["24324"] = '24,三重県,24324,東員町';
GSI.MUNI_ARRAY["24341"] = '24,三重県,24341,菰野町';
GSI.MUNI_ARRAY["24343"] = '24,三重県,24343,朝日町';
GSI.MUNI_ARRAY["24344"] = '24,三重県,24344,川越町';
GSI.MUNI_ARRAY["24441"] = '24,三重県,24441,多気町';
GSI.MUNI_ARRAY["24442"] = '24,三重県,24442,明和町';
GSI.MUNI_ARRAY["24443"] = '24,三重県,24443,大台町';
GSI.MUNI_ARRAY["24461"] = '24,三重県,24461,玉城町';
GSI.MUNI_ARRAY["24470"] = '24,三重県,24470,度会町';
GSI.MUNI_ARRAY["24471"] = '24,三重県,24471,大紀町';
GSI.MUNI_ARRAY["24472"] = '24,三重県,24472,南伊勢町';
GSI.MUNI_ARRAY["24543"] = '24,三重県,24543,紀北町';
GSI.MUNI_ARRAY["24561"] = '24,三重県,24561,御浜町';
GSI.MUNI_ARRAY["24562"] = '24,三重県,24562,紀宝町';
GSI.MUNI_ARRAY["25201"] = '25,滋賀県,25201,大津市';
GSI.MUNI_ARRAY["25202"] = '25,滋賀県,25202,彦根市';
GSI.MUNI_ARRAY["25203"] = '25,滋賀県,25203,長浜市';
GSI.MUNI_ARRAY["25204"] = '25,滋賀県,25204,近江八幡市';
GSI.MUNI_ARRAY["25206"] = '25,滋賀県,25206,草津市';
GSI.MUNI_ARRAY["25207"] = '25,滋賀県,25207,守山市';
GSI.MUNI_ARRAY["25208"] = '25,滋賀県,25208,栗東市';
GSI.MUNI_ARRAY["25209"] = '25,滋賀県,25209,甲賀市';
GSI.MUNI_ARRAY["25210"] = '25,滋賀県,25210,野洲市';
GSI.MUNI_ARRAY["25211"] = '25,滋賀県,25211,湖南市';
GSI.MUNI_ARRAY["25212"] = '25,滋賀県,25212,高島市';
GSI.MUNI_ARRAY["25213"] = '25,滋賀県,25213,東近江市';
GSI.MUNI_ARRAY["25214"] = '25,滋賀県,25214,米原市';
GSI.MUNI_ARRAY["25383"] = '25,滋賀県,25383,日野町';
GSI.MUNI_ARRAY["25384"] = '25,滋賀県,25384,竜王町';
GSI.MUNI_ARRAY["25425"] = '25,滋賀県,25425,愛荘町';
GSI.MUNI_ARRAY["25441"] = '25,滋賀県,25441,豊郷町';
GSI.MUNI_ARRAY["25442"] = '25,滋賀県,25442,甲良町';
GSI.MUNI_ARRAY["25443"] = '25,滋賀県,25443,多賀町';
GSI.MUNI_ARRAY["26100"] = '26,京都府,26100,京都市';
GSI.MUNI_ARRAY["26101"] = '26,京都府,26101,京都市　北区';
GSI.MUNI_ARRAY["26102"] = '26,京都府,26102,京都市　上京区';
GSI.MUNI_ARRAY["26103"] = '26,京都府,26103,京都市　左京区';
GSI.MUNI_ARRAY["26104"] = '26,京都府,26104,京都市　中京区';
GSI.MUNI_ARRAY["26105"] = '26,京都府,26105,京都市　東山区';
GSI.MUNI_ARRAY["26106"] = '26,京都府,26106,京都市　下京区';
GSI.MUNI_ARRAY["26107"] = '26,京都府,26107,京都市　南区';
GSI.MUNI_ARRAY["26108"] = '26,京都府,26108,京都市　右京区';
GSI.MUNI_ARRAY["26109"] = '26,京都府,26109,京都市　伏見区';
GSI.MUNI_ARRAY["26110"] = '26,京都府,26110,京都市　山科区';
GSI.MUNI_ARRAY["26111"] = '26,京都府,26111,京都市　西京区';
GSI.MUNI_ARRAY["26201"] = '26,京都府,26201,福知山市';
GSI.MUNI_ARRAY["26202"] = '26,京都府,26202,舞鶴市';
GSI.MUNI_ARRAY["26203"] = '26,京都府,26203,綾部市';
GSI.MUNI_ARRAY["26204"] = '26,京都府,26204,宇治市';
GSI.MUNI_ARRAY["26205"] = '26,京都府,26205,宮津市';
GSI.MUNI_ARRAY["26206"] = '26,京都府,26206,亀岡市';
GSI.MUNI_ARRAY["26207"] = '26,京都府,26207,城陽市';
GSI.MUNI_ARRAY["26208"] = '26,京都府,26208,向日市';
GSI.MUNI_ARRAY["26209"] = '26,京都府,26209,長岡京市';
GSI.MUNI_ARRAY["26210"] = '26,京都府,26210,八幡市';
GSI.MUNI_ARRAY["26211"] = '26,京都府,26211,京田辺市';
GSI.MUNI_ARRAY["26212"] = '26,京都府,26212,京丹後市';
GSI.MUNI_ARRAY["26213"] = '26,京都府,26213,南丹市';
GSI.MUNI_ARRAY["26214"] = '26,京都府,26214,木津川市';
GSI.MUNI_ARRAY["26303"] = '26,京都府,26303,大山崎町';
GSI.MUNI_ARRAY["26322"] = '26,京都府,26322,久御山町';
GSI.MUNI_ARRAY["26343"] = '26,京都府,26343,井手町';
GSI.MUNI_ARRAY["26344"] = '26,京都府,26344,宇治田原町';
GSI.MUNI_ARRAY["26364"] = '26,京都府,26364,笠置町';
GSI.MUNI_ARRAY["26365"] = '26,京都府,26365,和束町';
GSI.MUNI_ARRAY["26366"] = '26,京都府,26366,精華町';
GSI.MUNI_ARRAY["26367"] = '26,京都府,26367,南山城村';
GSI.MUNI_ARRAY["26407"] = '26,京都府,26407,京丹波町';
GSI.MUNI_ARRAY["26463"] = '26,京都府,26463,伊根町';
GSI.MUNI_ARRAY["26465"] = '26,京都府,26465,与謝野町';
GSI.MUNI_ARRAY["27100"] = '27,大阪府,27100,大阪市';
GSI.MUNI_ARRAY["27102"] = '27,大阪府,27102,大阪市　都島区';
GSI.MUNI_ARRAY["27103"] = '27,大阪府,27103,大阪市　福島区';
GSI.MUNI_ARRAY["27104"] = '27,大阪府,27104,大阪市　此花区';
GSI.MUNI_ARRAY["27106"] = '27,大阪府,27106,大阪市　西区';
GSI.MUNI_ARRAY["27107"] = '27,大阪府,27107,大阪市　港区';
GSI.MUNI_ARRAY["27108"] = '27,大阪府,27108,大阪市　大正区';
GSI.MUNI_ARRAY["27109"] = '27,大阪府,27109,大阪市　天王寺区';
GSI.MUNI_ARRAY["27111"] = '27,大阪府,27111,大阪市　浪速区';
GSI.MUNI_ARRAY["27113"] = '27,大阪府,27113,大阪市　西淀川区';
GSI.MUNI_ARRAY["27114"] = '27,大阪府,27114,大阪市　東淀川区';
GSI.MUNI_ARRAY["27115"] = '27,大阪府,27115,大阪市　東成区';
GSI.MUNI_ARRAY["27116"] = '27,大阪府,27116,大阪市　生野区';
GSI.MUNI_ARRAY["27117"] = '27,大阪府,27117,大阪市　旭区';
GSI.MUNI_ARRAY["27118"] = '27,大阪府,27118,大阪市　城東区';
GSI.MUNI_ARRAY["27119"] = '27,大阪府,27119,大阪市　阿倍野区';
GSI.MUNI_ARRAY["27120"] = '27,大阪府,27120,大阪市　住吉区';
GSI.MUNI_ARRAY["27121"] = '27,大阪府,27121,大阪市　東住吉区';
GSI.MUNI_ARRAY["27122"] = '27,大阪府,27122,大阪市　西成区';
GSI.MUNI_ARRAY["27123"] = '27,大阪府,27123,大阪市　淀川区';
GSI.MUNI_ARRAY["27124"] = '27,大阪府,27124,大阪市　鶴見区';
GSI.MUNI_ARRAY["27125"] = '27,大阪府,27125,大阪市　住之江区';
GSI.MUNI_ARRAY["27126"] = '27,大阪府,27126,大阪市　平野区';
GSI.MUNI_ARRAY["27127"] = '27,大阪府,27127,大阪市　北区';
GSI.MUNI_ARRAY["27128"] = '27,大阪府,27128,大阪市　中央区';
GSI.MUNI_ARRAY["27140"] = '27,大阪府,27140,堺市';
GSI.MUNI_ARRAY["27141"] = '27,大阪府,27141,堺市　堺区';
GSI.MUNI_ARRAY["27142"] = '27,大阪府,27142,堺市　中区';
GSI.MUNI_ARRAY["27143"] = '27,大阪府,27143,堺市　東区';
GSI.MUNI_ARRAY["27144"] = '27,大阪府,27144,堺市　西区';
GSI.MUNI_ARRAY["27145"] = '27,大阪府,27145,堺市　南区';
GSI.MUNI_ARRAY["27146"] = '27,大阪府,27146,堺市　北区';
GSI.MUNI_ARRAY["27147"] = '27,大阪府,27147,堺市　美原区';
GSI.MUNI_ARRAY["27202"] = '27,大阪府,27202,岸和田市';
GSI.MUNI_ARRAY["27203"] = '27,大阪府,27203,豊中市';
GSI.MUNI_ARRAY["27204"] = '27,大阪府,27204,池田市';
GSI.MUNI_ARRAY["27205"] = '27,大阪府,27205,吹田市';
GSI.MUNI_ARRAY["27206"] = '27,大阪府,27206,泉大津市';
GSI.MUNI_ARRAY["27207"] = '27,大阪府,27207,高槻市';
GSI.MUNI_ARRAY["27208"] = '27,大阪府,27208,貝塚市';
GSI.MUNI_ARRAY["27209"] = '27,大阪府,27209,守口市';
GSI.MUNI_ARRAY["27210"] = '27,大阪府,27210,枚方市';
GSI.MUNI_ARRAY["27211"] = '27,大阪府,27211,茨木市';
GSI.MUNI_ARRAY["27212"] = '27,大阪府,27212,八尾市';
GSI.MUNI_ARRAY["27213"] = '27,大阪府,27213,泉佐野市';
GSI.MUNI_ARRAY["27214"] = '27,大阪府,27214,富田林市';
GSI.MUNI_ARRAY["27215"] = '27,大阪府,27215,寝屋川市';
GSI.MUNI_ARRAY["27216"] = '27,大阪府,27216,河内長野市';
GSI.MUNI_ARRAY["27217"] = '27,大阪府,27217,松原市';
GSI.MUNI_ARRAY["27218"] = '27,大阪府,27218,大東市';
GSI.MUNI_ARRAY["27219"] = '27,大阪府,27219,和泉市';
GSI.MUNI_ARRAY["27220"] = '27,大阪府,27220,箕面市';
GSI.MUNI_ARRAY["27221"] = '27,大阪府,27221,柏原市';
GSI.MUNI_ARRAY["27222"] = '27,大阪府,27222,羽曳野市';
GSI.MUNI_ARRAY["27223"] = '27,大阪府,27223,門真市';
GSI.MUNI_ARRAY["27224"] = '27,大阪府,27224,摂津市';
GSI.MUNI_ARRAY["27225"] = '27,大阪府,27225,高石市';
GSI.MUNI_ARRAY["27226"] = '27,大阪府,27226,藤井寺市';
GSI.MUNI_ARRAY["27227"] = '27,大阪府,27227,東大阪市';
GSI.MUNI_ARRAY["27228"] = '27,大阪府,27228,泉南市';
GSI.MUNI_ARRAY["27229"] = '27,大阪府,27229,四條畷市';
GSI.MUNI_ARRAY["27230"] = '27,大阪府,27230,交野市';
GSI.MUNI_ARRAY["27231"] = '27,大阪府,27231,大阪狭山市';
GSI.MUNI_ARRAY["27232"] = '27,大阪府,27232,阪南市';
GSI.MUNI_ARRAY["27301"] = '27,大阪府,27301,島本町';
GSI.MUNI_ARRAY["27321"] = '27,大阪府,27321,豊能町';
GSI.MUNI_ARRAY["27322"] = '27,大阪府,27322,能勢町';
GSI.MUNI_ARRAY["27341"] = '27,大阪府,27341,忠岡町';
GSI.MUNI_ARRAY["27361"] = '27,大阪府,27361,熊取町';
GSI.MUNI_ARRAY["27362"] = '27,大阪府,27362,田尻町';
GSI.MUNI_ARRAY["27366"] = '27,大阪府,27366,岬町';
GSI.MUNI_ARRAY["27381"] = '27,大阪府,27381,太子町';
GSI.MUNI_ARRAY["27382"] = '27,大阪府,27382,河南町';
GSI.MUNI_ARRAY["27383"] = '27,大阪府,27383,千早赤阪村';
GSI.MUNI_ARRAY["28100"] = '28,兵庫県,28100,神戸市';
GSI.MUNI_ARRAY["28101"] = '28,兵庫県,28101,神戸市　東灘区';
GSI.MUNI_ARRAY["28102"] = '28,兵庫県,28102,神戸市　灘区';
GSI.MUNI_ARRAY["28105"] = '28,兵庫県,28105,神戸市　兵庫区';
GSI.MUNI_ARRAY["28106"] = '28,兵庫県,28106,神戸市　長田区';
GSI.MUNI_ARRAY["28107"] = '28,兵庫県,28107,神戸市　須磨区';
GSI.MUNI_ARRAY["28108"] = '28,兵庫県,28108,神戸市　垂水区';
GSI.MUNI_ARRAY["28109"] = '28,兵庫県,28109,神戸市　北区';
GSI.MUNI_ARRAY["28110"] = '28,兵庫県,28110,神戸市　中央区';
GSI.MUNI_ARRAY["28111"] = '28,兵庫県,28111,神戸市　西区';
GSI.MUNI_ARRAY["28201"] = '28,兵庫県,28201,姫路市';
GSI.MUNI_ARRAY["28202"] = '28,兵庫県,28202,尼崎市';
GSI.MUNI_ARRAY["28203"] = '28,兵庫県,28203,明石市';
GSI.MUNI_ARRAY["28204"] = '28,兵庫県,28204,西宮市';
GSI.MUNI_ARRAY["28205"] = '28,兵庫県,28205,洲本市';
GSI.MUNI_ARRAY["28206"] = '28,兵庫県,28206,芦屋市';
GSI.MUNI_ARRAY["28207"] = '28,兵庫県,28207,伊丹市';
GSI.MUNI_ARRAY["28208"] = '28,兵庫県,28208,相生市';
GSI.MUNI_ARRAY["28209"] = '28,兵庫県,28209,豊岡市';
GSI.MUNI_ARRAY["28210"] = '28,兵庫県,28210,加古川市';
GSI.MUNI_ARRAY["28212"] = '28,兵庫県,28212,赤穂市';
GSI.MUNI_ARRAY["28213"] = '28,兵庫県,28213,西脇市';
GSI.MUNI_ARRAY["28214"] = '28,兵庫県,28214,宝塚市';
GSI.MUNI_ARRAY["28215"] = '28,兵庫県,28215,三木市';
GSI.MUNI_ARRAY["28216"] = '28,兵庫県,28216,高砂市';
GSI.MUNI_ARRAY["28217"] = '28,兵庫県,28217,川西市';
GSI.MUNI_ARRAY["28218"] = '28,兵庫県,28218,小野市';
GSI.MUNI_ARRAY["28219"] = '28,兵庫県,28219,三田市';
GSI.MUNI_ARRAY["28220"] = '28,兵庫県,28220,加西市';
GSI.MUNI_ARRAY["28221"] = '28,兵庫県,28221,篠山市';
GSI.MUNI_ARRAY["28222"] = '28,兵庫県,28222,養父市';
GSI.MUNI_ARRAY["28223"] = '28,兵庫県,28223,丹波市';
GSI.MUNI_ARRAY["28224"] = '28,兵庫県,28224,南あわじ市';
GSI.MUNI_ARRAY["28225"] = '28,兵庫県,28225,朝来市';
GSI.MUNI_ARRAY["28226"] = '28,兵庫県,28226,淡路市';
GSI.MUNI_ARRAY["28227"] = '28,兵庫県,28227,宍粟市';
GSI.MUNI_ARRAY["28228"] = '28,兵庫県,28228,加東市';
GSI.MUNI_ARRAY["28229"] = '28,兵庫県,28229,たつの市';
GSI.MUNI_ARRAY["28301"] = '28,兵庫県,28301,猪名川町';
GSI.MUNI_ARRAY["28365"] = '28,兵庫県,28365,多可町';
GSI.MUNI_ARRAY["28381"] = '28,兵庫県,28381,稲美町';
GSI.MUNI_ARRAY["28382"] = '28,兵庫県,28382,播磨町';
GSI.MUNI_ARRAY["28442"] = '28,兵庫県,28442,市川町';
GSI.MUNI_ARRAY["28443"] = '28,兵庫県,28443,福崎町';
GSI.MUNI_ARRAY["28446"] = '28,兵庫県,28446,神河町';
GSI.MUNI_ARRAY["28464"] = '28,兵庫県,28464,太子町';
GSI.MUNI_ARRAY["28481"] = '28,兵庫県,28481,上郡町';
GSI.MUNI_ARRAY["28501"] = '28,兵庫県,28501,佐用町';
GSI.MUNI_ARRAY["28585"] = '28,兵庫県,28585,香美町';
GSI.MUNI_ARRAY["28586"] = '28,兵庫県,28586,新温泉町';
GSI.MUNI_ARRAY["29201"] = '29,奈良県,29201,奈良市';
GSI.MUNI_ARRAY["29202"] = '29,奈良県,29202,大和高田市';
GSI.MUNI_ARRAY["29203"] = '29,奈良県,29203,大和郡山市';
GSI.MUNI_ARRAY["29204"] = '29,奈良県,29204,天理市';
GSI.MUNI_ARRAY["29205"] = '29,奈良県,29205,橿原市';
GSI.MUNI_ARRAY["29206"] = '29,奈良県,29206,桜井市';
GSI.MUNI_ARRAY["29207"] = '29,奈良県,29207,五條市';
GSI.MUNI_ARRAY["29208"] = '29,奈良県,29208,御所市';
GSI.MUNI_ARRAY["29209"] = '29,奈良県,29209,生駒市';
GSI.MUNI_ARRAY["29210"] = '29,奈良県,29210,香芝市';
GSI.MUNI_ARRAY["29211"] = '29,奈良県,29211,葛城市';
GSI.MUNI_ARRAY["29212"] = '29,奈良県,29212,宇陀市';
GSI.MUNI_ARRAY["29322"] = '29,奈良県,29322,山添村';
GSI.MUNI_ARRAY["29342"] = '29,奈良県,29342,平群町';
GSI.MUNI_ARRAY["29343"] = '29,奈良県,29343,三郷町';
GSI.MUNI_ARRAY["29344"] = '29,奈良県,29344,斑鳩町';
GSI.MUNI_ARRAY["29345"] = '29,奈良県,29345,安堵町';
GSI.MUNI_ARRAY["29361"] = '29,奈良県,29361,川西町';
GSI.MUNI_ARRAY["29362"] = '29,奈良県,29362,三宅町';
GSI.MUNI_ARRAY["29363"] = '29,奈良県,29363,田原本町';
GSI.MUNI_ARRAY["29385"] = '29,奈良県,29385,曽爾村';
GSI.MUNI_ARRAY["29386"] = '29,奈良県,29386,御杖村';
GSI.MUNI_ARRAY["29401"] = '29,奈良県,29401,高取町';
GSI.MUNI_ARRAY["29402"] = '29,奈良県,29402,明日香村';
GSI.MUNI_ARRAY["29424"] = '29,奈良県,29424,上牧町';
GSI.MUNI_ARRAY["29425"] = '29,奈良県,29425,王寺町';
GSI.MUNI_ARRAY["29426"] = '29,奈良県,29426,広陵町';
GSI.MUNI_ARRAY["29427"] = '29,奈良県,29427,河合町';
GSI.MUNI_ARRAY["29441"] = '29,奈良県,29441,吉野町';
GSI.MUNI_ARRAY["29442"] = '29,奈良県,29442,大淀町';
GSI.MUNI_ARRAY["29443"] = '29,奈良県,29443,下市町';
GSI.MUNI_ARRAY["29444"] = '29,奈良県,29444,黒滝村';
GSI.MUNI_ARRAY["29446"] = '29,奈良県,29446,天川村';
GSI.MUNI_ARRAY["29447"] = '29,奈良県,29447,野迫川村';
GSI.MUNI_ARRAY["29449"] = '29,奈良県,29449,十津川村';
GSI.MUNI_ARRAY["29450"] = '29,奈良県,29450,下北山村';
GSI.MUNI_ARRAY["29451"] = '29,奈良県,29451,上北山村';
GSI.MUNI_ARRAY["29452"] = '29,奈良県,29452,川上村';
GSI.MUNI_ARRAY["29453"] = '29,奈良県,29453,東吉野村';
GSI.MUNI_ARRAY["30201"] = '30,和歌山県,30201,和歌山市';
GSI.MUNI_ARRAY["30202"] = '30,和歌山県,30202,海南市';
GSI.MUNI_ARRAY["30203"] = '30,和歌山県,30203,橋本市';
GSI.MUNI_ARRAY["30204"] = '30,和歌山県,30204,有田市';
GSI.MUNI_ARRAY["30205"] = '30,和歌山県,30205,御坊市';
GSI.MUNI_ARRAY["30206"] = '30,和歌山県,30206,田辺市';
GSI.MUNI_ARRAY["30207"] = '30,和歌山県,30207,新宮市';
GSI.MUNI_ARRAY["30208"] = '30,和歌山県,30208,紀の川市';
GSI.MUNI_ARRAY["30209"] = '30,和歌山県,30209,岩出市';
GSI.MUNI_ARRAY["30304"] = '30,和歌山県,30304,紀美野町';
GSI.MUNI_ARRAY["30341"] = '30,和歌山県,30341,かつらぎ町';
GSI.MUNI_ARRAY["30343"] = '30,和歌山県,30343,九度山町';
GSI.MUNI_ARRAY["30344"] = '30,和歌山県,30344,高野町';
GSI.MUNI_ARRAY["30361"] = '30,和歌山県,30361,湯浅町';
GSI.MUNI_ARRAY["30362"] = '30,和歌山県,30362,広川町';
GSI.MUNI_ARRAY["30366"] = '30,和歌山県,30366,有田川町';
GSI.MUNI_ARRAY["30381"] = '30,和歌山県,30381,美浜町';
GSI.MUNI_ARRAY["30382"] = '30,和歌山県,30382,日高町';
GSI.MUNI_ARRAY["30383"] = '30,和歌山県,30383,由良町';
GSI.MUNI_ARRAY["30390"] = '30,和歌山県,30390,印南町';
GSI.MUNI_ARRAY["30391"] = '30,和歌山県,30391,みなべ町';
GSI.MUNI_ARRAY["30392"] = '30,和歌山県,30392,日高川町';
GSI.MUNI_ARRAY["30401"] = '30,和歌山県,30401,白浜町';
GSI.MUNI_ARRAY["30404"] = '30,和歌山県,30404,上富田町';
GSI.MUNI_ARRAY["30406"] = '30,和歌山県,30406,すさみ町';
GSI.MUNI_ARRAY["30421"] = '30,和歌山県,30421,那智勝浦町';
GSI.MUNI_ARRAY["30422"] = '30,和歌山県,30422,太地町';
GSI.MUNI_ARRAY["30424"] = '30,和歌山県,30424,古座川町';
GSI.MUNI_ARRAY["30427"] = '30,和歌山県,30427,北山村';
GSI.MUNI_ARRAY["30428"] = '30,和歌山県,30428,串本町';
GSI.MUNI_ARRAY["31201"] = '31,鳥取県,31201,鳥取市';
GSI.MUNI_ARRAY["31202"] = '31,鳥取県,31202,米子市';
GSI.MUNI_ARRAY["31203"] = '31,鳥取県,31203,倉吉市';
GSI.MUNI_ARRAY["31204"] = '31,鳥取県,31204,境港市';
GSI.MUNI_ARRAY["31302"] = '31,鳥取県,31302,岩美町';
GSI.MUNI_ARRAY["31325"] = '31,鳥取県,31325,若桜町';
GSI.MUNI_ARRAY["31328"] = '31,鳥取県,31328,智頭町';
GSI.MUNI_ARRAY["31329"] = '31,鳥取県,31329,八頭町';
GSI.MUNI_ARRAY["31364"] = '31,鳥取県,31364,三朝町';
GSI.MUNI_ARRAY["31370"] = '31,鳥取県,31370,湯梨浜町';
GSI.MUNI_ARRAY["31371"] = '31,鳥取県,31371,琴浦町';
GSI.MUNI_ARRAY["31372"] = '31,鳥取県,31372,北栄町';
GSI.MUNI_ARRAY["31384"] = '31,鳥取県,31384,日吉津村';
GSI.MUNI_ARRAY["31386"] = '31,鳥取県,31386,大山町';
GSI.MUNI_ARRAY["31389"] = '31,鳥取県,31389,南部町';
GSI.MUNI_ARRAY["31390"] = '31,鳥取県,31390,伯耆町';
GSI.MUNI_ARRAY["31401"] = '31,鳥取県,31401,日南町';
GSI.MUNI_ARRAY["31402"] = '31,鳥取県,31402,日野町';
GSI.MUNI_ARRAY["31403"] = '31,鳥取県,31403,江府町';
GSI.MUNI_ARRAY["32201"] = '32,島根県,32201,松江市';
GSI.MUNI_ARRAY["32202"] = '32,島根県,32202,浜田市';
GSI.MUNI_ARRAY["32203"] = '32,島根県,32203,出雲市';
GSI.MUNI_ARRAY["32204"] = '32,島根県,32204,益田市';
GSI.MUNI_ARRAY["32205"] = '32,島根県,32205,大田市';
GSI.MUNI_ARRAY["32206"] = '32,島根県,32206,安来市';
GSI.MUNI_ARRAY["32207"] = '32,島根県,32207,江津市';
GSI.MUNI_ARRAY["32209"] = '32,島根県,32209,雲南市';
GSI.MUNI_ARRAY["32343"] = '32,島根県,32343,奥出雲町';
GSI.MUNI_ARRAY["32386"] = '32,島根県,32386,飯南町';
GSI.MUNI_ARRAY["32441"] = '32,島根県,32441,川本町';
GSI.MUNI_ARRAY["32448"] = '32,島根県,32448,美郷町';
GSI.MUNI_ARRAY["32449"] = '32,島根県,32449,邑南町';
GSI.MUNI_ARRAY["32501"] = '32,島根県,32501,津和野町';
GSI.MUNI_ARRAY["32505"] = '32,島根県,32505,吉賀町';
GSI.MUNI_ARRAY["32525"] = '32,島根県,32525,海士町';
GSI.MUNI_ARRAY["32526"] = '32,島根県,32526,西ノ島町';
GSI.MUNI_ARRAY["32527"] = '32,島根県,32527,知夫村';
GSI.MUNI_ARRAY["32528"] = '32,島根県,32528,隠岐の島町';
GSI.MUNI_ARRAY["33100"] = '33,岡山県,33100,岡山市';
GSI.MUNI_ARRAY["33101"] = '33,岡山県,33101,岡山市　北区';
GSI.MUNI_ARRAY["33102"] = '33,岡山県,33102,岡山市　中区';
GSI.MUNI_ARRAY["33103"] = '33,岡山県,33103,岡山市　東区';
GSI.MUNI_ARRAY["33104"] = '33,岡山県,33104,岡山市　南区';
GSI.MUNI_ARRAY["33202"] = '33,岡山県,33202,倉敷市';
GSI.MUNI_ARRAY["33203"] = '33,岡山県,33203,津山市';
GSI.MUNI_ARRAY["33204"] = '33,岡山県,33204,玉野市';
GSI.MUNI_ARRAY["33205"] = '33,岡山県,33205,笠岡市';
GSI.MUNI_ARRAY["33207"] = '33,岡山県,33207,井原市';
GSI.MUNI_ARRAY["33208"] = '33,岡山県,33208,総社市';
GSI.MUNI_ARRAY["33209"] = '33,岡山県,33209,高梁市';
GSI.MUNI_ARRAY["33210"] = '33,岡山県,33210,新見市';
GSI.MUNI_ARRAY["33211"] = '33,岡山県,33211,備前市';
GSI.MUNI_ARRAY["33212"] = '33,岡山県,33212,瀬戸内市';
GSI.MUNI_ARRAY["33213"] = '33,岡山県,33213,赤磐市';
GSI.MUNI_ARRAY["33214"] = '33,岡山県,33214,真庭市';
GSI.MUNI_ARRAY["33215"] = '33,岡山県,33215,美作市';
GSI.MUNI_ARRAY["33216"] = '33,岡山県,33216,浅口市';
GSI.MUNI_ARRAY["33346"] = '33,岡山県,33346,和気町';
GSI.MUNI_ARRAY["33423"] = '33,岡山県,33423,早島町';
GSI.MUNI_ARRAY["33445"] = '33,岡山県,33445,里庄町';
GSI.MUNI_ARRAY["33461"] = '33,岡山県,33461,矢掛町';
GSI.MUNI_ARRAY["33586"] = '33,岡山県,33586,新庄村';
GSI.MUNI_ARRAY["33606"] = '33,岡山県,33606,鏡野町';
GSI.MUNI_ARRAY["33622"] = '33,岡山県,33622,勝央町';
GSI.MUNI_ARRAY["33623"] = '33,岡山県,33623,奈義町';
GSI.MUNI_ARRAY["33643"] = '33,岡山県,33643,西粟倉村';
GSI.MUNI_ARRAY["33663"] = '33,岡山県,33663,久米南町';
GSI.MUNI_ARRAY["33666"] = '33,岡山県,33666,美咲町';
GSI.MUNI_ARRAY["33681"] = '33,岡山県,33681,吉備中央町';
GSI.MUNI_ARRAY["34100"] = '34,広島県,34100,広島市';
GSI.MUNI_ARRAY["34101"] = '34,広島県,34101,広島市　中区';
GSI.MUNI_ARRAY["34102"] = '34,広島県,34102,広島市　東区';
GSI.MUNI_ARRAY["34103"] = '34,広島県,34103,広島市　南区';
GSI.MUNI_ARRAY["34104"] = '34,広島県,34104,広島市　西区';
GSI.MUNI_ARRAY["34105"] = '34,広島県,34105,広島市　安佐南区';
GSI.MUNI_ARRAY["34106"] = '34,広島県,34106,広島市　安佐北区';
GSI.MUNI_ARRAY["34107"] = '34,広島県,34107,広島市　安芸区';
GSI.MUNI_ARRAY["34108"] = '34,広島県,34108,広島市　佐伯区';
GSI.MUNI_ARRAY["34202"] = '34,広島県,34202,呉市';
GSI.MUNI_ARRAY["34203"] = '34,広島県,34203,竹原市';
GSI.MUNI_ARRAY["34204"] = '34,広島県,34204,三原市';
GSI.MUNI_ARRAY["34205"] = '34,広島県,34205,尾道市';
GSI.MUNI_ARRAY["34207"] = '34,広島県,34207,福山市';
GSI.MUNI_ARRAY["34208"] = '34,広島県,34208,府中市';
GSI.MUNI_ARRAY["34209"] = '34,広島県,34209,三次市';
GSI.MUNI_ARRAY["34210"] = '34,広島県,34210,庄原市';
GSI.MUNI_ARRAY["34211"] = '34,広島県,34211,大竹市';
GSI.MUNI_ARRAY["34212"] = '34,広島県,34212,東広島市';
GSI.MUNI_ARRAY["34213"] = '34,広島県,34213,廿日市市';
GSI.MUNI_ARRAY["34214"] = '34,広島県,34214,安芸高田市';
GSI.MUNI_ARRAY["34215"] = '34,広島県,34215,江田島市';
GSI.MUNI_ARRAY["34302"] = '34,広島県,34302,府中町';
GSI.MUNI_ARRAY["34304"] = '34,広島県,34304,海田町';
GSI.MUNI_ARRAY["34307"] = '34,広島県,34307,熊野町';
GSI.MUNI_ARRAY["34309"] = '34,広島県,34309,坂町';
GSI.MUNI_ARRAY["34368"] = '34,広島県,34368,安芸太田町';
GSI.MUNI_ARRAY["34369"] = '34,広島県,34369,北広島町';
GSI.MUNI_ARRAY["34431"] = '34,広島県,34431,大崎上島町';
GSI.MUNI_ARRAY["34462"] = '34,広島県,34462,世羅町';
GSI.MUNI_ARRAY["34545"] = '34,広島県,34545,神石高原町';
GSI.MUNI_ARRAY["35201"] = '35,山口県,35201,下関市';
GSI.MUNI_ARRAY["35202"] = '35,山口県,35202,宇部市';
GSI.MUNI_ARRAY["35203"] = '35,山口県,35203,山口市';
GSI.MUNI_ARRAY["35204"] = '35,山口県,35204,萩市';
GSI.MUNI_ARRAY["35206"] = '35,山口県,35206,防府市';
GSI.MUNI_ARRAY["35207"] = '35,山口県,35207,下松市';
GSI.MUNI_ARRAY["35208"] = '35,山口県,35208,岩国市';
GSI.MUNI_ARRAY["35210"] = '35,山口県,35210,光市';
GSI.MUNI_ARRAY["35211"] = '35,山口県,35211,長門市';
GSI.MUNI_ARRAY["35212"] = '35,山口県,35212,柳井市';
GSI.MUNI_ARRAY["35213"] = '35,山口県,35213,美祢市';
GSI.MUNI_ARRAY["35215"] = '35,山口県,35215,周南市';
GSI.MUNI_ARRAY["35216"] = '35,山口県,35216,山陽小野田市';
GSI.MUNI_ARRAY["35305"] = '35,山口県,35305,周防大島町';
GSI.MUNI_ARRAY["35321"] = '35,山口県,35321,和木町';
GSI.MUNI_ARRAY["35341"] = '35,山口県,35341,上関町';
GSI.MUNI_ARRAY["35343"] = '35,山口県,35343,田布施町';
GSI.MUNI_ARRAY["35344"] = '35,山口県,35344,平生町';
GSI.MUNI_ARRAY["35502"] = '35,山口県,35502,阿武町';
GSI.MUNI_ARRAY["36201"] = '36,徳島県,36201,徳島市';
GSI.MUNI_ARRAY["36202"] = '36,徳島県,36202,鳴門市';
GSI.MUNI_ARRAY["36203"] = '36,徳島県,36203,小松島市';
GSI.MUNI_ARRAY["36204"] = '36,徳島県,36204,阿南市';
GSI.MUNI_ARRAY["36205"] = '36,徳島県,36205,吉野川市';
GSI.MUNI_ARRAY["36206"] = '36,徳島県,36206,阿波市';
GSI.MUNI_ARRAY["36207"] = '36,徳島県,36207,美馬市';
GSI.MUNI_ARRAY["36208"] = '36,徳島県,36208,三好市';
GSI.MUNI_ARRAY["36301"] = '36,徳島県,36301,勝浦町';
GSI.MUNI_ARRAY["36302"] = '36,徳島県,36302,上勝町';
GSI.MUNI_ARRAY["36321"] = '36,徳島県,36321,佐那河内村';
GSI.MUNI_ARRAY["36341"] = '36,徳島県,36341,石井町';
GSI.MUNI_ARRAY["36342"] = '36,徳島県,36342,神山町';
GSI.MUNI_ARRAY["36368"] = '36,徳島県,36368,那賀町';
GSI.MUNI_ARRAY["36383"] = '36,徳島県,36383,牟岐町';
GSI.MUNI_ARRAY["36387"] = '36,徳島県,36387,美波町';
GSI.MUNI_ARRAY["36388"] = '36,徳島県,36388,海陽町';
GSI.MUNI_ARRAY["36401"] = '36,徳島県,36401,松茂町';
GSI.MUNI_ARRAY["36402"] = '36,徳島県,36402,北島町';
GSI.MUNI_ARRAY["36403"] = '36,徳島県,36403,藍住町';
GSI.MUNI_ARRAY["36404"] = '36,徳島県,36404,板野町';
GSI.MUNI_ARRAY["36405"] = '36,徳島県,36405,上板町';
GSI.MUNI_ARRAY["36468"] = '36,徳島県,36468,つるぎ町';
GSI.MUNI_ARRAY["36489"] = '36,徳島県,36489,東みよし町';
GSI.MUNI_ARRAY["37201"] = '37,香川県,37201,高松市';
GSI.MUNI_ARRAY["37202"] = '37,香川県,37202,丸亀市';
GSI.MUNI_ARRAY["37203"] = '37,香川県,37203,坂出市';
GSI.MUNI_ARRAY["37204"] = '37,香川県,37204,善通寺市';
GSI.MUNI_ARRAY["37205"] = '37,香川県,37205,観音寺市';
GSI.MUNI_ARRAY["37206"] = '37,香川県,37206,さぬき市';
GSI.MUNI_ARRAY["37207"] = '37,香川県,37207,東かがわ市';
GSI.MUNI_ARRAY["37208"] = '37,香川県,37208,三豊市';
GSI.MUNI_ARRAY["37322"] = '37,香川県,37322,土庄町';
GSI.MUNI_ARRAY["37324"] = '37,香川県,37324,小豆島町';
GSI.MUNI_ARRAY["37341"] = '37,香川県,37341,三木町';
GSI.MUNI_ARRAY["37364"] = '37,香川県,37364,直島町';
GSI.MUNI_ARRAY["37386"] = '37,香川県,37386,宇多津町';
GSI.MUNI_ARRAY["37387"] = '37,香川県,37387,綾川町';
GSI.MUNI_ARRAY["37403"] = '37,香川県,37403,琴平町';
GSI.MUNI_ARRAY["37404"] = '37,香川県,37404,多度津町';
GSI.MUNI_ARRAY["37406"] = '37,香川県,37406,まんのう町';
GSI.MUNI_ARRAY["38201"] = '38,愛媛県,38201,松山市';
GSI.MUNI_ARRAY["38202"] = '38,愛媛県,38202,今治市';
GSI.MUNI_ARRAY["38203"] = '38,愛媛県,38203,宇和島市';
GSI.MUNI_ARRAY["38204"] = '38,愛媛県,38204,八幡浜市';
GSI.MUNI_ARRAY["38205"] = '38,愛媛県,38205,新居浜市';
GSI.MUNI_ARRAY["38206"] = '38,愛媛県,38206,西条市';
GSI.MUNI_ARRAY["38207"] = '38,愛媛県,38207,大洲市';
GSI.MUNI_ARRAY["38210"] = '38,愛媛県,38210,伊予市';
GSI.MUNI_ARRAY["38213"] = '38,愛媛県,38213,四国中央市';
GSI.MUNI_ARRAY["38214"] = '38,愛媛県,38214,西予市';
GSI.MUNI_ARRAY["38215"] = '38,愛媛県,38215,東温市';
GSI.MUNI_ARRAY["38356"] = '38,愛媛県,38356,上島町';
GSI.MUNI_ARRAY["38386"] = '38,愛媛県,38386,久万高原町';
GSI.MUNI_ARRAY["38401"] = '38,愛媛県,38401,松前町';
GSI.MUNI_ARRAY["38402"] = '38,愛媛県,38402,砥部町';
GSI.MUNI_ARRAY["38422"] = '38,愛媛県,38422,内子町';
GSI.MUNI_ARRAY["38442"] = '38,愛媛県,38442,伊方町';
GSI.MUNI_ARRAY["38484"] = '38,愛媛県,38484,松野町';
GSI.MUNI_ARRAY["38488"] = '38,愛媛県,38488,鬼北町';
GSI.MUNI_ARRAY["38506"] = '38,愛媛県,38506,愛南町';
GSI.MUNI_ARRAY["39201"] = '39,高知県,39201,高知市';
GSI.MUNI_ARRAY["39202"] = '39,高知県,39202,室戸市';
GSI.MUNI_ARRAY["39203"] = '39,高知県,39203,安芸市';
GSI.MUNI_ARRAY["39204"] = '39,高知県,39204,南国市';
GSI.MUNI_ARRAY["39205"] = '39,高知県,39205,土佐市';
GSI.MUNI_ARRAY["39206"] = '39,高知県,39206,須崎市';
GSI.MUNI_ARRAY["39208"] = '39,高知県,39208,宿毛市';
GSI.MUNI_ARRAY["39209"] = '39,高知県,39209,土佐清水市';
GSI.MUNI_ARRAY["39210"] = '39,高知県,39210,四万十市';
GSI.MUNI_ARRAY["39211"] = '39,高知県,39211,香南市';
GSI.MUNI_ARRAY["39212"] = '39,高知県,39212,香美市';
GSI.MUNI_ARRAY["39301"] = '39,高知県,39301,東洋町';
GSI.MUNI_ARRAY["39302"] = '39,高知県,39302,奈半利町';
GSI.MUNI_ARRAY["39303"] = '39,高知県,39303,田野町';
GSI.MUNI_ARRAY["39304"] = '39,高知県,39304,安田町';
GSI.MUNI_ARRAY["39305"] = '39,高知県,39305,北川村';
GSI.MUNI_ARRAY["39306"] = '39,高知県,39306,馬路村';
GSI.MUNI_ARRAY["39307"] = '39,高知県,39307,芸西村';
GSI.MUNI_ARRAY["39341"] = '39,高知県,39341,本山町';
GSI.MUNI_ARRAY["39344"] = '39,高知県,39344,大豊町';
GSI.MUNI_ARRAY["39363"] = '39,高知県,39363,土佐町';
GSI.MUNI_ARRAY["39364"] = '39,高知県,39364,大川村';
GSI.MUNI_ARRAY["39386"] = '39,高知県,39386,いの町';
GSI.MUNI_ARRAY["39387"] = '39,高知県,39387,仁淀川町';
GSI.MUNI_ARRAY["39401"] = '39,高知県,39401,中土佐町';
GSI.MUNI_ARRAY["39402"] = '39,高知県,39402,佐川町';
GSI.MUNI_ARRAY["39403"] = '39,高知県,39403,越知町';
GSI.MUNI_ARRAY["39405"] = '39,高知県,39405,梼原町';
GSI.MUNI_ARRAY["39410"] = '39,高知県,39410,日高村';
GSI.MUNI_ARRAY["39411"] = '39,高知県,39411,津野町';
GSI.MUNI_ARRAY["39412"] = '39,高知県,39412,四万十町';
GSI.MUNI_ARRAY["39424"] = '39,高知県,39424,大月町';
GSI.MUNI_ARRAY["39427"] = '39,高知県,39427,三原村';
GSI.MUNI_ARRAY["39428"] = '39,高知県,39428,黒潮町';
GSI.MUNI_ARRAY["40100"] = '40,福岡県,40100,北九州市';
GSI.MUNI_ARRAY["40101"] = '40,福岡県,40101,北九州市　門司区';
GSI.MUNI_ARRAY["40103"] = '40,福岡県,40103,北九州市　若松区';
GSI.MUNI_ARRAY["40105"] = '40,福岡県,40105,北九州市　戸畑区';
GSI.MUNI_ARRAY["40106"] = '40,福岡県,40106,北九州市　小倉北区';
GSI.MUNI_ARRAY["40107"] = '40,福岡県,40107,北九州市　小倉南区';
GSI.MUNI_ARRAY["40108"] = '40,福岡県,40108,北九州市　八幡東区';
GSI.MUNI_ARRAY["40109"] = '40,福岡県,40109,北九州市　八幡西区';
GSI.MUNI_ARRAY["40130"] = '40,福岡県,40130,福岡市';
GSI.MUNI_ARRAY["40131"] = '40,福岡県,40131,福岡市　東区';
GSI.MUNI_ARRAY["40132"] = '40,福岡県,40132,福岡市　博多区';
GSI.MUNI_ARRAY["40133"] = '40,福岡県,40133,福岡市　中央区';
GSI.MUNI_ARRAY["40134"] = '40,福岡県,40134,福岡市　南区';
GSI.MUNI_ARRAY["40135"] = '40,福岡県,40135,福岡市　西区';
GSI.MUNI_ARRAY["40136"] = '40,福岡県,40136,福岡市　城南区';
GSI.MUNI_ARRAY["40137"] = '40,福岡県,40137,福岡市　早良区';
GSI.MUNI_ARRAY["40202"] = '40,福岡県,40202,大牟田市';
GSI.MUNI_ARRAY["40203"] = '40,福岡県,40203,久留米市';
GSI.MUNI_ARRAY["40204"] = '40,福岡県,40204,直方市';
GSI.MUNI_ARRAY["40205"] = '40,福岡県,40205,飯塚市';
GSI.MUNI_ARRAY["40206"] = '40,福岡県,40206,田川市';
GSI.MUNI_ARRAY["40207"] = '40,福岡県,40207,柳川市';
GSI.MUNI_ARRAY["40210"] = '40,福岡県,40210,八女市';
GSI.MUNI_ARRAY["40211"] = '40,福岡県,40211,筑後市';
GSI.MUNI_ARRAY["40212"] = '40,福岡県,40212,大川市';
GSI.MUNI_ARRAY["40213"] = '40,福岡県,40213,行橋市';
GSI.MUNI_ARRAY["40214"] = '40,福岡県,40214,豊前市';
GSI.MUNI_ARRAY["40215"] = '40,福岡県,40215,中間市';
GSI.MUNI_ARRAY["40216"] = '40,福岡県,40216,小郡市';
GSI.MUNI_ARRAY["40217"] = '40,福岡県,40217,筑紫野市';
GSI.MUNI_ARRAY["40218"] = '40,福岡県,40218,春日市';
GSI.MUNI_ARRAY["40219"] = '40,福岡県,40219,大野城市';
GSI.MUNI_ARRAY["40220"] = '40,福岡県,40220,宗像市';
GSI.MUNI_ARRAY["40221"] = '40,福岡県,40221,太宰府市';
GSI.MUNI_ARRAY["40223"] = '40,福岡県,40223,古賀市';
GSI.MUNI_ARRAY["40224"] = '40,福岡県,40224,福津市';
GSI.MUNI_ARRAY["40225"] = '40,福岡県,40225,うきは市';
GSI.MUNI_ARRAY["40226"] = '40,福岡県,40226,宮若市';
GSI.MUNI_ARRAY["40227"] = '40,福岡県,40227,嘉麻市';
GSI.MUNI_ARRAY["40228"] = '40,福岡県,40228,朝倉市';
GSI.MUNI_ARRAY["40229"] = '40,福岡県,40229,みやま市';
GSI.MUNI_ARRAY["40230"] = '40,福岡県,40230,糸島市';
GSI.MUNI_ARRAY["40305"] = '40,福岡県,40305,那珂川町';
GSI.MUNI_ARRAY["40341"] = '40,福岡県,40341,宇美町';
GSI.MUNI_ARRAY["40342"] = '40,福岡県,40342,篠栗町';
GSI.MUNI_ARRAY["40343"] = '40,福岡県,40343,志免町';
GSI.MUNI_ARRAY["40344"] = '40,福岡県,40344,須恵町';
GSI.MUNI_ARRAY["40345"] = '40,福岡県,40345,新宮町';
GSI.MUNI_ARRAY["40348"] = '40,福岡県,40348,久山町';
GSI.MUNI_ARRAY["40349"] = '40,福岡県,40349,粕屋町';
GSI.MUNI_ARRAY["40381"] = '40,福岡県,40381,芦屋町';
GSI.MUNI_ARRAY["40382"] = '40,福岡県,40382,水巻町';
GSI.MUNI_ARRAY["40383"] = '40,福岡県,40383,岡垣町';
GSI.MUNI_ARRAY["40384"] = '40,福岡県,40384,遠賀町';
GSI.MUNI_ARRAY["40401"] = '40,福岡県,40401,小竹町';
GSI.MUNI_ARRAY["40402"] = '40,福岡県,40402,鞍手町';
GSI.MUNI_ARRAY["40421"] = '40,福岡県,40421,桂川町';
GSI.MUNI_ARRAY["40447"] = '40,福岡県,40447,筑前町';
GSI.MUNI_ARRAY["40448"] = '40,福岡県,40448,東峰村';
GSI.MUNI_ARRAY["40503"] = '40,福岡県,40503,大刀洗町';
GSI.MUNI_ARRAY["40522"] = '40,福岡県,40522,大木町';
GSI.MUNI_ARRAY["40544"] = '40,福岡県,40544,広川町';
GSI.MUNI_ARRAY["40601"] = '40,福岡県,40601,香春町';
GSI.MUNI_ARRAY["40602"] = '40,福岡県,40602,添田町';
GSI.MUNI_ARRAY["40604"] = '40,福岡県,40604,糸田町';
GSI.MUNI_ARRAY["40605"] = '40,福岡県,40605,川崎町';
GSI.MUNI_ARRAY["40608"] = '40,福岡県,40608,大任町';
GSI.MUNI_ARRAY["40609"] = '40,福岡県,40609,赤村';
GSI.MUNI_ARRAY["40610"] = '40,福岡県,40610,福智町';
GSI.MUNI_ARRAY["40621"] = '40,福岡県,40621,苅田町';
GSI.MUNI_ARRAY["40625"] = '40,福岡県,40625,みやこ町';
GSI.MUNI_ARRAY["40642"] = '40,福岡県,40642,吉富町';
GSI.MUNI_ARRAY["40646"] = '40,福岡県,40646,上毛町';
GSI.MUNI_ARRAY["40647"] = '40,福岡県,40647,築上町';
GSI.MUNI_ARRAY["41201"] = '41,佐賀県,41201,佐賀市';
GSI.MUNI_ARRAY["41202"] = '41,佐賀県,41202,唐津市';
GSI.MUNI_ARRAY["41203"] = '41,佐賀県,41203,鳥栖市';
GSI.MUNI_ARRAY["41204"] = '41,佐賀県,41204,多久市';
GSI.MUNI_ARRAY["41205"] = '41,佐賀県,41205,伊万里市';
GSI.MUNI_ARRAY["41206"] = '41,佐賀県,41206,武雄市';
GSI.MUNI_ARRAY["41207"] = '41,佐賀県,41207,鹿島市';
GSI.MUNI_ARRAY["41208"] = '41,佐賀県,41208,小城市';
GSI.MUNI_ARRAY["41209"] = '41,佐賀県,41209,嬉野市';
GSI.MUNI_ARRAY["41210"] = '41,佐賀県,41210,神埼市';
GSI.MUNI_ARRAY["41327"] = '41,佐賀県,41327,吉野ヶ里町';
GSI.MUNI_ARRAY["41341"] = '41,佐賀県,41341,基山町';
GSI.MUNI_ARRAY["41345"] = '41,佐賀県,41345,上峰町';
GSI.MUNI_ARRAY["41346"] = '41,佐賀県,41346,みやき町';
GSI.MUNI_ARRAY["41387"] = '41,佐賀県,41387,玄海町';
GSI.MUNI_ARRAY["41401"] = '41,佐賀県,41401,有田町';
GSI.MUNI_ARRAY["41423"] = '41,佐賀県,41423,大町町';
GSI.MUNI_ARRAY["41424"] = '41,佐賀県,41424,江北町';
GSI.MUNI_ARRAY["41425"] = '41,佐賀県,41425,白石町';
GSI.MUNI_ARRAY["41441"] = '41,佐賀県,41441,太良町';
GSI.MUNI_ARRAY["42201"] = '42,長崎県,42201,長崎市';
GSI.MUNI_ARRAY["42202"] = '42,長崎県,42202,佐世保市';
GSI.MUNI_ARRAY["42203"] = '42,長崎県,42203,島原市';
GSI.MUNI_ARRAY["42204"] = '42,長崎県,42204,諫早市';
GSI.MUNI_ARRAY["42205"] = '42,長崎県,42205,大村市';
GSI.MUNI_ARRAY["42207"] = '42,長崎県,42207,平戸市';
GSI.MUNI_ARRAY["42208"] = '42,長崎県,42208,松浦市';
GSI.MUNI_ARRAY["42209"] = '42,長崎県,42209,対馬市';
GSI.MUNI_ARRAY["42210"] = '42,長崎県,42210,壱岐市';
GSI.MUNI_ARRAY["42211"] = '42,長崎県,42211,五島市';
GSI.MUNI_ARRAY["42212"] = '42,長崎県,42212,西海市';
GSI.MUNI_ARRAY["42213"] = '42,長崎県,42213,雲仙市';
GSI.MUNI_ARRAY["42214"] = '42,長崎県,42214,南島原市';
GSI.MUNI_ARRAY["42307"] = '42,長崎県,42307,長与町';
GSI.MUNI_ARRAY["42308"] = '42,長崎県,42308,時津町';
GSI.MUNI_ARRAY["42321"] = '42,長崎県,42321,東彼杵町';
GSI.MUNI_ARRAY["42322"] = '42,長崎県,42322,川棚町';
GSI.MUNI_ARRAY["42323"] = '42,長崎県,42323,波佐見町';
GSI.MUNI_ARRAY["42383"] = '42,長崎県,42383,小値賀町';
GSI.MUNI_ARRAY["42391"] = '42,長崎県,42391,佐々町';
GSI.MUNI_ARRAY["42411"] = '42,長崎県,42411,新上五島町';
GSI.MUNI_ARRAY["43100"] = '43,熊本県,43100,熊本市';
GSI.MUNI_ARRAY["43101"] = '43,熊本県,43101,熊本市　中央区';
GSI.MUNI_ARRAY["43102"] = '43,熊本県,43102,熊本市　東区';
GSI.MUNI_ARRAY["43103"] = '43,熊本県,43103,熊本市　西区';
GSI.MUNI_ARRAY["43104"] = '43,熊本県,43104,熊本市　南区';
GSI.MUNI_ARRAY["43105"] = '43,熊本県,43105,熊本市　北区';
GSI.MUNI_ARRAY["43202"] = '43,熊本県,43202,八代市';
GSI.MUNI_ARRAY["43203"] = '43,熊本県,43203,人吉市';
GSI.MUNI_ARRAY["43204"] = '43,熊本県,43204,荒尾市';
GSI.MUNI_ARRAY["43205"] = '43,熊本県,43205,水俣市';
GSI.MUNI_ARRAY["43206"] = '43,熊本県,43206,玉名市';
GSI.MUNI_ARRAY["43208"] = '43,熊本県,43208,山鹿市';
GSI.MUNI_ARRAY["43210"] = '43,熊本県,43210,菊池市';
GSI.MUNI_ARRAY["43211"] = '43,熊本県,43211,宇土市';
GSI.MUNI_ARRAY["43212"] = '43,熊本県,43212,上天草市';
GSI.MUNI_ARRAY["43213"] = '43,熊本県,43213,宇城市';
GSI.MUNI_ARRAY["43214"] = '43,熊本県,43214,阿蘇市';
GSI.MUNI_ARRAY["43215"] = '43,熊本県,43215,天草市';
GSI.MUNI_ARRAY["43216"] = '43,熊本県,43216,合志市';
GSI.MUNI_ARRAY["43348"] = '43,熊本県,43348,美里町';
GSI.MUNI_ARRAY["43364"] = '43,熊本県,43364,玉東町';
GSI.MUNI_ARRAY["43367"] = '43,熊本県,43367,南関町';
GSI.MUNI_ARRAY["43368"] = '43,熊本県,43368,長洲町';
GSI.MUNI_ARRAY["43369"] = '43,熊本県,43369,和水町';
GSI.MUNI_ARRAY["43403"] = '43,熊本県,43403,大津町';
GSI.MUNI_ARRAY["43404"] = '43,熊本県,43404,菊陽町';
GSI.MUNI_ARRAY["43423"] = '43,熊本県,43423,南小国町';
GSI.MUNI_ARRAY["43424"] = '43,熊本県,43424,小国町';
GSI.MUNI_ARRAY["43425"] = '43,熊本県,43425,産山村';
GSI.MUNI_ARRAY["43428"] = '43,熊本県,43428,高森町';
GSI.MUNI_ARRAY["43432"] = '43,熊本県,43432,西原村';
GSI.MUNI_ARRAY["43433"] = '43,熊本県,43433,南阿蘇村';
GSI.MUNI_ARRAY["43441"] = '43,熊本県,43441,御船町';
GSI.MUNI_ARRAY["43442"] = '43,熊本県,43442,嘉島町';
GSI.MUNI_ARRAY["43443"] = '43,熊本県,43443,益城町';
GSI.MUNI_ARRAY["43444"] = '43,熊本県,43444,甲佐町';
GSI.MUNI_ARRAY["43447"] = '43,熊本県,43447,山都町';
GSI.MUNI_ARRAY["43468"] = '43,熊本県,43468,氷川町';
GSI.MUNI_ARRAY["43482"] = '43,熊本県,43482,芦北町';
GSI.MUNI_ARRAY["43484"] = '43,熊本県,43484,津奈木町';
GSI.MUNI_ARRAY["43501"] = '43,熊本県,43501,錦町';
GSI.MUNI_ARRAY["43505"] = '43,熊本県,43505,多良木町';
GSI.MUNI_ARRAY["43506"] = '43,熊本県,43506,湯前町';
GSI.MUNI_ARRAY["43507"] = '43,熊本県,43507,水上村';
GSI.MUNI_ARRAY["43510"] = '43,熊本県,43510,相良村';
GSI.MUNI_ARRAY["43511"] = '43,熊本県,43511,五木村';
GSI.MUNI_ARRAY["43512"] = '43,熊本県,43512,山江村';
GSI.MUNI_ARRAY["43513"] = '43,熊本県,43513,球磨村';
GSI.MUNI_ARRAY["43514"] = '43,熊本県,43514,あさぎり町';
GSI.MUNI_ARRAY["43531"] = '43,熊本県,43531,苓北町';
GSI.MUNI_ARRAY["44201"] = '44,大分県,44201,大分市';
GSI.MUNI_ARRAY["44202"] = '44,大分県,44202,別府市';
GSI.MUNI_ARRAY["44203"] = '44,大分県,44203,中津市';
GSI.MUNI_ARRAY["44204"] = '44,大分県,44204,日田市';
GSI.MUNI_ARRAY["44205"] = '44,大分県,44205,佐伯市';
GSI.MUNI_ARRAY["44206"] = '44,大分県,44206,臼杵市';
GSI.MUNI_ARRAY["44207"] = '44,大分県,44207,津久見市';
GSI.MUNI_ARRAY["44208"] = '44,大分県,44208,竹田市';
GSI.MUNI_ARRAY["44209"] = '44,大分県,44209,豊後高田市';
GSI.MUNI_ARRAY["44210"] = '44,大分県,44210,杵築市';
GSI.MUNI_ARRAY["44211"] = '44,大分県,44211,宇佐市';
GSI.MUNI_ARRAY["44212"] = '44,大分県,44212,豊後大野市';
GSI.MUNI_ARRAY["44213"] = '44,大分県,44213,由布市';
GSI.MUNI_ARRAY["44214"] = '44,大分県,44214,国東市';
GSI.MUNI_ARRAY["44322"] = '44,大分県,44322,姫島村';
GSI.MUNI_ARRAY["44341"] = '44,大分県,44341,日出町';
GSI.MUNI_ARRAY["44461"] = '44,大分県,44461,九重町';
GSI.MUNI_ARRAY["44462"] = '44,大分県,44462,玖珠町';
GSI.MUNI_ARRAY["45201"] = '45,宮崎県,45201,宮崎市';
GSI.MUNI_ARRAY["45202"] = '45,宮崎県,45202,都城市';
GSI.MUNI_ARRAY["45203"] = '45,宮崎県,45203,延岡市';
GSI.MUNI_ARRAY["45204"] = '45,宮崎県,45204,日南市';
GSI.MUNI_ARRAY["45205"] = '45,宮崎県,45205,小林市';
GSI.MUNI_ARRAY["45206"] = '45,宮崎県,45206,日向市';
GSI.MUNI_ARRAY["45207"] = '45,宮崎県,45207,串間市';
GSI.MUNI_ARRAY["45208"] = '45,宮崎県,45208,西都市';
GSI.MUNI_ARRAY["45209"] = '45,宮崎県,45209,えびの市';
GSI.MUNI_ARRAY["45341"] = '45,宮崎県,45341,三股町';
GSI.MUNI_ARRAY["45361"] = '45,宮崎県,45361,高原町';
GSI.MUNI_ARRAY["45382"] = '45,宮崎県,45382,国富町';
GSI.MUNI_ARRAY["45383"] = '45,宮崎県,45383,綾町';
GSI.MUNI_ARRAY["45401"] = '45,宮崎県,45401,高鍋町';
GSI.MUNI_ARRAY["45402"] = '45,宮崎県,45402,新富町';
GSI.MUNI_ARRAY["45403"] = '45,宮崎県,45403,西米良村';
GSI.MUNI_ARRAY["45404"] = '45,宮崎県,45404,木城町';
GSI.MUNI_ARRAY["45405"] = '45,宮崎県,45405,川南町';
GSI.MUNI_ARRAY["45406"] = '45,宮崎県,45406,都農町';
GSI.MUNI_ARRAY["45421"] = '45,宮崎県,45421,門川町';
GSI.MUNI_ARRAY["45429"] = '45,宮崎県,45429,諸塚村';
GSI.MUNI_ARRAY["45430"] = '45,宮崎県,45430,椎葉村';
GSI.MUNI_ARRAY["45431"] = '45,宮崎県,45431,美郷町';
GSI.MUNI_ARRAY["45441"] = '45,宮崎県,45441,高千穂町';
GSI.MUNI_ARRAY["45442"] = '45,宮崎県,45442,日之影町';
GSI.MUNI_ARRAY["45443"] = '45,宮崎県,45443,五ヶ瀬町';
GSI.MUNI_ARRAY["46201"] = '46,鹿児島県,46201,鹿児島市';
GSI.MUNI_ARRAY["46203"] = '46,鹿児島県,46203,鹿屋市';
GSI.MUNI_ARRAY["46204"] = '46,鹿児島県,46204,枕崎市';
GSI.MUNI_ARRAY["46206"] = '46,鹿児島県,46206,阿久根市';
GSI.MUNI_ARRAY["46208"] = '46,鹿児島県,46208,出水市';
GSI.MUNI_ARRAY["46210"] = '46,鹿児島県,46210,指宿市';
GSI.MUNI_ARRAY["46213"] = '46,鹿児島県,46213,西之表市';
GSI.MUNI_ARRAY["46214"] = '46,鹿児島県,46214,垂水市';
GSI.MUNI_ARRAY["46215"] = '46,鹿児島県,46215,薩摩川内市';
GSI.MUNI_ARRAY["46216"] = '46,鹿児島県,46216,日置市';
GSI.MUNI_ARRAY["46217"] = '46,鹿児島県,46217,曽於市';
GSI.MUNI_ARRAY["46218"] = '46,鹿児島県,46218,霧島市';
GSI.MUNI_ARRAY["46219"] = '46,鹿児島県,46219,いちき串木野市';
GSI.MUNI_ARRAY["46220"] = '46,鹿児島県,46220,南さつま市';
GSI.MUNI_ARRAY["46221"] = '46,鹿児島県,46221,志布志市';
GSI.MUNI_ARRAY["46222"] = '46,鹿児島県,46222,奄美市';
GSI.MUNI_ARRAY["46223"] = '46,鹿児島県,46223,南九州市';
GSI.MUNI_ARRAY["46224"] = '46,鹿児島県,46224,伊佐市';
GSI.MUNI_ARRAY["46225"] = '46,鹿児島県,46225,姶良市';
GSI.MUNI_ARRAY["46303"] = '46,鹿児島県,46303,三島村';
GSI.MUNI_ARRAY["46304"] = '46,鹿児島県,46304,十島村';
GSI.MUNI_ARRAY["46392"] = '46,鹿児島県,46392,さつま町';
GSI.MUNI_ARRAY["46404"] = '46,鹿児島県,46404,長島町';
GSI.MUNI_ARRAY["46452"] = '46,鹿児島県,46452,湧水町';
GSI.MUNI_ARRAY["46468"] = '46,鹿児島県,46468,大崎町';
GSI.MUNI_ARRAY["46482"] = '46,鹿児島県,46482,東串良町';
GSI.MUNI_ARRAY["46490"] = '46,鹿児島県,46490,錦江町';
GSI.MUNI_ARRAY["46491"] = '46,鹿児島県,46491,南大隅町';
GSI.MUNI_ARRAY["46492"] = '46,鹿児島県,46492,肝付町';
GSI.MUNI_ARRAY["46501"] = '46,鹿児島県,46501,中種子町';
GSI.MUNI_ARRAY["46502"] = '46,鹿児島県,46502,南種子町';
GSI.MUNI_ARRAY["46505"] = '46,鹿児島県,46505,屋久島町';
GSI.MUNI_ARRAY["46523"] = '46,鹿児島県,46523,大和村';
GSI.MUNI_ARRAY["46524"] = '46,鹿児島県,46524,宇検村';
GSI.MUNI_ARRAY["46525"] = '46,鹿児島県,46525,瀬戸内町';
GSI.MUNI_ARRAY["46527"] = '46,鹿児島県,46527,龍郷町';
GSI.MUNI_ARRAY["46529"] = '46,鹿児島県,46529,喜界町';
GSI.MUNI_ARRAY["46530"] = '46,鹿児島県,46530,徳之島町';
GSI.MUNI_ARRAY["46531"] = '46,鹿児島県,46531,天城町';
GSI.MUNI_ARRAY["46532"] = '46,鹿児島県,46532,伊仙町';
GSI.MUNI_ARRAY["46533"] = '46,鹿児島県,46533,和泊町';
GSI.MUNI_ARRAY["46534"] = '46,鹿児島県,46534,知名町';
GSI.MUNI_ARRAY["46535"] = '46,鹿児島県,46535,与論町';
GSI.MUNI_ARRAY["47201"] = '47,沖縄県,47201,那覇市';
GSI.MUNI_ARRAY["47205"] = '47,沖縄県,47205,宜野湾市';
GSI.MUNI_ARRAY["47207"] = '47,沖縄県,47207,石垣市';
GSI.MUNI_ARRAY["47208"] = '47,沖縄県,47208,浦添市';
GSI.MUNI_ARRAY["47209"] = '47,沖縄県,47209,名護市';
GSI.MUNI_ARRAY["47210"] = '47,沖縄県,47210,糸満市';
GSI.MUNI_ARRAY["47211"] = '47,沖縄県,47211,沖縄市';
GSI.MUNI_ARRAY["47212"] = '47,沖縄県,47212,豊見城市';
GSI.MUNI_ARRAY["47213"] = '47,沖縄県,47213,うるま市';
GSI.MUNI_ARRAY["47214"] = '47,沖縄県,47214,宮古島市';
GSI.MUNI_ARRAY["47215"] = '47,沖縄県,47215,南城市';
GSI.MUNI_ARRAY["47301"] = '47,沖縄県,47301,国頭村';
GSI.MUNI_ARRAY["47302"] = '47,沖縄県,47302,大宜味村';
GSI.MUNI_ARRAY["47303"] = '47,沖縄県,47303,東村';
GSI.MUNI_ARRAY["47306"] = '47,沖縄県,47306,今帰仁村';
GSI.MUNI_ARRAY["47308"] = '47,沖縄県,47308,本部町';
GSI.MUNI_ARRAY["47311"] = '47,沖縄県,47311,恩納村';
GSI.MUNI_ARRAY["47313"] = '47,沖縄県,47313,宜野座村';
GSI.MUNI_ARRAY["47314"] = '47,沖縄県,47314,金武町';
GSI.MUNI_ARRAY["47315"] = '47,沖縄県,47315,伊江村';
GSI.MUNI_ARRAY["47324"] = '47,沖縄県,47324,読谷村';
GSI.MUNI_ARRAY["47325"] = '47,沖縄県,47325,嘉手納町';
GSI.MUNI_ARRAY["47326"] = '47,沖縄県,47326,北谷町';
GSI.MUNI_ARRAY["47327"] = '47,沖縄県,47327,北中城村';
GSI.MUNI_ARRAY["47328"] = '47,沖縄県,47328,中城村';
GSI.MUNI_ARRAY["47329"] = '47,沖縄県,47329,西原町';
GSI.MUNI_ARRAY["47348"] = '47,沖縄県,47348,与那原町';
GSI.MUNI_ARRAY["47350"] = '47,沖縄県,47350,南風原町';
GSI.MUNI_ARRAY["47353"] = '47,沖縄県,47353,渡嘉敷村';
GSI.MUNI_ARRAY["47354"] = '47,沖縄県,47354,座間味村';
GSI.MUNI_ARRAY["47355"] = '47,沖縄県,47355,粟国村';
GSI.MUNI_ARRAY["47356"] = '47,沖縄県,47356,渡名喜村';
GSI.MUNI_ARRAY["47357"] = '47,沖縄県,47357,南大東村';
GSI.MUNI_ARRAY["47358"] = '47,沖縄県,47358,北大東村';
GSI.MUNI_ARRAY["47359"] = '47,沖縄県,47359,伊平屋村';
GSI.MUNI_ARRAY["47360"] = '47,沖縄県,47360,伊是名村';
GSI.MUNI_ARRAY["47361"] = '47,沖縄県,47361,久米島町';
GSI.MUNI_ARRAY["47362"] = '47,沖縄県,47362,八重瀬町';
GSI.MUNI_ARRAY["47375"] = '47,沖縄県,47375,多良間村';
GSI.MUNI_ARRAY["47381"] = '47,沖縄県,47381,竹富町';
GSI.MUNI_ARRAY["47382"] = '47,沖縄県,47382,与那国町';


/************************************************************************
 Proj4js
 ************************************************************************/
Proj4js.defs["EPSG:3097"] = "+proj=utm +zone=51 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";		    //UTM Zone51
Proj4js.defs["EPSG:3098"] = "+proj=utm +zone=52 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";		    //UTM Zone52
Proj4js.defs["EPSG:3099"] = "+proj=utm +zone=53 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";		    //UTM Zone53
Proj4js.defs["EPSG:3100"] = "+proj=utm +zone=54 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";		    //UTM Zone54
Proj4js.defs["EPSG:3101"] = "+proj=utm +zone=55 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";		    //UTM Zone55
Proj4js.defs["SR-ORG:1235"] = "+proj=utm +zone=56 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";	    //UTM Zone56
Proj4js.defs['EPSG:4301'] = "+proj=longlat +ellps=bessel +towgs84=-146.336,506.832,680.254,0,0,0,0 +no_defs";	//日本測地系（経緯度座標）



GSI.GLOBALS.isBaseLayer = function( info ) {
	var isBase = false;
	for (var baseIndex=0; baseIndex<CONFIG.BASETILES.length; baseIndex++)
	{
		if ( CONFIG.BASETILES[baseIndex].id == info.id )
		{
			isBase = true;
		}
	}
	return isBase;
};





var GLOBE = {};



/************************************************************************
 GSI.Utils
 ************************************************************************/
GSI.Utils = {};
GSI.Utils.convertIconURL = function( url )
{
	url = url.replace(/cyberjapandata.gsi.go.jp/, "maps.gsi.go.jp");

	return url;
};

GSI.Utils.encodeHTML = function( src)
{
	src = src.replace( /&/g , '&amp;' );
	src = src.replace( /</g , '&lt;' );
	src = src.replace( />/g , '&gt;' );
	return src;
};

GSI.Utils.getInternetExplorerVersion = function (){
	var rv = -1;
	if (navigator.appName == 'Microsoft Internet Explorer'){
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
		rv = parseFloat( RegExp.$1 );
	}
	else if (navigator.appName == 'Netscape'){
		var ua = navigator.userAgent;
		var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
		rv = parseFloat( RegExp.$1 );
	}
	return rv;
};

GSI.Utils.Browser = {};
GSI.Utils.Browser.userAgent = window.navigator.userAgent.toLowerCase();

if (typeof document.documentElement.style.maxHeight != "undefined") {

	var ieVersion= GSI.Utils.getInternetExplorerVersion();

	if (ieVersion < 1 ){
	// IE 以外
	}else {
	// IE8 以降
		GSI.Utils.Browser.ie = true;
		GSI.Utils.Browser.version = ieVersion;
	}
} else {
	// IE 6.0 以下

	GSI.Utils.Browser.ie = true;
	GSI.Utils.Browser.version = 6;
}

GSI.Utils.Browser.isiPhone = GSI.Utils.Browser.userAgent.indexOf('iphone') >= 0;
GSI.Utils.Browser.isiPod = GSI.Utils.Browser.userAgent.indexOf('ipod') >= 0;
GSI.Utils.Browser.isiPad = GSI.Utils.Browser.userAgent.indexOf('ipad') >= 0;
GSI.Utils.Browser.isiOS = (GSI.Utils.Browser.isiPhone || GSI.Utils.Browser.isiPod || GSI.Utils.Browser.isiPad);
GSI.Utils.Browser.isAndroid = GSI.Utils.Browser.userAgent.indexOf('android') >= 0;
GSI.Utils.Browser.isSmartMobile = ( GSI.Utils.Browser.isiOS || GSI.Utils.Browser.isAndroid );
GSI.Utils.Browser.isChrome = GSI.Utils.Browser.userAgent.indexOf('chrome') != -1;

GSI.Utils.hasFileAPI =( window.File && window.FileReader && window.FileList && window.Blob );

GSI.Utils.Browser.TouchDevice = function(){
    var f = false;
    if(GSI.Utils.Browser.isiPhone     ||
       GSI.Utils.Browser.isiPod       ||
       GSI.Utils.Browser.isiPad       ||
       GSI.Utils.Browser.isiOS        ||
       GSI.Utils.Browser.isAndroid    ||
       GSI.Utils.Browser.isSmartMobile
    ){
        f = true;
    }
    return f;
};

GSI.Utils.getCurrentID = function() {
	var id = 1;
	if ( !GSI.Utils._currentID )
	{
		GSI.Utils._currentID = 1;
	}
	id = GSI.Utils._currentID;
	GSI.Utils._currentID++;
	return id;
};

GSI.Utils.isLocalUrl = function(url) {

	if ( ( GSI.ClientMode .baseUrl && GSI.ClientMode .baseUrl != '' ) || url.match(/(http|https):\/\/.+/) )
	{
		return false;
	}
	else
	{
		return true;
	}
};

GSI.Utils.flashPlayerVersion = null;

GSI.Utils.canUseFlashPlayer = function()
{
	if ( GSI.Utils.flashPlayerVersion == null )
	{
		GSI.Utils.flashPlayerVersion = GSI.Utils.getFlashPlayerVersion();

	}
	return ( GSI.Utils.flashPlayerVersion > 0 );
};

GSI.Utils.getFlashPlayerVersion = function()
{
	var result = 0;
	if(navigator.plugins && navigator.mimeTypes['application/x-shockwave-flash']){
		var plugin = navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin;
		if(plugin){
			result = parseInt(plugin.description.match(/\d+\.\d+/));
		}
	} else {
		try{
			var flashOCX = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").match(/([0-9]+)/);
			if(flashOCX){
				result = parseInt(flashOCX[0]);
			}
		}catch(e){}
	}
	if(result <= 6){
		result = 0;
	}
	return result;
};

GSI.Utils.getCurrentPath = function()
{
	var _location = ( GSI.ClientMode .location ? GSI.ClientMode .location : location );
	var port = _location.port;
	var pathName = _location.pathname;

	if ( pathName.length <= 0 || pathName.charAt( 0 ) != '/' )
		pathName = '/' + pathName;

	return _location.protocol + '//' +
		( _location.host ? _location.host: _location.hostname ) +
		pathName;

};

GSI.Utils.getTimeStampString = function() {
	var now = new Date();

	var year = now.getFullYear(); // 年
	var month = now.getMonth() + 1; // 月
	var day = now.getDate(); // 日
	var hour = now.getHours(); // 時
	var min = now.getMinutes(); // 分
	var sec = now.getSeconds(); // 秒
	var msec = now.getMilliseconds(); // ミリ秒
	var result =
		year + '' +
		( '00' + month ).slice(-2)  +
		( '00' + day ).slice(-2) +
		( '00' + hour ).slice(-2) +
		( '00' + min ).slice(-2) +
		( '00' + sec ).slice(-2) +
		msec ;
	return result;
};

GSI.Utils.getScreenSize = function() {
	return {
		w : window.innerWidth ? window.innerWidth: $(window).width(),
		h : window.innerHeight ? window.innerHeight: $(window).height()
	};
};

GSI.Utils.world2Japan = function(latLng){
	var worldLonLat = new Proj4js.Proj('EPSG:4326');
	var japanLonLat = new Proj4js.Proj('EPSG:4301');
	var worldP = new Proj4js.Point(latLng.lng,latLng.lat);
	var japanP = Proj4js.transform(worldLonLat,japanLonLat,worldP);
	return {x:japanP.x, y:japanP.y}
};


GSI.Utils.latLngToDMS = function(latLng) {
	
	var latLng = { lat : latLng.lat, lng : latLng.lng};
	var latMinus = ( latLng.lat < 0 ? -1 : 1 );
	var lngMinus = ( latLng.lng < 0 ? -1 : 1 );
	
	latLng.lat = Math.abs( latLng.lat);
	latLng.lng = Math.abs( latLng.lng);
	
	var latD = Math.floor(latLng.lat);
	var latM = Math.floor( ( latLng.lat - latD ) * 60 );
	var latS = (latLng.lat-latD-(latM/60))*3600;

	if(latS==60){latS=0; latM=latM+1;};
	if(latM==60){latM=0; latD=latD+1;};

	var lngD = Math.floor(latLng.lng);
	var lngM = Math.floor( ( latLng.lng - lngD ) * 60 );
	var lngS = (latLng.lng-lngD-(lngM/60))*3600;

	if(lngS==60){lngS=0; lngM=lngM+1;};
	if(lngM==60){lngM=0; lngD=lngD+1;};

	return {
		lat : {
			d : latD, m:latM, s: latS
		},
		lng : {
			d : lngD, m:lngM, s: lngS
		}
	};
};

// 磁北線を表示できる範囲内かどうかを返す
GSI.Utils.isVaridVariation = function(latLng)
{
	//経度：122度～154度
	//緯度：20度～46度
	return !( latLng.lat < 20 || latLng.lat > 46 || latLng.lng <122 || latLng.lng >154 );
}

// 指定緯度経度の偏角を算出し、角度を返す
GSI.Utils.getVariation = function(latLng)
{
	var px = latLng.lng;
	var py = latLng.lat;

	//経緯度座標(10進数)を小数点以下6桁に丸める
	px = px * 1000000;
	px = parseInt(px);
	px = px / 1000000;
	py = py * 1000000;
	py = parseInt(py);
	py = py / 1000000;

	//西偏角計算
	var KEE = px - 138;
	var KNN = py - 37;
	var KKK = (7+40.585/60) + (19.003/60) * KNN - (6.265 / 60) * KEE + (0.009 / 60) * KNN * KNN + (0.024 / 60) * KNN * KEE - (0.591 / 60) * KEE * KEE;

	return KKK;
};

GSI.Utils.ConverUnit = function(map, shape, radius, unit_src, unit_to)
{
    if(unit_src == "px" && unit_to == "m" ){
        var r_radius = radius;
        var r_latlng = shape.getLatLng();
        var p        = map.latLngToContainerPoint(r_latlng);
        var p_to_x   = p.x;
        var p_to_y   = p.y;
        p_to_x += r_radius;

        var r_latlng_to = map.containerPointToLatLng( MA.point( p_to_x, p_to_y ) );
        var r           = r_latlng.distanceTo(r_latlng_to);

        radius = r;
    }

    if(unit_src == "m"  && unit_to == "px"){ 
        var r_latlng = shape.getBounds();
        var n_p = map.latLngToContainerPoint(r_latlng._northEast);
        var s_p = map.latLngToContainerPoint(r_latlng._southWest);

        var r   = Math.floor((n_p.x - s_p.x) * 0.5);

        radius = r;
    }
    return radius;
};

GSI.Utils.Cookie = MA.Class.extend( {
	
	_config : {
		defaults : {}
	},
	initialize : function () {},
	_encode : function(s)
	{
		return this._config.raw ? s : encodeURIComponent(s);
	},
	_decode : function (s) 
	{
		return this._config.raw ? s : decodeURIComponent(s);
	},
	_stringifyCookieValue : function(value) 
	{
		return this._encode(this._config.json ? JSON.stringify(value) : String(value));
	},
	_parseCookieValue : function (s)
	{
		if (s.indexOf('"') === 0) {
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			var pluses = /\+/g;
			s = decodeURIComponent(s.replace(pluses, ' '));
			return this._config.json ? JSON.parse(s) : s;
		} catch(e) {}
	},
	_read : function(s, converter) 
	{
		//var value = this._config.raw ? s : this._parseCookieValue(s);
		return this._config.raw ? s : this._parseCookieValue(s);
	},
	get : function( key )
	{
		var result = key ? undefined : {};
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) 
		{
			var parts = cookies[i].split('=');
			var name = this._decode(parts.shift());
			var cookie = parts.join('=');
			if (key && key === name) {
				result = this._read(cookie);
				break;
			}

			if (!key && (cookie = this._read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	},
	set : function(key, value, options)
	{
		options = $.extend({}, this._config.defaults, options);

		if (typeof options.expires === 'number') {
			var hours = options.expires, t = options.expires = new Date();
			t.setTime(+t + hours * 1000 * 60 * 60 );// 
		}

		return (document.cookie = [
			this._encode(key), '=', this._stringifyCookieValue(value),
			options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
			options.path    ? '; path=' + options.path : '',
			options.domain  ? '; domain=' + options.domain : '',
			options.secure  ? '; secure' : ''
		].join(''));
	

	},
	remove : function (key, options)
	{
		if (this.get(key) === undefined) 
		{
			return false;
		}

		this.set(key, '', $.extend({}, options, { expires: -1 }));
		return !this.get(key);
	}
} );

GSI.Utils.sendSelectedLayer = function(id){
    $.ajax({
        type : "GET",
        data : id,
        url : "../layers_txt/anchor.txt",
        datatype : "text",
        cache : false,
    });
};


/************************************************************************
 クラス
 ************************************************************************/

/************************************************************************
 - GSI.Dialog
 ************************************************************************/
GSI.Dialog = MA.Class.extend( {
	options : {
		containerClass : 'gsi_dialog',
		headerClass : 'gsi_dialog_header',
		contentClass : 'gsi_dialog_content',
		effect : null,
		top : 0,
		left : 0,
		width : 300,
		resizable : ""
	},
	_userResized : false,
	initialize : function( options )
	{
		options = MA.setOptions(this, options);

		if ( !GSI.Dialog._dialogManager )GSI.Dialog._dialogManager = new GSI.DialogManager();

		GSI.Dialog._dialogManager.append( this );
		this.create();

		if ( options.visible )
			this.show();
	},
	isResizable : function()
	{
		return ( this.options.resizable && this.options.resizable != '' ? true : false );
	},
	createHeader : function()
	{
		return $('<span>').html('　　　　　　　' );
	},
	createContent : function()
	{
		return $( '<div>' ).html('　　　　　　　');
	},
	create : function()
	{
		if ( this.container ) return;
		this.container = $( '<div>' ).addClass( this.options.containerClass );
		this.headerFrame = $( '<div>' ).addClass( this.options.headerClass );
		this.contentFrame = $( '<div>' ).addClass( this.options.contentClass );

		this.closeBtn = $( '<a>' ).html( '×' ).attr({'href':'javascript:void(0);'}).addClass( 'closebtn' );

		this.headerTitle = $( '<div>' ).addClass( 'title' );
		this.headerFrame.append(this.headerTitle );
		this.headerFrame.append( this.closeBtn );
		this.headerTitle.append(this.createHeader() );

		this.contentFrame.append( this.createContent());

		this.container.append( this.headerFrame );
		this.container.append( this.contentFrame );

		$( document.body).append( this.container );

		this.container.draggable({
			delay : 100,
			scroll: false,
			handle : this.headerFrame,
			stop : MA.bind( function() { GSI.Dialog._dialogManager.adjust( this ); }, this )
		})
		.on( 'mousedown', MA.bind( this.onClick, this ) )
		.on( 'touchstart', MA.bind( this.onClick, this ) );

		if ( this.options.width )
		{
			this.container.css( {width:this.options.width } );
		}
		this.closeBtn.click( MA.bind( function(){ this.hide(true);}, this ) );
		this.container.hide();

		var left = this.options.left;
		if ( left == 'center' )
		{
			var screenSize = GSI.Utils.getScreenSize();
			left = Math.floor( (screenSize.w/2)-( parseInt(this.options.width) / 2 ) );
		}

		this.container .css( {
			left : left + 'px' ,
			top : this.options.top + 'px',
			width : this.options.width + 'px',
			"min-width" : "80px",
			height: 'auto'
		} );

		if ( this.isResizable() )
		{
			this.container.resizable({
				resize : MA.bind( function() {
					this._onResize();
					this._userResized = true;
				},this ),
				handles: this.options.resizable
			});
		}
	},
	css : function( css )
	{
		if ( this.container ) this.container.css( css );
	},
	_onResize : function() {},
	addClass : function( className )
	{
		if ( this.container ) this.container.addClass( className );
	},
	removeClass : function( className )
	{
		if ( this.container ) this.container.removeClass( className );
	},
	show : function(noActivate)
	{
		if ( !this.container ) this.create();

		GSI.Dialog._dialogManager.appendVisibleList( this, noActivate );
		if ( this.options.effect )
		{
			this.container.show(this.options.effect.animation, this.options.effect.option,this.options.effect.speed,
				MA.bind( function() { if ( this.afterShow ) this.afterShow(); }, this )
				);
		}
		else
		{
			this.container.show(MA.bind( function() { if ( this.afterShow ) this.afterShow(); }, this ));
		}
	},
	hide : function()
	{
		GSI.Dialog._dialogManager.removeVisibleList( this );

		if ( this.options.effect )
		{
			this.container.hide(this.options.effect.animation, this.options.effect.option,this.options.effect.speed);
		}
		else
		{
			this.container.hide();
		}
	},
	setMaxScrollHeight : function( maxHeight ) {},
	getVisible : function()
	{
		return( this.container && this.container.is(':visible') ? true : false );
	},
	onClick : function ()
	{
		GSI.Dialog._dialogManager.activate( this );
	}
} );



/************************************************************************
 - GSI.DialogManager
 ************************************************************************/
GSI.DialogManager = MA.Class.extend( {
	dialogList : [],
	visibleList : [],
	initialize : function() {},
	append : function( dlg )
	{
		this.dialogList.push( dlg );
	},
	appendVisibleList : function( dlg, noActivate )
	{
		for ( var i=0; i<this.visibleList.length; i++ )
		{
			var d = this.visibleList[i];
			if ( d == dlg )
			{
				if ( noActivate ) return;
				this.visibleList.splice( i,1 );
				break;
			}
		}

		if ( !dlg._originalDialog ) this.adjust( dlg );
		if ( noActivate && this.visibleList.length > 0)
		{
			this.visibleList.splice( this.visibleList.length-1, 0, dlg );
		}
		else
			this.visibleList.push( dlg );
		this.refreshZIndex();

		if ( !this._onWindowResize )
		{
			this._onWindowResize = MA.bind( this.onWindowResize, this );
			$( window ).on( 'resize', this._onWindowResize );
		}
	},
	removeVisibleList : function( dlg )
	{
		for ( var i=0; i<this.visibleList.length; i++ )
		{
			var d = this.visibleList[i];
			if ( d == dlg )
			{
				this.visibleList.splice( i,1 );
				break;
			}
		}
		this.refreshZIndex();

		if ( this.visibleList.length <= 0 )
		{
			if ( this._onWindowResize )
			{
				$( window ).off( 'resize', this._onWindowResize );
				this._onWindowResize = null;
			}
		}
	},
	activate : function( dlg )
	{
		this.appendVisibleList( dlg );
	},
	refreshZIndex : function()
	{
		var zIndex = 10000;
		var dlgIndex = -1;
		var idx = 1;

		for ( var i=0; i<this.visibleList.length-1; i++ )
		{
			var opacity = 0.6 + ( 0.4 / this.visibleList.length * idx );
			var container = this.visibleList[i];
			if ( !container.css ) container = container.container;
			container.css({'z-index':zIndex, opacity: opacity} );
			container.addClass( "deactive");
			
			zIndex++;
			idx++;
		}

		if ( this.visibleList.length > 0 )
		{
			
			var container = this.visibleList[this.visibleList.length - 1];
			if ( !container.css ) container = container.container;
			container.css({'z-index':zIndex, opacity: 0.95} );
			
			container = this.visibleList[i];
			if ( !container.css ) container = container.container;
			container.removeClass( "deactive");
		}
	},
	adjust : function( d, windowSize )
	{
		if ( !windowSize ) windowSize = GSI.Utils.getScreenSize();

		var visible = d.container.is( ':visible' );
		if (  !visible )
		{
			d.container.css( { 'visibility' : 'hidden' } );
			d.container.show();
		}

		var offset = d.container.offset();
		var width = d.container.outerWidth(true);
		var height = d.container.outerHeight(true);
		var left = null;
		var top = null;

		// width
		if ( !d.isResizable() )
		{
			if ( windowSize.h > windowSize.w )
			{
				var newWidth = Math.floor( windowSize.w * 0.9 );
				if ( d.options.width > newWidth )
				{
					d.container.css( { "max-width" : newWidth } );
					width = newWidth;
				}
				else
				{
					d.container.css( { "max-width" : d.options.width } );
					width =d.options.width;
				}
			}
			else
			{
				var newWidth = Math.floor( windowSize.w * 0.6 );
				if ( d.options.width > newWidth )
				{
					d.container.css( { "max-width" : newWidth } );
					width = newWidth;
				}
				else
				{
					d.container.css( { "max-width" : d.options.width } );
					width =d.options.width;
				}
			}
		}

		// height
		if ( !d._userResized )
		{
			if ( windowSize.h > windowSize.w )
			{
				d.setMaxScrollHeight( Math.floor( windowSize.h * 0.4 )  );
			}
			else
			{
				d.setMaxScrollHeight( Math.floor( windowSize.h * 0.65 ) );
			}
		}

		//left
		if ( offset.left > windowSize.w - ( width / 2 ) )
		{
			left = (windowSize.w - ( width / 2 )) ;
		}

		if ( offset.left <= -( width / 2 ) )
		{
			left =  -Math.floor( width / 2 );
			d.container.css( {left: -Math.floor( width / 2 ) + 'px'} );
		}

		if ( left != null )
		{
			d.container.css( {left: left + 'px'} );
		}

		//top
		if ( offset.top > windowSize.h - ( height / 2 ) )
		{
			top = (windowSize.h - ( height / 2 )) ;
		}

		if ( offset.top < 0 )
		{
			top = 0;
		}

		if ( top != null )
		{
			d.container.css( {top: top + 'px'} );
		}

		if ( !visible )
		{
			d.container.hide();
			d.container.css( { 'visibility' : 'visible' } );
		}
	},
	onWindowResize : function()
	{
		var windowSize = GSI.Utils.getScreenSize();
		for ( var i=0; i<this.visibleList.length; i++ )
		{
			var d = this.visibleList[i];
			if ( !d._originalDialog ) this.adjust( d,windowSize );
		}
	},
	isVisibleDialog : function( dlg ){
		for ( var i=0; i<this.visibleList.length; i++ )
		{
			var d = this.visibleList[i];
			if ( d == dlg )
			{
				return true;
			}
		}
		return false;
	}
} );


/************************************************************************
 GSI.UTM
 ************************************************************************/
GSI.UTM = {};

GSI.UTM.Utils = {

	PROJ_WORLD : new Proj4js.Proj('EPSG:4326'),
	lng2Zone : function( lng )
	{
		return Math.floor(lng/6) + 31;
	},
	zone2Lng : function( zone )
	{
		return ( zone - 31 ) * 6;
	},
	getUTMDefName : function( zone)
	{
		var defName = '';

		if ( !zone ) return defName;
		switch( zone + '' )
		{
			case '51':
				defName = 'EPSG:3097';
				break;
			case '52':
				defName = 'EPSG:3098';
				break;
			case '53':
				defName = 'EPSG:3099';
				break;
			case '54':
				defName = 'EPSG:3100';
				break;
			case '55':
				defName = 'EPSG:3101';
				break;
			case '56':
				defName = 'SR-ORG:1235';
				break;
		}
		return defName;
	},
	getUTMMark : function ( lat )
	{
		var mark ='';
		if(lat >= 16 && lat < 24) {
			mark = "Q";
		} else if(lat >= 24 && lat < 32) {
			mark = "R";
		} else if(lat >= 32 && lat < 40) {
			mark = "S";
		} else if(lat >= 40 && lat < 48) {
			mark = "T";
		} else if(lat >= 48 && lat < 56) {
			mark = "U";
		}
		return mark;
	},
	_parseUSNGText : function (s)
	{
		var result = {};
		var j = 0;
		var k;
		var usngStr = [];
		var usngStr_temp = []

		usngStr_temp = s.toUpperCase()

		var regexp = /%20/g
		usngStr = usngStr_temp.replace(regexp,"")
		regexp = / /g
		usngStr = usngStr_temp.replace(regexp,"")

		if (usngStr.length < 7) {
		  return null;
		}

		result.zone = usngStr.charAt(j++)*10 + usngStr.charAt(j++)*1;
		result.mylet = usngStr.charAt(j++)
		result.sq1 = usngStr.charAt(j++)
		result.sq2 = usngStr.charAt(j++)

		result.precision = (usngStr.length-j) / 2;
		result.east='';
		result.north='';
		for (var k=0; k<result.precision; k++)
		{
		   result.east += usngStr.charAt(j++)
		}

		if (usngStr[j] == " ") { j++ }
		for (var k=0; k<result.precision; k++)
		{
		   result.north += usngStr.charAt(j++)
		}
		
		return result;
	},
	_USNGtoUTM : function (zone,mylet,sq1,sq2,east,north)
	{ 
		var result = {};
		
		//Starts (southern edge) of N-S zones in millons of meters
		var zoneBase = [1.1,2.0,2.9,3.8,4.7,5.6,6.5,7.3,8.2,9.1,   0, 0.8, 1.7, 2.6, 3.5, 4.4, 5.3, 6.2, 7.0, 7.9];

		var segBase = [0,2,2,2,4,4,6,6,8,8,   0,0,0,2,2,4,4,6,6,6];  //Starts of 2 million meter segments, indexed by zone 
		
		// convert easting to UTM
		var eSqrs="ABCDEFGHJKLMNPQRSTUVWXYZ".indexOf(sq1);          
		var appxEast=1+eSqrs%8; 

		// convert northing to UTM
		var letNorth = "CDEFGHJKLMNPQRSTUVWX".indexOf(mylet);
		if (zone%2)  //odd number zone
		var nSqrs="ABCDEFGHJKLMNPQRSTUV".indexOf(sq2) 
		else        // even number zone
		var nSqrs="FGHJKLMNPQRSTUVABCDE".indexOf(sq2); 

		var zoneStart = zoneBase[letNorth];
		var appxNorth = Number(segBase[letNorth])+nSqrs/10;
		if ( appxNorth < zoneStart)
		   appxNorth += 2; 	  

		result.N=appxNorth*1000000+Number(north)*Math.pow(10,5-north.length);
		result.E=appxEast*100000+Number(east)*Math.pow(10,5-east.length)
		result.zone=zone;
		result.letter=mylet;

		return result;
	},
	_UTMtoLL : function (UTMNorthing, UTMEasting, UTMZoneNumber, ret)
	{
		var EASTING_OFFSET  = 500000.0;   // (meters)
		var NORTHING_OFFSET = 10000000.0; // (meters)
		var k0 = 0.9996;
		var EQUATORIAL_RADIUS    = 6378137.0; // GRS80 ellipsoid (meters)
		var ECC_SQUARED = 0.006694380023;
		var ECC_PRIME_SQUARED = ECC_SQUARED / (1 - ECC_SQUARED);
		var E1 = (1 - Math.sqrt(1 - ECC_SQUARED)) / (1 + Math.sqrt(1 - ECC_SQUARED));
		var RAD_2_DEG   = 180.0 / Math.PI;
		
		// remove 500,000 meter offset for longitude
		var xUTM = parseFloat(UTMEasting) - EASTING_OFFSET; 
		var yUTM = parseFloat(UTMNorthing);
		var zoneNumber = parseInt(UTMZoneNumber);

		// origin longitude for the zone (+3 puts origin in zone center) 
		var lonOrigin = (zoneNumber - 1) * 6 - 180 + 3; 

		// M is the "true distance along the central meridian from the Equator to phi
		// (latitude)
		var M = yUTM / k0;
		var mu = M / ( EQUATORIAL_RADIUS * (1 - ECC_SQUARED / 4 - 3 * ECC_SQUARED * 
		              ECC_SQUARED / 64 - 5 * ECC_SQUARED * ECC_SQUARED * ECC_SQUARED / 256 ));

		// phi1 is the "footprint latitude" or the latitude at the central meridian which
		// has the same y coordinate as that of the point (phi (lat), lambda (lon) ).
		var phi1Rad = mu + (3 * E1 / 2 - 27 * E1 * E1 * E1 / 32 ) * Math.sin( 2 * mu) 
		             + ( 21 * E1 * E1 / 16 - 55 * E1 * E1 * E1 * E1 / 32) * Math.sin( 4 * mu)
		             + (151 * E1 * E1 * E1 / 96) * Math.sin(6 * mu);
		var phi1 = phi1Rad * RAD_2_DEG;

		// Terms used in the conversion equations
		var N1 = EQUATORIAL_RADIUS / Math.sqrt( 1 - ECC_SQUARED * Math.sin(phi1Rad) * 
		          Math.sin(phi1Rad));
		var T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
		var C1 = ECC_PRIME_SQUARED * Math.cos(phi1Rad) * Math.cos(phi1Rad);
		var R1 = EQUATORIAL_RADIUS * (1 - ECC_SQUARED) / Math.pow(1 - ECC_SQUARED * 
		            Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
		var D = xUTM / (N1 * k0);

		// Calculate latitude, in decimal degrees
		var lat = phi1Rad - ( N1 * Math.tan(phi1Rad) / R1) * (D * D / 2 - (5 + 3 * T1 + 10
		    * C1 - 4 * C1 * C1 - 9 * ECC_PRIME_SQUARED) * D * D * D * D / 24 + (61 + 90 * 
		      T1 + 298 * C1 + 45 * T1 * T1 - 252 * ECC_PRIME_SQUARED - 3 * C1 * C1) * D * D *
		      D * D * D * D / 720);
		lat = lat * RAD_2_DEG;

		// Calculate longitude, in decimal degrees
		var lng = (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 * 
		        C1 * C1 + 8 * ECC_PRIME_SQUARED + 24 * T1 * T1) * D * D * D * D * D / 120) /
		        Math.cos(phi1Rad);

		lng = lonOrigin + lng * RAD_2_DEG;
		return L.latLng(lat, lng);
	},
	point2LatLng : function( s )
	{
		var latLng = null;
		try
		{
			var usngp = this._parseUSNGText(s,usngp);
			if ( !usngp ) return null;
			var coords = this._USNGtoUTM(usngp.zone,usngp.mylet,usngp.sq1,usngp.sq2,usngp.east,usngp.north) 
			
			if (usngp.mylet < 'N') 
			{
				coords.N -= NORTHING_OFFSET
			}

			latLng = this._UTMtoLL(coords.N, coords.E, usngp.zone)
		}
		catch( e )
		{
			latLng = null;
		}
		return latLng;
	},
	latlng2PointName : function(lat, lng)
	{
		var zone = GSI.UTM.Utils.lng2Zone( lng );
		var defName = GSI.UTM.Utils.getUTMDefName( zone );

		if ( defName == '' ) return '';

		var projUTM = new Proj4js.Proj(defName);
		var latLngPoint = new Proj4js.Point( lng,lat );
		var utmPoint = Proj4js.transform(GSI.UTM.Utils.PROJ_WORLD,projUTM,latLngPoint);

		return GSI.UTM.Utils.getUTMPointName(
			zone,
			GSI.UTM.Utils.getUTMMark( lat ),
			utmPoint.x,
			utmPoint.y,
			4
		);
	},
	getUTMPointName : function( zone, mark, x, y, num, hideNumber)
	{

		var x10mNumber = '';
		var y10mNumber = '';
		if ( !hideNumber && x && y )
		{
			var zero = '';
			for ( var i=0; i<num; i++ )
			{
				zero += '0';
			}

			x10mNumber = zero + Math.floor( x /10 );
			x10mNumber = x10mNumber.substr(x10mNumber.length - num, num);
			y10mNumber = zero + Math.floor( y /10 );
			y10mNumber = y10mNumber.substr(y10mNumber.length - num, num);
		}
		
		var letters = GSI.UTM.Utils.findGridLetters(zone, Math.floor( y /10 ) * 10, Math.floor( x /10 ) * 10);
		return zone + mark + letters + x10mNumber + y10mNumber;
	},
	findSet : function(zoneNum)
	{
		zoneNum = parseInt(zoneNum);
		zoneNum = zoneNum % 6;
		switch (zoneNum) {

		case 0:
			return 6;
			break;

		case 1:
			return 1;
			break;

		case 2:
			return 2;
			break;

		case 3:
			return 3;
			break;

		case 4:
			return 4;
			break;

		case 5:
			return 5;
			break;

		default:
			return -1;
			break;
		}
	},
	BLOCK_SIZE : 100000,
	GRIDSQUARE_SET_ROW_SIZE : 20,
	GRIDSQUARE_SET_COL_SIZE : 8,

	findGridLetters : function (zoneNum, northing, easting)
	{
		zoneNum  = parseInt(zoneNum);
		northing = parseFloat(northing);
		easting  = parseFloat(easting);
		row = 1;

		// northing coordinate to single-meter precision
		north_1m = Math.round(northing);

		// Get the row position for the square identifier that contains the point
		while (north_1m >= GSI.UTM.Utils.BLOCK_SIZE) {
			north_1m = north_1m - GSI.UTM.Utils.BLOCK_SIZE;
			row++;
		}

		// cycle repeats (wraps) after 20 rows
		row = row % GSI.UTM.Utils.GRIDSQUARE_SET_ROW_SIZE;
		col = 0;

		// easting coordinate to single-meter precision
		east_1m = Math.round(easting);

		// Get the column position for the square identifier that contains the point
		while (east_1m >= GSI.UTM.Utils.BLOCK_SIZE){
			east_1m = east_1m - GSI.UTM.Utils.BLOCK_SIZE;
			col++;
		}

		// cycle repeats (wraps) after 8 columns
		col = col % GSI.UTM.Utils.GRIDSQUARE_SET_COL_SIZE;

		return GSI.UTM.Utils.lettersHelper(GSI.UTM.Utils.findSet(zoneNum), row, col);
	},
	lettersHelper : function (set, row, col)
	{
		// handle case of last row
		if (row == 0) {
			row = GSI.UTM.Utils.GRIDSQUARE_SET_ROW_SIZE - 1;
		}
		else {
			row--;
		}

		if (col == 0) {
			col = GSI.UTM.Utils.GRIDSQUARE_SET_COL_SIZE - 1;
		}
		else {
			col--;
		}

		switch(set) {

		case 1:
			l1="ABCDEFGH";              // column ids
			l2="ABCDEFGHJKLMNPQRSTUV";  // row ids
			return l1.charAt(col) + l2.charAt(row);
			break;

		case 2:
			l1="JKLMNPQR";
			l2="FGHJKLMNPQRSTUVABCDE";
			return l1.charAt(col) + l2.charAt(row);
			break;

		case 3:
			l1="STUVWXYZ";
			l2="ABCDEFGHJKLMNPQRSTUV";
			return l1.charAt(col) + l2.charAt(row);
			break;

		case 4:
			l1="ABCDEFGH";
			l2="FGHJKLMNPQRSTUVABCDE";
			return l1.charAt(col) + l2.charAt(row);
			break;

		case 5:
			l1="JKLMNPQR";
			l2="ABCDEFGHJKLMNPQRSTUV";
			return l1.charAt(col) + l2.charAt(row);
			break;

		case 6:
			l1="STUVWXYZ";
			l2="FGHJKLMNPQRSTUVABCDE";
			return l1.charAt(col) + l2.charAt(row);
			break;
		}
	}
};

GLOBE.CLASS = {};


/***** ダイアログ *****/
GLOBE.CLASS.DIALOG = function( elementId )
{
	this._initialize(elementId);
};
GLOBE.CLASS.DIALOG.prototype = 
{
	id: null,
	container: null,
	headerFrame: null,
	headerTitle: null,
	closeBtn: null,
	contentFrame: null,
	
	containerClass : 'gsi_dialog',
	headerClass : 'gsi_dialog_header',
	contentClass : 'gsi_dialog_content',
	
	defaultTop   : '50px',
	defaultLeft  : '10px',
	defaultRight : '',
	
	resizable : true,
	draggable : true,
	
	// ダイアログを作成する
	_initialize: function(elementId)
	{
		this._originalDialog = true;
		this.id = elementId;
		
		if ( !GSI.Dialog._dialogManager )GSI.Dialog._dialogManager = new GSI.DialogManager();

		GSI.Dialog._dialogManager.append( this );
		
	},
	
	createDialog: function()
	{
		this._createDialogHeader();
		this._createDialogContent();
		
		this.container = $('<div></div>')
			.attr('id', this.id)
			.addClass(this.containerClass)
			.append(this.headerFrame)
			.append(this.contentFrame)
			.on('mousedown touchstart', this.onActive.bind(this))
			.css({
				'display': 'none',
				'position': 'absolute',
				'overflow': 'hidden'
			});
		
		if ( this.defaultTop )    this.container.css('top', this.defaultTop);
		if ( this.defaultLeft )   this.container.css('left', this.defaultLeft);
		if ( this.defaultRight )  this.container.css('right', this.defaultRight);
		if ( this.defaultBottom ) this.container.css('bottom', this.defaultBottom);
		
		if ( this.resizable )
		{
			this.container.resizable({
				handles: 'all',
				containment: 'document',
				minWidth : 88,
				minHeight: 88,
				resize: function(e, elm){
					this.onResize();
				}.bind(this)
			});
		}
		if ( this.draggable )
		{
			this.container.draggable({
				scroll: false,
				handle: this.headerFrame,
				start: function(){
					this.onDragStart();
				}.bind(this),
				stop: function(){
					this.onDragStop();
					this.adjustPosition();
				}.bind(this)
			});
			
			$(window).on('resize', function(){
				this.adjustPosition();
			}.bind(this));
		}
		
		$(document.body).append(this.container);
	},
	
	// ダイアログヘッダを作成して返す（内部関数）
	_createDialogHeader: function()
	{
		this.headerFrame = $('<div></div>').addClass(this.headerClass);
		
		this.headerTitle = $('<div></div>').addClass('title');
		this.closeBtn = $('<a href="javascript:void(0);">×</a>')
			.addClass('closebtn')
			.on('click', function(){
				this.onBeforeClose();
				this.hide();
				this.onAfterClose();
			}.bind(this));
		
		var $cont = $('<div>　　　</div>');
		this.headerTitle.append($cont);
		
		this.headerFrame.append(this.headerTitle);
		this.headerFrame.append(this.closeBtn);
	},
	
	// ダイアログコンテンツを作成して返す（内部関数）
	_createDialogContent: function()
	{
		this.contentFrame = $('<div></div>').addClass(this.contentClass);
		
		var $cont = $('<div>　　　</div>');
		this.contentFrame.append($cont);
	},
	
	// ダイアログヘッダを書き込む
	setDialogHeader: function( $element )
	{
		var $header = (!$element ? $('<div>　</div>') : $element);
		this.headerTitle.empty().append($header);
	},
	
	// ダイアログコンテンツを書き込む（引数はjQueryObject）
	setDialogContent: function( $element )
	{
		this.contentFrame.empty().append($element);
	},
	
	// 位置修正
	adjustPosition: function()
	{
		if (this.container.offset().top < 0 )  //上
		{
			this.container.animate({'top': '0px'}, 100);
		}
		else if ( this.container.offset().top > $(window).height()-30 )  //下
		{
			this.container.animate({'top': ($(window).height()-30) + 'px'}, 100);
		}
		
		if ( this.container.offset().left < this.container.outerWidth(true) / -2 )  //左
		{
			this.container.animate({'left': (this.container.outerWidth(true) / -2) + 'px'}, 100);
		}
		else if ( this.container.offset().left > $(window).width()-(this.container.outerWidth(true) / 2) )  //右
		{
			this.container.animate({'left': ($(window).width()-(this.container.outerWidth(true) / 2)) + 'px'}, 100);
		}
	},
	
	// ダイアログを表示する
	show: function()
	{
		
		GSI.Dialog._dialogManager.appendVisibleList( this );
		this.onBeforeShow();
		this.container.show(300, function(){
			this.onAfterShow();
		}.bind(this));
		//this.onActive();
	},
	
	// ダイアログを非表示にする
	hide: function()
	{
		GSI.Dialog._dialogManager.removeVisibleList( this );
		this.container.hide(300);
	},
	
	
	// ダイアログがアクティブになった時
	onActive: function()
	{
		//GLOBE.DIALOGMANAGER.activeIs(this.id)
		GSI.Dialog._dialogManager.activate( this );
	},
	
	///// 設定可能イベント
	
	// ドラッグ開始時
	onDragStart: function(){},
	
	// ドラッグ終了時
	onDragStop: function(){},
	
	// サイズ変更時
	onResize: function(){},
	
	// ダイアログを開く直前
	onBeforeShow: function(){},
	
	// ダイアログを開いた直後
	onAfterShow: function(){},
	
	// ダイアログを閉じる直前
	onBeforeClose: function(){},
	
	// ダイアログを閉じた直後
	onAfterClose:  function(){}
};


/************************************************************************
 メニューボタン
 ************************************************************************/

GLOBE.MENU = {};


/***** 機能ボタン *****/
GLOBE.MENU.FUNC = {
	container: null,
	
	options:{
		zIndex   : 15000,
		position : 'right',
		visible  : true,
		getCheckState : function( defaultState)
		{
			return defaultState;
		},
		rootEffect      : CONFIG.EFFECTS.MENU.ROOT,
		otherEffect     : CONFIG.EFFECTS.MENU.OTHER,
		onMenuItemClick : function(id)
		{
			switch ( id )
			{
			case 'file_read':
				GLOBE.DIALOG.FILEREAD.show();
				break;
			case 'height_power':
				GLOBE.DIALOG.HEIGHTPOWER.show();
				break;
		    case 'share_link':
		    	GLOBE.DIALOG.GETLINK.show();
		    	break;
			}
		}
	},
	
	map: null,
	rootItem: {},
	
	create: function()
	{
		this.map = $('#cesiumContainer');
		
		this.initialize( CONFIG.FUNCMENU );
	},
	
	onBtnClick: function(event)
	{
		this.container.append('<div>追加</div>');
	},
	
	initialize : function ( treeConfig )
	{
		this.initializeTree( treeConfig );
		this.map.on( 'mousedown', function(){ this.hide(); }.bind(this) );
		this.map.on( 'touchstart', function(){ this.hide(); }.bind(this) );
		$( window ).on( 'resize', function(){ this.hide(true); }.bind(this) );
	},
	
	initializeTree : function(treeConfig)
	{
		// トップボタン生成
		var elem = $( '<a>' )
			.attr( { 'href' : 'javascript:void(0);'} )
			.html( treeConfig.title )
			.addClass( 'menu_btn' )
			.attr( 'id', 'menu_func' )
			.click( this.onItemClick.bind(this) );
			
		$(document.body).append(elem);

		this.rootItem = {
			elem : elem,
			children : [],
			depth : 0
		};

		elem.data( { 'data' : this.rootItem } );

		this.initializeTreeItems( this.rootItem, treeConfig, 1);
	},
	
	initializeTreeItems : function( parent, treeConfig, depth  )
	{
		if ( treeConfig.children && treeConfig.children.length > 0  )
		{
			var ul = $( '<ul>' )
				.addClass( 'menu_item_frame' )
				.css( {'z-index' : this.options.zIndex  + depth   } )
				.hide();

			if ( treeConfig.childrenWidth )
			{
				ul.css( {width: treeConfig.childrenWidth+ 'px'} );
			}

			for ( var i=0; i<treeConfig.children.length; i++ )
			{

				var childConfig = treeConfig.children[i];
				if( !childConfig ) continue;
				if ( childConfig.checkCondition && !childConfig.checkCondition() ) continue;
				var li = $( '<li>' );
				var item = {};

				if ( childConfig.typeA && childConfig.typeA == 'check' )
				{
					
				}
				else
				{
					// 通常
					var a = $( '<a>' )
						.attr( { 'href' : 'javascript:void(0);'} )
						.html( childConfig.title )
						.click( this.onItemClick.bind(this) );

					if ( childConfig.arrow )
					{
						a.addClass( "arrow" );
						a.addClass( this.options.position );
					}
					else if ( childConfig.right )
					{
						a.addClass( "right" );
					}

					item = {
						elem : a,
						id : childConfig.id,
						children : [],
						depth : depth,
						parent :parent,
						href : childConfig.href
					};

					a.data( { 'data' : item } );
					parent.children.push( item );
					li.append( a );
				}
				ul.append( li );
				parent.childrenFrame = ul;

				this.initializeTreeItems( item, childConfig,depth + 1 );
			}

			$( document.body).append( ul );
		}
	},
	
	hideChildren : function(info, noEffect)
	{
		if ( info.childrenFrame )
		{
			if ( noEffect )
			{
				info.childrenFrame.hide();
			}
			else
			{
				if ( info.depth <= 0  )
				{
					this.showChildFrame( info.childrenFrame, true, {"direction": "up"}, true );
				}
				else
				{
					this.showChildFrame( info.childrenFrame, false, {"origin": ["top", "right"]}, true );
				}
			}
		}

		if (info.children)
		{
			for ( var i=0; i<info.children.length; i++ )
			{
				this.hideChildren( info.children[i],noEffect );

			}
		}
	},
	
	_fireOnShow : function()
	{
		
	},
	
	showChildFrame : function(elem, isRoot, option, isHide)
	{
		var effect = ( isRoot  ? this.options.rootEffect : this.options.otherEffect );
		if ( effect )
		{
			if ( !effect.option ) effect.option = {};

			if ( option )
			{
				for( var key in option )
				{
					effect.option[ key ] = option[key];
				}
			}

			if ( !isHide )
			{
				elem.show(effect.animation, effect.option, effect.speed);
				this._fireOnShow();
			}
			else
				elem.hide(effect.animation, effect.option, effect.speed);
		}
		else
		{
			if ( !isHide )
			{
				elem.show();
				this._fireOnShow();
			}
			else
			{
				elem.hide();
			}
		}
	},
	
	onItemClick : function( event )
	{
		var target =  event.currentTarget;
		var info = $( target ).data( 'data' );
		var windowSize = GSI.Utils.getScreenSize();

		if ( info.parent )
		{
			if ( info.parent.children )
			{
				for ( var i=0;i<info.parent.children.length;i++ )
					this.hideChildren( info.parent.children[i] );
			}
		}
		if ( info && info.childrenFrame )
		{
			if ( info.childrenFrame.is( ':visible' ) )
			{
				this.hideChildren( info );
			}
			else
			{
				var pos = $(target).offset();
				if ( info.depth >= 1 )
				{
					pos.top += Math.floor( $(target).outerHeight(true ) / 2 );
				}
				else
				{
					pos.top += Math.floor( $(target).outerHeight(true )+2 );
				}

				info.childrenFrame.css( { 'visibility' : 'hidden' } ).show();
				var frameHeight = info.childrenFrame.outerHeight(true );
				var frameWidth = info.childrenFrame.outerWidth(true );
				info.childrenFrame.css( { 'visibility' : 'visible' } ).hide();

				if ( pos.top + frameHeight > windowSize.h )
				{
					pos.top -= ( pos.top + frameHeight - windowSize.h );
					if ( pos.top < 0 ) pos.top = 0;
				}

				if ( this.options.position == "left" )
				{
					if ( pos.top + frameHeight > windowSize.h )
					{
						pos.top -= ( pos.top + frameHeight - windowSize.h );
						if ( pos.top < 0 ) pos.top = 0;
					}

					if ( info.depth >= 1 )
					{
						pos.left+= Math.floor( $(target).outerWidth(true ) -30 );
					}
					info.childrenFrame
						.css({
							left : pos.left + 'px',
							top  : pos.top + 'px'
						} );

					if ( info.depth <= 0  )
					{
						this.showChildFrame( info.childrenFrame, true, {direction:'up'} );
					}
					else
					{
						this.showChildFrame( info.childrenFrame, false, { origin : ["top", "left"] } );
					}
				}
				else
				{
					if ( info.depth >= 1 )
					{
						pos.left -= frameWidth - 30;
					}
					else
					{
						pos.left += Math.floor( $(target).outerWidth(true ));
						pos.left -= frameWidth;
					}
					if ( pos.left < 0 ) pos.left = 0;

					info.childrenFrame
					.css({
						left : pos.left + 'px',
						top  : pos.top + 'px'
					} );

					if ( info.depth <= 0  )
					{
						this.showChildFrame( info.childrenFrame, true, {direction:'up'} );
					}
					else
					{
						this.showChildFrame( info.childrenFrame, false, { origin : ["top", "right"] } );
					}
				}
			}
		}
		else if ( info )
		{
			if ( info.href && info.href != '' )
			{
				this.openLink( info.href );
			}
			if ( this.options.onMenuItemClick )
			{
				this.options.onMenuItemClick(info.id);
			}
			this.hide();
		}
	},
		
	hide : function(noEffect)
	{
		this.hideChildren( this.rootItem, noEffect );
	},
	
	openLink : function( url )
	{
		GLOBE.MAP.currents.zoomlevel = GLOBE.MAP.getCurrentZoom();
		var currents = GLOBE.MAP.currents;
		var centerLatLng = GLOBE.MAP.getCenterPosition(true);
		var u = '';
		
		switch ( url )
		{
			case 'gsi2d':
				u  = 'https://maps.gsi.go.jp/'
					+ '#' + currents.zoomlevel
					+ '/' + centerLatLng[0]
					+ '/' + centerLatLng[1]
					+ '/&base=' + currents.basemap
					+ (currents.baseGray ? '&base_grayscale=1' : '')
					+ '&ls=' + encodeURIComponent(currents.layers)
					+ '&disp=' + currents.layersShow;
				break;
			case 'gsi3d':
				var layers = currents.layers.split('|');
				var show   = currents.layersShow;
				var showlayers = [];
				for ( var i=0; i<layers.length; i++ )
				{
					if ( show.length > i && show.charAt(i) == '1' )
					{
						showlayers.push( layers[i] );
					}
				}
				
				u  = 'https://maps.gsi.go.jp/index_3d.html'
					+ '?z=' + currents.zoomlevel
					+ '&lat=' + centerLatLng[0]
					+ '&lon=' + centerLatLng[1]
					+ '&pxsize=2048'
					+ (currents.baseGray ? '&base_grayscale=1' : '')
					+ '&ls=' + encodeURIComponent(showlayers.join('|'))
					+ '#&a=' + currents.heightPower;
				break;
		}
		
		if ( u )
		{
			window.open( u, 'GSIMAPS' );
		}
	}
};


/***** 情報ボタン *****/
GLOBE.MENU.INFO = {
	container: null,
	
	create: function()
	{
		this.container = $('<div>情報</div>')
			.addClass('menu_btn')
			.attr({
				'id': 'map_menu',
				'title': '情報ボタン'
			})
			.on('click', this.onClick.bind(this))
			.appendTo(document.body);
	},
	
	onClick: function()
	{
			GSI.GLOBALS.viewListDialog.show();
			GSI.GLOBALS.layerTreeDialog.show();
	}
};

/***** カメラリセットボタン *****/
GLOBE.MENU.CAMERARESET = {
	container: null,
	
	create: function()
	{
		this.container = $('<div>視点<br>リセット</div>')
			.addClass('menu_btn')
			.attr({
				'id': 'camera_reset',
				'title': '既定の視点位置へ'
			})
			.on('click', this.onClick.bind(this))
			.appendTo(document.body);
	},
	
	onClick: function()
	{
		GLOBE.MAP.flyToDefault();
	}
};


/************************************************************************
GSI.COCOTileLayer
 ************************************************************************/
GSI.COCOTileLayer = MA.Class.extend({
	includes: MA.Mixin.Events,
	visible : true,
	options: {
		minZoom: 0,
		maxZoom: 18,
		tileSize: 256,
		errorTileUrl: '',
		zoomOffset: 0,
		refreshInterval: 1000
	},
	initialize: function (map, url, options) {
		this.map = map;
		options = MA.setOptions(this, options);
		this.visible = options.visible;
	},
	getVisible : function()
	{
		return this.visible;
	},
	setVisible : function( on)
	{
		
	},
	refresh : function()
	{
		if ( this.visible )
		{
			
		}
	},
	_reset: function (e) {},
	_moveend : function() {},
	_movestart : function() {
		this._reset();
	},
	_timerRefresh : function() {
		this._update();
	},
	_update : function() {
		if ( this.refreshTimerId )
		{
			clearTimeout( this.refreshTimerId );
			this.refreshTimerId = null;
		}

		if (!this._map) { return; }

		var map = this._map,
		    bounds = this.map.getPixelBounds(),
		    zoom = this.map.getZoom(),
		    tileSize = this._getTileSize();

		if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
			return;
		}

		var tileBounds = L.bounds(
		        bounds.min.divideBy(tileSize)._floor(),
		        bounds.max.divideBy(tileSize)._floor());

		this._addTilesFromCenterOut(tileBounds);

	},
	_getTileSize: function () {
		var map = this._map,
		    zoom = this.map.getZoom() + this.options.zoomOffset,
		    zoomN = this.options.maxNativeZoom,
		    tileSize = this.options.tileSize;

		if (zoomN && zoom > zoomN) {
			tileSize = Math.round(this.map.getZoomScale(zoom) / this.map.getZoomScale(zoomN) * tileSize);
		}

		return tileSize;
	},
	_tileShouldBeLoaded: function (tilePoint) {
		if ((tilePoint.x + ':' + tilePoint.y) in this._tiles) {
			return false; // already loaded
		}

		var options = this.options;

		if (!options.continuousWorld) {
			var limit = this._getWrapTileNum();

			// don't load if exceeds world bounds
			if ((options.noWrap && (tilePoint.x < 0 || tilePoint.x >= limit.x)) ||
				tilePoint.y < 0 || tilePoint.y >= limit.y) { return false; }
		}

		if (options.bounds) {
			var tileSize = options.tileSize,
			    nwPoint = tilePoint.multiplyBy(tileSize),
			    sePoint = nwPoint.add([tileSize, tileSize]),
			    nw = this._map.unproject(nwPoint),
			    se = this._map.unproject(sePoint);

			// TODO temporary hack, will be removed after refactoring projections
			// https://github.com/Leaflet/Leaflet/issues/1618
			if (!options.continuousWorld && !options.noWrap) {
				nw = nw.wrap();
				se = se.wrap();
			}

			if (!options.bounds.intersects([nw, se])) { return false; }
		}
		return true;
	},
	_addTilesFromCenterOut: function (bounds) {
		var queue = [],
		    center = bounds.getCenter();

		var j, i, point;

		for (j = bounds.min.y; j <= bounds.max.y; j++) {
			for (i = bounds.min.x; i <= bounds.max.x; i++) {
				point = new L.Point(i, j);

				if (this._tileShouldBeLoaded(point)) {
					queue.push(point);
				}
			}
		}

		var tilesToLoad = queue.length;

		if (tilesToLoad === 0) { return; }

		queue.sort(function (a, b) {
			return a.distanceTo(center) - b.distanceTo(center);
		});

		this._tilesToLoad += tilesToLoad;

		for (i = 0; i < tilesToLoad; i++) {
			this._addTile(queue[i]);
		}

		this.fire('loadstart', null );
	},
	_getTilePos: function (tilePoint) {
		var origin = this._map.getPixelOrigin(),
		    tileSize = this._getTileSize();

		return tilePoint.multiplyBy(tileSize).subtract(origin);
	},
	_addTile: function (tilePoint) {
		var tilePos = this._getTilePos(tilePoint);

		var tile = {};//this._getTile();
		this._tiles[tilePoint.x + ':' + tilePoint.y] = tile;
		this._loadTile(tile, tilePoint);
	},
	_resetTile: function (/*tile*/) {},
	_adjustTilePoint: function (tilePoint) {

		var limit = this._getWrapTileNum();

		if (!this.options.continuousWorld && !this.options.noWrap) {
			tilePoint.x = ((tilePoint.x % limit.x) + limit.x) % limit.x;
		}

		if (this.options.tms) {
			tilePoint.y = limit.y - tilePoint.y - 1;
		}

		tilePoint.z = this._getZoomForUrl();
	},
	_getZoomForUrl: function () {

		var options = this.options,
		    zoom = this._map.getZoom();

		if (options.zoomReverse) {
			zoom = options.maxZoom - zoom;
		}

		zoom += options.zoomOffset;
		return options.maxNativeZoom ? Math.min(zoom, options.maxNativeZoom) : zoom;
	},
	_getWrapTileNum: function () {
		var crs = this._map.options.crs,
		    size = crs.getSize(this._map.getZoom());
		return size.divideBy(this._getTileSize())._floor();
	},
	getTileUrl: function (url, tilePoint) {
		return L.Util.template(url, L.extend({
			z: tilePoint.z,
			x: tilePoint.x,
			y: tilePoint.y
		}, this.options));
	},
	_loadTile: function (tile, tilePoint) {
		this._adjustTilePoint(tilePoint);
        
        this._loadTileAjax(this._url.concat(), tile, tilePoint);
	},
	_loadTileAjax: function (url, tile, tilePoint){
        if(url.length != 0){
		    tile.src = this.getTileUrl(url[0], tilePoint);
		    tile.ajax = $.ajax({
			    url: tile.src,
			    cache: CONFIG.LOADCOCOTILECACHE,
			    crossDomain : true,
			    success : L.Util.bind( this._tileLoaded  , this, url, tile, tilePoint),
			  //error   : L.Util.bind( this._tileLoaded_Error  , this, url, tile, tilePoint),
                complete: L.Util.bind( this._tileLoaded_Complete, this, url, tile, tilePoint)
		    });
        }
	},
	_tileLoaded : function(url, tile, tilePoint){
		if ( tile.ajax )
		{
			var lines = tile.ajax.responseText.split( "\n" );
			if ( lines.length > 0 )
			{

				var line = lines[ 0 ];
				var ids = line.split( ',' );

				for ( var i=0; i< ids.length; i ++ )
				{
					var tileId = ids[ i ];
					this._haveTiles[ tileId ] = true;
				}
			}
		}
	},
	_tileLoaded_Complete : function(url, tile, tilePoint){
		if ( tile.ajax )
		{
            var ret = false;
            if(url.length > 0){
                url.shift();
                if(url.length > 0){
                    this._loadTileAjax(url, tile, tilePoint);
                    ret = true;
                }
            }

            if(!ret){
			    tile.ajax = null;
            }
        }

        tile.loaded = true;
        var n = 0;
		for ( var id in this._tiles )
		{
            n++;
			var tile = this._tiles[ id ];
			if ( tile.ajax || !tile.loaded )
			{
				return;
			}
		}

		if ( this.options.onLoad ) this.options.onLoad( this._haveTiles );

        if(this.refreshTimerId_load){
            clearTimeout(this.refreshTimerId_load);
            this.refreshTimerId_load = null;
        }

        if(n == 0){
            return;
        }

        var that = this;
		this.refreshTimerId_load =  setTimeout(
            function(){
                that.refreshTimerId_load = null;
		        that.fire('load', { tileIds : that._haveTiles } );
            }
        , 100 );

    }
} );


/************************************************************************
 検索フォーム
 ************************************************************************/

GLOBE.SEARCHFORM = {
	QUERY_NONE : 9,
	QUERY_LATLNG : 2,
	QUERY_LATLNG2 : 3,
	QUERY_UTMPOINT : 5,
	QUERY_QUERY : 4,
	QUERY_EXCHANGE : 7,
	QUERY_LATLNGNE : 8,
	
	formSelector: '#search_f',
	querySelector: '#query',
	magnifySelector: '#magnifyimage',
	
	query: '',
	chimeiAjax: null,
	dialog: null,
	
	// このオブジェクトを活性化（最初に呼ぶ）
	create: function()
	{
		this.dialog = GLOBE.DIALOG.SEARCH;
		$(this.formSelector).on( 'submit', this.onSubmit.bind(this) );
		$(this.magnifySelector).on( 'click', this.onSubmit.bind(this) );
	},
	
	// イベント：検索フォームの送信時
	onSubmit: function( event )
	{
		event.preventDefault();
		
		var query = $( this.querySelector ).val();
		if ( $.trim(query) == '' ) return;
		
		GLOBE.MAP.clearPinLayers("SEARCH");
		
		var qType = this.checkQuery(query);
		
		if ( qType == this.QUERY_QUERY )
		{
			this.searchStart( query );
		}
		else
		{
			this.clearSearch();
			this.dialog.hide();
			if ( qType == this.QUERY_LATLNG  || qType == this.QUERY_LATLNG2)
			{
				var latLng = ( qType == this.QUERY_LATLNG ? this.parseLatLngText( query ) : this.parseLatLngText2( query ) );

				if ( latLng[0] > 90 || latLng[0] < -90 || latLng[1] > 180 || latLng[1] < -180 )
				{
					alert( '緯度経度を正しく入力して下さい\n' +
						'緯度:' + latLng[0] + ' 経度:' + latLng[1] );
				}
				else
				{
					this.setView( latLng );
				}
			}
			else if ( qType == this.QUERY_UTMPOINT )
			{
				var latLng = GSI.UTM.Utils.point2LatLng( query );
				
				if ( latLng )
				{
					this.setView( [ latLng.lat, latLng.lng ] );
				}
				else
				{
					alert( 'UTMポイントを正しく入力して下さい' );
				}
			}
			else if ( qType == this.QUERY_EXCHANGE )
			{
				var latLng = this.parseLatLngText3( query );
				
				if (!latLng)
				{
					alert( '緯度経度を正しく入力して下さい\n');
				}
				else if ( latLng[0] > 90 || latLng[0] < -90 || latLng[1] > 180 || latLng[1] < -180 )
				{
					alert( '緯度経度を正しく入力して下さい\n' +
						'緯度:' + latLng[0] + ' 経度:' + latLng[1] );
				}
				else
				{
					this.setView( latLng );
				}
			}
			else if ( qType == this.QUERY_LATLNGNE )
			{
				var latLng = this.parseLatLngText4( query );

				if (!latLng)
				{
					alert( '緯度経度を正しく入力して下さい\n');
				}
				else if ( latLng[0] > 90 || latLng[0] < -90 || latLng[1] > 180 || latLng[1] < -180 )
				{
					alert( '緯度経度を正しく入力して下さい\n' +
						'緯度:' + latLng[0] + ' 経度:' + latLng[1] );
				}
				else
				{
					this.setView( latLng );
				}
			}
		}
		
		this.query = query;
		
		return false;
	},
	
	setView: function( latLng )
	{
		this.getDemPng( latLng );
	},
	
	clearSearch : function()
	{
		if ( this.chimeiAjax )
		{
			try{ this.chimeiAjax.abort(); } catch(e){}
			this.chimeiAjax = null;
		}
		this.dialog.clear();
	},
	
	searchStart : function( q )
	{
		this.clearSearch();
		this.dialog.show();
		this.chimeiAjax = this.searchChimei( q, "","" );
	},
	
	searchChimei : function (q, pref, muni)
	{
		var constraint = '';
		var url = CONFIG.SERVERAPI.CHIMEI_SEARCH;
		var parameter = { "q" : q };

		return $.ajax({
			type: "GET",
			url:url,
			data: parameter,
			dataType: "json",
			timeout: 30000,
			success: this.setChimeiRusult.bind(this),
			error:function(){
			}
		});
	},
	
	setChimeiRusult : function(json)
	{
		this.dialog.setChimeiResult( json );
	},
	
	// 検索タイプを判定。判定結果を返す。
	checkQuery : function( q )
	{
		q = $.trim(q);
		q = q.replace( ',', ' ' );

		if (q == '')
		{
			return this.QUERY_NONE;
		}
		else if ( q.length == 13
			&& q.substring(0, 2).match(/^[0-9]+$/)
			&& q.substring(2, 4).match(/^[A-Z]+$/)
			&& q.substring(5, 13).match(/^[0-9]+$/) )
		{
			return this.QUERY_UTMPOINT;
		}
		else if( q.match(/^(-|\+)*[0-9]+(\.[0-9]+)*\s+(-|\+)*[0-9]+(\.[0-9]+)*$/)  )
		{
			return this.QUERY_LATLNG;
		}
		else if ( q.match(/^(-|\+)*[0-9]+度[\s]+(-|\+)*[0-9]+度$/)
			||
			 q.match(/^(-|\+)*[0-9]+度[0-9]+分[\s]+(-|\+)*[0-9]+度[0-9]+分$/)
			||
			 q.match(/^(-|\+)*[0-9]+度[0-9]+分[0-9]+(\.[0-9]+)*秒[\s]+(-|\+)*[0-9]+度[0-9]+分[0-9]+(\.[0-9]+)*秒$/)
		)
		{
			return this.QUERY_LATLNG2;
		}
		else
		{
			if ( ( q.match(/^(?:N|S|北緯|南緯|-|\+)*([0-9]{1,3}(?:\.[0-9]+)*)(?:,|\s)(?:E|W|東経|西経|-|\+)*([0-9]{1,3}(?:\.[0-9]+)*)/) )
				||
				( q.match(/^(?:E|W|東経|西経|-|\+)*([0-9]{1,3}(?:\.[0-9]+)*)(?:,|\s)(?:N|S|北緯|南緯|-|\+)*([0-9]{1,3}(?:\.[0-9]+)*)/) ) )
			{
				//NE表記
				return this.QUERY_LATLNGNE;
			}
			else if ( ( q.match(/^(?:N|S|北緯|南緯|-|\+)*([0-9]{1,3}[度°])([0-9]{1,2}['分′])*([0-9]{1,2}(?:\.[0-9]+)*[秒″\"])*(?:,|\s)(?:E|W|東経|西経|-|\+)*([0-9]{1,3}[度°])([0-9]{1,2}['分′])*([0-9]{1,2}(?:\.[0-9]+)*[秒″\"])*$/) )
			 		|| 
			 		( q.match(/^(?:E|W|東経|西経|-|\+)*([0-9]{1,3}[度°])([0-9]{1,2}['分′])*([0-9]{1,2}(?:\.[0-9]+)*[秒″\"])*(?:,|\s)(?:N|S|北緯|南緯|-|\+)*([0-9]{1,3}[度°])([0-9]{1,2}['分′])*([0-9]{1,2}(?:\.[0-9]+)*[秒″\"])*$/) ) )
			{
				//°′″表記
				return this.QUERY_EXCHANGE;
			}
			else
			{
				return this.QUERY_QUERY;
			}
		}
	},
	
	parseLatLngText2 : function( s )
	{
		s = $.trim(s);
		s = s.replace( ',', ' ' );
		var latwSign;
		var lngwSign;
		var matchArr =  s.match( /^(-|\+)*([0-9]+)度[\s]+(-|\+)*([0-9]+)度$/ );

		if ( matchArr && matchArr.length > 0 )
		{
			var lat = parseInt( (matchArr[1] ? matchArr[1] : "") + matchArr[2] );
			var lng = parseInt( (matchArr[3] ? matchArr[3] : "") + matchArr[4] );
			return [ lat, lng ];
		}

		matchArr = s.match(/^(-|\+)*([0-9]+)度([0-9]+)分[\s]+(-|\+)*([0-9]+)度([0-9]+)分$/);

		if ( matchArr && matchArr.length > 0 )
		{
			latwSign = (matchArr[1] && matchArr[1] == "-"? -1 : 1);
			lngwSign = (matchArr[4] && matchArr[4] == "-"? -1 : 1);
			var lat = parseInt( matchArr[2] ) + ( parseFloat( matchArr[3] ) / 60.0 );
			var lng = parseInt( matchArr[5] ) + ( parseFloat( matchArr[6] ) / 60.0 );

			lat = lat * latwSign;
			lng = lng * lngwSign;
			return [ lat, lng ];
		}

		matchArr = s.match(/^(-|\+)*([0-9]+)度([0-9]+)分([0-9]+)秒[\s]+(-|\+)*([0-9]+)度([0-9]+)分([0-9]+)秒$/);

		if ( matchArr && matchArr.length > 0 )
		{
			latwSign = (matchArr[1] && matchArr[1] == "-"? -1 : 1);
			lngwSign = (matchArr[5] && matchArr[5] == "-"? -1 : 1);
			var lat = parseInt( matchArr[2] ) + ( parseFloat( matchArr[3] ) / 60.0 ) + ( parseFloat( matchArr[4] ) / 3600.0 );
			var lng = parseInt( matchArr[6] ) + ( parseFloat( matchArr[7] ) / 60.0 ) + ( parseFloat( matchArr[8] ) / 3600.0 );

			lat = lat * latwSign;
			lng = lng * lngwSign;
			return [ lat, lng ];
		}

		matchArr = s.match(/^(-|\+)*([0-9]+)度([0-9]+)分([0-9]+\.[0-9]+)秒[\s]+(-|\+)*([0-9]+)度([0-9]+)分([0-9]+\.[0-9]+)秒$/);

		if ( matchArr && matchArr.length > 0 )
		{
			latwSign = (matchArr[1] && matchArr[1] == "-"? -1 : 1);
			lngwSign = (matchArr[5] && matchArr[5] == "-"? -1 : 1);
			var lat = parseInt( matchArr[2] ) + ( parseFloat( matchArr[3] ) / 60.0 ) + ( parseFloat( matchArr[4] ) / 3600.0 );
			var lng = parseInt( matchArr[6] ) + ( parseFloat( matchArr[7] ) / 60.0 ) + ( parseFloat( matchArr[8] ) / 3600.0 );

			lat = lat * latwSign;
			lng = lng * lngwSign;
			return [ lat, lng ];
		}

		matchArr = s.match(/^(-|\+)*([0-9]+)度([0-9]+)分([0-9]+(?:\.[0-9]+)*)秒[\s]+(-|\+)*([0-9]+)度([0-9]+)分([0-9]+(?:\.[0-9]+)*)秒$/);

		if ( matchArr && matchArr.length > 0 )
		{
			latwSign = (matchArr[1] && matchArr[1] == "-"? -1 : 1);
			lngwSign = (matchArr[5] && matchArr[5] == "-"? -1 : 1);
			var lat = parseInt( matchArr[2] ) + ( parseFloat( matchArr[3] ) / 60.0 ) + ( parseFloat( matchArr[4] ) / 3600.0 );
			var lng = parseInt( matchArr[6] ) + ( parseFloat( matchArr[7] ) / 60.0 ) + ( parseFloat( matchArr[8] ) / 3600.0 );

			lat = lat * latwSign;
			lng = lng * lngwSign;
			return [ lat, lng ];
		}


		return null;
	},
	parseLatLngText3 : function( s )
	{
		s = $.trim(s);
		s = s.replace( ',', ' ' );
		
		var matchArr =  s.match(/^(N|S|北緯|南緯|-|\+)*([0-9]{1,3}[度°])([0-9]{1,2}[分′'])*([0-9]{1,2}(?:\.[0-9]+)*[秒″\"])*(?:,|\s)(E|W|東経|西経|-|\+)*([0-9]{1,3}[度°])([0-9]{1,2}[分′'])*([0-9]{1,2}(?:\.[0-9]+)*[秒″\"])*$/);
		var revflg = false;
		
		if (!matchArr)
		{
			matchArr =  s.match(/^(E|W|東経|西経|-|\+)*([0-9]{1,3}[度°])([0-9]{1,2}[分′'])*([0-9]{1,2}(?:\.[0-9]+)*[秒″\"])*(?:,|\s)(N|S|北緯|南緯|-|\+)*([0-9]{1,3}[度°])([0-9]{1,2}[分′'])*([0-9]{1,2}(?:\.[0-9]+)*[秒″\"])*$/);
			revflg = true;
		}
		var lath,latm,lats,lonh,lonm,lons;
		if (matchArr && matchArr.length == 9)
		{
			lath = parseInt(matchArr[2]);
			lonh = parseInt(matchArr[6]);
			
			latm = matchArr[3] ? parseFloat(matchArr[3]) / 60 : 0;
			lonm = matchArr[7] ? parseFloat(matchArr[7]) / 60 : 0;

			lats = matchArr[4] ? parseFloat(matchArr[4]) / 3600 : 0;
			lons = matchArr[8] ? parseFloat(matchArr[8]) / 3600 : 0;
			
			var la = lath + latm + lats;
			var lo = lonh + lonm + lons;

			if ( matchArr[1] && (matchArr[1] == 'S' || matchArr[1] == 'W' || matchArr[1] == '南緯' || matchArr[1] == '西経' || matchArr[1] == '-') )
			{
				la = -1 * la;
			}
			if ( matchArr[5] && (matchArr[5] == 'S' || matchArr[5] == 'W' || matchArr[5] == '南緯' || matchArr[5] == '西経' || matchArr[5] == '-') )
			{
				lo = -1 * lo;
			}
			if (revflg)
			{
				var t = la;
				la = lo;
				lo = t;
			}

			return [la, lo];
		}
		return null;
		
	},
	
	parseLatLngText4 : function( s )
	{
		s = $.trim(s);

		var matchArr = s.match(/^(N|S|北緯|南緯|-|\+)*([0-9]{1,3}(?:\.[0-9]+)*)(?:,|\s)(E|W|東経|西経|-|\+)*([0-9]{1,3}(?:\.[0-9]+)*)/)
		var revflg = false;
		
		if (!matchArr)
		{
			matchArr = s.match(/^(E|W|東経|西経|-|\+)*([0-9]{1,3}(?:\.[0-9]+)*)(?:,|\s)(N|S|北緯|南緯|-|\+)*([0-9]{1,3}(?:\.[0-9]+)*)/)
			revflg = true;
		}

		var lat, lon;
		try{
			if (matchArr && matchArr.length == 5)
			{
				lat = parseFloat( matchArr[2] );
				lon = parseFloat( matchArr[4] );
				if ( matchArr[1] && (matchArr[1] == 'S' || matchArr[1] == 'W' || matchArr[1] == '南緯' || matchArr[1] == '西経' || matchArr[1] == '-') )
				{
					lat = -1 * lat;
				}
				if ( matchArr[3] && (matchArr[3] == 'S' || matchArr[3] == 'W' || matchArr[3] == '南緯' || matchArr[3] == '西経' || matchArr[3] == '-') )
				{
					lon = -1 * lon;
				}
				if (revflg)
				{
					var t = lat;
					lat = lon;
					lon = t;
				}

				return [lat, lon];
			}
			
			return null;
		}
		catch( e )
		{
			return null;
		}
		
	},
	
	parseLatLngText : function( s )
	{
		s = $.trim(s);
		s = s.replace( ',', ' ' );

		var latLng = s.split( ' ' );

		if ( latLng.length < 2 ) return null;

		try
		{
			var lat = parseFloat( latLng[0] );
			var lng = parseFloat( latLng[1] );
			result =  [ lat, lng ];
			
			return result;
		}
		catch( e )
		{
			return null;
		}
	},
	getDemPng : function ( latlng )
	{
        var lon = latlng[1] * .017453292519943295; // DEG → RAD : lon = (lon / 180) * Math.PI;
        var lat = latlng[0] * .017453292519943295; // DEG → RAD : lat = (lat / 180) * Math.PI;
	    var R	= 128 / Math.PI;
	    var x = R * (lon + Math.PI);
	    var y = (-1) * R / 2 * Math.log((1 + Math.sin(lat)) / (1 - Math.sin(lat))) + 128;
	    var z = 14;
        var vX_px     = x * Math.pow(2, z);
        var vY_px     = y * Math.pow(2, z);
        var vX_Tile   = Math.floor(vX_px / 256);
        var vY_Tile	  = Math.floor(vY_px / 256);
		var demUrl = "https://maps.gsi.go.jp/xyz/dem_png/" + z + "/" + vX_Tile + "/" + vY_Tile + ".png";
	    
		if ( latlng )
		{
			var aj =$.ajax ({
				type : "GET",
				url : demUrl,
				success: MA.bind(this.jumpToPoint, this, latlng, CONFIG.Z2HEIGHT[15]),
				error: MA.bind(this.jumpToPoint, this, latlng, CONFIG.Z2HEIGHT[5]),
			});
		}
	},
	jumpToPoint : function (latLng, z2height) {
		//this.map.setView(latlng, zoom, {reset : true});
		GLOBE.MAP.pindrop(latLng[1], latLng[0], "SEARCH");
		GLOBE.MAP.fly(latLng[1], latLng[0], z2height);
	}
	
};


/************************************************************************
 ダイアログ管理
 ************************************************************************/

GLOBE.DIALOGMANAGER = {
	activeCss: {
		'z-index': 10000,
		'opacity': 0.95
	},
	negativeCss: {
		'z-index': 1,
		'opacity': 0.8
	},
	
	dialogIds: [],
	activeDialogId: null,
	
	activeIs: function( id )
	{
		this.activeDialogId = id;
		
		var newIds = [];
		for ( var i=0; i<this.dialogIds.length; i++ )
		{
			if ( this.dialogIds[i] != id )
			{
				newIds.push( this.dialogIds[i] );
			}
		}
		newIds.push( id );
		this.dialogIds = newIds;
		this.refreshZindex();
	},
	
	refreshZindex: function()
	{
		for ( var i=0; i<this.dialogIds.length; i++ )
		{
			var tempCss = $.extend(true, {}, this.negativeCss);
			tempCss['z-index'] += i;
			$('#' + this.dialogIds[i])
				.css(tempCss)
				.addClass('deactive');
		}
		$('#' + this.activeDialogId)
			.css(this.activeCss)
			.removeClass('deactive');
	}
}





/************************************************************************
 ダイアログ
 ************************************************************************/

GLOBE.DIALOG = {};


/***** ファイル読込ダイアログ *****/
GLOBE.DIALOG.HELP = $.extend({}, new GLOBE.CLASS.DIALOG('gsi_dialog_help'), {
	options: {
		title: 'ヘルプ'
	},
	
	defaultTop   : '50px',
	defaultLeft  : 'auto',
	defaultRight : 'auto',
	defaultBottom: 'auto',
	
	resizable: true,
	draggable: true,
	
	_slideContainerId : 'help_container',
	_slideContentClass: 'help_content',
	_slideContainerWidth: '870px',
	_slideContainerHeight: '600px',
	
	_slideContainer: null,
	_slides: null,
	_slideCurrentIndex: 0,
	
	create: function()
	{
		this.createDialog();
		
		this.setDialogHeader( this.createHeader() );
		this.setDialogContent( this.createContent() );
		this.select(0);	
		
		this.setHelpDialog();
		
		$('#title_help').on('click', function(){
			GLOBE.DIALOG.HELP.show();
		});
		
		$(window).on('resize', this.onResize.bind(this));
	},
	
	createHeader : function()
	{
		this._titleFrame = this.headerFrame
			.addClass( "help_window_content_title" )
			.on('click', function(){
				if ( !this._dblclickState )
				{
					this._dblclickState = 1;
					setTimeout(function(){
						this._dblclickState = 0;
					}.bind(this), 300);
				}
				else if ( this._dblclickState == 1 )
				{
					this._dblclickState = 0;
					this.setCenter();
					this.onResize();
				}
			}.bind(this));
		return $("<span></span>");
	},
	
	createContent : function()
	{
		this._contentFrame = this.contentFrame.css({
			'position': 'relative',
			'margin': '0 25px',
			'overflow': 'auto'
		});
		
		this._contentList = [];
		this._selectedIndex = -1;
		
		$('#' + this._slideContainerId + ' .' + this._slideContentClass).each( function(index, elem) {
			this._contentList.push( {
				content : $( elem ).clone(),
				title : $( elem ).attr( "title" )
			});
		}.bind(this));
		
		return $("<div></div>");
	},
	
	setHelpDialog : function()
	{
		this._frame = this.container;
		
		if (GSI.Utils.Browser.isSmartMobile)
		{
			this._frame.addClass('help_window_frame mobile');
		}
		else
		{
			this._frame.addClass('help_window_frame');
		}
		
		this._frame.css({
			'width': this._slideContainerWidth,
			'height': this._slideContainerHeight,
			'margin-right': 'auto',
			'margin-left' : 'auto'
		});
		
		
		this._contentFrame.on({
			/* フリック開始時 */
			'touchstart': MA.bind( function(e) {
				this._touchX = e.originalEvent.changedTouches[0].pageX;
				this._touchStartX = this._touchX;
				this._accel = 0;
				//this._slideX = parseFloat($(this).position().left);
				this._touchY = e.originalEvent.changedTouches[0].pageY; //←縦方向のタッチ位置も取得
			}, this ),
			/* フリック中 */
			'touchmove': MA.bind( function(e) {
				var moveX = this.touchX - e.originalEvent.changedTouches[0].pageX,
					moveY = this.touchY - e.originalEvent.changedTouches[0].pageY, //←縦方向のタッチ位置も取得
					moveRate = moveX / moveY; //←フリックした縦横の移動量の比率を計算

				//↓垂直方向から15度以上の方向にフリックした場合のみ、ページのスクロールをキャンセル
				if(moveRate > Math.tan(15 * Math.PI/180)) {
					e.preventDefault();
				}

				//this._slideX = this._slideX - (this._touchX - event.changedTouches[0].pageX );
				//$(this).css({left:this.slideX});
				this._accel = (e.originalEvent.changedTouches[0].pageX - this._touchX) * 5;
				this._touchX = e.originalEvent.changedTouches[0].pageX;
				this._touchEndX = this._touchX;
				
			}, this ),
			/* フリック終了 */
			'touchend': MA.bind( function(e) {
				//this._slideX += this._accel;
				
				if ( Math.abs( this._touchEndX - this._touchStartX ) > 50 )
				{
					if ( this._accel > 1 )
						this.prev();
					else if ( this._accel < -1)
						this.next();
				}
				//$("#query").val(this._slideX + "/" + this._accel + "/" + this._touchX );
			}, this )
		});
		
		
		this._nextButton = $("<a>")
			.attr({
				"href":"javascript:void(0);"
			})
			.addClass("help_window_frame_button")
			.addClass("help_window_frame_next_button")
			.html("")
			.click( MA.bind( function(){this._nextButton.blur();this.next();}, this ) );
		
		this._prevButton = $("<a>")
			.attr( {
				"href":"javascript:void(0);"
			} )
			.addClass( "help_window_frame_button")
			.addClass( "help_window_frame_prev_button")
			.html( "" )
			.click( MA.bind( function(){this._prevButton.blur();this.prev();}, this ) );
		
		this._frame.append( this._prevButton);
		this._frame.append( this._nextButton);
		
		this.setCenter();
	},
	
	next : function()
	{
		if ( this._contentList.length > this._selectedIndex+1)
			this.select(this._selectedIndex+1);
		else
			this.select(0);	
	},
	
	prev : function()
	{
		if ( 0 <= this._selectedIndex-1)
			this.select(this._selectedIndex-1);
		else
			this.select(this._contentList.length -1);	
			
	},
	
	select : function( index )
	{
		if ( this._contentList && this._contentList.length > index && index >= 0 )
		{
			if ( this._selectedIndex >= 0 )
			{
				this._contentFrame.fadeOut( 100, MA.bind( function(){
					this._titleFrame.find("span").empty().append( this._contentList[index].title ); 
					this._contentFrame.empty().append( this._contentList[index].content );
					this._contentFrame.fadeIn( 100 );
				}, this));
			}
			else
			{
				this._titleFrame.find("span").empty().append( this._contentList[index].title ); 
				this._contentFrame.empty().append( this._contentList[index].content );
			}
			this._selectedIndex = index;
		}
	},
	
	setCenter: function()
	{
		this.container.css({
			'top': this.defaultTop,
			'left': ($(window).width() - this.container.outerWidth(true)) / 2 + 'px'
		});
	},
	
	onAfterShow: function()
	{
		this.onResize();
	},
	
	onResize: function()
	{
		this.adjustHelp();
		this.contentFrame.css({
			'height': (this.container.height() - this.headerFrame.outerHeight(true)) + 'px'
		});
	},
	
	adjustHelp: function()
	{
		if ( this.container.outerWidth(true) >= $(window).width() )
		{
			var diff = this.container.outerWidth(true) - this.container.width();
			this.container.css({
				'width': ($(window).width() - diff - 5) + 'px'
			});
			this.setCenter();
		}
		
		if ( this.container.offset().top + this.container.outerHeight(true) >= $(window).height() )
		{
			var diff = this.container.outerHeight(true) - this.container.height();
			this.container.css({
				'height': ($(window).height() - this.container.offset().top - diff - 5) + 'px'
			});
		}
	}
});

/***** 情報ウィンドーダイアログ *****/
GLOBE.DIALOG.INFOBOX = $.extend({}, new GLOBE.CLASS.DIALOG('gsi_dialog_infobox'), {
	options: {
		title: '情報ウィンドー'
	},
	defaultTop:   'auto',
	defaultLeft:  'auto',
	defaultRight: '10px',
	defaultBottom:'10px',
	
	resizable: false,
	
	create: function()
	{
		this.createDialog();
		this.initPosition();
	},
	
	initPosition: function()
	{
		this.container
  			.css({
				'color': '#fff',
				'background': '#333',
				'opacity': '.90',
				'width': 'auto',
				'min-width': '88px'
			});
		
		this.container.css('top', this.defaultTop);
		this.container.css('left', this.defaultLeft);
		this.container.css('right', this.defaultRight);
		this.container.css('bottom', this.defaultBottom);
		
		this.contentFrame.css({
			'padding': '10px',
			'background-color': '#fff',
			'color': '#000'
		});
	},
	
	onBeforeShow: function()
	{
		this.initPosition();
	},
	
	onDragStart: function()
	{
		this.container.css({
			'right': 'auto',
			'bottom': 'auto'
		});
	}
});

/***** ファイル読込ダイアログ *****/
GLOBE.DIALOG.FILEREAD = $.extend({}, new GLOBE.CLASS.DIALOG('gsi_dialog_fileread'), {
	options: {
		title: 'ファイル読込'
	},
	
	defaultTop:   '100px',
	defaultLeft:  'auto',
	defaultRight: '10px',
	defaultBottom:'auto',
	
	resizable: true,
	
	_list: [],
	
	create: function()
	{
		this.createDialog();
		this.container.css({'width':'360px'});
		
		this.setDialogHeader( this.createHeader() );
		this.setDialogContent( this.createContent() );
		
		this.initializeDroppable();
	},
	
	initializeDroppable: function()
	{
		if(!window.FileReader) {
			return false;
		}
		
		var elm = $('#' + GLOBE.MAP.mapElementId);
		
		var cancelEvent = function(event) {
			event.preventDefault();
			event.stopPropagation();
			return false;
		}
		elm.bind("dragenter", cancelEvent);
		elm.bind("dragover", cancelEvent);
		
		var handleDroppedFile = function(event) {
			this.show();
			this._createFileLoadPanel();
			
			this.uploadFile( event.originalEvent.dataTransfer.files );
			
			cancelEvent(event);
			return false;
			
		}.bind(this);
		
		elm.bind("drop", handleDroppedFile);
	},
	
	createHeader : function()
	{
		this._title = $( '<div>' ).html( this.options.title );

		return $( '<div>' ).append( this._title );
	},
	createContent : function()
	{
		this._sakuzuFrame = $( '<div>' ).addClass( 'gsi_sakuzu_dialog_frame' );
		this._createTopPanel();
		return this._sakuzuFrame;
	},
	
	_createTopPanel : function()
	{
		// 初期画面
		if ( this._topPanel ) return;

		this._topPanel = $( '<div>' );

		this._topPanelList = this._createTopPanelList();
		this._topPanel.append( this._topPanelList );

		this._sakuzuFrame.append( this._topPanel );
	},
	
	_createTopPanelList : function()
	{
		var frame = $( '<div>' ).addClass( 'gsi_sakuzu_dialog_list' );
		
		$('<div>ファイルを選択</div>')
			.addClass('normalbutton')
			.css({
				'display': 'inline-block',
				'margin-bottom': '10px',
				'padding': '1px 5px 1px 30px',
				'background': '#eee url(image/sakuzu/icon_fileopen.png) no-repeat',
				'border': '1px solid #666',
				'border-radius': '5px',
				'line-height': '26px',
				'font-size': '11px',
				'cursor': 'pointer'
			})
			.on('click', this._showFileLoadPanel.bind(this))
			.appendTo(frame);
		
		this._listTable = $( '<table>' ).css( { 'width' : '100%'} );
		this._listTBody = $( '<tbody>' );

		this._refreshList(true);
		this._listTable.append( this._listTBody );
		frame.append( this._listTable );

		return frame;
	},
	
	_refreshList : function()
	{
		this._listTBody.empty();

		for ( var i=0; i<this._list.length; i++ )
		{
			var item = this._list[i];
			
			var tr = $( '<tr>' );
			var td = null;
			var id = 'GSI_SakuzuDialog_check' + item.id;

			// 表示チェック
			var checkBox = $( '<input>' ).attr( { 'id': id, 'type' : 'checkbox', 'checked' : item.visible } ).addClass( 'normalcheck' );
			var label = $( '<label>' ).attr( {'for': id} ).html( item.file );
			
			// 名称
			var title = $( '<div>' ).append( checkBox ).append( label )
				.css( { "word-break": "break-all"} )
				.addClass('folder');

			// レイヤー数
			var layerCount = item.len;
			var num = $( '<span>' ).addClass( 'num' ).html( layerCount );

			td = $( '<td>' ).append( title ).css( { 'width' : '100%', "word-break": "break-all"} );
			tr.append( td );

			// ボタン類
			td = $( '<td>' ).css({"text-align":"right"}).append( num );
			tr.append( td );
			
			var buttonClassName = 'normalbutton sakuzubutton' + ( layerCount <= 0 ? ' disabled' : '' );
			
			var clearBtn = $( '<a>' ).attr( {"href":"javascript:void(0);"} ).html( '削除' ).addClass(buttonClassName);
			td = $( '<td>' ).append( clearBtn );
			tr.append( td );
			this._listTBody.append( tr );
			
			// アイコンラベル
			tr = $( '<tr>' );
			id = 'GSI_SakuzuDialog_label_check' + item.id ;
			var checkBox2 = $( '<input>' ).attr( { 'id': id, 'type' : 'checkbox', 'checked' : item.visibleOfLabel } ).addClass( 'normalcheck' );
			
			label = $( '<label>' ).attr( {'for': id} ).html( 'アイコンのラベルを表示' );
			td = $( '<td>' ).attr({"colspan":4, "align":"right"}).append(checkBox2).append( label );
			tr.append( td );
			this._listTBody.append( tr );
			
			
			// イベント
			checkBox.click( MA.bind( function(checkBox, checkBox2, item){
				GLOBE.MAP.hide_showLayer("upload", "", item.id, checkBox.is(':checked'), checkBox2.is(':checked'));
				item.visible = checkBox.is(':checked');
			}, this, checkBox, checkBox2, item ) );
			
			checkBox2.click( MA.bind( function(checkBox, checkBox2, item){
				GLOBE.MAP.hide_showLabel("upload", "", item.id, checkBox.is(':checked'), checkBox2.is(':checked'));
				item.visibleOfLabel = checkBox2.is(':checked');
			}, this, checkBox, checkBox2, item ) );
			
			clearBtn.click( MA.bind( this._clearLayer, this, item ) );
		}
	},
	
	_createFileLoadPanel : function()
	{
		// ファイル読込パネル
		if ( this._fileLoadPanel ) return;
		this._fileLoadPanel = $( '<div>' ).addClass( 'gsi_sakuzu_dialog_fileloadpanel' ).hide();

		var frame = $( '<div>' ).addClass( 'gsi_sakuzu_dialog_fileload' );

		if ( !GSI.Utils.hasFileAPI )
		{
			frame.append( $('<div>').addClass( 'message' ).html( GSI.TEXT.SAKUZU.DIALOG_LOAD_COMMENT_IE8) );
			var fileNameFrame = $( '<div>' );

			this._fileLoadNameInput = $( '<input>' ).attr( {'type':'text'} );
			this._fileLoadTextarea = $( '<textarea>' ).attr( {'wrap':'off'} );

			fileNameFrame.append( $('<span>').html( GSI.TEXT.SAKUZU.DIALOG_LOAD_FILENAMECAPTION ) );
			fileNameFrame.append( this._fileLoadNameInput );
			frame.append( fileNameFrame );
			frame.append( this._fileLoadTextarea );
		}
		else
		{
			frame.append( $('<div>').addClass( 'message' ).html( GSI.TEXT.SAKUZU.DIALOG_LOAD_COMMENT ) );
			this._fileLoadInput = $('<input>').attr( { type:"file"} );

			frame.append( this._fileLoadInput );
		}

		this._fileLoadPanel.append( frame );

		// OKCancel
		this._fileLoadOkCancelFrame = this._createFileLoadOkCancel();
		this._fileLoadPanel.append( this._fileLoadOkCancelFrame  );

		this._sakuzuFrame.append( this._fileLoadPanel );
	},

	_createFileLoadOkCancel : function()
	{
		var frame = $( '<div>' ).addClass( 'gsi_sakuzu_dialog_okcancel' );
		var okBtn = $( '<a>' ).attr( {'href':'javascript:void(0);'} ).html( GSI.TEXT.SAKUZU.DIALOG_LOAD_OKBTN ).addClass( 'normalbutton' );
		var cancelBtn = $( '<a>' ).attr( {'href':'javascript:void(0);'} ).html( GSI.TEXT.SAKUZU.DIALOG_LOAD_CANCELBTN ).addClass( 'normalbutton' );

		okBtn.click( this._onFileLoadOkClick.bind(this) );
		cancelBtn.click( this._onFileLoadCancelClick.bind(this) );

		frame.append( okBtn ).append( cancelBtn );
		frame.append( $('<div id="uploadFilename"></div>') );

		return frame;
	},
	
	_onFileLoadOkClick : function()
	{
		if ( this._fileLoadInput )
		{
			var files = this._fileLoadInput.prop( 'files' );
			if( !files ) files = this._fileLoadInput.attr( 'files' );

			if ( files && files.length > 0 )
			{
				this.uploadFile(this._fileLoadInput[0].files);
			}
			else
			{
				alert( GSI.TEXT.SAKUZU.DIALOG_LOAD_NOFILE );
			}
		}
		else
		{
			var text = $.trim( this._fileLoadTextarea.val() );
			if ( text != '' )
			{
				var fileName = $.trim( this._fileLoadNameInput.val() );
				
				if ( this.isJSON(text) )
				{
					GLOBE.MAP.drawGeojson(text, fileName, this.onAfterDataLoad.bind(this));
				}
				else if ( this.isXML(text) )
				{
					GLOBE.MAP.drawKml(text, fileName, null, this.onAfterDataLoad.bind(this));
				}
				else
				{
					alert("「JSON形式」または「KML形式」で入力してください。");
				}
			}
			else
			{
				alert( GSI.TEXT.SAKUZU.DIALOG_LOAD_NOTEXT );
			}
		}
	},
	
	isJSON: function( text )
	{
		try
		{
			var item = $.parseJSON( text );
			return true;
		}
		catch( e )
		{
			return false;
		}
	},
	
	isXML: function( text )
	{
		try
		{
			var xml = $.parseXML( text );
			return true;
		}
		catch( e )
		{
			return false;
		}
	},
	
	_onFileLoad : function( event )
	{
		if ( event.error )
		{
			alert( GSI.TEXT.SAKUZU.DIALOG_LOAD_ERROR );
		}
		else
		{
			if ( this._fileLoadTextarea )
			{
				this._fileLoadTextarea.focus();
				this._fileLoadTextarea.val('');
				this._fileLoadNameInput.val( '' );
			}
			this._showTopPanel( this._fileLoadPanel );
		}
	},
	
	_onFileLoadCancelClick : function()
	{
		this._showTopPanel( this._fileLoadPanel );
	},
	
	_showTopPanel : function( beforePanel )
	{
		this._createTopPanel();

		this.container .css( { height: 'auto'} );
		if ( beforePanel )
		{
			beforePanel.fadeOut( 'normal', MA.bind( function() {
				//this.setTitle( GSI.TEXT.SAKUZU.DIALOG_TITLE );
				this._topPanel.fadeIn( 'fast' );
			}, this ) );
		}
		else
		{
			this.setTitle( GSI.TEXT.SAKUZU.DIALOG_TITLE );
			this._topPanel.show();
		}
	},
	
	_showFileLoadPanel : function()
	{
		this._createFileLoadPanel();

		this.container .css( { height: 'auto'} );
		this._topPanel.fadeOut( 'normal', MA.bind( function() {

			this._fileLoadPanel.fadeIn( 'normal' );

		}, this ) );
	},
	
	_clearLayer: function( item )
	{
		if ( confirm('このレイヤーを削除します。よろしいですか？') )
		{
			GLOBE.MAP.deleteLayer('upload', '', item.id);
			GLOBE.DIALOG.INFOBOX.hide();
			var newlist = [];
			for ( var i=0; i<this._list.length; i++ )
			{
				if ( this._list[i].id != item.id )
				{
					newlist.push( this._list[i] );
				}
			}
			this._list = newlist;
			this._refreshList();
		}
	},
	
	uploadFile: function( files ){
		var file = files[0];
		
		// geojsonかkmlかどうかチェック
		if ( !file || !file.name ) return false;
		var ext = file.name.match(/(.*)(?:\.([^.]+$))/)[2];
		if(ext != "geojson" && ext != "kml"){
			alert("geojsonまたはkmlファイルを選択して下さい。");
			return;
		}
		
		var reader = new FileReader();
		
		reader.onload = function(evt){
			var res = evt.target.result;
			
			// Geojson描画
			if(ext == "geojson"){
				GLOBE.MAP.drawGeojson(res, file.name, this.onAfterDataLoad.bind(this));
			// KML描画
			}else if(ext == "kml"){
				GLOBE.MAP.drawKml(res, file.name, null, this.onAfterDataLoad.bind(this));
			}
			
		}.bind(this)

		reader.readAsText(file, "UTF-8");
	},
	
	onAfterDataLoad: function( item )
	{
		if ( item )
		{
			if ( this._fileLoadInput )     this._fileLoadInput.val('');
			if ( this._fileLoadTextarea )  this._fileLoadTextarea.val('');
			if ( this._fileLoadNameInput ) this._fileLoadNameInput.val('');
			this._list.push( item );
			this._refreshList();
			this._showTopPanel(this._fileLoadPanel);
		}
		else
		{
			alert("読み込みに失敗しました。\n\n「JSON形式」か「KML形式」であることをご確認ください。");
		}
	},
	
	reloadAllKml: function()
	{
		for ( var i=0; i<this._list.length; i++ )
		{
			var item = this._list[i];
			if ( item.kml )
			{
				GLOBE.MAP.drawKml(item.kml, item.file, item.id);
			}
		}
	}
});

/***** 高さ倍率ダイアログ *****/
GLOBE.DIALOG.HEIGHTPOWER = $.extend({}, new GLOBE.CLASS.DIALOG('gsi_dialog_heightpower'), {
	
	defaultTop:   '140px',
	defaultLeft:  'auto',
	defaultRight: '10px',
	defaultBottom:'auto',
	
	sliderId: 'gsi_height_power_slider',
	tboxId: 'gsi_height_power_tbox',
	
	// このオブジェクトを活性化（最初に呼ぶ）
	create: function()
	{
		this.createDialog();
		
		this.onBeforeClose = function()
		{
			//this.clear();
		}
		
		this.setDialogHeader('高さ倍率');
		this._initializeContent();
	},
	
	_initializeContent: function()
	{
		this.frame = $('<div></div>');
			
		this.label = $('<div>高さ方向の倍率：</div>')
			.css({
				'margin': '20px',
				'font-size': '14px',
				'text-align': 'center'
			})
			.appendTo(this.frame);
		
		this.tbox = $('<input type="tel" size="3">')
			.attr('id', this.tboxId)
			.val(GLOBE.MAP.initials.heightPower)
			.css({
				'text-align': 'right'
			})
			.on('click', function(){ this.select(); })
			.on('keyup change', this.onTboxChange.bind(this))
			.appendTo( this.label );
		
		this.sliderFrame = $('<div></div>')
			.css({
				'position' : 'relative',
				'margin' : '20px'
			})
			.appendTo(this.frame);
			
		this.slider = $('<div></div>')
			.attr('id', this.sliderId)
			.css({
				//'margin' : '0 30px 0 20px'
			})
			.appendTo(this.sliderFrame);
		
		this.setDialogContent( this.frame );
		
		this.slider.slider({
			max: GLOBE.MAP.heightPowerMax,
			min: GLOBE.MAP.heightPowerMin,
			step: GLOBE.MAP.heightPowerStep,
			value: GLOBE.MAP.initials.heightPower,
			slide: this.onSliderChange.bind(this),
			change: this.sliderValueToMap.bind(this)
		});
	},
	
	tboxToSlider: function( e )
	{
		var v = this.tbox.val();
		if ( !isNaN(v) && v >= 0 && v <= 9.9 )
		{
			this.slider.slider('value', v);
		}
	},
	
	sliderToTbox: function( e, ui )
	{
		this.tbox.val( ui.value );
	},
	
	onSliderChange: function( e, ui )
	{
		this.sliderToTbox( e, ui );
	},
	
	onTboxChange: function( e )
	{
		this.tboxToSlider( e );
	},
	
	sliderValueToMap: function( e, ui )
	{
		GSI.GLOBALS.layerTreeDialog._userControlStarted = false;
		GLOBE.MAP.setHeightPower( ui.value );
		GLOBE.DIALOG.FILEREAD.reloadAllKml();
		
		var list = GSI.GLOBALS.mapLayerList.getList();
		for ( var i=0; i<list.length; i++ )
		{
			if ( list[i].layerType == "kml" && list[i]._visibleInfo && list[i]._visibleInfo.layer && list[i]._visibleInfo.layer._redraw )
			{
				list[i]._visibleInfo.layer._redraw();
			}
		}
	}
});

/***** リンクを取得ダイアログ *****/
GLOBE.DIALOG.GETLINK = $.extend({}, new GLOBE.CLASS.DIALOG('gsi_dialog_getlink'), {
	
	defaultTop:   '180px',
	defaultLeft:  'auto',
	defaultRight: '10px',
	defaultBottom:'auto',
	
	resizable: false,
	
	// このオブジェクトを活性化（最初に呼ぶ）
	create: function()
	{
		this.createDialog();
		
		this.onBeforeClose = function()
		{
			//this.clear();
		}
		
		this._initializeHeader();
		this._initializeContent();
	},
	
	_initializeHeader: function()
	{
		this.setDialogHeader('リンクを取得');
	},
	
	_initializeContent: function()
	{
		this.setDialogContent( this.createContent() );
		this._createTextareaContent(true);
		this._setMessage();
	},
	
	createContent : function()
	{
		this._frame = $( '<div>' ).addClass( 'gsi_sharedialog_frame' );

		this._messageFrame = $( '<div>' ).addClass( 'messageframe' );
		this._textareaFrame = $( '<div>' ).addClass( 'textareaframe' );

		this._contentFrame = $( '<div>' );
		this._settingFrame = $( '<div>' ).addClass( 'settingframe' );

		this._frame.append( this._messageFrame );
		this._frame.append( this._textareaFrame );
		this._frame.append( this._contentFrame );
		this._frame.append( this._settingFrame );

		return this._frame;
	},
	
	_createTextareaContent : function()
	{
		var frame = $( '<div>' ).addClass( 'textareacontent' );
		
		var textareaFrame = $( '<div>' );
		this._textarea = $( '<textarea>' ).attr( {rows:4, readonly:"readonly", 'wrap':'off'} ).click( function(){ this.select();} );
		this._textarea.focus();
		this._textarea.val( '' );
		textareaFrame.append( this._textarea );
		
		frame.append( textareaFrame );
		
		this._textareaFrame.append( frame );
		this._textareaContent = frame;
	},
	
	_setMessage : function()
	{
		this._messageFrame.empty();
		
		var msg = "次のURLをメール等で送付することで、現在表示されている地図を共有することができます。";
		
		var img = $( '<img>' ).attr( {'src': 'image/system/info.png'} );
		this._messageFrame.append(img).append( $('<div>').html(msg) );
	},
	
	onBeforeShow: function()
	{
		this._textarea.val(location.href);
	}
});


/***** 検索ダイアログ *****/
GLOBE.DIALOG.SEARCH = $.extend({}, new GLOBE.CLASS.DIALOG('gsi_dialog_search'), {
	
	selectFrame: null,
	listFrame: null,
	listContainer: null,
	
	kenSelect: null,
	shiSelect: null,
	
	addressResult: [],
	chimeiResult: [],
	
	markerNamePrefix: 'search_result_',
	normalMarkerUrl: 'image/system/search_result.png',
	activeMarkerUrl: 'image/system/search_result_active.png',
	markerLayer: null,
	markers: [],
	
	// このオブジェクトを活性化（最初に呼ぶ）
	create: function()
	{
		this.createDialog();
		this._initializeHeader();
		this._initializeContent();
		
		this.onResize = function()
		{
			var h1 = this.container.height();
			var h2 = this.headerFrame.outerHeight(true);
			var h3 = this.selectFrame.outerHeight(true);
			this.listFrame.css({
				'max-height': (h1 - h2 - h3 - 2) + 'px'
			});
		}
		
		this.onBeforeClose = function()
		{
			this.clear();
		}
		
		this.createMarkerLayer();
		this.container.css({
			top: '42px',
			height: 'auto'
		});

	},
	
	// ダイアログのヘッダを初期化
	_initializeHeader: function()
	{
		this.setTitle( '検索中' );
	},
	
	// ダイアログの内容を初期化
	_initializeContent: function()
	{
		this.frame = $( '<div>' );
		
		var selectFrame = $( '<div>' ).addClass( "searchresultdialog_select_frame" );
		this.selectFrame = selectFrame;

		this.kenSelect = $( '<select>' ).css( {'width': '48%'} );
		selectFrame.append( this.kenSelect  );
		this.shiSelect = $( '<select>' ).css( {'width': '48%', 'margin-left' : '4px'} );
		selectFrame.append( this.shiSelect );

		this.initializeKenSelect();

		this.kenSelect.change( this.onKenChange.bind(this) );
		this.shiSelect.empty();
		this.shiSelect.append( $('<option>').html("市区町村").val("," ) );
		this.shiSelect.change( this.onShiChange.bind(this) );

		selectFrame.append( this.kenSelect ).append( this.shiSelect );

		this.frame.append( selectFrame );

		this.listFrame = $( '<div>' ).addClass( 'searchresultdialog_ul_frame' );
		
		var w = $(window).width();
		var h = $(window).height();
		if (h > w ){
				maxHeight=Math.floor( h * 0.4 );
			}else{
				maxHeight=Math.floor( h * 0.65 );
			}
		this.listFrame.css( { 'max-height' : maxHeight + 'px'} );
		this.listContainer = $( '<ul>' ).addClass( 'searchresultdialog_ul' );

		var li = $( '<li>' ).addClass( 'nodata' ).html( '中' );
		this.listContainer.append( li );
		this.listFrame.append( this.listContainer );

		this.frame.append( this.listFrame );

		//return this.frame;
		this.setDialogContent(this.frame);
	},
	

	// 都道府県選択エレメントを初期化
	initializeKenSelect : function()
	{
		var $select = this.kenSelect;
		$select.empty();
		$select.append( $('<option>').html("都道府県").val("," ) );

		var kenCode = '';
		for( var key in GSI.MUNI_ARRAY )
		{
			var muni = GSI.MUNI_ARRAY[ key ].split( ',' );

			if ( muni.length == 4 )
			{
				if ( kenCode != muni[0] )
				{
					var $option = $('<option>').html(muni[1]).val(muni[0] + ',' + muni[1]);
					$select.append( $option );
					kenCode = muni[0];
				}
			}
		}
	},
	
	// イベント：都道府県を選択した時
	onKenChange : function()
	{
		this.clearMarkers();
		
		var selectedKen = this.kenSelect.val().split( ',');
		var selectedKenCode = selectedKen[0];
		var selectedKenName = selectedKen[1];
		
		var $select = this.shiSelect;
		$select.empty();
		$select.append( $('<option>').html("市区町村").val("," ) );
		
		for( var key in GSI.MUNI_ARRAY )
		{
			var muni = GSI.MUNI_ARRAY[ key ].split( ',' );
			
			if ( muni.length == 4 )
			{
				if ( selectedKenCode == muni[0] )
				{
					var $option = $('<option>').html(muni[3]).val(muni[2] + ',' + muni[3]);
					$select.append( $option );
				}
			}
		}
		this.showResult();
	},
	
	// イベント：市町村を選択した時
	onShiChange : function()
	{
		this.clearMarkers();
		this.showResult();
	},
	
	// ダイアログのタイトルを表示
	setTitle : function( title )
	{
		var subTitle = $( '<a>' ).html( "協力:東大CSIS" ).addClass( 'searchresultdialog_subtitle' )
			.css( {'font-size':'7pt'} ).attr('href', 'http://newspat.csis.u-tokyo.ac.jp/geocode/')
			.attr('target', '_blank');
		
		this.headerTitle.html( title ).append( subTitle );
	},
	
	// Jsonから検索結果一覧を作成
	setChimeiResult : function( result )
	{
		if (result)
		{
			if ( result.length > 0 )
			{
				this.clear();
			}
			for(var i = result.length - 1; i >= 0; i--)
			{
				if (result[i].geometry.coordinates[0] <= 0)
				{
					if (result[i].geometry.coordinates[1] <= 0)
					{
						result.splice(i, 1);
					}
				}
			}
		}
		this.chimeiResult = result;
		this.showResult();
	},
	
	// 検索結果一覧を作成
	showResult : function()
	{
		if ( this.markerList ) this.map.removeLayer( this.markerList );

		var selectedKen = this.kenSelect.val().split( ',');
		var selectedKenCode = selectedKen[0];
		
		var selectedSi = this.shiSelect.val().split( ',');
		var selectedSiCode = selectedSi[0];

		var ul = this.listContainer;
		ul.empty();
		var viewNum = 0;
		
		var results = [this.addressResult,this.chimeiResult];
		var that = this;
		var num = 0;
		$.each(results,function() {
			num += this.length;
			$.each(this,function() {
				var record = this;
				
				var addressCode = "";
				if (record.properties.addressCode) {
					addressCode = parseInt(record.properties.addressCode,10)+"";
				}
				if (selectedKenCode != '' && addressCode.substring(0,addressCode.length-3) != selectedKenCode) return;
				if (selectedSiCode != '' && selectedSiCode != addressCode) return;
				
				var li = $( '<li>' );
				var muniNm = "";
				if (addressCode) {
					var addressData = GSI.MUNI_ARRAY[addressCode];
					if (addressData) {
						addressData = addressData.split(",");
						muniNm = (addressData[1]+addressData[3]).replace("　","");
					}
					var a = that.makeItem( record, viewNum, muniNm );
					li.append( a );
					ul.append( li );
				} else {
					var a = that.makeItem( record, viewNum, "    " );
					li.append( a );
					ul.append( li );
					// 緯度経度からリバースジオコーダ機能を呼び出して地名を取得
					$.ajax({
						url : CONFIG.SERVERAPI.GETADDR,
						dataType : "json",
						data : {
							lon : record.geometry.coordinates[0],
							lat : record.geometry.coordinates[1]
						},
						success : function(data2){
							// リバースジオコーダの結果を画面に表示
							if (data2.results){
								var addressCode = parseInt(data2.results.muniCd);
								record.properties.addressCode = addressCode;
								var addressData = GSI.MUNI_ARRAY[addressCode];
								if (addressData) {
									addressData = addressData.split(",");
									muniNm = (addressData[1]+addressData[3]).replace("　","");
									li.find("div.muni").html(muniNm);
								}
							}
						}
					});
				}
				viewNum++;
			});
		});
		this.setTitle( '検索結果:' + num + '件中' + viewNum + '件表示' );
		this.show();
	},
	
	// 検索結果データを初期化
	clear : function()
	{
		this.setTitle( '検索中' );
		this.addressResult = [];
		this.chimeiResult = [];
		var ul = this.listContainer;
		ul.empty();
		var li = $( '<li>' ).addClass( 'nodata' ).html( '検索中' );
		this.listContainer.append( li );

		this.kenSelect[0].selectedIndex = 0;
		this.shiSelect.empty();
		this.shiSelect.append( $('<option>').html("市区町村").val("," ) );
		
		this.clearMarkers();
		GLOBE.DIALOG.INFOBOX.hide();
	},
	
	// 地図上の検索結果マーカーを全て削除
	clearMarkers : function()
	{
		this.removeMarkersByKey(this.markerNamePrefix);
	},
	
	// 検索結果を作成。<a>を返す。
	makeItem : function( item, index, subTitle )
	{
		var a = $( '<a>' ).attr( { 'href' : 'javascript:void(0);' } );
		var title = item.properties.title;
		
		var div = $( '<div>' ).html( title ).addClass('title');
		a.append( div );

		if ( subTitle && subTitle != '' )
		{
			div = $( '<div>' ).html( subTitle ).addClass('muni');
			a.append( div );
		}

		a.click( this.onResultClick.bind(this, index, item) );
		a.mouseenter( this.onResultMouseover.bind(this, index, item) );
		a.mouseleave( this.onResultMouseout.bind(this, index, item) );
		a.css({
			"padding-left": '32px',
			"background" : "url(" + this.normalMarkerUrl + ") no-repeat 0px 50%"
		});
		
		var data = {
			type: 'SEARCH',
			title: title,
			subTitle: subTitle,
			lon: item.geometry.coordinates[0],
			lat: item.geometry.coordinates[1]
		};
		
		this.addMarker(item.geometry.coordinates[0], item.geometry.coordinates[1], this.markerNamePrefix + index, data);
		
		return a;
	},
	
	// イベント：検索結果をクリックした時
	onResultClick: function( index, item )
	{
		var lon = item.geometry.coordinates[0];
		var lat = item.geometry.coordinates[1];
		
		GLOBE.DIALOG.INFOBOX.hide();
		GLOBE.MAP.fly( lon, lat, CONFIG.Z2HEIGHT[15] );
	},
	
	// イベント：検索結果にマウスカーソルを乗せた時
	onResultMouseover: function( index, item )
	{
		var lon = item.geometry.coordinates[0];
		var lat = item.geometry.coordinates[1];
		
		this.showActiveMarker(true, lon, lat);
	},
	
	// イベント：検索結果からマウスカーソルが離れた時
	onResultMouseout: function( index, item )
	{
		var lon = item.geometry.coordinates[0];
		var lat = item.geometry.coordinates[1];
		
		this.showActiveMarker(false);
	},
	
	// マーカーレイヤー作成
	createMarkerLayer: function()
	{
		this.markerLayer = GLOBE.MAP.createMarkerLayer();
	},
	
	// 指定のマーカーをハイライト
	showActiveMarker: function(bool, lon, lat)
	{
		if ( !bool )
		{
			lon = 1000;
			lat = 1000;
		}
		for ( var key in this.markers )
		{
			if ( this.markers[key] )
			{
				if ( this.markers[key].lon == lon && this.markers[key].lat == lat )
				{
					this.markers[key].obj.image = this.activeMarkerUrl;
				}
				else
				{
					this.markers[key].obj.image = this.normalMarkerUrl;
				}
			}
		}
	},
	
	// マーカーを配置
	addMarker: function(lon, lat, uniqueKey, data)
	{
		if ( this.markerLayer.isDestroyed() ) this.createMarkerLayer();
		
		var key = uniqueKey || 'default';
		
		if ( this.markers[key] )
		{
			this.removeMarker(key);
		}
		
		var pinObj = GLOBE.MAP.addMarker(this.markerLayer, lon, lat, this.normalMarkerUrl, "LEFT", "BOTTOM", data);
		
		this.markers[key] = {
			'obj' : pinObj,
			'lon' : lon,
			'lat' : lat,
			'data': data
		};
		
		return pinObj;
	},
	
	// マーカーを削除
	removeMarker: function( uniqueKey )
	{
		if ( this.markerLayer.isDestroyed() ) this.createMarkerLayer();
		
		var key = uniqueKey || 'default';
		
		if ( this.markers[key] )
		{
			GLOBE.MAP.removeMarker( this.markerLayer, this.markers[key].obj );
			//this.markerLayer.remove( this.markers[key].obj );
			this.markers[key] = null;
		}
	},
	
	// マーカーを削除（接頭語が一致するもの全て）
	removeMarkersByKey: function( keyPrefix )
	{
		var re = new RegExp('^' + keyPrefix);
		for ( var key in this.markers )
		{
			if ( key.match(re) )
			{
				this.removeMarker(key);
			}
		}
	},
	
	// マーカーを全て削除
	removeMarkersAll: function()
	{
		for ( var key in this.markers )
		{
			this.removeMarker(key);
		}
		this.markers = [];
	}
});

/************************************************************************
 地図操作
 ************************************************************************/

GLOBE.MAP = {
	viewer: null,
	mapElementId: 'cesiumContainer',
	
	// 既定値
	defaults: {
		basemap: 'std',
		baseGray: false,
		layers: '',
		layersShow: '',
		height:  3000000.0,
		lon:     138.75,
		lat:     35.999887,
		heading: 0,
		pitch:   -90,
		roll:    0,
		zoomlevel:   5,
		heightPower: 1
	},
	initials: {},	// URLパラメータを含めた初期値
	currents: {},	// 現在の値
	
	defaultFlyHeight: 4000,
	
	heightPowerMin: 0,
	heightPowerMax: 9.9,
	heightPowerStep: 0.1,
	
	centerMarkerUrl: 'image/system/crosshairs.png',
	centerMarkerLayer: null,
	centerMarker: null,
	
	updates: {
		corridor: []
	},
	
	isIE: GSI.Utils.Browser.ie,
	
	create: function()
	{
		// URLまたは既定値から初期設定
		this.initSetting();
		
		// 地図を作成
		this.viewer = this.initViewer();
		
		this.viewer.scene.terrainProviderChanged.addEventListener(function(){
			// terrainにドレープするためtrueにする（変更）
			// 地表にオブジェクトを接着するためfalseとする
			this.viewer.scene.globe.depthTestAgainstTerrain = false;
		}.bind(this));
		
		this.viewer.camera.moveEnd.addEventListener( this.onCameraMoveEnd.bind(this) );
		
		this.setClickEvent();
		
		this.centerMarkerLayer = this.createMarkerLayer();
		
		this.initPosition();
		
		if ( CONFIG.ISFROMGSIMAP )
		{
			var height = this.initials.height - (this.initials.height * 0.02 * (18 - this.getCurrentZoom()));
			this.viewer.camera.flyTo({
				destination: Cesium.Cartesian3.fromDegrees(this.initials.lon, this.initials.lat, height),
				orientation: {
					heading : Cesium.Math.toRadians(0),
					pitch : Cesium.Math.toRadians(-50),
					roll : Cesium.Math.toRadians(0),
				},
				complete: function(){
					var latLng1 = this.getCenterPosition(true);
					var latLng2 = this.getCameraPosition();
					var diff = Math.abs(latLng1[0] - latLng2[0]);
					
					this.viewer.camera.flyTo({
						destination: Cesium.Cartesian3.fromDegrees(latLng2[1], latLng2[0]-diff, height),
						orientation: {
							heading : Cesium.Math.toRadians(0),
							pitch : Cesium.Math.toRadians(-50),
							roll : Cesium.Math.toRadians(0),
						}
					});
				}.bind(this)
			});
		}
		
		$(window).on('hashchange', function(){
			if ( this._hashChangeLock )
			{
				this._hashChangeLock = false;
			}
			else
			{
				location.reload();
			}
		}.bind(this));
	},
	
	initSetting : function()
	{
		/*******************************************************************************************
		URL仕様
		-------------------------------
		■読み取り可能なハッシュ形式
		１）#[height]/[lat]/[lon]/[倍率]/[heading]/[pitch]/[roll]/&base=[BaseMap]&base_grayscale=[Gray]&ls=[Layers]&disp=[表示]
		２）#[zoom]/[lat]/[lon]/&base=[BaseMap]&base_grayscale=[Gray]&ls=[Layers]&disp=[表示]
		３）#[zoom]/[lat]/[lon]/[倍率]/&base=[BaseMap]&base_grayscale=[Gray]&ls=[Layers]&disp=[表示]&d=[Dlg]
		
		■パラメータ補足
		・１は、地理院地図Globeが動的に生成するハッシュ。
		・２と３は、地理院地図準拠。
		・heading, pitch, rollの指定があれば、最初のパラメータはheightとして解釈（１）。その他の場合はzoomとして解釈（２または３）。
		・heightとzoomを同時に指定することは出来ない。
		
		height:  カメラの高さ（メートル）
		zoom:    ズームレベル（heading, pitch, rollの指定が無い場合、heightをzoomとして解釈する）
		lat:     カメラの緯度
		lon:     カメラの経度
		倍率:    地形の高さ倍率
		heading: カメラのHeading
		pitch:   カメラのPitch
		roll:    カメラのRoll
		BaseMap: 背景地図のID
		Gray:    背景地図のグレースケールの状態。1=ON; パラメータ無し=OFF
		Layers:  選択中レイヤーのID。IDに続けてカンマ(,)で区切り透過率を指定（省略可）。複数レイヤーの場合は|で区切る。
		表示:    選択中レイヤーの表示状態。1=表示;0=非表示
		Dlg:     ダイアログの表示状態を指定。下記の文字を含む場合はそのダイアログを開く。（例：d=vl）
		         v: 「表示中の情報」ダイアログを開く
		         l: 「表示できる情報」ダイアログを開く
		*******************************************************************************************/
		$.extend(this.initials, this.defaults);
		
		var params = location.hash.replace(/^#/, '').split('/');
		
		if ( CONFIG.ISFROMGSIMAP )
		{
			this.initials.zoomlevel = parseInt( isNaN(params[0]) || params[0] < 1 || params[0] > 18 ? this.defaults.zoomlevel : params[0]*1 );
			this.initials.height = CONFIG.Z2HEIGHT[this.initials.zoomlevel];
		}
		else
		{
			this.initials.height = ( isNaN(params[0]) || params[0] <= 0 ? this.defaults.height : params[0]*1 );
		}
		
		this.initials.lat     = ( isNaN(params[1]) ? this.defaults.lat : params[1]*1 );
		this.initials.lon     = ( isNaN(params[2]) ? this.defaults.lon : params[2]*1 );
		this.initials.heightPower = ( isNaN(params[3]) ? this.defaults.heightPower : params[3]*1 );
		this.initials.heading = ( isNaN(params[4]) || isNaN(params[5]) || isNaN(params[6]) ? this.defaults.heading : params[4]*1 );
		this.initials.pitch   = ( isNaN(params[4]) || isNaN(params[5]) || isNaN(params[6]) ? this.defaults.pitch : params[5]*1 );
		this.initials.roll    = ( isNaN(params[4]) || isNaN(params[5]) || isNaN(params[6]) ? this.defaults.roll  : params[6]*1 );
		
		var params2 = location.hash.split('&');
		for ( var i=1; i<params2.length; i++ )
		{
			var params3 = params2[i].split('=');
			if ( $.isArray(params3) && params3.length >= 1 )
			{
				var key = params3[0];
				var val = params3[1];
				
				switch ( key )
				{
					case 'base':
						this.initials.basemap = ( val ? val : this.defaults.basemap ); break;
					case 'base_grayscale':
						this.initials.baseGray = ( val == '1' ? true : false ); break;
					case 'ls':
						this.initials.layers = ( val ? decodeURIComponent(val) : this.defaults.layers ); break;
					case 'disp':
						this.initials.layersShow = ( val.match(/^[01]*$/) ? val : this.defaults.layersShow ); break;
				}
			}
		}
		
		$.extend(this.currents, this.initials);
		
		this._beforeHeight = this.currents.height;
	},
	
	initViewer : function()
	{
		
		// viewerのインスタンス作成-------------
		var viewer = new Cesium.Viewer(this.mapElementId, {
			imageryProvider : Cesium.createOpenStreetMapImageryProvider({
				url : "https://maps.gsi.go.jp/xyz/" + this.initials.basemap + "/",
				credit : ""
			}),
			// デフォルト画面部品を非表示
			baseLayerPicker : false, // 右上背景地図選択部品
			geocoder : false,        // 右上文字列検索部品
			homeButton : false,      // 右上ホームボタン（ホーム＝USになるので）
			animation : false,       // 左下の時間前後操作部品
			timeline : false,        // 下の時間軸
			sceneModePicker: false,   // シーンモード変更ボタンの非表示
			fullscreenButton : false,       // フルスクリーンボタン
			navigationHelpButton : false,    // ヘルプボタン
			infoBox : false,
			selectionIndicator : false,
			creditContainer: "cesiumCreditContainer"
		});
		
		viewer.scene.globe.baseColor = Cesium.Color.WHITE;

		for ( var i=0; i<viewer.scene.imageryLayers.length; i++ )
		{
			viewer.scene.imageryLayers._layers[i].show = false;
		}
		
		// terrain
		this.setTerrainProvider(viewer);
		
		/*
		var globe = viewer.scene.globe;
			globe._surface._tileProvider._debug.wireframe = true;
		*/
		
		//右クリック操作不可
    	viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		
		return viewer;
	},
	
	setTerrainProvider: function(viewer)
	{
		this.currents.heightPower = (this.currents.heightPower ? this.currents.heightPower : this.defaults.heightPower);
		
		var options = $.extend( CONFIG.TERRAINPROVIDEROPTIONS, {heightPower: this.currents.heightPower} );
		var terrainProvider = new Cesium.JapanGSITerrainProvider(options);
		
		viewer.terrainProvider = terrainProvider;
		viewer.terrainProvider.heightmapTerrainQuality = 0.1;
		viewer.terrainProvider.hasVertexNormals = false;
		viewer.terrainProvider.hasWaterMask = false;
		viewer.terrainProvider.requestVertexNormals = true;
	},
	
	onCameraMoveEnd: function()
	{
		var latLng = this.getCameraPosition();
		if ( Math.abs(this._beforeHeight - latLng[2]) > this._beforeHeight * 0.1 )
		{
			this.onZoomChange(latLng[2]);
		}
		this.setPositionHash();
		this.updateClamp();
	},
	
	onZoomChange: function(height)
	{
		// Corridorの再描画
		var removeList = [];
		var addList = [];
		
		for ( var i=0; i<this.viewer.scene.primitives._primitives.length; i++ )
		{
			var primitive = this.viewer.scene.primitives._primitives[i];
			if ( primitive.type == 'upload_GroundPrimitive' && primitive.gene && primitive.gene.kind == 'corridor' )
			{
				var newPrimitive = this.createCorridorPrimitive(primitive.gene);
				newPrimitive.show = primitive.show;
				addList.push(newPrimitive);
				removeList.push(primitive);
			}
		}
		// 削除
		for ( var i=0; i<removeList.length; i++ )
		{
			this.viewer.scene.primitives.remove(removeList[i]);
		}
		// 追加
		for ( var i=0; i<addList.length; i++ )
		{
			this.viewer.scene.primitives.add(addList[i]);
		}
		
		
		// SingleTileImageryLayerの再描画
		for ( var key in this._singleImageryLayersHash )
		{
			this._singleImageryLayersHash[key].reload();
		}
		
		
		this._beforeHeight = height;
	},
	
	initPosition: function()
	{
		// カメラポジション
		this.viewer.camera.setView({
			destination : Cesium.Cartesian3.fromDegrees(this.initials.lon, this.initials.lat, this.initials.height),
			orientation: {
				heading: Cesium.Math.toRadians(this.initials.heading),
				pitch:   Cesium.Math.toRadians(this.initials.pitch),
				roll:    Cesium.Math.toRadians(this.initials.roll)
			}
		});
	},
	
	// 現在の状態に従ってURLを更新する
	updateHash: function()
	{
		var dlg = (GSI.GLOBALS.queryParams._viewListDialogVisible ? 'v' : '')
			    + (GSI.GLOBALS.queryParams._layerTreeDialogVisible ? 'l' : '');
		
		var hash = this.currents.height + '/' + this.currents.lat + '/' + this.currents.lon + '/' + this.currents.heightPower + '/'
			+ this.currents.heading + '/' + this.currents.pitch + '/' + this.currents.roll + '/'
			+ '&base=' + this.currents.basemap
			+ (this.currents.baseGray ? '&base_grayscale=1' : '')
			+ '&ls=' + encodeURIComponent(this.currents.layers)
			+ '&disp=' + this.currents.layersShow
			+ '&lcd=' + (GSI.GLOBALS.layerTreeDialog ? GSI.GLOBALS.layerTreeDialog.getCurrentPath() : '')
			+ (dlg ? '&d=' + dlg : '');
		
		this._hashChangeValue = '#' + hash;
		if ( this._hashChangeTimer )
		{
			clearTimeout(this._hashChangeTimer);
		}
		this._hashChangeTimer = setTimeout(function(){
			this._hashChangeLock = true;
			location.replace(this._hashChangeValue);
		}.bind(this), 300);
		
	},
	
	// 地図を操作した時に呼ぶ
	setPositionHash: function()
	{
		var cartesian = this.viewer.camera.position;
		var latLng = this.getCameraPosition();
		
		this.currents.lat = latLng[0];
		this.currents.lon = latLng[1];
		this.currents.height = latLng[2];
		this.currents.heading = Cesium.Math.toDegrees(this.viewer.camera.heading).toFixed(2)*1;
		this.currents.pitch   = Cesium.Math.toDegrees(this.viewer.camera.pitch).toFixed(2)*1;
		this.currents.roll    = Cesium.Math.toDegrees(this.viewer.camera.roll).toFixed(2)*1;
		this.currents.zoomlevel = this.getCurrentZoom();
		this.updateHash();
	},
	
	// レイヤーの状態を変更した時に呼ぶ
	setLayersHash: function()
	{
		var list = GSI.GLOBALS.mapLayerList.getList();
		var tile = GSI.GLOBALS.mapLayerList.getTileList();
		var layers = "";
		var layersShow = "";
		var base = "";
		var baseShow = "";
		this.currents.basemap = "";
		for ( var i=tile.length-1; i>=0; i-- )
		{
			if ( tile[i]._isBaseLayer )
			{
				this.currents.basemap = tile[i].id;
				base = '|' + tile[i].id;
				baseShow = ( tile[i]._visibleInfo._isHidden ? '0' : '1' );
				this.currents.baseGray = ( tile[i]._visibleInfo._grayScale ? true : false );
			}
			else
			{
				layers += '|' + tile[i].id;
				layersShow += ( tile[i]._visibleInfo._isHidden ? '0' : '1' );
			}
			layers += (tile[i]._visibleInfo.opacity < 1 ? ',' + tile[i]._visibleInfo.opacity.toFixed(2)*1 : '');
		}
		for ( var i=list.length-1; i>=0; i-- )
		{
			layers += '|' + list[i].id;
			layersShow += ( list[i]._visibleInfo._isHidden ? '0' : '1' );
		}
		layers = base + layers;
		layersShow = baseShow + layersShow;
		layers = ( layers ? layers.replace(/^\|/, '') : '' );
		this.currents.layers = layers;
		this.currents.layersShow = layersShow;
		this.updateHash();
	},
	
	// マーカーレイヤー作成
	createMarkerLayer: function()
	{
		var markerLayer = new Cesium.BillboardCollection({
			scene : this.viewer.scene
		});
		markerLayer["type"] = "pin";
		this.viewer.scene.primitives.add(markerLayer);
		return markerLayer;
	},
	
	// 指定のレイヤーへマーカーを追加
	addMarker: function(markerLayer, lon, lat, imageUrl, hOrigin, vOrigin, data)
	{
		// hOrigin = [ "LEFT" || "CENTER" || "RIGHT" ]
		// vOrigin = [ "BOTTOM" || "CENTER" || "TOP" ]
		
		var h = ( hOrigin ? hOrigin : "LEFT" );
		var v = ( vOrigin ? vOrigin : "BOTTOM" );
		var ho = 1;
		var vo = 1;
		
		switch ( h.toUpperCase() )
		{
			case "RIGHT":
				ho = Cesium.HorizontalOrigin.RIGHT;
				break;
			case "CENTER":
				ho = Cesium.HorizontalOrigin.CENTER;
				break;
			default:
				ho = Cesium.HorizontalOrigin.LEFT;
				break;
		}
		
		switch ( v.toUpperCase() )
		{
			case "TOP":
				vo = Cesium.VerticalOrigin.TOP;
				break;
			case "CENTER":
				vo = Cesium.VerticalOrigin.CENTER;
				break;
			default:
				vo = Cesium.VerticalOrigin.BOTTOM;
				break;
		}
		
		var pinObj = markerLayer.add({
			image : imageUrl,
			horizontalOrigin : ho,
			verticalOrigin : vo,
			position : Cesium.Cartesian3.fromDegrees(lon, lat, 0),
			heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
		});
		if ( data ) pinObj["data"] = data;
		
		return pinObj;
	},
	
	// 指定のレイヤーから指定のマーカーを削除
	removeMarker: function(markerLayer, marker)
	{
		markerLayer.remove( marker );
	},
	
	/*
	 * レイヤー削除
	 * layerName : レイヤー名
	 */
	deleteLayer: function(type, name, id)
	{
		// 「表示中の情報」--------------------
		if(type == "layer"){
			// __ geojsonタイル
			if(name == "geojson"){
				var len = this.viewer.scene.primitives.length;
				for(var i=len-1; i>=0; i--){
					var primitiveCollection = this.viewer.scene.primitives._primitives[i];
					// QuadtreePrimitive削除
					if(primitiveCollection.type == "GeojsonTile_QuadtreePrimitive"){
						this.viewer.scene.primitives.remove(primitiveCollection);
					}
					// LabelCollection削除
					if(primitiveCollection.type == "GeojsonTile_labelCollection"){
						this.viewer.scene.primitives.remove(primitiveCollection);
					}
				}
			// __ その他レイヤー
			}else{
				var layerId = $(".contents").find("[layerName="+name+"]").attr("layerId");
				var targetLayer = this.getLayerById(layerId);
				this.viewer.imageryLayers.remove(targetLayer, true);
			}
			
		// 「ファイルから読み込み」--------------------
		}else if(type == "upload"){
			// 【 Primitive 】
			var primitives = this.getPrimitiveCollectionById(id);
			for(var i=0; i<primitives.length; i++){
				this.viewer.scene.primitives.remove(primitives[i]);
			}
			// 【 Entity 】
			var dataSource = this.getDataSourceById(id);
			if(dataSource){
				this.viewer.dataSources.remove(dataSource);
			}
			// 【SingleTile】
			this.removeSingleImageryLayer(id);
		}
	},
	
	/*
	 * レイヤーの表示/非表示を切り替える
	 */
	hide_showLayer: function(type, name, id, isShow, isShow2)
	{
		// 「表示中の情報」--------------------
		if(type == "layer"){
			// __ geojsonタイル
			if(name == "geojson"){
				var len = this.viewer.scene.primitives.length;
				for(var i=0; i<len; i++){
					var primitiveCollection = this.viewer.scene.primitives._primitives[i];
					// LabelCollection
					if(primitiveCollection.type == "GeojsonTile_labelCollection"){
						/*
						for(var j=0; j<primitiveCollection._labels.length; j++){
							primitiveCollection._labels[j].show = isShow;
						}
						*/
						for(var j=0; j<primitiveCollection._billboards.length; j++){
							primitiveCollection._billboards[j].show = isShow;
						}
					}
				}
			// __ その他レイヤー
			}else{
				var targetLayer = getLayerById(id);
					targetLayer.show = isShow;
			}
		// 「ファイルから読み込み」--------------------
		}else if(type == "upload"){
			// 【 Primitive 】
			var primitives = this.getPrimitiveCollectionById(id);
			for(var i=0; i<primitives.length; i++){
				// billboards
				if(primitives[i]._billboards){
					for(var j=0; j<primitives[i]._billboards.length; j++){
						if (primitives[i]._billboards[j]._index == 1){
							if (isShow && isShow2){
								primitives[i]._billboards[j].show = true;
							}else{
								primitives[i]._billboards[j].show = false;
							}
						}else{
							primitives[i]._billboards[j].show = isShow;
						}
					}
				// groundPrimitive
				}else{
					primitives[i].show = isShow;
				}
			}

			// 【 Entity 】
			var dataSource = this.getDataSourceById(id);
			if(dataSource){
				var entities = dataSource._entityCollection._entities._array;
				for(var i=0; i<entities.length; i++){
					entities[i].show = isShow;
				}
			}
			
			// 【SingleTile】
			this.showSingleImageryLayer(id, isShow);
		}
	},

	// ラベルの表示/非表示を切り替える
	hide_showLabel: function(type, name, id, isShow, isShow2)
	{
		// 「ファイルから読み込み」--------------------
		if(type == "upload"){
			// 【 Primitive 】
			var primitives = this.getPrimitiveCollectionById(id);
			for(var i=0; i<primitives.length; i++)
			{
				if(primitives[i]._billboards)
				{
					for (var j=0; j<primitives[i]._billboards.length; j++)
					{
						if(primitives[i]._billboards[j]._index == 1)
						{
							if (isShow && isShow2)
							{
								primitives[i]._billboards[j].show = true;
							}
							else
							{
								primitives[i]._billboards[j].show = false;
							}
						}
					}
				}
			}
			
			// 【 Entity 】
			var dataSource = this.getDataSourceById(id);
			if(dataSource)
			{
				var entities = dataSource.entities.values;
				for(var i=0; i<entities.length; i++)
				{
					var entity = entities[i];
					if ( entity.billboard )
					{
						entity.label.show = isShow2;
					}
				}
			}
		}
	},
	/*
	 * レイヤーの透過率を切り替える
	 */
	layerChangeOpacity: function(layerName, layerID, value)
	{
		// __ geojsonタイル
		if(layerName == "geojson"){
			var len = this.viewer.scene.primitives.length;
			for(var i=0; i<len; i++){
				var primitiveCollection = this.viewer.scene.primitives._primitives[i];
				// LabelCollection
				if(primitiveCollection.type == "GeojsonTile_labelCollection"){
					/*
					for(var j=0; j<primitiveCollection._labels.length; j++){
						// fill
						var color = primitiveCollection._labels[j].fillColor;
						primitiveCollection._labels[j].fillColor = new Cesium.Color(color.red, color.green, color.blue, value / 100);
						// outline
						var color = primitiveCollection._labels[j].outlineColor;
						primitiveCollection._labels[j].outlineColor = new Cesium.Color(color.red, color.green, color.blue, value / 100);
					}
					*/
					for(var j=0; j<primitiveCollection._billboards.length; j++){
						var color = primitiveCollection._billboards[j]._color;
						primitiveCollection._billboards[j].color = new Cesium.Color(color.red, color.green, color.blue, value / 100);
					}
				}
			}
		// __ その他レイヤー
		}else{
			var targetLayer = getLayerById(layerID);
				targetLayer.alpha = value / 100;
		}
	},
	
	/*
	 * 画像調整
	 */
	layerImageryAdjustment: function(layerName, layerID, type, value)
	{
		// __ geojsonタイル以外
		if(layerName != "geojson"){
			var targetLayer = getLayerById(layerID);
			targetLayer[type] = value / 1;
		}
	},
	
	// 指定の位置へ移動
	fly: function(lon, lat, z)
	{
		z = ( z === undefined ? this.defaultFlyHeight : z );
		
		this.viewer.scene.camera.flyTo({
			destination : Cesium.Cartesian3.fromDegrees(lon, lat, z),
			complete: function(){
				
			}
		});
	},
	
	// 既定の位置へ移動
	flyToDefault: function()
	{
		this.fly(this.defaults.lon, this.defaults.lat, this.defaults.height);
	},
	
	// flyTo等の完了時に呼ぶ
	adjustFly: function()
	{
		var latLng = this.getCameraPosition();
		
		if ( latLng[2] < CONFIG.Z2HEIGHT[15] )
		{
			this.fly(latLng[1], latLng[0], CONFIG.Z2HEIGHT[15]);
		}
	},
	
	/*
	 * レイヤーIDからレイヤーを取得
	 */
	getLayerById: function(layerID)
	{
		var layers = this.viewer.imageryLayers._layers;
		for(var i=0; i<layers.length; i++){
			if(layers[i].layerId == layerID){
				return layers[i];
			}
		}
	},
	
	/*
	 * primitiveIDからprimitiveCollectionを取得
	 */
	getPrimitiveCollectionById: function(id)
	{
		var array = [];
		var len = this.viewer.scene.primitives._primitives.length;

		for(var i=0; i<len; i++){
			var primitiveCollection = this.viewer.scene.primitives._primitives[i];
			if(primitiveCollection.primitiveID == id){
				array.push(primitiveCollection);
			}
		}

		return array;
	},
	
	/*
	 * dataSourceIDからdataSourceを取得
	 */
	getDataSourceById: function(id)
	{
		for(var i=0; i<this.viewer.dataSources._dataSources.length; i++){
			var dataSource = this.viewer.dataSources._dataSources[i];
			if(dataSource.id == id){
				return dataSource;
			}
		}
	},
	
	/*
	 * クリック/タップ/選択した地名の位置にピンをドロップ
	 */
	pindrop: function(lon, lat, type, color)
	{
		if(!color){
			color = Cesium.Color.RED;
		}
		if(!type){
			type = "pin";
		}
		
		var billboardCollection = new Cesium.BillboardCollection({
			scene : this.viewer.scene
		});
		billboardCollection["type"] = type;
		this.viewer.scene.primitives.add(billboardCollection);

		// Create a blank, solid colored pin.
		billboardCollection.add({
			image : new Cesium.PinBuilder().fromColor(color, 36),
			verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
			position : Cesium.Cartesian3.fromDegrees(lon, lat, 0),
			heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
		});
	},
	
	// 既存のピン(billboards)がある場合は消去
	clearPinLayers: function(type)
	{
		var len = this.viewer.scene.primitives.length;
		for(var i=len-1; i>=0; i--){
			var primitiveCollection = this.viewer.scene.primitives._primitives[i];
			if(!type || primitiveCollection.type == type){
				this.viewer.scene.primitives.remove(primitiveCollection);
			}
		}
	},
	
	// 中心地点に印を表示（現在はカメラ位置を返すが、仕様を変更する予定）
	showCenterMarker: function(lon, lat)
	{
		if ( this.centerMarkerLayer.isDestroyed() ) this.centerMarkerLayer = this.createMarkerLayer();
		
		var pos = this.getCameraPosition();
		
		this.centerMarker = this.addMarker(
			this.centerMarkerLayer,
			( lon ? lon : pos.lon ),
			( lat ? lat : pos.lat ),
			this.centerMarkerUrl,
			"CENTER",
			"CENTER"
		);
	},
	
	// 中心地点の印を非表示
	hideCenterMarker: function()
	{
		
	},
	
	// ウィンドーの中心座標を返す
	getCenterPosition: function(useCameraFlg)
	{
		var center = new Cesium.Cartesian2( $('#' + this.mapElementId).width()/2, $('#' + this.mapElementId).height()/2 );
		var ray = this.viewer.camera.getPickRay(center);
		var intersection = this.viewer.scene.globe.pick(ray, this.viewer.scene);
		if ( intersection )
		{
			return this.degreesFromCartesian(intersection);
		}
		else if ( useCameraFlg )
		{
			return this.getCameraPosition();
		}
		else
		{
			return undefined;
		}
	},
	
	// カメラ位置から latLng : [lat, lon, height] を返す
	getCameraPosition: function()
	{
		var cartesian = this.viewer.camera.position;
		return this.degreesFromCartesian(cartesian);
	},
	
	// Cartesian から latLng : [lat, lon, height] を返す
	degreesFromCartesian: function(cartesian)
	{
		var ellipsoid = this.viewer.scene.globe.ellipsoid;
		var cartographic = ellipsoid.cartesianToCartographic(cartesian);
		var height = cartographic.height.toFixed(0) * 1;
		var lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(8) * 1;
		var lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(8) * 1;
		return [ lat, lon, height ];
	},
	
	getCurrentZoom: function()
	{
		var zoom = 1;
		var tilesToRender = this.viewer.scene.globe._surface._tilesToRender;
		//this.getZoomLevel();
		if ( Cesium.defined( tilesToRender ) )
		{
			var levels = [];
			var levelTotal = 0;
			for( var i=0; i<tilesToRender.length; i++ )
			{
				levelTotal += tilesToRender[i]._level;
			}
			if ( tilesToRender.length > 0 )
				zoom = parseInt( Math.round( levelTotal / tilesToRender.length ) );
			if ( zoom < 2 ) zoom = 2;
			if ( zoom > 18 ) zoom = 18;
		}
		
		return zoom;
	},
	
	setHeightPower: function( val )
	{
		this.currents.heightPower = val;
		this.setTerrainProvider(this.viewer);
		this.updateHash();
	},
	
	/*
	 * geojson追加
	 */
	drawGeojson: function(geojson, fileName, callbackFnc)
	{
		try{
			var id = this.getNewId();

			var latArray = [];
			var lonArray = [];

			var geojson = JSON.parse(geojson);
			var len     = geojson.features.length;
			
			for(var i=0; i<len; i++){
				var primitiveArray = [];

				var feature = geojson.features[i];
				var coord   = feature.geometry.coordinates;
				var name        = (feature.properties.name)? feature.properties.name : "名称なし";
				var description = this.getEntityDescription(feature.properties);
				var geomType    = feature.geometry.type;
				var markerType = feature.properties._markerType;
				
				var html = (markerType == 'DivIcon' ? feature.properties._html : name);
				var ellipsoid = this.viewer.scene.globe.ellipsoid;
				
				// ポイント(アイコン,TEXT)-------------
				if(geomType == "Point" && (markerType == "Icon" || markerType == "DivIcon")){
					var position    = new Cesium.Cartesian3.fromDegrees(coord[0], coord[1], 0, ellipsoid);
					var imageURL    = (markerType == "DivIcon")? "image/system/icon_nothing.png" : feature.properties._iconUrl;

					lonArray.push(coord[0]);
					latArray.push(coord[1]);
					
					this.addSingleImageryLayer(id, name, position, imageURL);
					
					// Billboardとして追加する
					var billboardCollection = new Cesium.BillboardCollection({
						scene : this.viewer.scene
					});
					billboardCollection["primitiveID"] = id;
					this.viewer.scene.primitives.add(billboardCollection);

					var billboards = (markerType == "DivIcon" ?
						this.getPrimitiveDiv_Icon(position, html) :
						this.getPrimitivePoint_Icon(position, imageURL, name)
					);
					
					for(var j=0; j<billboards.length; j++){
						var billboard = billboardCollection.add(billboards[j]);
						billboard["description"] = description;
						billboard["name"]        = name;
						billboard["type"]        = "upload_Billboard";
						billboard["gsidata"] = {
							"_markerType" : markerType,
							"_isLabel"    : (j==1 ? true : false)
						}
					}

				// ポイント(円)-----------------------
				}else if(feature.geometry.type == "Point" && feature.properties._markerType == "Circle"){
					var position    = new Cesium.Cartesian3.fromDegrees(coord[0], coord[1]);
					var fillColor   = this.hexToRgb(feature.properties._fillColor);
						fillColor   = new Cesium.Color(fillColor[0]/255, fillColor[1]/255, fillColor[2]/255, feature.properties._fillOpacity);
					var strokeColor = this.hexToRgb(feature.properties._color);
						strokeColor = new Cesium.Color(strokeColor[0]/255, strokeColor[1]/255, strokeColor[2]/255, feature.properties._opacity);
					var strokeWidth = feature.properties._weight;
					var radius      = feature.properties._radius;

					lonArray.push(coord[0]);
					latArray.push(coord[1]);

					// 【 IE11 】
					if(this.isIE){
						// 円をPrimitiveとして追加する
						var geomInstance = this.getPrimitiveIcon_Circle(position, fillColor, radius, this.isIE);
						var primitive = new Cesium.Primitive({
							geometryInstances : [geomInstance],
							appearance : new Cesium.EllipsoidSurfaceAppearance({
								material : Cesium.Material.fromType("Color", {
									"color" : fillColor
								})
							})
						});
						primitiveArray.push(primitive);

						// アウトラインをPrimitiveとして追加する
						if(feature.properties._opacity > 0){
							var positions = this.getCirclePosition(position, radius);
							var geomInstance = this.getPrimitiveLinestring(positions, strokeColor, strokeWidth, this.isIE);
							var linePrimitive = new Cesium.Primitive({
								geometryInstances : [geomInstance],
								appearance : new Cesium.EllipsoidSurfaceAppearance({
									material : Cesium.Material.fromType("Color", {
										"color" : strokeColor
									})
								})
							});
							primitiveArray.push(linePrimitive);
						}
					// 【 IE以外 】
					}else{
						// 円をGroundPrimitiveとして追加する
						var geomInstance = this.getPrimitiveIcon_Circle(position, fillColor, radius, this.isIE);
						var primitive = new Cesium.GroundPrimitive({
							geometryInstances : [geomInstance]
						});
						primitiveArray.push(primitive);

						// 枠線をGroundPrimitiveとして追加する
						if(feature.properties._opacity > 0){
							var positions = this.getCirclePosition(position, radius);
							
							var gene = {
								kind: "corridor",
								type: "upload_GroundPrimitive",
								primitiveID: id,
								description: description,
								name: name,
								position: positions,
								color: strokeColor,
								width: strokeWidth,
								isIE: this.isIE
							};
							
							var linePrimitive = this.createCorridorPrimitive(gene);
							primitiveArray.push(linePrimitive);
						}
					}

				// ラインストリング-------------------
				}else if(feature.geometry.type == "LineString"){
					var position    = this.getPosition(coord);
					var color       = this.hexToRgb(feature.properties._color);
						color       = new Cesium.Color(color[0]/255, color[1]/255, color[2]/255, feature.properties._opacity);
					var width       = feature.properties._weight;

					var lonlatArray = this.getLonLatArrayForGeojson(coord);
					Array.prototype.push.apply(lonArray, lonlatArray.lon);
					Array.prototype.push.apply(latArray, lonlatArray.lat);

					var gene = {
						kind: "corridor",
						type: "upload_GroundPrimitive",
						primitiveID: id,
						description: description,
						name: name,
						position: position,
						color: color,
						width: width,
						isIE: this.isIE
					};
					
					var linePrimitive = this.createCorridorPrimitive(gene);
					primitiveArray.push(linePrimitive);

				// ポリゴン---------------------------
				}else if(feature.geometry.type == "Polygon"){

					var hierarchy   = new Cesium.PolygonHierarchy(this.getPosition(coord));
					var color       = this.hexToRgb(feature.properties._fillColor);
						color       = new Cesium.Color(color[0]/255, color[1]/255, color[2]/255, feature.properties._fillOpacity);
					var strokeColor = this.hexToRgb(feature.properties._color);
						strokeColor = new Cesium.Color(strokeColor[0]/255, strokeColor[1]/255, strokeColor[2]/255, feature.properties._opacity);
					var strokeWidth = feature.properties._weight;

					var lonlatArray = this.getLonLatArrayForGeojson(coord);
					Array.prototype.push.apply(lonArray, lonlatArray.lon);
					Array.prototype.push.apply(latArray, lonlatArray.lat);

					// 【 IE11 】
					if(this.isIE){
						// ポリゴンをPrimitiveとして追加する
						var geomInstance = this.getPrimitivePolygon(hierarchy, color, this.isIE);
						var primitive = new Cesium.Primitive({
							geometryInstances : [geomInstance],
							appearance : new Cesium.EllipsoidSurfaceAppearance({
								material : Cesium.Material.fromType("Color", {
									"color" : color
								})
							})
						});
					// 【 IE11以外 】
					}else{
						// ポリゴンをGroundPrimitiveとして追加する
						var geomInstance = this.getPrimitivePolygon(hierarchy, color, this.isIE);
						var primitive = new Cesium.GroundPrimitive({
							geometryInstances : [geomInstance]
						});
					}
					primitiveArray.push(primitive);
					
					// 枠線をPrimitiveとして追加する
					var gene = {
						kind: "corridor",
						type: "upload_GroundPrimitive",
						primitiveID: id,
						description: description,
						name: name,
						position: hierarchy.positions,
						color: strokeColor,
						width: strokeWidth,
						isIE: this.isIE
					};
					if(feature.properties._opacity > 0){
						var linePrimitive = this.createCorridorPrimitive(gene);
						primitiveArray.push(linePrimitive);
					}
				}

				// 円・ラインストリング・ポリゴンの場合
				if(primitiveArray.length > 0){
					for(var j=0; j<primitiveArray.length; j++){
						var primitive = primitiveArray[j];
						primitive["type"]        = "upload_GroundPrimitive";
						primitive["primitiveID"] = id;
						primitive["description"] = description;
						primitive["name"]        = name;
						this.viewer.scene.primitives.add(primitive);
					}
				}
			}

			// ズーム
			var west  = Math.min.apply(null, lonArray);
			var east  = Math.max.apply(null, lonArray);
			var south = Math.min.apply(null, latArray);
			var north = Math.max.apply(null, latArray);
			west  = west-(east-west)/3;
			east  = east+(east-west)/3;
			south  = south-(north-south)/3;
			north  = north+(north-south)/3;
			this.viewer.camera.flyTo({
				destination : new Cesium.Rectangle.fromDegrees(west, south, east, north),
				duration :1,
				complete: function(){
					GLOBE.MAP.adjustFly();
				}
			});

			// アップロード一覧に追加
			//addUploadList(fileName, id);
			if ( callbackFnc )
			{
				callbackFnc({
					'id': id,
					'len': len,
					'file': fileName,
					'visible': true,
					'visibleOfLabel': false
				});
			}
		}
		catch(e){
			alert("正常に読み込めませんでした。\n【エラー内容】\n" + e);
			if ( callbackFnc )
			{
				callbackFnc();
			}
		}
	},
	
	/*
	 * kml追加
	 　追加時はcurrentIdにはnullを指定。再読み込み時は自身のidを指定。
	 */
	drawKml: function(kml, fileName, currentId, callbackFnc)
	{
		if ( currentId )
		{
			// Reloadの場合：消しておく
			GLOBE.MAP.deleteLayer('upload', '', currentId);
		}
		
		try{
			var id = ( currentId ? currentId : this.getNewId() );
			var latArray = [];
			var lonArray = [];
			var len = 0;

			// いったんdataSource追加
			var dataSource = new Cesium.KmlDataSource({
				camera: this.viewer.scene.camera,
				canvas: this.viewer.scene.canvas
			});
			this.viewer.dataSources.add(dataSource);

			// 高さ情報があるかどうか
			var depthFlag = true;
			depthFlag = (kml.toLowerCase().indexOf("<altitudemode>clamptoground</altitudemode>") >=0 ? false : depthFlag);
			
			var parsedKml = $.parseXML(kml);
			
			$(parsedKml).find('Style href').each(function(index, element){
				$(element).text( MATEST.proxyUrl( $(element).text() ) );
			});
			
			var result = {};
			
			// 高さ情報がある場合は倍率を適用
			parsedKml = this.applyHeightPowerToKML(parsedKml, result);
			depthFlag = (!result.depthFlag ? false : depthFlag);
			
			dataSource.load(parsedKml).then(function(dataSource){
				// 高さ情報がある場合はそのままentityとして描画----------------
				if(depthFlag){
					len = dataSource.entities.values.length;
					dataSource["id"] = id;
					
					this.initKmlDataSource(dataSource);
					
					if ( !currentId )
					{
						this.viewer.flyTo(dataSource, {
							duration: 1,
							complete: function(){
								GLOBE.MAP.adjustFly();
							}
						});
					}
				// 高さ情報がない場合はentityをprimitiveに変換して描画---------
				}
				else
				{
					var entities = dataSource._entityCollection.values;
					len = entities.length;
					dataSource["id"] = id;
					
					for(var i=0; i<entities.length; i++)
					{
						entities[i].show = false;  // いったん非表示にする
						if(entities[i]._children.length > 0){
							for(var j=0; j<entities[i]._children.length; j++){
								var arrayList = this.convertEntityToPrimitive(entities[i]._children[j], id);
								Array.prototype.push.apply(lonArray, arrayList.lon);
								Array.prototype.push.apply(latArray, arrayList.lat);
							}
						}else{
							var arrayList = this.convertEntityToPrimitive(entities[i], id);
							Array.prototype.push.apply(lonArray, arrayList.lon);
							Array.prototype.push.apply(latArray, arrayList.lat);
						}
						
					}
					//this.viewer.flyTo(entities);
					
					// dataSource削除
					this.viewer.dataSources.remove(dataSource);
					
					if ( !currentId )
					{
						// ズーム
						var west  = Math.min.apply(null, lonArray);
						var east  = Math.max.apply(null, lonArray);
						var south = Math.min.apply(null, latArray);
						var north = Math.max.apply(null, latArray);
						west  = west-(east-west)/3;
						east  = east+(east-west)/3;
						south  = south-(north-south)/3;
						north  = north+(north-south)/3;
						this.viewer.camera.flyTo({
							destination : new Cesium.Rectangle.fromDegrees(west, south, east, north),
							duration :1,
							complete: function(){
								GLOBE.MAP.adjustFly();
							}
						});
					}
				}

				// アップロード一覧に追加
				if ( callbackFnc )
				{
					callbackFnc({
						'id': id,
						'len': len,
						'file': fileName,
						'kml': kml,
						'visible': true,
						'visibleOfLabel': false
					});
				}
			}.bind(this));
		}
		catch(e){
			alert("正常に読み込めませんでした。\n【エラー内容】\n" + e);
			if ( callbackFnc )
			{
				callbackFnc();
			}
		}
	},
	
	initKmlDataSource : function( dataSource )
	{
		var entities = dataSource.entities.values;
		
		for(var i=0; i<entities.length; i++)
		{
			var entity = entities[i];
			entity.gsidata = {
				isKmlEntity : true
			};
			
			if (entity.billboard != undefined)
			{
				// アイコンとラベルの再設定
				entity.label.font         = 'bold 20px "メイリオ"';
				entity.label.outlineColor = Cesium.Color.WHITE;
				entity.label.outlineWidth = 3.0;
				entity.label.fillColor    = Cesium.Color.BLACK;
				entity.label.pixelOffset  = new Cesium.Cartesian2(20, -20);
				entity.label.show         = false;
				
				var url = entity.billboard.image._value;
				if ( url.match(/http/) )
				{
					var imgElm = new Image();
					imgElm.data = entity;
					imgElm.onload = function(){
						if ( this.height && this.width && !isNaN(this.height) && !isNaN(this.width) )
						{
							this.data.billboard.height = this.height;
							this.data.billboard.width = this.width;
						}
					};
					imgElm.src = url;
				}
			}
			else if (entity.polygon != undefined)
			{
				// ポリゴンの枠線を描画
				entity.polygon.outline = false;
				dataSource.entities.add({
					polyline : {
						positions : entity.polygon.hierarchy._value.positions.concat(entity.polygon.hierarchy._value.holes),
						width     : entity.polygon.outlineWidth._value,
						material  : entity.polygon.outlineColor._value
					}
				});
			}
		}
	},
	
	/*------------------------------*
	 * KMLのentityをpritimiveに変換 *
	 *------------------------------*/
	convertEntityToPrimitive: function(entity, id)
	{
		var ellipsoid = this.viewer.scene.globe.ellipsoid;

		var lonArray = [];
		var latArray = [];

		var name        = (entity._name ? entity._name : "");
		var description = (entity._description ? entity._description._value : "");
			description = $("<div/>").html(description).find("div").html();
		
		var primitiveArray = [];
		
		// ポイント(アイコン)-----------------
		if(entity._billboard != undefined){
			var position    = entity._position._value;
			var imageURL    = entity._billboard._image._value;
			
			// 緯度経度を配列に入れる
			var cartographic = ellipsoid.cartesianToCartographic(position);
			var lon = Cesium.Math.toDegrees(cartographic.longitude);
			var lat = Cesium.Math.toDegrees(cartographic.latitude);
			lonArray.push(lon);
			latArray.push(lat);
			
			this.addSingleImageryLayer(id, name, position, imageURL);
			
			// Billboardとして追加する
			var billboardCollection = new Cesium.BillboardCollection({
				scene : this.viewer.scene
			});
			billboardCollection["primitiveID"] = id;
			this.viewer.scene.primitives.add(billboardCollection);

			var billboards = this.getPrimitivePoint_Icon(position, imageURL, name);
			for(var j=0; j<billboards.length; j++){
				var billboard = billboardCollection.add(billboards[j]);
					billboard["description"] = description;
					billboard["name"]        = name;
					billboard["type"]        = "upload_Billboard";
					billboard["gsidata"] = {
						"_markerType" : "",
						"_isLabel"    : (j==1 ? true : false)
					}
			}
			
		// ポリゴン(円含む)----------------------
		}else if(entity._polygon != undefined){
			var hierarchy   = entity._polygon._hierarchy._value;
			var color       = entity._polygon._material._color._value;
			var strokeColor = entity._polygon._outlineColor._value;
			var strokeWidth = entity._polygon._outlineWidth._value;

			// 緯度経度を配列に入れる
			var positions = hierarchy.positions;
			for(var i=0; i<positions.length; i++){
				var cartographic = ellipsoid.cartesianToCartographic(positions[i]);
				var lon = Cesium.Math.toDegrees(cartographic.longitude);
				var lat = Cesium.Math.toDegrees(cartographic.latitude);
				lonArray.push(lon);
				latArray.push(lat);
			}
			
			// ポリゴン
			// 【 IE11 】
			if(this.isIE){
				// Primitiveとして追加する
				var geomInstance = this.getPrimitivePolygon(hierarchy, color, this.isIE);
				var primitive = new Cesium.Primitive({
					geometryInstances : [geomInstance],
					appearance : new Cesium.EllipsoidSurfaceAppearance({
						material : Cesium.Material.fromType("Color", {
							"color" : color
						})
					})
				});
			// 【 IE11以外 】
			}else{
				// GroundPrimitiveとして追加する
				var geomInstance = this.getPrimitivePolygon(hierarchy, color, this.isIE);
				var primitive = new Cesium.GroundPrimitive({
					geometryInstances : [geomInstance]
				});
			}
			primitive["type"] = "upload_GroundPrimitive";
			primitive["primitiveID"] = id;
			primitive["description"] = description;
			primitive["name"]        = name;
			this.viewer.scene.primitives.add(primitive);
			
			// 枠線をPrimitiveとして追加する
			var gene = {
				kind: "corridor",
				type: "upload_GroundPrimitive",
				primitiveID: id,
				description: description,
				name: name,
				position: hierarchy.positions,
				color: strokeColor,
				width: strokeWidth,
				isIE: this.isIE
			};
			if(entity._polygon._outlineColor._value.alpha > 0){
				var linePrimitive = this.createCorridorPrimitive(gene);
				this.viewer.scene.primitives.add(linePrimitive);
			}
			
		// ラインストリング----------------------
		}else if(entity._polyline != undefined){
			var position = entity._polyline._positions._value;
			var color    = entity._polyline._material._color._value;
			var width    = entity._polyline._width._value;

			// 緯度経度を配列に入れる
			for(var i=0; i<position.length; i++){
				var cartographic = ellipsoid.cartesianToCartographic(position[i]);
				var lon = Cesium.Math.toDegrees(cartographic.longitude);
				var lat = Cesium.Math.toDegrees(cartographic.latitude);
				lonArray.push(lon);
				latArray.push(lat);
			}
			
			var gene = {
				kind: "corridor",
				type: "upload_GroundPrimitive",
				primitiveID: id,
				description: description,
				name: name,
				position: position,
				color: color,
				width: width,
				isIE: this.isIE
			};
			
			var linePrimitive = this.createCorridorPrimitive(gene);
			this.viewer.scene.primitives.add(linePrimitive);
		}

		return {
			"lon" : lonArray,
			"lat" : latArray
		}
	},
	
	addSingleImageryLayer: function( id, name, position, imageURL )
	{
		if ( !CONFIG.TILEASICON_ENABLED ) return false;
		
		if ( !this._singleImageryLayersHash )
		{
			this._singleImageryLayersHash = {};
		}
		if ( !this._singleImageryLayersHash[id] )
		{
			this._singleImageryLayersHash[id] = {
				"id"      : id,
				"layers"  : [],
				"length"  : 0,
				"loadcnt" : 0,
				"removed" : false,
				"reload"  : function(){
					var layers = this._singleImageryLayersHash[id].layers;
					var list = [];
					for ( var i=0; i<layers.length; i++ )
					{
						list.push(layers[i].gsidata);
						this.viewer.scene.imageryLayers.remove(layers[i]);
					}
					this._singleImageryLayersHash[id].layers  = [];
					this._singleImageryLayersHash[id].length  = 0;
					this._singleImageryLayersHash[id].loadcnt = 0;
					for ( var i=0; i<list.length; i++ )
					{
						this.addSingleImageryLayer( list[i].id, list[i].name, list[i].position, list[i].url );
					}
					
				}.bind(this)
			};
		}
		this._singleImageryLayersHash[id].length += 1;
		
		var imgObj = new Image();
		imgObj.onload = function(){
			var imgMag = this.currents.height * 0.000000009;
			var latLng = this.degreesFromCartesian(position);
			var layers = this.viewer.scene.imageryLayers;
			
			var tempWest = latLng[1];
			var tempEast = latLng[1]+(imgObj.width * imgMag);
			var tempSouth = latLng[0];
			var tempNorth = latLng[0]+(imgObj.height * imgMag);
			
			var west  = tempWest  - ((tempEast - tempWest) / 2);
			var east  = tempEast  - ((tempEast - tempWest) / 2);
			var south = tempSouth - ((tempNorth - tempSouth) / 2);
			var north = tempNorth - ((tempNorth - tempSouth) / 2);
			
			var rect = Cesium.Rectangle.fromDegrees(west, south, east, north);
			var provider = new Cesium.SingleTileImageryProvider({
				url : MATEST.proxyUrl(imageURL),
				rectangle : rect,
				ellipsoid : this.viewer.scene.globe.ellipsoid
			});
			var layer = new Cesium.ImageryLayer(provider, {
				rectangle : rect
			});
			this.viewer.scene.imageryLayers.add(layer);
			
			//console.log(layer);
			layer.gsidata = {
				"id"   : id,
				"name" : name,
				"position" : position,
				"url"  : imageURL
			};
			
			if ( layer.alpha == 1 )
			{
				this.alphaSingleImageryLayer(id, 0.99999);
			}
			
			var hash = this._singleImageryLayersHash[id];
			hash.layers.push(layer);
			hash.loadcnt += 1;
			
			if ( hash.length == hash.loadcnt && hash.removed )
			{
				this.removeSingleImageryLayer(id);
			}
			imgObj = null;
			
		}.bind(this);
		imgObj.src = imageURL;
		
	},
	
	alphaSingleImageryLayer: function( id, alpha )
	{
		if ( !this._singleImageryLayersHash || !this._singleImageryLayersHash[id] ) return false;
		
		layers = this._singleImageryLayersHash[id].layers;
		for ( var i=0; i<layers.length; i++ )
		{
			layers[i].alpha = alpha;
		}
	},
	
	showSingleImageryLayer: function( id, bool )
	{
		if ( !this._singleImageryLayersHash || !this._singleImageryLayersHash[id] ) return false;
		
		layers = this._singleImageryLayersHash[id].layers;
		for ( var i=0; i<layers.length; i++ )
		{
			layers[i].show = bool;
		}
	},
	
	removeSingleImageryLayer: function( id )
	{
		if ( !this._singleImageryLayersHash || !this._singleImageryLayersHash[id] ) return false;
		
		this._singleImageryLayersHash[id].removed = true;
		layers = this._singleImageryLayersHash[id].layers;
		
		for ( var i=0; i<layers.length; i++ )
		{
			this.viewer.scene.imageryLayers.remove(layers[i]);
		}
		
		this._singleImageryLayersHash[id].layers = [];
	},
	
	createCorridorPrimitive: function(gene)
	{
		var geomInstance = null;
		var primitive = null;
		
		var latLng = this.getCameraPosition();
		var width = gene.width * latLng[2] / 600;
		
		// 【 IE11 】
		if(gene.isIE){
			// Primitiveとして追加する
			geomInstance = this.getPrimitiveLinestring(gene.position, gene.color, width, gene.isIE);
			primitive = new Cesium.Primitive({
				geometryInstances : [geomInstance],
				appearance : new Cesium.EllipsoidSurfaceAppearance({
					material : Cesium.Material.fromType("Color", {
						"color" : gene.color
					})
				})
			});
		// 【 IE11以外 】
		}else{
			// GroundPrimitiveとして追加する
			geomInstance = this.getPrimitiveLinestring(gene.position, gene.color, width, gene.isIE);
			primitive = new Cesium.GroundPrimitive({
				geometryInstances : [geomInstance]
			});
		}
		primitive["type"] = gene.type;
		primitive["primitiveID"] = gene.primitiveID;
		primitive["description"] = gene.description;
		primitive["name"]        = gene.name;
		primitive["gene"]        = gene;
		return primitive;
	},
	
	getPrimitiveDiv_Icon: function(position, html)
	{
		html = (html == '' ? '　' : html);
		var $html = $.parseHTML(html);
		if ( $html[0].nodeType == 3 )
		{
			$html = $('<div></div>').append(html);
		}
		else
		{
			$html = $(html);
		}
		html = $html.text();
		
		var array = [];
		
		if ( html != '　' )
		{
			// ラベル
			var options = {
				"font" : ($html.css('font-weight')  ? $html.css('font-weight') : 'normal') + ' '
						+ ($html.css('font-size')   ? $html.css('font-size')   : '20px') + ' '
						+ ($html.css('font-family') ? $html.css('font-family') : '"メイリオ"'),
				"fill"            : true,
				"fillColor"       : Cesium.Color.fromCssColorString( ($html.css('color') ? $html.css('color') : '#000') ),
				"stroke"          : true,
				"strokeColor"     : Cesium.Color.WHITE,
				"strokeWidth"     : 3,
				"backgroundColor" : ($html.css('background-color') ? Cesium.Color.fromCssColorString($html.css('background-color')) : Cesium.TRANSPARENT),
				"padding" : ($html.css('padding') ? parseInt($html.css('padding')) : 0)
			};
			
			var canvas = Cesium.writeTextToCanvas(html, options);
			
			array.push({
				"image"           : canvas,
				"width"           : canvas.width,
				"height"          : canvas.height,
				"verticalOrigin"  : Cesium.VerticalOrigin.BOTTOM,
				"horizontalOrigin": Cesium.HorizontalOrigin.LEFT,
				"position"        : position,
				"heightReference" : Cesium.HeightReference.CLAMP_TO_GROUND
				//"pixelOffset"     : new Cesium.Cartesian2(20, -20)  // 3D表示時の沈み防止
			    //"translucencyByDistance" : new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.0)
			});
		}
		
		return array;
	},
	
	/*
	 * ポイント(アイコン)のprimitive作成
	 */
	getPrimitivePoint_Icon: function(position, imageURL, name)
	{
		var array = [];
		
		// アイコン
		array.push({
			"image"           : imageURL,
			"verticalOrigin"  : Cesium.VerticalOrigin.CENTER,
			"horizontalOrigin": Cesium.HorizontalOrigin.CENTER,
			"position"        : position,
			"heightReference" : Cesium.HeightReference.CLAMP_TO_GROUND,
			"color"           : new Cesium.Color(1, 1, 1, (CONFIG.TILEASICON_ENABLED ? CONFIG.TILEASICON_ICONALPHA : 1))
		});
		
		if ( name )
		{
			// ラベル
			var options = {
				"font" : 'normal 20px "メイリオ"',
				"fill"            : true,
				"fillColor"       : Cesium.Color.BLACK,
				"stroke"          : true,
				"strokeColor"     : Cesium.Color.WHITE,
				"strokeWidth"     : 3,
				"backgroundColor" : Cesium.TRANSPARENT,
				"padding"         : 0
			};
			
			array.push({
				"image"           : Cesium.writeTextToCanvas(name, options),
				"verticalOrigin"  : Cesium.VerticalOrigin.CENTER,
				"horizontalOrigin": Cesium.HorizontalOrigin.CENTER,
				"position"        : position,
				"heightReference" : Cesium.HeightReference.CLAMP_TO_GROUND,
				"pixelOffset"     : new Cesium.Cartesian2(20, -20),  // 3D表示時の沈み防止
			    //"translucencyByDistance" : new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.0),
			    "show"            : false
			});
		}
		
		return array;
	},
	
	/*
	 * ポイント(サークル)のGeometryInstanceを作成
	 */
	getPrimitiveIcon_Circle: function(position, fillColor, radius, isIE)
	{
		var ellipse = new Cesium.EllipseGeometry({
			"center" : position,
			"semiMajorAxis" : radius,
			"semiMinorAxis" : radius
		});

		var geometryInstance = new Cesium.GeometryInstance({
			"geometry"   : ellipse,
			"attributes" : {
				"color": new Cesium.ColorGeometryInstanceAttribute(fillColor.red, fillColor.green, fillColor.blue, fillColor.alpha)
			},
			id: 'color'
		});

		return geometryInstance;
	},

	/*
	 * ポリゴンのGeometryInstanceを作成
	 */
	getPrimitivePolygon: function(hierarchy, color, isIE)
	{
		var polygon = new Cesium.PolygonGeometry({
			"polygonHierarchy" : hierarchy
		});

		var geometryInstance = new Cesium.GeometryInstance({
			"geometry"   : polygon,
			"attributes" : {
				"color" : new Cesium.ColorGeometryInstanceAttribute(color.red, color.green, color.blue, color.alpha)
			},
			id: 'color'
		});

		return geometryInstance;
	},

	/*
	 * ラインストリングのGeometryInstanceを作成
	 */
	getPrimitiveLinestring: function(positions, color, width, isIE)
	{
		var corridor = new Cesium.CorridorGeometry({
			"positions"    : positions,
			"width"        : width,
			"vertexFormat" : Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
		});
		
		var geometryInstance = new Cesium.GeometryInstance({
			geometry : corridor,
			attributes : {
				color : new Cesium.ColorGeometryInstanceAttribute(color.red, color.green, color.blue, color.alpha)
			},
			id: 'color'
		});

		return geometryInstance;

	},
	
	// 高さに倍率を掛ける（JSON用）
	applyHeightPowerToJSON: function( json )
	{
		//（仕様無し）
		return json;
	},
	
	// 高さに倍率を掛ける（KML用）
	applyHeightPowerToKML: function( kml, result )
	{
		var _3dCnt = 0;
		var _2dCnt = 0;
		$(kml).find('coordinates').each(function(index, element){
			var beforeCoordArg = $(element).text().split(/[^0-9\.\,]/);
			var afterCoordArg = [];
			for ( var i=0; i<beforeCoordArg.length; i++ )
			{
				if (beforeCoordArg[i] == '') continue;
				
				var pointArg = beforeCoordArg[i].split(',');
				if ( pointArg.length >= 3 )
				{
					pointArg[2] *= GLOBE.MAP.currents.heightPower;
					_3dCnt += 1;
				}
				else if ( pointArg.length >= 2 )
				{
					pointArg[2] = 0;
					_2dCnt += 1;
				}
				afterCoordArg.push( pointArg.join(',') );
			}
			$(element).text( afterCoordArg.join(' ') );
		});
		result.depthFlag = (_3dCnt == 0 ? false : true);
		return kml;
	},
	
	/*
	 * InfoBOXに表示する内容を返す
	 */
	getEntityDescription: function(prop)
	{
		var str = "";

		// テーブル記述の場合
		if(prop.description == undefined){
			for(var key in prop){
				if ( key.charAt(0) == "_" || key == "name") continue;
				
				if ( key.match(/^(iframe|description)$/) )
				{
					str += '<tr><td colspan="2">' + prop[key] + '</td></tr>';
				}
				else
				{
					str += '<tr><td>' + key + '</td><td>' + prop[key] + '</td></tr>';
				}
			}
			str = "<table>" + str + "</table>";
		// 自由記述の場合
		}else{
			str = prop.description
		}

		// TEXTの場合はhtmlもいれる
		if(prop._html){
			//str += "<br>" + prop._html;
		}

		return str;
	},
	
	/*
	 * Cartesian3の配列を返す
	 */
	getPosition: function(coord)
	{
		var arr = [];
		
		for(var i=0; i<coord.length; i++){
			if(Array.isArray(coord[i][0])){
				for(var j=0; j<coord[i].length; j++){
					arr.push(coord[i][j][0]);
					arr.push(coord[i][j][1]);
				}
			}else{
				arr.push(coord[i][0]);
				arr.push(coord[i][1]);
			}
		}
		
		return Cesium.Cartesian3.fromDegreesArray(arr);
	},
	
	/*
	 * ポイント(円)のCartesian3の配列を返す
	 */
	getCirclePosition: function(position, radius){
		var array = [];

		// 円の各ポイントの緯度経度を取得
		var r = Cesium.EllipseGeometryLibrary.computeEllipsePositions({
			semiMajorAxis: radius,
			semiMinorAxis: radius,
			rotation: 0,
			center: position,
			granularity : 0.02  // make this number larger to get fewer positions
		}, false, true);

		var positions = r.outerPositions;
		for (var i=0; i<positions.length; i+=3) {
			var cart = new Cesium.Cartesian3(positions[i], positions[i+1], positions[i+2]);
			array.push(cart);
		}

		// つなげる
		array.push(array[0]);

		return array;
	},
	
	/*
	 * 緯度の配列・経度の配列を返す【GeoJSON用】
	 */
	getLonLatArrayForGeojson: function(coord){
		var lonArray = [];
		var latArray = [];

		for(var i=0; i<coord.length; i++){
			if(Array.isArray(coord[i][0])){
				for(var j=0; j<coord[i].length; j++){
					lonArray.push(coord[i][j][0]);
					latArray.push(coord[i][j][1]);
				}
			}else{
				lonArray.push(coord[i][0]);
				latArray.push(coord[i][1]);
			}
		}

		var res = {
			"lon" : lonArray,
			"lat" : latArray
		}
		return res;
	},
	
	/*
	 * カラーコードからRGBに変換
	 */
	hexToRgb: function(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		var r = parseInt(result[1], 16);
		var g = parseInt(result[2], 16);
		var b = parseInt(result[3], 16);

		return [r, g, b];
	},
	
	/*
	 * ランダムな12桁の文字列を返す
	 */
	getRandomStr: function()
	{
		return Math.random().toString(10).slice(-12);
	},
	
	getNewId: function()
	{
		this._getNewIdCallCount = (this._getNewIdCallCount ? this._getNewIdCallCount + 1 : 1);
		var id = "_" + ("000000000" + this._getNewIdCallCount.toString()).slice(-11);
		return id;
	},
	
	updateClamp : function()
	{
		if ( this.currents.height > 150000 ) return [];
		var ellipsoid = GLOBE.MAP.viewer.scene.globe.ellipsoid;
		var rect = GLOBE.MAP.viewer.camera.computeViewRectangle(ellipsoid);
		var rectLatLng = {
			"west"  : Cesium.Math.toDegrees(rect.west),
			"south" : Cesium.Math.toDegrees(rect.south),
			"east"  : Cesium.Math.toDegrees(rect.east),
			"north" : Cesium.Math.toDegrees(rect.north)
		};
		var cnt = 0;
		this._updateClamp( rectLatLng, this.viewer.scene.primitives, cnt );
	},
	
	_updateClamp : function( rectLatLng, collection, cnt )
	{
		for ( var i=0; i<collection.length; i++ )
		{
			var primitive = collection.get(i);
			if ( primitive._primitives )
			{
				this._updateClamp( rectLatLng, primitive, cnt );
			}
			else if ( primitive._billboards )
			{
				for ( var j=0; j<primitive._billboards.length; j++ )
				{
					var billboard = primitive._billboards[j];
					if ( billboard._actualClampedPosition )
					{
						var latLng = this.degreesFromCartesian(billboard._actualClampedPosition);
						var cartographic = Cesium.Cartographic.fromDegrees(latLng[1], latLng[0]);
						var height = this.viewer.scene.globe.getHeight(cartographic);
						
						if ( rectLatLng.west <= latLng[1] && latLng[1] <= rectLatLng.east && rectLatLng.south <= latLng[0] && latLng[0] <= rectLatLng.north )
						{
							if ( Math.abs(height - latLng[2]) >= 50 )
							{
								billboard._updateClamping();
								cnt++;
							}
						}
					}
				}
			}
		}
		//console.log("update:", cnt);
	},
	
	setClickEvent : function ()
	{
		// 左クリック
		var leftClickHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
		leftClickHandler.setInputAction(function(event){
			var viewer = GLOBE.MAP.viewer;
			var obj = viewer.scene.pick(event.position);
			
			var title = "";
			var html = "";
			
			if ( obj && obj.primitive && obj.primitive.data && obj.primitive.data.type == 'SEARCH' )
			{
				// 検索アイコンクリック
				data = obj.primitive.data;
				
				title = data.title;
				html = '<table>'
					+ '<tr><th width="100">住所：</th><td>' + data.subTitle + '</td></tr>'
					+ '<tr><th>緯度：</th><td>' + data.lat + '</td></tr>'
					+ '<tr><th>経度：</th><td>' + data.lon + '</td></tr>'
					+ '</table>';
			}
			else if ( obj && obj.id && obj.id.gsidata && obj.id.gsidata.isKmlEntity )
			{
				// アップロードしたKMLエンティティをクリック
				title = obj.id.name;
				html  = (obj.id.description ? obj.id.description._value : '');
			}
			else if ( obj && obj.primitive )
			{
				// アイコンクリック
				title = (obj.primitive.name ? obj.primitive.name : '');
				html  = (obj.primitive.description ? obj.primitive.description : '');
			}
			
			if ( title || html )
			{
				html = $('<div>' + html + '</div>');
				var box = GLOBE.DIALOG.INFOBOX;
				box.setDialogHeader(title);
				box.setDialogContent($(html));
				box.show();
			}
			
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		
		//右クリックイベント
		var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
		handler.setInputAction(function(click) {
			if ( GLOBE.MAP._click.id )
			{
				clearTimeout(GLOBE.MAP._click.id);
			}
			GLOBE.MAP._click.times = 0;
			GLOBE.MAP._click.event = click;
			GLOBE.MAP._click.id = null;
			
			// 深度テストを一時的に有効にする
			GLOBE.MAP.viewer.scene.globe.depthTestAgainstTerrain = true;
			
			if ( GLOBE.MAP.viewer.scene.pickPositionSupported )
			{
				GLOBE.MAP.waitRightClick();
			}
			else
			{
				GLOBE.MAP.executeRightClick();
			}
			
		}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
	},
	
	_click: {
		maxTimes: 10,
		times: 0,
		event: null,
		id: null
	},
	
	waitRightClick: function()
	{
		if ( ++this._click.times > this._click.maxTimes )
		{
			this.executeRightClick();
		}
		else
		{
			this._click.id = setTimeout(function(){
				try {
					var cartesian = GLOBE.MAP.viewer.scene.pickPosition(GLOBE.MAP._click.event.position);
				}
				catch(e) {
					GLOBE.MAP.waitRightClick();
					return;
				}
				GLOBE.MAP.executeRightClick();
			}, 200);
		}
	},
	
	executeRightClick: function()
	{
		var click = this._click.event;
		
	    var ellipsoid = this.viewer.scene.globe.ellipsoid;
		var cartesian;
		
		try {
			cartesian = GLOBE.MAP.viewer.scene.pickPosition(click.position);
		}
		catch(e) {
			cartesian = GLOBE.MAP.viewer.scene.camera.pickEllipsoid(click.position, ellipsoid);
		}
		
		var height = GLOBE.MAP.viewer.scene.camera.positionCartographic.height;
		
		if (cartesian) {
			var cartographic = ellipsoid.cartesianToCartographic(cartesian);
			var lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(8);
			var lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(8);
			var z = Cesium.Math.toDegrees(cartographic.height).toFixed(8);
		} else {
			lon = "";
			lat = "";
		}
		lon = (isNaN(lon) ? lon : lon * 1);
		lat = (isNaN(lat) ? lat : lat * 1);
		height = (isNaN(height) ? height : height * 1);

		$.ajax({
			url : CONFIG.SERVERAPI.GETADDR,
			dataType : "json",
			data: {
				"lon" : lon,
				"lat" : lat
			},
			success : function(data){
				if (data.results){
					var address = "";
					var addObj = data.results;
					var addressData = GSI.MUNI_ARRAY[parseInt(addObj.muniCd,10)+""];
					if (addressData) {
						addressData = addressData.split(",");
						var muniNm = (addressData[1]+addressData[3]).replace("　","");
					    address += muniNm;
					}
					if (addObj.lv01Nm) address += addObj.lv01Nm;
				}
				GLOBE.DIALOG.FOOTER._initializeContent(lon,lat,height,address);
			}
		});

		GLOBE.MAP.clearPinLayers("FOOTER");
		GLOBE.MAP.pindrop(lon, lat, "FOOTER");

        GLOBE.MAP.vDemAlt      = "---";
        GLOBE.MAP.vDemAltSRC   = "---";
        GLOBE.MAP.vDemAltTypeN = 0;
        GLOBE.MAP.vDemAltReq   = new Array();

        var lon2 = lon * .017453292519943295; // DEG → RAD : lon = (lon / 180) * Math.PI;
        var lat2 = lat * .017453292519943295; // DEG → RAD : lat = (lat / 180) * Math.PI;
	    var R	= 128 / Math.PI;
	    GLOBE.MAP.vDemAltTileX = R * (lon2 + Math.PI);
	    GLOBE.MAP.vDemAltTileY = (-1) * R / 2 * Math.log((1 + Math.sin(lat2)) / (1 - Math.sin(lat2))) + 128;
   
        GLOBE.MAP.execRefreshAlt(GLOBE.MAP.vDemAltTypeN,GLOBE.MAP.vDemAltTileX,GLOBE.MAP.vDemAltTileY);

		GLOBE.DIALOG.FOOTER.show();
		
		// 深度テストを無効にする
		GLOBE.MAP.viewer.scene.globe.depthTestAgainstTerrain = false;
		this._click.times = 0;
		this._click.event = null;
		this._click.id = null;
	},
	
	execRefreshAlt : function (vDemAltTypeN,vDemAltTileX,vDemAltTileY)
	{
        if(vDemAltTypeN < CONFIG.DEM.length){
            var vType = CONFIG.DEM[vDemAltTypeN].type; if(!(vType == "TXT" || vType == "PNG")){ vType = "TXT"; }
            var vURL  = CONFIG.DEM[vDemAltTypeN].url;
            var vZ    = CONFIG.DEM[vDemAltTypeN].z;
            var vX    = vDemAltTileX;
            var vY    = vDemAltTileY;

            var vX_px     = vX * Math.pow(2, vZ);
            var vY_px     = vY * Math.pow(2, vZ);
            var vX_Tile   = Math.floor(vX_px / 256);
            var vY_Tile	  = Math.floor(vY_px / 256);
            this.vX_TilePX = Math.floor(vX_px) % 256;
            this.vY_TilePX = Math.floor(vY_px) % 256;

            var _vDemURL = vURL.replace("{z}", vZ).replace("{x}", vX_Tile).replace("{y}", vY_Tile);
            this._url = _vDemURL;
            if(vType == "TXT"){
		        this.ajaxElevation = $.ajax({
			          type     : "GET"
			        , url      : _vDemURL
                    , dataType : "text"
                  //, cache    : false
			        , success  : MA.Util.bind( this.execRefreshAltTxt  , this )
                    , error    : MA.Util.bind( this.execRefreshAltError, this )
		        });
  //              this.vDemAltReq.push(this.ajaxElevation);
            }
            else if(vType == "PNG"){
                this.DemPng             = new Image();
                this.DemPng.crossOrigin = "anonymous";
                this.DemPng.onload      = MA.Util.bind( this.execRefreshAltPng  , this );
                this.DemPng.onerror     = MA.Util.bind( this.execRefreshAltError, this );
                this.DemPng.src         = _vDemURL;
            }
        }
        else{
            this.getElevationRusult(GLOBE.MAP.vDemAlt, GLOBE.MAP.vDemAltSRC);
        }
    },
    execRefreshAltTxt : function (vDem)
	{
	
        if(GLOBE.MAP.vDemAltTypeN == -1){
            return;
        }
        var f = false;
        vDem = vDem.replace(/\r/g, "");
        var vDemData = vDem.split("\n");
        if(vDemData.length >= this.vY_TilePX){
            var vDemDataY = vDemData[this.vY_TilePX];
            var vDemDataX = vDemDataY.split(",");
            if(vDemDataX.length >= this.vX_TilePX){
                var vDemDataAlt = vDemDataX[this.vX_TilePX];
                if(vDemDataAlt != "e"){
                    GLOBE.MAP.vDemAlt    = parseFloat(vDemDataAlt).toFixed(CONFIG.DEM[GLOBE.MAP.vDemAltTypeN].fixed) + "m";
                    GLOBE.MAP.vDemAltSRC = CONFIG.DEM[GLOBE.MAP.vDemAltTypeN].src;
                    f = true;
                    GLOBE.MAP.vDemAltTypeN = -1;
                }
            }
        }
		
        this.getElevationRusult(GLOBE.MAP.vDemAlt, GLOBE.MAP.vDemAltSRC);
        if(!f){
            GLOBE.MAP.vDemAltTypeN++;
            //this.execRefreshAlt();
            
        	GLOBE.MAP.execRefreshAlt(GLOBE.MAP.vDemAltTypeN,GLOBE.MAP.vDemAltTileX,GLOBE.MAP.vDemAltTileY);
        }
    },
    execRefreshAltPng : function (vDem)
	{

        var f = false;
        var oCanvasTile        = document.createElement("canvas");
            oCanvasTile.width  = this.DemPng.width;
            oCanvasTile.height = this.DemPng.height;  
        var oCanvasTileContext = oCanvasTile.getContext("2d");
        oCanvasTileContext.drawImage(this.DemPng, 0, 0);
        if(oCanvasTile.height >= this.vY_TilePX){
            if(oCanvasTile.width >= this.vX_TilePX){
                var data = oCanvasTileContext.getImageData(this.vX_TilePX, this.vY_TilePX, 1, 1).data;
                if(data.length >= 3){
                    var r = data[0];
                    var g = data[1];
                    var b = data[2];
                    var x = r * 256 * 256 + g * 256 + b;
                    var h = (x < Math.pow(2, 23)) ? x : x - Math.pow(2, 24);
                    if( h !== -Math.pow( 2, 23)){
                        GLOBE.MAP.vDemAlt    = parseFloat(h).toFixed(CONFIG.DEM[GLOBE.MAP.vDemAltTypeN].fixed) + "m";
                        GLOBE.MAP.vDemAltSRC = CONFIG.DEM[GLOBE.MAP.vDemAltTypeN].src;
                        f = true;
                    }
                }
            }
        }
        oCanvasTileContext = null;
        oCanvasTile        = null;

        this.getElevationRusult(GLOBE.MAP.vDemAlt, GLOBE.MAP.vDemAltSRC);
        if(!f){
            GLOBE.MAP.vDemAltTypeN++;
            GLOBE.MAP.execRefreshAlt(GLOBE.MAP.vDemAltTypeN,GLOBE.MAP.vDemAltTileX,GLOBE.MAP.vDemAltTileY);
        }
    },
    execRefreshAltError : function ()
	{
        GLOBE.MAP.vDemAltTypeN++;
        GLOBE.MAP.execRefreshAlt(GLOBE.MAP.vDemAltTypeN,GLOBE.MAP.vDemAltTileX,GLOBE.MAP.vDemAltTileY);
    },
	getElevationRusult : function (data, dataSrc)
	{
		var outPutHeight = data;
		var outPutHeightSrc = "（" + "データソース：" + GLOBE.MAP.vDemAltSRC + "）";
		this.outPutHeight= data + '<span style="font-size:9px">' +outPutHeightSrc + '</span>';
		
		GLOBE.DIALOG.FOOTER.refreshDEMHeight();
		
	}

};




/************************************************************************
   - GSI.LayerTreeDialog
 ************************************************************************/
GSI.LayerTreeDialog = GSI.Dialog.extend( {

	options : {
		title : '情報リスト'
	},
	_activeTabIndex : -1,
	
	initialize : function(mapLayerList,cocoTileLayer, layersTab, options)
	{
		this.mapLayerList = mapLayerList;
		this.cocoTileLayer = cocoTileLayer;
		this.layersTab = layersTab;
		this.mapLayerList.on( 'change', MA.bind( this.onMapLayerListChange, this ) );
		GSI.Dialog.prototype.initialize.call(this, options);

        this._current_id = this.path = this.options.currentPath;
        this.container.attr('id', 'dialog_layertree');
		this.container.css( { top: '50px'} );
	},
	createHeader : function()
	{
		this.headerFrame.addClass( "tab");
		this._titleFrame = $( '<div>' );
		this._tabFrame = $( '<div>' ).addClass("layertreedialog_tab_frame");
		
		for( var i=0; i<this.layersTab.length; i++ )
		{
			var  tabInfo = this.layersTab[i];
			
			var a = $("<a>").css({"font-size":"90%"})
			.attr( {"href":"javascript:void(0);"} )
			.data ({"tabInfo":tabInfo, "idx" : i})
			.click(MA.bind(this._onTabClick, this ) )
			.css( {"z-index": this.layersTab.length - i} );
			
			var leftTriangle = $("<div>").html("").addClass("left_triangle").append("<div>");
			var centerTitle = $("<div>").html(tabInfo.caption).addClass("center_text");
			var rightTriangle = $("<div>").html("").addClass("right_triangle").append("<div>");
			
			a.append( leftTriangle ).append( centerTitle ).append( rightTriangle );
			
			this._tabFrame.append( a );
		}
		
		this._tabFrame.append( $("<div>").css({"clear":"both"}) );
		this._titleTextFrame = $( '<div>' ).append( $('<span>').html(this.options.title ) ).addClass("title_frame");
		this._titleFrame.append(this._tabFrame).append( this._titleTextFrame);//.append(this._titleControlFrame);
		
		
		this._tabScrollLeftBtn = $( "<a>" )
			.addClass("tab_scroll_btn")
			.addClass("tab_scroll_left")
			.attr({"href":"javascript:void(0);"})
			.on( "mousedown", MA.bind(this._onTabScrollLeftMouseDown, this) )
			.on( "mouseup", MA.bind(this._onTabScrollLeftMouseUp, this) );
			
		this._tabScrollRightBtn = $( "<a>" )
			.addClass("tab_scroll_btn")
			.addClass("tab_scroll_right")
			.on( "mousedown", MA.bind(this._onTabScrollRightMouseDown, this) )
			.on( "mouseup", MA.bind(this._onTabScrollRightMouseUp, this) );
			
		this._titleFrame.append(this._tabScrollLeftBtn).append(this._tabScrollRightBtn);
		this.activateTab(0);
		
		return this._titleFrame;
		
	},
	
	_onTabClick : function(event)
	{
		var a = $(event.currentTarget );
		var newidx = a.data("idx");

		if (this._activeTabIndex != newidx)
		{
			if (this._checkEvacuationLayer() == false)
			{
				CONFIG.layerEvacuationIsConfirmOK = false;
				GSI.GLOBALS.evacDialog.hide();
			}
		}
		

		this.activateTab(newidx);
	},
	
	activateTab : function(idx)
	{
		
		
		this._tabFrame.find("a").removeClass("active");
		this._tabFrame.find("a").eq(idx).addClass("active");
		
		
		var tabArr = this._tabFrame.find("a");
		for( var i=0; i<tabArr.length; i++ )
		{
			var zIndex = tabArr.length -i;
			if ( idx == i ) zIndex = 99;
			
			$( tabArr[i]).css( {"z-index":zIndex} );
		}
		
		
		
		if ( this._activeTabIndex != idx )
		{
			this._activeTabIndex = idx;

			if ( this.tree )
			{
				this.onFolderClick_Proc(this.tree[this._activeTabIndex]);
			}
		}
		
		
		this._initializeTabScrollBtns();
	},

	_onResize : function()
	{
		GSI.Dialog.prototype._onResize.call(this);

		var height = this.container.outerHeight( false )
			- this.headerFrame.outerHeight( true )
			- this._controlFrame.outerHeight( true ) - 11;

		this.listFrame.css( { "max-height": 'none', height: height + 'px'} );
		
		
		this._initializeTabScrollBtns();
		
	},
	
	
	_initializeTabScrollBtns : function()
	{
		var scrollLeft = this._tabFrame.scrollLeft();
		
		var scrollContainerWidth = this._tabFrame.outerWidth();
		var scrollInnerWidth = this._tabFrame.find("a").last().position().left-10 +
			this._tabFrame.find("a").last().outerWidth(true) + scrollLeft;
		
		
		if ( scrollContainerWidth < scrollInnerWidth )
		{
			var scrollMax = scrollInnerWidth - scrollContainerWidth;
			if ( scrollMax <= scrollLeft )
			{
				this._tabFrame.scrollLeft(scrollMax);
				this._tabScrollRightBtn.addClass("deactive");
			}
			else
				this._tabScrollRightBtn.removeClass("deactive");
				
			if ( scrollLeft > 0 )
				this._tabScrollLeftBtn.removeClass("deactive");
			else
				this._tabScrollLeftBtn.addClass("deactive");
		}
		else
		{
			this._tabScrollLeftBtn.addClass("deactive");
			this._tabScrollRightBtn.addClass("deactive");
			this._tabFrame.scrollLeft(0);
		}
		
		if ( scrollContainerWidth >= scrollInnerWidth)
		{
			this._tabScrollLeftBtn.hide();
			this._tabScrollRightBtn.hide();
		}
		else
		{
			this._tabScrollLeftBtn.show();
			this._tabScrollRightBtn.show();
		}
		
	},
	
	_onTabScrollLeftMouseDown : function()
	{
		if ( this._tabScrollLeftTimer )
			clearTimeout(  this._tabScrollLeftTimer );
		this._tabScrollLeftTimer = setTimeout( MA.bind( function(){
			this._tabScrollLeft();
		}, this ), 10 );
	},
	
	_onTabScrollLeftMouseUp : function()
	{
		if ( this._tabScrollLeftTimer )
			clearTimeout(  this._tabScrollLeftTimer );
		this._tabScrollLeftTimer = null;
	},
	
	
	_tabScrollLeft : function()
	{
		var scrollLeft = this._tabFrame.scrollLeft();
		var scrollContainerWidth = this._tabFrame.outerWidth();
		var scrollInnerWidth = this._tabFrame.find("a").last().position().left-10 +
			this._tabFrame.find("a").last().outerWidth(true) + scrollLeft;
		
		var scrollMax = scrollInnerWidth - scrollContainerWidth;
		scrollLeft-=2;
		if ( scrollLeft < 0 ) scrollLeft = 0;
		this._tabFrame.scrollLeft(scrollLeft);
		
		
		if ( scrollLeft > 0 )
		{
			this._tabScrollLeftBtn.removeClass("deactive");
		}
		else
			this._tabScrollLeftBtn.addClass("deactive");
		
		
		if ( scrollMax <= scrollLeft )
			this._tabScrollRightBtn.addClass("deactive");
		else
			this._tabScrollRightBtn.removeClass("deactive");
			
		if ( scrollContainerWidth >= scrollInnerWidth)
		{
			this._tabScrollLeftBtn.hide();
			this._tabScrollRightBtn.hide();
		}
		else
		{
			this._tabScrollLeftBtn.show();
			this._tabScrollRightBtn.show();
		}
		
		if ( !this._tabScrollLeftBtn.hasClass("deactive") )
		{
			this._tabScrollLeftTimer = setTimeout( MA.bind( function(){
				this._tabScrollLeft();
			}, this ), 10 );
		}
	},
	
	
	_onTabScrollRightMouseDown : function()
	{
		if ( this._tabScrollRightTimer )
			clearTimeout(  this._tabScrollRightTimer );
		this._tabScrollRightTimer = setTimeout( MA.bind( function(){
			this._tabScrollRight();
		}, this ), 10 );
	},
	
	_onTabScrollRightMouseUp : function()
	{
		if ( this._tabScrollRightTimer )
			clearTimeout(  this._tabScrollRightTimer );
		this._tabScrollRightTimer = null;
	},
	
	_tabScrollRight : function()
	{
		var scrollLeft = this._tabFrame.scrollLeft();
		var scrollContainerWidth = this._tabFrame.outerWidth();
		var scrollInnerWidth = this._tabFrame.find("a").last().position().left-10 +
			this._tabFrame.find("a").last().outerWidth(true) + scrollLeft;
		
		var scrollMax = scrollInnerWidth - scrollContainerWidth;
		scrollLeft+=2;
		if ( scrollLeft> scrollMax ) scrollLeft = scrollMax;
		this._tabFrame.scrollLeft(scrollLeft);
		
		
		
		if ( scrollLeft > 0 )
			this._tabScrollLeftBtn.removeClass("deactive");
		else
			this._tabScrollLeftBtn.addClass("deactive");
		
		
		if ( scrollMax <= scrollLeft )
			this._tabScrollRightBtn.addClass("deactive");
		else
			this._tabScrollRightBtn.removeClass("deactive");
			
		if ( scrollContainerWidth >= scrollInnerWidth)
		{
			this._tabScrollLeftBtn.hide();
			this._tabScrollRightBtn.hide();
		}
		else
		{
			this._tabScrollLeftBtn.show();
			this._tabScrollRightBtn.show();
		}
		
		
		if ( !this._tabScrollRightBtn.hasClass("deactive") )
		{
			this._tabScrollRightTimer = setTimeout( MA.bind( function(){
				this._tabScrollRight();
			}, this ), 10 );
		}
	},
	
	
	createContent : function()
	{
		this._contentFrame = $('<div>');
		this._controlFrame = this._createControl();
		this.listFrame = $( '<div>' ).addClass( 'layertreedialog_ul_frame' );

		this.listContainer = $( '<ul>' ).addClass( 'layertreedialog_ul' );

		var li = $( '<li>' ).addClass( 'nodata' ).html( '読み込み中' );
		this.listContainer.append( li );
		this.listFrame.append( this.listContainer );
		this._contentFrame.append( this._controlFrame );
		this._contentFrame.append( this.listFrame );

		return this._contentFrame;
	},
	_createControl : function()
	{
		var frame = $( '<div>' ).addClass( 'layertreedialog_control_frame' );

		this._showAllButton = $( '<a>' ).attr( { href:'javascript:void(0);'} ).html( '全選択'   ).addClass( 'normalbutton showallbutton' );
		this._hideAllButton = $( '<a>' ).attr( { href:'javascript:void(0);'} ).html( '全非選択' ).addClass( 'normalbutton showallbutton' );

		frame.append( this._hideAllButton );
		frame.append( this._showAllButton );

		this._showAllButton.click( MA.bind( this._onShowAllClick, this ) );
		this._hideAllButton.click( MA.bind( this._onHideAllClick, this ) );

		return frame;
	},
	
	setMaxScrollHeight : function( maxHeight )
	{
		if ( this.listFrame )
		{
			this.listFrame.css( { 'max-height' : maxHeight + 'px'} );
		}

		if ( this._contentFrame )
		{
			this._contentFrame.css( { 'height' : 'auto'} );
			this.contentFrame.css( { 'height' : 'auto'} );
			this.container.css( { 'height' : 'auto'} );
		}
	},
	setTree : function( tree )
	{
		this.tree = tree;
		this.current = null;
		this.initializeList();
	},
	setTree_Init : function( tree, visibleLayers, visibleLayersHash)
	{
        this.visibleLayers     = visibleLayers;
        this.visibleLayersHash = visibleLayersHash;

        if(this.getVisible()){
            this.options.currentPath = this.path;
        }
        else{
            this.options.currentPath = null;
        }

        this.setTree(tree);
    },
	show : function()
	{
		GSI.GLOBALS.queryParams._layerTreeDialogVisible = true;
		GLOBE.MAP.updateHash();
		
		GSI.Dialog.prototype.show.call(this);
	},
	hide : function()
	{
		GSI.GLOBALS.queryParams._layerTreeDialogVisible = false;
		GLOBE.MAP.updateHash();
		
		this._hideItemTooltip();
		if ( !CONFIG.LAYERTREEDIALOGKEEPCURRENT )
		{
			this.current = null;
			this.initializeList();
		}
		if ( this._checkEvacuationLayer() == false )
		{
			GSI.GLOBALS.evacDialog.hide();
		}

		GSI.Dialog.prototype.hide.call(this);
	},
	onCOCOTileLoad : function(e)
	{
		if ( !this.tree ) return;
		this._initializeList( this.current ? this.current.entries : this.tree[this._activeTabIndex].entries );
	},
	onCOCOTileHide : function(e )
	{
		if ( !this.tree ) return;
		this._initializeList( this.current ? this.current.entries : this.tree[this._activeTabIndex].entries );
	},
	initializeList : function()
	{
		if ( !this.contentFrame ) return;

		this._hideItemTooltip();

		if ( !this.listContainer )
		{
			this.listContainer = $( '<ul>' ).addClass( 'layertreedialog_ul' );
			this.listFrame.empty().append( this.listContainer );
		}
		this.contentFrame.scrollTop( 0 );
		this.listContainer.empty();
		
		if ( this.options.currentPath )
		{
			this._initializeList_CurrentPath( this.options.currentPath );
			this.activateTab( this._activeTabIndex );
		}
		else{
			this._initializeListProc();
		}
		
		if ( this.current && this.current.toggleall )
		{
			
		}
		else
		{
			this._showAllButton.hide();
			this._hideAllButton.hide();
		}
	},
	_initializeList : function( list, liRefresh )
	{
		this._hideItemTooltip();

		if ( !list || list.length <= 0  )
		{
			this.listContainer.empty();
			var li = $( '<li>' ).addClass( 'nodata' ).html( 'データがありません' );
			this.listContainer.append( li );
			return;
		}

		var liList = ( liRefresh ? this.listContainer.children( 'li' ) : null );

		var showAllButtonEnable = false;
		var hideAllButtonEnable = false;

		for ( var i= 0; i<list.length; i++ )
		{
			var item = list[i];
			var li = ( liRefresh ? $( liList[i] ).empty() : $( '<li>' )  );
			var a = $( '<a>' ).attr( { 'href':'javascript:void(0);' } );
			a.data( { 'data' : item } );

			if ( ( item.entries && !item.isMultiLayer ) || item.src)
			{
				this._makeFolder(li, a, item );
			}
			else
			{
				this._makeLayer(li, a, item );
			}

			li.append( a );
			this.listContainer.append( li );

			if ( (item.entries) || (this.cocoTileLayer.getVisible() && item.cocotile && !item.hasTile ) ) continue;

			if ( item._visibleInfo ) hideAllButtonEnable = true;
			else showAllButtonEnable = true;
		}

		if ( showAllButtonEnable )
		{
			this._showAllButton.removeClass( 'disabled' );
		}
		else
		{
			this._showAllButton.addClass( 'disabled' );
		}

		if ( hideAllButtonEnable )
		{
			this._hideAllButton.removeClass( 'disabled' );
		}
		else
		{
			this._hideAllButton.addClass( 'disabled' );
		}
	},
	_initializeListProc : function()
	{
        if(this.visibleLayers && this.visibleLayers.length > 0){
            var fAppend = true;
		    for(var i = 0; i < this.visibleLayers.length; i++){
			    var l = this.visibleLayers[i];
                if(!l.info){
                    fAppend = false;
                    this._initializeList_VisibleLayers(l.id);
                }
            }

            if(fAppend){
		        for(var i = 0; i < this.visibleLayers.length; i++){
			        var l = this.visibleLayers[i];
                    if(l.info != null){
			            if ( l.info._isBaseLayer )
			            {
			            	this.mapLayerList.setBaseLayer(l.info);
                    	}
                    	else
                    	{
							this.mapLayerList.append(l.info, true, l.hidden);
						}
                    }
                }
                this.visibleLayers.length = 0;

                this._initializeListProc();
            }
        }
        else{
		    this.refreshTitle();
		    this._initializeList( this.current ? this.current.entries : this.tree[this._activeTabIndex].entries );
		    if ( this._userResized ) this._onResize();
        }
    },
    _initializeList_VisibleLayers : function(id){
        this._initializeList_ID_Mode    = "visible";
        this._initializeList_ID_Mode_ID = id;
        this._initializeList_ID(id);
    },

	_initializeList_CurrentPath : function(id)
	{
        this._initializeList_ID_Mode    = "current";
        this._initializeList_ID_Mode_ID = id;
        this._initializeList_ID(id);
    },
	_initializeList_ID : function(path)
	{
		var current = null;
		if ( !path || path == '' ) return null;
		
        this._CurrentData_SRC    = new Array();
        this._CurrentData_SRC_ID = "";

        current = this._initializeList_IDProc_Data(this.tree, path);
        if(current == null && this._CurrentData_SRC.length > 0){
            this._CurrentData_SRC_ID  = path;
            this._initializeList_IDProc_DataSrc();
        }
        else{
            this._initializeList_IDProc(current);
        }

		return current;
	},
	_initializeList_IDProc : function(current)
	{
        var fInit = true;
        if(this._initializeList_ID_Mode == "visible"){
            if(current == null){            
		        for(var i = 0; i < this.visibleLayers.length; i++){
			        var l = this.visibleLayers[i];
                    if(l.id == this._initializeList_ID_Mode_ID){
                        this.visibleLayers.splice(i, 1);
                        break;
                    }
                }
            }
        }
        if(this._initializeList_ID_Mode == "current"){
		    this.current             = current;
			var target = this.current ;
			if ( target )
			{

				while( target.parent )
				{
					target = target.parent;
				}
				if ( this.tree )
				{
					for( var i=0; i<this.tree.length; i++)
					{
						if ( target == this.tree[i])
						{
							this._tabFrame.find("a").removeClass("active");
							this._tabFrame.find("a").eq(i).addClass("active");
							
							var tabArr = this._tabFrame.find("a");
							for( var j=0; j<tabArr.length; j++ )
							{
								var zIndex = tabArr.length -j;
								if ( i == j ) zIndex = 99;
								
								$( tabArr[j]).css( {"z-index":zIndex} );
							}
							this._activeTabIndex = i;
							break;
						}
					}
				}
			}
		    this.options.currentPath = null;
        }
        if(this._initializeList_ID_Mode == "cocoTileLayer"){
            this.cocoTileLayer.setVisible( true );
            fInit = false;
        }

        this._initializeList_ID_Mode = "";

        if(fInit){
            this._initializeListProc();
        }
    },
    _initializeList_IDProc_Data : function(tree, id)
    {
        var current = null;
        _DEV_DBG_HashLsPath = true;
        for(var i = 0; i < tree.length; i++){
            if(tree[i].src    && !tree[i].entries){
                if(!tree[i].src_ && tree[i].src.indexOf('./') == 0){
                    var path = tree[i].src_url.substring(0, tree[i].src_url.lastIndexOf('/'));
                    tree[i].src_ = true;
                    tree[i].src  = path + "/" + tree[i].src.substr(2);
                }
                this._CurrentData_SRC.push(tree[i]);
            }
            else if(tree[i].entries && !tree[i].isMultiLayer){
                current = this._initializeList_IDProc_Data(tree[i].entries, id);
                if(current != null){
                    break;
                }
            }
            else{
                if(tree[i].id == id){
                    if(tree[i].parent){
                        current = tree[i].parent;

                        this._CurrentData_SRC.length = 0;
                    }
                    else{
                        current = null;
                    }
                    break;
                }
            }
            
        }

        return current;
    },
    _initializeList_IDProc_DataSrc : function()
    {
        if(this._CurrentData_SRC.length > 0){
		    this.ajax      = $.ajax({
			    type     : "GET",
			    url      : this._CurrentData_SRC[0].src,
			    dataType : "text",
			    cache    : true,
			    success  : MA.bind(this._initializeList_IDProc_DataSrc_Success, this),
			    error    : MA.bind(this._initializeList_IDProc_DataSrc_Error  , this)
		    });
        }
        else{
            this._initializeList_IDProc(null);
        }
    },
	_initializeList_IDProc_DataSrc_Success : function(data)
	{
        if(this._CurrentData_SRC.length > 0){
    		var json = JSON.parse(data);
            if(json.layers){
                for(var i = 0; i < json.layers.length; i++){
                    json.layers[i].parent  = this._CurrentData_SRC[0];
                    json.layers[i].src_url = this._CurrentData_SRC[0].src_url;
                }
            }
            this._CurrentData_SRC[0].entries = json.layers;

            GSI.GLOBALS.layersJSON._initializeTree(this._CurrentData_SRC[0].entries, this._CurrentData_SRC[0]);

            current = this._initializeList_IDProc_Data(this._CurrentData_SRC[0].entries, this._CurrentData_SRC_ID);
            if(current == null){
                this._initializeList_IDProc_DataSrc_Error();
            }
            else{
                this._initializeList_IDProc(current);
            }
        }
    },
	_initializeList_IDProc_DataSrc_Error : function()
	{
        this._CurrentData_SRC.shift();
        this._initializeList_IDProc_DataSrc();
	},
	getCurrentPath : function()
	{
        var id = "";
        if(this._current_id){
            id = this._current_id;
        }

        return id;
	},
	setCurrentPath : function(path){
        this.options.currentPath = path;

    	this.setTree(this.tree);
    },
	refreshTitle : function()
	{
		this._titleTextFrame.empty();

		var num = 0;
		var target = this.current;
		while ( target )
		{
			if ( num > 0 )
			{
				var a = $( '<a>' ).html( target.title ).attr( { 'href' : 'javascript:void(0);' } );
				var span = $( '<span>' ).html( "&nbsp;&gt;&nbsp;" );
				this._titleTextFrame.prepend( span );
				a.click(
					MA.bind( this.onFolderClick, this, a )
				).data( { 'data' : target } );
				this._titleTextFrame.prepend( a );
			}
			else
			{
				var span= $( '<span>' ).html( target.title );
				this._titleTextFrame.prepend(span );
			}

			num++;
			target = target.parent;
		}
		if ( num > 0 )
		{
			
		}
		else
		
		{
			var title = ( !this.tree || this.tree.length <= this._activeTabIndex ? this.options.title : this.tree[this._activeTabIndex ].title );
			var span = $( '<span>' ).html( title ); //.attr( { 'href' : 'javascript:void(0);' } );
			this._titleTextFrame.prepend( span );
		}
	},
	_makeFolder : function(li, a, item)
	{
		var cocoVisible = false;
		
		var entriesCount = -1;
        if ( item.entries ){
            entriesCount = item.entries.length;
        }
		var isVisible = true;
		if ( cocoVisible )
		{
			var getCOCOTileVisibleCount = function(entries, isTop)
			{
				var counter = 0;
				var currentCounter = 0;

                if(entries){
				    for ( var i=0; i<entries.length; i++ )
				    {
					    var entry = entries[i];
					    if ( entry.entries )
					    {
						    var entriesCount = getCOCOTileVisibleCount( entry.entries, false );
						    counter += entriesCount.total;

						    if ( isTop && entriesCount.total > 0 )
						    {
							    currentCounter++;
						    }
					    }
					    else
					    {
						    if ( !entry.cocotile || entry.hasTile  )
						    {
							    currentCounter++;
							    counter++;
						    }
					    }
				    }
                }

				return { current: currentCounter, total: counter };
			};

			var count = getCOCOTileVisibleCount( item.entries, true );
			entriesCount = count.current;
			if ( count.total <= 0 ) isVisible = false;
		}

		// 子要素あり
		var title = $( '<div>' ).addClass( 'title' ).html( item.title);
		var num = $( '<div>' ).addClass( 'num' ).append( $('<span>').html(entriesCount));
        if(entriesCount >= 0){
            a.addClass( 'folder' ).append( title ).click( MA.bind( this.onFolderClick, this, a) );
        }
        else{
            a.addClass( 'folder' ).append( title ).click( MA.bind( this.onFolderClick, this, a) );
        }

		if ( !isVisible )
		{
			a.addClass( 'nococotile' );
			li.addClass( 'nococotile' );
		}
		else
		{
			a.removeClass( 'nococotile' );
			li.removeClass( 'nococotile' );
		}
		if (item.html)
		{
			var flddescriptionBtn = $( '<a>' ).attr( { 'href':'javascript:void(0);'} ).addClass( 'flddescription_btn' ).html("解説");
			li.append( flddescriptionBtn );
			flddescriptionBtn.unbind( 'click' ).bind( 'click', MA.bind( this._onLayerMouseEnter, this, a, item ) );
		}
	},
	_onLayerMouseEnter : function( a, item )
	{
		if ( !this._toolTipViewCounter )
		{
			this._toolTipViewCounter = 0;
		}
		this._toolTipViewCounter++;

		this._showItemTooltip( a, item );
	},
	_onLayerMouseLeave : function( a, item )
	{
		this._hideItemTooltip( a, item );
	},
	_makeToolTip : function( item )
	{
		var infoFrame = $( '<div>' ).addClass( 'layerinfo' ).css({"max-width":"350px"} );

		var legend = null;
		var description = null;

		if ( item.legendUrl && item.legendUrl != '')
		{
			legend =$( '<a>' ).html( '凡例を表示' ).addClass( 'legend' ).attr( { 'href' : item.legendUrl, 'target' : '_blank' } );
		}
		if ( legend )
			infoFrame.append( legend );        

		if ( item.html )
		{
			description =$( '<div>' ).addClass( 'description' ).html( item.html );
		}
		if ( description )
			infoFrame.append( description );

		return infoFrame;
	},
	_showItemTooltip : function( a, item )
	{
		if ( item  )
		{
			if ( !this._curItem )
			{
				this._curItem = item;
			}
			else
			{
				if ( ( this._toolTipViewCounter % 2) == 0)
				{
					if ( this._curItem == item )
					{
						this._curItem = undefined;
						this._toolTipViewCounter = 0;
						return;
					}
					else
					{
						this._toolTipViewCounter--;
					}
				}
				this._curItem = item;
			}
		
			if ( !this._itemTooltip )
			{
				this._itemTooltip = $( '<div>' ).addClass( 'gsi_layertreedialog_itemtooltip' ).hide();
				$( document.body ).append( this._itemTooltip );
			}

			var offset = a.offset();

			var screenSize = GSI.Utils.getScreenSize();
			var left = offset.left + parseInt( a.outerWidth(true) );
			var top = offset.top;

			if ( left > screenSize.w * 0.6 )
			{
				left = offset.left + parseInt( a.outerWidth(true) * 0.3 );
				top = offset.top + a.outerHeight(true);
			}

			this._itemTooltip.css({
				left : left + 'px',
				top  : top + 'px'
			}).empty().append( this._makeToolTip( item ) );
			this._itemTooltip.stop().hide().fadeIn( 'normal' );

			if ( this._hideToolTipHandler )
			{
				$( document.body ).unbind( 'mousedown', this._hideToolTipHandler );
				$( document.body ).unbind( 'touchstart', this._hideToolTipHandler );
				this.listFrame.unbind( 'scroll', this._hideToolTipHandler );
				this._hideToolTipHandler  = null;
			}

			this._hideToolTipHandler  = MA.bind( function(event)
			{
				if ( !this._itemTooltip || event.target == this._itemTooltip[0] ) return;

				var parents = $( event.target ).parents();

				for (var i=0; i<parents.length; i++ )
				{
					if ( parents[i] == this._itemTooltip[0] ) return;
				}

				this._hideItemTooltip();
				
				if ( event.type == "scroll" )
				{
					this._toolTipViewCounter = 0;
				}
			}, this );

			$( document.body ).bind( 'mousedown', this._hideToolTipHandler );
			$( document.body ).bind( 'touchstart', this._hideToolTipHandler );
			this.listFrame.bind( 'scroll', this._hideToolTipHandler );

		}
		else
		{
			this._hideItemTooltip();
		}
	},
	_hideItemTooltip : function( a, item )
	{
		if ( this._hideToolTipHandler )
		{
			$( document.body ).unbind( 'mousedown', this._hideToolTipHandler );
			$( document.body ).unbind( 'touchstart', this._hideToolTipHandler );
			this.listFrame.unbind( 'scroll', this._hideToolTipHandler );
			this._hideToolTipHandler  = null;
		}
		if ( this._itemTooltip )
		{
			this._itemTooltip.stop().hide();
		}
	},
	_makeLayer : function( li, a, item )
	{
		var cocoVisible = false;

		var target = this.current;
		
		//種類の表示
		var title;
		if ( CONFIG.LAYERTYPEDISPLAY )
		{
			title = $( '<div>' ).addClass( 'title' ).html( item.title + '<span style="font-size:8px;color:red;">' + item.layerType + '</span>');
		}
		else
		{
			title = $( '<div>' ).addClass( 'title' ).html( item.title );
		}
		
		var icon = item.iconUrl;
        if(icon){
		    title.css(
			    {
				    "background" : "url(" + icon + ") no-repeat 8px 50%",
				    "background-size" : "16px 16px"
			    }
		    );
        }
        
        if ( GSI.GLOBALS.isBaseLayer( item ) )
        {
			if ( this.mapLayerList.exists( item ) )
			{
				a.addClass( 'view' );
			}
			else
			{
				a.removeClass( 'view' );
			}
		}
		else
		{
			if ( item._visibleInfo || this.mapLayerList.exists( item ) )
			{
				a.addClass( 'view' );
			}
			else
			{
				a.removeClass( 'view' );
			}
		}
		a.addClass( 'item' ).append( title);

        // 詳細
		var descriptionBtn = $( '<a>' ).attr( { 'href':'javascript:void(0);'} ).addClass( 'description_btn' ).html("解説");
		li.append( descriptionBtn );
		descriptionBtn.unbind( 'click' ).bind( 'click', MA.bind( this._onLayerMouseEnter, this, a, item ) );

		if ( CONFIG.VISIBLELAYERTYPE )
		{
			var info = $( '<div>' ).addClass( 'info' );
			if ( item.cocotile )
			{
				var span = $( '<span>' ).addClass( 'cocotile' ).html('ココタイル' );
				info.append( span );
			}

			var typeTitle = CONFIG.LAYERTYPELIST[ item.layerType ];
			if ( !typeTitle ) typeTitle = { caption : item.layerType };
			var span = $( '<span>' ).html(typeTitle.caption ).addClass( 'layertype' );
			info.append( span );

			li.append( info );
		}
		if (cocoVisible && item.cocotile && !item.hasTile )
		{
			a.removeClass( 'view' );
			a.addClass( 'nococotile' );
			li.addClass( 'nococotile' );
		}
		else
		{
			a.removeClass( 'nococotile' );
			li.removeClass( 'nococotile' );
		}

		a.click( MA.bind( this.onItemClick, this, a) );
	},
	_onShowAllClick : function()
	{
		var cocoVisible = this.cocoTileLayer.getVisible();
		var list = ( this.current ? this.current.entries : this.tree );
		if ( !list || list.length <= 0  ) return;

		var showList = [];

		for ( var i= 0; i<list.length; i++ )
		{
			var item = list[i];
			if ( item.entries ) continue;
			if (cocoVisible && item.cocotile && !item.hasTile ) continue;

			showList.push( item );
		}

		if ( showList.length > 0 )
			this.mapLayerList.appendList( showList );
	},
	_onHideAllClick : function()
	{
		var list = ( this.current ? this.current.entries : this.tree );
		if ( !list || list.length <= 0  ) return;

		for ( var i= 0; i<list.length; i++ )
		{
			var item = list[i];
			if ( item.entries ) continue;
			if ( this.mapLayerList.exists( item ) )
			{
				this.mapLayerList.remove( item );
			}
		}
	},
	_expandFolder : function( item )
	{
        var f = true;
        if(item){
            if(item.src){
                if(!item.entries){
                    item.parent = this.current;
                    if(!item.src_ && item.src.indexOf('./') == 0){
                        var path = item.src_url.substring(0, item.src_url.lastIndexOf('/'));
                        item.src_ = true;
                        item.src  = path + "/" + item.src.substr(2);
                    }
                    this.ajax_item = item;
				    this.ajax      = $.ajax({
					    type     : "GET",
					    url      : item.src,
					    dataType : "text",
					    //cache    : true,
					    cache    : CONFIG.LOADLAYERSTXTCACHE,
					    success  : MA.Util.bind(this._onFolderClickLoad     , this),
					    error    : MA.Util.bind(this._onFolderClickLoadError, this)
				    });

                    f = false;
                }
            }
        }

        if(f){
            this.onFolderClick_Proc(item);
        }
	},
	onConfirmOkClick : function ( item )
	{
		GSI.GLOBALS.confirmDlg.hide();
		GSI.GLOBALS.evacDialog.show();

		CONFIG.layerEvacuationIsConfirmOK = true;
		this._expandFolder( item );
	},
	onFolderClick : function( a )
	{
		var item = a.data( 'data' );

		if (( item ) && ( item.title_evac && item.title_evac == CONFIG.layerEvacuationFolderSYS ))
		{
			if ( this._checkEvacuationLayer() == false )
			{
				GSI.GLOBALS.confirmDlg.onPositiveButtonClick = MA.bind(this.onConfirmOkClick, this, item);
				GSI.GLOBALS.confirmDlg.show();			
			}
			else
			{
				this._expandFolder( item );
			}
		}
		else
		{
			this._expandFolder( item );
			if (this._checkEvacuationLayer() == false)
			{
				CONFIG.layerEvacuationIsConfirmOK = false;
				GSI.GLOBALS.evacDialog.hide();
			}
        }
	},
	onFolderClick_Proc : function( item )
	{
		    this.current = item;
		    this.listContainer.fadeOut( 'fast',
			MA.bind( function() {
				    this.listContainer.fadeIn('fast');
				    this.initializeList();
			    }, this )
		    );
    },
	_onFolderClickLoad : function(data)
	{
        var item = this.ajax_item;
        if(item){
    		var json = JSON.parse(data);
            if (json.layers){
                for(var i = 0; i < json.layers.length; i++){
                    json.layers[i].src_url = item.src_url;
                }
            }

            item.entries = json.layers;

            GSI.GLOBALS.layersJSON._initializeTree(item.entries, item);

            this.onFolderClick_Proc(item);
        }
    },
	_onFolderClickLoadError : function()
	{
		alert( 'レイヤー設定ファイルが読み込めませんでした。' );
	},
	onItemClick : function( a )
	{
		this._userControlStarted = true;
		
		var target = this.current;
		var item = a.data( 'data' );

		this._current_id = item.id;
		
		if ( GSI.GLOBALS.isBaseLayer( item ) )
		{
			if ( $(a).hasClass('view') )
			{
				$(a).removeClass('view');
				this.mapLayerList.remove(item);
			}
			else
			{
				this.mapLayerList.setBaseLayer( item );
			}
			return;
		}
		
			
        if ( item._isBaseLayer )
        {
			this.mapLayerList.setBaseLayer( item );
		}
        else if ( target && target.title_evac && target.title_evac == CONFIG.layerEvacuationFolderSYS )
        {		
            var f = false;
            if(this.mapLayerList.exists(item)){
                f = true;
            }

            this._onHideAllClick();
            if(f == false){
                this.mapLayerList.append(item);
				if (GSI.Dialog._dialogManager.isVisibleDialog(GSI.GLOBALS.evacDialog) == false)
				{
					GSI.GLOBALS.evacDialog.show();
				}
            }
        }
		else
		{
		    if(!this.mapLayerList.exists(item))
		    { 
		    	this.mapLayerList.append(item);
    		    GSI.Utils.sendSelectedLayer(this._current_id);
		    }
		    else 
		    { this.mapLayerList.remove(item); }
        }

	},
	onMapLayerListChange : function()
	{
		//this._initializeList( this.current ? this.current.entries : this.tree, true );
		this._initializeList( this.current ? this.current.entries : ( this.tree ? this.tree[this._activeTabIndex].entries : true), true );
		this._toolTipViewCounter = 0;
	},
	_checkEvacuationLayer : function()
	{
	    if ( this.mapLayerList )
	    {
	    	var l = this.mapLayerList.getList();
	    	for(i = 0 ; i < l.length; i++ )
	    	{
	    		if ( l[i].id.indexOf(CONFIG.layerEvacuationHeader) >= 0 )
	    		{
	    			return true;
	    		}
	    	}
	    	var tl = this.mapLayerList.getTileList();

	    	for(i = 0 ; i < tl.length; i++ )
	    	{
	    		if ( tl[i].id.indexOf(CONFIG.layerEvacuationHeader) >= 0 )
	    		{
	    			return true;
	    		}
	    	}
	    }
	    return false;
	}

});


/************************************************************************
 - GSI.Dialog
   - GSI.ViewListDialog（表示中ダイアログ管理）
 ************************************************************************/
GSI.ViewListDialog = GSI.Dialog.extend( {

	options : {
		title : '選択中の情報'
	},
	initialize : function(map, mapLayerList, cocoTileLayer, options)
	{
		this.map = map;
		this.mapLayerList = mapLayerList;
		this.cocoTileLayer = cocoTileLayer;
		this.mapLayerList.on( 'change', MA.bind( this.onMapLayerListChange, this ) );
		GSI.Dialog.prototype.initialize.call(this, options);

		this.container.css({top: '250px'} );
	},
	_onResize : function()
	{
		GSI.Dialog.prototype._onResize.call(this);

		var height = this.container.outerHeight( false )
			- this.headerFrame.outerHeight( true )
			- this._controlFrame.outerHeight( true ) - 10;

		this.listFrame.css( { "max-height": 'none', height: height + 'px'} );
	},
	createHeader : function()
	{
		return $('<span>').html(this.options.title );
	},
	createContent : function()
	{
		this._contentFrame = $('<div>');
		this._controlFrame = this._createControl();

		this.listFrame = $( '<div>' ).addClass( 'viewlistdialog_ul_frame' );
		this.listContainer = $( '<ul>' ).addClass( 'viewlistdialog_ul' );

		var li = $( '<li>' ).addClass( 'nodata' ).html( '選択中の情報はありません' );
		this.listContainer.append( li );

		this.listFrame.append( this.listContainer );

		this._contentFrame.append( this._controlFrame );
		this._contentFrame.append( this.listFrame );

		return this._contentFrame;
	},
	_createControl : function()
	{
		var frame = $( '<div>' ).css( { 'height': '25px' } ).addClass( 'viewlistdialog_control_frame' );

        this._RbtnTxtAdd = $("<a>").css({"position":"absolute",'left':'4px','bottom':'5px','cursor':'pointer'}).addClass('view_list_dialog_button').html("リセット");
		
		var frameRange            = $( '<div>' ).css({ 'position':'absolute','right':'5px','bottom':'5px','opacity':'1'});

        frame.append( this._RbtnTxtAdd );

		frame.append( frameRange );
		
		var dummy = $('<div>').html( '&nbsp;' ).css( { "font-size": '9.5pt' } );
		frame.append(dummy );

		this._RbtnTxtAdd.click( MA.bind( this._onResetClick, this ) );

		return frame;
	},
	_onAddClick : function()
	{
        GSI.GLOBALS.layerTreeDialog.show();
    },
    _onResetClick : function()
    {
		this._resetTiles();
    },
    onCocoTileCheckChange  : function(onOffSwitch)
	{
        if(this._ButtonRangeSwitch){
            this._ButtonRangeSwitch.checked(onOffSwitch.checked());
        }
    },
	_onCocoTileCheckChange : function(onOffSwitch)
	{
        GSI.GLOBALS.layerTreeDialog.onCocoTileCheckChange(onOffSwitch);
    },
	_onShowAllClick : function()
	{
		this._showAll( this.mapLayerList.getList() );
		this._showAll( this.mapLayerList.getTileList() );
	},
	_onHideAllClick : function()
	{
		this._hideAll( this.mapLayerList.getList() );
		this._hideAll( this.mapLayerList.getTileList() );
	},
	_onRemoveAllClick : function()
	{
		this._removeAll();
	},
	_resetTiles : function( id )
	{
		//タイルクリア
		var std = CONFIG.BASETILES[0];
		
		if ( id )
		{
			for ( var i=0; i<CONFIG.BASETILES.length; i++ )
			{
				if ( CONFIG.BASETILES[i].id == id )
				{
					std = CONFIG.BASETILES[i];
					break;
				}
			}
		}
		
		this._removeAll();
		this.mapLayerList.setBaseLayer( std );
		
	},
	_showAll : function( list )
	{
		for ( var i=0;i<list.length; i++ )
		{
			var item = list[i];
			if ( item._visibleInfo._isHidden  )
			{
				item._onOffSwitch.checked( true );
				item._visibleInfo._isHidden = false;
				this.map.addLayer( item._visibleInfo.layer );
			}
		}
	},
	_hideAll : function(list)
	{
		for ( var i=0;i<list.length; i++ )
		{
			var item = list[i];
			if ( !item._visibleInfo._isHidden  )
			{
				item._onOffSwitch.checked( false );
				
				item._visibleInfo._isHidden = true;
				this.map.removeLayer( item._visibleInfo.layer );
			}
		}
	},
	_removeAll : function()
	{
		this.mapLayerList.clear();
	},
	setMaxScrollHeight : function( maxHeight )
	{
		if ( this.listFrame )
		{
			this.listFrame.css( { 'max-height' : maxHeight + 'px'} );
		}
		if ( this._contentFrame )
		{
			this._contentFrame.css( { 'height' : 'auto'} );
		}
		if ( this.contentFrame )
		{
			this.contentFrame.css( { 'height' : 'auto'} );
		}
		if ( this.container )
		{
			this.container.css( { 'height' : 'auto'} );
		}
	},
	show : function(noActivate)
	{
		GSI.GLOBALS.queryParams._viewListDialogVisible = true;
		GLOBE.MAP.updateHash();
		
		GSI.Dialog.prototype.show.call(this,noActivate);
	},
	hide : function()
	{
		GSI.GLOBALS.queryParams._viewListDialogVisible = false;
		GLOBE.MAP.updateHash();
		
		GSI.Dialog.prototype.hide.call(this);
	},
	initializeList : function()
	{
		if ( !this.contentFrame ) return;

		if ( !this.listContainer )
		{
			this.listContainer = $( '<ul>' ).addClass( 'viewlistdialog_ul' );
			this.listFrame.empty().append( this.listContainer );
		}

		if ( !this.tileListContainer )
		{
			this.tileListContainer = $( '<ul>' ).addClass( 'viewlistdialog_ul' );
			this.listFrame.append( this.tileListContainer );
			this.tileListContainer .sortable( {
				cursor : 'move',
				update : MA.bind( this.onSortChange, this ),
				handle : ".item_frame",
				cancel : ".item_frame_fixed",
				scroll : false
			});
	   		this.tileListContainer .disableSelection();
		}

		this.contentFrame.scrollTop( 0 );
		this.listContainer.empty();
		this.tileListContainer.empty();

		this._initializeList();
		if ( this._userResized ) this._onResize();
	},
	onSortChange : function( event, ui )
	{
		var liList = this.tileListContainer.find( 'li' );
		var list = [];
        var f = true;
        
        var baseLayerIndex = -1;
        for  ( var i=0; i<liList.length; i++ )
        {
			var item = $(liList[i]).data( 'data' );
			if ( item._isBaseLayer ) baseLayerIndex = i;
		}
        if ( baseLayerIndex != -1 && baseLayerIndex != liList.length - 1 )
        {
			this.tileListContainer.sortable("cancel");
			return;
		}
        
		for  ( var i=0; i<liList.length; i++ )
		{
			var item = $(liList[i]).data( 'data' );
            
    		if ( item ) list.push( item );
		}
		
		var lastTileExtra = ( this.getBaseLayerExists() ? 2 : 1 );
		
        if(f){
			for ( var i=0; i<liList.length; i++ )
			{
				var li = $( liList[i] );
				var isFirstTile = ( i==0 );
				var isLastTile = ( i >= list.length - lastTileExtra );
				
				if ( isFirstTile )
					li.find(".updown_frame a.up").hide();
				else
					li.find(".updown_frame a.up").show();
					

				if ( isLastTile ) 
					li.find(".updown_frame a.down").hide();
				else
					li.find(".updown_frame a.down").show();
			}
			
		    this.mapLayerList.refreshTileList(list);
        }
        
        GLOBE.MAP.setLayersHash();
	},
	getBaseLayerCount : function()
	{
		var tileList = this.mapLayerList.getTileList();
		var cnt = 0;
		for  ( var i=0; i<tileList.length; i++ )
		{
			if ( tileList[i]._isBaseLayer ) cnt++;
		}
		return cnt;
	},
	getBaseLayerExists : function()
	{
		return ( this.getBaseLayerCount() > 0 );
	},
	onCOCOTileLoad : function(e)
	{
		this._initializeList( true );
	},
	onCOCOTileHide : function(e )
	{
		this._initializeList( true );
	},
	makePankzu : function( target )
	{
		target = target.parent;
		var result = '';
		while( target )
		{
			result = target.title + (result == '' ?'': '&gt;') + result;
			target = target.parent;
		}

		return result;
	},
	_updateLayer : function( li, item, isTile, isFirstTile, isLastTile  )
	{
		var cocoVisible = this.cocoTileLayer.getVisible();
		if (cocoVisible && item.cocotile && !item.hasTile )
		{
            li.find("a").removeClass("view");
            li.find("a").addClass("nococotile");
		}
		else
		{
            if(item._visibleInfo._isHidden){
                li.find("a").removeClass("view");
            }
            else{
                li.find("a").addClass("view");
            }
            li.find("a").removeClass("nococotile");
		}
		
		
		if ( isFirstTile )
			li.find(".updown_frame a.up").hide();
		else
			li.find(".updown_frame a.up").show();
			

		if ( isLastTile ) 
			li.find(".updown_frame a.down").hide();
		else
			li.find(".updown_frame a.down").show();
		
	},
	_makeLayer : function( li, a, item, isTile, isFirstTile, isLastTile )

	{
		var cocoVisible = this.cocoTileLayer.getVisible();

        var vClass = 'item_frame';
        var vClassTitle = 'title';
        if(item._isBaseLayer){
            vClass   = 'item_frame_fixed';
            vClassTitle = 'title_base';
        }
        a.addClass( vClass );

		var frame = $( '<div>' );
		if ( isTile ) frame.addClass( 'tille' );
		li.data( { 'data' : item } );

        a.append( frame );
        
		// タイトル
		var title = $( '<div>' ).addClass( vClassTitle );
		var icon = item.iconUrl;
        if(icon){
		    title.css(
			    {
				    "background" : "url(" + icon + ") no-repeat 4px 50%",
				    "background-size" : "16px 16px"
			    }
		    );
        }

		// パンくず
		var pankuzu = $( '<div>' ).addClass( 'pankuzu' ).html( this.makePankzu( item ) );
		title.html( item.title );

        var viewMark = $( '<span>' );
		if (! item._visibleInfo._isHidden )
		{
			viewMark.addClass( 'viewmark' ).html( '表示' );
			a.addClass( 'view' );
		}
		else
		{
			a.removeClass( 'view' );
		}
		frame.append( viewMark ).append( pankuzu ).append( title );
		a.addClass( 'item' ).append( title );

		if (cocoVisible && item.cocotile && !item.hasTile )
		{
            a.removeClass( 'view' );
			a.addClass( 'nococotile' );
		}

        // グレースケール
        
        if(item._isBaseLayer)
        {
			item._visibleInfo._grayScale = GLOBE.MAP.currents.baseGray;

            var grayScale_Label = $( '<span>' ).addClass( 'grayscale_label' ).html( 'グレースケール' );
	        li.append( grayScale_Label );
			//310- グレースケールかどうかを
            var grayScale = new GSI.OnOffSwitch( {className:'onoff', checked:(item._visibleInfo._grayScale)} );
	        var grayScaleElement = grayScale.getElement();
            grayScaleElement.addClass("grayscale");
	        grayScale.on( 'change', MA.bind( this._gray_scale, this, a, grayScale ) );

	        li.append( grayScaleElement);
	        grayScale.fire('change');
        }
        
        // 透過
		var opacityBtn =$("<a>").addClass("opacity_btn").attr( {"href":"javascript:void(0);"} ).html('透過率');
		opacityBtn.click( MA.bind(function(){ this._onOpacityBtnClick(li); }, this ));
		li.append( opacityBtn );
		
        // 詳細
		var descriptionBtn = $( '<span>' ).addClass( 'description_btn').html("解説");
		li.append( descriptionBtn );
		descriptionBtn.unbind( 'click' ).bind( 'click', MA.bind( this._onLayerMouseEnter, this, a, item ) );

		// 閉じる
		var closeBtn = $( '<div>' ).addClass( 'closebtn' );
		li.append(closeBtn );
    	closeBtn.unbind( 'click' ).bind( 'click', MA.bind( this.onRemoveClick, this, li ) );
		
		// ソート
		if ( isTile &&  !item._isBaseLayer && ( !isFirstTile || !isLastTile ) )
		{
			var updownFrame = $( "<div>").addClass( 'updown_frame' );
			var upButton = $( "<a>" ).attr( {"href":"javascript:void(0);"} ).addClass( "up" )
				.click( MA.bind( function(){this._up(li);}, this ) );
			var downButton = $ ( "<a>" ).attr( {"href":"javascript:void(0);"} ).addClass( "down" )
				.click( MA.bind( function(){this._down(li);}, this ) );
			
			if ( isFirstTile )
			{
				upButton.hide();
			}
			if ( isLastTile ) 
			{
				downButton.hide();
			}
			
			updownFrame.append( upButton ).append( downButton );
			li.append(updownFrame );
		}
		
		a.click( MA.bind( this.onItemClick, this, li, a, viewMark) );
		
	},
	_onOpacityBtnClick : function(li)
	{
		
		
		var item = li.data('data');
		var opacity = ( item._visibleInfo ? item._visibleInfo.opacity : 1 );
		if ( !this._opacityWindow )
		{
			this._opacityWindow = $( '<div>' ).addClass( 'viewlistdialog_opacity_window' );
			this._opacityValue = $( '<div>' ).addClass( 'value' ).html( '透過率:' );
			this._opacitySlider = $( '<div>' ).addClass( 'slider' ).html( '&nbsp;' );
			this._opacityWindow.append(this._opacityValue ).append( this._opacitySlider );
			$( "body" ) .append( this._opacityWindow );
			this._opacitySlider.slider({
				min: 0,
				max : 100
			});
		}
		else if ( this._opacityWindow && this._opacityWindow.is(":visible") && this._opacityWindow.data("item") == item )
		{
			this._opacityWindow.slideUp(200);
			return;
		}
		var offset = li.find("a.opacity_btn").offset();
		this._opacityWindow.css({
			top: offset.top + li.find("a.opacity_btn").outerHeight() -4,
			left :offset.left - 200 + 'px'
		}).data( { "item" : item } );
		
		var opacityPercentage = Math.round( 100 - ( opacity * 100 ) );
		this._opacityValue.html('透過率:' + opacityPercentage + '%');
		this._opacitySlider.data({"__target_item":item}).slider( "option", "value", opacityPercentage );
		this._opacitySlider.off("slide").on( "slide", MA.bind(function( event, ui ) {
			var item = this._opacitySlider.data('__target_item');
			var value = ui.value;// this._opacitySlider.slider( "option", "value" );
			this._opacityValue.html('透過率:' + value + '%');
			var opacity = value/ 100.0;
			if ( opacity < 0 ) opacity = 0;
			if ( opacity > 1 ) opacity = 1;
			opacity = 1- opacity;
			
			//310-指定レイヤの透過率を設定
			if (item._visibleInfo.layer.type == "GeojsonTile_QuadtreePrimitive" )
			{
				this.mapLayerList._setTileGeoJSONAlpha(item._visibleInfo.layer,opacity);
			}
			else
			{
				if ( item._visibleInfo.layer.setAlpha )
					item._visibleInfo.layer.setAlpha(opacity);
				else
					item._visibleInfo.layer.alpha = opacity;
			}
			item._visibleInfo.opacity = opacity;
			
			GLOBE.MAP.setLayersHash();
		}, this ) );
		
		if ( this._hideOpacityWindowHandler )
		{
			$( document.body ).unbind( 'mousedown', this._hideOpacityWindowHandler );
			$( document.body ).unbind( 'touchstart', this._hideOpacityWindowHandler );
		
		}
		this._hideOpacityWindowHandler  = MA.bind( function(event)
		{
			if ( !this._opacityWindow 
				|| event.target == this._opacityWindow[0]
			    || $(event.target).is(".opacity_btn")) return;

			var parents = $( event.target ).parents();
			
			var hit = false;
			for( var i=0; i<parents.length; i++ )
			{
				if ( $(parents[i]).is(".viewlistdialog_opacity_window"))
				{
					hit = true;
					break;
				}
			}
			if ( !hit )
			{
				this._opacityWindow.slideUp(200);
				$( document.body ).unbind( 'mousedown', this._hideOpacityWindowHandler );
				$( document.body ).unbind( 'touchstart', this._hideOpacityWindowHandler );
			}
		}, this );

		$( document.body ).bind( 'mousedown', this._hideOpacityWindowHandler );
		$( document.body ).bind( 'touchstart', this._hideOpacityWindowHandler );
		
		this._opacityWindow.hide().slideDown(200);
		
	},
	_up : function(li)
	{
		var item = li.data('data');
		var tileList = this.mapLayerList.getTileList();
		var hit = false;
		for( var i=1; i<tileList.length; i++ )
		{
			if ( item == tileList[i])
			{
				hit = true;
				break;
			}
			
		}
		if ( hit ) li.prev().before( li.detach() ); 
		
		this.onSortChange();
		this._initializeList( true );
	},
	
	_down : function(li)
	{
		var item = li.data('data');
		var tileList = this.mapLayerList.getTileList();
		var hit = false;
		for( var i=0; i<tileList.length; i++ )
		{
			if ( item == tileList[i])
			{
				if ( i < tileList.length-1)
				{
					var nextItem = tileList[i+1];
					hit = true;
				}
				break;
			}
			
		}
		if ( hit ) li.next().after( li.detach() ); 
		
		this.onSortChange();
		this._initializeList( true );
	},
	
	

	Refresh : function(visibleLayers)
	{
        this._removeAll();

		for ( var i=0; i<visibleLayers.length; i++ )
		{
			var l = visibleLayers[i];
			if(l && l.info){
				GSI.GLOBALS.mapLayerList.append(l.info, true,l.hidden);
			}
		}

        this._initializeList(true);
    },
	_initializeList : function( liRefresh )
	{
        this._hideItemTooltip();

		var list     = this.mapLayerList.getList();
		var tileList = this.mapLayerList.getTileList();
		
		if ( list.length <= 0 && tileList.length <= 0 )
		{
			this.listContainer.empty();
			var li = $( '<li>' ).addClass( 'nodata' ).html( '選択中の情報はありません' );
			this.listContainer.append( li );
		}

		var liList = ( liRefresh ? this.listContainer.children( 'li' ) : null );
		var ul = this.listContainer;
		this._initializeListOne( list, liList, ul, liRefresh );

		if ( this.tileListContainer )
		{
			liList = ( liRefresh ? this.tileListContainer.children( 'li' ) : null );
			ul = this.tileListContainer;
			this._initializeListOne( tileList, liList, ul, liRefresh, true );
			this.tileListContainer.sortable("refresh");
		}
	},
	_initializeListOne : function( list,liList, ul, liRefresh, isTile )
	{
		var lastTileExtra = ( this.getBaseLayerExists() ? 2 : 1 );
		
		for ( var i= 0; i<list.length; i++ )
		{
			var item = list[i];
			var li = ( liRefresh ? $( liList[i] ) : $( '<li>' ) );

			if ( liRefresh )
			{
				this._updateLayer( li, item, isTile, 
						i==0,
						i >= list.length - lastTileExtra );
			}
			else
			{
			    var a = $( '<a>' ).attr( { 'href':'javascript:void(0);' } );
			    a.data( { 'data' : item } );
				this._makeLayer(li, a, item, isTile, 
					i==0,
					i >= list.length - lastTileExtra );

			    li.append( a );
			}

			if ( !liRefresh ) ul.append( li );
		}
	},
	onItemClick : function(li, a, viewMark)
	{
		var item = a.data( 'data' );
        var item_layer = item._visibleInfo.layer;
		
        if(item._visibleInfo._isHidden)
        {
			item._visibleInfo._isHidden = false;
			//310-非表示にされていたレイヤを戻す
			if(item._isBaseLayer){
				item._visibleInfo.layer.alpha = 1;
			}else{
				item._visibleInfo.layer._setVisible(this.map.viewer, true);//show = true;
		    }
            viewMark.addClass( 'viewmark' ).html( '表示' );
            a.addClass( 'view' );

			if (item.id.indexOf(CONFIG.layerEvacuationHeader)>=0)
			{
				if ( GSI.Dialog._dialogManager.isVisibleDialog(GSI.GLOBALS.evacDialog) == false )
				{
					GSI.GLOBALS.evacDialog.show();
				}
			}

		}
		else
		{
			item._visibleInfo._isHidden = true;
			//310-選択中の情報に残したまま非表示（地図からレイヤ削除）
			
			if(item._isBaseLayer){
				item._visibleInfo.layer.alpha = 0;
			}else{
				item._visibleInfo.layer._setVisible(this.map.viewer, false);//show = false;
		    }
            viewMark.removeClass( 'viewmark' ).html( ' ' );
            a.removeClass( 'view' );

			if (item.id.indexOf(CONFIG.layerEvacuationHeader)>=0 )
			{
				GSI.GLOBALS.evacDialog.hide();
			}
        }

		var cocoVisible = this.cocoTileLayer.getVisible();
		if (cocoVisible && item.cocotile && !item.hasTile )
		{
            a.removeClass("view");
            a.addClass("nococotile");
        }
        
        GLOBE.MAP.setLayersHash();
	},
	onMapLayerListChange : function()
	{
		this.initializeList();
		GLOBE.MAP.setLayersHash();
	},
	onRemoveClick : function(li)
	{
		var item = li.data( 'data' );
        if(item.parent && item.parent.title_sys && item.parent.title_sys == CONFIG.layerBaseFolderSYS){
            //310-ベースマップの場合の削除
            item._visibleInfo.layer.alpha = 0;

        }
		li.fadeOut( 'fast', MA.bind( function(li) {
			this.mapLayerList.remove( item );
			li.remove();
			if ( this._userResized ) this._onResize();
		}, this, li ) );
		
		GLOBE.MAP.setLayersHash();
	},
	_onLayerMouseEnter : function( a, item )
	{
		if ( !this._toolTipViewCounter )
		{
			this._toolTipViewCounter = 0;
		}
		this._toolTipViewCounter++;

		this._showItemTooltip( a, item );
	},
	_onLayerMouseLeave : function( a, item )
	{
		this._hideItemTooltip( a, item );
	},
	_makeToolTip : function( item )
	{
		var infoFrame = $( '<div>' ).addClass( 'layerinfo' ).css({"max-width":"350px"} );

		var legend = null;
		var description = null;

		if ( item.legendUrl && item.legendUrl != '')
		{
			legend =$( '<a>' ).html( '凡例を表示' ).addClass( 'legend' ).attr( { 'href' : item.legendUrl, 'target' : '_blank' } );
		}
		if ( legend )
			infoFrame.append( legend );

		if ( item.html )
		{
			description =$( '<div>' ).addClass( 'description' ).html( item.html );
		}
		if ( description )
			infoFrame.append( description );

		return infoFrame;
	},
	_showItemTooltip : function( a, item )
	{
		if ( item  )
		{
			if ( !this._curItem )
			{
				this._curItem = item;
			}
			else
			{
				{
					if ( this._curItem == item )
					{
						this._curItem = undefined;
						this._toolTipViewCounter = 0;
						return;
					}
					else
					{
						this._toolTipViewCounter--;
					}
				}
				this._curItem = item;
			}
		
			if ( !this._itemTooltip )
			{
				this._itemTooltip = $( '<div>' ).addClass( 'gsi_layertreedialog_itemtooltip' ).hide();
				$( document.body ).append( this._itemTooltip );
			}

			var offset = a.offset();

			var screenSize = GSI.Utils.getScreenSize();
			var left = offset.left + parseInt( a.outerWidth(true) );
			var top = offset.top;

			if ( left > screenSize.w * 0.6 )
			{
				left = offset.left + parseInt( a.outerWidth(true) * 0.3 );
				top = offset.top + a.outerHeight(true);
			}

			this._itemTooltip.css({
				left : left + 'px',
				top  : top + 'px'
			}).empty().append( this._makeToolTip( item ) );
			this._itemTooltip.stop().hide().fadeIn( 'normal' );

			if ( this._hideToolTipHandler )
			{
				$( document.body ).unbind( 'mousedown', this._hideToolTipHandler );
				$( document.body ).unbind( 'touchstart', this._hideToolTipHandler );
				this.listFrame.unbind( 'scroll', this._hideToolTipHandler );
				this._hideToolTipHandler  = null;
			}

			this._hideToolTipHandler  = MA.bind( function(event)
			{
				if ( !this._itemTooltip || event.target == this._itemTooltip[0] ) return;

				var parents = $( event.target ).parents();

				for (var i=0; i<parents.length; i++ )
				{
					if ( parents[i] == this._itemTooltip[0] ) return;
				}

                var fToopTop = false;
                if($(event.target).is(".switch") || $(event.target).is(".inner") || $(event.target).is(".btn")){
                    fToopTop = true;
                }

                if(!fToopTop){
                    if(!$(event.target).is(".description_btn")){
                        this._curItem = undefined;
                    }
				    this._hideItemTooltip();
                }
				
				if ( event.type == "scroll" )
				{
					this._toolTipViewCounter = 0;
				}
			}, this );

			$( document.body ).bind( 'mousedown', this._hideToolTipHandler );
			$( document.body ).bind( 'touchstart', this._hideToolTipHandler );
			this.listFrame.bind( 'scroll', this._hideToolTipHandler );

		}
		else
		{
			this._hideItemTooltip();
		}
	},
	_hideItemTooltip : function( a, item )
	{
		if ( this._hideToolTipHandler )
		{
			$( document.body ).unbind( 'mousedown', this._hideToolTipHandler );
			$( document.body ).unbind( 'touchstart', this._hideToolTipHandler );
			this.listFrame.unbind( 'scroll', this._hideToolTipHandler );
			this._hideToolTipHandler  = null;
		}
		if ( this._itemTooltip )
		{
			this._itemTooltip.stop().hide();
            this._toolTipViewCounter = 0;
		}
	},
    _opacity : function(a, opacity, c)
    {
        var v = parseInt(opacity.text().replace("透過", "").replace("%", ""), 10);
        if(c == "++"){
            v++;
        }
        else if(c == "+"){
            var v2 = Math.floor(v * 0.1);
            var v1 = v - (v2 * 5);
            v = (v2 + 1) * 5 + v1;
        }
        else if(c == "--"){
            v--;
        }
        else if(c == "-"){
            var v2 = Math.floor(v * 0.1);
            var v1 = v - (v2 * 5);
            v = (v2 - 1) * 5 + v1;
        }
        
        else{
            v++;
        }
        if     (v <   0){ v =   0; }
        else if(v > 100){ v = 100; }

		var vPercentage = Math.floor(v);
		opacity.text('透過'+vPercentage+'%');
		v = (100 - v) / 100;

		var item = a.data( 'data' );
		
		item._visibleInfo.layer.setOpacity( v );
    	item._visibleInfo.opacity = v;
    },
    _opacity_start : function(a, opacity, c)
    {
        this.eDownMS   = 250;
        this.eDownTime = new Date().getTime()

        if(this._opacity_tm ){ clearTimeout (this._opacity_tm ); }
        if(this._opacity_tmi){ clearInterval(this._opacity_tmi); }

        this._opacity_tm  = null;
        this._opacity_tmi = null;

        var func = this;
        this._opacity_tm = setTimeout(
            function(){
                func._opacity_tmi = setInterval(
                    function(){
                        func._opacity(a, opacity, c + c);
                    }
                , 20
                );
            }
        , this.eDownMS);
    },
    _opacity_stop : function(a, opacity, c)
    {
        if(this._opacity_tm  != null){ clearTimeout (this._opacity_tm ); }
        if(this._opacity_tmi != null){ clearInterval(this._opacity_tmi); }

        var eUpTime = new Date().getTime();
        if (eUpTime - this.eDownTime < this.eDownMS) {
            this._opacity(a, opacity, c);
        }

        this.eDownTime = null;
    },
	_gray_scale : function(a, sw )
	{
		var item = a.data( 'data' );
		item._visibleInfo._grayScale = sw.checked();
		
		item._visibleInfo.layer.saturation = ( item._visibleInfo._grayScale ? 0 : 1 );
		
		GLOBE.MAP.setLayersHash();
	},
	_checkEvacuationLayer : function()
	{
	    if ( this.mapLayerList )
	    {
	    	var l = this.mapLayerList.getList();
	    	for(i = 0 ; i < l.length; i++ )
	    	{				
	    		if ( l[i].id.indexOf(CONFIG.layerEvacuationHeader) >= 0 )
	    		{
	    			return true;
	    		}				
	    	}
	    	var tl = this.mapLayerList.getTileList();

	    	for(i = 0 ; i < tl.length; i++ )
	    	{				
	    		if ( tl[i].id.indexOf(CONFIG.layerEvacuationHeader) >= 0 )
	    		{
	    			return true;
	    		}			
	    	}
	    }
		if( GSI.GLOBALS.layerTreeDialog.current )
		{
			if ( GSI.GLOBALS.layerTreeDialog.current.title_evac )
			{
				return true;
			}
		}
		

	    GSI.GLOBALS.evacDialog.hide();
		CONFIG.layerEvacuationIsConfirmOK = false;
	    return false;
	},

});

GSI.OpacitySlider = MA.Class.extend( {

	includes: MA.Mixin.Events,
	options : { value : 1 },
	element : null,
	initialize : function (options)
	{
		options = MA.setOptions(this, options);
		this.opacity = options.value;
		this.element = $( '<div>' ).addClass( 'gsi_opacity_slider' );

		this.bg = $( '<div>' ).addClass( 'gsi_opacity_slider_bg' );
		this.element.append( this.bg );

		this.btn = $( '<div>' ).addClass( 'gsi_opacity_slider_btn' ) . draggable( {
			containment: this.element,
			scroll: false,
			drag : MA.bind( function(  event, ui)
			{
				var w = this.element.outerWidth(false) - 24;
				this.opacity = 1 - ui.position.left / w;

				this.fire( 'change', this.opacity );
			}, this )
		} );
		this.element.append( this.btn );
	},
	refresh : function( opacity )
	{
		this.opacity = opacity;
		var w = this.element.outerWidth(false) - 24;
		var left  = Math.floor( w * (1-this.opacity) );
		this.btn.css( {left:left} );
	},
	getElement : function(){ return this.element; },
	getOpacity : function() {
		return this.opacity;
	}
} );


/************************************************************************
 - GSI.LayersJSON（layers.txt読み込み）
 ************************************************************************/
GSI.LayersJSON = MA.Class.extend( {
	includes: MA.Mixin.Events,
	ajax : null,
	layers : [],
	visibleLayers: [],
	visibleLayersHash : {},
	currentFileIndex : -1,
	options : {
		files : [ "layers.txt" ]
	},
	initialize : function (options)
	{
        this._load_base   = false;
        this._loadingData = null;
        this._data        = [];
		this._tabs = $.extend( [], options.layersTab );
		
		for ( var i=0; i<this._tabs .length; i++ )
		{
			this._data.push( {
					"type": "LayerGroup",
					"title": this._tabs[i].caption,
					"iconUrl": "",
					"toggleall": false,
					"isDetail" : this._tabs[i].isDetail,
					"entries": [],
					"isTab" : true
			} );
			if ( this._tabs[i].isDetail)
			{
				this._detailTabIndex = i;
			}
		}
		options = MA.setOptions(this, options);

		if ( options.layers )
		{
			this.options.layers = $.extend( true, [], options.layers );

			this._loadingData= [];
			for ( var i=0; i<this.options.layers.length; i++ )
			{
				this._loadingData.push( {
					url    : this.options.layers[i],
                    load   : false,
					layers : [],
					isDetail : true
				} );
			}
		}
	},
    initialize_layers : function(layers)
    {
        this.visibleLayers     = [];
        this.visibleLayersHash = {};

		if ( !layers ){
            this.options.visibleLayers = [];
        }
        else{
            this.options.visibleLayers = layers;
        }
		
        var fBaseMap = false;
		for ( var i=0; i<this.options.visibleLayers.length; i++ )
		{
			var layerData = this.options.visibleLayers[i];
			var info = {
				id : layerData.id,
				idx : this.visibleLayers.length,
				initialOpacity : layerData.opacity,
				hidden : layerData.hidden
			};
			this.visibleLayers.push( info );
			if ( !this.visibleLayersHash[ layerData.id ] )
				this.visibleLayersHash[ layerData.id ] = [];
				
			this.visibleLayersHash[ layerData.id ].push( info );
		}
    },
    initialize_layers_data : function(layers)
    {
        this.initialize_layers(layers);
        this._initializeData( this._data, null );

    },
    loadBase : function(){
        var load = this._load_base;
        this._load_base = true;
        return load;
    },
	setHasTileList : function( tileIdList )
	{
		this.hasTileList = tileIdList;
		this.refreshHasState();
	},
	refreshHasState : function()
	{
		if ( !this.hasTileList || !this.layers ) return;
		for ( var i=0; i<this.layers.length; i++ )
		{
			var info = this.layers[i];
			info.hasTile = ( this.hasTileList[ info.id ] == true  || !info.cocotile );
		}

	},
    add : function(layers){
        if(layers){
            if(this._loadingData == null){
                this._loadingData     = [];
    			this.currentFileIndex = -1;
				for( var i=0; i<this._tabs.length; i++ )
				{
					if ( this._tabs[i].layers == null ) continue;
					for( var j=0; j< this._tabs[i].layers.length; j++ )
					{
						this._loadingData.push( {
							url    : this._tabs[i].layers[j],
							load   : false,
							layers : [],
							isDetail : this._tabs[i].isDetail,
							tabIndex : i
						} );
					}
				}
            }
		    for (var i = 0; i < layers.length; i++){
				this._loadingData.push( {
					url    : layers[i],
                    load   : false,
					layers : [],
					isDetail : true

				} );
            }

            if(this.currentFileIndex == -1){
			    this._loadNext();
            }
        }
    },
	load : function()
	{
		if ( this.ajax )
		{
			try
			{
				this.ajax.abort();
			}
			catch( e ) {}
			this.ajax = null;
		}

		if ( this._loadingData )
		{
			this.currentFileIndex = -1;
			this._loadNext();
		}
		else
		{
			this.ajax = $.ajax({
				type: "GET",
				url: "layers.txt",
				dataType: "text",
				cache:false,
				success : MA.bind(this._onLoad, this),
				error : MA.bind(this._onLoadError, this)
			});
		}
	},
	_loadNext : function()
	{
		this.currentFileIndex++;

		if ( this.currentFileIndex >= this._loadingData.length )
		{
			for ( var i=0; i<this._loadingData.length; i++ )
			{
				if ( this._loadingData[i].isDetail )
				{
					for ( var j=0; j<this._loadingData[i].layers.length; j++ )
					{
						this._data[this._detailTabIndex].entries.push( this._loadingData[i].layers[j] );
					}
				}
				else
				{
					for ( var j=0; j<this._loadingData[i].layers.length; j++ )
					{
						this._data[this._loadingData[i].tabIndex].entries.push( this._loadingData[i].layers[j] );
					}
				}
			}

			this._loadingData = null;

            var _data = this._data.concat();
            this._initializeTreeCopy(_data, null);
			this._original = $.extend(true, [], _data);

			this.layers = [];

			this._initializeData( this._data, null );

			this.fire( "load", { tree: this.tree, visibleLayers : this.visibleLayers, visibleLayersHash: this.visibleLayersHash } );

			return;
		}

		var url = this._loadingData[ this.currentFileIndex ].url;

		this.ajax = $.ajax({
			type: "GET",
			url: url,
			dataType: "text",
			cache: CONFIG.LOADLAYERSTXTCACHE,
			success : MA.bind(this._onLoad, this),
			error : MA.bind(this._onLoadError, this)
		});
	},
	_onLoad : function(data, n)
	{
		var json = JSON.parse(data);
        if(!this._load_base){
            var json_base = JSON.parse("{ \"layers\": [ { \"type\": \"LayerGroup\", \"title\": \"" + CONFIG.layerBaseFolder + "\", \"title_sys\": \"" + CONFIG.layerBaseFolderSYS + "\", \"iconUrl\": \"\", \"open\": false, \"toggleall\": false, \"entries\": [] } ] }");
                json_base.layers[0].entries = json.layers.concat();
                json      = json_base;
        }

		if ( (json.layers) && (json.layers[0].title) && (!json.layers[0].title_sys) )
		{
			var hybridjson = JSON.parse("{ \"layers\":[] }");
			for(ll in json.layers)
			{
				if (json.layers[ll].title == "指定緊急避難場所")
				{
        			var json_evac2 = JSON.parse("{ \"type\": \"LayerGroup\", \"title\": \"" + CONFIG.layerEvacuationFolder + "\", \"title_evac\": \"" + CONFIG.layerEvacuationFolderSYS + "\", \"iconUrl\": \"\", \"open\": false, \"toggleall\": false, \"entries\": [] }");
        			//var json_evac2 = JSON.parse("{ \"layers\": [ { \"type\": \"LayerGroup\", \"title\": \"" + CONFIG.layerEvacuationFolder + "\", \"title_evac\": \"" + CONFIG.layerEvacuationFolderSYS + "\", \"iconUrl\": \"\", \"open\": false, \"toggleall\": false, \"entries\": [] } ] }");
        			json_evac2.entries = json.layers[ll].entries.concat();
        			//json_evac2.layers[0].entries = json.layers[ll].entries.concat();
        			hybridjson.layers.push(json_evac2);
				}
				else
				{
					hybridjson.layers.push(json.layers[ll]);
				}
			}
			json = hybridjson;
		}
		
        if ( json.layers ){
            this._onLoad_SRC_URL(json.layers, this._loadingData[ this.currentFileIndex ].url);
        }

		if ( this._loadingData )
		{
            this._loadingData[ this.currentFileIndex ].load   = true;
			this._loadingData[ this.currentFileIndex ].layers = json.layers;
			this._loadNext();
		}
		else
		{
			if ( json.layers )
			{
				this._data = json.layers;
				this._original = $.extend(true, [], this._data);
				this.layers = [];

				this._initializeData( this._data, null );
				this.fire( "load", { tree: this.tree, visibleLayers : this.visibleLayers, visibleLayersHash: this.visibleLayersHash } );
			}
			else{
                this._onLoadError();
            }
			return;
		}
	},
	_onLoad_SRC_URL : function(data, url)
	{
        for(var i = 0; i < data.length; i++){
            if(data[i].type == "LayerGroup"){
                data[i].src_url = url;

                if(data[i].entries){
                    this._onLoad_SRC_URL(data[i].entries, url);
                }
            }
        }

    },
	getBase : function()
    {
        return this._data[this._detailTabIndex].entries[0].entries;
    },
	getOriginal : function()
	{
		return this._original;
	},
	_onFileLoad : function(e)
	{

		this._data = JSON.parse(e.text);
		this._original = $.extend(true, [], this._data);
		this.layers = [];

		this._initializeData( this._data, null );
		this.fire( "load", { tree: this._data, visibleLayers : this.visibleLayers, visibleLayersHash: this.visibleLayersHash } );
	},
	_initializeData : function( data, parent )
	{
		if ( !data ) return;
		this._initializeTree( data, parent );
		this.tree = data;
	},
	_url2LayerType : function( url )
	{
		if ( !url ) return "";
		url = $.trim( url );

		if ( url.match( /\{tms\}/ ) )
		{
			return "tms";
		}

		if ( url.match( /photoprot\.php/ ) )
		{
			return "kml";
		}

		var ext = "";
		var layerType = "";
		var matchResult = url.match( /.*\.([^.]+$)/ );
		// 拡張子
		if (  matchResult ) ext = matchResult[1]

		// kml
		if ( ext == "kml" )
		{
			layerType = "kml";
			return layerType;
		}

		// タイルかどうか
		if ( url.match( /(\{x\})/ ) )
		{
			switch( ext )
			{
				case "geojson":
					layerType = "geojson_tile";
					break;
				case "topojson":
					layerType = "topojson_tile";
					break;
				default:
					layerType = "tile";
					break;
			}
		}
		else
		{
			switch( ext )
			{
				case "geojson":
				case "topojson":
				case "kml":
					layerType = ext;
					break;
			}
		}

		return layerType;
	},
	_getFolderId : function(lv)
	{
		if ( !this._currentFolderIdList ) this._currentFolderIdList = {};

		if ( !this._currentFolderIdList[ '' + lv ] )
			this._currentFolderIdList[ '' + lv ]  = 1;

		var result = this._currentFolderIdList[ '' + lv ] ;

		this._currentFolderIdList[ '' + lv ] ++;

		return result;
	},
	_initializeTree : function( tree, parent )
	{
		if ( !this.layersHash ) this.layersHash = {};
		
		if ( !tree ) return;
		var folderCount = 0;
		if ( !this._baseLayerList ) this._baseLayerList = {};
		
		for ( var i=0; i<tree.length; i++ )
		{
			if ( tree[i].type == "Layer" )
			{
				var info = tree[i];
				if ( window.location.protocol == "https:" )
					info.url = info.url.replace( "http://", "https://" );
				info.layerType = this._url2LayerType( info.url );
				if ( info.cocotile  )
				{
					if (  this.hasTileList ){
						info.hasTile = ( this.hasTileList[ info.id ] == true );
                    }
				}

				if ( this.visibleLayersHash[ info.id ] )
				{
					var layerInfo = this.visibleLayersHash[ info.id ];
					info.initialOpacity = layerInfo.initialOpacity;
					this.visibleLayersHash[ info.id ].info = info;
					
					for ( var j = 0; j<this.visibleLayersHash[ info.id ].length; j++ )
					{
						var layerInfo = this.visibleLayersHash[ info.id ][j];
						info.initialOpacity =layerInfo.initialOpacity;
						if ( ! this.visibleLayersHash[ info.id ][j].info  )
							this.visibleLayersHash[ info.id ][j].info = info;
					}
					
				}
				
				var isBase = GSI.GLOBALS.isBaseLayer( info );
				
				if ( parent.title_sys == CONFIG.layerBaseFolderSYS || isBase )
				{
					this._baseLayerList[ info.id ] = info;
					info._isBaseLayer = true;
				}
				if( info.layerType == "geojson" )
				{
					var a = info;
					var b = "";
					while( a.parent )
					{
						b = a.title + (b != "" ? "/" : "" ) + b;
						a= a.parent;
					}
				}
				
				
				if (!this.layersHash[info.id] )
					this.layersHash[info.id] = info;
				
				
				this.layers.push( info );
			}
			else
			{
				//if ( !tree[ i ] .id )
				//{
					tree[ i ] .isMultiLayer = false;
					tree[ i ] .id = ( parent ? parent.id + '_' + folderCount : 'f' + folderCount );
					folderCount ++;
				//}
				/*
				else if ( tree[ i ] .isMultiLayer != false)
				{
					var info = tree[i];
					info.layerType = 'multiLayer';
					info.isMultiLayer = true;
					if ( this.visibleLayersHash[ info.id ] )
					{
						//var layerInfo = this.visibleLayersHash[ info.id ];
						//info.initialOpacity =layerInfo.initialOpacity;
						//this.visibleLayersHash[ info.id ].info = info;
						for ( var j = 0; j<this.visibleLayersHash[ info.id ].length; j++ )
						{
							var layerInfo = this.visibleLayersHash[ info.id ][j];
							info.initialOpacity =layerInfo.initialOpacity;
							this.visibleLayersHash[ info.id ][j].info = info;
						}
						
					}
					this.layers.push( info );

				}
				*/
			}
			tree[i].parent = parent;
			this._initializeTree( tree[i].entries, tree[i]);
		}
	},
	_initializeTreeCopy : function( tree, parent )
    {
		if ( !tree ) return;
		var folderCount = 0;
		for ( var i=0; i<tree.length; i++ ){
			tree[i].parent = null;

			this._initializeTreeCopy( tree[i].entries, tree[i]);
        }
    },
	_onLoadError : function()
	{
		if ( this._loadingData )
			this._loadNext();
		else
			alert( 'レイヤー設定ファイルが読み込めませんでした。' );
	},
	_onFileLoadErrorRetry : function()
	{
		this.reader = new FileReader();
		this.reader.onload = MA.bind( this._onFileLoad, this);
		this.reader.onerror = MA.bind( this._onLoadErrorExit, this);
		this.reader.readAsText("./layer.txt");
	},
	_onLoadErrorExit : function() {}
} );

/************************************************************************
 - GSI.MapLayerList（表示レイヤー管理）
 ************************************************************************/


GSI.MapLayerList = MA.Class.extend( {
	includes: MA.Mixin.Events,
	tileList : [],
	list : [],
	initialize : function (map,options)
	{
		this.map = map;
		options = MA.setOptions(this, options);
	},
	appendKML : function( info )
	{
		if ( this.exists( info ) ) return;
		this.map.addLayer(info._visibleInfo.layer,true);
		this.list.unshift( info );
		this._initZIndex( this.list );
	},
	appendList : function( infoList, isHide )
	{
		for ( var i=0; i<infoList.length; i++ )
		{
			this.append( infoList[i], true, isHide );
		}
	},
	
	
	setBaseLayer : function( info )
	{
		var hit = false;
		for( var i=this.tileList.length-1; i>= 0; i-- )
		{
			if ( this.tileList[i]._isBaseLayer || GSI.GLOBALS.isBaseLayer(this.tileList[i]) )
			{
				this.map.viewer.imageryLayers.remove(this.tileList[i]._visibleInfo.layer, true);
				this.tileList[i]._visibleInfo = null;
				this.tileList[i] = info;
				
				hit = true;
				break;
			}
		}
		
		
		info._isBaseLayer = true;
		info._visibleInfo = {};
		info._visibleInfo.opacity = ( info.initialOpacity ? info.initialOpacity : 1.0 );
		info.initialOpacity = null;
		
		var baseMapImageryProvider = Cesium.createOpenStreetMapImageryProvider({
				url : "https://maps.gsi.go.jp/xyz/" + info.id.replace("_","") + "/",
				credit : "",
				fileExtension : info.url.substr(info.url.length-3,3),
				maximumTerrainLevel : 18,
				maximumLevel : 18
			});
		baseMapImageryProvider.options = info;
		info._visibleInfo.layer = this.map.viewer.imageryLayers.addImageryProvider(
			baseMapImageryProvider,
			0
		);
		info._visibleInfo.layer.alpha = info._visibleInfo.opacity;
		info._visibleInfo.layer._remove = function(viewer) {
			viewer.imageryLayers.remove(this, true);
		};
		
		if ( !hit )
		{
			this.tileList.push( info );
		}
		
		this.fire('change');
	},
	
	append : function( info, noFinishMove, isHide ,Confirm_FLAG)
	{
		if ( this.exists( info ) ) return;
		if ( info.id=="kokuarea" )
		{
			if(Confirm_FLAG == null){
				var KARI=this;
				jConfirm("航空法第１３２条で規定する無人航空機の飛行禁止空域のうち、航空法施行規則第２３６条第１号に掲げる空域（空港等の周辺空域）の投影面下となる場所を表示します。<br>なお、この情報には誤差が含まれている場合がありますので、境界付近等正確な空域については空港等の管理者に確認願います。<br>詳細については、<a target='_blank' href='http://www.mlit.go.jp/koku/koku_tk10_000003.html'>国土交通省ホームページ</a>で確認してください。", '留意事項', function(r) {
					if(r) {
						KARI.append(info, noFinishMove, isHide ,1);
					}
				});
				return;
			}
		}
		info._visibleInfo = {};
		info._visibleInfo.opacity = ( info.initialOpacity ? info.initialOpacity : 1.0 );
		//if ( isHide ) info._visibleInfo._isHidden = true;
		info._visibleInfo._isHidden = ( isHide ? true : false );
		info.initialOpacity = null;
		
		
		info._visibleInfo.layer = null; //GSI.Utils.infoToLayer(info, noFinishMove );
		
		//310-とりあえずコメントアウト
		//if ( info._visibleInfo.layer)
		{
			if ( info.layerType=="tile" )
			{
				/*
				var fBaseMap = false;
				if(info.parent && info.parent != null && info.parent.title_sys == CONFIG.layerBaseFolderSYS){
					fBaseMap = true;
				}
				if ( !info._visibleInfo._isHidden)
				{
					if(fBaseMap){
						
						info._visibleInfo.grayscale = GSI.GLOBALS.baseLayer.isGrayScale;
						//310-ベースマップ切り替え
						GSI.GLOBALS.baseLayer.setActiveId(info.id);
					}
					else{
						//310-タイル表示
						//this.map.addLayer(info._visibleInfo.layer,true);
					}
				}
				if(fBaseMap) this.tileList.push( info );
				
				else this.tileList.unshift( info );
				*/
				if ( info._isBaseLayer )
				{
				
				}
				else
				{
					// okw?
					/*
					if ( !info._visibleInfo._isHidden)
					{
						//310-タイル表示
						//this.map.addLayer(info._visibleInfo.layer,true);
						var layers = this.map.viewer.imageryLayers;
						info._visibleInfo.layer = layers.addImageryProvider(
							new Cesium.JapanGSIImageryProvider(info)
						);
						info._visibleInfo.layer.alpha = info._visibleInfo.opacity;
						info._visibleInfo.layer._remove = function(viewer) {
							viewer.imageryLayers.remove(this, true);
						};
						info._visibleInfo.layer._setVisible = function(viewer,visible) {
							this.show = visible;
						};
					}
					*/
					if ( !info._visibleInfo.layer)
					{
						//310-タイル表示
						//this.map.addLayer(info._visibleInfo.layer,true);
						var layers = this.map.viewer.imageryLayers;
						info._visibleInfo.layer = layers.addImageryProvider(
							new Cesium.JapanGSIImageryProvider(info)
						);
						info._visibleInfo.layer.alpha = info._visibleInfo.opacity;
						info._visibleInfo.layer._remove = function(viewer) {
							viewer.imageryLayers.remove(this, true);
						};
						info._visibleInfo.layer._setVisible = function(viewer,visible) {
							this.show = visible;
						};
					}
					info._visibleInfo.layer.alpha = info._visibleInfo.opacity;
					info._visibleInfo.layer._setVisible(this.map.viewer, !info._visibleInfo._isHidden);
					// okw
				}
				this.tileList.unshift( info );
				
				this._initZIndex( this.tileList );
			}
			else if ( info.layerType=="kml" )
			{
			// KML
				//info._visibleInfo .layer.on("loadstart", MA.bind( this.onLayerLoadStart, this, info._visibleInfo.layer, "KML"  ) );
				//info._visibleInfo .layer.on("loaded", MA.bind( this.onLayerLoad, this, info._visibleInfo.layer  ) );
				//info._visibleInfo .layer .load();
				info._visibleInfo.layer = new GLOBE.KMLLayer(this.map,info);
				info._visibleInfo.layer._setVisible(null, !info._visibleInfo._isHidden);
				/*
				if ( !info._visibleInfo._isHidden ) 
				{
					info._visibleInfo.layer._setVisible(null,true);
					//310-KML表示
					//this.map.addLayer(info._visibleInfo.layer,true);
				}
				*/
				this.list.unshift( info );
				this._initZIndexOffset( this.list, 10000 );
			}
			else if ( info.layerType=="geojson" )
			{
			// GeoJSON
				//info._visibleInfo .layer.on("loadstart", MA.bind( this.onLayerLoadStart, this, info._visibleInfo.layer, "GeoJSON"  ) );
				//info._visibleInfo .layer.on( "load", MA.bind( function(e){ this.onLayerLoad(e.src) },this));
				//info._visibleInfo .layer .load();
				info._visibleInfo.layer = new GLOBE.GeoJSONLayer(this.map,info);
				info._visibleInfo.layer._setVisible(null, !info._visibleInfo._isHidden);
				/*
				if ( !info._visibleInfo._isHidden ) 
				{
					info._visibleInfo.layer._setVisible(null,true);
					//310-KML表示
					//this.map.addLayer(info._visibleInfo.layer,true);
				}
				*/
				this.list.unshift( info );
				this._initZIndexOffset( this.list, 10000 );

			}
			else if ( info.layerType=="geojson_tile" )
			{
			// タイルGeoJSON
				//if (info.id != "experimental_anno" &&!info._visibleInfo._isHidden)
				if (true)//info.id != "experimental_anno")
				{
					info._visibleInfo.layer = new GLOBE.VectorTileLayer(this.map,info);
					info._visibleInfo.layer._setVisible(this.map.viewer, !info._visibleInfo._isHidden);
					/*
					if ( !info._visibleInfo._isHidden ) 
					{
						info._visibleInfo.layer._setVisible(null,true);
						//310-KML表示
						//this.map.addLayer(info._visibleInfo.layer,true);
					}
					*/
				}
				else if ( info.id == "experimental_anno" )
				{
					if ( info._visibleInfo.layer )
					{
						info._visibleInfo.layer._setVisible(viewer, true);
					}
					else
					{
						//310-タイルGeoJSON表示
						//this.map.addLayer(info._visibleInfo.layer,true);
						info._visibleInfo.layer = new Cesium.QuadtreePrimitive({
							tileProvider : new JapanGSIGeojsonProvider({
								"url"      : "http://cyberjapandata.gsi.go.jp/xyz/experimental_anno/{z}/{x}/{y}.geojson",
								"viewer"   : this.map.viewer
							})
						});
						info._visibleInfo.layer.type    = "GeojsonTile_QuadtreePrimitive";
						this.map.viewer.scene.primitives.add(info._visibleInfo.layer);
						
						info._visibleInfo.layer._remove = function(viewer) {
							info._visibleInfo.layer._setVisible(viewer, false);
							var len = GLOBE.MAP.viewer.scene.primitives.length;
							for(var i=len-1; i>=0; i--){
								var primitiveCollection = GLOBE.MAP.viewer.scene.primitives._primitives[i];
								// QuadtreePrimitive削除
								/*
								if(primitiveCollection.type == "GeojsonTile_QuadtreePrimitive"){
									viewer.scene.primitives.remove(primitiveCollection);
								}
								// LabelCollection削除
								if(primitiveCollection.type == "GeojsonTile_labelCollection"){
									viewer.scene.primitives.remove(primitiveCollection);
								}
								*/
							}
						};
						
						info._visibleInfo.layer._setVisible = function(viewer,visible) {
							info._visibleInfo.layer.tileProvider.show(visible);
							var len = GLOBE.MAP.viewer.scene.primitives.length;
							for(var i=0; i<len; i++){
								var primitiveCollection = GLOBE.MAP.viewer.scene.primitives._primitives[i];
								// LabelCollection
								if(primitiveCollection.type == "GeojsonTile_labelCollection"){
									for(var j=0; j<primitiveCollection._billboards.length; j++){
										primitiveCollection._billboards[j].show = visible;
									}
								}
							}
						};
						
						info._visibleInfo.layer._setVisible(null, !info._visibleInfo._isHidden);
						/*
						if ( info._visibleInfo._isHidden )
						{
							info._visibleInfo.layer._setVisible(this.map.viewer, false);
						}
						*/
						this._setTileGeoJSONAlpha(info._visibleInfo.layer,info._visibleInfo.opacity);
					}
				}
				this.list.unshift( info );
				this._initZIndexOffset( this.list, 10000 );
			}
			else if ( info.layerType=="topojson_tile" )
			{
			// タイルTopoJSON
				if ( !info._visibleInfo._isHidden ) 
				{
					
				}
				this.list.unshift( info );
				this._initZIndexOffset( this.list, 10000 );
			}
			else if ( info.layerType=="topojson" )
			{
			// TopoJSON
				info._visibleInfo .layer.on("loadstart", MA.bind( this.onLayerLoadStart, this, info._visibleInfo.layer, "TopoJSON"  ) );
				info._visibleInfo .layer.on( "load", MA.bind( function(e){ this.onLayerLoad(e.src) },this));
				info._visibleInfo .layer .load();
				
				if ( !info._visibleInfo._isHidden )
				{
					
				}
				this.list.unshift( info );
				this._initZIndexOffset( this.list, 10000 );
			}
			else if ( info.layerType=="tms" )
			{
			// TMS
				
				if ( !info._visibleInfo._isHidden ) 
				{
					
				}
				this.tileList.unshift( info );
				this._initZIndex( this.tileList );
			}
			else if ( info.layerType=="multiLayer" )
			{
			// 複数レイヤ
				info._visibleInfo .layer.on("loadstart", MA.bind( this.onLayerLoadStart, this, info._visibleInfo.layer, "MultiLayer"  ) );
				info._visibleInfo .layer.on( "load", MA.bind( function(e){ this.onLayerLoad(e.src) },this));
				info._visibleInfo .layer. load();
				
				if ( !info._visibleInfo._isHidden )
				{
					
				}
				this.list.unshift( info );
				this._initZIndexOffset( this.list, 10000 );
			}
			
			
		}
		
		this.fire('change');
	},
	
	
	
	_setTileGeoJSONAlpha : function(layer, alpha)
	{
		
		var len = this.map.viewer.scene.primitives.length;
		for(var i=0; i<len; i++){
			var primitiveCollection = this.map.viewer.scene.primitives._primitives[i];
			if(primitiveCollection.type == "GeojsonTile_labelCollection"){
				for(var j=0; j<primitiveCollection._billboards.length; j++){
					var color = primitiveCollection._billboards[j]._color;
					primitiveCollection._billboards[j].color = new Cesium.Color(color.red, color.green, color.blue, alpha);
				}
			}
		}
	},
	_showLoading : function(title)
	{
		if ( !this._showLoadingInc || this._showLoadingInc == 0 )
		{
			this._showLoadingInc = 0;
			GSI.Modal.LoadingMessage.show( 'ファイルを読み込んでいます...' );
		}
		this._showLoadingInc++;
	},
	_hideLoading : function()
	{
		this._showLoadingInc--;
		if ( this._showLoadingInc <= 0 )
			GSI.Modal.LoadingMessage.hide();
	},
	onLayerLoadStart : function(layer, title)
	{
		this._showLoading(title);
	},
	onLayerLoad : function(layer)
	{
		if ( !layer._noFinishMove && layer.getBounds )
		{
			try
			{
				this.map.fitBounds( layer.getBounds() );
			}
			catch( e ){}
		}
		this._hideLoading();
	},
	_initZIndexOffset : function( list, offset )
	{
		var zIndex = 0;
		
		for ( var i=list.length-1; i>= 0; i-- )
		{
			var info = list[i];
			if ( info._visibleInfo.layer )
			{
				if ( info._visibleInfo.layer.setMarkerZIndex )
				{
					info._visibleInfo.layer.setMarkerZIndex( zIndex );
					zIndex+= offset;
				}
			}
		}
	},
	_initZIndex : function( list )
	{
		var zIndex = 100;
		var baseLayer = null;
		// ベースレイヤー取得
		for( var i=0; i<this.map.viewer.imageryLayers.length; i++ )
		{
			baseLayer = this.map.viewer.imageryLayers.get(0);
			if ( baseLayer._isBaseLayer )
			{
				break;
			}
			else baseLayer = null;
		}
		
		for ( var i=0; i< list.length; i++ )
		{
			var info = list[i];
			if ( info._visibleInfo.layer )
			{
				this.map.viewer.imageryLayers.lowerToBottom(info._visibleInfo.layer);
			}
		}
		
		// ベースレイヤーを一番下
		if ( baseLayer ) this.map.viewer.imageryLayers.lowerToBottom(baseLayer);
	},
	refreshTileList : function( list )
	{
		this.tileList = list;
		this._initZIndex(this.tileList);
	},
	exists : function( info )
	{
		if ( CONFIG.LAYERTYPELIST[info.layerType].isTileImage )
		{
			for ( var i=0; i<this.tileList.length; i++ )
			{
				if ( this.tileList[i] == info )
				{
					return true;
				}
			}
			
			for ( var i=0; i<this.tileList.length; i++ )
			{
				if ( this.tileList[i].id == info.id )return true;
				
			}
			
		}
		else
		{
			for ( var i=0; i<this.list.length; i++ )
			{
				if ( this.list[i] == info )
				{
					return true;
				}
			}
			
			for ( var i=0; i<this.list.length; i++ )
			{
				if ( this.list[i].id == info.id ) return true;
			}
		}

		return false;
	},
	remove : function( info )
	{
		var targetInfo = null;
		if ( CONFIG.LAYERTYPELIST[info.layerType].isTileImage )
		{
			for ( var i=0; i<this.tileList.length; i++ )
			{
				if ( this.tileList[i] == info )
				{
					targetInfo = info;
					this.tileList.splice(i, 1);
					break;
				}
			}
			if (!targetInfo)
			{
				for ( var i=0; i<this.tileList.length; i++ )
				{
					if ( this.tileList[i].id == info.id )
					{
						targetInfo = this.tileList[i];
						this.tileList.splice(i, 1);
						break;
					}
				}
			}
		}
		else
		{
			for ( var i=0; i<this.list.length; i++ )
			{
				if ( this.list[i] == info )
				{
					targetInfo = info;
					this.list.splice(i, 1);
					break;
				}
			}
			
			
			if ( !targetInfo )
			{
				for ( var i=0; i<this.list.length; i++ )
				{
					if ( this.list[i].id == info.id )
					{
						targetInfo = this.list[i];
						this.list.splice(i, 1);
						break;
					}
				}
			}
		}
		
		if (targetInfo)
		{
			//310-指定レイヤを削除
			if (targetInfo._visibleInfo.layer && targetInfo._visibleInfo.layer._remove) 
				targetInfo._visibleInfo.layer._remove( this.map.viewer );
			
			targetInfo._visibleInfo = null;
		}
		this.fire('change');
	},
	clear : function()
	{
		for ( var i=0; i<this.list.length; i++ )
		{
			var info = this.list[i];
		//310-指定レイヤを削除
			
			if (info._visibleInfo.layer && info._visibleInfo.layer._remove) 
				info._visibleInfo.layer._remove( this.map.viewer );
			info._visibleInfo = null;
		}
		this.list =[];

		for ( var i=0; i<this.tileList.length; i++ )
		{
			var info = this.tileList[i];
			//310-指定レイヤを削除
			
			if (info._visibleInfo.layer && info._visibleInfo.layer._remove) 
				info._visibleInfo.layer._remove( this.map.viewer );
			info._visibleInfo = null;
		}
		this.tileList =[];

		this.fire('change');
	},
	getTileList : function()
	{
		return this.tileList;
	},
	getList : function()
	{
		return this.list;
	},
	getTotalCount : function()
	{
		return ( this.tileList ? this.tileList.length : 0 )
			+ ( this.list ? this.list.length : 0 );
	}
} );

GSI.Utils.infoToLayer = function( info, noFinishMove )
{
	var layer = null;
	if ( info.layerType=="tile" )
	{
		var options = {
			errorTileUrl : '',
		};
		if ( info.subdomains &&info.subdomains!="" )
		{
			options.subdomains= info.subdomains;
		}
		if ( ( info.minZoom == 0 || info.minZoom ) && info.minZoom != "" ) options.minZoom= info.minZoom;
		if ( ( info.maxZoom == 0 || info.maxZoom ) && info.maxZoom != "" ) options.maxZoom =info.maxZoom;
		if ( info.maxNativeZoom && info.maxNativeZoom!="" ) options.maxNativeZoom =info.maxNativeZoom;
		if ( info.attribution ) options.attribution =info.attribution;
		if ( info.bounds && info.bounds!="" ) options.bounds =info.bounds;

	}
	else if ( info.layerType=="kml" )
	{
		var options = {async: true, "_map": this.map};

		if ( ( info.minZoom == 0 || info.minZoom ) && info.minZoom != "" ) options.minZoom= info.minZoom;
		if ( ( info.maxZoom == 0 || info.maxZoom ) && info.maxZoom != "" ) options.maxZoom =info.maxZoom;
		if ( info.attribution ) options.attribution =info.attribution;
		if ( info.errorTileUrl ) options.errorTileUrl =info.errorTileUrl;
		if ( info.bounds && info.bounds!="" ) options.bounds =info.bounds;
		layer = new GSI.KML(info.url, options);
		layer._noFinishMove = noFinishMove;

	}
	else if ( info.layerType=="geojson" )
	{
	// GeoJSON
		var options = {};

		if ( ( info.minZoom == 0 || info.minZoom ) && info.minZoom != "" ) options.minZoom= info.minZoom;
		if ( ( info.maxZoom == 0 || info.maxZoom ) && info.maxZoom != "" ) options.maxZoom =info.maxZoom;
		if ( info.attribution ) options.attribution =info.attribution;
		if ( info.bounds && info.bounds!="" ) options.bounds =info.bounds;

		layer = new GSI.GeoJSON(info.url,options);
		layer._noFinishMove = noFinishMove;

	}
	else if ( info.layerType=="geojson_tile" )
	{
	// タイルGeoJSON
		var options = { clipTiles : true};
		var options2 = {};

		if ( info.subdomains &&info.subdomains!="" )
		{
			options.subdomains= info.subdomains;
		}
		if ( ( info.minZoom == 0 || info.minZoom) && info.minZoom!="" )
		{
			options.minZoom= info.minZoom;
			options._minZoom= info.minZoom;
		}
		if ( ( info.maxZoom == 0 || info.maxZoom ) && info.maxZoom!="" )
		{
			options.maxZoom =info.maxZoom;
			options._maxZoom =info.maxZoom;
		}

		if ( info.maxNativeZoom  && info.maxNativeZoom!="" )
		{
			options.maxNativeZoom =info.maxNativeZoom;
			options._maxNativeZoom =info.maxNativeZoom;
		}
		
		if ( info.maxCanvasZoom  && info.maxCanvasZoom!="" )
		{
			options.maxCanvasZoom =info.maxCanvasZoom;
			options._maxCanvasZoom =info.maxCanvasZoom;
		}
		
		if ( info.attribution )
		{
			options.attribution =info.attribution;
			options._attribution =info.attribution;
		}
		if ( info.bounds && info.bounds!="" )
		{
			options.bounds =info.bounds;
			options._bounds =info.bounds;
		}
		if ( info.styleurl && info.styleurl!="" )
		{
			options.styleurl =info.styleurl;
			options._styleurl =info.styleurl;
		}
		
	}
	else if ( info.layerType=="topojson_tile" )
	{
	// タイルTopoJSON
		var options = { clipTiles : true, isTopoJSON: true};
		var options2 = {};

		if ( info.subdomains &&info.subdomains!="" )
		{
			options.subdomains= info.subdomains;
		}
		if ( ( info.minZoom == 0 || info.minZoom) && info.minZoom!="" )
		{
			options.minZoom= info.minZoom;
			options._minZoom= info.minZoom;
		}
		if ( ( info.maxZoom == 0 || info.maxZoom ) && info.maxZoom!="" )
		{
			options.maxZoom =info.maxZoom;
			options._maxZoom =info.maxZoom;
		}

		if ( ( info.maxNativeZoom ) && info.maxNativeZoom!="" )
		{
			options.maxNativeZoom =info.maxNativeZoom;
			options._maxNativeZoom =info.maxNativeZoom;
		}

		if ( info.attribution )
		{
			options.attribution =info.attribution;
			options._attribution =info.attribution;
		}
		if ( info.bounds && info.bounds!="" )
		{
			options.bounds =info.bounds;
			options._bounds =info.bounds;
		}

	}
	else if ( info.layerType=="topojson" )
	{
	// TopoJSON
		var options = {layerType:'topojson'};

		if ( ( info.minZoom == 0 || info.minZoom ) && info.minZoom != "" ) options.minZoom= info.minZoom;
		if ( ( info.maxZoom == 0 || info.maxZoom ) && info.maxZoom != "" ) options.maxZoom =info.maxZoom;
		if ( info.attribution ) options.attribution =info.attribution;
		if ( info.bounds && info.bounds!="" ) ptions.bounds =info.bounds;

		layer = new GSI.GeoJSON(info.url,options);
		layer._noFinishMove = noFinishMove;
	}
	else if ( info.layerType=="tms" )
	{
	// TMS
		var options = {};

		if ( ( info.minZoom == 0 || info.minZoom ) && info.minZoom != "" ) options.minZoom= info.minZoom;
		if ( ( info.maxZoom == 0 || info.maxZoom ) && info.maxZoom != "" ) options.maxZoom =info.maxZoom;
		if ( info.maxNativeZoom && info.maxNativeZoom!="" ) options.maxNativeZoom =info.maxNativeZoom;
		if ( info.attribution ) options.attribution =info.attribution;
		if ( info.bounds && info.bounds!="" ) ptions.bounds =info.bounds;

		layer = new GSI.GSITMSLayer(info.url,options);
	}
	else if ( info.layerType=="multiLayer" )
	{
		// 複数レイヤ
		layer = new GSI.MultiLayer(info.entries);


	}

	return layer;
};


/************************************************************************
 - GSI.QueryParams
************************************************************************/
GSI.QueryParams = MA.Class.extend( {

	_controlSetting : {
		infoMenu:{visible:true},
		funcMenu:{visible:true},
		header:{visible:true},
		contextMenu:{visible:true},
		baseMapSelector:{visible:true}
	},
	_viewSetting : {
		centerCross : true,
		latLngGrid : false,
		utmGrid : false,
		tileGrid : false,
		t25000Grid : false,
		chiikiMesh : false,

		jihokuLine : false,
		miniMap : false
	},
	_layers : [],
	_viewListDialogVisible : false,
	_layerTreeDialogVisible : false,
	initialize : function(options)
	{
        var queryStrings = ( options && options.queryString ? options.queryString : window.location.search );
        var vHashLocation = location.hash;
        var vHashOptions  = "";
        var vHash         = vHashLocation.split("/&");
        if(vHash.length == 2){
            vHashLocation = vHash[0];
            vHashOptions  = vHash[1];
        }
        queryStrings += vHashOptions;

        this._f_queryLocation = queryStrings;
        this._f_queryOptions  = vHashOptions;
        this._f_queryStrings  = queryStrings + vHashLocation;

        this.initialize_proc(queryStrings);
    }
	,initialize_proc : function(queryStrings)
	{
        this._baseMap     = "";
        this._baseMapDisp = true;

		this.params = this._parse(queryStrings);
		try{ this._initPosition(); }catch(e){}
		try{ this._initBaseMap(); }catch(e){}
		try{ this._initControlSetting(); }catch(e){}
		try{ this._initViewSetting(); }catch(e){}
		try{ this._initLayerList(); }catch(e){}
		try{ this._initDialogSettings(); }catch(e){}
	},
    getInit : function(){
        var args = this._parse(window.location.search);

        var ret = true;
        if ( args["postmessage"] && args["postmessage"] == "1"){
            ret = false;
        }

        return ret;
    },
	getPosition : function( defaultPosition )
	{
		return ( this._position ? this._position  : defaultPosition );
	},
	getZoom : function( defaultZoom )
	{
		return ( this._zoom ? this._zoom  : defaultZoom );
	},
	getBaseMap : function()
	{
        this._initBaseMapExist();
        var ret = "";
        if(this._baseMap){
            ret = this._baseMap;
        }
		return ret;
	},
	getBaseMapDisp : function()
	{
        var ret = this._baseMapDisp;

        return ret;
    },
	getBaseMapGrayScale : function()
	{
		return this._baseMapGrayScale;
	},        
	getLayers : function()
	{
		return this._layers;
	},
	getViewListDialogVisible : function()
	{
		return this._viewListDialogVisible;
	},
	getLayerTreeDialogVisible : function()
	{
		return this._layerTreeDialogVisible;
	},
	getCurrentPath : function()
	{
        var cd = "";
        if(this.params["lcd"]){
            cd = this.params["lcd"];
        }

        return cd;
	},
	getControlSetting : function( )
	{
		return this._controlSetting;
	},
	getViewSetting : function( )
	{
		return this._viewSetting;
	},
	_initPosition : function()
	{
		if ( this.params["ll"] )
		{
			var latLng = this.params["ll"].split( ',' );

			if ( latLng.length == 2 )
			{
				if (
					( latLng[0].match(/^-?[0-9]+\.[0-9]+$/) || latLng[0].match(/^-?[0-9]+$/) )
					&&
					( latLng[1].match(/^-?[0-9]+\.[0-9]+$/) || latLng[1].match(/^-?[0-9]+$/) )
				)
				{
					this._position = [
						parseFloat( latLng[0] ),
						parseFloat( latLng[1] )
					];
				}
			}
		}

		// ズーム
		if ( this.params["z"] && this.params["z"].match(/^[0-9]+$/) )
			this._zoom = parseInt( this.params["z"] );
		if ( this._zoom && ( this._zoom < 1 || this._zoom > 18 ) )
		{
			this._zoom = null;
		}
	},
	_initBaseMap : function()
	{
        if(this._baseMap){
            this._baseMap = "";
        }

        var fBaseMap = true;
        if(this._f_queryStrings == "" || (this._f_queryOptions.lastIndexOf("base") == -1 && this._f_queryOptions.lastIndexOf("=") == -1)){
            fBaseMap = false;
        }

        this._baseMapGrayScale = false;

		if ( this.params["base"] )
		{
			this._baseMap = this.params["base"];
            if(this._baseMap != ""){
                fBaseMap = true;
            }
		}
		
        if(!fBaseMap){
            this.params["base"] = CONFIG.layerBaseDefaultID;
            this._initBaseMap();
        }
        if(this.params["base_grayscale"]){
            if(this.params["base_grayscale"] == "1"){
                this._baseMapGrayScale = true;
            }
        }

        this._initBaseMapExist();
	},
	_initBaseMapExist : function()
	{
        if(this._baseMap != ""){
            var fBaseMapExists = true;
            if(this._f_queryStrings != ""){
                if(CONFIG.BASETILES.length > 0){
                    fBaseMapExists = false;
                    for(n = 0; n < CONFIG.BASETILES.length; n++){
                        if(CONFIG.BASETILES[n].id == this._baseMap){
                            fBaseMapExists = true;
                            break;
                        }
                    }
                }
            }
            if(!fBaseMapExists){
                this._baseMap = "";
            }
        }
    },
	_initLayerList : function()
	{
        var fBaseMap = true;
        var vParams  = "";

        if(!this._baseMap){
            fBaseMap = false;
        }

		this._layers = [];
		if ( this.params["ls"] )
		{
            vParams = this.params["ls"];

			var disp = this.params["disp"];
			
			var layers = this.params["ls"].split( '|' );
            
			for ( var i=0; i<layers.length; i++ )
			{
				if ( $.trim( layers[i] ) == '' ) continue;
				var parts  = layers[i].split( ',' );
				var $hdn = false;

				if ( disp && disp.length > i)
				{
					if ( disp.charAt(i) == '0' )
					{
						$hdn = true;
					}
					else
					{
						$hdn = false;
					}
				}
				else
				{
					$hdn = false;
				}

                var vID = parts[ 0 ];
                if(CONFIG.BASETILES.length == 0){
                }
                else{
                    for(n = 0; n < CONFIG.BASETILES.length; n++){
                        if(CONFIG.BASETILES[n].id == parts[ 0 ]){
                            vID = this._baseMap;
                            break;
                        }
                    }
                }

                if(!this._baseMap){
                    if(i == 0){
                        this._baseMap = vID;
                    }
                }

                if(vID == this._baseMap){
                    fBaseMap = false;
                    this._baseMap = vID;
                    this._baseMapDisp = !$hdn;
                }

				var layerData = {
					id      :vID,
					opacity : 1,
					hidden  : $hdn
				};

				if ( parts.length >= 2 )
				{
					var opacity = parts[1];
					if (!isNaN(opacity))
					{
						opacity = parseFloat( opacity );
						if ( opacity >= 0.0 && opacity <= 1.0 )
							layerData.opacity = opacity;
					}
				}
				this._layers.push( layerData );
			}
		}

        if(fBaseMap && this._baseMap != ""){
            this.params["ls"] = this._baseMap;
            if(vParams != ""){
                this.params["ls"] += '|' + vParams;
            }
            this._initLayerList();
        }

        this._initBaseMapExist();
	},
	_initControlSetting : function()
	{
		if ( this.params["hc"] )
		{
			var ctrl = this.params["hc"];
			if ( ctrl.toLowerCase() == CONFIG.HIDDENCONTROLPARAMETER.ALL )
			{
				this._controlSetting = {
					infoMenu:{visible:false},
					funcMenu:{visible:false},
					header:{visible:false},
					contextMenu:{visible:false},
					baseMapSelector:{visible:false}
				};
			}
			else
			{
				for( var i=0; i<ctrl.length; i++ )
				{
					switch( ctrl.charAt( i ).toLowerCase() )
					{
						case CONFIG.HIDDENCONTROLPARAMETER.INFOMENU:
							// 情報メニュー
							this._controlSetting.infoMenu.visible = false;
							break;

						case CONFIG.HIDDENCONTROLPARAMETER.FUNCMENU:
							// 機能メニュー
							this._controlSetting.funcMenu.visible = false;
							break;
						case CONFIG.HIDDENCONTROLPARAMETER.HEADER:
							// ヘッダー
							this._controlSetting.header.visible = false;
							break;

						case CONFIG.HIDDENCONTROLPARAMETER.CONTEXTMENU:
							// コンテキストメニュー
							this._controlSetting.contextMenu.visible = false;
							break;

						case CONFIG.HIDDENCONTROLPARAMETER.BASEMAPSELECTOR:
							// ベースマップセレクター
							this._controlSetting.baseMapSelector.visible = false;
							break;
					}
				}
			}
		}
	},
	_initViewSetting : function()
	{
		if ( this.params["vs"] )
		{
			var vs = this.params["vs"];

			for ( var i=0; i<vs.length; i+=2 )
			{
				if ( vs.length -1 == i ) break;
				var key = vs.charAt(i);
				var value = vs.charAt(i+1);

				for( var qpKey in CONFIG.QUERYPARAMETER )
				{
					if (CONFIG.QUERYPARAMETER[ qpKey ].prefix == key )
					{
						this._viewSetting[CONFIG.QUERYPARAMETER[ qpKey ].settingName]  = ( value == "1" );
						break;
					}
				}
			}
		}
	},
	_initDialogSettings : function()
	{
        this._viewListDialogVisible  = false;
        this._layerTreeDialogVisible = false;

		if ( this.params["d"] )
		{
			var d = this.params["d"];

			for ( var i=0; i<d.length; i++ )
			{
				var id = d.charAt(i);
				switch( id )
				{
					case "v":
						this._viewListDialogVisible = true;
						break;

					case "l":
						this._layerTreeDialogVisible = true;
						break;

				}
			}
		}
	},
	_parse : function( queryString, separator )
	{
		var result = {};
		if( 1 < queryString.length )
		{
			var query = ( queryString.charAt(0) == '?' ? queryString.substring( 1 ) : queryString );

			var parameters = query.split( '&' );

			for( var i = 0; i < parameters.length; i++ )
			{
                try{
				    var element = parameters[ i ].split( '=' );

				    var paramName = decodeURIComponent( element[ 0 ] );
				    var paramValue = decodeURIComponent( element[ 1 ] );
    				result[ paramName ] = paramValue;
                }
                catch(e){

                }
			}
		}
		return result;
	}
} );


/************************************************************************
 GLOBE.FOOTER
 ************************************************************************/
GLOBE.DIALOG.FOOTER = $.extend({}, new GLOBE.CLASS.DIALOG('gsi_dialog_footer'), {
	options: {
		title: '位置情報'
	},
	defaultTop:   'auto',
	defaultLeft:  'auto',
	defaultRight: '10px',
	defaultBottom:'10px',
	resizable: false,
	create: function()
	{
		this.createDialog();
		this.setDialogHeader('位置情報');
		var h = $(window).height();

		    $('#gsi_dialog_footer')
  			.css({
				'color': '#fff',
				'background': '#333',
				'opacity': '.90'
			})
	},
	
	_initializeContent: function(lon,lat,height,address)
	{
		lon = (isNaN(lon) ? lon : lon * 1);
		lat = (isNaN(lat) ? lat : lat * 1);
		height = (isNaN(height) ? height : height * 1);
		
    var ellipsoid = GLOBE.MAP.viewer.scene.globe.ellipsoid;
           
			this.frame = $('<div></div>');

			if (!address) {address="---";}

			this.label1 = $('<div><span style="color:#ccc;">住所：</span>　'+address+'</div>')
				.appendTo(this.frame);
			this.label1 = $('<div>　　　　(付近の住所。正確な所属を示すとは限らない)</div>')
  			.css({
				'color': '#ccc',
				'font-size': '7.5pt'
			})

				.appendTo(this.frame);

		var center = { lat : lat, lng : lon};

		var dms = GSI.Utils.latLngToDMS( center );
			var lon2=(center.lat < 0 ? '-' : '') + dms.lat.d + '度' + dms.lat.m + '分' + ( Math.round( dms.lat.s * 100 ) / 100 ).toFixed(2)  + '秒'
			var lat2=(center.lng < 0 ? '-' : '') + dms.lng.d + '度' + dms.lng.m + '分' + ( Math.round( dms.lng.s * 100 ) / 100 ).toFixed(2)  + '秒'
		var utmPoint = GSI.UTM.Utils.latlng2PointName( center.lat, center.lng );
		utmPoint=(utmPoint == '' ? '---' : utmPoint);
		this.lonlat2 = $('<div>' + lon2 + ' ' + lat2+'</div>')
			.appendTo(this.frame);
		this.lonlat = $('<div>' + lat + ',' + lon+'</div>')
			.appendTo(this.frame);
		this.UTM = $('<div><span style="color:#ccc;">UTMポイント：</span>'+utmPoint+'</div>')
			.appendTo(this.frame);
		this.a = $('<a href="https://maps.gsi.go.jp/help/howtouse.html" target="_blank"> 表示値の説明</a>')
		    .css({
				'color': '#333',
				'background': 'linear-gradient(#f5f5f5, #f0f0f0)',
				'position': 'absolute',
				'bottom': '6px',
				'right': '4px',
				'padding':' 1px 5px 1px 5px',
				'font-size':' 9pt'
			})
			.appendTo(this.frame);
		
		this.outPutHeight = $('<div><span style="color:#ccc;">標高：</span><span id="DemHeight">---</span></div>')
			.appendTo(this.frame);
		
		this.setDialogContent( this.frame );
		
		this.refreshDEMHeight();
	},
	refreshDEMHeight : function(){
		
		if ( GLOBE.MAP.outPutHeight && this.outPutHeight )
		{
			this.outPutHeight.find("#DemHeight").html(GLOBE.MAP.outPutHeight);
			this._getDemHeightCouter = 0;
		}
	},
	
	onDragStart: function()
	{
		this.container.css({
			'right': 'auto',
			'bottom': 'auto'
		});
	},
	
	onBeforeClose: function()
	{
		GLOBE.MAP.clearPinLayers("FOOTER");
	}
});



/************************************************************************
 - GSI.Map
 ************************************************************************/
GSI.map = function (id, options) {
	return new GSI.Map(id, options);
};



/************************************************************************
 - GLOBE.VectorLayer
 ************************************************************************/
GLOBE.VectorLayer = MA.Class.extend( {
	
	options : {
		
	},
	_IEHeight : 3500,

	_visible : true,
	_map : null,
	_loaded : false,
	_primitives : [],
	//_billboards : [],
	_beforeHeight : null,
	_moveEndHandler : function(){},
	_uniqueId : GLOBE.MAP.getNewId(),

	initialize : function(map,options)
	{
		this._visible = true;
		this._primitives = [];
		this._billboards = [];
		this._map = map;
		options = MA.setOptions(this, options);
		this._load();
		
		this._moveEndHandler = this._onCameraMoveEnd.bind(this);
		this._map.viewer.camera.moveEnd.addEventListener(this._moveEndHandler);
		this._beforeHeight = GLOBE.MAP.currents.height;
	},
	
	setAlpha : function(alpha)
	{
		if ( this._dataSource )
		{
			var entities = this._dataSource.entities.values;
			for ( var i=0; i<entities.length; i++ )
			{
				var entity = entities[i];
				var material = null;
				
				if ( entity.billboard )
				{
					var color = (entity.billboard.color ? entity.billboard.color : new Cesium.Color(1, 1, 1, 1));
					entity.billboard.color = new Cesium.Color(color.red, color.green, color.blue, alpha);
				}
				else if ( entity.polyline )
				{
					material = entity.polyline.material;
				}
				else if ( entity.polygon )
				{
					material = entity.polygon.material;
				}
				
				if ( material )
				{
					var color = (material.color ? material.color._value : new Cesium.Color(0, 0, 0, 1));
					color = (material.defaultColor ? material.defaultColor : color);
					material.defaultColor = color;
					material.color = new Cesium.Color(color.red, color.green, color.blue, color.alpha * alpha);
				}
			}
		}
		
		if ( this._primitives )
		{
			for( var i=0; i<this._primitives.length; i++ )
			{
				var attr = this._primitives[i].getGeometryInstanceAttributes("color");
				if ( attr )
				{
					var color = this._primitives[i]._defaultColor;
					attr.color =Cesium.ColorGeometryInstanceAttribute.toValue(
							new Cesium.Color( color.red, color.green, color.blue, color.alpha * alpha )
						);
				}
			}
		}
		
		if ( this._billboardCollection )
		{
			for( var i=0; i<this._billboardCollection.length; i++ )
			{
				var billboardCollection = this._billboardCollection.get(i);
				for ( var j=0; j<billboardCollection.length; j++ )
				{
					var billboard = billboardCollection.get(j);
					var color = billboard._color;
					if ( CONFIG.TILEASICON_ENABLED && billboard.gsidata._markerType != 'DivIcon' && alpha != 0 )
					{
						billboard.color = new Cesium.Color(color.red, color.green, color.blue, CONFIG.TILEASICON_ICONALPHA);
					}
					else
					{
						billboard.color = new Cesium.Color(color.red, color.green, color.blue, alpha);
					}
				}
			}
		}
		
		if ( this._singleImageryLayerId )
		{
			GLOBE.MAP.alphaSingleImageryLayer(this._singleImageryLayerId, alpha);
		}
	},
	_setVisible : function( viewer, visible )
	{
		//if( this._visible == visible ) return;
		this._visible = visible;
		
		if ( this._dataSource )
		{
			this._dataSource.show = visible;
		}
		
		if ( this._primitives )
		{
			for( var i=0; i<this._primitives.length; i++ )
			{
				this._primitives[i].show = this._visible;
			}
		}
		
		if ( this._billboardCollection )
		{
			this._billboardCollection.show = this._visible;
		}
		
		if ( this._singleImageryLayerId )
		{
			GLOBE.MAP.showSingleImageryLayer(this._singleImageryLayerId, this._visible);
		}
	},
	
	_remove : function() 
	{
		if ( this._ajax )
		{
			try
			{
				this._ajax.abort();
				
			}
			catch(e){}
			this._ajax = null;
		}
		
		if ( this._dataSource )
		{
			this._map.viewer.dataSources.remove(this._dataSource, true);
		}
		
		if ( this._primitives )
		{
			for( var i=0; i<this._primitives.length; i++ )
			{
				this._map.viewer.scene.primitives.remove(this._primitives[i]);
			}
		}
		
		if ( this._billboardCollection )
		{
			this._map.viewer.scene.primitives.remove(this._billboardCollection);
		}
		
		if ( this._singleImageryLayerId )
		{
			GLOBE.MAP.removeSingleImageryLayer(this._singleImageryLayerId);
		}
		
		this._primitives = null;
		this._billboardCollection = null;
		this._singleImageryLayerId = null;
		this._map.viewer.camera.moveEnd.removeEventListener(this._moveEndHandler);
	},
	
	_redraw : function() 
	{
		if ( this._dataSource )
		{
			this._map.viewer.dataSources.remove(this._dataSource, true);
		}
		
		if ( this._primitives )
		{
			for( var i=0; i<this._primitives.length; i++ )
			{
				this._map.viewer.scene.primitives.remove(this._primitives[i]);
			}
		}
		
		if ( this._billboardCollection )
		{
			this._map.viewer.scene.primitives.remove(this._billboardCollection);
		}
		
		if ( this._singleImageryLayerId )
		{
			GLOBE.MAP.removeSingleImageryLayer(this._singleImageryLayerId);
		}
		
		this._primitives = [];
		this._billboardCollection = null;
		
		this._onLoad();
	},
	
	_load : function()
	{
		this._remove();
		this._primitives = [];
		
		this._ajax = $.ajax({
			type: "GET",
			url: this.options.url,
			dataType: "text",
			cache: true,
			success : MA.bind(this._onLoad, this),
			error : MA.bind(this._onLoadError, this)
		});
	},
	
	_onLoad : function(){},
	_onLoadError : function(){},
	
	_onCameraMoveEnd: function()
	{
		var latLng = GLOBE.MAP.getCameraPosition();
		if ( Math.abs(this._beforeHeight - latLng[2]) > this._beforeHeight * 0.1 )
		{
			this._onZoomChange(latLng[2]);
		}
	},
	
	_onZoomChange: function(height)
	{
		var removeList = [];
		var addList = [];
		
		for ( var i=0; i<this._map.viewer.scene.primitives._primitives.length; i++ )
		{
			var primitive = this._map.viewer.scene.primitives._primitives[i];
			if ( primitive.gene && primitive.gene.kind == 'corridor' )
			{
				var newPrimitive = this.createCorridorPrimitive(primitive.gene);
				newPrimitive.show = primitive.show;
				newPrimitive._defaultColor = primitive._defaultColor;
				addList.push(newPrimitive);
				removeList.push(primitive);
			}
		}
		// 削除
		for ( var i=0; i<removeList.length; i++ )
		{
			this._map.viewer.scene.primitives.remove(removeList[i]);
		}
		// 追加
		for ( var i=0; i<addList.length; i++ )
		{
			this._map.viewer.scene.primitives.add(addList[i]);
			this._primitives.push(addList[i]);
		}
		// 整理
		var newList = [];
		for ( var i=0; i<this._primitives.length; i++ )
		{
			if ( !this._primitives[i].isDestroyed() )
			{
				newList.push(this._primitives[i]);
			}
		}
		this._primitives = newList;
		this._beforeHeight = height;
	},
	
	_getPrimitivePointIcon : function(position, imageURL, name)
	{
		imageURL = MATEST.proxyUrl(imageURL);
		
		return GLOBE.MAP.getPrimitivePoint_Icon(position, imageURL, name);
	},
	
	_getPrimitiveIconCircle : function(position, fillColor, radius, isIE)
	{
		// IEの場合は高さを調整する
		if(isIE){
			var ellipse = new Cesium.EllipseGeometry({
				"center" : position,
				"semiMajorAxis" : radius,
				"semiMinorAxis" : radius,
				"height"        : this._IEHeight
			});
		}else{
			var ellipse = new Cesium.EllipseGeometry({
				"center" : position,
				"semiMajorAxis" : radius,
				"semiMinorAxis" : radius
			});
		}

		var geometryInstance = new Cesium.GeometryInstance({
			"geometry"   : ellipse,
			"attributes" : {
				"color": new Cesium.ColorGeometryInstanceAttribute(fillColor.red, fillColor.green, fillColor.blue, fillColor.alpha)
			},
			id: 'color'
		});

		return geometryInstance;
	},
	
	
	_getPrimitivePolygon : function(hierarchy, color, isIE)
	{

		// IEの場合は高さを調整する
		if(isIE){
			var polygon = new Cesium.PolygonGeometry({
				"polygonHierarchy" : hierarchy,
				"height"           : this._IEHeight,
				"perPositionHeight": true
			});
		}else{
			var polygon = new Cesium.PolygonGeometry({
				"polygonHierarchy" : hierarchy
			});
		}

		var geometryInstance = new Cesium.GeometryInstance({
			"geometry"   : polygon,
			"attributes" : {
				"color" : new Cesium.ColorGeometryInstanceAttribute(color.red, color.green, color.blue, color.alpha)
			},
			id: 'color'
		});

		return geometryInstance;
	},

	_getPrimitiveLinestring : function(positions, color, width, isIE)
	{
		// IEの場合は高さを調整する
		if(isIE){
			var myGeometry = new Cesium.CorridorGeometry({
				"positions"    : positions,
				"width"        : width,
				"height"       : this._IEHeight,
				"vertexFormat" : Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
			});
		}else{
			var myGeometry = new Cesium.CorridorGeometry({
				"positions"    : positions,
				"width"        : width,
				"vertexFormat" : Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
			});
		}
		
		var geometryInstance = new Cesium.GeometryInstance({
			geometry : myGeometry,
			attributes : {
				color : new Cesium.ColorGeometryInstanceAttribute(color.red, color.green, color.blue, color.alpha)
			},
			id: 'color'
		});

		return geometryInstance;
	},
	
	createCorridorPrimitive: function(gene)
	{
		var geomInstance = null;
		var primitive = null;
		
		var latLng = GLOBE.MAP.getCameraPosition();
		var width = gene.width * latLng[2] / 600;
		
		// 【 IE11 】
		if(gene.isIE){
			// Primitiveとして追加する
			geomInstance = this._getPrimitiveLinestring(gene.position, gene.color, width, gene.isIE);
			primitive = new Cesium.Primitive({
				geometryInstances : [geomInstance],
				appearance : new Cesium.EllipsoidSurfaceAppearance({
					material : Cesium.Material.fromType("Color", {
						"color" : gene.color
					})
				})
			});
		// 【 IE11以外 】
		}else{
			// GroundPrimitiveとして追加する
			geomInstance = this._getPrimitiveLinestring(gene.position, gene.color, width, gene.isIE);
			primitive = new Cesium.GroundPrimitive({
				geometryInstances : [geomInstance]
			});
		}
		primitive["type"] = gene.type;
		primitive["primitiveID"] = gene.primitiveID;
		primitive["description"] = gene.description;
		primitive["name"]        = gene.name;
		primitive["gene"]        = gene;
		return primitive;
	}
} );


/************************************************************************
 - GLOBE.KMLLayer
 ************************************************************************/
GLOBE.KMLLayer = GLOBE.VectorLayer.extend( {

	initialize : function(map,options)
	{
		GLOBE.VectorLayer.prototype.initialize.call(this, map,options);
	},
	
	_onLoad : function(kml)
	{
		if ( kml )
		{
			this._originalData = kml;
		}
		else
		{
			kml = this._originalData;
		}
		
		//try{
			//var id = getRandomStr();
			var latArray = [];
			var lonArray = [];
			
			// いったんdataSource追加
			this._dataSource = new Cesium.KmlDataSource({
				camera: this._map.viewer.scene.camera,
				canvas: this._map.viewer.scene.canvas
			});
			this._map.viewer.dataSources.add(this._dataSource);
			// 高さ情報があるかどうか
			this._depthFlag = (kml.indexOf("<altitudeMode>") >=0 )? true : false;
			this._kml = $.parseXML(kml);
			
			// 高さ情報がある場合は倍率を適用
			var result = {};
			this._kml = ( this._depthFlag ? GLOBE.MAP.applyHeightPowerToKML(this._kml, result) : this._kml );
			this._depthFlag = (!result.depthFlag ? false : this._depthFlag);
			
			this._dataSource.load(this._kml).then( MA.bind( this._onKMLParse, this ) );
			
			
		//}
		//catch(e){
		//}
		
		
	},
	
	_onKMLParse : function(dataSource)
	{
		this._dataSource = dataSource;
		this._draw( this._dataSource );
	},
	
	_draw : function(dataSource)
	{
		var id = this._uniqueId;
		var latArray = [];
		var lonArray = [];
		
		//try{
			// 高さ情報がある場合はそのままentityとして描画----------------
			if(this._depthFlag)
			{
				GLOBE.MAP.initKmlDataSource(dataSource);
				
				if ( GSI.GLOBALS.layerTreeDialog._userControlStarted )
				{
					this._map.viewer.flyTo(dataSource, {
						duration: 1,
						complete: GLOBE.MAP.adjustFly
					});
				}
			}
			else
			{
			// 高さ情報がない場合はentityをprimitiveに変換して描画---------
				var entities = dataSource._entityCollection.values;
				
				for(var i=0; i<entities.length; i++){
					entities[i].show = false;  // いったん非表示にする
					
					if(entities[i]._children.length > 0){
						for(var j=0; j<entities[i]._children.length; j++){
							var arrayList = this._convertEntityToPrimitive(entities[i]._children[j], id);
							Array.prototype.push.apply(lonArray, arrayList.lon);
							Array.prototype.push.apply(latArray, arrayList.lat);
						}
					}else{
						var arrayList = this._convertEntityToPrimitive(entities[i], id);
						Array.prototype.push.apply(lonArray, arrayList.lon);
						Array.prototype.push.apply(latArray, arrayList.lat);
					}
				}
				// dataSource削除
				this._map.viewer.dataSources.remove(dataSource);
				
				if ( GSI.GLOBALS.layerTreeDialog._userControlStarted )
				{
					// ズーム
					var west  = Math.min.apply(null, lonArray);
					var east  = Math.max.apply(null, lonArray);
					var south = Math.min.apply(null, latArray);
					var north = Math.max.apply(null, latArray);
					west  = west-(east-west)/3;
					east  = east+(east-west)/3;
					south  = south-(north-south)/3;
					north  = north+(north-south)/3;
					this._map.viewer.camera.flyTo({
						destination : new Cesium.Rectangle.fromDegrees(west, south, east, north),
						duration :1,
						complete: function(){
							GLOBE.MAP.adjustFly();
						}
					});
				}
			}

			this._loaded = true;
			this._singleImageryLayerId = id;
		//}
		//catch(e){
		//}
		
	},
	
	_convertEntityToPrimitive :function(entity, id)
	{
		var isIE = GSI.Utils.Browser.ie;
		var ellipsoid = this._map.viewer.scene.globe.ellipsoid;

		var lonArray = [];
		var latArray = [];

		var name        = (entity._name)? entity._name : "名称なし";
		var description = (entity._description)? entity._description._value : "";
			description = $("<div/>").html(description).find("div").html();
		
		var label = "";
		
		// ポイント(アイコン)-----------------
		if(entity._billboard != undefined){
			var position    = entity._position._value;
			var imageURL    = entity._billboard._image._value;
			
			// 緯度経度を配列に入れる
			var cartographic = ellipsoid.cartesianToCartographic(position);
			var lon = Cesium.Math.toDegrees(cartographic.longitude);
			var lat = Cesium.Math.toDegrees(cartographic.latitude);
			lonArray.push(lon);
			latArray.push(lat);
			
			GLOBE.MAP.addSingleImageryLayer(id, name, position, imageURL);
			
			// scene.primitives -> PrimitiveCollection -> BillboardCollection -> billboard （エラー回避のため）
			if( !this._billboardCollection )
			{
				this._billboardCollection = new Cesium.PrimitiveCollection();
				this._map.viewer.scene.primitives.add(this._billboardCollection);
			}
			var billboardCollection = new Cesium.BillboardCollection({
				scene: this._map.viewer.scene
			});
			this._billboardCollection.add(billboardCollection);
			
			var billboards = this._getPrimitivePointIcon(position, imageURL, label);
			for(var j=0; j<billboards.length; j++){
				var billboard = billboardCollection.add(billboards[j]);
					billboard.show = this._visible;
					billboard["description"] = description;
					billboard["name"]        = name;
						billboard["gsidata"] = {
							"_markerType" : "",
							"_isLabel"    : (j==1 ? true : false)
						}
			}
			
		// ポリゴン(円含む)----------------------
		}else if(entity._polygon != undefined){
			var primitiveArray = [];
			var hierarchy   = entity._polygon._hierarchy._value;
			var color       = entity._polygon._material._color._value;
			var strokeColor = entity._polygon._outlineColor._value;
			var strokeWidth = entity._polygon._outlineWidth._value;

			// 緯度経度を配列に入れる
			var positions = hierarchy.positions;
			for(var i=0; i<positions.length; i++){
				var cartographic = ellipsoid.cartesianToCartographic(positions[i]);
				var lon = Cesium.Math.toDegrees(cartographic.longitude);
				var lat = Cesium.Math.toDegrees(cartographic.latitude);
				lonArray.push(lon);
				latArray.push(lat);
			}
			
			// ポリゴン
			// 【 IE11 】
			if(isIE){
				// Primitiveとして追加する
				var geomInstance = this._getPrimitivePolygon(hierarchy, color, isIE);
				var primitive = new Cesium.Primitive({
					geometryInstances : [geomInstance],
					appearance : new Cesium.EllipsoidSurfaceAppearance({
						material : Cesium.Material.fromType("Color", {
							"color" : color
						})
					})
				});
				primitiveArray.push(primitive);
				
			// 【 IE11以外 】
			}else{
				// ポリゴンをGroundPrimitiveとして追加する
				var geomInstance = this._getPrimitivePolygon(hierarchy, color, isIE);
				var groundPrimitive = new Cesium.GroundPrimitive({
					geometryInstances : [geomInstance]
				});
				primitiveArray.push(groundPrimitive);
			}
			
			// 枠線をPrimitiveとして追加する
			var gene = {
				kind: "corridor",
				type: "KmlLayer",
				description: description,
				name: name,
				position: hierarchy.positions,
				color: strokeColor,
				width: strokeWidth,
				isIE: isIE
			};
			if(entity._polygon._outlineColor._value.alpha > 0){
				var linePrimitive = this.createCorridorPrimitive(gene);
				primitiveArray.push(linePrimitive);
			}
			
			for(var j=0; j<primitiveArray.length; j++){
				var primitive = primitiveArray[j];
					primitive["description"] = description;
					primitive["name"]        = name;
					primitive._defaultColor = color;
				this._map.viewer.scene.primitives.add(primitive);
				primitive.show =this._visible;
				
				this._primitives.push( primitive );
			}

		// ラインストリング----------------------
		}else if(entity._polyline != undefined){
			var position = entity._polyline._positions._value;
			var color    = entity._polyline._material._color._value;
			var width    = entity._polyline._width._value;

			// 緯度経度を配列に入れる
			for(var i=0; i<position.length; i++){
				var cartographic = ellipsoid.cartesianToCartographic(position[i]);
				var lon = Cesium.Math.toDegrees(cartographic.longitude);
				var lat = Cesium.Math.toDegrees(cartographic.latitude);
				lonArray.push(lon);
				latArray.push(lat);
			}
			
			var gene = {
				kind: "corridor",
				type: "KmlLayer",
				description: description,
				name: name,
				position: position,
				color: color,
				width: width,
				isIE: isIE
			};
			var primitive = this.createCorridorPrimitive(gene);
			
			primitive._defaultColor = color;
			primitive["description"] = description;
			primitive["name"]        = name;
			this._map.viewer.scene.primitives.add(primitive);
			primitive.show =this._visible;
			this._primitives.push( primitive );
			
		}
		
		return {
			"lon" : lonArray,
			"lat" : latArray
		}
	},
	
	
	_onLoadError : function(text)
	{
		
	}
	
	
} );


/************************************************************************
 - GLOBE.GeoJSONLayer
 ************************************************************************/
GLOBE.GeoJSONLayer = GLOBE.VectorLayer.extend( {

	initialize : function(map,options)
	{
		GLOBE.VectorLayer.prototype.initialize.call(this, map,options);
	},
	
	_onLoad : function(geojson)
	{
		if ( geojson )
		{
			this._originalData = geojson;
		}
		else
		{
			geojson = this._originalData;
		}
		
		//try{
			var latArray = [];
			var lonArray = [];

			this._geoJSON = JSON.parse(geojson);
			this._draw(this._geoJSON);
		//}
		//catch(e){
		//}
		
		
	},
	
	
	_draw : function(geojson)
	{
		var latArray = [];
		var lonArray = [];
		
		if ( !geojson )
		{
			geojson = this._geoJSON;
		}
		
		var id     = this._uniqueId;
		var len    = geojson.features.length;
		var viewer = this._map.viewer;
		var isIE = GSI.Utils.Browser.ie;
		
		for(var i=0; i<len; i++){
			var primitiveArray = [];

			var feature = geojson.features[i];
			var coord   = feature.geometry.coordinates;
			var name        = (feature.properties.name)? feature.properties.name : "名称なし";
			var description = this._getEntityDescription(feature.properties);
			var geomType    = feature.geometry.type;
			var markerType = feature.properties._markerType;
			
			var html = (markerType == 'DivIcon' ? feature.properties._html : name);
			var ellipsoid = viewer.scene.globe.ellipsoid;
			
			// ポイント(アイコン,TEXT)-------------
			if(geomType == "Point" && (markerType == "Icon" || markerType == "DivIcon")){
				var position    = new Cesium.Cartesian3.fromDegrees(coord[0], coord[1], 0, ellipsoid);
				var imageURL    = (markerType == "DivIcon")? "image/system/icon_nothing.png" : feature.properties._iconUrl;

				lonArray.push(coord[0]);
				latArray.push(coord[1]);
				
				GLOBE.MAP.addSingleImageryLayer(id, name, position, imageURL);
				
				// scene.primitives -> PrimitiveCollection -> BillboardCollection -> billboard （エラー回避のため）
				if ( !this._billboardCollection )
				{
					this._billboardCollection = new Cesium.PrimitiveCollection();
					viewer.scene.primitives.add(this._billboardCollection);
				
				}
				var billboardCollection = new Cesium.BillboardCollection({
					scene: viewer.scene
				});
				this._billboardCollection.add(billboardCollection);
				
				var billboards = (markerType == "DivIcon" ?
					GLOBE.MAP.getPrimitiveDiv_Icon(position, html) :
					GLOBE.MAP.getPrimitivePoint_Icon(position, imageURL, name)
				);
				
				for(var j=0; j<billboards.length; j++){
					var billboard = billboardCollection.add(billboards[j]);
						billboard.show = this._visible;
						billboard["description"] = description;
						billboard["name"]        = name;
						billboard["gsidata"] = {
							"_markerType" : markerType,
							"_isLabel"    : (j==1 ? true : false)
						}
				}

			// ポイント(円)-----------------------
			}else if(feature.geometry.type == "Point" && feature.properties._markerType == "Circle"){
				var position    = new Cesium.Cartesian3.fromDegrees(coord[0], coord[1]);
				var fillColor   = this._hexToRgb(feature.properties._fillColor);
					fillColor   = new Cesium.Color(fillColor[0]/255, fillColor[1]/255, fillColor[2]/255, feature.properties._fillOpacity);
				var strokeColor = this._hexToRgb(feature.properties._color);
					strokeColor = new Cesium.Color(strokeColor[0]/255, strokeColor[1]/255, strokeColor[2]/255, feature.properties._opacity);
				var color       = new Cesium.Color(strokeColor[0]/255, strokeColor[1]/255, strokeColor[2]/255, feature.properties._opacity);;
				var strokeWidth = feature.properties._weight;
				var radius      = feature.properties._radius;

				lonArray.push(coord[0]);
				latArray.push(coord[1]);

				// 【 IE11 】
				if(isIE){
					// 円をPrimitiveとして追加する
					var geomInstance = this._getPrimitiveIconCircle(position, fillColor, radius, isIE);
					var primitive = new Cesium.Primitive({
						geometryInstances : [geomInstance],
						appearance : new Cesium.EllipsoidSurfaceAppearance({
							material : Cesium.Material.fromType("Color", {
								"color" : fillColor
							})
						})
					});
					primitive._defaultColor = fillColor;
					primitiveArray.push(primitive);

					// アウトラインをPrimitiveとして追加する
					if(feature.properties._opacity > 0){
						var positions = this._getCirclePosition(position, radius);
						var geomInstance = this._getPrimitiveLinestring(positions, strokeColor, strokeWidth, isIE);
						var linePrimitive = new Cesium.Primitive({
							geometryInstances : [geomInstance],
							appearance : new Cesium.EllipsoidSurfaceAppearance({
								material : Cesium.Material.fromType("Color", {
									"color" : strokeColor
								})
							})
						});
						linePrimitive._defaultColor = strokeColor;
						primitiveArray.push(linePrimitive);
					}
				// 【 IE以外 】
				}else{
					// 円をGroundPrimitiveとして追加する
					var geomInstance = this._getPrimitiveIconCircle(position, fillColor, radius, isIE);
					var primitive = new Cesium.GroundPrimitive({
						geometryInstances : [geomInstance]
					});
					primitive._defaultColor = fillColor;
					primitiveArray.push(primitive);
					
					// 枠線をPrimitiveとして追加する
					if(feature.properties._opacity > 0){
						var positions = this._getCirclePosition(position, radius);
						var gene = {
							kind: "corridor",
							type: "GeojsonLayer",
							//primitiveID: id,
							description: description,
							name: name,
							position: positions,
							color: strokeColor,
							width: strokeWidth,
							isIE: isIE
						};
						var linePrimitive = this.createCorridorPrimitive(gene);
						linePrimitive._defaultColor = strokeColor;
						primitiveArray.push(linePrimitive);
					}
				}

			// ラインストリング-------------------
			}else if(feature.geometry.type == "LineString"){
				var position    = this._getPosition(coord);
				var color       = this._hexToRgb(feature.properties._color);
					color       = new Cesium.Color(color[0]/255, color[1]/255, color[2]/255, feature.properties._opacity);
				var width       = feature.properties._weight;

				var lonlatArray = this._getLonLatArrayForGeojson(coord);
				Array.prototype.push.apply(lonArray, lonlatArray.lon);
				Array.prototype.push.apply(latArray, lonlatArray.lat);

				//zmzm
				var gene = {
					kind: "corridor",
					type: "GeojsonLayer",
					//primitiveID: id,
					description: description,
					name: name,
					position: position,
					color: color,
					width: width,
					isIE: isIE
				};
				var linePrimitive = this.createCorridorPrimitive(gene);
				linePrimitive._defaultColor = color;
				primitiveArray.push(linePrimitive);

			// ポリゴン---------------------------
			}else if(feature.geometry.type == "Polygon"){

				var hierarchy   = new Cesium.PolygonHierarchy(this._getPosition(coord));
				var color       = this._hexToRgb(feature.properties._fillColor);
					color       = new Cesium.Color(color[0]/255, color[1]/255, color[2]/255, feature.properties._fillOpacity);
				var strokeColor = this._hexToRgb(feature.properties._color);
					strokeColor = new Cesium.Color(strokeColor[0]/255, strokeColor[1]/255, strokeColor[2]/255, feature.properties._opacity);
				var strokeWidth = feature.properties._weight;

				var lonlatArray = this._getLonLatArrayForGeojson(coord);
				Array.prototype.push.apply(lonArray, lonlatArray.lon);
				Array.prototype.push.apply(latArray, lonlatArray.lat);

				// 【 IE11 】
				var primitive = null;
				if(isIE){
					// ポリゴンをPrimitiveとして追加する
					var geomInstance = this._getPrimitivePolygon(hierarchy, color, isIE);
					primitive = new Cesium.Primitive({
						geometryInstances : [geomInstance],
						appearance : new Cesium.EllipsoidSurfaceAppearance({
							material : Cesium.Material.fromType("Color", {
								"color" : color
							})
						})
					});
				// 【 IE11以外 】
				}else{
					// ポリゴンをGroundPrimitiveとして追加する
					var geomInstance = this._getPrimitivePolygon(hierarchy, color, isIE);
					primitive = new Cesium.GroundPrimitive({
						geometryInstances : [geomInstance]
					});
				}
				primitive._defaultColor = color;
				primitiveArray.push(primitive);
				
				// 枠線をPrimitiveとして追加する
				var gene = {
					kind: "corridor",
					type: "GeojsonLayer",
					//primitiveID: id,
					description: description,
					name: name,
					position: hierarchy.positions,
					color: strokeColor,
					width: strokeWidth,
					isIE: isIE
				};
				var linePrimitive = this.createCorridorPrimitive(gene);
				linePrimitive._defaultColor = strokeColor;
				primitiveArray.push(linePrimitive);
			}

			// 円・ラインストリング・ポリゴンの場合
			if(primitiveArray.length > 0){
				for(var j=0; j<primitiveArray.length; j++){
					var primitive = primitiveArray[j];
					primitive["description"] = description;
					primitive["name"]        = name;
					viewer.scene.primitives.add(primitive);
					primitive.show =this._visible;
					this._primitives.push( primitive );
				}
			}
			
		}
		
		if ( GSI.GLOBALS.layerTreeDialog._userControlStarted )
		{
			/*
			// ズーム
			var west  = Math.min.apply(null, lonArray);
			var east  = Math.max.apply(null, lonArray);
			var south = Math.min.apply(null, latArray);
			var north = Math.max.apply(null, latArray);
			west  = west-(east-west)/3;
			east  = east+(east-west)/3;
			south  = south-(north-south)/3;
			north  = north+(north-south)/3;
			viewer.camera.flyTo({
				destination : new Cesium.Rectangle.fromDegrees(west, south, east, north),
				duration :1,
				complete: function(){
					GLOBE.MAP.adjustFly();
				}
			});
			*/
		}
	},
	
	_getEntityDescription : function (prop){
		var str = "";
		
		// テーブル記述の場合
		if(prop.description == undefined){
			for(var key in prop){
				if ( key.charAt(0) == "_" ) continue;
				if ( key == "name" ) continue;
				if ( key.match(/^(iframe|description)$/) )
				{
					str += '<tr><td colspan="2">' + prop[key] + '</td></tr>';
				}
				else
				{
					str += '<tr><td>' + key + '</td><td>' + prop[key] + '</td></tr>';
				}
			}
			str = "<table>" + str + "</table>";
		// 自由記述の場合
		}else{
			str = prop.description
		}

		// TEXTの場合はhtmlもいれる
		if(prop._html){
			//str += "<br>" + prop._html;
		}

		return str;
	},

	/*
	 * Cartesian3の配列を返す
	 */
	_getPosition : function(coord){
		var arr = [];

		for(var i=0; i<coord.length; i++){
			if(Array.isArray(coord[i][0])){
				for(var j=0; j<coord[i].length; j++){
					arr.push(coord[i][j][0]);
					arr.push(coord[i][j][1]);
				}
			}else{
				arr.push(coord[i][0]);
				arr.push(coord[i][1]);
			}
		}

		return Cesium.Cartesian3.fromDegreesArray(arr);
		},

	/*
	 * ポイント(円)のCartesian3の配列を返す
	 */
	_getCirclePosition : function (position, radius){
		var array = [];

		// 円の各ポイントの緯度経度を取得
		var r = Cesium.EllipseGeometryLibrary.computeEllipsePositions({
			semiMajorAxis: radius,
			semiMinorAxis: radius,
			rotation: 0,
			center: position,
			granularity : 0.02  // make this number larger to get fewer positions
		}, false, true);

		var positions = r.outerPositions;
		for (var i=0; i<positions.length; i+=3) {
			var cart = new Cesium.Cartesian3(positions[i], positions[i+1], positions[i+2]);
			array.push(cart);
		}

		// つなげる
		array.push(array[0]);

		return array;
	},

	/*
	 * 緯度の配列・経度の配列を返す【GeoJSON用】
	 */
	_getLonLatArrayForGeojson : function (coord){
		var lonArray = [];
		var latArray = [];

		for(var i=0; i<coord.length; i++){
			if(Array.isArray(coord[i][0])){
				for(var j=0; j<coord[i].length; j++){
					lonArray.push(coord[i][j][0]);
					latArray.push(coord[i][j][1]);
				}
			}else{
				lonArray.push(coord[i][0]);
				latArray.push(coord[i][1]);
			}
		}

		var res = {
			"lon" : lonArray,
			"lat" : latArray
		}
		return res;
	},



	/*
	 * カラーコードからRGBに変換
	 */
	_hexToRgb : function (hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		var r = parseInt(result[1], 16);
		var g = parseInt(result[2], 16);
		var b = parseInt(result[3], 16);

		return [r, g, b];
	},
	_onLoadError : function(text)
	{
		
	}
	
} );

/************************************************************************
 L.Class
 - GSI.OnOffSwitch
 ************************************************************************/
GSI.OnOffSwitch = MA.Class.extend( {
	includes: MA.Mixin.Events,
	options : {
		className : "filetext",
		checked:true
	},
	classNames : {
		"onoff":"gsi_onoffswitch",
		"filetext":"gsi_onoffswitch_file_text",
		"visible":"gsi_onoffswitch_visible",
		"visibleall":"gsi_onoffswitch_visible_all",
		"usecocotile":"gsi_onoffswitch_usecocotile"

	},
	initialize : function (options)
	{
		options = MA.setOptions(this, options);

		this._create();
	},
	getElement : function()
	{
		return this.frame;
	},
	getCheckBox : function()
	{
		return this.input;
	},
	getId : function()
	{
		return this.id;
	},
	_create : function()
	{
		var id = 'GSI_OnOffSwitch_' + GSI.Utils.getCurrentID();
		this.id = id;

		this.frame = $("<span>").addClass( this.classNames[ this.options.className ] );
		this.input = $( '<input>' ).attr( {
				'type' : 'checkbox',
				'id' : id
			} ).addClass( 'checkbox' );
		this.frame.append(this.input);
		if ( this.options.checked )
		{
			this.input.attr({"checked": true} );
		}

		var label = $( '<label>' ).addClass( 'label' ).attr( {
				'for' : id
			} );

		var span = $( '<span>' ).addClass( 'inner' );
		label.append( span );

		span = $( '<span>' ).addClass( 'switch' );
		label.append( span );

		this.frame.append( label );

		if ( GSI.Utils.Browser.ie && GSI.Utils.Browser.version <= 8 )
		{
			this._initCheckBoxIE8();
			this.frame.click( MA.bind( this.onFrameClick, this  ) );
		}
		else
		{
			this.input.click( MA.bind( function(){this.fire( 'change' );}, this  ) );
		}
	},
	_initCheckBoxIE8 : function()
	{
		if ( this.input.is( ":checked" ) )
		{
			this.frame.find( '.label,.inner' ).addClass("on_label_inner");
			this.frame.find( '.label,.switch' ).addClass("on_label_switch");
		}
		else
		{
			this.frame.find( '.label,.inner' ).removeClass("on_label_inner");
			this.frame.find( '.label,.switch' ).removeClass("on_label_switch");
		}
	},
	onFrameClick : function()
	{
		this.input.attr({"checked": !this.input.is( ":checked" )} );
		this._initCheckBoxIE8();
		this.fire( 'change' );
	},
	checked : function( value)
	{
		if ( value == true )
		{
			this.input.attr( {"checked": true} );
			this.input.prop( {"checked": true} );
		}
		else if ( value == false )
		{
			this.input.attr( {"checked": false} );
			this.input.prop( {"checked": false} );
		}
		
		if ( GSI.Utils.Browser.ie && GSI.Utils.Browser.version <= 8 )
		{
			this._initCheckBoxIE8();
		}
		
		return this.input.is( ':checked' );
	}
});













/************************************************************************
 - GLOBE.VectorTileLayer
 ************************************************************************/
GLOBE.VectorTileLayer = MA.Class.extend( {

	options : {
		
	},
	_visible : true,
	_map : null,
	_styleLoaded : false,
	_singleTileId : null,
	
	initialize : function(map,options)
	{
		this._visible = true;
		this._map = map;
		options = MA.setOptions(this, options);
		this._styleLoad();
		GLOBE.VectorTileLayer._add( map, this );
	},
	
	_styleLoad : function()
	{
		var styleUrl =this.options.styleurl;
		
		if ( styleUrl && styleUrl != '' )
			styleUrl = styleUrl;
		else
			styleUrl = this.options.url.replace(/\/\{z\}.*/,"") + '/style.js';
		
		var data = null;
		
		this._styleLoading = true;
		this._styleAjax = $.ajax({
			type: "GET",
			dataType: "text",
			url: MATEST.proxyUrl(styleUrl),
			data :data,
			success:  MA.Util.bind( this._onStyleLoad, this ),
			error :  MA.Util.bind( this._defaultLoadStyle, this ),
			async : true

		});
	},
	
	_defaultLoadStyle : function()
	{
		var styleUrl = './js/style.js';

		this._styleAjax = $.ajax({
			type: "GET",
			dataType: "text",
			url: styleUrl,
			success:  MA.Util.bind( this._onStyleLoad, this ),
			error :  MA.Util.bind( function(){
				this._styleLoading = false;
				this._styleLoaded = true;
				this._load();
			}, this ),
			async : true
		});
	},
	
	_onStyleLoad : function(result)
	{
		try
		{
			var data = null;
			if ( !result) return;
			if ( result.data )
			{
				data = result.data;
			}
			else data = result;
			if ( !GSI.GLOBALS.map ) GSI.GLOBALS.map = {};
			GSI.GLOBALS.map.getZoom = function() {
				return 15;
			};
			data = eval( "(" + data + ")" );
			
			
			this.options = $.extend( {}, this.options, data.options );
			
			if ( data.geojsonOptions ) this.geojsonOptions =  data.geojsonOptions;
			for ( var i=0; i<this._tiles.length; i++ ) 
			{
				var tile = this._tiles[i];
				if ( !tile.geoJSON ) continue;
				for( var j=0; j<tile.geoJSON.length; j++ )
				{
					tile.geoJSON[i].options = this.geojsonOptions;
				}
			}
			
		}
		catch( e ){}
		
		
		this._styleLoading = false;
		this._styleLoaded = true;
		this._load();
	},
	
	getZoomLevel : function()
	{
        var tilesToRender = this._map.viewer.scene.globe._surface._tilesToRender;
	},
	
	_load : function()
	{
		this.options.proxy = {
                        getURL : function(url) {
                            return MATEST.proxyUrl(url);
                        }
                    };
		this.options.viewer = this._map.viewer;
		this.options.geojsonOptions = this.geojsonOptions;
		this.options.drawPoint = MA.bind( this._onDrawPoint, this  );
		this._provider = new Cesium.JapanGSIVectorTileProvider(this.options);
		
		this._layer = this._map.viewer.imageryLayers.addImageryProvider(
			this._provider
		);
		this._layer.show = this._visible;
		
	},
	
	_featureToDescription : function( feature )
	{
		if ( this.geojsonOptions  )
		{
			try
			{
				var layer = {
					bindPopup : function(s)
					{
						this.description = s;
					},
					setIcon : function(ic)
					{
						if (!this.options)
						{
							this.options = {};
						}
						this.options.icon = ic;
					}
				};
				this.geojsonOptions.onEachFeature( feature, layer );
				return layer.description;
			}
			catch( e){
				return "";
			}
		}
		if ( !feature.properties ) return null;
		var result = "";
		var trArr = [];
		for( var key in feature.properties )
		{
			if ( key.charAt( 0 ) == "_" || key == "name" ) continue;
			
			var tr = $("<tr>");
			
			if ( key.match(/^(name|description|iframe)$/) )
			{
				$("<td>").attr("colspan", 2).html(feature.properties[key]).appendTo(tr);
			}
			else
			{
				$("<td>").html(key).appendTo(tr);
				$("<td>").html(feature.properties[key]).appendTo(tr);
			}
			trArr.push( tr );
		}
		
		if ( trArr.length > 0 )
		{
			var table = $("<table>");
			var tbody = $("<tbody>");
			
			for( var i=0; i<trArr.length; i++ )
			{
				tbody.append( trArr[i] );
			}
			
			table.append(tbody);
			var div = $("<div>").append(table);
			
			result =div.html();
		}
		
		return result;
	},
	_remove : function()
	{
		GLOBE.VectorTileLayer._remove( this );
		if ( !this._layer ) return;
		this._map.viewer.imageryLayers.remove(this._layer, true);
		this._map.viewer.scene.primitives.remove( this._bollboardCollection );
		this._map.viewer.scene.primitives.remove( this._polylineCollection );
		this._map.viewer.scene.primitives.remove( this._corridorCollection );
		
		if ( this._singleImageryLayerId )
		{
			GLOBE.MAP.removeSingleImageryLayer(this._singleImageryLayerId);
		}
		
		this._provider = null;
		this._layer = null;
		this._bollboardCollection = null;
		this._polylineCollection  = null;
		this._corridorCollection  = null;
		this._singleImageryLayerId = null;
	},
	setAlpha : function(alpha)
	{
		if ( !this._layer ) return;
		
		if ( this._bollboardCollection )
		{
			for(var j=0; j<this._bollboardCollection.length; j++){
				var billboard = this._bollboardCollection.get(j);
				var color = billboard._color;
				if ( CONFIG.TILEASICON_ENABLED && billboard._tileAsIcon && alpha != 0)
				{
					billboard.color = new Cesium.Color(color.red, color.green, color.blue, CONFIG.TILEASICON_ICONALPHA);
				}
				else
				{
					billboard.color = new Cesium.Color(color.red, color.green, color.blue, alpha);
				}
			}
		}
		
		if ( this._polylineCollection )
		{
			for(var j=0; j<this._polylineCollection.length; j++){
				//var color = this._polylineCollection.get(j)._color;
				//this._polylineCollection.get(j).color = new Cesium.Color(color.red, color.green, color.blue, alpha);
			}
		}
		
		if ( this._corridorCollection )
		{
			for(var j=0; j<this._corridorCollection.length; j++){
				var attr = this._corridorCollection.get(j).getGeometryInstanceAttributes("color");
				if ( attr )
				{
					var color = this._corridorCollection.get(j)._color;
					color.alpha = alpha;
					attr.color = Cesium.ColorGeometryInstanceAttribute.toValue(
						new Cesium.Color( color.red, color.green, color.blue, alpha )
					);
				}
			}
		}
		
		if ( this._singleImageryLayerId )
		{
			GLOBE.MAP.alphaSingleImageryLayer(this._singleImageryLayerId, alpha);
		}
		
		this._layer.alpha = alpha;
	},
	_setVisible : function( viewer, visible )
	{
		this._visible = visible;
		
		var zoom = this._map.getCurrentZoom();
		var isVisible = (( this.options.minZoom ? this.options.minZoom : 0 ) <= zoom );
		
		if ( !this._visible ) isVisible= false;
		if ( !this._layer ) return;
		
		if ( this._bollboardCollection )
		{
			for(var j=0; j<this._bollboardCollection.length; j++){
				var color = this._bollboardCollection.get(j)._color;
				this._bollboardCollection.get(j).show = isVisible;
			}
		}
		
		if ( this._polylineCollection )
		{
			for(var j=0; j<this._polylineCollection.length; j++){
				this._polylineCollection.get(j).show = isVisible;
			}
		}
		
		if ( this._corridorCollection )
		{
			for(var j=0; j<this._corridorCollection.length; j++){
				this._corridorCollection.get(j).show = isVisible;
			}
		}
		
		if ( this._singleImageryLayerId )
		{
			GLOBE.MAP.showSingleImageryLayer(this._singleImageryLayerId, visible);
		}
		
		this._layer.show = this._visible;
	},
	
	
	_onDrawPoint : function(feature, info, tileBounds)
	{
		if( !this._bollboardCollection )
		{
			this._bollboardCollection = new Cesium.BillboardCollection({
				 scene : this._map.viewer.scene
			});
				//this._viewer.scene.primitives.add(LabelCollection);
			this._map.viewer.scene.primitives.add(this._bollboardCollection);
		}
		
		if ( !this._polylineCollection )
		{
			this._polylineCollection = new Cesium.PolylineCollection();
			this._map.viewer.scene.primitives.add(this._polylineCollection);
		}
		
		if ( !this._corridorCollection )
		{
			this._corridorCollection = new Cesium.PrimitiveCollection();
			this._map.viewer.scene.primitives.add(this._corridorCollection);
		}
		
		if( feature.geometry && feature.geometry.coordinates && feature.geometry.coordinates.length >=2 )
		{
			var latLng = {
				lat:feature.geometry.coordinates[1],
				lng:feature.geometry.coordinates[0]
			};
			var layer= null;
			
			if ( !GSI.GLOBALS.map ) GSI.GLOBALS.map = {};
			GSI.GLOBALS.map._z = info.z;
			GSI.GLOBALS.map.getZoom = function() {
				return this._z;
			};
			
			if ( info.geojsonOptions && info.geojsonOptions.pointToLayer )
				layer = info.geojsonOptions.pointToLayer( feature, latLng );
			
			if ( layer && layer._layers )
			{
				for( var i=0; i<layer._layers.length; i++ )
					this._drawPoint( feature, info, tileBounds, layer._layers[i], latLng );
			}else
				this._drawPoint( feature, info, tileBounds, layer, latLng );
		}
		
	},
	
	_drawPoint : function( feature, info, tileBounds, layer, latLng )
	{
	
		var size = {
			w : 12,
			h : 12
		};
		
		var style = {
			stroke : true,
			weight : 2,
			opacity : 0.5,
			color: '#0033ff',
			fill : true,
			fillColor:'#0033ff',
			fillOpacity : 0.1
		};
		
		for( var key in feature.properties )
		{
			if ( key.charAt(0) == "_" )
			{
				style[key.substr(1)] = feature.properties[key];
			}
		}
		
		
		var description = "test";
		
		var zoom = this._map.getCurrentZoom();
		var isVisible = (( this.options.minZoom ? this.options.minZoom : 0 ) <= zoom );
		
		if ( !this._visible ) isVisible= false;
		var canLoadMarker = false;
		
		if ( layer )
		{
			if ( ( layer instanceof L.CircleMarker ) )
			{
				size.h = ( layer._radius ? layer._radius : 3 );
				size.w = size.h;
				this._defaultIconToBillboardCollection( isVisible, latLng, size, style,feature );
				canLoadMarker = true;
			}
			else if ( layer instanceof L.Rectangle  )
			{
				var rect = Cesium.Rectangle.fromDegrees(
					layer._bounds._latlngs[0][1], layer._bounds._latlngs[0][0], 
					layer._bounds._latlngs[1][1], layer._bounds._latlngs[1][0]);
				var material = Cesium.Material.fromType('Color');
				var color = Cesium.Color.fromCssColorString(layer.options.color);
				color.alpha = layer.options.opacity;
				material.uniforms.color = color;//new Cesium.Color(1.0, 1.0, 0.0, style.opacity);
				
				// Corridorで実装
				var primitive = this.createCorridorPrimitive(layer, color, isVisible);
				this._corridorCollection.add(primitive);
				
				
				/*
				// Polylineで実装
				this._polylineCollection.add({
					positions : Cesium.Cartesian3.fromDegreesArray([
					layer._bounds._latlngs[0][1], layer._bounds._latlngs[0][0],
					layer._bounds._latlngs[1][1], layer._bounds._latlngs[0][0],
					layer._bounds._latlngs[1][1], layer._bounds._latlngs[1][0],
					layer._bounds._latlngs[0][1], layer._bounds._latlngs[1][0],
					layer._bounds._latlngs[0][1], layer._bounds._latlngs[0][0]] ),
					width : layer.options.weight,
					material : material,
					_color : color
				});
				*/
				
				
				
				//this._divtIconToBillboardCollection( isVisible, latLng, layer, style,feature );
				/*
				this._map.viewer.scene.groundPrimitives.add(new Cesium.GroundPrimitive({
					geometryInstances : new Cesium.GeometryInstance({
						geometry : new Cesium.RectangleGeometry({
							rectangle : rect
						}),
						attributes: {
							color: Cesium.ColorGeometryInstanceAttribute.fromColor(
								new Cesium.Color(1.0, 1.0, 0.0, 0.5)
							)
						}
					}),
					asynchronous : false
				}));
				*/
				canLoadMarker = true;
				
			}
			
			else if ( ( layer instanceof L.Marker ) && ( layer.options.icon instanceof L.DivIcon ) )
			{
				this._divtIconToBillboardCollection( isVisible, latLng, layer, style,feature );
				canLoadMarker = true;
			}
			else if ( ( layer instanceof L.Marker ) && ( layer.options.icon instanceof L.Icon ) )
			//else if ( layer.options && layer.options.icon)
			{
				var iconOptions =  layer.options.icon.options;
					
				if ( iconOptions.iconUrl && iconOptions.iconUrl != "")
				{
					if ( iconOptions.iconSize )
					{
						size.w = iconOptions.iconSize[0];
						size.h = iconOptions.iconSize[1];
						style.radius = size.w / 2;
					}
					
				
					var img = new Image();
					img.crossOrigin = "anonymous"
					img.width = size.w;
					img.height = size.h;
					img._this = this;
					img._size = size;
					img._style = style;
					img._latLng = latLng;
					img.onload = function() {
						this._this._imageToBillboardCollection( isVisible, this._latLng, this, this._size, feature );
					};
					
					img.onerror= function() {
						this._this._defaultIconToBillboardCollection( isVisible, this._latLng, this._size, feature );
					};
					img.src = GSI.Utils.convertIconURL(iconOptions.iconUrl);
					
					canLoadMarker = true;
				}
				else if ( iconOptions.html && iconOptions.html != '' )
				{
					var div = $( iconOptions.html ).css( {"position":"absolute", "visibility":"hidden"} );
					$( "body" ).append( div);
					if ( $.trim( div.text() ) == "" )
					{
						// 図形
						size.w = div.outerWidth();
						size.h = div.outerHeight();
						
						var fillColor = div.css("background-color");
						
						if ( !fillColor )
						{
							fillColor = div.css("background");
						}
						var canvasColor = this._styleColor2CanvasColor( fillColor, style.color );
						style.color = canvasColor.color;
						style.opacity = canvasColor.opacity;
						
						var radius = div.css("border-radius");
					}
					else
					{
						
					}
					div.remove();
				}
				
			}
			
		}
		else
		{
			if ( feature.properties && feature.properties._iconUrl )
			{
				if ( feature.properties._iconSize )
				{
					size.w = feature.properties._iconSize[0];
					size.h = feature.properties._iconSize[1];
					style.radius = size.w / 2;
				}
				
				
				var img = new Image();
				img.crossOrigin = "anonymous"
				img.width = size.w;
				img.height = size.h;
				img._this = this;
				img._size = size;
				img._style = style;
				img._latLng = latLng;
				img.onload = function() {
					this._this._imageToBillboardCollection( isVisible, this._latLng, this, this._size, feature );
				};
				
				img.onerror= function() {
					this._this._defaultIconToBillboardCollection( isVisible, this._latLng, this._size, this._style, feature );
				};
				img.src = GSI.Utils.convertIconURL(feature.properties._iconUrl);
				
				canLoadMarker = true;
			}
			
		}
		
		if ( !canLoadMarker )
		{
			this._defaultIconToBillboardCollection( isVisible, latLng, size, style,feature );
			
		}
		
	},
	
	createCorridorPrimitive : function( data, color, show )
	{
		//_corridorCollection
		var visible = (show ? true : false);
		var latLng = GLOBE.MAP.getCameraPosition();
		var width = (data.options.weight ? data.options.weight * latLng[2] / 600 : 0);
		
		var primitive = new Cesium.GroundPrimitive({
			geometryInstances : [
				new Cesium.GeometryInstance({
					geometry : new Cesium.CorridorGeometry({
						positions : Cesium.Cartesian3.fromDegreesArray([
							data._bounds._latlngs[0][1], data._bounds._latlngs[0][0],
							data._bounds._latlngs[1][1], data._bounds._latlngs[0][0],
							data._bounds._latlngs[1][1], data._bounds._latlngs[1][0],
							data._bounds._latlngs[0][1], data._bounds._latlngs[1][0],
							data._bounds._latlngs[0][1], data._bounds._latlngs[0][0]] ),
						width : width
					}),
					attributes : {
						color : Cesium.ColorGeometryInstanceAttribute.fromColor(color)
					},
					id: "color"
				})
			]
		});
		primitive._color = color;
		primitive._data = data;
		primitive.show = visible;
		return primitive;
	},
	
	_styleColor2CanvasColor : function( src, defaultColor )
	{
		var reg = /rgba.*\((.+?)\)/g;
		var match = reg.exec(src);
		var opacity = 1;
		var color = defaultColor;
		if ( !src ) return {
			color :color,
			opacity : opacity
		};
		if ( match )
		{
			var s = RegExp.$1;
			
			var parts = s.split( "," );
			
			if ( parts.length >3 )
			{
				var r = parseInt( $.trim(parts[0]) );
				var g = parseInt( $.trim(parts[1]) );
				var b = parseInt( $.trim(parts[2]) );
				if ( parts.length >=4 )
					opacity = parseFloat( $.trim(parts[3]) );
				color = "#" + ( '00'  + r.toString(16) ).slice( -2 ) +
						( '00'  + g.toString(16) ).slice( -2 ) +
						( '00'  + b.toString(16) ).slice( -2 );
			}
		}
		else
		{
			color = src;
		}
		return {
			color :color,
			opacity : opacity
		};
	},
	
	_defaultIconToBillboardCollection : function( isVisible, latLng, size, style,feature )
	{
		if ( !this._bollboardCollection ) return;
		
		size.w += (style.weight ? style.weight * 2 : 0);
		size.h += (style.weight ? style.weight * 2 : 0);
		
		var canvas = document.createElement("canvas");
		canvas.width = size.w + (style.weight ? style.weight : 0);
		canvas.height = size.h + (style.weight ? style.weight : 0);
		var radius = 0;
		var ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.arc(canvas.width/2, canvas.height/2, size.w/2, 0, Math.PI*2, false);
		//ctx.arc(radius, radius, radius, - Math.PI, - 0.5 * Math.PI, false);
		//ctx.arc(size.w - radius, radius, radius, - 0.5 * Math.PI, 0, false);
		//ctx.arc(size.w - radius, size.h - radius, radius, 0, 0.5 * Math.PI, false);
		//ctx.arc(radius, size.h - radius, radius, 0.5 * Math.PI, Math.PI, false);

		ctx.save();
		if ( style.stroke )
		{
			if ( style.weight )
				ctx.lineWidth = style.weight;
			if ( style.color )
				ctx.strokeStyle = style.color;
			if ( style.opacity || style.opacity == 0.0 )
				ctx.globalAlpha = style.opacity;
			else
				ctx.globalAlpha = 1;
			ctx.stroke();
		}
		if ( style.fill )
		{
			if ( style.fillColor )
				ctx.fillStyle=style.fillColor;
			if ( style.fillOpacity || style.fillOpacity == 0.0 )
				ctx.globalAlpha = style.fillOpacity;
			else
				ctx.globalAlpha = 1;
			ctx.fill();
		}
		ctx.restore();
		var icon = this._bollboardCollection.add({
			position : Cesium.Cartesian3.fromDegrees(latLng.lng, latLng.lat, 0),
		    image : canvas.toDataURL(),
			heightReference : Cesium.HeightReference.CLAMP_TO_GROUND,
			horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
		    //scaleByDistance : new Cesium.NearFarScalar(1.0e2, 1.5, 1.0e5, 0.0),
		    translucencyByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.0),
			verticalOrigin : Cesium.VerticalOrigin.CENTER
			
		});
		icon._feature = feature;
		icon._ownerLayer = this;
		icon.show = isVisible;
	},
	
	_measureText : function( text, font )
	{
		var ctx = null;
		if ( !this._textMeasureCanvas )
		{
			this._textMeasureCanvas = document.createElement("canvas");
			this._textMeasureCanvas.width = 100;
			this._textMeasureCanvas.height = 100;
			ctx = this._textMeasureCanvas.getContext('2d');
		}
		else
		{
			ctx = this._textMeasureCanvas.getContext('2d');
			//this._textMeasureCanvas
			ctx.clearRect(0, 0, 100, 100);
		}
		
		ctx.font = font;
		ctx.fillStyle  = "rgb(0, 0, 0)";
		var result = {
			w:ctx.measureText( text).width, h:0
		};
		
		ctx.textAligin  = 'left';
		ctx.textBaseline  = 'top';
		ctx.fillText( text, 0, 0);
		
		var pixels = ctx.getImageData(0, 0, 100, 100);
		var data = pixels.data;
		var currentRow = -1;
		for (var i = 0, len = data.length; i < len; i += 4) {
		  var r = data[i], g = data[i+1], b = data[i+2], alpha = data[i+3];
		  if (alpha > 0) {
		    var row = Math.floor((i / 4) / 100);
		    if (row > currentRow) {
		      currentRow = row;
		      result.h++;
		    }
		  }
		}
		result.w += 2;
		result.h += 2;
		return result;
	},
	
	_divtIconToBillboardCollection : function( isVisible, latLng, layer, style,feature )
	{
		if ( !this._bollboardCollection ) return;
		var canvas = document.createElement("canvas");
		
		
		
		var html = layer.options.icon.options.html;
		var radius = 0;
		var element = $( "<div>" ).html( html );
		element = ( element.children().length > 0 ? $(element.children()[0]) : element );
		
		var text = $.trim(element.text());
		var background = null;
		var color = 'rgb(0, 0, 0)';
		var fontSize = "9.5pt";
		var fontFamily = 'メイリオ';
		var size = {w : 5, h : 5};
		var opacity = 1.0;
		var fontWeight = "";
		var margin = {
			left:0,
			top:0
		};
		var horizontalOrigin = Cesium.HorizontalOrigin.CENTER  ;
		var verticalOrigin = Cesium.VerticalOrigin.CENTER ;
		
		
		if ( element.css( "width" ) || element.css( "width" ) == 0 )
			size.w = parseInt(element.css( "width" ));
		if ( element.css( "height" ) || element.css( "height" ) == 0 )
			size.h = parseInt( element.css( "height" ) );
		if ( element.css( "border-radius" ) )
			radius = parseInt( element.css( "border-radius" ) );
		
		if ( element.css( "background-color" ) )
			background = element.css( "background-color" ) ;
		
		if ( !background && element.css( "background" ) )
			background =  element.css( "background" );
		
		if ( background )
			background = this._styleColor2CanvasColor( background );
		
		if ( element.css( "opacity" ) || element.css( "opacity" ) == 0 )
			opacity = parseInt(element.css( "opacity" ) );
		
		if ( element.css( "color" ) )
			color = this._styleColor2CanvasColor( element.css( "color" ), color );
		if ( element.css( "font-size" ) )
			fontSize = element.css( "font-size" );
		
		if ( element.css( "font-weight" ) )
			fontWeight = element.css( "font-weight" );
		fontSize = ( parseInt( fontSize ) * 1.5 ) + "px"
		
		
		var textShadow = element.css("text-shadow") || element.css("-ms-text-shadow") || '';
		if ( textShadow )
		{
			var matches = textShadow.match(/(rgb\([\d\s,]+\))/);
			if ( matches )textShadow = matches[1];
			else {
				matches = textShadow.match(/(#[a-f|A-F|\d]+)/);
				if ( matches )textShadow = matches[1];
				else textShadow = '';
			};
		}
		else textShadow = '';
		
		if ( size.w <= 0 ) size.w = 3;
		if ( size.h <= 0 ) size.h = 3;
		if ( text == "" )
		{
			canvas.width = size.w;
			canvas.height = size.h;
			var ctx = canvas.getContext('2d');
			ctx.beginPath();
			
			if ( radius > 0 )
			{
				if ( radius >= size.w /2 )
				{
					ctx.arc(size.w/2, size.h/2, size.w/2, 0, Math.PI*2, false);
				}
				else
				{
					ctx.arc(radius, radius, radius, - Math.PI, - 0.5 * Math.PI, false);
					ctx.arc(size.w - radius, radius, radius, - 0.5 * Math.PI, 0, false);
					ctx.arc(size.w - radius, size.h - radius, radius, 0, 0.5 * Math.PI, false);
					ctx.arc(radius, size.h - radius, radius, 0.5 * Math.PI, Math.PI, false);
				}
			}
			ctx.save();
			if ( background )
			{
				ctx.fillStyle=background.color;
				if ( background.opacity|| background.opacity == 0.0 )
				{
					ctx.globalAlpha = background.opacity * ( opacity|| opacity == 0.0 ? opacity : 1) ;
				}
				else
					ctx.globalAlpha = ( opacity|| opacity == 0.0 ? opacity : 1) ;
			}
			else
			{
				if ( opacity|| opacity == 0.0 )
				{
					ctx.globalAlpha = opacity;
				}
				else
					ctx.globalAlpha = 1;
			}
			ctx.fill();
			ctx.restore();
			ctx.fillStyle="blue";
			
		}
		else
		{
			
			//ctx.fillStyle = "red";
			//ctx.fillText("赤色でfillText", 10, 75);
			
			var font = ( fontWeight != "" ? fontWeight +" " : "") +fontSize +" '" + fontFamily +"'";
			
			var textSize = this._measureText(text, font);
			
			var ctx = canvas.getContext('2d');
			ctx.clearRect(0,0, canvas.width, canvas.height );
			ctx.beginPath();
			
			size.w = textSize.w+(radius ? radius : 2 );
			size.h = textSize.h+(radius ? radius : 4 );
			canvas.width = size.w;
			canvas.height = size.h ;
			
			ctx.font = font;
			
			if ( background )
			{
				ctx.save();
				if ( background )
					ctx.fillStyle=background;
				if ( opacity|| opacity == 0.0 )
					ctx.globalAlpha = opacity;
				else
					ctx.globalAlpha = 1;
				ctx.fill();
				ctx.restore();
			}
			
			//ctx.fillStyle="red";
			//ctx.fillRect( 0, 0, size.w, size.h );
			
			ctx.textAlign  = 'center';
			ctx.textBaseline  = 'middle';
			if ( textShadow && textShadow != '' )
			{
				ctx.lineWidth  = 4;
				ctx.strokeStyle = textShadow;
				ctx.strokeText(text, size.w/2, size.h/2 );
			}
			
			ctx.fillStyle= ( color.color ? color.color : color );
			ctx.fillText( text, size.w/2, size.h/2 );
			
			
			
			
			if ( layer.options.icon.options.iconAnchor && layer.options.icon.options.iconAnchor.length >= 2 )
			{
				var anchor = {
					left : size.w/2,
					top : size.h/2
				};
				
				margin.left = anchor.left - parseInt(layer.options.icon.options.iconAnchor[0]);
				margin.top = anchor.top - parseInt(layer.options.icon.options.iconAnchor[1]);
			}
		}
		
		
		
		var icon = this._bollboardCollection.add({
			position : Cesium.Cartesian3.fromDegrees(latLng.lng, latLng.lat, 0),
		    image : canvas.toDataURL(),
			heightReference : Cesium.HeightReference.CLAMP_TO_GROUND,
			horizontalOrigin : horizontalOrigin,
			verticalOrigin : verticalOrigin,
			pixelOffset  : new Cesium.Cartesian2( margin.left, margin.top ),
		    //scaleByDistance : new Cesium.NearFarScalar(1.0e2, 1.5, 1.0e5, 0.0),
		    translucencyByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.0)
			
		});
		icon.horizontalOrigin = horizontalOrigin;
		icon.verticalOrigin = verticalOrigin;
		icon._feature = feature;
		icon._ownerLayer = this;
		icon._originalLayer = layer;
		
		icon.show = isVisible;
	},
	
	_imageToBillboardCollection : function( isVisible, latLng, img,size, feature )
	{
		if ( !this._bollboardCollection ) return;
		var canvas = document.createElement("canvas");
		canvas.width = size.w;
		canvas.height = size.h;
		
		
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0,0, size.w, size.h );
		
		
		var position = Cesium.Cartesian3.fromDegrees(latLng.lng, latLng.lat, 0);
		var imageURL = canvas.toDataURL();
		
		
		this._singleImageryLayerId = ( this._singleImageryLayerId ? this._singleImageryLayerId : GLOBE.MAP.getNewId() );
		GLOBE.MAP.addSingleImageryLayer(this._singleImageryLayerId, feature.name, position, imageURL);
		
		
		var image = this._bollboardCollection.add({
			position : position,
		    image : imageURL,
			heightReference : Cesium.HeightReference.CLAMP_TO_GROUND,
			horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
		    //scaleByDistance : new Cesium.NearFarScalar(1.0e2, 1.5, 1.0e5, 0.0),
		    translucencyByDistance : new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.0),
			verticalOrigin : Cesium.VerticalOrigin.CENTER,
			color : new Cesium.Color(1.0, 1.0, 1.0, CONFIG.TILEASICON_ENABLED ? CONFIG.TILEASICON_ICONALPHA : 1)
		});
		image._tileAsIcon = true;
		image._feature = feature;
		image._ownerLayer = this;
		image.show = isVisible;
	}
	
} );





GLOBE.VectorTileLayer._remove = function(layer)
{
	clearTimeout(layer._clearTimeout);
	
	if ( !GLOBE.VectorTileLayer._layers  )
		GLOBE.VectorTileLayer._layers = [];
	
	for( var i=0; i<GLOBE.VectorTileLayer._layers.length; i++ )
	{
		if ( GLOBE.VectorTileLayer._layers[i] == layer )
		{
			GLOBE.VectorTileLayer._layers.splice(i,1);
			break;
		}
	}
	
	
	if ( GLOBE.VectorTileLayer._layers.length <= 0 && GLOBE.VectorTileLayer._mouseEventHandler )
	{
		GLOBE.VectorTileLayer._mouseEventHandler.destroy();
		GLOBE.VectorTileLayer._mouseEventHandler = null;
	}
	
	if ( GLOBE.VectorTileLayer._layers.length <= 0 && GLOBE.VectorTileLayer._moveEventHandler )
	{
		this._map.viewer.camera.moveEnd.removeEventListener(GLOBE.VectorTileLayer._moveEventHandler);
		GLOBE.VectorTileLayer._moveEventHandler = null;
	}
	
	
};

GLOBE.VectorTileLayer._add = function(map, layer)
{
	GLOBE.VectorTileLayer._map = map;
	if ( !GLOBE.VectorTileLayer._layers ) 
		GLOBE.VectorTileLayer._layers = [];
	GLOBE.VectorTileLayer._layers.push( layer );
	
	if ( !GLOBE.VectorTileLayer._moveEventHandler )
	{
		GLOBE.VectorTileLayer._moveEventHandler = function() {
			var zoom = GLOBE.VectorTileLayer._map.getCurrentZoom();
			var beforeHeight = (layer._beforeHeight ? layer._beforeHeight : 0);
			var latLng = GLOBE.MAP.getCameraPosition();
			
			for ( var layerNo = GLOBE.VectorTileLayer._layers.length-1; layerNo>=0; layerNo-- )
			{
				layer = GLOBE.VectorTileLayer._layers[layerNo];
				if ( !layer || !layer._visible ) continue;
				var minZoom = ( layer.options.minZoom ? layer.options.minZoom : 0 );
				
				if ( layer._bollboardCollection )
				{
					for( var i=0; i<layer._bollboardCollection.length; i++ )
					{
						layer._bollboardCollection.get(i).show = ( zoom >= minZoom );
					}
				}
				if ( layer._polylineCollection )
				{
					for( var i=0; i<layer._polylineCollection.length; i++ )
					{
						layer._polylineCollection.get(i).show = ( zoom >= minZoom );
					}
				}
				if ( layer._corridorCollection )
				{
					for( var i=0; i<layer._corridorCollection.length; i++ )
					{
						layer._corridorCollection.get(i).show = ( zoom >= minZoom );
					}
					
					// corridor再描画
					if ( Math.abs(beforeHeight - latLng[2]) > beforeHeight * 0.1 )
					{
						var removeList = [];
						var addList = [];
						
						for( var i=0; i<layer._corridorCollection.length; i++ )
						{
							var primitive = layer._corridorCollection.get(i);
							if ( primitive._data )
							{
								var newPrimitive = layer.createCorridorPrimitive(primitive._data, primitive._color, primitive.show);
								addList.push(newPrimitive);
								removeList.push(primitive);
							}
						}
						
						// 削除
						for ( var i=0; i<removeList.length; i++ )
						{
							layer._corridorCollection.remove(removeList[i]);
						}
						// 追加
						for ( var i=0; i<addList.length; i++ )
						{
							layer._corridorCollection.add(addList[i]);
						}
						layer._beforeHeight = GLOBE.MAP.currents.height;
					}
				}
			}
		};
		map.viewer.camera.moveEnd.addEventListener(GLOBE.VectorTileLayer._moveEventHandler);
		layer._clearTimeout = setInterval(GLOBE.VectorTileLayer._moveEventHandler, 1000);
	}
	if ( GLOBE.VectorTileLayer._mouseEventHandler ) return;
	
	
	GLOBE.VectorTileLayer._mouseEventHandler = new Cesium.ScreenSpaceEventHandler(map.viewer.scene.canvas);
	GLOBE.VectorTileLayer._mouseEventHandler.setInputAction(function(click) {
		
		var layer = null;
		var originalLayer = null;
		var map = GLOBE.VectorTileLayer._map;
		var pickedObject = map.viewer.scene.pick(click.position);
		var feature = null;
		
		if ( pickedObject && pickedObject.primitive._feature )
		{
			if ( pickedObject.primitive && pickedObject.primitive._feature )
			{
				feature = pickedObject.primitive._feature;
				layer = pickedObject.primitive._ownerLayer;
				originalLayer = pickedObject.primitive._originalLayer;
			}
		}
		
		
		if ( !feature )
		{
				
			if ( !GLOBE.VectorTileLayer._layers  ) return;
			
			var ellipsoid = map.viewer.scene.globe.ellipsoid;
			var cartesian = map.viewer.scene.camera.pickEllipsoid(click.position,ellipsoid );
			if (cartesian)
			{
				var cartographic = ellipsoid.cartesianToCartographic(cartesian);
				var lng = Cesium.Math.toDegrees(cartographic.longitude);
				var lat = Cesium.Math.toDegrees(cartographic.latitude);
				for ( var layerNo = GLOBE.VectorTileLayer._layers.length-1; layerNo>=0; layerNo-- )
				{
					layer = GLOBE.VectorTileLayer._layers[layerNo];
					if ( !layer || !layer._visible ) continue;
					
					var tilesToRender = map.viewer.scene.globe._surface._tilesToRender;
					//this.getZoomLevel();
					if ( Cesium.defined( tilesToRender ) )
					{
						var levels = {};
						
						for( var i=0; i<tilesToRender.length; i++ )
						{
							
							if ( tilesToRender[i]._level < 18 )
								levels[ tilesToRender[i]._level + '' ] = true;
							else
								levels[ '18' ] = true;
						}
						
						for( var level in levels )
						{
							feature = layer._provider.pick( { 
								lat:lat,
								lng :lng ,
								level : parseInt(level ) //tilesToRender[i]._level
							} );
							if ( feature ) break;
						}
					}
					
					if ( feature ) break;
				}
				
			}
		
		}
		
		// featureからdescription生成
		var len = map.viewer.dataSources.length;
		for(var i=len-1; i>=0; i--){
			var dataSourceCollection =  map.viewer.dataSources._dataSources[i];
			if(dataSourceCollection.type == "JapnGSIVectorTile"){
				map.viewer.dataSources.remove(dataSourceCollection, true);
			}
		}
		if ( layer && feature )
		{
			var description = ( originalLayer && originalLayer._popupText ? originalLayer._popupText :
				layer._featureToDescription(feature) );
			
			if ( description && description != "")
			{
				var box = GLOBE.DIALOG.INFOBOX;
				//box.setDialogHeader(layer.options.title);
				box.setDialogHeader(feature.properties.name);
				box.setDialogContent($(description));
				box.show();
			}
		}
		
	}, Cesium.ScreenSpaceEventType.LEFT_CLICK );
} ;

// Leaflet
var L = {};

L.LatLng = function (lat, lng) {
	lat = parseFloat(lat);
	lng = parseFloat(lng);

	this.lat = lat;
	this.lng = lng;

};
L.latLng = function (a, b) { 
	if (a instanceof L.LatLng) {
		return a;
	}
	if (MA.Util.isArray(a)) {
		if (typeof a[0] === 'number' || typeof a[0] === 'string') {
			return new L.LatLng(a[0], a[1], a[2]);
		} else {
			return null;
		}
	}
	if (a === undefined || a === null) {
		return a;
	}
	if (typeof a === 'object' && 'lat' in a) {
		return new L.LatLng(a.lat, 'lng' in a ? a.lng : a.lon);
	}
	if (b === undefined) {
		return null;
	}
	return new L.LatLng(a, b);
};

L.Marker = MA.Class.extend( {
	
	options : {},
	_latlng : null,
	_popupText : "",
	initialize: function (latlng, options) {
		MA.setOptions(this, options);
		this._latlng = L.latLng(latlng);
	},
	
	bindPopup  : function(s)
	{
		this._popupText= s;
		return this;
	}
} );

L.marker = function (latlng, options) {
	return new L.Marker(latlng, options);
};


L.Icon = MA.Class.extend( {
	
	options: {
		className: ''
	},

	initialize: function (options) {
		MA.setOptions(this, options);
	}
} );

L.icon = function (options) {
	return new L.Icon(options);
};


L.DivIcon = L.Icon.extend( {
	
} );

L.divIcon = function (options) {
	return new L.DivIcon(options);
};

L.LatLngBounds = function (southWest, northEast) { // (LatLng, LatLng) or (LatLng[])
	if (!southWest) { return; }

	this._latlngs = northEast ? [southWest, northEast] : southWest;

};
L.latLngBounds = function (southWest, northEast) {
	return new L.LatLngBounds(southWest, northEast);
};

L.Rectangle = MA.Class.extend( {
	
	options : {},
	_bounds : null,
	initialize: function (bounds, options) {
		MA.setOptions(this, options);
		this._bounds = L.latLngBounds(bounds);
	}
} );

L.rectangle = function (bounds, options) {
	return new L.Rectangle(bounds, options);
};


L.Circle = MA.Class.extend( {
	
	options : {},
	_latlng : null,
	_radius : 5,
	initialize: function (latlng, options) {
		MA.setOptions(this, options);
		this._latlng = L.latLng(latlng);
	},
	setLatLng : function( lagLng ) {
		this._latlng = L.latLng(latlng);
	},
	setRadius : function( raidus ) {
		this._radius = radius;
	}
} );

L.circle = function (latlng, options) {
	return new L.Circle(latlng, options);
};

L.CircleMarker = MA.Class.extend( {
	
	options : {},
	_latlng : null,
	_radius : 5,
	initialize: function (latlng, options) {
		MA.setOptions(this, options);
		this._latlng = L.latLng(latlng);
	},
	setLatLng : function( lagLng ) {
		this._latlng = L.latLng(latlng);
	},
	setRadius : function( raidus ) {
		this._radius = radius;
	}
} );

L.circleMarker = function (latlng, options) {
	return new L.CircleMarker(latlng, options);
};

L.FeatureGroup = MA.Class.extend( {
	
	initialize: function (layers) {
		this._layers = [];

		var i, len;

		if (layers) {
			for (i = 0, len = layers.length; i < len; i++) {
				this.addLayer(layers[i]);
			}
		}
	},
	addLayer: function (layer) {
		this._layers.push( layer );
	},

	removeLayer: function (layer) {
	},
	hasLayer: function (layer) {
	},

	clearLayers: function () {
	},

	bindPopup: function (content, options) {
	},

	openPopup: function (latlng) {
		return this;
	},

	setStyle: function (style) {
	},

	bringToFront: function () {
	},

	bringToBack: function () {
	}
} );

L.icon = function (options) {
	return new L.Icon(options);
};


L.featureGroup = function (layers) {
	return new L.FeatureGroup(layers);
};

/************************************************************************
 L.Class
 - GSI.Modal.BaseClass
 ************************************************************************/
GSI.Modal.instance=null;
GSI.Modal.instanceList=[];
GSI.Modal.blind = null;
GSI.Modal.zIndexOffset = 50000;

GSI.Modal.BaseClass = MA.Class.extend( {
	includes: MA.Mixin.Events,
	options : {
		closeBtnVisible : true,
		blindClose : true
	},
	container : null,
	initialize : function (options)
	{
		options = MA.setOptions(this, options);
	},
	show : function(options)
	{

		GSI.Modal.instanceList.push( this );

		options = MA.setOptions(this, options);
		this.createBlind();

		if ( !this.container )
		{
			this.container = this.createContainer();
			$(document.body).append( this.container );
		}
		else this.contentFrame.empty();

		if ( options && options.width )
		{
			this.contentFrame.css( { width:options.width + 'px' } );
		}
		else
		{
			this.contentFrame.css( { width:'auto' } );
		}

		if ( this.getContent )
			this.contentFrame.append( this.getContent() );

		this.adjustWindow();

		if ( !GSI.Modal.blind.is( ':visible' ))
			GSI.Modal.blind.show( "fade", {"direction": "both","easing": "linear"}, "fast" );

		this.container.show("fade", {"direction": "both","easing": "linear"}, "fast" );

		if ( !this._onWindowResize )
		{
			this._onWindowResize = MA.bind( this.onWindowResize, this );
			$( window ).on( "resize", this._onWindowResize );
		}
	},
	onWindowResize : function()
	{
		this.adjustWindow();
	},
	adjustWindow : function()
	{
		var windowSize = GSI.Utils.getScreenSize();
		var isVisible = this.container.is( ':visible' );

		if ( !isVisible )
		{
			this.container.css( { "visibility": "hidden" } ).show();
		}
		this.contentFrame.css( {
			"max-width" : windowSize.w - 50 + 'px',
			"max-height" : windowSize.h - 50 + 'px'
		} );

		var w = this.container.outerWidth(true);
		var h = this.container.outerHeight(true);
		this.container.css( {
			left : Math.floor( (windowSize.w/2) - (w/2) ) + 'px',
			top : Math.floor( (windowSize.h/2) - (h/2) ) + 'px'
		} );

		if ( !isVisible )
		{
			this.container.hide().css( { "visibility": "visible" } );
		}
	},
	createContainer : function()
	{
		var container = $( '<div>' ).hide().addClass( this.options.className ? this.options.className : 'gsi_modal_base' ).css( {"z-index":GSI.Modal.zIndexOffset+1+GSI.Modal.instanceList.length, position: "absolute"} );

		this.contentFrame = $('<div>').addClass( 'gsi_modal_base_content' );
		container.append( this.contentFrame );

		if ( this.options.closeBtnVisible )
		{
			this.closeButton = $( '<a>' )
				.addClass( 'gsi_modal_base_closebtn' )
				.attr( { 'href' : 'javascript:void(0);'} ).html( '×' ).click(
					MA.bind( function() {
						this.hide();
					},this )
				);
			container.append( this.closeButton );
		}

		return container;
	},
	hide : function( noRemoveBlind )
	{
		if ( this._onWindowResize )
		{
			$( window ).off( "resize", this._onWindowResize );
			delete this._onWindowResize;
			this._onWindowResize = null;
		}

		for ( var i=0; i<GSI.Modal.instanceList.length; i++ )
		{
			if ( GSI.Modal.instanceList[i] == this )
			{
				GSI.Modal.instanceList.splice( i, 1 );
				break;
			}
		}

		if ( this.container ) this.container.remove();
		if ( this.closeButton ) this.closeButton.remove();

		delete this.closeButton;
		delete this.container;
		this.closeButton = null;
		this.container = null;

		if ( GSI.Modal.instanceList.length <= 0 )
			this.removeBlind();
	},
	getBlindClose:function() {
		return this.options.blindClose;

	},
	createBlind : function()
	{
		if ( GSI.Modal.blind ) return;

		GSI.Modal.blind = $( '<div>' )
			.css( {
				opacity : 0.3,
				background:"#666",
				position:"absolute",
				left:'0px',
				top:'0px',
				width:'100%',
				height:'100%',
				"z-index" : GSI.Modal.zIndexOffset,
				display:"none",
				cursor:"pointer"
			} )
			.click( function() {
			} );

		$( document.body ).append( GSI.Modal.blind );
	},
	removeBlind : function()
	{
		if ( GSI.Modal.blind ) GSI.Modal.blind.remove();
		delete GSI.Modal.blind;
		GSI.Modal.blind = null;
	}

} );

/************************************************************************
 L.Class
 - GSI.Modal.BaseClass
   - GSI.Modal.Dialog
 ************************************************************************/
GSI.Modal.Dialog = GSI.Modal.BaseClass.extend( {
	options : {
		positiveButtonText : '決定',
		nagativeButtonText : '中止',
		blindClose : false,
		closeBtnVisible : false,
		className : 'gsi_modal_dialog'
	},
	show : function( options )
	{
		GSI.Modal.BaseClass.prototype.show.call( this, options );
	},
	getContent : function()
	{
		this.dialogFrame = $( '<div>' ).addClass( 'gsi_modal_dialog_frame' );
		this.dialogContent = $( '<div>' ).addClass('gsi_modal_dialog_content');
		this.buttonFrame = $( '<div>' ).addClass('gsi_modal_dialog_btn_frame');

		this.positiveButton = $( '<a>' ).attr( { "href":"javascript:void(0);"} )
			.html( this.options.positiveButtonText ).click( MA.bind( this.onPositiveButtonClick, this ) );
		this.negativeButton = $( '<a>' ).attr( { "href":"javascript:void(0);"} )
			.html( this.options.nagativeButtonText ).click( MA.bind( this.onNegativeButtonClick, this ) );

		this.buttonFrame.append( this.positiveButton).append( this.negativeButton );

		this.dialogFrame .append( this.dialogContent );
		this.dialogFrame .append( this.buttonFrame );

		return this.dialogFrame ;
	},
	onPositiveButtonClick : function()
	{
		this.hide();
		this.fire( 'positive' );
	},
	onNegativeButtonClick : function()
	{
		this.hide();
		this.fire( 'negative' );
	}
} );

/************************************************************************
 L.Class
 - GSI.Modal.BaseClass
   - GSI.Modal.Dialog
     - GSI.Modal.confirmDialog（免責事項選択ダイアログ）
 ************************************************************************/
GSI.Modal.confirmDialog = GSI.Modal.Dialog.extend( {
	options : {
		positiveButtonText : 'ＯＫ',
		nagativeButtonText : 'キャンセル',
		title : "免責事項・ご利用上の注意"
		,message : ""
		,width : 460
	},
	getContent : function()
	{
		var frame = $( '<div>' ).css({'height':'280px','overflow':'auto'}).addClass( 'gsi_modal_dialog_content' );
		var inframe = $('<div>').css({'margin':'10px'});
		var liframe1 = $('<div>').css({'margin':'5px 18px 0px 0px'});
		var liframe2 = $('<div>').css({'margin':'0px 18px 0px 0px'});
		var frmct = $( '<div>' ).html(GSI.TEXT.EVAC.CONFIRMTOP);
		var uol = $('<ol>');
		var li1 = $('<li>').attr({"value":"1"}).html(GSI.TEXT.EVAC.CONFIRMITEM1);
		var li2 = $('<li>').attr({"value":"2"}).html(GSI.TEXT.EVAC.CONFIRMITEM2);
		var li3 = $('<li>').attr({"value":"3"}).html(GSI.TEXT.EVAC.CONFIRMITEM3);
		var atten = $( '<div>' ).html(GSI.TEXT.EVAC.ATTENTION);

		var dol = $('<ol>');
		var dli1 = $('<li>').attr({"value":"1"}).html(GSI.TEXT.EVAC.DATAITEM1);
		var dli2 = $('<li>').attr({"value":"2"}).html(GSI.TEXT.EVAC.DATAITEM2);
		var dli3 = $('<li>').attr({"value":"3"}).html(GSI.TEXT.EVAC.DATAITEM3);
		var dli4 = $('<li>').attr({"value":"4"}).html(GSI.TEXT.EVAC.DATAITEM5);
		var datten = $( '<div>' ).html(GSI.TEXT.EVAC.ATTENTIONDATA);

		uol.append(li1);
		uol.append(li2);
		uol.append(li3);
		liframe1.append(atten);
		liframe1.append(uol);

		dol.append(dli1);
		dol.append(dli2);
		dol.append(dli3);
		dol.append(dli4);
		liframe2.append(datten);
		liframe2.append(dol);

		inframe.append(frmct);
		inframe.append(liframe1);
		inframe.append(liframe2);

		frame.append(inframe);
		var titleFrame = $( '<div>' ).addClass('gsi_modal_dialog_header').html( this.options.title );

		var dialogFrame = GSI.Modal.Dialog.prototype.getContent.call( this );

		this.dialogContent.append( titleFrame );
		this.dialogContent.append( frame );

		return dialogFrame ;
	},
	onPositiveButtonClick : function()
	{
		this.hide();
		this.fire('positive');
	},
	onNegativeButtonClick : function()
	{
		this.hide();
		this.fire( 'negative' );
	}
} );


/************************************************************************
 L.Class
 - GSI.EvacuationManager
 ************************************************************************/
GSI.EvacuationManager = MA.Class.extend({
	initialize : function( queryParams )
	{
		this._isVisibleDialog = false;
		if (queryParams)
		{
			this._queryparams = null;
			this._queryParams = queryParams;
		}
	},
	Reset : function( qp )
	{
		this.initialize( qp );
	},
	Out : function()
	{
		return this._queryParams;
	},
	accept : function()
	{
		var d;
		
		if (this._queryParams.params["disp"])
		{
			d = this._queryParams.params["disp"];
		}

		var ls, ly, lcd;
		if(this._queryParams.params["ls"])
		{
			ls = this._queryParams.params["ls"].split("|");
			GSI.Utils.rpad(d, "0", ls.length);
		}
		ly = this._queryParams._layers;
		lcd = this._queryParams.params["lcd"];
		if (ls)
		{
			if (d.charAt(ls.length-1) == "1")
			{
				this._isVisibleDialog = true;
			}

			if ( lcd && lcd.indexOf(CONFIG.layerEvacuationHeader) >= 0 )
			{
				for(var i = ls.length - 1; i >= 0; i--)
				{
					if ( (lcd != ls[i]) && ls[i].indexOf(CONFIG.layerEvacuationHeader) >= 0 )
					{
						ls.splice(i,1);
						this._isVisibleDialog = (this._isVisibleDialog || (d.charAt(i) == "1") )
					}
				}
			}
			else
			{
				var lsct = 0;
				for(var i = ls.length - 1; i >= 0; i--)
				{
					if (ls[i].indexOf(CONFIG.layerEvacuationHeader)>=0)
					{
						if (lsct > 0)
						{
							ls.splice(i,1);
						}
						lsct++;
					}
				}
			}
			this._queryParams.params["ls"] = ls.join('|');
		}

		var dct = 0;
		if (ly)
		{
			for(var i = ly.length - 1; i >= 0; i--)
			{
				if ( lcd && lcd.indexOf(CONFIG.layerEvacuationHeader) >= 0 )
				{
					if ((lcd != ly[i].id) && ly[i].id.indexOf(CONFIG.layerEvacuationHeader) >= 0 )
					{
						ly.splice(i,1);
					}
				}
				else
				{
					if ( ly[i].id.indexOf(CONFIG.layerEvacuationHeader) >= 0 )
					{
						if (dct > 0)
						{
							ly.splice(i,1);
						}
						dct++;
					}
				}			
			}
		}
	},
	cancel : function()
	{
		var ls, ly, lcd;
		if(this._queryParams.params["ls"])
		{
			ls = this._queryParams.params["ls"].split("|");
		}
		ly = this._queryParams._layers;
		lcd = this._queryParams.params["lcd"];

		if (ls)
		{
			for(var i = ls.length - 1; i >= 0; i--)
			{
				if (ls[i].indexOf(CONFIG.layerEvacuationHeader)>=0)
				{
					ls.splice(i,1);
				}
			}
			this._queryParams.params["ls"] = ls.join('|');
		}

		if (lcd)
		{
			if (lcd.indexOf(CONFIG.layerEvacuationHeader)>=0)
			{
				this._queryParams.params["lcd"]=null;
			}
		}

		if (ly)
		{
			for(var i = ly.length - 1; i >= 0; i--)
			{
				if (ly[i].id.indexOf(CONFIG.layerEvacuationHeader)>=0)
				{
					ly.splice(i,1);
				}
			}
		}
		this._isVisibleDialog = false;
	},
	isVisibleDialog : function()
	{
		return this._isVisibleDialog;
	}
});



/************************************************************************
 L.Class
 - GSI.EvacDialog
 ************************************************************************/
GSI.EvacDialog = MA.Control.extend( {
	options : {
		width: '310px',
		position:'bottomright',
	},
	initialize : function()
	{
		this._map = GSI.GLOBALS.map;
		MA.Util.setOptions(this, this.options);
		this._isShow = false;
		if (!this._container)
		{
			$(document.body).append( this.onAdd(GSI.GLOBALS.map) );
		}
	},
	show : function ()
	{
		if (this._isShow == false)
		{
			if (!this._map)
			{
				this._map = GSI.GLOBALS.map;
			}
			this._isShow = true;
		}
		$(this._container).css({'display':'block'});
	},
	hide : function ()
	{
		if (this._isShow == true)
		{
			$(this._container).css({'display':'none'});
		}
		this._isShow = false;
	},
	onAdd: function (map)
	{
		this._map = map;
		this._container = MA.DomUtil.create('div', 'evac_dialog');
		//content
		var frame =$('<div>').addClass('evac_dialog_content').html(this.createContent());
		
		$(this._container).css({'opacity':'0.7','right':'10px','bottom':'10px','position':'absolute','display':'none'}).append(frame);

		return this._container
	},
	createContent : function()
	{
		return GSI.TEXT.EVAC.KIYAKU + "<br>" + GSI.TEXT.EVAC.KIYAKULINK;
    }
} );


GSI.Utils.rpad = function(src, letter, num)
{
	var dst = src;
	var len = num - src.length;
	if (dst) dst="";
	for(var i=0; i < len; i++)
	{
		dst+=letter;
	}
	return dst;
};
GSI.Utils.lpad = function(src, letter, num)
{
	var dst = "";
	var len = num - src.length;
	for(var i=0; i<len; i++)
	{
		dst+=letter;
	}
	return dst + src;
};


