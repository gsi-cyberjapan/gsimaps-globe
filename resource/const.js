/*
 * terrainProviderのURL
 */
var terrainProviderURL = "http://cyberjapandata.gsi.go.jp/xyz/globe_terraindata";
//var terrainProviderURL = "http://assets.agi.com/stk-terrain/world";

/*
 * 【TODO】Geojsonタイルの最大ズームレベル
 * 指定レベル以上のベクトルタイルを表示したい場合に記述する。
 * 指定レベル以上のベクトルタイルを表示したくない場合はnull。
 */
var geojsonTileMaxZoomLevel = 15;

/*
 * タイルの定義
 */
var defaultLayerIDs = {
		"平成28年熊本地震":{
			"20160414kumamoto_0420dol01": {
				"id": "20160414kumamoto_0420dol01",
				"name": "西原2地区正射画像(4/20撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0420dol02": {
				"id": "20160414kumamoto_0420dol02",
				"name": "阿蘇2地区正射画像(4/20撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0420dol03": {
				"id": "20160414kumamoto_0420dol03",
				"name": "南阿蘇2地区正射画像(4/20撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0420dol04": {
				"id": "20160414kumamoto_0420dol04",
				"name": "御船地区正射画像(4/20撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0420dol05": {
				"id": "20160414kumamoto_0420dol05",
				"name": "八代地区正射画像(4/20撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0420dol06": {
				"id": "20160414kumamoto_0420dol06",
				"name": "天草地区正射画像(4/19,20撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0420dol07": {
				"id": "20160414kumamoto_0420dol07",
				"name": "玉名地区正射画像(4/20撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0420dol08": {
				"id": "20160414kumamoto_0420dol08",
				"name": "山鹿地区正射画像(4/19,20撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0420dol09": {
				"id": "20160414kumamoto_0420dol09",
				"name": "菊池地区正射画像(4/20撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0420dol10": {
				"id": "20160414kumamoto_0420dol10",
				"name": "竹田地区正射画像(4/20撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0420dol11": {
				"id": "20160414kumamoto_0420dol11",
				"name": "湯布院地区正射画像(4/20撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0419dol1": {
				"id": "20160414kumamoto_0419dol1",
				"name": "熊本地区正射画像(4/19撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0419dol2": {
				"id": "20160414kumamoto_0419dol2",
				"name": "南阿蘇2地区正射画像(4/19撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0419dol6": {
				"id": "20160414kumamoto_0419dol6",
				"name": "小国地区正射画像(4/19撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0416dol1": {
				"id": "20160414kumamoto_0416dol1",
				"name": "熊本地区正射画像(4/16撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0416dol2": {
				"id": "20160414kumamoto_0416dol2",
				"name": "宇土地区正射画像(4/16撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0416dol3": {
				"id": "20160414kumamoto_0416dol3",
				"name": "合志地区正射画像(4/16撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0416dol4": {
				"id": "20160414kumamoto_0416dol4",
				"name": "西原地区正射画像(4/16撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0416dol5": {
				"id": "20160414kumamoto_0416dol5",
				"name": "阿蘇地区正射画像(4/16撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0416dol6": {
				"id": "20160414kumamoto_0416dol6",
				"name": "南阿蘇地区正射画像(4/16撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0416dol7": {
				"id": "20160414kumamoto_0416dol7",
				"name": "別府地区正射画像(4/16撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0415dol1": {
				"id": "20160414kumamoto_0415dol1",
				"name": "益城地区正射画像(4/15撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0415dol2": {
				"id": "20160414kumamoto_0415dol2",
				"name": "熊本南地区正射画像(4/15撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"20160414kumamoto_0415dol3": {
				"id": "20160414kumamoto_0415dol3",
				"name": "宇城地区正射画像(4/15撮影)",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "10-18"
			},
			"afm": {
				"id": "afm",
				"name": "都市圏活断層図",
				"ext": "png",
				"url": "http://maps.gsi.go.jp/xyz",
				"zoom": "2-16"
			},
			"active_fault_suihon": {
				"id": "active_fault_suihon",
				"name": "活断層図（地震調査研究推進本部）",
				"ext": "png",
				"url": "http://insarmap.gsi.go.jp/xyz",
				"zoom": "3-11"
			},
			"urgent_earthquake_20160414kumamoto_20150114_20160420_u09l": {
				"id": "urgent_earthquake_20160414kumamoto_20150114_20160420_u09l",
				"name": "SAR解析結果　2015/01/14～2016/04/20_DL",
				"ext": "png",
				"url": "http://insarmap.gsi.go.jp/xyz",
				"zoom": "5-18"
			},
			"urgent_earthquake_20160414kumamoto_20160126_20160419_w02l": {
				"id": "urgent_earthquake_20160414kumamoto_20160126_20160419_w02l",
				"name": "SAR解析結果　2016/01/26～2016/04/19_AL",
				"ext": "png",
				"url": "http://insarmap.gsi.go.jp/xyz",
				"zoom": "5-18"
			},
			"urgent_earthquake_20160414kumamoto_20150209_20160418_v03r": {
				"id": "urgent_earthquake_20160414kumamoto_20150209_20160418_v03r",
				"name": "SAR解析結果　2015/02/10～2016/04/19_AR",
				"ext": "png",
				"url": "http://insarmap.gsi.go.jp/xyz",
				"zoom": "5-18"
			},
			"urgent_earthquake_20160414kumamoto_20160307_20160418_u07r": {
				"id": "urgent_earthquake_20160414kumamoto_20160307_20160418_u07r",
				"name": "SAR解析結果　2016/03/07～2016/04/18_DR",
				"ext": "png",
				"url": "http://insarmap.gsi.go.jp/xyz",
				"zoom": "5-18"
			},
			"urgent_earthquake_20160414kumamoto_20150517_20160417_u12r": {
				"id": "urgent_earthquake_20160414kumamoto_20150517_20160417_u12r",
				"name": "SAR解析結果　2015/05/18～2016/04/18_AR",
				"ext": "png",
				"url": "http://insarmap.gsi.go.jp/xyz",
				"zoom": "5-18"
			},
			"urgent_earthquake_20160414kumamoto_20141114_20160415_u06l": {
				"id": "urgent_earthquake_20160414kumamoto_20141114_20160415_u06l",
				"name": "SAR解析結果　2014/11/14～2016/04/15_DL",
				"ext": "png",
				"url": "http://insarmap.gsi.go.jp/xyz",
				"zoom": "5-18"
			}
		},
	"地図・空中写真" :{
		"写真":{
			"seamlessphoto": {
				"id": "seamlessphoto",
				"name": "シームレス空中写真",
				"ext": "jpg",
				"zoom": "2-18"
			},
			"ort": {
				"id": "ort",
				"name": "最新（2007年～）",
				"ext": "jpg",
				"zoom": "2-18"
			},
			"airphoto": {
				"id": "airphoto",
				"name": "簡易空中写真（2004年～）",
				"ext": "png",
				"zoom": "15-18"
			},
			"gazo4": {
				"id": "gazo4",
				"name": "1988～1990年",
				"ext": "jpg",
				"zoom": "15-17"
			},
			"gazo3": {
				"id": "gazo3",
				"name": "1984～1987年",
				"ext": "jpg",
				"zoom": "15-17"
			},
			"gazo2": {
				"id": "gazo2",
				"name": "1979～1983年",
				"ext": "jpg",
				"zoom": "15-17"
			},
			"gazo1": {
				"id": "gazo1",
				"name": "1974～1978年",
				"ext": "jpg",
				"zoom": "10-17"
			},
			"ort_old10": {
				"id": "ort_old10",
				"name": "1961～1964年",
				"ext": "png",
				"zoom": "15-17"
			},
			"ort_USA10": {
				"id": "ort_USA10",
				"name": "1945～1950年",
				"ext": "png",
				"zoom": "15-17"
			}
		},
		"東日本大震災後正射画像":{
			"toho4": {
				"id": "toho4",
				"name": "2013年9月～2013年12月",
				"ext": "jpg",
				"zoom": "15-18"
			},
			"toho3": {
				"id": "toho3",
				"name": "2012年10月～2013年5月",
				"ext": "jpg",
				"zoom": "15-18"
			},
			"toho2": {
				"id": "toho2",
				"name": "2011年5月～2012年4月",
				"ext": "jpg",
				"zoom": "15-18"
			},
			"toho1": {
				"id": "toho1",
				"name": "2011年3月～2011年4月",
				"ext": "jpg",
				"zoom": "15-18"
			}
		},
		"fukkokizu": {
			"id": "fukkokizu",
			"name": "災害復興計画基図",
			"ext": "png",
			"zoom": "18"
		},
		"relief": {
			"id": "relief",
			"name": "色別標高図",
			"ext": "png",
			"zoom": "5-15"
		},
//		"lcm25k_2012": {
//			"id": "lcm25k_2012",
//			"name": "数値地図25000（土地条件）",
//			"ext": "png",
//			"zoom": "10-16"
//		},
		"土地利用図":{
			"lum4bl_capital2000": {
				"id": "lum4bl_capital2000",
				"name": "数値地図5000（土地利用）：首都圏（2000年）",
				"ext": "png",
				"zoom": "13-16"
			},
			"lum4bl_capital2005": {
				"id": "lum4bl_capital2005",
				"name": "数値地図5000（土地利用）：首都圏（2005年）",
				"ext": "png",
				"zoom": "13-16"
			},
			"lum4bl_chubu2003": {
				"id": "lum4bl_chubu2003",
				"name": "数値地図5000（土地利用）：中部圏（2003年）",
				"ext": "png",
				"zoom": "13-16"
			},
			"lum4bl_kinki2001": {
				"id": "lum4bl_kinki2001",
				"name": "数値地図5000（土地利用）：近畿圏（2001年）",
				"ext": "png",
				"zoom": "13-16"
			},
			"lum4bl_kinki2008": {
				"id": "lum4bl_kinki2008",
				"name": "数値地図5000（土地利用）：近畿圏（2008年）",
				"ext": "png",
				"zoom": "13-16"
			}
		},
		"std": {
			"id": "std",
			"name": "標準地図",
			"ext": "png",
			"zoom": "0-18"
		},
		"pale": {
			"id": "pale",
			"name": "淡色地図",
			"ext": "png",
			"zoom": "12-18"
		},
		"blank": {
			"id": "blank",
			"name": "白地図",
			"ext": "png",
			"zoom": "5-14"
		},
		"english": {
			"id": "english",
			"name": "English",
			"ext": "png",
			"zoom": "5-11"
		}
	},
	"防災関係" :{
		"口永良部島の火山活動":{
			"20150911dol": {
				"id": "20150911dol",
				"name": "口永良部島の火山活動　UAV撮影による正射画像（2015年9月8,11,12日撮影)",
				"ext": "png",
				"zoom": "14-18"
			},
			"20150714dol": {
				"id": "20150714dol",
				"name": "口永良部島の火山活動　UAV撮影による正射画像（2015年7月14日撮影)",
				"ext": "png",
				"zoom": "14-18"
			}
		},
		"西之島付近噴火活動":{
			"20131204doh": {
				"id": "20131204doh",
				"name": "西之島付近噴火活動 正射画像（2013年12月4日撮影）",
				"ext": "png",
				"zoom": "10-18"
			},
			"20131217doh": {
				"id": "20131217doh",
				"name": "西之島付近噴火活動 正射画像（2013年12月17日撮影）",
				"ext": "png",
				"zoom": "10-18"
			},
			"20140216doh": {
				"id": "20140216doh",
				"name": "西之島付近噴火活動 正射画像（2014年2月16日撮影）",
				"ext": "png",
				"zoom": "10-18"
			},
			"20140322dol": {
				"id": "20140322dol",
				"name": "西之島付近噴火活動 正射画像（2014年3月22日撮影）",
				"ext": "png",
				"zoom": "10-18"
			},
			"20140704dol": {
				"id": "20140704dol",
				"name": "西之島付近噴火活動 正射画像（2014年7月4日撮影）",
				"ext": "png",
				"zoom": "10-18"
			},
			"20141204doh": {
				"id": "20141204doh",
				"name": "西之島付近噴火活動 正射画像（2014年12月4日撮影）",
				"ext": "png",
				"zoom": "10-18"
			},
			"20141210doh": {
				"id": "20141210doh",
				"name": "西之島付近噴火活動 正射画像（2014年12月10日撮影）",
				"ext": "png",
				"zoom": "10-18"
			},
			"20150301doh": {
				"id": "20150301doh",
				"name": "西之島付近噴火活動 正射画像（2015年3月1日撮影）",
				"ext": "png",
				"zoom": "10-18"
			},
			"20150728dol": {
				"id": "20150728dol",
				"name": "西之島付近噴火活動 正射画像（2015年7月28日撮影）",
				"ext": "png",
				"zoom": "10-18"
			}
		},
		"御嶽山噴火活動":{
			"20140928dol": {
				"id": "20140928dol",
				"name": "御嶽山噴火活動　斜め写真による正射画像（2014年9月28日撮影）",
				"ext": "png",
				"zoom": "10-18"
			},
			"20140929dol2": {
				"id": "20140929dol2",
				"name": "御嶽山付近噴火活動　航空機SAR画像（2014年9月29日撮影)",
				"ext": "png",
				"zoom": "10-18"
			},
			"20140930dol": {
				"id": "20140930dol",
				"name": "御嶽山付近噴火活動　航空機SAR画像（2014年9月30日撮影)",
				"ext": "png",
				"zoom": "10-18"
			}
		},
		"平成27年9月関東・東北豪雨":{
			"20150911dol1": {
				"id": "20150911dol1",
				"name": "平成27年9月関東・東北豪雨 常総地区 正射画像（2015年9月11日午前撮影)",
				"ext": "png",
				"zoom": "10-18"
			},
			"20150911dol2": {
				"id": "20150911dol2",
				"name": "平成27年9月関東・東北豪雨 常総地区 正射画像（2015年9月11日午後撮影)",
				"ext": "png",
				"zoom": "10-18"
			},
			"20150913dol": {
				"id": "20150913dol",
				"name": "平成27年9月関東・東北豪雨 常総地区 正射画像（2015年9月13日午前撮影)",
				"ext": "png",
				"zoom": "10-18"
			},
			"20150915dol": {
				"id": "20150915dol",
				"name": "平成27年9月関東・東北豪雨 常総地区 正射画像（2015年9月15日午前撮影)",
				"ext": "png",
				"zoom": "10-18"
			},
			"20150929dol": {
				"id": "20150929dol",
				"name": "平成27年9月関東・東北豪雨 常総地区 正射画像（2015年9月29日午前撮影)",
				"ext": "png",
				"zoom": "14-18"
			},
			"20150911dol3": {
				"id": "20150911dol3",
				"name": "平成27年9月関東・東北豪雨 鹿沼地区 正射画像（2015年9月11日撮影)",
				"ext": "png",
				"zoom": "10-18"
			},
			"20150911dol4": {
				"id": "20150911dol4",
				"name": "平成27年9月関東・東北豪雨 鬼怒川温泉地区 正射画像（2015年9月11日撮影)",
				"ext": "png",
				"zoom": "10-18"
			},
			"20150911dol5": {
				"id": "20150911dol5",
				"name": "平成27年9月関東・東北豪雨 結城地区 正射画像（2015年9月11日撮影)",
				"ext": "png",
				"zoom": "10-18"
			}
		},
		"7月17日からの大雨 山口地方「須佐地区」正射画像":{
			"20130717dol": {
				"id": "20130717dol",
				"name": "7月17日からの大雨 山口地方「須佐地区」正射画像（2013年7月31日撮影）",
				"ext": "png",
				"zoom": "10-18"
			},
			"20130717dol2": {
				"id": "20130717dol2",
				"name": "7月17日からの大雨 山口地方「須佐地区」正射画像（2013年8月7日撮影）",
				"ext": "png",
				"zoom": "10-18"
			}
		},
		"台風第26号・27号の大雨（大島町）正射画像":{
			"201204dol": {
				"id": "201204dol",
				"name": "台風第26号の大雨（大島町）正射画像（2012年4月撮影）",
				"ext": "png",
				"zoom": "8-18"
			},
			"20131017dol": {
				"id": "20131017dol",
				"name": "台風第26号の大雨（大島町）正射画像（2013年10月17日撮影）",
				"ext": "png",
				"zoom": "10-18"
			},
			"20131017dol2": {
				"id": "20131017dol2",
				"name": "台風第26号・27号の大雨（大島町）正射画像（2013年10月28日撮影）",
				"ext": "png",
				"zoom": "10-18"
			}
		},
		"20140711dol": {
			"id": "20140711dol",
			"name": "台風第８号等による大雨（南木曽町）斜め写真による正射画像（2014年7月撮影）",
			"ext": "png",
			"zoom": "8-18"
		},
		"20140813dol": {
			"id": "20140813dol",
			"name": "台風第12号・第11号による大雨（北川村）正射画像（2014年8月13日撮影）",
			"ext": "png",
			"zoom": "10-18"
		},
		"8月16日からの大雨":{
			"20140819dol": {
				"id": "20140819dol",
				"name": "8月16日からの大雨（丹波市市島）正射画像（2014年8月撮影）",
				"ext": "png",
				"zoom": "10-18"
			},
			"20140820dol": {
				"id": "20140820dol",
				"name": "8月16日からの大雨（広島市安佐南区八木）斜め写真による正射画像（2014年8月撮影）",
				"ext": "png",
				"zoom": "10-18"
			},
			"20140820dol2": {
				"id": "20140820dol2",
				"name": "8月16日からの大雨（広島市安佐南区山本）斜め写真による正射画像（2014年8月撮影）",
				"ext": "png",
				"zoom": "10-18"
			},
			"20140820dol3": {
				"id": "20140820dol3",
				"name": "8月16日からの大雨（広島市安佐北区可部）斜め写真による正射画像（2014年8月撮影）",
				"ext": "png",
				"zoom": "10-18"
			},
			"19480000dol": {
				"id": "19480000dol",
				"name": "8月16日からの大雨（広島市内）過去の正射画像（1947年～1948年）",
				"ext": "png",
				"zoom": "10-18"
			},
			"19620000dol": {
				"id": "19620000dol",
				"name": "8月16日からの大雨（広島市内）過去の正射画像（1962年）",
				"ext": "png",
				"zoom": "10-18"
			},
			"20140828dol": {
				"id": "20140828dol",
				"name": "8月16日からの大雨（広島市内）正射画像（2014年8月28日撮影）",
				"ext": "png",
				"zoom": "10-18"
			},
			"20140830dol": {
				"id": "20140830dol",
				"name": "8月16日からの大雨（広島市内）正射画像（2014年8月30日撮影）",
				"ext": "png",
				"zoom": "10-18"
			},
			"20140831dol": {
				"id": "20140831dol",
				"name": "8月16日からの大雨（広島市内）正射画像（2014年8月30・31日撮影）",
				"ext": "png",
				"zoom": "10-18"
			}
		}
	},
	"提供実験":{
		"geojson": {
			"id": "geojson",
			"name": "地図情報(注記)",
			"ext": "geojson"
		}
	}
};