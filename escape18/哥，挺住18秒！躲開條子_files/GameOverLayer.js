/**
 * Created by Administrator on 2014/8/19.
 */
var GameOverLayer = cc.Layer.extend
({
    target:null,
    shareSprite:null,
    menu:null,
    setCallback:function(target){
        this.target = target;
    },
    textLable:null,
    setText:function(text){
        if(!this.textLable){
             this.textLable = cc.LabelTTF.create(text,"bolder 微软雅黑",16);
            this.textLable.setColor(cc.c3b(0,0,0));
             this.textLable.setPosition(this.winSize.width/2,this.winSize.height/2+19);
           this.addChild(this.textLable);
       }else{
          this.textLable.setString(text);
      }
    },
    ctor:function () {
        this._super();
        if( 'touches' in sys.capabilities ){
            this.setTouchEnabled(true);
        }
        else if ('mouse' in sys.capabilities )
            this.setMouseEnabled(true);

    },
    onEnter:function()
    {

        cc.registerTargetedDelegate(-126, true, this);
        this._super();
    },
    onExit:function(){
        cc.unregisterTouchDelegate(this);
        this._super();
    },
    init:function() {
        this._super();
        this.winSize = cc.Director.getInstance().getWinSize();
        var dialog = cc.Sprite.create(res_dialog_bg);
        dialog.setPosition(this.winSize.width/2,this.winSize.height/2);
        this.addChild(dialog);
        var head2 = cc.Sprite.create(head2Src);
        head2.setPosition(this.winSize.width/2+75,this.winSize.height/2+85);
        this.addChild(head2);
        var $this = this;
        var agin = cc.MenuItemImage.create(res_agin_btn,res_agin_btn,function(){
              $this.target.aginGame();
        });
        agin.setPosition(-90,-60);
        var more = cc.MenuItemImage.create(res_more_btn,res_more_btn,function(){
            try {
                _hmt.push(['_trackEvent', 'escape', 'click', 'more', '1']);
            } catch(e) {}
            window.open("http://game.ioxapp.com/");
        });
        more.setPosition(0,-60);

        var share = cc.MenuItemImage.create(res_share_btn,res_share_btn,function(){
            window.shareCaption = ShareWords;
            do_share();
        });
        share.setPosition(90,-60);

        this.menu = cc.Menu.create(agin,more,share);
        this.menu.setTouchPriority(-126);
        this.addChild( this.menu);

        return true;
    },

    onTouchBegan:function (touch, event) {
        if(this.shareSprite){
            this.shareSprite.removeFromParent();
            this.menu.setEnabled(true);
            $(".ad_banner").css("display","inline");

        }

        return true;
    },
    onTouchMoved:function (touch, event) {
    },
    onTouchEnded:function (touch, event) {
    }
});

GameOverLayer.create = function (time,text,word) {
    var sg = new GameOverLayer();
    if (sg && sg.init())
    {
        sg.setText( "你堅持了"+time.toFixed(2)+"秒，擊敗了台灣"+text+"%的\n人，恭喜獲得"+word+"稱號");

        return sg;
    }
    return  null;
};