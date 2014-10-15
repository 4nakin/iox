
var imgList;
var bgLayer;
var startUI;

var sceneLayer;
var gameLayer;
 var allFloors;
var listMcs;
var floorsPool;
var nScroe;
var sndBgm;
var sndJump;
var sndDead;
var sndBreak;
var imgShareTip;
var btnRetry;
var btnShare;
var btnRank;
var adBar;


init(30,"mylegend",480,845,main);

var imgData=[
    {name:"bg",path:"http://game.2sky.cn/vapp/45/bg.jpg"},
    {name:"floorPng",path:"http://game.2sky.cn/vapp/45/floor.png"},
    {name:"roleIdle",path:"http://game.2sky.cn/vapp/45/Role0001.png"},
    {name:"roleRight",path:"http://game.2sky.cn/vapp/45/Role0002.png"},
    {name:"roleLeft",path:"http://game.2sky.cn/vapp/45/Role0003.png"},
    {name:"roleFly",path:"http://game.2sky.cn/vapp/45/Role0004.png"},
    {name:"arrowButtonDown",path:"http://game.2sky.cn/vapp/45/arrowButtonDown.png"},
    {name:"arrowButtonNormal",path:"http://game.2sky.cn/vapp/45/arrowButtonNormal.png"},
    {name:"pause",path:"http://game.2sky.cn/vapp/45/pause.png"},
    {name:"resume",path:"http://game.2sky.cn/vapp/45/resume.png"},
    {name:"start",path:"http://game.2sky.cn/vapp/45/start.png?ver=1"},
    {name:"topBar",path:"http://game.2sky.cn/vapp/45/topBar.png"},
    {name:"adBar",path:"http://game.2sky.cn/vapp/45/ad.png"},
    {name:"gameOver",path:"http://game.2sky.cn/vapp/45/gameOver.png"},
    {name:"retryNormal",path:"http://game.2sky.cn/vapp/45/retryNormal.png"},
    {name:"retryDown",path:"http://game.2sky.cn/vapp/45/retryDown.png"},
	{name:"rankNormal",path:"http://game.2sky.cn/vapp/45/rank.png"},
    {name:"rankDown",path:"http://game.2sky.cn/vapp/45/rankD.png"},
    {name:"shareDown",path:"http://game.2sky.cn/vapp/45/shareDown.png"},
    {name:"shareNormal",path:"http://game.2sky.cn/vapp/45/shareNormal.png"},
    {name:"shareTip",path:"http://game.2sky.cn/vapp/45/shareTip.png"}

];
function main()
{
    LGlobal.align = LStageAlign.TOP_MIDDLE;
    LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
    //LGlobal.stageScale = LStageScaleMode.NO_SCALE;
    LSystem.screen(LStage.FULL_SCREEN);
    LLoadManage.load(imgData,null,_onLibLoaded);    
}

var ldMCData;
function _onLibLoaded(result)
{
    imgList = result;
    //创建游戏背景
    _createBg();
    _createUI();
    //创建地板
    ldMCData =new LURLLoader();
    ldMCData.addEventListener(LEvent.COMPLETE,_onMCDataLoaded);
    ldMCData.load("floor.json","text");
    //LGlobal.setDebug(true);

    _initSounds();
}
function _initSounds()
{
    sndBgm=new LSound();
    sndBgm.load("bgm.wav");
    sndJump=new LSound();
    sndJump.load("jump.wav");
    sndDead=new LSound();
    sndDead.load("dead.wav");
    sndBreak=new LSound();
    sndBreak.load("break.wav");
 }
function _onMCDataLoaded(evt)
{
    listMcs=[];
   var objJson=JSON.parse(evt.currentTarget.data);
    objJson=objJson["frames"];
    var listDecs=[];
   for (var strPrp in objJson)
   {
     var objFrameJson= objJson[strPrp]["frame"];
      var objFrame={x:objFrameJson.x,y:objFrameJson.y,width:objFrameJson.w,height:objFrameJson.h,sx:0,sy:0  };
       listDecs.push(objFrame);
   }
    listMcs=[listDecs];//一个数组里面嵌套一个数组，内部的数组表示一个mc，必须是这个格式

    _initFloor();
    _createRole();
}
var myRole;
function _createRole()
{
    myRole=new TheGameRole(imgList);
     myRole.x=200;
     myRole.y=80;
     myRole.showIdle();
     sceneLayer.addChild(myRole);

}

