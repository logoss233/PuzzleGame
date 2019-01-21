var $game:Game=null

class Game extends Laya.Sprite{
    //初始化用参数
    pictureIndex=0 //玩的图片的索引
    //调整用参数
    disturbNumber=30
    //变量
    block9:ui.Block9UI=null //第九个图块
    moveBlock:Block=null //当前移动的block
    picturePath="" //当前玩的图片的地址
    blockPlace:Laya.Sprite=null //放置block的地方
    tileList=[]
    blockList=[]
    gameState="" //游戏状态  "distrub" "play" “win”
    isWait=false //是否正在等待图块移动
    disturbCount=0 //打乱计数
    lastDisturbBlock=null//最后打乱的图块，防止打乱时图块来回移动
    
    gameUI:ui.GameUI=null

    set_gameState(value){
        //退出事件
        switch (this.gameState){
            case "distrub":
                break
            case "play":
                break
        }

        this.gameState=value
        //进入事件
        switch (this.gameState){
            case "distrub":
                this.distrub_enter()
                break
            case "play":
                this.play_enter()
                break
            case "win":
                this.win_enter()
        }
    }



//-----------------init---------------   
    constructor(){
        super()
        this.init()
    }
    init(){
        $game=this
        //注册侦听
        Laya.timer.frameLoop(1,this,this.step)
        //实例化gameUI
        this.gameUI=new ui.GameUI()
        this.addChild(this.gameUI)
        this.blockPlace=this.gameUI.picturePlace
        this.gameUI.titleButton.on(Laya.Event.CLICK,this,this.onTitleButton)
    }
    start(){
        this.picturePath="image/picture"+this.pictureIndex+".jpg"
        //给参考小图换图片
        this.gameUI.refPicture.skin=this.picturePath
        //生成tile和block
        for (let i=0;i<9;i++){
            //生成tile
            var tile=new Tile((i%3),Math.floor(i/3))
            this.tileList.push(tile)
            //生成block
            if (i<8){
                var block=new Block()
                tile.block=block
                block.num=i
                block.xx=i%3
                block.yy=Math.floor(i/3)
                block.x=block.xx*140
                block.y=block.yy*140
                this.blockList.push(block)
                //给block添加图片
                var texture=Laya.Texture.create(Laya.loader.getRes(this.picturePath),block.x,block.y,140,140)
                block.graphics.drawTexture(texture)
                //注册block点击事件的侦听
                block.on(Laya.Event.MOUSE_DOWN,this,this.onBLockMouseDown)
                //把block添加到显示
                this.gameUI.picturePlace.addChild(block)
            }
        }
        //生成第九个图块
        var texture=Laya.Texture.create(Laya.loader.getRes(this.picturePath),140*2,140*2,140,140)
        this.block9=new ui.Block9UI()
        this.block9.spr.graphics.drawTexture(texture)
        this.gameUI.picturePlace.addChild(this.block9)
        this.block9.pos(140*2,140*2)

        //动画播放完了后进入打乱环节
        this.block9.ani1.once(Laya.Event.COMPLETE,this,function(){this.set_gameState("distrub")})
        this.block9.ani1.play(0,false)
        
        
        
        //启动游戏
        //进入打乱环节
        //this.set_gameState("distrub")
    }
//-----------------------distrub----------------
    distrub_enter(){
        this.disturbCount=this.disturbNumber
    }
    distrub_step(){
        if (this.disturbCount<=0){
            this.set_gameState("play")
        }else{
            if(!this.isWait){
                //随机打乱一步
                //获取可以移动的block的列表
                var list=[]
                var emptyTile=this.getEmptyTile()
                for(let i=0;i<this.blockList.length;i++){
                    var block=this.blockList[i]
                    if (this.block_canMove(block) &&block!=this.lastDisturbBlock){
                        list.push(block)
                    }
                }
                //获取列表中随机一个block
                var index=Math.floor(Math.random()*list.length)
                var moveBlock=list[index]
                //移动block
                this.block_move(moveBlock,emptyTile.xx,emptyTile.yy,20)
                this.lastDisturbBlock=moveBlock
                this.disturbCount--
            }
            
        }
    }
//----------------------play---------------------
play_enter(){

}
//---------------------win--------------------------
win_enter(){
    //补全图片
    this.block9.ani1.wrapMode=1
    this.block9.ani1.once(Laya.Event.COMPLETE,this,this.win_enter2)
    this.block9.ani1.play(30,false)
}
win_enter2(){
    console.log("2222")
    Laya.timer.frameOnce(60,this,this.win_enter3)
}
win_enter3(){
    $main.set_scene("choose")
}
//--------------callback----------------------
    step(){
        switch(this.gameState){
            case "distrub":
                this.distrub_step()
                break
            case "play":

                break
        }
        if (this.isWait){
            if (this.moveBlock!=null){
                this.block_step(this.moveBlock)
            }
        }

    }
    
