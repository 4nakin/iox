/*
 * TheGameRole.js
 **/
function TheGameRole(imgList)
{
    var s = this;
    base(s,LSprite,[]);
    s.type="TheGameRole";
    s.bmpdIdle=new LBitmapData(imgList["roleIdle"]);
    s.bmpdRight=new LBitmapData(imgList["roleRight"]);
    s.bmpdLeft=new LBitmapData(imgList["roleLeft"]);
    s.bmpdFly=new LBitmapData(imgList["roleFly"]);
    s.imageShow=new LBitmap(s.bmpdIdle);
    s.imageShow.y=-s.imageShow.height;
    s.imageShow.x=-s.imageShow.width/2;
    s.addChild(s.imageShow);
    s.mouseEnabled=false;
}
p = {
    showIdle:function()
    {
        var s=this;
        s.imageShow.bitmapData=s.bmpdIdle;
    },
    showLeft:function()
    {
        var s=this;
        s.imageShow.bitmapData=s.bmpdLeft;
    },
    showRight:function()
    {
        var s=this;
        s.imageShow.bitmapData=s.bmpdRight;
    },
    showFly:function()
    {
        var s=this;
        s.imageShow.bitmapData=s.bmpdFly;
    }

};


//定义赋值
for(var k in p)
{
    TheGameRole.prototype[k]=p[k];
}