//
function _createFloorBlock(objBlockParam)
{
    var u;
      if(floorsPool.length>0)
    {
        u=floorsPool.pop();
        //trace("_createFloorBlock+floorsPool")
    }
    else
    {
        var allMCs=_getMCSAni();
        u=new FloorBlock(allMCs);
        sceneLayer.addChild(u);
    }
     u.setBlockType(objBlockParam.type);
    u.x=objBlockParam.x;
    u.y=objBlockParam.y;
    allFloors.push(u);
    return u;
}
function _getMCSAni()
{
    var  imgData=new LBitmapData(imgList['floorPng']);
    var  allMCs=new LAnimationTimeline(imgData,listMcs);
    allMCs.setLabel("block1",0,0);//硬地板
    allMCs.setLabel("block2",0,1);//地刺
    allMCs.setLabel("block3",0,2);//弹簧
    allMCs.setLabel("block4",0,3);//软地
    //5-11帧是弹簧动画
    allMCs.setLabel("pop",0,4);
    allMCs.setLabel("endpop",0,10);
    //12-25是软地
    allMCs.setLabel("cut",0,11);
    allMCs.setLabel("endcut",0,24);
    //26-35是左滚
    allMCs.setLabel("block5",0,25);
    allMCs.setLabel("reblock5",0,34);
    //38-49是右滚
    allMCs.setLabel("block6",0,37);
    allMCs.setLabel("reblock6",0,48);
    return allMCs;
}
//背景上显示分数
var txtScoreBg;
function _createBg()
{
    bgLayer=new LSprite();
    addChild(bgLayer);
    var bitmap=new LBitmap(new LBitmapData(imgList['bg']));
    bgLayer.addChild(bitmap);
    //
    txtScoreBg=new LTextField();
    txtScoreBg.x=LGlobal.width/2;
    txtScoreBg.y=LGlobal.height/2;
    txtScoreBg.size=120;
    txtScoreBg.color="#CCCCCC";
    txtScoreBg.textAlign="center";
    txtScoreBg.text=0;
    bgLayer. addChild(txtScoreBg);

}
function _createUI()
{

    //游戏内部UI
    gameLayer=new LSprite();
    addChild(gameLayer);
    gameLayer.mouseChildren=false;
    gameLayer.mouseEnabled=false;
    _createScene();
    //顶部条
    var topBar=new LBitmap(new LBitmapData(imgList["topBar"]));
    gameLayer.addChild(topBar);

    //底部条
    var bottomBar=topBar.clone();
    bottomBar.scaleY=-1;
    bottomBar.y=LGlobal.height;
    gameLayer. addChild(bottomBar);
    //场景中的按钮
    _createArrowButton();
    //开始界面
    startUI=new LSprite();
    addChild(startUI);
    var bitmap=new LBitmap(new LBitmapData(imgList['start']));
    bitmap.x=-(bitmap.width)/2;
    bitmap.y=-(bitmap.height)/2;
    startUI.x=LGlobal.width/2;
    startUI.y=LGlobal.height/2;
    startUI.addEventListener(LMouseEvent.MOUSE_DOWN,_onStartClick);
    startUI.addChild(bitmap);
    //广告条
//    adBar=new LSprite();
//    adBar.addChild(new LBitmap(new LBitmapData(imgList["adBar"])) )
//    adBar.addEventListener(LMouseEvent.MOUSE_DOWN,_onAdBarClick);
//    addChild(adBar);
    //游戏结束画面
    _createGameOverUI();
}
var gameOverUI;
var txtScore;
var txtTitle;
var txtRank;
var txtNextTitle;
var txtLeftFloor;
var txtPercent;
var nFloorSpeed;
function _createGameOverUI()
{
    gameOverUI=new LSprite();
    gameOverUI.x=LGlobal.width/2;
    gameOverUI.y=LGlobal.height/2;
    var bitmap=new LBitmap(new LBitmapData(imgList['gameOver']));
    bitmap.x=-bitmap.width/2;
    bitmap.y=-bitmap.height/2;
    gameOverUI.addChild(bitmap);
    //
    txtScore=new LTextField();
    txtScore.size=37;
    txtScore.y=-164;
     txtScore.text=1;
    txtScore.textAlign="center";
    txtScore.color="#009900";
    gameOverUI.addChild(txtScore);
    //
    txtTitle=new LTextField();
    txtTitle.size=24;
    txtTitle.y=-64;
     txtTitle.textAlign="center";
    txtTitle.text="疑似恐高";
    txtTitle.color="#009900";
    gameOverUI.addChild(txtTitle);
    //
    txtRank=new LTextField();
    txtRank.size=24;
    txtRank.y=30;
    txtRank.textAlign="center";
    txtRank.text="99999999";
    txtRank.color="#009900";
    gameOverUI.addChild(txtRank);
    //
    txtNextTitle=new LTextField();
    txtNextTitle.size=19;
    txtNextTitle.y=281;
    txtNextTitle.textAlign="center";
    txtNextTitle.text="腰膝酸软";
    txtNextTitle.color="#CCD4FE";
    gameOverUI.addChild(txtNextTitle);
    //
    txtLeftFloor=new LTextField();
    txtLeftFloor.size=20;
    txtLeftFloor.y=253;
    txtLeftFloor.x=60;
    txtLeftFloor.textAlign="center";
    txtLeftFloor.text="10";
    txtLeftFloor.color="#FFFFFF";
    gameOverUI.addChild(txtLeftFloor);
    //创建
    txtPercent=new LTextField();
    txtPercent.y=-14;
    txtPercent.x=-11;
    txtPercent.size=26;
    txtPercent.textAlign="center";
    txtPercent.text="...";
    txtPercent.color="#009900";
    gameOverUI. addChild(txtPercent);
    //创建两个按钮
    btnRetry=new LButton(new LBitmap(new LBitmapData(imgList["retryNormal"])),new LBitmap(new LBitmapData(imgList["retryDown"])));
    btnShare=new LButton(new LBitmap(new LBitmapData(imgList["shareNormal"])),new LBitmap(new LBitmapData(imgList["shareDown"])));
    btnRank=new LButton(new LBitmap(new LBitmapData(imgList["rankNormal"])),new LBitmap(new LBitmapData(imgList["rankDown"])));
    
	btnRetry.x=-96;
    btnRetry.y=91;
    btnShare.x=-96;
    btnShare.y=178;
	btnRank.x=-96;
    btnRank.y=-280;
	
    gameOverUI.addChild(btnRetry);
    gameOverUI.addChild(btnShare);
    gameOverUI.addChild(btnRank);
    //分享界面
    imgShareTip=new LBitmap(new LBitmapData(imgList["shareTip"]));
    imgShareTip.x=LGlobal.width-imgShareTip.width;

}
function _onStartClick(evt)
{
    startUI.removeEventListener(LMouseEvent.MOUSE_DOWN,_onStartClick);
     removeChild(startUI);
    startGame();
}
function _onRetryClick(evt)
{
    imgShareTip.visible=false;
    btnShare.removeEventListener(LMouseEvent.MOUSE_DOWN,_onShareClick);
    btnRetry.removeEventListener(LMouseEvent.MOUSE_DOWN,_onRetryClick);
	btnRank.removeEventListener(LMouseEvent.MOUSE_DOWN,_onRankClick);
     removeChild(gameOverUI);
    startGame();
}

