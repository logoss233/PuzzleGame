var WebGL = Laya.WebGL;
// 程序入口
var Root = /** @class */ (function () {
    function Root() {
        this.loadingUI = null;
        Laya.init(800, 480, WebGL);
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.alignH = "center";
        Laya.stage.alignV = "center";
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        this.loadLoadingResource();
    }
    //加载loading图的资源
    Root.prototype.loadLoadingResource = function () {
        var assets = [
            "res/atlas/comp.atlas",
            "image/albumBG.jpg"
        ];
        Laya.loader.load(assets, Laya.Handler.create(this, this.loadResource));
    };
    Root.prototype.loadResource = function () {
        //实例化loading界面
        this.loadingUI = new ui.LoadingUI();
        Laya.stage.addChild(this.loadingUI);
        //加载资源
        var assets = ["image/TitleBg.jpg",
            "image/TitleName.png",
            "image/chooseBG.jpg",
            "image/picture0.jpg",
            "image/picture1.jpg",
            "image/picture2.jpg",
            "image/picture3.jpg",
            "image/picture4.jpg",
            "image/picture5.jpg",
            "image/picture6.jpg",
            "image/picture7.jpg",
            "image/chooseBG.jpg",
            "image/gameBG.jpg",
            "res/atlas/image/icon.atlas",
            "sound/Puzzlebgm.mp3",
            "zwsf.png"
        ];
        Laya.loader.load(assets, Laya.Handler.create(this, this.onLoaded), Laya.Handler.create(this, this.loadProcess, null, false));
    };
    Root.prototype.onLoaded = function () {
        //删除loading画面
        this.loadingUI.destroy();
        //资源加载完成，开始初始化
        var main = new Main();
    };
    Root.prototype.loadProcess = function (process) {
        this.loadingUI.label.text = "加载中:" + String(process * 100).slice(0, 2) + "%";
        this.loadingUI.bar.value = process;
    };
    return Root;
}());
new Root();
//# sourceMappingURL=Root.js.map