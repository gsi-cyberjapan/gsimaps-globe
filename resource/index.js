/*
 * ページロード時の処理
 */
function addEvent(){
  // URLを初期化
  //window.history.pushState(null, null, "/cesium/");


};

/*
 * 背景地図プルダウンによりレイヤを切り替える
 */
function changeMap(layerName){
	var layerID = getRandomStr();  // レイヤーIDを生成

	// geojsonタイルのプロバイダーを追加(JapanGSIGeojsonProvider.js参照)【注記のタイル】---------
	if(layerName == "geojson"){
		var quadtreePrimitive = new Cesium.QuadtreePrimitive({
			tileProvider : new JapanGSIGeojsonProvider({
				"url"      : "http://cyberjapandata.gsi.go.jp/xyz/experimental_anno/{z}/{x}/{y}.geojson",
				"viewer"   : viewer
			})
		});
		quadtreePrimitive["type"]    = "GeojsonTile_QuadtreePrimitive";
		viewer.scene.primitives.add(quadtreePrimitive);

	// 指定のレイヤを追加する（全範囲データが存在する標準地図は常にセット）---------
	}else{
		var layers = viewer.imageryLayers;
		var layer = layers.addImageryProvider(new Cesium.JapanGSIImageryProvider({
			layerLists : [ layerName, "std" ]
		}));
		layer.alpha = 1.0;
		layer["layerId"] = layerID
	}

	return layerID;
}




/*
 * クリックをトリガに、選択位置からの検索リンクを表示
 */
function showPoint(lon, lat) {
  if (lon != "" || lat != "") {
    // 各リンクURLを構築
    var link = "http://maps.gsi.go.jp/#15/" + lat +"/"+ lon + "/&base=std&ls=std&disp=1&vs=c1j0l0u0f0";
    var link_3D = "http://maps.gsi.go.jp/index_3d.html?z=14&lat=" + lat + "&lon=" + lon + "&pxsize=2048&ls=std";
    var link_geolib = "http://geolib.gsi.go.jp/map_search/results?lat=" + lat + "&lon=" + lon;
    // 結果エリアに埋め込み
    if (document.getElementById) {
      document.getElementById("latlon").innerHTML = "緯度：" + lat + "<br>経度：" + lon + "<br>" +
      "<a href=" + link + " target=\"gsiMap\">" + "地理院地図で見る" + "<\/a>" + "<br>" +
      "<a href=" + link_3D + " target=\"gsiMaps3D\">" + "地理院地図3Dで見る" + "<\/a>"+ "<br>" +
      "<a href='javascript:void(0)' onclick='fly(" + lon + "," + lat + ",10000.0);'>" + "この位置に移動する" + "<\/a>"+ "<br>" +
      "<a href=" + link_geolib + " target=\"geolib\">" + "地理空間情報ライブラリーで見る" + "<\/a>";
    }
  } else {
    document.getElementById("latlon").innerHTML="クリック/タップで位置を指定";
  }
}

/*
 * ファイルアップロード
 */
function uploadFile(evt){
	var file = evt.files[0];

	// ファイル名を表示
	$("#uploadFilename").html(file.name);

	// geojsonかkmlかどうかチェック
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
			drawGeojson(res, file.name);
		// KML描画
		}else if(ext == "kml"){
			drawKml(res, file.name);
		}
	}

	reader.readAsText(file, "UTF-8");
}

/*
 * geojson追加
 */
