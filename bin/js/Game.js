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
var $game = null;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    //-----------------init---------------   
    function Game() {
        var _this = _super.call(this) || this;
        //初始化用参数
        _this.pictureIndex = 0; //玩的图片的索引
        //调整用参数
        _this.disturbNumber = 30;
        //变量
        _this.block9 = null; //第九个图块
        _this.moveBlock = null; //当前移动的block
        _this.picturePath = ""; //当前玩的图片的地址
        _this.blockPlace = null; //放置block的地方
        _this.tileList = [];
        _this.blockList = [];
        _this.gameState = ""; //游戏状态  "distrub" "play" “win”
        _this.isWait = false; //是否正在等待图块移动
        _this.disturbCount = 0; //打乱计数
        _this.lastDisturbBlock = null; //最后打乱的图块，防止打乱时图块来回移动
        _this.gameUI = null;
        _this.init();
        return _this;
    }
    Game.prototype.set_gameState = function (value) {
        //退出事件
        switch (this.gameState) {
            case "distrub":
                break;
            case "play":
                break;
        }
        this.gameState = value;
        //进入事件
        switch (this.gameState) {
            case "distrub":
                this.distrub_enter();
                break;
            case "play":
                this.play_enter();
                break;
            case "win":
                this.win_enter();
        }
    };
    Game.prototype.init = function () {
        $game = this;
        //注册侦听
        Laya.timer.frameLoop(1, this, this.step);
        //实例化gameUI
        this.gameUI = new ui.GameUI();
        this.addChild(this.gameUI);
        this.blockPlace = this.gameUI.picturePlace;
        this.gameUI.titleButton.on(Laya.Event.CLICK, this, this.onTitleButton);
    };
    Game.prototype.start = function () {
        this.picturePath = "image/picture" + this.pictureIndex + ".jpg";
        //给参考小图换图片
        this.gameUI.refPicture.skin = this.picturePath;
        //生成tile和block
        for (var i = 0; i < 9; i++) {
            //生成tile
            var tile = new Tile((i % 3), Math.floor(i / 3));
            this.tileList.push(tile);
            //生成block
            if (i < 8) {
                var block = new Block();
                tile.block = block;
                block.num = i;
                block.xx = i % 3;
                block.yy = Math.floor(i / 3);
                block.x = block.xx * 140;
                block.y = block.yy * 140;
                this.blockList.push(block);
                //给block添加图片
                var texture = Laya.Texture.create(Laya.loader.getRes(this.picturePath), block.x, block.y, 140, 140);
                block.graphics.drawTexture(texture);
                //注册block点击事件的侦听
                block.on(Laya.Event.MOUSE_DOWN, this, this.onBLockMouseDown);
                //把block添加到显示
                this.gameUI.picturePlace.addChild(block);
            }
        }
        //生成第九个图块
        var texture = Laya.Texture.create(Laya.loader.getRes(this.picturePath), 140 * 2, 140 * 2, 140, 140);
        this.block9 = new ui.Block9UI();
        this.block9.spr.graphics.drawTexture(texture);
        this.gameUI.picturePlace.addChild(this.block9);
        this.block9.pos(140 * 2, 140 * 2);
        //动画播放完了后进入打乱环节
        this.block9.ani1.once(Laya.Event.COMPLETE, this, function () { this.set_gameState("distrub"); });
        this.block9.ani1.play(0, false);
        //启动游戏
        //进入打乱环节
        //this.set_gameState("distrub")
    };
    //-----------------------distrub----------------
    Game.prototype.distrub_enter = function () {
        this.disturbCount = this.disturbNumber;
    };
    Game.prototype.distrub_step = function () {
        if (this.disturbCount <= 0) {
            this.set_gameState("play");
        }
        else {
            if (!this.isWait) {
                //随机打乱一步
                //获取可以移动的block的列表
                var list = [];
                var emptyTile = this.getEmptyTile();
                for (var i = 0; i < this.blockList.length; i++) {
                    var block = this.blockList[i];
                    if (this.block_canMove(block) && block != this.lastDisturbBlock) {
                        list.push(block);
                    }
                }
                //获取列表中随机一个block
                var index = Math.floor(Math.random() * list.length);
                var moveBlock = list[index];
                //移动block
                this.block_move(moveBlock, emptyTile.xx, emptyTile.yy, 20);
                this.lastDisturbBlock = moveBlock;
                this.disturbCount--;
            }
        }
    };
    //----------------------play---------------------
    Game.prototype.play_enter = function () {
    };
    //---------------------win--------------------------
    Game.prototype.win_enter = function () {
        //补全图片
        this.block9.ani1.wrapMode = 1;
        this.block9.ani1.once(Laya.Event.COMPLETE, this, this.win_enter2);
        this.block9.ani1.play(30, false);
    };
    Game.prototype.win_enter2 = function () {
        console.log("2222");
        Laya.timer.frameOnce(60, this, this.win_enter3);
    };
    Game.prototype.win_enter3 = function () {
        $main.set_scene("choose");
    };
    //--------------callback----------------------
    Game.prototype.step = function () {
        switch (this.gameState) {
            case "distrub":
                this.distrub_step();
                break;
            case "play":
                break;
        }
        if (this.isWait) {
            if (this.moveBlock != null) {
                this.block_step(this.moveBlock);
            }
        }
    };
    Game.prototype.onTitleButton = function () {
        $main.set_scene("choose");
    };
    Game.prototype.onBLockMouseDown = function (e) {
        if (this.gameState == "play" && this.isWait == false) {
            var block = e.target;
            if (this.block_canMove(block)) {
                var emptyTile = this.getEmptyTile();
                this.block_move(block, emptyTile.xx, emptyTile.yy, 10);
            }
        }
    };
    //----------------功能函数----------------------
    /**
     * 获取空的tile
     */
    Game.prototype.getEmptyTile = function () {
        for (var i = 0; i < this.tileList.length; i++) {
            var tile = this.tileList[i];
            if (tile.block == null) {
                return tile;
            }
        }
    };
    Game.prototype.getTile = function (xx, yy) {
        var index = xx + yy * 3;
        return this.tileList[index];
    };
    Game.prototype.getBlock = function (xx, yy) {
        var tile = this.getTile(xx, yy);
        var block = tile.block;
        return block;
    };
    Game.prototype.block_move = function (block, xx, yy, speed) {
        this.moveBlock = block;
        var tile = this.getTile(block.xx, block.yy);
        tile.block = null;
        block.xx = xx;
        block.yy = yy;
        var targetTile = this.getTile(xx, yy);
        targetTile.block = block;
        block.targetX = xx * 140;
        block.targetY = yy * 140;
        block.speed = speed;
        block.isMove = true;
        this.isWait = true;
    };
    Game.prototype.block_step = function (block) {
        if (!block.isMove) {
            return;
        }
        var completeCount = 0;
        var dx = block.targetX - block.x;
        var dy = block.targetY - block.y;
        if (Math.abs(dx) > block.speed) {
            block.x += block.speed * (dx >= 0 ? 1 : -1);
        }
        else {
            block.x = block.targetX;
            completeCount++;
        }
        if (Math.abs(dy) > block.speed) {
            block.y += block.speed * (dy >= 0 ? 1 : -1);
        }
        else {
            block.y = block.targetY;
            completeCount++;
        }
        if (completeCount >= 2) {
            block.isMove = false;
            this.isWait = false;
            this.moveBlock = null;
            this.moveComplete();
        }
    };
    Game.prototype.block_canMove = function (block) {
        var xx = block.xx;
        var yy = block.yy;
        var emptyTile = this.getEmptyTile();
        var t_xx = emptyTile.xx;
        var t_yy = emptyTile.yy;
        if (Math.abs(t_xx - xx) + Math.abs(t_yy - yy) == 1) {
            return true;
        }
        else {
            return false;
        }
    };
    Game.prototype.checkWin = function () {
        for (var i = 0; i < 8; i++) {
            var tile = this.tileList[i];
            if (tile.block == null) {
                return false;
            }
            var block = tile.block;
            if (block.num != i) {
                return false;
            }
        }
        return true;
    };
    //移动完成后
    Game.prototype.moveComplete = function () {
        if (this.gameState == "play") {
            //判断胜利
            if (this.checkWin()) {
                //更新存档
                if (this.pictureIndex >= $global.process) {
                    $global.process++;
                    localStorage.setItem("process", String($global.process));
                }
                //胜利
                this.set_gameState("win");
            }
        }
    };
    return Game;
}(Laya.Sprite));
//# sourceMappingURL=Game.js.map