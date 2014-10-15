/*
 * FloorBlock.js
 **/
function FloorBlock(lamt)
{
    var s = this;
    base(s,LSprite,[]);
    s.type = "FloorBlock";
    s.bockType="null";
    s.mcManager=lamt;
    s.isActiving=false;
    if(lamt!=null)
    {
        s.addChild(lamt);
        lamt.addFrameScript("reblock5", s._loop,[s,"block5"]);
        lamt.addFrameScript("reblock6", s._loop,[s,"block6"]);
        lamt.addFrameScript("endpop", s._loop,[s,"block3"]);
        lamt.addFrameScript("endcut", s._loop,[s,"block4"]);
    }
 }
p = {
    setBlockType:function(strType)
    {
        var s = this;
        s.bockType = strType;
         var mc= s.mcManager;
        switch (strType)
        {
            case "block1":
            case "block2":
                //尖尖
            case "block3":
                //弹簧
            case "block4":
                //软地表
                 mc.gotoAndStop(strType);
                 break;
            case "block5":
            case "block6":
                mc.gotoAndPlay(strType);
               // mc.play();
                break;
        }
    },
    getBlockType:function()
    {
        return this.bockType;
    }
    ,
    _loop:function(self,arParams)
    {
        //这里参数不明白，前面一定要声明一个参数self或者别的s什么的，指向的居然是mcManager对象，然后第二个参数是接受到的参数数组
        //而且这里必须用self，不能用arParams[0].mcManager;或者对象引用是混乱的
        switch (arParams[1])
        {
            case "block3":
                self.gotoAndStop("block3");
                self.isActiving=false;
                break;
            case "block4":
                self.isActiving=false;
                self.gotoAndStop( "block4");
                floorToPool(self.parent);
                //trace("回收"+self.parent.getBlockType()+","+self.parent.y)
                 //回收
                 break;
            default :
                self.gotoAndPlay(arParams[1]);
                //self.play();
                break;
        }
    }
    ,
    upanddown:function()
    {
        //弹簧播放
        var s=this;
        if(!s.isActiving)
        {
            s.mcManager.gotoAndPlay("pop");
            s.isActiving=true;
            s.mcManager.play();
        }
    }
    ,
    breakdown:function()
    {
        //软地面倒塌
        var s=this;
        if(!s.isActiving)
        {
            s.mcManager.gotoAndPlay("cut");
            s.isActiving=true;
            s.mcManager.play();
        }

    },
    dispose:function()
    {
        removeChild(this.mcManager);
        this.mcManager.die();
        this.mcManager=null;
    }

};
//定义赋值
for(var k in p)
{
    FloorBlock.prototype[k]=p[k];
}