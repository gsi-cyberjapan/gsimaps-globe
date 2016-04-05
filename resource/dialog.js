function generateDialog(){
	require([ "dijit/Dialog", "dojo/dom-class", "dojo/dom-style", "dojo/dom-geometry", "dojo/window", "dojo/domReady!" ], function(Dialog, domClass, domStyle, domGeometry, winUtils) {
		layerListDlg = new Dialog({
			title : "表示できる情報",
			class : "nonModal",
			autofocus : false,
			content : layerList,
			style : "width: 300px; font-size: 12px; color: black;",
			onCancel: function (){return false;},
			// ダイアログを画面枠の外にドラッグできるようにするための設定
			_position : function() {
				if (!domClass.contains(this.ownerDocumentBody, "dojoMove") && !this._relativePosition) { // don't do anything if called during auto-scroll
					var node = this.domNode, viewport = winUtils.getBox(this.ownerDocument), p = this._relativePosition, bb = p ? null : domGeometry.position(node), l = Math.floor(viewport.l
					+ (p ? p.x : (viewport.w - bb.w) / 2)), t = Math.floor(viewport.t + (p ? p.y : (viewport.h - bb.h) / 2));
					domStyle.set(node, {
						//left : l + "px",
						//top : t + "px"
						left : "10px",
						top : "80px"
					});
				}
			}
		});
		layerDlg = new Dialog({
			title : "表示中の情報",
			class : "nonModal",
			autofocus : false,
			content : layer,
			style : "width: 350px; font-size: 12px; color: black;",
			onCancel: function (){return false;},
			// ダイアログを画面枠の外にドラッグできるようにするための設定
			_position : function() {
				if (!domClass.contains(this.ownerDocumentBody, "dojoMove") && !this._relativePosition) { // don't do anything if called during auto-scroll
					var node = this.domNode, viewport = winUtils.getBox(this.ownerDocument), p = this._relativePosition, bb = p ? null : domGeometry.position(node), l = Math.floor(viewport.l
					+ (p ? p.x : (viewport.w - bb.w) / 2)), t = Math.floor(viewport.t + (p ? p.y : (viewport.h - bb.h) / 2));
					domStyle.set(node, {
						//left : l + "px",
						//top : t + "px"
						left : "10px",
						top : "80px"
					});
				}
			}
		});
		pointDlg = new Dialog({
			title : "指定位置を表示",
			class : "nonModal",
			autofocus : false,
			content : latlon,
			style : "width: 200px; font-size: 12px; color: black;",
			onCancel: function (){pindrop("","");return false;},  // 画面を閉じたらピンを消去
			//Don't touch position at all
			//_position: function() {
			//}
			//Don't touch position after first time
			// ダイアログを画面枠の外にドラッグできるようにするための設定
			_position : function() {
				if (!domClass.contains(this.ownerDocumentBody, "dojoMove") && !this._relativePosition) { // don't do anything if called during auto-scroll
					var node = this.domNode, viewport = winUtils.getBox(this.ownerDocument), p = this._relativePosition, bb = p ? null : domGeometry.position(node), l = Math.floor(viewport.l
					+ (p ? p.x : (viewport.w - bb.w) / 2)), t = Math.floor(viewport.t + (p ? p.y : (viewport.h - bb.h) / 2));
					domStyle.set(node, {
						//left : l + "px",
						//top : t + "px"
						left : "10px",
						top : "80px"
					});
				}
			}
		});
		searchDlg = new Dialog({
			title : "文字列で検索",
			class : "nonModal",
			autofocus : false,
			content : search,
			style : "width: 200px; font-size: 12px; color: black;",
			onCancel: function (){ pindrop("","");return false;},  // 画面を閉じたらピンを消去
			//Don't touch position at all
			//_position: function() {
			//}
			//Don't touch position after first time
			// ダイアログを画面枠の外にドラッグできるようにするための設定
			_position : function() {
				if (!domClass.contains(this.ownerDocumentBody, "dojoMove") && !this._relativePosition) { // don't do anything if called during auto-scroll
					var node = this.domNode, viewport = winUtils.getBox(this.ownerDocument), p = this._relativePosition, bb = p ? null : domGeometry.position(node), l = Math.floor(viewport.l
					+ (p ? p.x : (viewport.w - bb.w) / 2)), t = Math.floor(viewport.t + (p ? p.y : (viewport.h - bb.h) / 2));
					domStyle.set(node, {
						//left : l + "px",
						//top : t + "px"
						left : "130px",
						top : "80px"
					});
				}
			}
		});
		uploadDlg = new Dialog({
			title : "ファイルから読み込み",
			class : "nonModal",
			autofocus : false,
			content : upload,
			style : "width: 300px; font-size: 12px; color: black;",
			onCancel: function (){ return false;},
			//Don't touch position at all
			//_position: function() {
			//}
			//Don't touch position after first time
			// ダイアログを画面枠の外にドラッグできるようにするための設定
			_position : function() {
				if (!domClass.contains(this.ownerDocumentBody, "dojoMove") && !this._relativePosition) { // don't do anything if called during auto-scroll
					var node = this.domNode, viewport = winUtils.getBox(this.ownerDocument), p = this._relativePosition, bb = p ? null : domGeometry.position(node), l = Math.floor(viewport.l
					+ (p ? p.x : (viewport.w - bb.w) / 2)), t = Math.floor(viewport.t + (p ? p.y : (viewport.h - bb.h) / 2));
					domStyle.set(node, {
						//left : l + "px",
						//top : t + "px"
						left : "240px",
						top : "80px"
					});
				}
			}
		});

	});
}