function _onAdBarClick(evt)
{
    //跳到官网
    window.location.href=_config['isSite'];
}

var leftButton;
var rightButton;
function _createScene()
{
    //创建场景
    sceneLayer=new LSprite();
    gameLayer.addChild(sceneLayer);


}
/**
 * 构造方向箭头
 * @private
 */
function _createArrowButton()
{

    var bmpNormal=new LBitmap(new LBitmapData(imgList["arrowButtonNormal"]));
    var bmpDown=new LBitmap(new LBitmapData(imgList["arrowButtonDown"]));
    rightButton=new LButton(bmpNormal,bmpDown,bmpDown);
    rightButton.x=LGlobal.width-bmpDown.width;
    rightButton.y=LGlobal.height-bmpDown.height-10;
    gameLayer.addChild(rightButton);
    //
    bmpNormal=new LBitmap(new LBitmapData(imgList["arrowButtonNormal"]));
    bmpDown=new LBitmap(new LBitmapData(imgList["arrowButtonDown"]));
   // bmpNormal.scaleX=-1;
   // bmpDown.scaleX=-1;
    leftButton=new LButton(bmpNormal,bmpDown,bmpDown);
    leftButton.scaleX=-1;
    leftButton.x= bmpNormal.width;
    leftButton.y=LGlobal.height-bmpDown.height-10;
    gameLayer.addChild(leftButton);
}
function _initFloor()
{
    allFloors=[];
    floorsPool=[];
    var n=mapData.length;
    for (var i=0;i<n;i++)
    {
        _createFloorBlock(mapData[i]);
    }
    nFloorSpeed=1;
    roleLastY=allFloors[0].y;
}
/**
 * 开始游戏
 */