    onTitleButton(){
        $main.set_scene("choose")
    }
    onBLockMouseDown(e:Laya.Event){
        if (this.gameState=="play" && this.isWait==false){
            var block=e.target as Block
            if(this.block_canMove(block)){
                var emptyTile=this.getEmptyTile()
                this.block_move(block,emptyTile.xx,emptyTile.yy,10)
            } 
        }
    }
//----------------功能函数----------------------
    /**
     * 获取空的tile
     */
    getEmptyTile():Tile{
        for(let i=0;i<this.tileList.length;i++){
            var tile=this.tileList[i]
            if (tile.block==null){
                return tile
            }
        }
    }
    getTile(xx,yy):Tile{
        var index=xx+yy*3
        return this.tileList[index]
    }
    getBlock(xx,yy):Block{
        var tile=this.getTile(xx,yy)
        var block=tile.block
        return block
    }
    block_move(block:Block,xx,yy,speed){
        this.moveBlock=block
        var tile=this.getTile(block.xx,block.yy)
        tile.block=null
        block.xx=xx
        block.yy=yy
        var targetTile=this.getTile(xx,yy)
        targetTile.block=block
        block.targetX=xx*140
        block.targetY=yy*140
        block.speed=speed
        block.isMove=true
        this.isWait=true
    }
    block_step(block:Block){
        if (!block.isMove){
            return 
        }
        var completeCount=0
        var dx=block.targetX-block.x
        var dy=block.targetY-block.y
        if(Math.abs(dx)>block.speed){
            block.x+=block.speed*(dx>=0?1:-1)
        }else{
            block.x=block.targetX
            completeCount++
        }
        if(Math.abs(dy)>block.speed){
            block.y+=block.speed*(dy>=0?1:-1)
        }else{
            block.y=block.targetY
            completeCount++
        }
        if(completeCount>=2){
            block.isMove=false
            this.isWait=false
            this.moveBlock=null
            this.moveComplete()
        }
    }
    block_canMove(block){
        var xx=block.xx
        var yy=block.yy
        var emptyTile=this.getEmptyTile()
        var t_xx=emptyTile.xx
        var t_yy=emptyTile.yy
        if (Math.abs(t_xx-xx)+Math.abs(t_yy-yy)==1){
            return true
        }else{
            return false
        }
    }
    checkWin(){
        for(let i=0;i<8;i++){
            var tile=this.tileList[i]
            if (tile.block==null){
                return false
            }
            var block=tile.block
            if (block.num!=i){
                return false
            }
        }
        return true
    }
    //移动完成后
    moveComplete(){
        if(this.gameState=="play"){
            //判断胜利
            if (this.checkWin()){
                //更新存档
                if (this.pictureIndex>=$global.process){
                    $global.process++
                    localStorage.setItem("process",String($global.process))
                }
                //胜利
                this.set_gameState("win")
            }
        }
    }
}