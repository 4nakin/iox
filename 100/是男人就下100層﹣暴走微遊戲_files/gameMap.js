/**
 * Created by W520 on 2014/7/26.
 */
var mapData;

initMapData();
_initTiltes();
function initMapData()
{
    mapData= [
        {type:"block1",x:233,y:100},
        {type:"block1",x:185,y:200},
        {type:"block1",x:120,y:300},
        {type:"block1",x:200,y:400},
        {type:"block1",x:67,y:500},
        {type:"block1",x:53,y:600},
        {type:"block1",x:266,y:700},
        {type:"block1",x:120,y:800},
        {type:"block1",x:200,y:900},
        {type:"block3",x:53,y: 1000},
        {type:"block4",x:200,y:1100},
        {type:"block5",x:173,y:1200},
        {type:"block1",x:60,y:1300},
        {type:"block5",x:213,y:1400},
        {type:"block2",x:191,y:1500},
        {type:"block1",x:80,y:1600},
        {type:"block6",x:122,y:1700}
    ];

}
//称号
var arTtitles;
function _initTiltes()
{
    arTtitles=[];
    arTtitles[0]="疑似恐高";
    arTtitles[1]="腰膝酸软";
    arTtitles[2]="药不能停";
    arTtitles[3]="批准出院";
    arTtitles[4]="勇气可嘉";
    arTtitles[5]="头脑灵活";
    arTtitles[6]="有如神助";
    arTtitles[7]="下楼高手";
    arTtitles[8]="飞虎队员";
    arTtitles[9]="飞行员";
    arTtitles[10]="宇航员";
    arTtitles[11]="魔鬼筋肉人";
    arTtitles[12]="天外飞仙";
    arTtitles[13]="天使下凡";
    arTtitles[14]="来自星星的你";
    arTtitles[15]="程序猿";
    arTtitles[16]="宇宙大帝";
}



//疑似恐高0
//腰膝酸软10
//药不能停20
//批准出院30
//勇气可嘉40
//头脑灵活50
//有如神助60
//下楼高手70
//飞虎队员80
//飞行员90
//宇航员100
//天使下凡110
//来自星星的你120
//
//程序猿130
//你改了我的程序140