function startGame()
{
   //  LMultitouch.inputMode= LMultitouchInputMode.TOUCH_POINT;
    //
    leftButton.addEventListener(LMouseEvent.MOUSE_DOWN,_onLeftTouchStart);
    rightButton.addEventListener(LMouseEvent.MOUSE_DOWN,_onRightTouchStart);
    leftButton.addEventListener(LMouseEvent.MOUSE_UP,_onLeftTouchEnd);
    rightButton.addEventListener(LMouseEvent.MOUSE_UP,_onRightTouchEnd);
    _setScore(0);
    _initFloor();
    myRole.x=300;
    myRole.y=80;
    roleMovingDir=null;
    roleDownSpeed=0;
    sceneLayer.addChild(myRole);
    sceneLayer.y=LGlobal.height/2;
    gameLayer.mouseChildren=true;
    gameLayer.mouseEnabled=true;
    sceneLayer.addEventListener(LEvent.ENTER_FRAME,_onEnterFrame);
    //bgm
    sndBgm.play();
 }

function _setScore(n)
{
    txtScoreBg.text=n;
    nScroe=n;
}
var roleMovingDir;
function _onLeftTouchStart(evt)
{
    //alert("_onLeftTouchStart");
    myRole.showLeft();
    roleMovingDir="left";
}
function _onLeftTouchEnd(evt)
{
     roleMovingDir=null;
}
function _onRightTouchStart(evt)
{
  //  alert("_onRightTouchStart");
    myRole.showRight();
    roleMovingDir="right";

}
function _onRightTouchEnd(evt)
{
    roleMovingDir=null;
}
function _onEnterFrame(evt)
{
    if(!_checkOver())
    {
        //构造新地块
        _createNewFloors();
        //驱动角色
        _driveRole();
        //移动场景
        sceneLayer.y-=nFloorSpeed;
        if(nFloorSpeed<4)
        {
            nFloorSpeed+=nScroe/100;
        }
        else if(nScroe>40&&nFloorSpeed<8)
        {
            nFloorSpeed+=0.2;
        }
        else if(nScroe>100&&nFloorSpeed<25)
        {
            nFloorSpeed+=0.1;
        }
        //如果bgm没有播放了 则播放
        if(!sndBgm.playing)
        {
            sndBgm.play();
        }

    }
}
function _checkOver()
{
    var sy=myRole.y+sceneLayer.y;
    if(sy<150||sy>LGlobal.height-94)
    {
        _gameOver();
        return true;
    }
    return false;
}
function _createNewFloors()
{
    var n=allFloors.length;
    var bkLast=allFloors[n-1];
     if(n<15)
    {
        //地少于15层的情况下创建地块
        var objFloor={   };
         objFloor.y=bkLast.y+100;
        objFloor.x= (LGlobal.width-200)*Math.random();
        objFloor.type="block"+ parseInt(Math.random()*6+1);
        _createFloorBlock(objFloor);
    }
}

