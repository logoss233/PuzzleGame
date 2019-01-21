var $main = null;
var Main = /** @class */ (function () {
    //-------------初始化--------------
    function Main() {
        //自身变量
        this.soundButton = null;
        this.isSound = true; //是否播放声音
        this._scene = ""; //title 
        //标题用到的变量
        this.titleUI = null; //标题UI 
        //选择界面用到的变量
        this.chooseUI = null;
        //--------game-------
        this.game = null;
        this.game_playPictureIndex = 0; //玩的图片的索引
        //--------album-----
        this.albumUI = null;
        this.album_isChecking = false;
        $main = this;
        this.init();
    }
    Object.defineProperty(Main.prototype, "scene", {
        get: function () {
            return this._scene;
        },
        enumerable: true,
        configurable: true
    });
    Main.prototype.set_scene = function (value) {
        //退出事件
        switch (this.scene) {
            case "title":
                this.title_exit();
                break;
            case "choose":
                this.choose_exit();
                break;
            case "game":
                this.game_exit();
                break;
            case "album":
                this.album_exit();
                break;
        }
        //设置scene
        this._scene = value;
        //进入事件
        switch (this.scene) {
            case "title":
                this.title_enter();
                break;
            case "choose":
                this.choose_enter();
                break;
            case "game":
                this.game_enter();
                break;
            case "album":
                this.album_enter();
                break;
        }
    };
    Main.prototype.init = function () {
        //生成声音按钮
        this.soundButton = new Laya.Button("image/icon/Icon_SoundOn.png");
        this.soundButton.zOrder = (500);
        this.soundButton.stateNum = 1;
        this.soundButton.pos(7, 380);
        this.soundButton.on(Laya.Event.CLICK, this, this.onSoundButton);
        this.soundButton.scale(0.8, 0.8);
        Laya.stage.addChild(this.soundButton);
        //播放音乐
        Laya.SoundManager.autoStopMusic = false;
        Laya.SoundManager.setMusicVolume(0.5);
        Laya.SoundManager.playMusic("sound/Puzzlebgm.mp3");
        //读取存档
        var p = Number(localStorage.getItem("process"));
        if (p == null) {
            p = 0;
        }
        $global.process = p;
        //进入title场景
        this.set_scene("title"); //初始化标题
    };
    Main.prototype.onSoundButton = function () {
        this.isSound = !this.isSound;
        if (this.isSound) {
            Laya.SoundManager.muted = false;
            this.soundButton.skin = "image/icon/Icon_SoundOn.png";
        }
        else {
            Laya.SoundManager.muted = true;
            this.soundButton.skin = "image/icon/Icon_SoundOff.png";
        }
    };
    //-------------title-------------
    Main.prototype.title_enter = function () {
        this.soundButton.pos(7, 380);
        //生成ui
        this.titleUI = new ui.TitleUI();
        Laya.stage.addChild(this.titleUI);
        this.titleUI.startButton.on(Laya.Event.CLICK, this, this.title_onStartButton);
        this.titleUI.albumButton.on(Laya.Event.CLICK, this, this.title_onAlbumButton);
    };
    Main.prototype.title_onStartButton = function () {
        this.set_scene("choose");
    };
    Main.prototype.title_onAlbumButton = function () {
        this.set_scene("album");
    };
    Main.prototype.title_exit = function () {
        this.titleUI.destroy();
    };
    //-------------choose-----------
    Main.prototype.choose_enter = function () {
        //摆放声音按钮位置
        this.soundButton.pos(682, 4);
        //生成ui
        this.chooseUI = new ui.ChooseUI();
        Laya.stage.addChild(this.chooseUI);
        //注册侦听
        //图片按钮侦听和显示设置
        for (var i = 0; i < 8; i++) {
            var picture = this.chooseUI.getChildByName(String(i));
            //已解锁
            if (i < $global.process) {
                picture.skin = "image/picture" + i + ".jpg";
                var yes = picture.getChildByName("yes");
                yes.visible = true;
                picture.on(Laya.Event.CLICK, this, this.choose_onPictureClick);
            }
            else if (i == $global.process) {
                //正在解锁
                picture.skin = "image/picture" + i + ".jpg";
                picture.on(Laya.Event.CLICK, this, this.choose_onPictureClick);
            }
            else {
                //未解锁
                picture.skin = "image/icon/lvl_lock_block_pressed.png";
            }
        }
        //主菜单按钮侦听
        this.chooseUI.menuButton.on(Laya.Event.CLICK, this, this.choose_onMenuButton);
    };
    Main.prototype.choose_onPictureClick = function (e) {
        //
        console.log(e.target.name);
        var index = Number(e.target.name);
        if (index <= $global.process) {
            this.game_playPictureIndex = index;
            this.set_scene("game");
        }
    };
    Main.prototype.choose_onMenuButton = function () {
        this.set_scene("title");
    };
    Main.prototype.choose_exit = function () {
        this.chooseUI.destroy();
    };
    //-----------game------
    Main.prototype.game_enter = function () {
        this.soundButton.pos(7, 380);
        //实例化game
        this.game = new Game();
        Laya.stage.addChild(this.game);
        this.game.pictureIndex = this.game_playPictureIndex;
        this.game.start();
        //注册侦听
    };
    Main.prototype.game_exit = function () {
        this.game.destroy();
    };
    //----------album------------
    Main.prototype.album_enter = function () {
        //摆放声音按钮位置
        this.soundButton.pos(682, 4);
        //生成ui
        this.albumUI = new ui.AlbumUI();
        Laya.stage.addChild(this.albumUI);
        //注册侦听
        //图片按钮侦听
        for (var i = 0; i < 8; i++) {
            var picture = this.albumUI.getChildByName(String(i));
            //已解锁
            if (i < $global.process) {
                picture.skin = "image/picture" + i + ".jpg";
                picture.on(Laya.Event.CLICK, this, this.album_onPictureClick);
            }
            else {
                //未解锁
                picture.skin = "image/icon/lvl_lock_block_pressed.png";
            }
        }
        //主菜单按钮侦听
        this.albumUI.menuButton.on(Laya.Event.CLICK, this, this.album_onMenuButton);
        //checkBG按钮侦听
        this.albumUI.checkBG.on(Laya.Event.MOUSE_DOWN, this, this.album_cancelCheck);
        this.albumUI.checkBG.on(Laya.Event.RIGHT_MOUSE_DOWN, this, this.album_cancelCheck);
    };
    Main.prototype.album_onPictureClick = function (e) {
        var index = Number(e.target.name);
        console.log(index);
        if (this.album_isChecking == false) {
            this.albumUI.checkBG.visible = true;
            this.albumUI.checkPicture.skin = "image/picture" + index + ".jpg";
            this.album_isChecking = true;
        }
    };
    Main.prototype.album_cancelCheck = function () {
        if (this.album_isChecking) {
            this.albumUI.checkBG.visible = false;
            this.album_isChecking = false;
        }
    };
    Main.prototype.album_onMenuButton = function () {
        this.set_scene("title");
    };
    Main.prototype.album_exit = function () {
        this.albumUI.destroy();
    };
    return Main;
}());
//# sourceMappingURL=Main.js.map