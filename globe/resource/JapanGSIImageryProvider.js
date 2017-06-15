/*
The MIT License (MIT)

Copyright (c) 2015 TilemapJP
https://github.com/tilemapjp/Cesium-JapanGSI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


(function(){
    var
        Credit = Cesium.Credit,
        defaultValue = Cesium.defaultValue,
        defined = Cesium.defined,
        defineProperties = Cesium.defineProperties,
        DeveloperError = Cesium.DeveloperError,
        Event = Cesium.Event,
        Rectangle = Cesium.Rectangle,
        WebMercatorTilingScheme = Cesium.WebMercatorTilingScheme,
        ImageryProvider = Cesium.ImageryProvider;
    /**/

    "use strict";

    var trailingSlashRegex = /\/$/;
    var zoomStringRegex = /^([0-9]+)-?([0-9]+)?$/;
    //var defaultCredit = new Credit('国土地理院');
    var defaultCredit = new Credit('');


    function devideZoomString(zoomString) {
        if (zoomString.match(zoomStringRegex)) {
            var min = RegExp.$1;
            var max = RegExp.$2;
            return max ? [parseInt(min),parseInt(max)] : [parseInt(min),parseInt(min)];
        }
        return [];
    }

    function getTargetLayer(layerObj, layerName){
    	var resultObj;
    	if(typeof layerObj.id!== "undefined")return;
    	for(var category in layerObj){
    		var isUndefined = typeof  layerObj[category][layerName] === "undefined";
    		if(isUndefined){
    			resultObj =  arguments.callee(layerObj[category], layerName);
    			if(typeof resultObj!== "undefined")return resultObj;
    		} else {
	    		if(layerName in layerObj[category]){
	    			return layerObj[category][layerName];
	    		}
    		}
    	}
    	return resultObj;
    }

    function parseLayers(optionLayerList) {
        if (!optionLayerList) {
            optionLayerList = ["std"];
        }
        var layerList = [], max = 0, min = 18;

        for (var i = 0; i < optionLayerList.length; i++) {
            var optionLayer = optionLayerList[i];
            var isStr = typeof optionLayer === "string";
            if (isStr) {
                //optionLayer = defaultLayerIDs[optionLayer];
            	optionLayer = getTargetLayer(defaultLayerIDs, optionLayer);
            } else {
                var defaultLayer = defaultLayerIDs[optionLayer.id];
                if (defaultLayer) {
                    optionLayer.ext = defaultValue(optionLayer.ext, defaultLayer.ext);
                    optionLayer.zoom = defaultValue(optionLayer.zoom, defaultLayer.zoom);
                }
            }

            var minmax = devideZoomString(optionLayer.zoom);
            if (minmax.length == 0) continue;
            if (minmax[0] < min) min = minmax[0];
            if (minmax[1] > max) max = minmax[1];

            for (var j=minmax[0];j<=minmax[1];j++) {
                if (!layerList[j]) layerList[j] = optionLayer;
            }
        }

        for (var i=min;i<=max;i++) {
            if (!layerList[i]) throw "No layer definition for zoom level" + i;
        }
        if (max < min) throw "There are no valid layer definition";

        return [layerList, min, max];
    }

    var JapanGSIImageryProvider = function JapanGSIImageryProvider(options) {
        options = defaultValue(options, {});
        this.options = options;
        //console.log( options );
		/*
        var url = defaultValue(options.url, 'http://a.tile.openstreetmap.org/');

        if (!trailingSlashRegex.test(url)) {
            url = url + '/';
        }
		*/
        this._url = options.url;
        //this._fileExtension = defaultValue(options.fileExtension, 'png');
        this._proxy = options.proxy;
        this._tileDiscardPolicy = options.tileDiscardPolicy;

        this._tilingScheme = new WebMercatorTilingScheme();

        this._tileWidth = 256;
        this._tileHeight = 256;

        //var parsedLayers = parseLayers(options.layerLists);
        //this._layerLists = parsedLayers[0];

        //this._minimumLevel = defaultValue(options.minimumLevel, parsedLayers[1]);
        //this._maximumLevel = defaultValue(options.maximumLevel, parsedLayers[2]);
		//this._minimumLevel = options.minZoom;
		this._maximumLevel = (options.maxZoom ? options.maxZoom + 1 : options.maxZoom);
		
        this._rectangle = defaultValue(options.rectangle, this._tilingScheme.rectangle);

        // Check the number of tiles at the minimum level.  If it's more than four,
        // throw an exception, because starting at the higher minimum
        // level will cause too many tiles to be downloaded and rendered.
        //var swTile = this._tilingScheme.positionToTileXY(Rectangle.southwest(this._rectangle), this._minimumLevel);
        //var neTile = this._tilingScheme.positionToTileXY(Rectangle.northeast(this._rectangle), this._minimumLevel);
        //var tileCount = (Math.abs(neTile.x - swTile.x) + 1) * (Math.abs(neTile.y - swTile.y) + 1);
        //if (tileCount > 4) {
        //    throw new DeveloperError('The imagery provider\'s rectangle and minimumLevel indicate that there are ' + tileCount + ' tiles at the minimum level. Imagery providers with more than four tiles at the minimum level are not supported.');
        //}

        this._errorEvent = new Event();

        this._ready = true;

        var credit = defaultValue(options.credit, defaultCredit);
        if (typeof credit === 'string') {
            credit = new Credit(credit);
        }
        this._credit = credit;
    };

    function buildImageUrl(imageryProvider, x, y, level) {
		//console.log( imageryProvider );
		
		
        var url = imageryProvider._url;
        url = url.replace( "{x}", x ).replace( "{y}", y ).replace( "{z}", level )
        /*
        if (imageryProvider._layerLists[level]) {
            var layer = imageryProvider._layerLists[level];
            if (layer.url) {
            	url = layer.url+"/" + layer.id + "/" + level + "/" + x + "/" + y + "." + layer.ext;
            } else {
            	url = "http://maps.gsi.go.jp/xyz/" + layer.id + "/" + level + "/" + x + "/" + y + "." + layer.ext;
            }
        } else {
            url = imageryProvider._url + level + '/' + x + '/' + y + '.' + imageryProvider._fileExtension;
        }
		*/
        var proxy = imageryProvider._proxy;
        if (defined(proxy)) {
            url = proxy.getURL(url);
        }
		
        return url;
    }

    defineProperties(JapanGSIImageryProvider.prototype, {
        url : {
            get : function() {
                return this._url;
            }
        },

        proxy : {
            get : function() {
                return this._proxy;
            }
        },

        tileWidth : {
            get : function() {
                if (!this._ready) {
                    throw new DeveloperError('tileWidth must not be called before the imagery provider is ready.');
                }

                return this._tileWidth;
            }
        },

        tileHeight: {
            get : function() {
                if (!this._ready) {
                    throw new DeveloperError('tileHeight must not be called before the imagery provider is ready.');
                }

                return this._tileHeight;
            }
        },

        maximumLevel : {
            get : function() {
                if (!this._ready) {
                    throw new DeveloperError('maximumLevel must not be called before the imagery provider is ready.');
                }

                return this._maximumLevel;
            }
        },

        minimumLevel : {
            get : function() {
                if (!this._ready) {
                    throw new DeveloperError('minimumLevel must not be called before the imagery provider is ready.');
                }

                return this._minimumLevel;
            }
        },

        tilingScheme : {
            get : function() {
                if (!this._ready) {
                    throw new DeveloperError('tilingScheme must not be called before the imagery provider is ready.');
                }

                return this._tilingScheme;
            }
        },

        rectangle : {
            get : function() {
                if (!this._ready) {
                    throw new DeveloperError('rectangle must not be called before the imagery provider is ready.');
                }

                return this._rectangle;
            }
        },

        tileDiscardPolicy : {
            get : function() {
                if (!this._ready) {
                    throw new DeveloperError('tileDiscardPolicy must not be called before the imagery provider is ready.');
                }

                return this._tileDiscardPolicy;
            }
        },

        errorEvent : {
            get : function() {
                return this._errorEvent;
            }
        },

        ready : {
            get : function() {
                return this._ready;
            }
        },

        credit : {
            get : function() {
                return this._credit;
            }
        },

        hasAlphaChannel : {
            get : function() {
                return true;
            }
        }
    });

    JapanGSIImageryProvider.prototype.getTileCredits = function(x, y, level) {
        return undefined;
    };

    JapanGSIImageryProvider.prototype.requestImage = function(x, y, level) {
        if (!this._ready) {
            throw new DeveloperError('requestImage must not be called before the imagery provider is ready.');
        }
		if ( this.options.minZoom > level || (this.options.maxZoom && this.options.maxZoom < level) )
		{
			if ( !this._dummyCanvas )
			{
				this._dummyCanvas = document.createElement("canvas");
				this._dummyCanvas.width = 1;
				this._dummyCanvas.height = 1;
			}
			return this._dummyCanvas;
		}
        var url = buildImageUrl(this, x, y, level);
        return ImageryProvider.loadImage(this, url);
    };

    JapanGSIImageryProvider.prototype.pickFeatures = function() {
        return undefined;
    };

    Cesium.JapanGSIImageryProvider = JapanGSIImageryProvider;
})();