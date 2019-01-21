var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var AlbumUI = /** @class */ (function (_super) {
        __extends(AlbumUI, _super);
        function AlbumUI() {
            return _super.call(this) || this;
        }
        AlbumUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.AlbumUI.uiView);
        };
        AlbumUI.uiView = { "type": "View", "props": { "width": 800, "height": 480 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "image/albumBG.jpg", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Image", "props": { "y": 123, "x": 62, "width": 140, "skin": "image/picture3.jpg", "name": "0", "mouseEnabled": true, "height": 140 } }, { "type": "Image", "props": { "y": 123, "x": 242, "width": 140, "skin": "image/picture3.jpg", "name": "1", "mouseEnabled": true, "height": 140 } }, { "type": "Image", "props": { "y": 122, "x": 415, "width": 140, "skin": "image/picture3.jpg", "name": "2", "mouseEnabled": true, "height": 140 } }, { "type": "Image", "props": { "y": 123, "x": 590, "width": 140, "skin": "image/picture3.jpg", "name": "3", "mouseEnabled": true, "height": 140 } }, { "type": "Image", "props": { "y": 299, "x": 62, "width": 140, "skin": "image/picture3.jpg", "name": "4", "mouseEnabled": true, "height": 140 } }, { "type": "Image", "props": { "y": 299, "x": 242, "width": 140, "skin": "image/picture3.jpg", "name": "5", "mouseEnabled": true, "height": 140 } }, { "type": "Image", "props": { "y": 300, "x": 417, "width": 140, "skin": "image/picture3.jpg", "name": "6", "mouseEnabled": true, "height": 140 } }, { "type": "Image", "props": { "y": 298, "x": 591, "width": 140, "skin": "image/icon/lvl_lock_block_pressed.png", "name": "7", "mouseEnabled": true, "height": 140 } }, { "type": "Image", "props": { "y": -8, "x": -7, "var": "menuButton", "skin": "image/icon/flat_icon_menu.png" } }, { "type": "Image", "props": { "y": 19, "x": 327, "skin": "image/icon/album.png" } }, { "type": "Image", "props": { "visible": false, "var": "checkBG", "skin": "image/albumBG.jpg", "mouseEnabled": true, "alpha": 1 }, "child": [{ "type": "Image", "props": { "x": 188, "width": 420, "var": "checkPicture", "top": 27, "skin": "image/picture1.jpg", "pivotY": 2, "pivotX": 3, "height": 420 } }] }] };
        return AlbumUI;
    }(View));
    ui.AlbumUI = AlbumUI;
})(ui || (ui = {}));
(function (ui) {
    var Block9UI = /** @class */ (function (_super) {
        __extends(Block9UI, _super);
        function Block9UI() {
            return _super.call(this) || this;
        }
        Block9UI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.Block9UI.uiView);
        };
        Block9UI.uiView = { "type": "View", "props": { "width": 800, "height": 480 }, "child": [{ "type": "Sprite", "props": { "y": 70, "x": 70, "width": 140, "var": "spr", "pivotY": 70, "pivotX": 70, "height": 140 }, "compId": 3 }], "animations": [{ "nodes": [{ "target": 3, "keyframes": { "x": [{ "value": 70, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "x", "index": 0 }, { "value": 70, "tweenMethod": "linearNone", "tween": true, "target": 3, "label": null, "key": "x", "index": 10 }], "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 0 }, { "value": 1.5, "tweenMethod": "bounceOut", "tween": true, "target": 3, "label": null, "key": "scaleY", "index": 10 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleY", "index": 30 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 0 }, { "value": 1.5, "tweenMethod": "bounceInOut", "tween": true, "target": 3, "label": null, "key": "scaleX", "index": 10 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 3, "key": "scaleX", "index": 30 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }, { "nodes": [], "name": "ani2", "id": 2, "frameRate": 24, "action": 0 }] };
        return Block9UI;
    }(View));
    ui.Block9UI = Block9UI;
})(ui || (ui = {}));
(function (ui) {
    var ChooseUI = /** @class */ (function (_super) {
        __extends(ChooseUI, _super);
        function ChooseUI() {
            return _super.call(this) || this;
        }
        ChooseUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.ChooseUI.uiView);
        };
        ChooseUI.uiView = { "type": "View", "props": { "width": 800, "height": 480 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "image/chooseBG.jpg", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Image", "props": { "y": 8, "x": 289, "skin": "image/icon/Choose.png" } }, { "type": "Image", "props": { "y": 123, "x": 62, "width": 140, "skin": "image/picture3.jpg", "name": "0", "mouseEnabled": true, "height": 140 }, "child": [{ "type": "Image", "props": { "y": 84, "x": 83, "visible": false, "skin": "image/icon/Asset 22shaded_.png", "name": "yes" } }] }, { "type": "Image", "props": { "y": 123, "x": 242, "width": 140, "skin": "image/picture3.jpg", "name": "1", "mouseEnabled": true, "height": 140 }, "child": [{ "type": "Image", "props": { "y": 88, "x": 83, "visible": false, "skin": "image/icon/Asset 22shaded_.png", "name": "yes" } }] }, { "type": "Image", "props": { "y": 122, "x": 415, "width": 140, "skin": "image/picture3.jpg", "name": "2", "mouseEnabled": true, "height": 140 }, "child": [{ "type": "Image", "props": { "y": 87, "x": 85, "visible": false, "skin": "image/icon/Asset 22shaded_.png", "name": "yes" } }] }, { "type": "Image", "props": { "y": 123, "x": 590, "width": 140, "skin": "image/picture3.jpg", "name": "3", "mouseEnabled": true, "height": 140 }, "child": [{ "type": "Image", "props": { "y": 87, "x": 84, "visible": false, "skin": "image/icon/Asset 22shaded_.png", "name": "yes" } }] }, { "type": "Image", "props": { "y": 299, "x": 62, "width": 140, "skin": "image/picture3.jpg", "name": "4", "mouseEnabled": true, "height": 140 }, "child": [{ "type": "Image", "props": { "y": 86, "x": 83, "visible": false, "skin": "image/icon/Asset 22shaded_.png", "name": "yes" } }] }, { "type": "Image", "props": { "y": 299, "x": 242, "width": 140, "skin": "image/picture3.jpg", "name": "5", "mouseEnabled": true, "height": 140 }, "child": [{ "type": "Image", "props": { "y": 86, "x": 82, "visible": false, "skin": "image/icon/Asset 22shaded_.png", "name": "yes" } }] }, { "type": "Image", "props": { "y": 300, "x": 417, "width": 140, "skin": "image/picture3.jpg", "name": "6", "mouseEnabled": true, "height": 140 }, "child": [{ "type": "Image", "props": { "y": 86, "x": 83, "visible": false, "skin": "image/icon/Asset 22shaded_.png", "name": "yes" } }] }, { "type": "Image", "props": { "y": 298, "x": 591, "width": 140, "skin": "image/icon/lvl_lock_block_pressed.png", "name": "7", "mouseEnabled": true, "height": 140 }, "child": [{ "type": "Image", "props": { "y": 86, "x": 82, "visible": false, "skin": "image/icon/Asset 22shaded_.png", "name": "yes" } }] }, { "type": "Image", "props": { "y": -8, "x": -7, "var": "menuButton", "skin": "image/icon/flat_icon_menu.png" } }] };
        return ChooseUI;
    }(View));
    ui.ChooseUI = ChooseUI;
})(ui || (ui = {}));
(function (ui) {
    var GameUI = /** @class */ (function (_super) {
        __extends(GameUI, _super);
        function GameUI() {
            return _super.call(this) || this;
        }
        GameUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameUI.uiView);
        };
        GameUI.uiView = { "type": "View", "props": { "width": 800, "height": 480 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "image/gameBG.jpg", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Image", "props": { "y": 193, "x": 109, "width": 216, "skin": "image/icon/UI_Frame_Dark_White.png", "sizeGrid": "4,4,4,4", "pivotY": 43, "pivotX": 43, "height": 213 } }, { "type": "Image", "props": { "y": 74, "x": 395, "width": 427, "skin": "image/icon/UI_Frame_Dark_White.png", "sizeGrid": "4,4,4,4", "pivotY": 43, "pivotX": 43, "height": 427 } }, { "type": "Image", "props": { "y": 152, "x": 70, "width": 208, "var": "refPicture", "skin": "image/picture3.jpg", "height": 208 } }, { "type": "Image", "props": { "y": -12, "x": -6, "var": "titleButton", "skin": "image/icon/flat_icon_menu.png" } }, { "type": "Image", "props": { "y": 35, "x": 355, "var": "picturePlace" } }] };
        return GameUI;
    }(View));
    ui.GameUI = GameUI;
})(ui || (ui = {}));
(function (ui) {
    var LoadingUI = /** @class */ (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            return _super.call(this) || this;
        }
        LoadingUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.LoadingUI.uiView);
        };
        LoadingUI.uiView = { "type": "View", "props": { "width": 800, "height": 480 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "image/chooseBG.jpg", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Label", "props": { "y": 229, "x": 319, "width": 151, "var": "label", "text": "加载中", "height": 33, "fontSize": 28, "color": "#ffffff", "borderColor": "#562b2a", "bgColor": "#4a4545", "align": "center" } }, { "type": "ProgressBar", "props": { "y": 272, "x": 296, "width": 200, "var": "bar", "skin": "comp/progress.png", "pivotX": 1, "height": 30 } }] };
        return LoadingUI;
    }(View));
    ui.LoadingUI = LoadingUI;
})(ui || (ui = {}));
(function (ui) {
    var TitleUI = /** @class */ (function (_super) {
        __extends(TitleUI, _super);
        function TitleUI() {
            return _super.call(this) || this;
        }
        TitleUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.TitleUI.uiView);
        };
        TitleUI.uiView = { "type": "View", "props": { "width": 800, "height": 480 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "image/TitleBg.jpg", "mouseEnabled": true } }, { "type": "Image", "props": { "y": 27, "x": 364, "skin": "image/TitleName.png" } }, { "type": "Text", "props": { "y": 455, "x": 541, "width": 252, "text": "Powered by LayaAir Engine", "height": 24, "fontSize": 20, "color": "#ffffff" } }, { "type": "Button", "props": { "y": 227, "x": 535, "width": 199, "var": "startButton", "stateNum": 2, "skin": "image/icon/StartButton2.png", "mouseEnabled": true, "height": 77 } }, { "type": "Button", "props": { "y": 348, "x": 533, "width": 196, "var": "albumButton", "stateNum": 2, "skin": "image/icon/AlbumButton2.png", "height": 84 } }, { "type": "Image", "props": { "y": 9, "x": 10, "skin": "image/zwsf.png" } }] };
        return TitleUI;
    }(View));
    ui.TitleUI = TitleUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map