class Block extends Laya.Sprite{
    xx=0
    yy=0
    num=0
    speed=0
    isMove=false
    targetX=0
    targetY=0

//-----init---
    constructor(){
        super()
        this.mouseEnabled=true
        this.size(140,140)
    }
 
}