function drawGeojson(geojson, fileName){
	try{
		var id = getRandomStr();

		var latArray = [];
		var lonArray = [];

		var geojson = JSON.parse(geojson);
		var len     = geojson.features.length;

		for(var i=0; i<len; i++){
			var primitiveArray = [];

			var feature = geojson.features[i];
			var coord   = feature.geometry.coordinates;
			var name        = (feature.properties.name)? feature.properties.name : "名称なし";
			var description = getEntityDescription(feature.properties);
			var geomType    = feature.geometry.type;
			var markerType = feature.properties._markerType;

			// ポイント(アイコン,TEXT)-------------
			if(geomType == "Point" && (markerType == "Icon" || markerType == "DivIcon")){
				var position    = new Cesium.Cartesian3.fromDegrees(coord[0], coord[1]);
				var imageURL    = (markerType == "DivIcon")? "images/icon.png" : feature.properties._iconUrl;

				lonArray.push(coord[0]);
				latArray.push(coord[1]);

				// Billboardとして追加する
				var billboardCollection = new Cesium.BillboardCollection({
					scene : viewer.scene
				});
				billboardCollection["primitiveID"] = id;
				viewer.scene.primitives.add(billboardCollection);

				var billboards = getPrimitivePoint_Icon(position, imageURL, name);
				for(var j=0; j<billboards.length; j++){
					var billboard = billboardCollection.add(billboards[j]);
						billboard["description"] = description;
						billboard["name"]        = name;
						billboard["type"]        = "upload_Billboard";
				}

			// ポイント(円)-----------------------
			}else if(feature.geometry.type == "Point" && feature.properties._markerType == "Circle"){
				var position    = new Cesium.Cartesian3.fromDegrees(coord[0], coord[1]);
				var fillColor   = hexToRgb(feature.properties._fillColor);
					fillColor   = new Cesium.Color(fillColor[0]/255, fillColor[1]/255, fillColor[2]/255, feature.properties._fillOpacity);
				var strokeColor = hexToRgb(feature.properties._color);
					strokeColor = new Cesium.Color(strokeColor[0]/255, strokeColor[1]/255, strokeColor[2]/255, feature.properties._opacity);
				var strokeWidth = feature.properties._weight;
				var radius      = feature.properties._radius;

				lonArray.push(coord[0]);
				latArray.push(coord[1]);

				// 【 IE11 】
				if(isIE){
					// 円をPrimitiveとして追加する
					var geomInstance = getPrimitiveIcon_Circle(position, fillColor, radius, isIE);
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
						var positions = getCirclePosition(position, radius);
						var geomInstance = getPrimitiveLinestring(positions, strokeColor, strokeWidth, isIE);
						var primitive = new Cesium.Primitive({
							geometryInstances : [geomInstance],
							appearance : new Cesium.EllipsoidSurfaceAppearance({
								material : Cesium.Material.fromType("Color", {
									"color" : strokeColor
								})
							})
						});
						primitiveArray.push(primitive);
					}
				// 【 IE以外 】
				}else{
					// 円をGroundPrimitiveとして追加する
					var geomInstance = getPrimitiveIcon_Circle(position, fillColor, radius, isIE);
					var groundPrimitive = new Cesium.GroundPrimitive({
						geometryInstance : geomInstance
					});
					primitiveArray.push(groundPrimitive);

					// 枠線をGroundPrimitiveとして追加する
					if(feature.properties._opacity > 0){
						var positions = getCirclePosition(position, radius);
						var geomInstance = getPrimitiveLinestring(positions, strokeColor, strokeWidth, isIE);
						var groundPrimitive = new Cesium.GroundPrimitive({
							geometryInstance : geomInstance
						});
						primitiveArray.push(groundPrimitive);
					}
				}

			// ラインストリング-------------------
			}else if(feature.geometry.type == "LineString"){
				var position    = getPosition(coord);
				var color       = hexToRgb(feature.properties._color);
					color       = new Cesium.Color(color[0]/255, color[1]/255, color[2]/255, feature.properties._opacity);
				var width       = feature.properties._weight;

				var lonlatArray = getLonLatArrayForGeojson(coord);
				Array.prototype.push.apply(lonArray, lonlatArray.lon);
				Array.prototype.push.apply(latArray, lonlatArray.lat);

				// 【 IE11 】
				if(isIE){
					// Primitiveとして追加する
					var geomInstance = getPrimitiveLinestring(position, color, width, isIE);
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
					// GroundPrimitiveとして追加する
					var geomInstance = getPrimitiveLinestring(position, color, width, isIE);
					var groundPrimitive = new Cesium.GroundPrimitive({
						geometryInstance : geomInstance
					});
					primitiveArray.push(groundPrimitive);
				}

			// ポリゴン---------------------------
			}else if(feature.geometry.type == "Polygon"){

				var hierarchy   = new Cesium.PolygonHierarchy(getPosition(coord));
				var color       = hexToRgb(feature.properties._fillColor);
					color       = new Cesium.Color(color[0]/255, color[1]/255, color[2]/255, feature.properties._fillOpacity);
				var strokeColor = hexToRgb(feature.properties._color);
					strokeColor = new Cesium.Color(strokeColor[0]/255, strokeColor[1]/255, strokeColor[2]/255, feature.properties._opacity);
				var strokeWidth = feature.properties._weight;

				var lonlatArray = getLonLatArrayForGeojson(coord);
				Array.prototype.push.apply(lonArray, lonlatArray.lon);
				Array.prototype.push.apply(latArray, lonlatArray.lat);

				// 【 IE11 】
				if(isIE){
					// ポリゴンをPrimitiveとして追加する
					var geomInstance = getPrimitivePolygon(hierarchy, color, isIE);
					var primitive = new Cesium.Primitive({
						geometryInstances : [geomInstance],
						appearance : new Cesium.EllipsoidSurfaceAppearance({
							material : Cesium.Material.fromType("Color", {
								"color" : color
							})
						})
					});
					primitiveArray.push(primitive);

					// アウトラインをPrimitiveとして追加する
					if(feature.properties._opacity > 0){
						var positions = getPosition(coord);
						var geomInstance = getPrimitiveLinestring(positions, strokeColor, strokeWidth, isIE);
						var primitive = new Cesium.Primitive({
							geometryInstances : [geomInstance],
							appearance : new Cesium.EllipsoidSurfaceAppearance({
								material : Cesium.Material.fromType("Color", {
									"color" : strokeColor
								})
							})
						});
						primitiveArray.push(primitive);
					}
				// 【 IE11以外 】
				}else{
					// ポリゴンをGroundPrimitiveとして追加する
					var geomInstance = getPrimitivePolygon(hierarchy, color, isIE);
					var groundPrimitive = new Cesium.GroundPrimitive({
						geometryInstance : geomInstance
					});
					primitiveArray.push(groundPrimitive);

					// アウトラインをGroundPrimitiveとして追加する
					if(feature.properties._opacity > 0){
						var positions = getPosition(coord);
						var geomInstance = getPrimitiveLinestring(positions, strokeColor, strokeWidth, isIE);
						var groundPrimitive = new Cesium.GroundPrimitive({
							geometryInstance : geomInstance
						});
						primitiveArray.push(groundPrimitive);
					}
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
					viewer.scene.primitives.add(primitive);
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
		viewer.camera.flyTo({
			destination : new Cesium.Rectangle.fromDegrees(west, south, east, north),
			duration :1
		});

		// アップロード一覧に追加
		addUploadList(fileName, id);
	}
	catch(e){
		alert("正常に読み込めませんでした。\n【エラー内容】\n" + e);
	}
}

/*
 * kml追加
 */
function drawKml(kml, fileName){
	try{
		var id = getRandomStr();
		var latArray = [];
		var lonArray = [];

		// いったんdataSource追加
		var dataSource = new Cesium.KmlDataSource();
		viewer.dataSources.add(dataSource);

		// 高さ情報があるかどうか
		var depthFlag = (kml.indexOf("<altitudeMode>") >=0 )? true : false;

		var kml = $.parseXML(kml);
		dataSource.load(kml).then(function(dataSource){
			// 高さ情報がある場合はそのままentityとして描画----------------
			if(depthFlag){
				dataSource["id"] = id;
				viewer.flyTo(dataSource, {"duration":1});

			// 高さ情報がない場合はentityをprimitiveに変換して描画---------
			}else{
				var entities = dataSource._entityCollection.values;
				for(var i=0; i<entities.length; i++){
					entities[i].show = false;  // いったん非表示にする

					if(entities[i]._children.length > 0){
						for(var j=0; j<entities[i]._children.length; j++){
							var arrayList = convertEntityToPrimitive(entities[i]._children[j], id);
							Array.prototype.push.apply(lonArray, arrayList.lon);
							Array.prototype.push.apply(latArray, arrayList.lat);
						}
					}else{
						var arrayList = convertEntityToPrimitive(entities[i], id);
						Array.prototype.push.apply(lonArray, arrayList.lon);
						Array.prototype.push.apply(latArray, arrayList.lat);
					}
				}
				// dataSource削除
				viewer.dataSources.remove(dataSource);

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
					duration :1
				});
			}

			// アップロード一覧に追加
			addUploadList(fileName, id);
		});
	}
	catch(e){
		alert("正常に読み込めませんでした。\n【エラー内容】\n" + e);
	}
}