var roleDownSpeed=0;
var roleLastY=0;
var lastHitBlock;
function _driveRole()
{
    //左右
    var roleMovingSpeed=16;
    if(roleMovingDir=="left")
    {
        myRole.x-=roleMovingSpeed;
    }
    else if(roleMovingDir=="right")
    {
        myRole.x+=roleMovingSpeed;
    }
    if(myRole.x<23)
    {
        myRole.x=23;
    }
    else if(myRole.x>LGlobal.width-23)
    {
        myRole.x=LGlobal.width-23;
    }
    //下落
    var n=allFloors.length;
    var bHit=false;
    var arFloorsCopy=allFloors.concat();
    for  (var i=0;i<n;i++)
    {
        var bkFloor=arFloorsCopy[i];
        if(!bHit&&_hitTest(bkFloor))
        {
            if(lastHitBlock!=bkFloor)
            {
                sndJump.play();
                lastHitBlock=bkFloor;
            }
            //碰撞到地块
            if(roleMovingDir==null)
            {
                myRole.showIdle();
            }
            bHit=true;
        }
        else if((bkFloor.y+sceneLayer.y)<0)
        {
            //回收地块
             floorToPool(bkFloor);
        }
    }
    // trace(allFloors.length+","+floorsPool.length)
    //执行下落
    if(!bHit)
    {
        // sceneLayer.removeEventListener(LEvent.ENTER_FRAME,_onEnterFrame);
        //没有碰到地块
        myRole.y+=roleDownSpeed;
        if(roleDownSpeed<29)
        {
            roleDownSpeed+=3;
        }
        myRole.showFly();
    }
}
function _hitTest(bk)
{
    var blockWidth=138;
    var blockHeight=20;
    var roleWidth=18;
    var bHit=true;
    bHit=bHit&&myRole.y>=(bk.y-10);
    bHit=bHit&&myRole.y<=(bk.y+blockHeight);
    bHit=bHit&& myRole.x>(bk.x-roleWidth);
    bHit=bHit&& myRole.x<(bk.x+blockWidth+roleWidth);
     if(bHit)
    {
        roleDownSpeed=0;
         myRole.y=bk.y;
        //根据不同碰撞做出反应
        switch (bk.getBlockType())
        {
            case "block1":
                _calcScore();
                break;
            case "block3":
                //弹簧
                _calcScore();
               bk.upanddown();
                roleDownSpeed-=8;
                myRole.y-=16;
                break;
            case "block4":
                //软地块
                _calcScore();
                bk.breakdown();
                sndBreak.play();
                break;
            case "block5":
                _calcScore();
                myRole.x-=5;
                break;
            case "block6":
                _calcScore();
                myRole.x+=5;
                break;
            case "block2":
                //死亡了
                _gameOver();
                break;

        }
        return true;
    }
    return false;
}
/**
 * 计算结果
 * @private
 */
function _calcScore()
{
    var n=Math.ceil((myRole.y-roleLastY)/100);
    _setScore(n);
}
/**
 *地块回收
 */
function floorToPool(bk) {
    //trace("地块回收:"+bk.y+","+bk.getBlockType())
    var idx = allFloors.indexOf(bk);
    if (idx > -1) {
        allFloors.splice(idx, 1);
    }
     //只能是全部释放掉，回收使用总是会出错
    bk.dispose();
     //floorsPool.push(bk);
 }
/**
 * 游戏结束
 * @private
 */
function _gameOver()
{
    sndBgm.stop();
    sndDead.play();
    //清除事件
    sceneLayer.removeEventListener(LEvent.ENTER_FRAME,_onEnterFrame);
    leftButton.removeEventListener(LMouseEvent.MOUSE_DOWN,_onLeftTouchStart);
    rightButton.removeEventListener(LMouseEvent.MOUSE_DOWN,_onRightTouchStart);
    leftButton.removeEventListener(LMouseEvent.MOUSE_UP,_onLeftTouchEnd);
    rightButton.removeEventListener(LMouseEvent.MOUSE_UP,_onRightTouchEnd);
    gameLayer.mouseChildren=false;
    gameLayer.mouseEnabled=false;
    //清除场景
     allFloors=null;
    sceneLayer.removeAllChild();
    //显示结束
    addChild(gameOverUI);
    //显示分享
    addChild(imgShareTip);
	//修改title
	document.title="惊险刺激！快来挑战是男人就下100层，我下到了第["+nScroe+"]层" ;
     //
    imgShareTip.visible=false;
    //nScroe=140;
    txtScore.text=nScroe;
    txtRank.text="";
    txtPercent.text="";
    var nMaxT=arTtitles.length-1;
    var nT=Math.min(parseInt(nScroe/10),nMaxT);
    txtTitle.text=arTtitles[nT];
    txtNextTitle.text=(nT<nMaxT-2)?arTtitles[nT+1]:"称号保密，挑战过告诉你";
    //
    txtLeftFloor.text=10-parseInt(nScroe%10);
    // 等待下次点击
    btnRetry.addEventListener(LMouseEvent.MOUSE_DOWN,_onRetryClick);
    btnShare.addEventListener(LMouseEvent.MOUSE_DOWN,_onShareClick);
	btnRank.addEventListener(LMouseEvent.MOUSE_DOWN,_onRankClick);

	document.title = dataForWeixin.tTitle = "我下到了第["+nScroe+"]层, "+  txtRank.text +" 获得称号【"+txtTitle.text+"】，惊险刺激！快来挑战是男人就下100层";

}
/**
 * 点击分享
 * @param evt
 * @private
 */
function _onShareClick(evt)
{
    imgShareTip.visible=true;
}

function _onRankClick(evt)
{
     dp_Ranking();
}