/*------------------------------*
 * KMLのentityをpritimiveに変換 *
 *------------------------------*/
function convertEntityToPrimitive(entity, id){
	var ellipsoid = viewer.scene.globe.ellipsoid;

	var lonArray = [];
	var latArray = [];

	var name        = (entity._name)? entity._name : "名称なし";
	var description = (entity._description)? entity._description._value : "";
		description = $("<div/>").html(description).find("div").html();

	// ポイント(アイコン)-----------------
	if(entity._billboard != undefined){
		var position    = entity._position._value._value;
		var imageURL    = entity._billboard._image._value;

		// 緯度経度を配列に入れる
		var cartographic = ellipsoid.cartesianToCartographic(position);
		var lon = Cesium.Math.toDegrees(cartographic.longitude);
		var lat = Cesium.Math.toDegrees(cartographic.latitude);
		lonArray.push(lon);
		latArray.push(lat);

		// Billboardとして追加する
		var billboardCollection = new Cesium.BillboardCollection({
			scene : viewer.scene
		});
		billboardCollection["primitiveID"] = id;
		viewer.scene.primitives.add(billboardCollection);

		var billboards = getPrimitivePoint_Icon(position, imageURL, name);
		for(var j=0; j<billboards.length; j++){
			var billboard = billboardCollection.add(billboards[j]);
				billboard["description"] = description;
				billboard["name"]        = name;
				billboard["type"]        = "upload_Billboard";
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

		// 【 IE11 】
		if(isIE){
			// ポリゴンをPrimitiveとして追加する
			var geomInstance = getPrimitivePolygon(hierarchy, color, isIE);
			var primitive = new Cesium.Primitive({
				geometryInstances : [geomInstance],
				appearance : new Cesium.EllipsoidSurfaceAppearance({
					material : Cesium.Material.fromType("Color", {
						"color" : color
					})
				})
			});
			primitiveArray.push(primitive);

			// 枠線をPrimitiveとして追加する
			if(entity._polygon._outlineColor._value.alpha > 0){
				var geomInstance = getPrimitiveLinestring(hierarchy.positions, strokeColor, strokeWidth, isIE);
				var primitive = new Cesium.Primitive({
					geometryInstances : [geomInstance],
					appearance : new Cesium.EllipsoidSurfaceAppearance({
						material : Cesium.Material.fromType("Color", {
							"color" : strokeColor
						})
					})
				});
				primitiveArray.push(primitive);
			}
		// 【 IE11以外 】
		}else{
			// ポリゴンをGroundPrimitiveとして追加する
			var geomInstance = getPrimitivePolygon(hierarchy, color, isIE);
			var groundPrimitive = new Cesium.GroundPrimitive({
				geometryInstance : geomInstance
			});
			primitiveArray.push(groundPrimitive);

			// アウトラインをGroundPrimitiveとして追加する
			if(entity._polygon._outlineColor._value.alpha > 0){
				var geomInstance = getPrimitiveLinestring(hierarchy.positions, strokeColor, strokeWidth, isIE);
				var groundPrimitive = new Cesium.GroundPrimitive({
					geometryInstance : geomInstance
				});
				primitiveArray.push(groundPrimitive);
			}
		}

		for(var j=0; j<primitiveArray.length; j++){
			var primitive = primitiveArray[j];
				primitive["type"] = "upload_GroundPrimitive";
				primitive["primitiveID"] = id;
				primitive["description"] = description;
				primitive["name"]        = name;
			viewer.scene.primitives.add(primitive);
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

		// 【 IE11 】
		if(isIE){
			// Primitiveとして追加する
			var geomInstance = getPrimitiveLinestring(position, color, width, isIE);
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
			var geomInstance = getPrimitiveLinestring(position, color, width, isIE);
			var primitive = new Cesium.GroundPrimitive({
				geometryInstance : geomInstance
			});
		}

		primitive["type"] = "upload_GroundPrimitive";
		primitive["primitiveID"] = id;
		primitive["description"] = description;
		primitive["name"]        = name;
		viewer.scene.primitives.add(primitive);
	}

	return {
		"lon" : lonArray,
		"lat" : latArray
	}
}

/*
 * ポイント(アイコン)のprimitive作成
 */
function getPrimitivePoint_Icon(position, imageURL, name){
	var array = [];
	// アイコン
	array.push({
		"image"           : imageURL,
		"verticalOrigin"  : Cesium.VerticalOrigin.BOTTOM,
		"position"        : position,
		"heightReference" : Cesium.HeightReference.CLAMP_TO_GROUND
	});

	// ラベル
	var options = {
		"font"         : 'bold 20px "メイリオ"',
		"outlineColor" : Cesium.Color.WHITE,
		"outlineWidth" : 3.0,
		"fillColor"    : Cesium.Color.BLACK,
		"strokeWidth"  : 2.0,
		"strokeColor"  : Cesium.Color.WHITE,
		"stroke"       : true,
	};
	array.push({
		"image"           : Cesium.writeTextToCanvas(name, options),
		"verticalOrigin"  : Cesium.VerticalOrigin.BOTTOM,
		"position"        : position,
		"heightReference" : Cesium.HeightReference.CLAMP_TO_GROUND,
		"pixelOffset"     : new Cesium.Cartesian2(40, -20),  // 3D表示時の沈み防止
	});

	return array;
}

/*
 * ポイント(サークル)のGeometryInstanceを作成
 */
function getPrimitiveIcon_Circle(position, fillColor, radius, isIE){
	// IEの場合は高さを調整する
	if(isIE){
		var ellipse = new Cesium.EllipseGeometry({
			"center" : position,
			"semiMajorAxis" : radius,
			"semiMinorAxis" : radius,
			"height"        : IE_height
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
		}
	});

	return geometryInstance;
}

/*
 * ポリゴンのGeometryInstanceを作成
 */
function getPrimitivePolygon(hierarchy, color, isIE){

	// IEの場合は高さを調整する
	if(isIE){
		var polygon = new Cesium.PolygonGeometry({
			"polygonHierarchy" : hierarchy,
			"height"           : IE_height,
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
		}
	});

	return geometryInstance;
}

/*
 * ラインストリングのGeometryInstanceを作成
 */
function getPrimitiveLinestring(positions, color, width, isIE){
	var bs = Cesium.BoundingSphere.fromPoints(positions);
	var width = (bs.radius*width)/(80);

	// IEの場合は高さを調整する
	if(isIE){
		var corridor = new Cesium.CorridorGeometry({
			"positions"    : positions,
			"width"        : width,
			"height"       : IE_height,
			"vertexFormat" : Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
		});
	}else{
		var corridor = new Cesium.CorridorGeometry({
			"positions"    : positions,
			"width"        : width,
			"vertexFormat" : Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
		});
	}

	var geometryInstance = new Cesium.GeometryInstance({
		geometry : corridor,
		attributes : {
			color : new Cesium.ColorGeometryInstanceAttribute(color.red, color.green, color.blue, color.alpha)
		}
	});

	return geometryInstance;
}

/*
 * InfoBOXに表示する内容を返す
 */
function getEntityDescription(prop){
	var str = "";

	// テーブル記述の場合
	if(prop.description == undefined){
		for(var key in prop){
			if(key[0] != "_" && key != "name"){
				str += "<tr><td>"+key+"：</td>"+"<td>"+prop[key]+"</td></tr>"
			}
		}
		str = "<table>" + str + "</table>";
	// 自由記述の場合
	}else{
		str = prop.description
	}

	// TEXTの場合はhtmlもいれる
	if(prop._html){
		str += "<br>" + prop._html;
	}

	return str;
}

/*
 * Cartesian3の配列を返す
 */
function getPosition(coord){
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
}

/*
 * ポイント(円)のCartesian3の配列を返す
 */
function getCirclePosition(position, radius){
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
}

/*
 * 緯度の配列・経度の配列を返す【GeoJSON用】
 */
function getLonLatArrayForGeojson(coord){
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
}



/*
 * カラーコードからRGBに変換
 */
function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	var r = parseInt(result[1], 16);
	var g = parseInt(result[2], 16);
	var b = parseInt(result[3], 16);

	return [r, g, b];
}

/*
 * 文字列検索テキストボックスでEnterが押されたら検索実行
 */
function pressEnter(code) {
	if (13 === code) { // Enter
		RequestByPost();
	}
}

/*
 * 文字列検索リクエスト
 */
function createXMLHttpRequest() {
  /* XMLHttpRequest オブジェクトを作成する */
//  if (window.addEventListener) {
    /* Firefox 用 */
//    return new XMLHttpRequest();
//  } else {
    /* IE 用 */
//    return new ActiveXObject("Microsoft.XMLHTTP");
//  }


httpRequest = false;
if(window.XMLHttpRequest) {
    // Firefox, Opera など
    httpRequest = new XMLHttpRequest();
    httpRequest.overrideMimeType('text/xml');
} else if(window.ActiveXObject) {
    // IE
    try {
        httpRequest = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
        httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
    }
} else {
    alert('ご利用のブラウザでは、当機能を利用できません');
    return;
}

return httpRequest;

}

function XMLHttpRequestByPost(postdata) {
  // 処理中メッセージのセット
  document.getElementById("count").innerHTML ="検索中...（協力：<a href='http://newspat.csis.u-tokyo.ac.jp/geocode/' target='csis'>東大CSIS</a>）";
  document.getElementById("result").innerHTML = "";
  // php にリクエストを送る
  var request = createXMLHttpRequest();

  // ステータス( 読み込み中なのか完了したのか) が変更されたら、readyStateChangeHandler を実行
  request.open("GET",'http://msearch.gsi.go.jp/address-search/AddressSearch?q=' + encodeURI(postdata), true);
  request.onreadystatechange = readyStateChangeHandler;
  request.send();

  function readyStateChangeHandler() {
    switch (request.readyState) {
    case 4:
      // 完了の場合、サーバから送られたデータを表示
      if (request.status == 200) {
        var resultJson = request.responseText;
        var obj = eval("(" + resultJson + ")");

        var count = obj.length;
        document.getElementById("count").innerHTML = "検索結果：" + count + "件" +
        "<div align='right'><font size='1'>協力：<a href='http://newspat.csis.u-tokyo.ac.jp/geocode/' target='csis'>東大CSIS</a></font></div>";

        var urlString = "<ul>";
        for (var i = 0; i < count; i++) {
          var name = obj[i].properties.title;
          var lat = obj[i].geometry.coordinates[1];
          var lon = obj[i].geometry.coordinates[0];
          var url = "<li><a href='javascript:void(0)' onclick='fly(" + lon + "," + lat + ",2500.0);'>" + name + "<\/a><\/li>";
          urlString += url;
        }
        urlString += "<\/ul>";
        document.getElementById("result").innerHTML = urlString;
      }
      break;
    }
  }
}

function RequestByPost() {
  XMLHttpRequestByPost(document.getElementById('keyword').value);
}





/*
 * アップロードしたGeojson・KMLデータを削除
 */
function removeUploadData(){
	// DataSource削除
	var len = viewer.dataSources.length;
	for(var i=len-1; i>=0; i--){
		var dataSourceCollection = viewer.dataSources._dataSources[i];
		if(dataSourceCollection.type == "upload_DataSource"){
			viewer.dataSources.remove(dataSourceCollection, true);
		}
	}
}


/*
 * ランダムな12桁の文字列を返す
 */
function getRandomStr(){
	return Math.random().toString(10).slice(-12);
}